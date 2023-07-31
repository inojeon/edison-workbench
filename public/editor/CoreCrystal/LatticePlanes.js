import * as THREE from '../build/three.module.js';
import { ConvexGeometry } from '../Renderer/jsm/geometries/ConvexGeometry.js';

/**
 * Lattice Plane 렌더링 모델 관리 클래스
 * */
export class LatticePlanes {

    /**
     * 클래스 생성자
     * @param {THREE.Group} parent 렌더링 오브젝트 그룹
     */
    constructor(parent) {
        this._parent = parent;

        this._visible = true;
        this._visibleEdge = false;

        this._root = null;
        this._lplanes = [];
        this._meshs = [];
        this._wires = [];

        this._meshColor = [1, 0, 0];
        this._wireColor = [1, 0, 0];
        this._opacity = 0.5;
    }

    /**
     * Plane 데이터를 사용하여 Lattice Plane 모델을 생성한다.
     * @param {Array} planes Planes
     * @param {Number} size plane size
     */
    generateWithPlanes(planes, size = 10) {

        this.dispose();

        this._root = new THREE.Group();
        if (this._parent)
            this._parent.add(this._root);

        console.log(planes.length + " lattice planes");

        for (let i = 0; i < planes.length; i++) {

            const pcolor = planes[i]._color;

            const meshMaterial = new THREE.MeshLambertMaterial({
                color: 0xffffff,
                opacity: this._opacity,
                side: THREE.DoubleSide,
                transparent: true,
            });
            meshMaterial.color.r = pcolor[0];
            meshMaterial.color.g = pcolor[1];
            meshMaterial.color.b = pcolor[2];

            const pg = new THREE.PlaneGeometry(size, size);
            const mesh = new THREE.Mesh(pg, meshMaterial);

            const bbwire = new THREE.WireframeGeometry(pg);
            const bboxWire = new THREE.LineSegments(bbwire);
            bboxWire.material.opacity = 1.0;
            bboxWire.material.color.r = pcolor[0];
            bboxWire.material.color.g = pcolor[1];
            bboxWire.material.color.b = pcolor[2];
            bboxWire.material.transparent = true;
            bboxWire.visible = this._visibleEdge;

            const lp = new THREE.Group();
            lp.add(mesh);
            lp.add(bboxWire);

            // apply lattice plane transform
            lp.position.copy(planes[i]._position);
            lp.setRotationFromQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), planes[i]._normal.clone().normalize()));

            console.log("plane pos " + planes[i]._position.x + "," + planes[i]._position.y + "," + planes[i]._position.z);

            // add mesh, wire, plane to root scene
            this._meshs.push(mesh);
            this._wires.push(bboxWire);
            this._lplanes.push(lp);

            this._root.add(lp);
        }

        this.setVisible(this._visible);
    }

    /**
     * Lattice Planes 모델 가시화 여부를 설정한다.
     * @param {Boolean} vis Lattice Planes 모델 가시화 여부
     */
    setVisible(vis) {
        this._visible = vis;
        if (this._root) {
            this._root.visible = this._visible;
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
        this._lplanes = [];
        this._meshs = [];
        this._wires = [];
    }

}