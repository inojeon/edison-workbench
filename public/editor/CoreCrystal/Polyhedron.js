import * as THREE from '../build/three.module.js';

import { ConvexGeometry } from '../Renderer/jsm/geometries/ConvexGeometry.js';

/**
 * Polyhedron 렌더링 모델 관리 클래스
 * */
export class Polyhedron {

    /**
     * 클래스 생성자
     * @param {THREE.Group} parent 렌더링 오브젝트 그룹
     */
    constructor(parent) {
        this._parent = parent;

        this._root = null;
        this._polys = [];
        this._meshs = [];
        this._wires = [];

        this._meshColor = [0, 1, 1];
        this._wireColor = [0, 0, 1];
        this._opacity = 0.5;

        this._visible = true;
        this._visibleEdge = false;
    }

    /**
     * 연결 그래프 데이터를 사용하여 Polyhedron을 생성한다.
     * @param {Object} graph 그래프 데이터
     */
    _generateWithGraph(graph) {

        this._root = new THREE.Group();
        this._polys = [];
        this._meshs = [];
        this._wires = [];

        var no_more_center = false;
        do {

            var max_num_links = 0;
            var max_vidx = -1;
            var max_vatomRad = -1;
            var max_vatomId = "";
            for (let i = 0; i < graph.V.length; i++) {

                if (!graph.V[i].visible)
                    continue;

                if (graph.V[i].used_center || graph.V[i].used_poly)
                    continue;

                let num_links = 0;
                for (let j = 0; j < graph.V[i].iEdges.length; j++) {
                    if (graph.V[i].iEdges[j].used)
                        continue;

                    let incident_atomIdx = (graph.V[i].iEdges[j].atom1 === graph.V[i].atom) ? graph.V[i].iEdges[j].atom2Idx : graph.V[i].iEdges[j].atom1Idx;
                    if (graph.V[incident_atomIdx].used_center)
                        continue;

                    num_links++;
                }

                if (num_links > max_num_links) {
                    max_num_links = num_links;
                    max_vidx = i;
                    max_vatomRad = graph.V[i].atom._def._def._radius;
                    max_vatomId = graph.V[i].atom._def._def._id;
                } else if (num_links === max_num_links) {
                    if (max_vatomRad < graph.V[i].atom._def._def._radius) {
                        max_num_links = num_links;
                        max_vidx = i;
                        max_vatomRad = graph.V[i].atom._def._def._radius;
                        max_vatomId = graph.V[i].atom._def._def._id;
                    }
                }
            }

            if (max_num_links >= 3) {

                console.log("center vtx " + max_vidx + "(" + max_vatomId + ")" + " with links " + max_num_links);

                graph.V[max_vidx].used_center = true;
                graph.V[max_vidx].used_poly = true;

                var c_points = [];
                c_points.push(graph.V[max_vidx].atom._position2.clone());

                // add sample points - for one-plane degenerate case.
                c_points.push(graph.V[max_vidx].atom._position2.clone().add(new THREE.Vector3(0.01, 0, 0)));
                c_points.push(graph.V[max_vidx].atom._position2.clone().add(new THREE.Vector3(-0.01, 0, 0)));
                c_points.push(graph.V[max_vidx].atom._position2.clone().add(new THREE.Vector3(0, 0.01, 0)));
                c_points.push(graph.V[max_vidx].atom._position2.clone().add(new THREE.Vector3(0, -0.01, 0)));
                c_points.push(graph.V[max_vidx].atom._position2.clone().add(new THREE.Vector3(0, 0, 0.01)));
                c_points.push(graph.V[max_vidx].atom._position2.clone().add(new THREE.Vector3(0, 0, -0.01)));

                for (let i = 0; i < graph.V[max_vidx].iEdges.length; i++) {

                    graph.V[max_vidx].iEdges[i].used = true;

                    let incident_atomIdx = (graph.V[max_vidx].iEdges[i].atom1Idx === max_vidx) ? graph.V[max_vidx].iEdges[i].atom2Idx : graph.V[max_vidx].iEdges[i].atom1Idx;
                    if (graph.V[incident_atomIdx].used_center)
                        continue;

                    c_points.push(graph.V[incident_atomIdx].atom._position2.clone());
                    graph.V[incident_atomIdx].used_poly = true;
                }

                const meshMaterial = new THREE.MeshPhongMaterial({
                    color: 0xffffff,
                    opacity: this._opacity,
                    transparent: true,
                });
                meshMaterial.color.r = this._meshColor[0];
                meshMaterial.color.g = this._meshColor[1];
                meshMaterial.color.b = this._meshColor[2];
                meshMaterial.specular.r = 0.5;
                meshMaterial.specular.g = 0.5;
                meshMaterial.specular.b = 0.5;

                const ch = new ConvexGeometry(c_points);
                const mesh1 = new THREE.Mesh(ch, meshMaterial);

                const bbwire = new THREE.WireframeGeometry(ch);
                const bboxWire = new THREE.LineSegments(bbwire);
                bboxWire.material.opacity = this._opacity;
                bboxWire.material.color.r = this._wireColor[0];
                bboxWire.material.color.g = this._wireColor[1];
                bboxWire.material.color.b = this._wireColor[2];
                bboxWire.material.transparent = true;
                bboxWire.visible = this._visibleEdge;

                var poly = new THREE.Group();
                poly.add(mesh1);
                poly.add(bboxWire);

                poly.center_iatom = graph.V[max_vidx].atom;

                this._root.add(poly);

                this._polys.push(poly);
                this._meshs.push(mesh1);
                this._wires.push(bboxWire);

            } else {
                no_more_center = true;
                console.log("no more center");
            }

        } while (!no_more_center);

    }

