import { CAtom } from './CAtom.js';
import { BondData } from './BondData.js';

/**
 * file의 text를 반환한다.
 * @param {File} file 읽을 파일 객체
 * @returns {String} 읽은 텍스트 결과
 */
function readTextFile(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    var allText = "";
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                allText = rawFile.responseText;
                //return allText;
            }
        }
    }
    rawFile.send(null);

    return allText;
}

/**
 * 타입에 맞는 데이터로 변환하여 반환한다.
 * @param {String} value 값을 나타내는 문자열
 * @returns {String} 변환된 문자열
 */
function parseType(value) {
    let newValue = Number(value);

    if (isNaN(newValue)) {
        newValue = value;
        if (value[0] === "\'") {
            newValue = value.slice(1, value.length - 1);
        }
    }

    return newValue;
}

/**
 * 문자열로부터 key와 value를 추출한다.
 * @param {String} string 해석할 문자열
 * @return {Object} key, value pair
 */
function varReader(string) {
    let curser = 0;
    let key = new String();
    let rawValue = new String();
    for (; curser < string.length; curser++) {
        if (string[curser] !== " ") {
            key = key + string[curser];
        }
        else {
            break;
        }
    }

    for (; curser < string.length; curser++) {
        rawValue = rawValue + string[curser];
    }

    rawValue = rawValue.trim();

    let value = parseType(rawValue);

    return { key, value }
}

/**
 * 주어진 문자열을 읽어 obj에 key, value를 추가한다.
 * @param {String} strings 해석할 문자열
 * @param {Object} obj 결과를 저장할 변수
 */
function loopReader(strings = [new String()], obj) {
    let curser = 0;
    let keys = [];

    for (let i = 0; i < strings.length; i++) {
        strings[i] = strings[i].trim();
    }

    for (curser = 0; curser < strings.length; curser++) {
        if (strings[curser][0] === "_") {
            keys.push(strings[curser]);
        }
        else
            break;
    }

    for (let i = 0; i < keys.length; i++) {
        obj[keys[i]] = [];
    }

    for (; curser < strings.length; curser++) {
        for (let i = 0; i < keys.length; i++) {
            let v = new String();

            if (strings[curser][0] !== '\'') {
                v = strings[curser].slice(0, strings[curser].indexOf(" ") === -1 ? strings[curser].length : strings[curser].indexOf(" "));
                strings[curser] = strings[curser].slice(strings[curser].indexOf(" ")).trim();
            }
            else {
                v = strings[curser].slice(0, strings[curser].indexOf("\'", 1) + 1);
                strings[curser] = strings[curser].slice(strings[curser].indexOf("\'", 1) + 1).trim();
            }

            obj[keys[i]].push(parseType(v));
        }
    }
}

/**
 * 주어진 cif 문자열로부터 해석한 결과를 반환한다.
 * @param {String} strings cif 문자열
 * @returns {Object} parse result
 */
function parseCif(strings) {
    let curser = 0;
    let data = new Object();
    let isCommentStart = false;

    for (curser = 0; curser < strings.length; curser++) {
        let string = strings[curser];
        if (!data._name) {
            if (string[0] === "#") {
                continue;
            }
            else {
                data._name = strings[curser];
                continue;
            }
        }

        if (string[0] === ";") {
            isCommentStart = !isCommentStart;
            continue;
        }

        if (isCommentStart) {
            continue;
        }

        if (string[0] === "#" || string.length === 0) {
            continue;
        }

        if (string.indexOf("loop_") !== -1) {
            let loopString = [];
            curser++;
            for (; curser < strings.length; curser++) {
                if (strings[curser].indexOf("loop_") === -1 && strings[curser].length !== 0) {
                    if (strings[curser][0] === "_" && strings[curser].indexOf(" ") !== -1) {
                        console.log(strings[curser]);
                        curser--;
                        break;
                    }
                    loopString.push(strings[curser]);
                }
                else {
                    curser--;
                    break;
                }
            }
            loopReader(loopString, data);
        }
        else {
            let vv = varReader(string);
            data[vv.key] = vv.value;
        }
    }

    return data;
}

