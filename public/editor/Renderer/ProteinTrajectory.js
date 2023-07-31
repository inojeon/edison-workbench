import * as THREE from '../build/three.module.js';
import { ptSpline } from './ptSpline.js';
import { ptSplinePoint } from './ptSpline.js';
import { GeomRenderer } from './GeomRenderer.js';
import { Util } from './Util.js';
import { BufferGeometryUtils } from '../Renderer/jsm/utils/BufferGeometryUtils.js'



/**
 * Projection Trajectory 계산 클래스
 * */
export class ProteinTrajectory {

    /**
     * Null Coil을 생성한다
     * @param {any} ptspline
     * @param {any} ppt1
     * @param {any} ppt4
     * @param {any} cr
     * @param {any} cg
     * @param {any} cb
     */
    static genNullCoil(ptspline, ppt1, ppt4, cr, cg, cb) {

        var pt1 = ppt1.clone();
        var pt2 = ppt1.clone();
        var pt3 = ppt4.clone();
        var pt4 = ppt4.clone();

        const t2 = 1 / 3;
        const t3 = 2 / 3;
        pt2._pos = pt1._pos.lerp(pt4._pos, t2);
        pt3._pos = pt1._pos.lerp(pt4._pos, t3);

        pt2._normal = pt1._normal.lerp(pt4._normal, t2);
        pt3._normal = pt1._normal.lerp(pt4._normal, t3);

        pt2._forward = pt1._forward.lerp(pt4._forward, t2);
        pt3._forward = pt1._forward.lerp(pt4._forward, t3);

        pt2._binormal = pt1._binormal.lerp(pt4._binormal, t2);
        pt3._binormal = pt1._binormal.lerp(pt4._binormal, t3);

        pt4._pos.set(0, 0, 0);

        // 거리구하기
        var p1 = pt1._pos.clone();
        var p4 = pt4._pos.clone();

        var dist = p1.distanceTo(p4);

        var len = dist / 0.05;

        var traj = new ProteinTrajectory();
        traj.add(pt1);
        traj.add(pt2);
        traj.add(pt3);
        traj.add(pt4);


        var mesh = ptspline.generateEmpty(traj._points, cr, cg, cb);
        return mesh;
    }

    static getAtomGeomPosition(geom) {
        return new THREE.Vector3(geom.GetX(), geom.GetY(), geom.GetZ());
    }

    /**
     * DNA arm 위치를 찾는다.
     * @param {any} pos
     * @param {any} geom_dic
     * @param {any} cycle
     * @returns {THREE.Vector3} 위치 값
     */
    static findDNAarmPosition(pos, geom_dic, cycle) {
        const len = cycle.size();
        let min_length = 100000;
        let sel_pos = pos.clone();
        
        for (let i = 0; i<len; i++) {
            let idb = cycle.get(i);
            if (idb < 0)
                continue;
            let geom1 = geom_dic[idb];
            let pos2 = ProteinTrajectory.getAtomGeomPosition(geom1);

            const length = pos2.sub(pos).length();
            if (length < min_length) {
                min_length = length;
                
                sel_pos = ProteinTrajectory.getAtomGeomPosition(geom1);
            }
        }

        return sel_pos;

    }

    /**
     * Cycle를 분리한다.
     * @param {any} cycle_list
     * @returns {Array} 분리된 cycle 데이터
     */
    static splitCycle(cycle_list) {
        let ret = [];

        const len = cycle_list.size();
        let j = 0;
        ret[j] = [];
        for (let i = 0; i < len; i++) {
            const v = cycle_list.get(i);
            if (v < 0) { // end
                j++;
                ret[j] = [];
            } else {
                ret[j].push(v);
            }
        }
        ret.pop();

        return ret;
    }

    /**
     * Cycle Flip 상태를 체크한다.
     * @param {any} geom_dic
     * @param {any} cycle
     * @param {any} v1
     */
    static checkCycleFlip(geom_dic, cycle, v1) {

        let cycle2;
        let p1 = geom_dic[cycle[0]].position.clone();
        let p2 = geom_dic[cycle[1]].position.clone();
        let p3 = geom_dic[cycle[2]].position.clone();

        let normal = Util.calcNormal(p1, p2, p3);
        let value = normal

        return cycle2;
    }

