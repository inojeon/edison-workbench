import { crystalTable } from './crystalTable.js';
import { crystalVariable } from './crystalVariable.js';
import { Plane } from '../CoreCrystal/Plane.js';
import { LatticePlanes } from '../CoreCrystal/LatticePlanes.js';

/**
 * Lattice Plane 편집 다이얼로그
 * */
export class crystalEditLatticePlaneDialog {

    /**
     * 생성자
     * @param {String} name 다른 앱과 구분하기 위한 이름
     * @param {crystalEditor} app 상위 앱 객체
     * @param {HTMLElement} div_elem edit lattice plane dialog가 부착될 html element
     */
    constructor(name, app, div_elem) {

        this._name = name;

        this._app = app;

        this._div = div_elem;

        this._show = false;

        this._div.innerHTML = this._appElementHTML(name);

        this._div_latticeTable = document.getElementById(name + "_edit_lattice_shape_table");

        this._bModified = false;

        crystalEditLatticePlaneDialog.I = this;



        this._dialog = $(this._div).dialog({
            autoOpen: false,
            maxWidth: 650,
            maxHeight: 450,
            width: 650,
            height: 450,
            modal: true,    
            closeOnEscape: true,
            resizable: false,
            title: "Lattice Plane",
            buttons: {
                "OK": function () {
                    if (crystalEditLatticePlaneDialog.I._bModified) {
                        crystalEditLatticePlaneDialog.I._app._bModified = true;
                        crystalEditLatticePlaneDialog.I._app._csManager.AddUndo();
                    }
                    crystalEditLatticePlaneDialog.I.OnApply();
                    crystalEditLatticePlaneDialog.I.CloseDialog();
                },
                "Cancel": function () {
                    crystalEditLatticePlaneDialog.I.CloseDialog();
                },
            },
            close: function () {
                crystalEditLatticePlaneDialog.I._show = false;
            },
        });

        this._selectedLatticeColor = [1, 0, 0];

        this._input_lattice_h = document.getElementById(name + "_edit_lattice_miller_indice_h");
        this._input_lattice_k = document.getElementById(name + "_edit_lattice_miller_indice_k");
        this._input_lattice_l = document.getElementById(name + "_edit_lattice_miller_indice_l");
        this._input_lattice_d = document.getElementById(name + "_edit_lattice_distance_from_origin_A");
        this._input_lattice_color = document.getElementById(name + "_edit_lattice_color_background");

        this._btnNewLattice = document.getElementById(name + "_new_lattice_plane_btn");
        this._btnDeleteLattice = document.getElementById(name + "_delete_lattice_plane_btn");
        this._btnClearLattice = document.getElementById(name + "_clear_lattice_plane_btn");


        $(this._input_lattice_color).colorpicker({
            modal: true,
            buttonColorisze: true,
            buttonImageOnly: true,
            ok: function (event, formatted) {
                event.target.style.backgroundColor = formatted.css;
                crystalEditLatticePlaneDialog.I.OnChangeLatticeColor([formatted.rgb["r"], formatted.rgb["g"], formatted.rgb["b"]]);
                crystalEditLatticePlaneDialog.I.ChangeSelected();
            }
        });

        $(this._input_lattice_h).on("input", function () {
            crystalEditLatticePlaneDialog.I.ChangeSelected();
        });

        $(this._input_lattice_k).on("input", function () {
            crystalEditLatticePlaneDialog.I.ChangeSelected();
        });

        $(this._input_lattice_l).on("input", function () {
            crystalEditLatticePlaneDialog.I.ChangeSelected();
        });

        $(this._input_lattice_d).on("input", function () {
            crystalEditLatticePlaneDialog.I.ChangeSelected();
        });

        $(this._btnNewLattice).button();
        $(this._btnDeleteLattice).button();
        $(this._btnClearLattice).button();

        $(this._btnNewLattice).click(function (event) {

            crystalEditLatticePlaneDialog.I._bModified = true;

            let len = crystalEditLatticePlaneDialog.I._app._csManager._cs._latticePlanes.length;
            let h = parseFloat($(crystalEditLatticePlaneDialog.I._input_lattice_h).val());
            let k = parseFloat($(crystalEditLatticePlaneDialog.I._input_lattice_k).val());
            let l = parseFloat($(crystalEditLatticePlaneDialog.I._input_lattice_l).val());
            let d = parseFloat($(crystalEditLatticePlaneDialog.I._input_lattice_d).val());
            let color = crystalEditLatticePlaneDialog.I._selectedLatticeColor;

            if (h === 0 && k === 0 && l === 0) {
                alert("hkl can not be all zero");
                return;
            }

            crystalEditLatticePlaneDialog.I.AddLatticeToTable(len, h, k, l, d, color);

            let plane = new Plane();
            let lattice_axis = crystalEditLatticePlaneDialog.I._app._csManager._cs.getLatticeAxis();
            plane.setMillerIndices(lattice_axis, h, k, l, d);
            plane.setColor(color[0], color[1], color[2]);
            crystalEditLatticePlaneDialog.I._app._csManager._cs.addLatticePlane(plane);

            crystalEditLatticePlaneDialog.I._latticeTable.initSelect();
            crystalEditLatticePlaneDialog.I._latticeTable.selectLast();

        });

        $(this._btnDeleteLattice).click(function (event) {

            crystalEditLatticePlaneDialog.I._bModified = true;

            let latticeRows = crystalEditLatticePlaneDialog.I._latticeTable.getSelected();

            for (let latticeRow of latticeRows) {
                let idx = parseInt($(latticeRow).find("#" + crystalEditLatticePlaneDialog.I._app._name + "_lattice_id").html());
                crystalEditLatticePlaneDialog.I._app._csManager._cs.removeLatticePlaneByIdx(idx);
            }

            crystalEditLatticePlaneDialog.I._latticeTable.deleteSelected();
            crystalEditLatticePlaneDialog.I._latticeTable.updateTable();
        });

        $(this._btnClearLattice).click(function (event) {

            crystalEditLatticePlaneDialog.I._bModified = true;

            crystalEditLatticePlaneDialog.I._app._csManager._cs.clearLatticePlane();
            crystalEditLatticePlaneDialog.I._latticeTable.clearAll();
        });

        this._latticeTable = new crystalTable(this._name, this._app, this._div_latticeTable, "latticeTable");
        this._latticeTable.createHeader("\
                <th class='cryUI_Text_Center cryUI_Big_Td_With_Margin'>No.</th>\
                <th class='cryUI_Text_Center cryUI_Big_Td_With_Margin'>h</th>\
                <th class='cryUI_Text_Center cryUI_Big_Td_With_Margin'>k</th>\
                <th class='cryUI_Text_Center cryUI_Big_Td_With_Margin'>l</th>\
                <th class='cryUI_Text_Center cryUI_Big_Td_With_Margin'>d(A)</th>\
                <th class='cryUI_Text_Center cryUI_Big_Td_With_Margin'>color</th>\
            ", false);
    }

