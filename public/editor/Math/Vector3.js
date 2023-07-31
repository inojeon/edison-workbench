import * as THREE from '../build/three.module.js';

/**
 * 3차원 벡터 클래스
 * */
export class Vector3 {

    /**
     * 두 벡터의 거리를 계산한다.
     * @param {Vector3} vector1
     * @param {Vector3} vector2
     * @returns {Number} 두 벡터의 거리 값
     */
    static distance(vector1, vector2) {
        let vv = vector1.clone().sub(vector2);
        return vv.length();
    }

    /**
     * 클래스 생성자
     * @param {Number} x 벡터 x값
     * @param {Number} y 벡터 y값
     * @param {Number} z 벡터 z값
     */
    constructor(x, y, z) {
        this.set(x, y, z);

        return this;
    }

    createTHREE() {
        let v = new THREE.Vector3(this._x, this._y, this._z);

        return v;
    }

    /**
     * 벡터의 요소 값을 설정한다.
     * @param {Number} x 벡터 x값
     * @param {Number} y 벡터 y값
     * @param {Number} z 벡터 z값
     */
    set(x, y, z) {
        if (x instanceof Vector3) {
            this._x = x._x;
            this._y = x._y;
            this._z = x._z;
        }
        else if (x === undefined) {
            this._x = 0;
            this._y = 0;
            this._z = 0;
        } else {
            this._x = x;
            this._y = y;
            this._z = z;
        }

        return this;

    }

    /**
     * number array 에서 값을 가져와 벡터 요소 값을 설정한다.
     * @param {Array} array number array
     */
    fromArray(array) {
        this._x = array[0];
        this._y = array[1];
        this._z = array[2];
        return this;
    }

    /**
     * 벡터 각 요소의 값을 더한다.
     * @param {Number} x 벡터 x 증가값
     * @param {Number} y 벡터 y 증가값
     * @param {Number} z 벡터 z 증가값
     * @returns {Vector3} 계산 결과 벡터 데이터
     */
    add(x, y, z) {
        if (x instanceof Vector3) {
            this._x += x._x;
            this._y += x._y;
            this._z += x._z;
        } else {
            this._x += x;
            this._y += y;
            this._z += z;
        }
        return this;
    }

    /**
     * 벡터 각 요소의 값을 감소시킨다.
     * @param {Number} x 벡터 x 감소값
     * @param {Number} y 벡터 y 감소값
     * @param {Number} z 벡터 z 감소값
     * @returns {Vector3} 계산 결과 벡터 데이터
     */
    sub(x, y, z) {
        if (x instanceof Vector3) {
            this._x -= x._x;
            this._y -= x._y;
            this._z -= x._z;
        } else {
            this._x -= x;
            this._y -= y;
            this._z -= z;
        }
        return this;
    }

    /**
     * 벡터의 각 요소에 스칼라 값을 곱한다.
     * @param {Number} a 곱할 값
     * @returns {Vector3} 계산 결과 벡터 데이터
     */
    mulScalar(a) {
        this._x *= a;
        this._y *= a;
        this._z *= a;

        return this;
    }

    /**
     * 벡터 각 요소에 값을 각각 곱한다.
     * @param {Number} x 벡터 x 곱할 값
     * @param {Number} y 벡터 y 곱할 값
     * @param {Number} z 벡터 z 곱할 값
     * @returns {Vector3} 계산 결과 벡터 데이터
     */
    mul(x,y,z) {
        if (x instanceof Vector3) {
            this._x *= x._x;
            this._y *= x._y;
            this._z *= x._z;

        }
        else {
            this._x *= x;
            this._y *= y;
            this._z *= z;
        };

        return this;
    }

    /**
     * 벡터 각 요소에 값을 각각 나눈다.
     * @param {Number} x 벡터 x 나눌 값
     * @param {Number} y 벡터 y 나눌 값
     * @param {Number} z 벡터 z 나눌 값
     * @returns {Vector3} 계산 결과 벡터 데이터
     */
    div(x, y, z) {
        if (x instanceof Vector3) {
            this._x /= x._x;
            this._y /= x._y;
            this._z /= x._z;

        }
        else {

            this._x /= x;
            this._y /= y;
            this._z /= z;
        };

        return this;
    }

    /**
     * 다른 벡터와 dot product 를 계산한다.
     * @param {Vector3} v dot product를 계산할 벡터
     * @returns {Number} 계산된 dot product 값
     */
    dot(v) {
        let value = this._x * v._x + this._y * v._y + this._z * v._z;

        return value;
    }

    /**
     * 벡터의 길이 값을 계산한다.
     * @returns {Number} 벡터 길이 값
     * */
    length() {
        return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z);

    }

    /**
     * 다른 벡터와 cross product 를 계산한다.
     * @param {Vector3} v cross product를 계산할 벡터
     * @returns {Vector3} 계산된 cross product 벡터
     */
    cross(vector) {

        var x = this.x;
        var y = this.y;
        var z = this.z;

        let cv = new Vector3();
        cv.x = y * vector.z - z * vector.y;
        cv.y = z * vector.x - x * vector.z;
        cv.z = x * vector.y - y * vector.x;

        return cv;
    }

    /**
     * 벡터를 정규화시킨다.
     * @returns {Vector3} 정규화 된 벡터 데이터
     * */
    normalize() {
        let len = this.length();
        this.div(len, len, len);
        return this;
    }

    /**
     * 다른 벡터와 이루는 각도를 계산한다.
     * @param {Vector3} vector 각도를 계산할 벡터
     * @returns {Number} 계산된 각도
     */
    angle(vector) {
        return Math.acos(this.dot(vector) / (this.length() * vector.length()));
    };

    /**
     * 벡터 데이터를 복제한다.
     * @returns {Vector3} 복제된 벡터 데이터
     * */
    clone() {
        let v = new Vector3(this);
        return v;
    }
}