    /**
     * cycle을 생성한다
     * @param {any} geom_dic
     * @param {any} cycle
     * @param {any} v_forward
     * @param {any} color
     * @returns {THREE.Geometry} 
     */
    static createCycleGeometry(geom_dic, cycle, v_forward, color) {

        let width = 0.1;
        let p1 = ProteinTrajectory.getAtomGeomPosition(geom_dic[cycle[0]]);
        let p2 = ProteinTrajectory.getAtomGeomPosition(geom_dic[cycle[1]]);
        let p3 = ProteinTrajectory.getAtomGeomPosition(geom_dic[cycle[2]]);

        let normal = Util.calcNormal(p1, p2, p3);
        let value = normal.dot(v_forward);
        if (value < 0) {
            cycle = Util.flipArray(cycle);
            normal.multiplyScalar(-1);
        }

        normal.normalize();
        normal.multiplyScalar(width);

        const geometry = new THREE.BufferGeometry();

        let indices = [];
        let positions = [];

        let colors = [];
        const shade = 0.8;

        let sumU = new THREE.Vector3();
        let sumD = new THREE.Vector3();

        for (let i = 0; i < cycle.length; i++) {
            const id = cycle[i];
            let geom = geom_dic[id];

            let tposU = ProteinTrajectory.getAtomGeomPosition(geom).add(normal);
            let tposD = ProteinTrajectory.getAtomGeomPosition(geom).sub(normal);

            sumU.add(tposU);
            sumD.add(tposD);

            positions.push(tposU.x, tposU.y, tposU.z);
            positions.push(tposD.x, tposD.y, tposD.z);
            positions.push(tposU.x, tposU.y, tposU.z);
            positions.push(tposD.x, tposD.y, tposD.z);
            positions.push(tposU.x, tposU.y, tposU.z);
            positions.push(tposD.x, tposD.y, tposD.z);

            colors.push(shade, shade, shade);
            colors.push(shade, shade, shade);
            colors.push(shade, shade, shade);
            colors.push(shade, shade, shade);
            colors.push(shade, shade, shade);
            colors.push(shade, shade, shade);
            //geometry.vertices.push(tpos);
        }

        sumU.multiplyScalar(1 / cycle.length);
        sumD.multiplyScalar(1 / cycle.length);
        positions.push(sumU.x, sumU.y, sumU.z);
        let cidxU = positions.length / 3 - 1;
        positions.push(sumD.x, sumD.y, sumD.z);
        colors.push(shade, shade, shade);
        colors.push(shade, shade, shade);

        let i3U = cidxU;
        for (let i = 0; i < cycle.length; i++) {
            let i1 = i *6 ;
            let i2 = (i + 1) *6;
            if (i2 >= cycle.length*6) {
                i2 = 0;
            }

            indices.push(i1, i3U, i2);
            indices.push(i1 + 1, i2 + 1, i3U + 1);

            let ii1 = i1 + 2;
            let ii2 = i2 + 2;

            let iii1 = i1 + 4;
            let iii2 = i2 + 4;

            indices.push(ii1, iii2, ii1 + 1);
            indices.push(iii2, iii2 + 1, ii1 + 1);

        }

        geometry.setIndex(indices);
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute('normal', new THREE.Float32BufferAttribute(positions, 3));

        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

        geometry.computeVertexNormals();
        geometry.computeBoundingSphere();


        return geometry;
    }

