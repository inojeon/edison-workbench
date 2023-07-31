import { Vector3 } from '../Math/Vector3.js';
import { AtomDef } from './AtomDef.js';
import { aVector } from './aVector.js';
import { iVector } from './iVector.js';

/**
 * Crystal Atom 클래스
 * */
export class CAtom {

    /**
     * 생성자
     * */
    constructor() {
        this._position = new Vector3();
        this._id = 0; // id
        this._idx = -1; // 테이블 상에서 구분하기 위한 id
        this._index4cstructure = -1; // cstructure의 index
        this._def = null;
        this._type = 0; 
        this._label = "";
        this._charge = 0;

        this._visible = true;

        this._avectors = [];
        this._vectorIdx = [];


        this._occ = null;

        this._anisotype = null;
        this._isotype = null;
        
        this._su = [];
        this._anisoU = [];
        this._anisoBeta = [];
        this._isoU = null;
        this._isoB = null;
        this._color = [1, 1, 1];

    }

    /**
     * clone method
     * @returns {CAtom} cloned catom
     * */
    clone() {
        this.prepare4Save();

        let clone = new CAtom();
        clone._position = this._position.clone();

        clone._id = this._id;
        clone._idx = this._idx;
        clone._def = this._def ;
        clone._type = this._type ;
        clone._label = this._label;
        clone._charge = this._charge;
        clone._visible = this._visible;
        clone._vectorIdx = this._vectorIdx;
        clone._index4cstructure = this._index4cstructure;

        clone._occ = this._occ;
        clone._anisotype = this._anisotype;
        clone._isotype = this._isotype;
        clone._su = this._su;
        clone._anisoU = this._anisoU;
        clone._anisoBeta = this._anisoBeta;

        clone._isoU = this._isoU;
        clone._isoB = this._isoB;
        clone._color = this._color.slice();

        for (let i = 0; i < this._avectors.length; i++) {
            clone._avectors.push(this._avectors[i].clone(this));
        }

        return clone;
    }

    /**
     * 데이터 저장을 위한 선행 과정
     * */
    prepare4Save() {
        this._vectorIdx = [];

        for (let i = 0; i < this._avectors.length; i++) {
            this._vectorIdx.push(this._avectors[i]._number);
        }
    }

    /**
     * cstructure로부터 avector를 추출한다.
     * @param {CStructure} cstructure 
     */
    restoreFromLoad(cstructure) {
        this._avectors = [];
        for (let i = 0; i < this._vectorIdx.length; i++) {
            let idx = this._vectorIdx[i];
            this._avectors.push(cstructure._avectors[idx]);
        }
    }

    /**
     * tvector를 사용하는 avector를 모두 제거한다.
     * @param {tVector} tvector aVector가 참조하는 tVector
     * @returns {Boolean} aVector의 정의가 주어진 tVector와 일치하는 경우
     */
    removeVectorWithTemplate(tvector) {

        for (let i = 0; i < this._avectors.length; i++) {
            if (this._avectors[i]._def == tvector) {
                this._avectors.splice(i, 1);
                return true;
            }                
        }
        return false;
    }

    /**
     * avector를 추가한다.
     * @param {aVector} avector 추가할 aVector
     */
    addVector(avector) {

        for (let i = 0; i < this._avectors.length; i++) {
            if (this._avectors[i] === avector)
                return;
        }

        this._avectors.push(avector);
    }

    /**
     * avector를 제거한다.
     * @param {any} avector
     */
    removeVector(avector) {
        const idx = this._avectors.indexOf(avector);
        if (idx > -1)
            this._avectors.splice(idx, 1);
    }


    /**
     * atom id와 def를 설정한다.
     * @param {any} atom_id
     */
    setAtomID(atom_number) {
        this._id = atom_number;
        this._def = AtomDef.GetDefWithNumber(atom_number);

        this._color = this._def._color.slice();
    }

    setAtomNumber(atom_number) {
        this._id = atom_number;
        this._def = AtomDef.GetDefWithNumber(atom_number);

        this._color = this._def._color.slice();

    }

    /**
     * symbol에 해당하는 atom으로 데이터를 설정한다.
     * @param {any} atom_symbol
     */
    setAtomWithSymbol(atom_symbol) {
        let def = AtomDef.GetDefWithID(atom_symbol);
        this._id = def._atom_number;
        this._def = def;
    }

    /**
     * json으로부터 catom 데이터를 설정한다.
     * @param {any} atom_json
     */
    setFromJSON(atom_json) {
        this._position = new THREE.Vector3(atom_json._position.x, atom_json._position.y, atom_json.position.z);
        this._id = atom_json._id;
        this._idx = atomjson._idx;
        this._def = atom_json._def;
        this._type = atom_json._type;
        this._label = atom_json._label;
        this._charge = atom_json._charge;
        this._visible = atom_json._visible;

        this._avectors = [];
        for (let i = 0; i < atom_json._avectors.length; ++i) {
            let v = new Vector3(atom_json._avectors[i]._vector._x, atom_json._avectors[i]._vector._y, atom_json._avectors[i]._vector._z);

        }
        this._vectorIdx = atom_json._vectorIdx;
    }

    /**
     * atom으로부터 데이터를 설정한다.
     * @param {CAtom} atom
     * @returns {CAtom} this
     */
    cloneFromAtom(atom) {
        Object.assign(this, atom);
        this._position = new Vector3(this._position._x, this._position._y, this._position._z);

        return this;
    }

    /**
     * 벡터 데이터를 모두 삭제한다.
     * */
    clearVectors() {
        this._avectors = [];
        this._vectorIdx = [];
    }

    /**
     * catom을 저장하려는 형태로 변환한다.
     * @returns {Object} CAtom data
     * */
    createData4Save() {
        let dat = {};

        dat._id = this._id;
        // dat._idx = this._idx;
        dat._def = this._def;
        dat._type = this._type;
        dat._label = this._label;
        dat._charge = this._charge;
        dat._visible - this._visible;
        dat._position = this._position;
        dat._vectorIdx = this._vectorIdx;
        dat._index4cstructure = this._index4cstructure;

        dat._occ = this._occ;
        dat._anisotype = this._anisotype;
        dat._isotype = this._isotype;
        dat._su = this._su;
        dat._anisoU = this._anisoU;
        dat._anisoBeta = this._anisoBeta;

        dat._isoU = this._isoU;
        dat._isoB = this._isoB;
        dat._color = this._color.slice();

        dat._avectors = [];
        for (let i = 0; i < this._avectors.length; ++i)
            dat._avectors.push(this._avectors[i].createData4Save());

        return dat;
    }
}