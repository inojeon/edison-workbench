
import * as THREE from '../build/three.module.js';

/**
 * 색상 정의 클래스
 * */
class AColor {
    constructor(value, r, g, b) {
        this._value = value;

        this._r = r;
        this._g = g;
        this._b = b;
    }
}

/**
 * Colormap 정의 클래스
 * */
export class Colormap {

    /**
     * color를 초기화한다
     * */
    constructor() {
        this._colors = [];
    }

    /**
     * color를 clear한다
     * */
    clear() {
        this._colors = [];
    }

    /**
     * 색상을 추가한다
     * @param {Number} value 색상의 값
     * @param {Number} r red
     * @param {Number} g green
     * @param {Number} b blue
     */
    addColor(value, r, g, b) {
        var cc = new AColor(value, r, g, b);

        this._colors.push(cc);
    }

    /**
     * value에 해당하는 색상을 가져온다
     * @param {Number} value 색상의 값
     * @returns {Array} 색상
     */
    get(value) {
        var c1 = this.__getMin(value);
        var c2 = this.__getMax(value);
        var dd = c2._value - c1._value;
        if (dd == 0)
            return [c1._r, c1._g, c1._b];

        var t = (value - c1._value) / dd;
        const r = c1._r + (c2._r - c1._r) * t;
        const g = c1._g + (c2._g - c1._g) * t;
        const b = c1._b + (c2._b - c1._b) * t;

        return [r, g, b];
    }

    /**
     * value에 해당하는 색상보다 작은 value의 색상 중 가장 작은 것을 반환한다
     * @param {Number} value 색상의 값
     * @returns {Array} 색상 배열
     */
    __getMin(value) {

        if (this._colors.length == 0)
            return null;

        var I = this;
        var sel;
        var dd = 1000000000000000000;

        this._colors.forEach(function (cc) {
            if (cc._value <= value) {
                const d = value - cc._value;
                if (d < dd) {
                    dd = d;
                    sel = cc;
                }
            }
        });

        if (!sel) {
            return this.__getMax(value);
        }

        return sel;            
    }

    /**
     * value에 해당하는 색상보다 큰 value의 색상 중 가장 큰 것을 반환한다
     * @param {Number} value 색상의 값
     * @returns {Array} 색상 배열
     */
    __getMax(value) {
        if (this._colors.length == 0)
            return null;

        var I = this;
        var sel;
        var dd = 1000000000000000000;

        this._colors.forEach(function (cc) {
            if (cc._value >= value) {
                const d = cc._value - value;
                if (d < dd) {
                    dd = d;
                    sel = cc;
                }
            }
        });

        if (!sel) {
            return this.__getMin(value);
        }

        return sel;            

    }


    test1() {
        this.addColor(0, 1, 0, 0);
        this.addColor(0.2, 1, 1, 0);
        this.addColor(0.4, 0, 0, 1);
        this.addColor(0.6, 0, 1, 0);
        this.addColor(0.8, 0, 1, 1);
        this.addColor(1, 0, 1, 0);
    }
};