    /**
     * dna arm을 생성한다
     * @param {any} idx
     * @param {any} geom_idx
     * @param {any} gr
     * @param {any} geom
     * @param {any} protein_trajectory
     */
    static genDNAarmGeometry(idx, geom_idx, gr, geom, protein_trajectory) {
        let list = [];
        let geomdic = gr._geomDic;
        let pt = protein_trajectory;

        let point = pt._points[idx + 1];
        let cycle_data = geom.GetDnaArm(point._geomIdx);

        let pos1 = point._pos;
        let idb_size = cycle_data.size();
        let pos2 = ProteinTrajectory.findDNAarmPosition(pos1, geomdic, cycle_data);

        // DNA의 cylinder부분 모델링 해서 list에 넣음. 
        let cylinder_geom = GeomRenderer.createCylinderGeometry(gr, pos1, pos2, 0.1);
        let attr1 = cylinder_geom.getAttribute("position");
        const vertex_size = attr1.count;
        let colors = [];
        const shade = 0.6;
        for (let i = 0; i < vertex_size; i++) {
            colors.push(shade, shade, shade);
        }
        cylinder_geom.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));


        list.push(cylinder_geom);

        // cycle을 여러개의 cycle로 분해
        let cycles = ProteinTrajectory.splitCycle(cycle_data);

        for (let i = 0; i < cycles.length; i++) {
            let geometry = ProteinTrajectory.createCycleGeometry(geomdic, cycles[i], point._forward);

            list.push(geometry);
        }

        return list;
    }

    /**
     * protein trajectory를 생성한다
     * @param {any} gr geom renderer
     * @param {any} geom geom 
     * @param {any} parent geom의 parent
     */
    static genProteinTrajectory(gr, geom, parent) {
        const len = geom.GetNumPoints();

        const id = geom.GetID();
        let ptlist = [];
        let pt = new ProteinTrajectory();
        ptlist.push(pt);
        //let sp = new ptSplinePoint();
        //pt.add(sp);

        let bridge_id = [];

        let bi = 1;
        let bFirst = true;
        for (var i = 0; i < len; i++) {


            var pi = i - 1;
            var ni = i + 1;
            if (pi < 0) pi = 0;
            if (ni > len - 1)
                ni = len - 1;
            var ntype = String.fromCharCode(geom.GetAminoType(ni));
            var ptype = String.fromCharCode(geom.GetAminoType(pi));
            var type = String.fromCharCode(geom.GetAminoType(i));

            // 끊어짐 이 있는지 체크
            if (type == '#') {
                const cpos = geom.GetPos(i);

                if (cpos[0] > 1)
                {

                    pt = new ProteinTrajectory();
                    ptlist.push(pt);
                    //var sp2 = new ptSplinePoint();
                    //pt.add(sp2);

                    bridge_id[bi] = i + id;
                    bi++;
                    bFirst = true;
                    continue;
                }
                continue;
            }

            if (ntype == '#') {
                ni = i;
            }
            if (ptype == '#') {
                pi = i;
            }


            if (gr._trajectoryType == 1) {
                if (type != 'x') {
                    type = 'c';
                }
            }

            if (type != 'x' ) {
                const cpos = geom.GetPos(i);
                const ppos = geom.GetPos(pi);
                const npos = geom.GetPos(ni);
                const normal = geom.GetNormal(i);


                var pos = [];
                pos[0] = cpos[0];
                pos[1] = cpos[1];
                pos[2] = cpos[2];

                var forward = [];
                if (ntype != 'x') {
                    forward[0] = npos[0] - ppos[0];
                    forward[1] = npos[1] - ppos[1];
                    forward[2] = npos[2] - ppos[2];
                } else {
                    if (pt._points.length > 0) {
                        let ppf = pt._points[pt._points.length - 1]._forward;
                        forward = [ppf.x, ppf.y, ppf.z];
                    } else {
                        forward = [0, 0, 0];
                    }
                }

                /*
                var pos = [];
                pos[0] = (cpos[0] + npos[0]) * 0.5;
                pos[1] = (cpos[1] + npos[1]) * 0.5;
                pos[2] = (cpos[2] + npos[2]) * 0.5;

                var forward = [];
                forward[0] = npos[0] - cpos[0];
                forward[1] = npos[1] - cpos[1];
                forward[2] = npos[2] - cpos[2];
                */

                let sp = new ptSplinePoint();
                sp.setType(type);
                sp.setPos(new THREE.Vector3(pos[0], pos[1], pos[2]));
                sp.setNormal(new THREE.Vector3(normal[0], normal[1], normal[2]));
                sp.setForward(new THREE.Vector3(forward[0], forward[1], forward[2]));
                sp._id = i + id;
                sp._geomIdx = i;


                pt.add(sp);
                bFirst = false;
            }
        }

        /*
        const mesh = pt.generateMesh();
        this.updateMesh(mesh, geom, parent);
        return mesh;
        */

        const cr = Math.random() * 0.5;
        const cg = Math.random();
        const cb = Math.random();

        let prev_pt = null;
        bFirst = true;
        for (var k = 0; k < ptlist.length; k++) {
                
            pt = ptlist[k];
            if (pt._points.length < 4)
                continue;

            // 처음과 끝에 점 하나 더 넣기
            pt._points[0] = pt._points[1].clone();
            var vf = pt._points[2]._pos.clone();
            vf.sub(pt._points[1]._pos);
            vf.multiplyScalar(0.3);
            pt._points[0]._pos.sub(vf);


            let end_pt = pt._points[pt._points.length - 1].clone();
            pt.add(end_pt);



            let start_idx = pt._points[0]._id;

            const list = pt.generateGeometryList(cr, cg, cb);


            if (!bFirst) { // Residue 데이터 없는 곳의 연결 점선.

                var p1 = prev_pt._cartoon._endPos;
                var p4 = pt._cartoon._startPos;

                var emesh = ptSpline.generateBlankLineMesh(gr, p1, p4, cr, cg, cb);

                emesh._disposeMaterial = true;
                emesh._disposeGeometry = true;

                gr.updateMeshWithID(emesh, bridge_id[k], geom, parent);
            }


            for (var i = 0; i < list.length; i++) {
                let geometry = list[i];
                if (geometry) {

                    let merged_geom;
                    if (geom.IsDNA()) {
                        {
                            let geometry_list = ProteinTrajectory.genDNAarmGeometry(i, start_idx, gr, geom, pt);
                            geometry_list.push(geometry);
                            merged_geom = BufferGeometryUtils.mergeBufferGeometries(geometry_list);
                        }
                    } else {
                        merged_geom = geometry;
                    }


                    const material = new THREE.MeshLambertMaterial();
                    material.color = new THREE.Color(cr, cg, cb);
                    material.vertexColors = true;

                    var mesh = new THREE.Mesh(merged_geom,material);
                    mesh._originalColorR = cr;
                    mesh._originalColorG = cg;
                    mesh._originalColorB = cb;
                    mesh._mat = material;
                    mesh._id = geometry._ptPoint._id;

                    mesh._disposeMaterial = true;
                    mesh._disposeGeometry = true;

                    gr.updateMeshWithID(mesh, mesh._id, geom, parent);
                }
            }
            bFirst = false;
            prev_pt = pt;
        }

        

        //        return mesh;

    }

    /**
     * 클래스 생성자
     * @param {Number} num_faces 점 개수
     */
    constructor(num_faces) {
        this._numFaces = num_faces;
        this._points = [];
        this._cartoon = new ptSpline();
    }

    /**
     * 점을 추가한다.
     * @param {Point} st_point
     */
    add(st_point) {

        if (this._points.length == 0) {
            let pt0 = st_point.clone();
            this._points.push(pt0);
        }
        else {
            var prev = this._points[this._points.length - 1];
            st_point.checkFlip(prev);
        }
        
        
        // Helix?? ??? ???????? ???????? Normal???????? 1.5??? ??????
        if (st_point._type == "H") {
            var t = 0.9;
            if (st_point._flipped)
                t = -t;

            st_point._pos.x = st_point._pos.x + st_point._normal.x * t;
            st_point._pos.y = st_point._pos.y + st_point._normal.y * t;
            st_point._pos.z = st_point._pos.z + st_point._normal.z * t;
        }
        

        this._points.push(st_point);
    }

    /**
     * Mesh 를 생성한다.
     * @param {Number} r red color [0,1]
     * @param {Number} g green color [0,1]
     * @param {Number} b blue color [0,1]
     */
    generateMesh(r,g,b) {

        var mesh = this._cartoon.generate(this._points, r,g,b , false);
        return mesh;

//        return this._cartoon._mesh.generateMesh(m1)
    }

    /**
     * Mesh List 를 생성한다.
     * @param {Number} r red color [0,1]
     * @param {Number} g green color [0,1]
     * @param {Number} b blue color [0,1]
     */
    generateGeometryList(r,g,b) {

        var list = this._cartoon.generate(this._points, r,g,b, true);
        return list;

    }


    /*
    Generate(geom) {
        const xs = [1, 2, 3, 4, 5];
        const ys = [9, 3, 6, 2, 4];

        const spline = new Spline(xs, ys);

        // get Y at arbitrary X
        console.log(spline.at(1.4));

        this._splinePoints = [];

        var num = geom.GetNumPoints();
        for (var i = 0; i < num; i++) {
            var pos = geom.GetPos(i);
            var normal = geom.GetNormal(i);
            var type = geom.GetType(i);
        }


        for (var i = 0; i < num; i++) {
            var pos = geom.GetPos(i);
            var normal = geom.GetNormal(i);
            var type = geom.GetType(i);
        }


    }
    */
}
