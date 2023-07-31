import { Vector3 } from '../Math/Vector3.js';
import { CStructure } from './CStructure.js';
import { iVector } from './iVector.js';

// tVector를 사용하여 실제 벡터를 정의
// tvector와 unitcell과 index를 사용하여 정의

/**
 * tVector 클래스를 통해 iVector를 생성하는데 필요한 클래스
 * */
export class aVector {

    /**
     * tvector를 지정한다.
     * @param {tVector} tvector aVector에 대한 정의
     */
    constructor(tvector) {
        this._def = tvector;
        this._index = -1;
        this._catom = null;
    }

    /**
     * catom을 지정한다.
     * @param {cAtom} catom
     */
    setCAtom(catom) {
        this._catom = catom;
        this._unitcellPos = null;
    }

    /**
     * vector가 추가될 위치와 인덱스를 지정한다.
     * @param {Array} opos unitcell 상의 위치
     * @param {Number} index iAtom index
     */
    setiAtomPos(opos, index) {
        this._index = index;
        this._unitcellPos = opos;
    }

    /**
     * tvector를 지정한다.
     * @param {tVector} tvector aVector의 정의
     */
    setDef(tvector) {
        this._def = tvector;
    }

    /**
     * number를 지정한다.
     * @param {Number} number
     */
    setNumber(number) {
        this._number = number;
    }

    /**
     * unitcell 위치를 지정한다.
     * @param {Number} x
     * @param {Number} y
     * @param {Number} z
     */
    setUnitcellLoc(x, y, z) {
        this._unitcellPos = [x, y, z];
    }

    /**
     * aVector 비교 함수
     * @param {Number} x
     * @param {Number} y
     * @param {Number} z
     * @param {Number} index
     * @returns {Boolean} 일치 여부
     */
    isIt(x, y, z, index) {
        return this._unitcellPos[0] == x && this._unitcellPos[1] == y && this._unitcellPos[2] == z && this._iatom._index == index;
    }

    /**
     * ivector를 생성한다.
     * @param {iAtom} iatom
     * @param {CStructure} cs
     * @returns {iVector} 생성된 ivector
     */
    generateIVector(iatom, cs) {
        let iv = new iVector(this._def, iatom, cs );

        return iv;
    }

    /**
     * aVector를 통해 iVector를 생성한다.
     * @returns {iVector} 생성된 ivector
     * */
    generate() {
        let iv = new iVector(this._def , this._color);

        return iv;
    }

    /**
     * clone method
     * @param {CAtom} catom
     * @returns {CAtom} cloned catom
     */
    clone(catom) {
        let clone = new aVector(this._def.clone());

        clone._catom = catom;
        clone._index = this._index;
        if (this._unitcellPos)
            clone._unitcellPos = this._unitcellPos.clone();
        else
            clone._unitcellPos = null;

        clone._number = this._number;

        return clone;
    }

    /**
     * aVector를 저장하려는 형태로 반환한다.
     * @returns {Object} aVector 데이터
     * */
    createData4Save() {
        let dat = {};

        dat._def = this._def;
        dat._index = this._index;
        dat._unitcellPos = this._unitcellPos;

        return dat;
    }
}