import * as THREE from '../build/three.module.js';
import { ptMesh } from './ptMesh.js';
import { ptRing } from './ptRing.js';
import { Spline } from './cubic_spline.js';
import { GeomMole } from './GeomMole.js';

import { BSpline } from './BSpline.js';
import { BufferGeometryUtils } from '../Renderer/jsm/utils/BufferGeometryUtils.js'

/**
 * 단백질 Spline 포인트 클래스
 * */
export class ptSplinePoint {

    /**
     * 클래스 생성자
     * */
    constructor() {
        this._pos = new THREE.Vector3(0, 0, 0);
        this._normal = new THREE.Vector3(0, 0, 0);
        this._forward = new THREE.Vector3(0, 0, 0);
        this._binormal = new THREE.Vector3(0, 0, 0);
        this._type = 0;
        this._flipped = false;
        this._id = 0;
    }

    /**
     * 타입을 지정한다.
     * @param {any} type 타입
     */
    setType(type) {
        this._type = type;
    }

    /**
     * 위치를 지정한다.
     * @param {any} pos 위치 좌표
     */
    setPos(pos) {
        this._pos.copy(pos);
    }

    /**
     * 노말 벡터를 지정한다.
     * @param {any} normal 노말 벡터
     */
    setNormal(normal) {
        this._normal.copy(normal);
        this._normal.normalize();
    }

    /**
     * forward 벡터를 지정한다.
     * @param {any} forward forward 벡터
     */
    setForward(forward) {
        this._forward.copy(forward);
        this._forward.normalize();

        this._binormal.copy(this._forward);
        this._binormal.cross(this._normal);
        this._binormal.normalize();
    }

    /**
     * flip 상태를 체크한다.
     * @param {any} prev_point flip 기준점
     */
    checkFlip(prev_point) {
        const dot = this._binormal.dot(prev_point._binormal);
        if (dot < 0) {
            this._normal.multiplyScalar(-1);
            this._binormal.multiplyScalar(-1);
            this._flipped = true;
        }
    }

    /**
     * 오브젝트를 복제한다.
     * @returns {ptSplinePoint} 복제된 오브젝트
     * */
    clone() {
        var npos = new ptSplinePoint();

        npos._pos = this._pos.clone();
        npos._normal = this._normal.clone();
        npos._forward = this._forward.clone();
        npos._binormal = this._binormal.clone();
        npos._type = this._type;
        npos._flipped = this._flipped;
        npos._id = this._id;

        return npos;
    }

}

/**
 * 단백질 Spline 벡터 데이터 클래스 
 * */
export class ptSplineV3 {

    /**
     * 클래스 생성자
     * */
    constructor() {
        this._p0 = null;
        this._p1 = null;
        this._p2 = null;
        this._p3 = null;
    }

    /**
     * point list 로 초기화 설정한다.
     * @param {any} p0 point 0
     * @param {any} p1 point 1
     * @param {any} p2 point 2
     * @param {any} p3 point 3
     */
    setupWithArray(p0, p1, p2, p3) {

        const ts = [-1, 0, 1, 2];

        const pos_x = [p0[0], p1[0], p2[0], p3[0]];
        this._sp_pos_x = new Spline(ts, pos_x);

        const pos_y = [p0[1], p1[1], p2[1], p3[1]];
        this._sp_pos_y = new Spline(ts, pos_y);

        const pos_z = [p0[2], p1[2], p2[2], p3[2]];
        this._sp_pos_z = new Spline(ts, pos_z);
    }

    /**
     * point list 로 초기화 설정한다.
     * @param {any} p0
     * @param {any} p1
     * @param {any} p2
     * @param {any} p3
     */
    setup(p0, p1, p2, p3) {

        const ts = [-1, 0, 1, 2];

        const pos_x = [p0.x, p1.x, p2.x, p3.x];
        this._sp_pos_x = new Spline(ts, pos_x);

        const pos_y = [p0.y, p1.y, p2.y, p3.y];
        this._sp_pos_y = new Spline(ts, pos_y);

        const pos_z = [p0.z, p1.z, p2.z, p3.z];
        this._sp_pos_z = new Spline(ts, pos_z);
    }

