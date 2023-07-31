import { crystalTable } from "./crystalTable.js";
import { AtomDef } from '../CoreCrystal/AtomDef.js';

/**
 * Individual Atom Vector 편집 다이얼로그
 * */
export class crystalEditVectorsIndividualAtomTab {

    /**
     * 생성자
     * @param {String} name 다른 앱과 구분하기 위한 이름
     * @param {crystalEditor} app 상위 앱 객체
     * @param {HTMLElement} div_elem EditVectorsIndividualAtomTab이 부착될 html element
     */
    constructor(name, app, div_elem) {

        this._name = name;

        this._app = app;

        this._div = div_elem;

        crystalEditVectorsIndividualAtomTab.I = this;

        this._individual_atom_table = new crystalTable(name, app, this._div, "Individual_Atom");

        this._individual_atom_table.createHeader("\
            <th class='cryUI_Big_Td_With_Margin'>No.</th>\
            <th class='cryUI_Normal_Td'>Atom</th>\
            <th class='cryUI_Normal_Td'>Label</th>\
            <th class='cryUI_Big_Td'>X</th>\
            <th class='cryUI_Big_Td'>Y</th>\
            <th class='cryUI_Big_Td'>Z</th>\
            <th class='cryUI_Big_Td'>Vector</th>\
            ", false);

        this._div.classList.add("cryUI_Individual_Atom");
    }

    /**
     * 테이블 업데이트
     * */
    UpdateTable() {
        this._individual_atom_table.clearAll();
        for (let i = 0; i < this._app._csManager._cs._iatomList.length; ++i) {
            let iatom = this._app._csManager._cs._iatomList[i];
            if(iatom._visible)
                this.AddIndividualAtomToTable(i, AtomDef.GetDefWithNumber(iatom._def._id)._id, iatom._def._label, iatom._position.x, iatom._position.y, iatom._position.z);
        }
    }

    /**
     * 테이블에 atom을 추가한다.
     * @param {Number} idx atom index
     * @param {String} atom atom 이름
     * @param {String} label 라벨
     * @param {Number} x x 좌표
     * @param {Number} y y 좌표
     * @param {Number} z z 좌표
     */
    AddIndividualAtomToTable(idx, atom, label, x, y, z) {

        let innerHTML = "\
            <td style='display:none' id='" + this._name + "_individual_atom_iatom_idx'>" + idx + "</td>\
            <td class='cryUI_Normal_Td'>" + atom + "</td>\
            <td class='cryUI_Normal_Td'>" + label + "</td>\
            <td class='cryUI_Big_Td'>" + x + "</td>\
            <td class='cryUI_Big_Td'>" + y + "</td>\
            <td class='cryUI_Big_Td'>" + z + "</td>\
            <td class='cryUI_Big_Td' id='" + this._name + "_individual_vector_idxs'></td>";

        this._individual_atom_table.appTable(innerHTML, true);
    }
}