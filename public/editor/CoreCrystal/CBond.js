import { Vector3 } from '../Math/Vector3.js';
import { AtomDef } from '../Renderer/AtomDef.js';
import { CAtom } from './CAtom.js';
import { CStructure } from './CStructure.js';

/**
 * Crystal Bond 클래스
 * */
export class CBond {

    /**
     * 생성자
     * */
    constructor() {
        this._A1 = ""; // atom number 
        this._A2 = ""; // atom number 

        this._A1Idx = -1;
        this._A2Idx = -1;

        this._minLength = 0; // 결합의 최소 길이
        this._maxLength = 0; // 결합의 최대 길이

        this._boundaryMode = 0;
        this._searchMode = 0;
        this._showPolyhedral = true;

        this._idx = -1; // 테이블 상에서 구분하기 위한 id
    }

    /**
     * clone method
     * @returns {CBond} cloned bond
     * */
    clone() {
        let clone = new CBond();

        clone._idx = this._idx;

        clone._A1 = this._A1;
        clone._A2 = this._A2;

        clone._A1Idx = this._A1Idx;
        clone._A2Idx = this._A2Idx;

        clone._minLength = this._minLength;
        clone._maxLength = this._maxLength;

        clone._boundaryMode = this._boundaryMode;
        clone._searchMode = this._searchMode;
        clone._showPolyhedral = this._showPolyhedral;

        return clone;
    }

    touch() {
        if (this._A1) 
            this._A1Idx = this._A1._idx;
        if (this._A2)
            this._A2Idx = this._A2._idx;
    }

    /**
     * 최소, 최대 길이를 설정한다
     * @param {Vector3} min 최소 길이
     * @param {Vector3} max 최대 길이
     */
    setLength(min, max) {
        this._minLength = min;
        this._maxLength = max;
    }

    /**
     * bond와 연결되는 atom을 설정한다.
     * @param {CAtom} atom1 첫번째 결합 원자
     * @param {CAtom} atom2 두번째 결합 원자
     */
    setAtom(atom1, atom2) {

        this._A1Idx = atom1._idx;
        this._A2Idx = atom2._idx;

        this._A1 = atom1._id;
        this._A2 = atom2._id;
    }

    /**
     * 결합된 원자를 비교한다.
     * @param {CAtom} atom1 첫번째 결합 원자
     * @param {CAtom} atom2 두번째 결합 원자
     * @returns {Boolean} 매칭 여부
     */
    condition(atom1, atom2) {
        let res = false;

        
        let adef1 = AtomDef.GetDefWithNumber(this._A1);
        let adef2 = AtomDef.GetDefWithNumber(this._A2);

        if (isNaN(atom1._def._id) && (atom1._def._id === AtomDef.GetDefWithID(this._A1)._atom_number) && isNaN(atom2._def._id) && (atom2._def._id === AtomDef.GetDefWithID(this._A2)._atom_number))
            res = true
        else {
            if (adef1 && adef2) {
                if (atom1._def._id === adef1._atom_number &&
                    atom2._def._id === adef2._atom_number)
                    res = true;
                else if (atom1._def._id === adef2._atom_number &&
                    atom2._def._id === adef1._atom_number) {
                    res = true;
                }
            }
        }
        
        /*
        if (cs._atoms[this._A1Idx] === atom1._def && cs._atoms[this._A2Idx] === atom2._def)
            res = true;

        if (cs._atoms[this._A1Idx] === atom2._def && cs._atoms[this._A2Idx] === atom1._def)
            res = true;
         */
        if(res) {

            const len = Vector3.distance(atom1._position2, atom2._position2);

            return (len >= this._minLength && len <= this._maxLength);
        }

        return false;
    }

    /**
     * 주어진 bond를 복사한다.
     * @param {cBond} bond 복사하려는 cBond
     * @returns {CBond} this
     */
    cloneFromBond(bond) {
        Object.assign(this, bond);

        return this;
    }

    /**
     * cbond를 저장하려는 형태로 변환한다.
     * @returns {Object} CBond data
     * */
    createData4Save() {
        let dat = new CBond();

        Object.assign(dat, this);

        delete dat._idx;

        return dat;
    }

}