/**
 * cif를 해석한 결과를 바탕으로 CStructure를 생성한다.
 * @param {Object} cif cif 결과
 * @param {CStructure} cs 생성하게 될 CStructure
 */
function cif2cstructure(cif, cs) {
    cs._unitcell.set(cif._cell_angle_alpha, cif._cell_angle_beta, cif._cell_angle_gamma,
        cif._cell_length_a, cif._cell_length_b, cif._cell_length_c
    );
    cs.setName(cif._name);
    let alen = cif._atom_site_fract_x.length;
    for (let i = 0; i < alen; i++) {
        let atom = new CAtom();
        atom._position.fromArray([cif._atom_site_fract_x[i], cif._atom_site_fract_y[i], cif._atom_site_fract_z[i]], 0);
        atom._name = cif._atom_site_label[i];

        let sym = null;
        if (cif._atom_site_type_symbol) {
            sym = cif._atom_site_type_symbol[i];
        } else {
            sym = atom._name;
        }
        atom.setAtomWithSymbol(sym);

        atom._color = atom._def._color.slice();
        if (cif._atom_site_occupancy) {
            atom._occ = cif._atom_site_occupancy[i];
        }

        cs.addAtom(atom);
    }
}

/**
 * cif 파일을 cstructure로 변환하거나,
 * cstructure를 문자열 형태로 변환하는 클래스
 * */
export class fileCIF {

    /**
     * text data로부터 cstructure를 생성한다.
     * @param {String} text_data cif 문자열 데이터
     * @param {CStructure} cstructure 결과를 저장할 CStructure
     * @returns {Object} parse result
     */
    static parse(text_data, cstructure) {

        let strings = text_data.split("\n");

        let data = parseCif(strings);

        cif2cstructure(data, cstructure);

        BondData.addBonds(cstructure);

        return data;
    }

    /**
     * 주어진 CStructure를 문자열로 변환한다.
     * @param {CStructure} cs 변환할 CStructure
     * @returns {CString} 문자열로 변환된 CStructure
     */
    static toString(cs) {
        let str = "";
        let sbuf = "";

        sbuf = "'"+cs._name + "'\n";
        str += sbuf + "\n";

        sbuf = "_cell_length_a   " + cs._unitcell._axis._la;
        str += sbuf + "\n";

        sbuf = "_cell_length_b   " + cs._unitcell._axis._lb;
        str += sbuf + "\n";

        sbuf = "_cell_length_c   " + cs._unitcell._axis._lc;
        str += sbuf + "\n";

        sbuf = "_cell_angle_alpha   " + cs._unitcell._axis._a;
        str += sbuf + "\n";

        sbuf = "_cell_angle_beta   " + cs._unitcell._axis._b;
        str += sbuf + "\n";

        sbuf = "_cell_angle_gamma   " + cs._unitcell._axis._c;
        str += sbuf + "\n";

        sbuf = "loop_" ;
        str += sbuf + "\n";

        sbuf = "_atom_site_type_symbol";
        str += " " + sbuf + "\n";
        sbuf = "_atom_site_label";
        str += " " + sbuf + "\n";
        sbuf = "_atom_site_symmetry_multiplicity";
        str += " " + sbuf + "\n";
        sbuf = "_atom_site_fract_x";
        str += " " + sbuf + "\n";
        sbuf = "_atom_site_fract_y";
        str += " " + sbuf + "\n";
        sbuf = "_atom_site_fract_z";
        str += " " + sbuf + "\n";
        sbuf = "_atom_site_occupancy";
        str += " " + sbuf + "\n";

        let len = cs._atoms.length;
        for (let i = 0; i < len; i++) {

            let atom = cs._atoms[i];
            sbuf = "  " + atom._def._id + "  '" + atom._label + "'  1  " + atom._position._y + "  " + atom._position._z + "  " + atom._position._x + "  " + atom._occ;
            str += sbuf + "\n";
        }

        return str;
    }

}