    /**
     * table에 lattice plane을 추가한다.
     * @param {Number} id lattice plane id
     * @param {Number} h h
     * @param {Number} k k
     * @param {Number} l l
     * @param {Number} d distance
     * @param {Array} color color array
     */
    AddLatticeToTable(id, h, k, l, d, color) {
        let innerHTML = "\
            <td id='" + this._name + "_lattice_id' style='display:none'>" + id + "</td>\
            <td class='cryUI_Big_Td_With_Margin cryUI_Text_Center' id='" + this._name + "_lattice_no_" + id + "' style='display:none'></td>\
            <td class='cryUI_Big_Td_With_Margin cryUI_Text_Center' id='" + this._name + "_lattice_h'>" + h + "</td>\
            <td class='cryUI_Big_Td_With_Margin cryUI_Text_Center' id='" + this._name + "_lattice_k'>" + k + "</td>\
            <td class='cryUI_Big_Td_With_Margin cryUI_Text_Center' id='" + this._name + "_lattice_l'>" + l + "</td>\
            <td class='cryUI_Big_Td_With_Margin cryUI_Text_Center' id='" + this._name + "_lattice_distance'>" + d + "</td>\
            <td class='cryUI_Big_Td_With_Margin cryUI_Text_Center' id='" + this._name + "_lattice_color'></td>\
            ";

        this._latticeTable.appTable(innerHTML, true);
        $("#" + this._name + "_lattice_no_" + id).parent().find("#" + this._name + "_lattice_color").css("background-color", '#' + crystalVariable.HTMLColorRGB(color));

        $(this._latticeTable.getAllRow()).last().on("click", function () {
            crystalEditLatticePlaneDialog.I.UpdateSelect();
        });
    }

    /**
     * 선택한 row를 바탕으로 입력창을 업데이트한다.
     * */
    UpdateSelect() {
        let selected = this._latticeTable.getSelected();

        if (selected.length === 1) {
            let id = parseInt($(selected[0]).find("#" + this._name + "_lattice_id").html());
            let plane = this._app._csManager._cs.getLatticePlaneByIdx(id);


            this.SetInputByLattice(plane);
        }
    }