    /**
     * 원자, 결합 리스트를 사용하여 연결 그래프 데이터를 생성한다.
     * @param {Array} atomList 원자 리스트
     * @param {Array} bondList 결합 리스트
     * @returns {Object} 연결 그래프 데이터
     */
    _generateGraphWithAtomBondList(atomList, bondList) {

        let graph = {};

        graph.V = [];

        for (let i = 0; i < atomList.length; i++) {
            if (!atomList[i]._visible)
                continue;

            let vtx = {};
            vtx.atomIdx = i;
            vtx.atom = atomList[i];
            vtx.iEdges = [];
            vtx.used_center = false;
            vtx.used_poly = false;
            vtx.visible = atomList[i]._visible;
            graph.V.push(vtx);
        }

        graph.E = [];

        for (let i = 0; i < bondList.length; i++) {

            if (!bondList[i]._visible)
                continue;

            if (!bondList[i]._a1._visible)
                continue;

            if (!bondList[i]._a2._visible)
                continue;

            let edge = {};
            edge.atom1 = bondList[i]._a1;
            edge.atom2 = bondList[i]._a2;

            edge.atom1Idx = -1;
            edge.atom2Idx = -1;
            edge.used = false;

            for (let j = 0; j < atomList.length; j++) {
                if (graph.V[j].atom === edge.atom1) {
                    edge.atom1Idx = j;
                    graph.V[j].iEdges.push(edge);
                    break;
                }
            }
            for (let j = 0; j < atomList.length; j++) {
                if (graph.V[j].atom === edge.atom2) {
                    edge.atom2Idx = j;
                    graph.V[j].iEdges.push(edge);
                    break;
                }
            }

            graph.E.push(edge);
        }

        return graph;
    }

    /**
     * 원자, 결합 리스트를 사용하여 Polyhedron 모델을 생성한다.
     * @param {Array} atomList 원자 리스트
     * @param {Array} bondList 결합 리스트
     */
    generateWithAtomBondList(atomList, bondList) {

        this.dispose();

        let graph = this._generateGraphWithAtomBondList(atomList, bondList);
        this._generateWithGraph(graph);

        if (this._parent && this._root) {
            this._parent.add(this._root);
            this.setVisible(this._visible);
        }
    }

    /**
     * Polyhedron 모델 가시화 여부를 설정한다.
     * @param {Boolean} vis Polyhedron 모델 가시화 여부
     */
    setVisible(vis) {
        this._visible = vis;
        if (this._root) {
            this._root.visible = this._visible;
        }
    }

    /**
     * 엣지 모델 가시화 여부를 설정한다.
     * @param {Boolean} vis 엣지 모델 가시화 여부
     */
    setVisibleEdge(vis) {
        this._visibleEdge = vis;
        if (this._wires) {
            for (let w of this._wires)
                w.visible = this._visibleEdge;
        }
    }

    /**
     * Shininess 값을 설정한다.
     * @param {Number} shi Shininess 값
     */
    setShininess(shi) {
        if (this._meshs) {
            for (let m of this._meshs)
                m.material.shininess = shi;
        }
    }

    /**
     * 렌더링 리소스를 해제한다.
     * */
    dispose() {
        if (this._root) {
            if (this._parent)
                this._parent.remove(this._root);

            for (let pm of this._meshs) {
                pm.geometry.dispose();
                pm.material.dispose();
            }

            for (let pw of this._wires) {
                pw.geometry.dispose();
                pw.material.dispose();
            }
        }

        this._root = null;
        this._polys = [];
        this._meshs = [];
        this._wires = [];
    }
}