    /**
     * 매개변수 t 에 대한 위치를 얻는다.
     * @param {any} t 매개변수
     */
    get(t) {
        var pos = new THREE.Vector3(this._sp_pos_x.at(t), this._sp_pos_y.at(t), this._sp_pos_z.at(t));

        return pos;
    }
}

/**
 * 단백질 Spline 데이터 클래스
 * */
export class ptSpline {

    /**
     * 클래스 생성자
     * */
    constructor() {
        this._mesh = new ptMesh();
        this._prevRing = null;
        this._first = true;
    }

    /**
     * blank line 메쉬를 생성한다.
     * @param {any} gr 그룹 오브젝트
     * @param {any} p1 점 1
     * @param {any} p2 점 2
     * @param {any} cr 색상 red
     * @param {any} cg 색상 green
     * @param {any} cb 색상 blue
     */
    static generateBlankLineMesh(gr, p1, p2, cr,cg,cb) {

        var v1 = p2.clone();
        v1.sub(p1);
        const vlen = v1.length() ;
        const dt = 1 / vlen * 1.2;

        var up = new THREE.Vector3(0, 1, 0);

        var matTr = new THREE.Matrix4();
        var matSc = new THREE.Matrix4();
        var matLk = new THREE.Matrix4();
        var pos = new THREE.Vector3();
        var step = dt;
        var st = dt*0.5;
        var ed = 1-st;
        let geoms = [];
        for (var i = st; i <= ed; i += step) {
            pos.set(p1.x, p1.y, p1.z);
            pos.lerp(p2, i);

            matTr.makeTranslation(pos.x, pos.y, pos.z);
            matSc.makeScale(0.2, 0.2, 0.6);
            matLk.lookAt(pos, p2, up);

            matTr.multiply(matLk);
            matTr.multiply(matSc);

            let geom = gr._cylinder.clone();
            geom.applyMatrix4(matTr);
            geoms.push(geom);
            //mergedGeo.merge(gr._cylinder, matTr);
        }

        var mergedGeo = BufferGeometryUtils.mergeBufferGeometries(geoms);


        const material = new THREE.MeshLambertMaterial();
        material.color = new THREE.Color(cr, cg, cb);

        var mesh = new THREE.Mesh(mergedGeo, material)
        mesh._originalColorR = cr;
        mesh._originalColorG = cg;
        mesh._originalColorB = cb;
        mesh._mat = material;
        return mesh;
    }