    /**
     * EditLatticePlaneDialog에 대한 html element를 작성한다.
     * 
     * @param {String} name 다른 앱과 구분하기 위한 이름
     * @returns {String} HTML 문자열
     */
    _appElementHTML(name) {

        let ihtml = [];
        let idx = 0;


        ihtml[idx] = "<div>";
        idx++;

        ihtml[idx] = "<fieldset>";
        idx++;
        ihtml[idx] = "<table class='cryUI_Lattice_Wrapper_Table'>";
        idx++;

        ihtml[idx] = "<div class='cryUI_Lattice_Left_Blank'>";
        idx++;

        ihtml[idx] = "<tr>";
        idx++;
        ihtml[idx] = "<td class='cryUI_Float_Td'>Miller indices (hkl):</td>";
        idx++;
        ihtml[idx] = "<td class='cryUI_Lattice_Input'><input class='cryUI_Big_Td_With_Margin' type='number' id='" + name + "_edit_lattice_miller_indice_h' value=1></td>";
        idx++;
        ihtml[idx] = "<td class='cryUI_Lattice_Input'><input class='cryUI_Big_Td_With_Margin' type='number' id='" + name + "_edit_lattice_miller_indice_k' value=1></td>";
        idx++;
        ihtml[idx] = "<td class='cryUI_Lattice_Input'><input class='cryUI_Big_Td_With_Margin' type='number' id='" + name + "_edit_lattice_miller_indice_l' value=0></td>";
        idx++;
        ihtml[idx] = "</tr>";
        idx++;

        ihtml[idx] = "<tr>";
        idx++;
        ihtml[idx] = "<td class='cryUI_Float_Td'>Distance from origin:</td>";
        idx++;
        ihtml[idx] = "<td class='cryUI_Lattice_Input'><input class='cryUI_Big_Td_With_Margin' type='number' id='" + name + "_edit_lattice_distance_from_origin_A' value=1></td>";
        idx++;
        ihtml[idx] = "</tr>";
        idx++;

        ihtml[idx] = "<tr>";
        idx++;
        ihtml[idx] = "<td class='cryUI_Float_Td'>Color (RGB):</td>";
        idx++;
        // color picker 추가하기
        ihtml[idx] = "<td class='cryUI_Lattice_Input'><input class='cryUI_Normal_Td' type='text' id='" + name + "_edit_lattice_color_background' value='ff0000' style='background-color: red'></td>";
        idx++;

        ihtml[idx] = "</tr>";
        idx++;


        ihtml[idx] = "</table>";
        idx++;
        // table
        ihtml[idx] = "<div class='cryUI_Edit_Structure_Table_Area' id='" + name + "_edit_lattice_shape_area'>";
        idx++;

        ihtml[idx] = "<div class='cryUI_Edit_Structure_Table' id='" + name + "_edit_lattice_shape_table'>";
        idx++;
        ihtml[idx] = "</div>";
        idx++;
        ihtml[idx] = "<div class='cryUI_Edit_Structure_Modify' id='" + name + "_edit_lattice_modify'>";
        idx++;
        ihtml[idx] = "<button class='ui - button ui - widget ui - corner - all cryUI_Normal_Thick_Btn' id='" + name + "_new_lattice_plane_btn'>New</button>";
        idx++;
        ihtml[idx] = "<button class='ui - button ui - widget ui - corner - all cryUI_Normal_Thick_Btn' id='" + name + "_delete_lattice_plane_btn'>Delete</button>";
        idx++;
        ihtml[idx] = "<button class='ui - button ui - widget ui - corner - all cryUI_Normal_Thick_Btn' id='" + name + "_clear_lattice_plane_btn'>Clear</button>";
        idx++;
        ihtml[idx] = "</div>";
        idx++;

        ihtml[idx] = "</fieldset>";
        idx++;
        ihtml[idx] = "</div>";
        idx++;

        return ihtml.join("");
    }

    /**
     * edit lattice plane dialog를 띄운다.
     * */
    ShowDialog() {
        if (this._show)
            return;

        crystalEditLatticePlaneDialog.I._app._csManager.SetPrev(crystalEditLatticePlaneDialog.I._app._csManager._cs);

        this._dialog.dialog("open");
        this._show = true;
    }

