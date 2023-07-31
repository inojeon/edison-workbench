import * as THREE from '../build/three.module.js';
import { BufferGeometryUtils } from '../Renderer/jsm/utils/BufferGeometryUtils.js'

/**
 * 랜덤 숫자를 생성한다.
 * @param {Number} seed 랜덤 시드
 */
export function seedRandom(seed) {
    let value = seed;
    
    return function () {
        value = value * 16807 % 2147483647;
        return value;
    }
}


var _cylinder;

/**
 * Renderer 유틸리티 클래스
 * */
export class Util {

    /*
     * Axis Geom 객체를 생성한다.
     * @returns {Object} Axis Geom 객체
     * */
    static generateAxisGeom() {

        var geom = new THREE.BufferGeometry();
        var mat = new THREE.Matrix4();

        var bx = new THREE.CylinderGeometry(1, 1, 1, 8).lookAt(new THREE.Vector3(10, 0, 0));
        var cx = new THREE.ConeGeometry(5, 20, 32).lookAt(new THREE.Vector3(10, 0, 0)).translate(1, 0, 0);

        var by = new THREE.CylinderGeometry(1, 1, 1, 8).lookAt(new THREE.Vector3(0, 10, 0));
        var cy = new THREE.ConeGeometry(5, 20, 32).lookAt(new THREE.Vector3(0, 10, 0)).translate(0, 1, 0);


        var bz = new THREE.CylinderGeometry(1, 1, 1, 8).lookAt(new THREE.Vector3(0, 0, 10));
        var cz = new THREE.ConeGeometry(5, 20, 32).lookAt(new THREE.Vector3(0, 0, 10)).translate(0, 0, 1);

        geom.merge(bx, mat);
        geom.merge(cx, mat);

        geom.merge(by, mat);
        geom.merge(cy, mat);

        geom.merge(bz, mat);
        geom.merge(cz, mat);

        geom.computeVertexNormals();

        return geom;

    }

    /**
     * 여러개의 geometry를 병합한다.
     * @param {Array} geometry_list 합칠 geometry 리스트
     * @returns {THREE.Geometry} 병합된 geometry
     */
    static mergeGeometries(geometry_list) {
        var geom = new THREE.BufferGeometry();
        var mat = new THREE.Matrix4();

        for (let i = 0; i < geometry_list.length; i++) {
            if (!geometry_list[i])
                continue;
            geom.merge(geometry_list[i], mat);
        }

        return geom;
    }

    /**
     * 3D 점선 객체를 생성한다.
     * @param {THREE.Vector3} p1 시작점 좌표
     * @param {THREE.Vector3} p2 끝점 좌표
     * @returns {THREE.Geometry} 생성된 geometry
     */
    static generateDottedLineGeom(p1, p2) {

        if (!_cylinder) {
            _cylinder = new THREE.CylinderGeometry(0.2, 0.2, 0.3, 4).lookAt(new THREE.Vector3(0, 10, 0));
        }

        var v1 = p2.clone();
        v1.sub(p1);
        const vlen = v1.length();
        const dt = 1 / vlen * 0.5;


        var step = dt;
        var st = 0;
        var ed = 1;

        var up = new THREE.Vector3(0, 1, 0);

        //var mergedGeo = new THREE.BufferGeometry();
        var listGeom = [];

        var matTr = new THREE.Matrix4();
        var matSc = new THREE.Matrix4();
        var matLk = new THREE.Matrix4();
        var pos = new THREE.Vector3();
        for (var i = st; i <= ed; i += step) {
            pos.set(p1.x, p1.y, p1.z);
            pos.lerp(p2, i);

            matTr.makeTranslation(pos.x, pos.y, pos.z);
            matSc.makeScale(0.2, 0.2, 0.6);
            matLk.lookAt(pos, p2, up);

            matTr.multiply(matLk);
            matTr.multiply(matSc);

            //mergedGeo.merge(_cylinder, matTr);
            var dgeom = _cylinder.clone().applyMatrix4(matTr);
            listGeom.push(dgeom);
        }

        var mergedGeo = BufferGeometryUtils.mergeBufferGeometries(listGeom);
        return mergedGeo;
    }

    /**
     * 하나의 Geom 데이터를 딕셔너리에 등록한다.
     * @param {Object} dic 딕셔너리
     * @param {Geom} geom geom 데이터
     */
    static markOneGeomDic(dic, geom) {
        let id = geom.GetID();
        dic[id] = geom;
        let type = geom.GetType();

        if (type == 6) // group
        {
            let len = geom.GetNumberOfChildren();
            let i;
            for (i = 0; i < len; i++) {
                let child = geom.Get(i);
                Util.markOneGeomDic(dic, child);
            }
        }
    }

    /**
     * Geom 데이터를 딕셔너리에 등록한다.
     * @param {Object} dic 딕셔너리
     * @param {Geom} geom geom 데이터
     */
    static makeGeomDic(dic, geom) {
        Util.markOneGeomDic(dic, geom);
    }

    /**
     * 세 점이 만드는 평면의 노말 벡터를 계산한다.
     * @param {THREE.Vector3} p1 점 1 좌표
     * @param {THREE.Vector3} p2 점 2 좌표
     * @param {THREE.Vector3} p3 점 3 좌표
     */
    static calcNormal(p1, p2, p3) {
        let v1 = p2.clone();
        v1.sub(p1);
        let v2 = p3.clone();
        v2.sub(p2);
        let v3 = v2.cross(v1);

        return v3;
    }

    /**
     * 배열의 구성 요소 순서를 뒤집는다.
     * @param {Array} array 배열
     * @returns {Array} 변환된 배열
     */
    static flipArray(array) {
        const len = array.length;
        let array2 = [];
        for (let i = len - 1; i >= 0; i--) {
            array2.push(array[i]);
        }

        return array2;
    }
}


