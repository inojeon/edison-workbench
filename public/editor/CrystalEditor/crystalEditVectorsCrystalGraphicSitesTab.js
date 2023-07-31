import { crystalTable } from './crystalTable.js';
import { AtomDef } from '../CoreCrystal/AtomDef.js';
import { rayLog } from '../Renderer/log.js';

/**
 * Crystal Graphic Sites 다이얼로그
 * */
export class crystalEditVectorsCrystalGraphicSitesTab {

    /**
     * 생성자
     * @param {String} name 다른 앱과 구분하기 위한 이름
     * @param {crystalEditor} app 상위 앱 객체
     * @param {HTMLElement} div_elem crystalEditVectorsCrystalGraphicSitesTab이 부착될 html element
     */
    constructor(name, app, div_elem) {

        this._name = name;

        this._app = app;

        this._div = div_elem;

        crystalEditVectorsCrystalGraphicSitesTab.I = this;

        this._crystal_graphic_site_table = new crystalTable(name, app, this._div, "Crystal_Graphic_Sites");

        this._div.classList.add('cryUI_Graphic_Site');

        this._crystal_graphic_site_table.createHeader("\
            <th class='cryUI_Big_Td_With_Margin'>No.</th>\
            <th class='cryUI_Normal_Td'>Atom</th>\
            <th class='cryUI_Normal_Td'>Label</th>\
            <th class='cryUI_Big_Td'>X</th>\
            <th class='cryUI_Big_Td'>Y</th>\
            <th class='cryUI_Big_Td'>Z</th>\
            <th class='cryUI_Big_Td'>Vector</th>\
            ", false);
    }

    /**
     * 테이블 업데이트
     * */
    UpdateTable() {
        // 원소 정보와 벡터 정보 가져오기
        // 원소 정보는 csManager로 부터 가져올 수 있다.
        // 벡터 정보는 가져온 원소 정보의 ivector를 살펴보면 가져올 수 있다.
        this._crystal_graphic_site_table.clearAll();
        for (let i = 0; i < this._app._csManager._cs._atoms.length; ++i) {
            let atom = this._app._csManager._cs._atoms[i];
            this.AddCrystalloGraphicToTable(atom._idx, AtomDef.GetDefWithNumber(atom._id)._id, atom._label, atom._position._x, atom._position._y, atom._position._z);
        }
    }

    /**
     * 테이블 데이터 추가
     * @param {Number} idx catom index
     * @param {String} atom catom name
     * @param {String} label label
     * @param {Number} x x 좌표
     * @param {Number} y y 좌표
     * @param {Number} z z 좌표
     */
    AddCrystalloGraphicToTable(idx, atom, label, x, y, z) {

        let innerHTML = "\
            <td style='display:none' id='" + this._name + "_crystallo_graphic_catom_idx'>" + idx + "</td>\
            <td class='cryUI_Normal_Td'>" + atom + "</td>\
            <td class='cryUI_Normal_Td'>" + label + "</td>\
            <td class='cryUI_Big_Td'>" + x + "</td>\
            <td class='cryUI_Big_Td'>" + y + "</td>\
            <td class='cryUI_Big_Td'>" + z + "</td>\
            <td class='cryUI_Big_Td' id='" + this._name + "_crystallo_vector_idxs'></td>";

        this._crystal_graphic_site_table.appTable(innerHTML, true);
    }
}