import { Vector3 } from '../Math/Vector3.js';
import { AtomDef } from '../Renderer/AtomDef.js';
import { CAtom } from './CAtom.js';
import { CStructure } from './CStructure.js';
import { fileCIF } from './fileCif.js';

/**
 * 파일 로더 클래스
 * */
export class Loader {
    static _module = null;
    static _conversion = null;

    /**
     * 데이터 변환 결과를 반환한다.
     * */
    static getConversion() {
        if (!Loader._conversion) {
            if (!Loader._module)
                return null;

            Loader._conversion = new Loader._module.ObConversionWrapper();  // create ObConversionWrapper instance
        }
        return Loader._conversion;
    };

    /**
     * 초기화
     * */
    static init() {
        if (Loader._module == null) {
            Loader._module = OpenBabelModule();
        }
                

            
    }

    static saveFile(type, cstructure) {
        let data = "";
        if (type == "cif") {
            data = fileCIF.toString(cstructure);
        } else if (type == "mol") {
            data = Loader.toMolString(cstructure);
        }

        return data;
    }

    /**
     * 파일로부터 데이터를 가져온다.
     * @param {String} type
     * @param {String} data
     * @param {CStructure} cstructure
     */
    static loadFile(type, data, cstructure) {

        if (type == "cif") {
            fileCIF.parse(data, cstructure);
        } else {
            Loader.init();
            let conv = Loader.getConversion();

            conv.setInFormat('', type);

            let bMol = new Loader._module.OBMol();

            conv.readString(bMol, data);  // ... and load it with input data

            if (bMol == null) {
                return null;
            }
            Loader.send2CStructure(bMol, cstructure);
        }

    }

    /**
     * 숫자를 고정 길이 문자열로 변경한다.
     * @param {Number} number 숫자
     * @param {Number} len 문자열 길이
     * @returns {String}
     */
    static string2FixedLength(number, len) {
        var ret = number.toString();
        var length = ret.length;
        if (length > len) {
            return ret.substr(0, len);
        }

        for (; length < len; length++) {
            ret = " " + ret;
        }

        return ret;
    };

    /**
     * iAtom을 mol data의 문자열로 변환한다.
     * @param {iAtom} atom
     */
    static iatom2MoleString(atom) {
        var data = "";
        data += this.string2FixedLength(atom._position2.x, 10);
        data += this.string2FixedLength(atom._position2.y, 10);
        data += this.string2FixedLength(atom._position2.z, 10);

        data += this.string2FixedLength(atom._def._def._atom_id, 3);

        for (var i = 0; i < 12; i++) {
            data += "  0";
        }
        return data;
    }

    /**
     * iBond를 mol data의 문자열로 변환한다.
     * @param {iBond} ibond
     * @returns {String}
     */
    static ibond2MoleString(ibond) {
        var data = "";

        data += this.string2FixedLength(ibond._a1._export_idx , 3);
        data += this.string2FixedLength(ibond._a2._export_idx , 3);

        data += "  1  0  0  0  0";

        return data;

    }

    /**
 * 숫자를 고정된 길이의 문자열로 변환한다.
 * @param {Number} number 숫자 값
 * @param {Number} len 길이
 * @returns {String} 문자열
 */
    static string2FixedLength(number, len) {
        var ret = number.toString();
        var length = ret.length;
        if (length > len) {
            return ret.substr(0, len);
        }

        for (; length < len; length++) {
            ret = " " + ret;
        }

        return ret;
    };

    /**
     * CStructure를 mol data의 문자열로 변환한다.
     * @param {CStructure} cs
     */
    static toMolString(cs) {
        var num_atoms = 0;
        var atom_data = "";
        let len = cs._iatomList.length;
        for (let i = 0; i < len; i++) {
            let iatom = cs._iatomList[i];
            if (iatom._visible) {
                atom_data += Loader.iatom2MoleString(iatom) + "\n";
                num_atoms++;

                iatom._export_idx = num_atoms;
            }
        }

        var num_bonds = 0;
        var bond_data = "";
        len = cs._ibondList.length;
        for (let i = 0; i < len; i++) {
            let ibond = cs._ibondList[i];
            if (ibond._visible) {
                bond_data += Loader.ibond2MoleString(ibond) + "\n";
                num_bonds++;

            }
        }

        var data = "";
        data += cs._name + "\n";
        data += "\n";
        data += "" + "\n";
        data += this.string2FixedLength(num_atoms, 3);
        data += this.string2FixedLength(num_bonds, 3);
        data += "  0  0  0  0  0  0  0  0999 V2000\n";

        data += atom_data;
        data += bond_data;

        data += "M  END\n";

        return data;
    }

    /**
     * mol data의 atom을 cAtom으로 변환한다.
     * @param {Object} bAtom mol data의 atom
     * @returns {CAtom}
     */
    static convertAtom(bAtom, cs) {

        let a = cs._unitcell._axis._la;
        let b = cs._unitcell._axis._lb;
        let c = cs._unitcell._axis._lc;

        const num = bAtom.GetAtomicNum();

        let name = "";

        let a1 = new CAtom();

        let gx = bAtom.GetX();
        let gy = bAtom.GetY();
        let gz = bAtom.GetZ();

        a1._position.set(gx/a, gy/b, gz/c);
        a1._label = name;
        a1.setAtomNumber(num);

        return a1;
    };

    /**
     * bMol의 정보를 cstructure에 적용한다.
     * @param {Object} bMol mol data
     * @param {CStructure} cstructure 데이터를 저장할 cstructure
     */
    static send2CStructure(bMol,cstructure) {

        let num_atoms = bMol.NumAtoms();

        let i;
        let bAtom;
        for (i = 1; i <= num_atoms; i++) {
            bAtom = bMol.GetAtom(i);
            if (!bAtom)
                continue;

            let catom = Loader.convertAtom(bAtom, cstructure);
            cstructure.addAtom(catom);
        }

    };



}