    /**
     * 포인트 리스트를 사용하여 스플라인을 생성한다.
     * @param {any} sppoint_list 포인트 리스트
     * @param {any} cr 색상 red
     * @param {any} cg 색상 green
     * @param {any} cb 색상 blue
     * @param {any} multiple_mesh 여려개의 메쉬로 생성할지 여부
     */
    generate(sppoint_list, cr, cg, cb, multiple_mesh) {
        const qual = GeomMole.getQuality();
        // 이 두가지로 퀄리티 결정

        var step = 0.099999999;
        switch (qual) {
            case 0:
                step = 0.099999999 * 2;
                break;
            case 1:
                step = 0.099999999;
                break;
            case 2:
                step = 0.099999999 * 0.5;
                break;
            case 3:
                step = 0.099999999 * 0.25;
                break;
        }
        ptRing.setQuality(qual);

        var list = [];


        const len = sppoint_list.length;


        var sp_k = [];
        var sp_px = [];
        var sp_py = [];
        var sp_pz = [];

        var sp_n = [];

        var sp_f = [];

        var sp_b = [];

        for (let i = 0; i < len; i++) {
            let ii = i -1;
            if (ii < 0)
                ii = 0;

            sp_k[i] = i;
            sp_px[i] = sppoint_list[ii]._pos.x;
            sp_py[i] = sppoint_list[ii]._pos.y;
            sp_pz[i] = sppoint_list[ii]._pos.z;
        }


        var b1;
        var b2;
        var a1;
        var a2;

        var spline_px = new Spline(sp_k, sp_px);
        var spline_py = new Spline(sp_k, sp_py);
        var spline_pz = new Spline(sp_k, sp_pz);



        var ring = new ptRing();
        var ringNext = new ptRing();
        var ringEnd = new ptRing();
        var ringPrev = null;
        ringEnd.setEnd();

        if (!multiple_mesh) {
            this._mesh.reset();
        }

        const spline_degree = 3;
        var kk = [];

        var pos;
        var normal;
        var binormal;


        for (var j = 1; j < len-1 ; j++) {
            kk[0] = j - 2;
            kk[1] = j-1;
            kk[2] = j + 0;
            kk[3] = j + 1;
            kk[4] = j + 2;

            if (kk[0] < 0)
                kk[0] = 0;
            if (kk[1] < 0)
                kk[1] = 0;
            if (kk[4] > len - 1)
                kk[4] = len - 1;
            if (kk[5] > len - 1)
                kk[5] = len - 1;


            for (var k = 0; k < 4; k++) {

                const _k = k ;

                sp_n[k] = [sppoint_list[kk[_k]]._normal.x, sppoint_list[kk[_k]]._normal.y, sppoint_list[kk[_k]]._normal.z];

                sp_b[k] = [sppoint_list[kk[_k]]._binormal.x, sppoint_list[kk[_k]]._binormal.y, sppoint_list[kk[_k]]._binormal.z];

                sp_f[k] = [sppoint_list[kk[_k]]._forward.x, sppoint_list[kk[_k]]._forward.y, sppoint_list[kk[_k]]._forward.z];
            }



            var prev_type = sppoint_list[kk[1]]._type;
            var cur_type = sppoint_list[kk[2]]._type;
            const next_type = sppoint_list[kk[3]]._type;
            const cur_id = sppoint_list[kk[2]]._id;

            //if (cur_type == 'S' && (next_type != 'S' || j == len -2)) { // arrow
            //    cur_type = 'A'; // arrow
            //}

            ringNext.set(next_type, 0);


            if (multiple_mesh) {
                this._mesh.reset();
            }

            var first = true;
            for (var i = 0; i <= 1; i += step) {
                //ring.interpolate(ring1, ring2, i);
                ring.set(cur_type, i);

                const ii = i + j;

                pos = new THREE.Vector3(spline_px.at(ii), spline_py.at(ii), spline_pz.at(ii));

                //var _pos = BSpline(i, spline_degree, sp_p);
                var _normal = BSpline(i, spline_degree, sp_n);
                var _forward = BSpline(i, spline_degree, sp_f);
                var _binormal = BSpline(i, spline_degree, sp_b);

                //var pos = new THREE.Vector3(_pos[0], _pos[1], _pos[2]);
                normal = new THREE.Vector3(_normal[0], _normal[1], _normal[2]);
                var forward = new THREE.Vector3(_forward[0], _forward[1], _forward[2]);
                binormal = new THREE.Vector3(_binormal[0], _binormal[1], _binormal[2]);

                normal.normalize();
                forward.normalize();
                binormal.normalize();

                //var binormal = forward.clone();
                //binormal.cross(normal);

                if (ii == 1) {
                    this._mesh.addRingVertex(pos, normal, binormal, ringEnd);
                    this._startPos = pos.clone();
                    first = false;
                } else {
                    if (multiple_mesh) {
                        if (i == 0 && (prev_type != cur_type)) {
                            this._mesh.addRingVertex(pos, normal, binormal, ringPrev);
                            first = false;
                        }
                    }
                }

                this._mesh.addRingVertex(pos, normal, binormal, ring);
                if (!first) {
                    this._mesh.addRingIndex(ring);
                }

                first = false;


                if (ringPrev == null) {
                    ringPrev = new ptRing();
                }
                ringPrev.copyFrom(ring);


            }

            if (multiple_mesh) {

                if (j == len - 2)
                {
                    this._mesh.addRingVertex(pos, normal, binormal, ringEnd);
                    this._mesh.addRingIndex(ringEnd);
                }

                let geometry = this._mesh.generateGeometry();
                geometry._ptPoint = sppoint_list[kk[2]];
                list.push(geometry);


            }

        }

        this._endPos = pos.clone();

        if (multiple_mesh) {
            return list;
        } else {
            this._mesh.addRingVertex(pos, normal, binormal, ringEnd);
            this._mesh.addRingIndex(ringEnd);

            let geometry = this._mesh.generateGeometry();

            return geometry;
        }

    }



}
