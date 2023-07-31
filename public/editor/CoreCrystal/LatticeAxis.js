import * as THREE from '../build/three.module.js';
import { Vector3 } from '../Math/Vector3.js';
import { GeomMole } from '../Renderer/GeomMole.js';

const _axisX = new THREE.Vector3(1, 0, 0);
const _axisY = new THREE.Vector3(0, 1, 0);
const _axisZ = new THREE.Vector3(0, 0, 1);

const _degree2radian = 3.1415927 / 180;

/**
 * Lattice Axis 클래스
 * */
export class LatticeAxis {

    /**
     * 생성자
     * @param {Number} a alpha
     * @param {Number} b beta
     * @param {Number} c gamma
     * @param {Number} la length a
     * @param {Number} lb length b
     * @param {Number} lc length c
     */
    constructor(a, b, c, la, lb, lc) {
        this._va = new THREE.Vector3();
        this._vb = new THREE.Vector3();
        this._vc = new THREE.Vector3();

        this.set(a, b, c, la, lb, lc);


    }

    /**
     * miller index를 계산한다.
     * @param {Number} h 
     * @param {Number} s
     * @param {Number} v
     * @returns {THREE.Vector3}
     */
    calcMillerIndices(h, s, v) {

        if (h == 0 && s == 0 && v == 0) {
            return null;
        }


        if (h != 0 && s != 0 && v != 0) {
            let _h = 1 / h;
            let _s = 1 / s;
            let _v = 1 / v;

            let a = this._va.clone();
            let b = this._vb.clone();
            let c = this._vc.clone();

            a.multiplyScalar(_h);
            b.multiplyScalar(_s);
            c.multiplyScalar(_v);

            a.add(b);
            a.add(c);

            return a;
        }
        else if (h == 0 && s != 0 && v != 0) {
            let _s = 1 / s;
            let _v = 1 / v;

            let b = this._vb.clone();
            let c = this._vc.clone();

            b.multiplyScalar(_s);
            c.multiplyScalar(_v);

            b.add(c);

            return b;
        }
        else if (h != 0 && s == 0 && v != 0) {
            let _h = 1 / h;
            let _v = 1 / v;

            let a = this._va.clone();
            let c = this._vc.clone();

            a.multiplyScalar(_h);
            c.multiplyScalar(_v);

            a.add(c);

            return a;
        }
        else if (h != 0 && s != 0 && v == 0) {
            let _h = 1 / h;
            let _s = 1 / s;

            let a = this._va.clone();
            let b = this._vb.clone();

            a.multiplyScalar(_h);
            b.multiplyScalar(_s);

            a.add(b);

            return a;


        }
        else if (h == 0 && s == 0 && v != 0) {
            let _v = 1 / v;


            let c = this._vc.clone();

            c.multiplyScalar(_v);

            return c;
        }
        else if (h == 0 && s != 0 && v == 0) {
            let _s = 1 / s;

            let b = this._vb.clone();

            b.multiplyScalar(_s);

            return b;
        }
        else if (h != 0 && s == 0 && v == 0) {
            let _h = 1 / h;

            let a = this._va.clone();

            a.multiplyScalar(_h);

            return a;

        } else {

        }

        return null;
    }

    /**
     * clone method
     * @returns {LatticeAxis} cloned lattice axis
     * */
    clone() {
        let clone = new LatticeAxis();

        clone._a = this._a ;
        clone._b = this._b ;
        clone._c = this._c ;

        clone._la = this._la ;
        clone._lb = this._lb ;
        clone._lc = this._lc ;

        clone.calculate();

        return clone;
    }

    /**
     * lattice axis 설정
     * @param {Number} a alpha
     * @param {Number} b beta 
     * @param {Number} c gamma
     * @param {Number} la length a
     * @param {Number} lb length b
     * @param {Number} lc length c
     */
    set(a, b, c, la, lb, lc) {
        this._a = a;
        this._b = b;
        this._c = c;

        this._la = la;
        this._lb = lb;
        this._lc = lc;

        this.calculate();
    }

    /**
     * lattice axis의 length를 설정한다.
     * @param {Number} la length a
     * @param {Number} lb length b
     * @param {Number} lc length c
     */
    setLength(la, lb, lc) {
        this._la = la;
        this._lb = lb;
        this._lc = lc;

        this.calculate();
    }

