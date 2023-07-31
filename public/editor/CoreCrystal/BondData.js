import { AtomDef } from './AtomDef.js';
import { CBond } from './CBond.js';


var _data = [];

/**
 * 
 * */
export class BondData {

    static loadFile(filePath) {
        var result = null;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", filePath, false);
        xmlhttp.send();
        if (xmlhttp.status == 200) {
            result = xmlhttp.responseText;
        }
        return result;
    }

    static init() {

        let fileurl = "../_resources/bond.txt";

        let data = BondData.loadFile(fileurl);
        BondData.parse(data);
    }

    static parse(data) {
        let strings = data.split("\n");

        for (let i = 0; i < strings.length; i++) {
            let str = strings[i];

            let obj = {};

            let num = str.substring(0, 3);
            let a1 = str.substring(3, 9);
            let aa1 = a1.replace(/ /g, "");
            obj._a1 = AtomDef.GetDefWithID(aa1);
            let a2 = str.substring(9, 15);
            let aa2 = a2.replace(/ /g, "");
            obj._a2 = AtomDef.GetDefWithID(aa2);

            obj._min = str.substring(15, 26) *1;
            obj._max = str.substring(26, 37) * 1;

            _data.push(obj);
        }
    }

    static findbond(a1, a2) {
        for (let i = 0; i < _data.length; i++) {
            let bond = _data[i];

            if (a1._def == bond._a1 && a2._def == bond._a2)
                return bond;
        }
        return null;
    }

    static addBonds(cs) {
        for (let i = 0; i < cs._atoms.length-1; i++) {
            let a1 = cs._atoms[i];
            for (let j = i+1; j < cs._atoms.length; j++) {
                let a2 = cs._atoms[j];

                let bond = BondData.findbond(a1, a2);
                if (bond) {
                    let cb = new CBond();
                    cb.setAtom(a1, a2);
                    cb._minLength = bond._min;
                    cb._maxLength = bond._max;
                    cs.addBond(cb);
                }
            }
        }
    }


}

BondData.init();