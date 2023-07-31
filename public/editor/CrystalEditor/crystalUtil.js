import * as THREE from '../build/three.module.js';
import { BufferGeometryUtils } from '../Renderer/jsm/utils/BufferGeometryUtils.js'

var _cylinder;

/**
 * dotted line을 생성하기 위한 util 클래스
 * */
export class crystalUtil {

    /**
     * 생성자
     * */
    constructor() {
        crystalUtil._cylinder = null;
    }

    /**
     * 3D 점선 객체를 생성한다.
     * @param {THREE.Vector3} p1 시작점 좌표
     * @param {THREE.Vector3} p2 끝점 좌표
     * @returns {THREE.Geometry} 생성된 geometry
     */
    static generateDottedLineGeom(p1, p2) {

        if (!crystalUtil._cylinder) {
            crystalUtil._cylinder = new THREE.CylinderGeometry(0.1, 0.1, 0.15, 4).lookAt(new THREE.Vector3(0, 10, 0));
        }

        var v1 = p2.clone();
        v1.sub(p1);
        const vlen = v1.length();
        const dt = 1 / vlen * 0.2;


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
            var dgeom = crystalUtil._cylinder.clone().applyMatrix4(matTr);
            listGeom.push(dgeom);
        }

        var mergedGeo = BufferGeometryUtils.mergeBufferGeometries(listGeom);
        return mergedGeo;
    }

    /**
     * 2D 사각형 객체를 생성한다.
     * @param {THREE.Vector3} p1 시작점 좌표
     * @param {THREE.Vector3} p2 끝점 좌표
     * @returns {THREE.Geometry} 생성된 geometry
     */
    static generateRectangleGeom(p1, p2) {
        let rect = new THREE.PlaneBufferGeometry(Math.abs(p1.x - p2.x), Math.abs(p1.y - p2.y));

        return rect;
    }
}