    /**
     * lattice axis의 angle를 설정한다.
     * @param {Number} a alpha
     * @param {Number} b beta
     * @param {Number} c gamma
     */
    setAngle(a, b, c) {
        this._a = a;
        this._b = b;
        this._c = c;

        this.calculate();
    }

    /**
     * lattice axis transform
     * @param {THREE.Vector3} v1 transform을 나타내는 vector
     * @returns {THREE.Vector3}
     */
    transform(v1) {
        let va = this._va.clone();
        let vb = this._vb.clone();
        let vc = this._vc.clone();

        va.multiplyScalar(v1.x);
        vb.multiplyScalar(v1.y);
        vc.multiplyScalar(v1.z);

        va.add(vb).add(vc);

        return va;
    }

    /**
     * lattice axis calculate
     * @returns {THREE.Vector3}
     * */
    calculate_() {
        this._va.fromArray([this._la, 0, 0], 0);
        this._vb.fromArray([this._lb, 0, 0], 0);
        this._vc.fromArray([0, 0, this._lc], 0);

        let q = new THREE.Quaternion();
        q.setFromAxisAngle(_axisZ, this._c * _degree2radian);
        this._vb.applyQuaternion(q);

        let cos1 = Math.cos(this._b * _degree2radian);
        let cos2 = Math.cos(this._a * _degree2radian);

        let v1 = this._va.clone();
        v1.normalize();

        let v2 = this._vb.clone();
        v2.normalize();

        let x1 = v1.x;
        let y1 = v1.y;
        let z1 = v1.z;

        let x2 = v2.x;
        let y2 = v2.y;
        let z2 = v2.z;

        let a = cos1 / x1;
        let bb = Math.sqrt(4 * z2 * z2 * cos2 * cos2 - 4 * (z2 * z2 + y2 * y2) * (cos2 * cos2 + a * a * y2 * y2 - y2 * y2));
        let c = (2 * z2 * cos2 + bb) / (2 * (z2 * z2 + y2 * y2));
        let b = (cos2 - c * z2) / y2;

        this._vc.fromArray([a * this._lc, b * this._lc, c * this._lc], 0);

    }

    /**
     * lattice axis calculate
     * */
    calculateAB() {
        this._va.fromArray([this._la, 0, 0], 0);
        this._vc.fromArray([0, 0, this._lc], 0);

        this._vb.fromArray([this._lb, 0, 0], 0);

        let q = new THREE.Quaternion();
        q.setFromAxisAngle(_axisZ, this._c * _degree2radian);
        this._vb.applyQuaternion(q);
    }

    /**
     * lattice axis calculate
     * */
    calculateAC() {
        this._va.fromArray([this._la, 0, 0], 0);
        this._vb.fromArray([0, this._lb, 0], 0);

        this._vc.fromArray([this._lc,0, 0], 0);

        let q = new THREE.Quaternion();
        q.setFromAxisAngle(_axisY, -this._b * _degree2radian);
        this._vc.applyQuaternion(q);
    }

    /**
     * lattice axis calculate
     * */
    calculateBC() {
        this._va.fromArray([this._la, 0, 0], 0);
        this._vb.fromArray([0, this._lb, 0], 0);

        this._vc.fromArray([0, this._lc, 0], 0);

        let q = new THREE.Quaternion();
        q.setFromAxisAngle(_axisX, this._a * 3.14159 / 180);
        this._vc.applyQuaternion(q);
    }

    /**
     * lattice axis calculate
     * */
    calculateABC() {
        this._va.fromArray([this._la, 0, 0], 0);
        this._vb.fromArray([0,this._lb, 0], 0);
        this._vc.fromArray([0,0, this._lc], 0);
    }

    /**
     * lattice axis calculate
     * @returns {THREE.Vector3}
     * */
    calculate() {
        if (this._a == 90) {
            if (this._b == 90) {
                if (this._c == 90) {
                    return this.calculateABC();
                } else {
                    return this.calculateAB();
                }
            }
            if (this._c == 90) {
                return this.calculateAC();
            }
        }

        return this.calculate_();
    }

}