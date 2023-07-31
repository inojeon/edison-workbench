import { crystalTable } from './crystalTable.js';
import { cryst } from './crystalVariable.js';

/**
 * Vector 편집 다이얼로그
 * */
export class crystalEditVectorsVectorsTab {

    /**
     * 생성자
     * @param {String} name 다른 앱과 구분하기 위한 이름
     * @param {crystalEditor} app 상위 앱 객체
     * @param {HTMLElement} div_elem crystalEditVectorsVectorsTab이 부착될 HTML Element
     */
    constructor(name, app, div_elem) {

        this._name = name;

        this._app = app;

        this._div = div_elem;

        this._div.innerHTML = this._appElementHTML(name);

        crystalEditVectorsVectorsTab.I = this;

        this._div_vectors_modify_btn_area = document.getElementById(name + "_vectors_modify_btn_area");

        this._div_crystal_vectors_table = document.getElementById(name + "_vectors_table_area");

        this._crystal_vectors_table = new crystalTable(name, app, this._div_crystal_vectors_table, "Vectors");

        this._crystal_vectors_table.createHeader("\
            <th class='cryUI_Big_Td_With_Margin'>No.</th>\
            <th class='cryUI_Big_Td'>u</th>\
            <th class='cryUI_Big_Td'>v</th>\
            <th class='cryUI_Big_Td'>w</th>\
            <th class='cryUI_Big_Td'>Modulus</th>\
            <th class='cryUI_Big_Td'>r(A)</th>\
            ", false);

        this._new_vector_btn = document.getElementById(name + "_vector_tab_new_vector");
        this._edit_vector_btn = document.getElementById(name + "_vector_tab_edit_vector");
        this._delete_vector_btn = document.getElementById(name + "_vector_tab_delete_vector");

        $(this._new_vector_btn).button().click(function () {
            // show dialog
            crystalEditVectorsVectorsTab.I._app._dlgCreateVector._mode = cryst.Mode.AddVector;
            crystalEditVectorsVectorsTab.I._app._dlgCreateVector.ShowDialog();
        });

        $(this._edit_vector_btn).button().click(function () {
            // show dialog
            crystalEditVectorsVectorsTab.I._app._dlgCreateVector._mode = cryst.Mode.ModifyVector;
            crystalEditVectorsVectorsTab.I._app._dlgCreateVector.ShowDialog();
        });

        $(this._delete_vector_btn).button().click(function () {
            let selected = crystalEditVectorsVectorsTab.I._crystal_vectors_table.getSelected();

            let idx = parseInt($(selected[0]).find("#" + crystalEditVectorsVectorsTab.I._name + "_vectors_tab_vector_number").text());

            let v = crystalEditVectorsVectorsTab.I._app._csManager._cs._tvectors[idx];

            crystalEditVectorsVectorsTab.I._app._csManager._cs.removetVector(v);

            crystalEditVectorsVectorsTab.I._crystal_vectors_table.deleteSelected();

            crystalEditVectorsVectorsTab.I.UpdateTable();
        });

        this._div.classList.add("cryUI_Vectors");
    }
    /**
     * EditVectorsVectorsTab에 대한 html element를 작성한다.
     *
     * @param {String} name 다른 앱과 구분하기 위한 이름
     * @returns {String} HTML 문자열
     */
    _appElementHTML(name) {
        let ihtml = [];
        let idx = 0;

        // 버튼 공간
        ihtml[idx] = "<div class='cryUI_Vectors_Modify_Btn_Area' id='" + name + "_vectors_modify_btn_area'>";
        idx++;
        ihtml[idx] = "<button class='ui-button ui-widget ui-corner-all cryUI_Vectors_Btn' id='" + name + "_vector_tab_new_vector'>New</button>";
        idx++;
        ihtml[idx] = "<button class='ui-button ui-widget ui-corner-all cryUI_Vectors_Btn' id='" + name + "_vector_tab_edit_vector'>Edit</button>";
        idx++;
        ihtml[idx] = "<button class='ui-button ui-widget ui-corner-all cryUI_Vectors_Btn' id='" + name + "_vector_tab_delete_vector'>Delete</button>";
        idx++;
        ihtml[idx] = "</div>";
        idx++;

        // 테이블 공간
        ihtml[idx] = "<div class='cryUI_Vectors_Table_Area' id='" + name + "_vectors_table_area'>";
        idx++;

        ihtml[idx] = "</div>";
        idx++;

        return ihtml.join("");
    }

    /**
     * 테이블 업데이트
     * */
    UpdateTable() {
        this._crystal_vectors_table.clearAll();
        this._app._csManager._cs.numberVectors();
        for (let i = 0; i < this._app._csManager._cs._tvectors.length; ++i) {
            let v = this._app._csManager._cs._tvectors[i];
            this.AddVectorToTable(v._vector[0], v._vector[1], v._vector[2], v._radius, v._number, v._color);
        }
    }

    /**
     * 테이블에 벡터를 추가한다.
     * @param {Number} u u
     * @param {Number} v v
     * @param {Number} w w
     * @param {Number} radius 벡터의 반지름
     * @param {Number} number 벡터 구분자
     * @param {Array} color color array
     */
    AddVectorToTable(u, v, w, radius, number, color) {
        let innerHTML = "\
            <td class='cryUI_Big_Td' id='" + this._name + "_edit_vectors_u'>" + u + "</td>\
            <td class='cryUI_Big_Td' id='" + this._name + "_edit_vectors_v'>" + v + "</td>\
            <td class='cryUI_Big_Td' id='" + this._name + "_edit_vectors_w'>" + w + "</td >\
            <td class='cryUI_Big_Td'>0</td>\
            <td class='cryUI_Big_Td'>" + radius + "</td>\
            <td id='" + this._name + "_vectors_tab_vector_number' style='display:none'>" + number + "</td>\
            <td id='" + this._name + "_vectors_tab_vector_color' style='display:none'>" + color[0] + "," + color[1] + "," + color[2] + "</td>\
            ";

        this._crystal_vectors_table.appTable(innerHTML, true);
    }
}