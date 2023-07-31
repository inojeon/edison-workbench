import * as THREE from '../build/three.module.js';
import { LatticeAxis } from './LatticeAxis.js';

/**
 * Plane 클래스
 * */
export class Plane {

    /**
     * 생성자
     * */
    constructor() {
        this._position = new THREE.Vector3(0,0,0);
        this._normal = new THREE.Vector3(1, 0, 0);

        this._h = 0;
        this._k = 0;
        this._l = 1;
        this._d = 1;

        this._color = [1, 1, 1, 1];
        this._latticeAxis = null;

        this._id = -1;
    }

    /**
     * plane의 색상을 설정한다.
     * @param {Number} r red
     * @param {Number} g green
     * @param {Number} b blue
     * @param {Number} a alpha
     */
    setColor(r, g, b, a) {
        this._color = [r, g, b, a];
    }

    /**
     * miller index를 설정한다.
     * @param {LatticeAxis} lattice_axis
     * @param {Number} h
     * @param {Number} k
     * @param {Number} l
     * @param {Number} distance
     */
    setMillerIndices(lattice_axis, h, k, l, distance) {

        this._h = h;
        this._k = k;
        this._l = l;
        this._d = distance;
        this._latticeAxis = lattice_axis;

        this.calculate();
    }

    /**
     * miller index calculate
     * */
    calculate() {
        let normal = this._latticeAxis.calcMillerIndices(this._h, this._k, this._l);
        if (normal == null)
            return false;

        this._normal = normal;

        this._position = this._normal.clone();
        let d = this._position.length();
        this._position.multiplyScalar(this._d / d);
    }

    /**
     * clone method
     * @returns {Plane} cloned plane
     * */
    clone() {
        let clone = new Plane();

        clone._color = [this._color[0], this._color[1], this._color[2], this._color[3]];
        clone.setMillerIndices(this._latticeAxis, this._h, this._k, this._l, this._d);

        return clone;
    }

    isIn(pos) {
        let pp = pos.clone();
        pp.sub(this._position);
        let val = pp.dot(this._normal);

        return val < 0;
    }


    /**
     * 저장하기 위한 형태로 변경
     * @returns {Object}
     * */
    createData4Save() {

        let dat = {};

        dat._h = this._h;
        dat._k = this._k;
        dat._l = this._l;
        dat._d = this._d;
        dat._latticeAxis = this._latticeAxis;

        dat._color = [this._color[0], this._color[1], this._color[2], this._color[3]];

        return dat;
    }

    /**
     * 주어진 plane으로부터 clone
     * @param {Plane} plane 
     * @returns {Plane} this
     */
    cloneFromPlane(plane) {
        Object.assign(this, plane);
        delete this._id;

        this._latticeAxis = new LatticeAxis(this._latticeAxis._a, this._latticeAxis._b, this._latticeAxis._c, this._latticeAxis._la, this._latticeAxis._lb, this._latticeAxis._lc);
        this.setMillerIndices(this._latticeAxis, this._h, this._k, this._l, this._d);

        return this;
    }
}