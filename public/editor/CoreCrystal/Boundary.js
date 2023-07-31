import { Vector3 } from '../Math/Vector3.js';

/**
 * Crystal Structure 경계 클래스
 * */
export class Boundary {

    /**
     * 생성자
     * */
    constructor() {
        this._min = new Vector3(0,0,0);
        this._max = new Vector3(1,1,1);

        this._imin = new Vector3();
        this._imax = new Vector3();

        this._cutoffPlanes = [];
    }

    /**
     * cutoff 평면을 추가한다.
     * @param {Plane} plane 추가할 plane
     */
    addPlane(plane) {
        this._cutoffPlanes.push(plane);
    }

    /**
     * cutoff 평면을 제거한다.
     * @param {Plane} plane 제거할 plane
     */
    removePlane(plane) {
        const idx = this._cutoffPlanes.indexOf(plane);
        if (idx > -1)
            this._cutoffPlanes.splice(idx, 1);
    }

    /**
     * cutoff 평면을 모두 삭제한다.
     * */
    clearPlane() {
        this._cutoffPlanes = [];
    }

    /**
     * clone method
     * @returns {Boundary} cloned Boundary
     * */
    clone() {
        let clone = new Boundary();

        clone._min = this._min.clone();
        clone._max = this._max.clone();

        clone._imin = this._imin.clone();
        clone._imax = this._imax.clone();

        return clone;
    }

    /**
     * boundary min, max를 설정한다.
     * @param {Vector3} lt left top
     * @param {Vector3} rb right bottom
     */
    set(lt, rb) {
        this._min = lt.clone();
        this._max = rb.clone();

        this.update();
    }

    /**
     * imin, imax 값을 갱신한다.
     * */
    update() {
        this._imin._x = Math.floor(this._min._x)-1;
        this._imin._y = Math.floor(this._min._y)-1;
        this._imin._z = Math.floor(this._min._z)-1;

        this._imax._x = Math.floor(this._max._x)+1;
        this._imax._y = Math.floor(this._max._y)+1;
        this._imax._z = Math.floor(this._max._z)+1;
    }

    /**
     * 주어진 boundary를 복제한다.
     * @param {Boundary} boundary
     * @returns {Boundary} this
     */
    cloneFromBoundary(boundary) {
        Object.assign(this, boundary);
        this._min = new Vector3(this._min._x, this._min._y, this._min._z);
        this._max = new Vector3(this._max._x, this._max._y, this._max._z);
        this._imin = new Vector3(this._imin._x, this._imin._y, this._imin._z);
        this._imax = new Vector3(this._imax._x, this._imax._y, this._imax._z);

        return this;
    }

    /**
     * boundary를 저장하려는 형태로 반환한다. 
     * @returns {Object} boundary data
     * */
    createData4Save() {
        let dat = {};

        dat._min = this._min.clone();
        dat._max = this._max.clone();

        dat._cutoffPlanes = [];

        for (let i = 0; i < this._cutoffPlanes.length; i++) {
            let pp = this._cutoffPlanes[i];
            let pp2 = pp.clone();

            dat._cutoffPlanes.push(pp2);
        }        

        return dat;
    }

    isIn(pos, pos2) {

        for (let i = 0; i < this._cutoffPlanes.length; i++) {
            let pp = this._cutoffPlanes[i];

            if (!pp.isIn(pos2)) {
                return false;
            }
        }

        if (this._min._x <= pos.x && pos.x <= this._max._x
            && this._min._y <= pos.y && pos.y <= this._max._y
            && this._min._z <= pos.z && pos.z <= this._max._z) {
            return true;
        }

        return false;


    }
}