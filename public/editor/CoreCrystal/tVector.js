import { Vector3 } from '../Math/Vector3.js';

/**
 * Template Vector 클래스
 * */
export class tVector {

    /**
     * 생성자
     * @param {Array} vector vector array
     * @param {Array} color color array
     * @param {Number} radius radius number
     */
    constructor(vector, color, radius) {
        this._vector = [vector[0], vector[1], vector[2]];
        this._color = [color[0], color[1], color[2]];
        this._number = -1;
        this._radius = radius;
    }

    /**
     * clone method
     * @returns {tVector} cloned tVector
     * */
    clone() {
        let clone = new tVector(this._vector, this._color, this._radius);

        clone._number = this._number;

        return clone;
    }

    /**
     * tVector를 저장하려는 형태로 변환한다.
     * @returns {Object} 
     * */
    createData4Save() {
        let dat = {};

        dat._vector = [...this._vector];
        dat._color = [...this._color];
        dat._number = this._number;
        dat._radius = this._radius;

        return dat;
    }
}