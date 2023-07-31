import { Vector3 } from '../Math/Vector3.js';
import { AtomDef } from './AtomDef.js';

const _mdist = 0.00001;

/**
 * iAtom, iBond들을 관리
 * 같은 위치의 iAtom 없애기 등을 수행
 * 
 * 이 클래스는 저장되지 않고 CStructure에서 렌더링에 사용된다.
 * */
export class iBlock {

    /**
     * 생성자
     * */
    constructor() {
        this._iatoms = [];
    }


    /**
     * iAtom을 추가한다.
     * @param {iAtom} iatom 추가할 iAtom
     */
    addiAtom(iatom) {
        const len = this._iatoms.length;
        for (let i = 0; i < len; i++) {
            let atom = this._iatoms[i];
            let dist = atom.distance(iatom);
            if (dist < mdist)
                return iatom._exist = false;           
        }

        this._iatom.push(iatom);

    }

    /**
     * 주어진 unitcell location과 index를 통해 찾은 iAtom을 반환한다.
     * @param {Array} uc_loc unitcell location
     * @param {Number} index index
     * @returns {iBlock}
     */
    findAtom(uc_loc, index) {
        const len = this._iatoms.length;
        for (let i = 0; i < len; i++) {
            let atom = this._iatoms[i];

            if (atom._unitcellLoc[0] == uc_loc[0] &&
                atom._unitcellLoc[1] == uc_loc[1] &&
                atom._unitcellLoc[2] == uc_loc[2] &&
                atom._index == index &&
                atom._exist == true
            ) {
                return atom;
            }
        }

        return null;
    }


}