    /**
     * 다이얼로그 창을 닫는다.
     * */
    CloseDialog() {
        this._dialog.dialog("close");
        this._show = false;
    }

    /**
     * 바뀐 color로 lattice color를 설정한다.
     * @param {Array} col color array
     */
    OnChangeLatticeColor(col) {
        this._selectedLatticeColor = col;
    }

    /**
     * 선택된 lattice table에 입력값을 적용한다.
     * */
    ChangeSelected() {
        let selected = this._latticeTable.getSelected();

        if (selected.length === 1) {
            this.UpdateSelectByInput();
        }
    }

    /**
     * 선택된 row에 입력값을 적용한다.
     * */
    UpdateSelectByInput() {
        let selected = this._latticeTable.getSelected();

        if (selected.length === 1) {

            let id = parseInt($(selected[0]).find("#" + this._name + "_lattice_id").html());

            let plane = this._app._csManager._cs.getLatticePlaneByIdx(id);

            this.SetLatticeByInput(plane);
            this.UpdateSelectedLatticeTableRow(selected[0], plane);
        }
    }

    /**
     * lattice plane 값을 바탕으로 입력란을 업데이트한다.
     * @param {LatticePlanes} plane lattice plane
     */
    SetInputByLattice(plane) {
        $(this._input_lattice_h).val(plane._h);
        $(this._input_lattice_k).val(plane._k);
        $(this._input_lattice_l).val(plane._l);
        $(this._input_lattice_d).val(plane._d);
        $(this._input_lattice_color).val(crystalVariable.HTMLColorRGB(plane._color));
        $(this._input_lattice_color).css("background-color", "rgb(" + plane._color[0] * 255 + "," + plane._color[1] * 255 + "," + plane._color[2] * 255 + ")");
    }

    /**
     * 입력값을 바탕으로 lattice plane을 업데이트한다.
     * @param {LatticePlanes} plane lattice plane
     */
    SetLatticeByInput(plane) {
        this.UpdateVariable();

        plane._h = this._variable["h"];
        plane._k = this._variable["k"];
        plane._l = this._variable["l"];
        plane._d = this._variable["d"];

        plane._color = this._variable["latticeColor"];

        let lattice_axis = crystalEditLatticePlaneDialog.I._app._csManager._cs.getLatticeAxis();
        plane.setMillerIndices(lattice_axis, plane._h, plane._k, plane._l, plane._d);
    }

    /**
     * 입력 데이터 값을 관리한다.
     * */
    UpdateVariable() {
        this._variable = {};

        this._variable["h"] = parseFloat($(this._input_lattice_h).val());
        this._variable["k"] = parseFloat($(this._input_lattice_k).val());
        this._variable["l"] = parseFloat($(this._input_lattice_l).val());
        this._variable["d"] = parseFloat($(this._input_lattice_d).val());

        if (this._selectedLatticeColor)
            this._variable["latticeColor"] = this._selectedLatticeColor;
    }

    /**
     * 선택된 lattice 정보를 바탕으로 선택된 lattice row를 업데이트한다.
     * @param {HTMLElement} selectedLatticeRow 선택된 lattice row
     * @param {LatticePlanes} lattice lattice plane
     */
    UpdateSelectedLatticeTableRow(selectedLatticeRow, lattice) {
        $(selectedLatticeRow).find("#" + this._name + "_lattice_h").html(lattice._h);
        $(selectedLatticeRow).find("#" + this._name + "_lattice_k").html(lattice._k);
        $(selectedLatticeRow).find("#" + this._name + "_lattice_l").html(lattice._l);
        $(selectedLatticeRow).find("#" + this._name + "_lattice_distance").html(lattice._d);
        // $(selectedLatticeRow).find("#" + this._name + "_lattice_color").html(crystalVariable.HTMLColorRGB(lattice._color));
        $(selectedLatticeRow).find("#" + this._name + "_lattice_color").css("background-color", "rgb(" + lattice._color[0] * 255 + "," + lattice._color[1] * 255 + "," + lattice._color[2] * 255 + ")");
       
    }

    UpdateTableByCS(cs) {
        for (let i = 0; i < cs._latticePlanes.length; ++i) {
            this.AddLatticeToTable(i, cs._latticePlanes[i]._h, cs._latticePlanes[i]._k, cs._latticePlanes[i]._l, cs._latticePlanes[i]._d, cs._latticePlanes[i]._color);
        }
    }

    OnApply() {
        crystalEditLatticePlaneDialog.I._app._csManager._cs.generateLatticePlanes();
    }
    

}