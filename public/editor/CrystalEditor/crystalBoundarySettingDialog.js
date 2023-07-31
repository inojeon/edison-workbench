import { Vector3 } from '../Math/Vector3.js';
import { cryst } from './crystalVariable.js';
import { crystalTable } from './crystalTable.js';
import { rayLog } from '../Renderer/log.js';
import { Plane } from '../CoreCrystal/Plane.js';

/**
 * boundary 설정 다이얼로그
 * */
export class crystalBoundarySettingDialog {

    /**
     * 생성자
     * @param {String} name 다른 앱과 구분하기 위한 이름
     * @param {crystalEditor} app 상위 앱 객체
     * @param {HTMLElement} div_elem crystalBoundarySettingDialog가 부착될 HTML Element
     */
    constructor(name, app, div_elem) {

        this._name = name;

        this._app = app;

        this._div = div_elem;

        crystalBoundarySettingDialog.I = this;

        this._div.innerHTML = this._appElementHTML(this._name);

        this._bModified = false;

        this._dialog = $(this._div).dialog({
            autoOpen: false,
            maxHeight: 500,
            height: 500,
            maxWidth: 620,
            width: 620,
            modal: true,
            closeOnEscape: true,
            resizable: false,
            title: "Boundary",
            buttons: {
                "OK": function () {

                    let minX = parseFloat($(crystalBoundarySettingDialog.I._input_min_x).val());
                    let minY = parseFloat($(crystalBoundarySettingDialog.I._input_min_y).val());
                    let minZ = parseFloat($(crystalBoundarySettingDialog.I._input_min_z).val());

                    let maxX = parseFloat($(crystalBoundarySettingDialog.I._input_max_x).val());
                    let maxY = parseFloat($(crystalBoundarySettingDialog.I._input_max_y).val());
                    let maxZ = parseFloat($(crystalBoundarySettingDialog.I._input_max_z).val());

                    let boundary = crystalBoundarySettingDialog.I._app._csManager._cs._boundary;
                    if (boundary._min._x !== minX || boundary._min._y !== minY || boundary._min._z !== minZ ||
                        boundary._max._x !== maxX || boundary._max._y !== maxY || boundary._max._z !== maxZ)
                        crystalBoundarySettingDialog.I._bModified = true;

                    if (crystalBoundarySettingDialog.I._bModified) {
                        crystalBoundarySettingDialog.I._app._bModified = true;
                        crystalBoundarySettingDialog.I._app._csManager.AddUndo();
                        crystalBoundarySettingDialog.I._app._3dRender._renderer.autofitCameraObjList([crystalBoundarySettingDialog.I._app._csManager._cs.getMesh()], 100);
                    }
                    crystalBoundarySettingDialog.I.OnApply();
                    crystalBoundarySettingDialog.I._app._dlgEditVectors.RestoreAddedVectorFromCS();
                    crystalBoundarySettingDialog.I.CloseDialog();
                },

                "Cancel": function () {
                    crystalBoundarySettingDialog.I.CloseDialog();
                },

            },

            close: function () {
                crystalBoundarySettingDialog.I._show = false;
            }
        });

        this._input_min_x = document.getElementById(name + "_boundary_min_x");
        this._input_max_x = document.getElementById(name + "_boundary_max_x");

        this._input_min_y = document.getElementById(name + "_boundary_min_y");
        this._input_max_y = document.getElementById(name + "_boundary_max_y");

        this._input_min_z = document.getElementById(name + "_boundary_min_z");
        this._input_max_z = document.getElementById(name + "_boundary_max_z");

        this._input_h = document.getElementById(name + "_cutoff_miller_indices_h");
        this._input_k = document.getElementById(name + "_cutoff_miller_indices_k");
        this._input_l = document.getElementById(name + "_cutoff_miller_indices_l");

        this._input_d = document.getElementById(name + "_cutoff_distance_from_origin_A");


        this._btnNewShape = document.getElementById(name + "_new_cutoff_shape_btn");
        this._btnDeleteShape = document.getElementById(name + "_delete_cutoff_shape_btn");
        this._btnClearShape = document.getElementById(name + "_clear_cutoff_shape_btn");

        this._div_shapeTable = document.getElementById(name + "_cutoff_crystal_shape_table");
        this._shapeTable = new crystalTable(this._name, this._app, this._div_shapeTable, "cutOffShapeTable");
        this._shapeTable.createHeader("\
                <th class='cryUI_Text_Center cryUI_Big_Td_With_Margin'>No.</th>\
                <th class='cryUI_Text_Center cryUI_Big_Td_With_Margin'>h</th>\
                <th class='cryUI_Text_Center cryUI_Big_Td_With_Margin'>k</th>\
                <th class='cryUI_Text_Center cryUI_Big_Td_With_Margin'>l</th>\
                <th class='cryUI_Text_Center cryUI_Big_Td_With_Margin'>d(A)</th>\
            ", false);

        // <th class='cryUI_Text_Center cryUI_Big_Td_With_Margin'>sym.</th>\

        $(this._btnNewShape).button();
        $(this._btnDeleteShape).button();
        $(this._btnClearShape).button();

        $(this._btnNewShape).click(function (event) {

            crystalBoundarySettingDialog.I._bModified = true;

            let len = crystalBoundarySettingDialog.I._app._csManager._cs._boundary._cutoffPlanes.length;
            let h = parseFloat($(crystalBoundarySettingDialog.I._input_h).val());
            let k = parseFloat($(crystalBoundarySettingDialog.I._input_k).val());
            let l = parseFloat($(crystalBoundarySettingDialog.I._input_l).val());
            let d = parseFloat($(crystalBoundarySettingDialog.I._input_d).val());

            if (h === 0 && k === 0 && l === 0) {
                alert("hkl can not be all zero");
                return;
            }

            crystalBoundarySettingDialog.I.AddShapeToTable(len, h, k, l, d, true);

            let plane = new Plane();
            let lattice_axis = crystalBoundarySettingDialog.I._app._csManager._cs.getLatticeAxis();
            plane.setMillerIndices(lattice_axis, h, k, l, d);
            crystalBoundarySettingDialog.I._app._csManager._cs._boundary.addPlane(plane);

            crystalBoundarySettingDialog.I.generateStructure();
        });

        $(this._btnDeleteShape).click(function (event) {

            crystalBoundarySettingDialog.I._bModified = true;

            let shapeRows = crystalBoundarySettingDialog.I._shapeTable.getSelected();

            for (let shapeRow of shapeRows) {
                let idx = parseInt($(shapeRow).find("#" + crystalBoundarySettingDialog.I._app._name + "_cutoff_shape_no").html());
                crystalBoundarySettingDialog.I._app._csManager._cs._boundary.removePlane(crystalBoundarySettingDialog.I._app._csManager._cs._boundary._cutoffPlanes[idx]);
            }

            crystalBoundarySettingDialog.I._shapeTable.deleteSelected();

            crystalBoundarySettingDialog.I.generateStructure();
        });

        $(this._btnClearShape).click(function (event) {

            crystalBoundarySettingDialog.I._bModified = true;

            crystalBoundarySettingDialog.I._app._csManager._cs._boundary.clearPlane();
            crystalBoundarySettingDialog.I._app._dlgBoundarySetting._shapeTable.clearAll();
            crystalBoundarySettingDialog.I.generateStructure();
        });


        $(this._input_h).on("input", function () {
            crystalBoundarySettingDialog.I.ChangeSelected();
        });

        $(this._input_k).on("input", function () {
            crystalBoundarySettingDialog.I.ChangeSelected();
        });

        $(this._input_l).on("input", function () {
            crystalBoundarySettingDialog.I.ChangeSelected();
        });

        $(this._input_d).on("input", function () {
            crystalBoundarySettingDialog.I.ChangeSelected();
        });

    }

    /**
     * BoundarySettingDialog에 대한 html element를 작성한다.
     * 
     * @param {String} name 다른 앱과 구분하기 위한 이름
     * @returns {String} HTML 문자열
     */
    _appElementHTML(name) {
        let ihtml = [];
        let idx = 0;

        ihtml[idx] = "<div id='" + name + "_boundary_setting_dialog'>";
        idx++;

        ihtml[idx] = "<div class='cryUI_Boundary_Setting_Select_Structure' id='" + name + "_bondary_setting_select_structure'>";
        idx++;

        // dropdown 추가하기

        ihtml[idx] = "</div>";
        idx++;

        ihtml[idx] = "<div id='" + name + "_boundary_setting_range' style='overflow:hidden'>";
        idx++;

        // fieldset + legend
        ihtml[idx] = "<fieldset>";
        idx++;
        ihtml[idx] = "<legend>Ranges of fractional coordinates</legend>";
        idx++;
        ihtml[idx] = "<table>";
        idx++;

        // table with input tags
        ihtml[idx] = "<tr style='height:10px;'>";
        idx++;

        ihtml[idx] = "<td>min x:</td><td><input type='number' class='cryUI_Low_Normal_Td' id='" + name + "_boundary_min_x' value=" + cryst.Boundary["minX"] + "></td>";
        idx++;
        ihtml[idx] = "<td>min y:</td><td><input type='number' class='cryUI_Low_Normal_Td' id='" + name + "_boundary_min_y' value=" + cryst.Boundary["minY"] + "></td>";
        idx++;
        ihtml[idx] = "<td>min z:</td><td><input type='number' class='cryUI_Low_Normal_Td' id='" + name + "_boundary_min_z' value=" + cryst.Boundary["minZ"] + "></td>";
        idx++;

        ihtml[idx] = "<tr>"
        idx++;

        ihtml[idx] = "<td>max x:</td><td><input type='number' class='cryUI_Low_Normal_Td' id='" + name + "_boundary_max_x' value=" + cryst.Boundary["maxX"] + "></td>";
        idx++;
        ihtml[idx] = "<td>max y:</td><td><input type='number' class='cryUI_Low_Normal_Td' id='" + name + "_boundary_max_y' value=" + cryst.Boundary["maxY"] + "></td>";
        idx++;
        ihtml[idx] = "<td>max z:</td><td><input type='number' class='cryUI_Low_Normal_Td' id='" + name + "_boundary_max_z' value=" + cryst.Boundary["maxZ"] + "></td>";
        idx++;

        ihtml[idx] = "</tr>";
        idx++;

        ihtml[idx] = "</table>";
        idx++;

        ihtml[idx] = "</fieldset></div>";
        idx++;

        ihtml[idx] = "<fieldset>";
        idx++;

        ihtml[idx] = "<legend>Cutoff planes</legend>";
        idx++;

        ihtml[idx] = "<table>";
        idx++;

        ihtml[idx] = "<tr>";
        idx++;

        ihtml[idx] = "<td>Miller indices (hkl):</td>";
        idx++;
        ihtml[idx] = "<td><input type='number' class='cryUI_Low_Normal_Td' id='" + name + "_cutoff_miller_indices_h' value=1></td>";
        idx++;
        ihtml[idx] = "<td><input type='number' class='cryUI_Low_Normal_Td' id='" + name + "_cutoff_miller_indices_k' value=1></td>";
        idx++;
        ihtml[idx] = "<td><input type='number' class='cryUI_Low_Normal_Td' id='" + name + "_cutoff_miller_indices_l' value=0></td>";
        idx++;

        ihtml[idx] = "</tr>";
        idx++;

        ihtml[idx] = "<tr>";
        idx++;
        ihtml[idx] = "<td class='cryUI_Float_Td'>Distance from origin:</td>";
        idx++;
        ihtml[idx] = "<td class='cryUI_Lattice_Input'><input class='cryUI_Low_Normal_Td' type='number' id='" + name + "_cutoff_distance_from_origin_A' value=1></td>";
        idx++;
        ihtml[idx] = "</tr>";
        idx++;

        ihtml[idx] = "</table>";
        idx++;

        ihtml[idx] = "</fieldset>";
        idx++;

        // table
        ihtml[idx] = "<br><div class='cryUI_Edit_Structure_Table_Area' id='" + name + "_cutoff_crystal_shape_area'>";
        idx++;

        ihtml[idx] = "<div class='cryUI_Edit_Structure_Table' id='" + name + "_cutoff_crystal_shape_table'>";
        idx++;
        ihtml[idx] = "</div>";
        idx++;
        ihtml[idx] = "<div class='cryUI_Edit_Structure_Modify' id='" + name + "_cutoff_shape_modify'>";
        idx++;
        ihtml[idx] = "<button class='ui - button ui - widget ui - corner - all cryUI_Normal_Thick_Btn' id='" + name + "_new_cutoff_shape_btn'>New</button>";
        idx++;
        ihtml[idx] = "<button class='ui - button ui - widget ui - corner - all cryUI_Normal_Thick_Btn' id='" + name + "_delete_cutoff_shape_btn'>Delete</button>";
        idx++;
        ihtml[idx] = "<button class='ui - button ui - widget ui - corner - all cryUI_Normal_Thick_Btn' id='" + name + "_clear_cutoff_shape_btn'>Clear</button>";
        idx++;
        ihtml[idx] = "</div>";

        ihtml[idx] = "</div>";
        idx++;

        return ihtml.join("");
    }

    /**
     * 다이얼로그를 띄운다.
     * */
    ShowDialog() {
        if (this._show)
            return;

        crystalBoundarySettingDialog.I._app._csManager.SetPrev(crystalBoundarySettingDialog.I._app._csManager._cs);

        this._dialog.dialog("open");
        this._show = true;
    }

    /**
     * 다이얼로그를 닫는다.
     * */
    CloseDialog() {
        this._dialog.dialog("close");
        this._show = false;
    }

    /**
     * 다이얼로그 내역을 적용시킨다.
     * */
    OnApply() {

        this._input_min_x = document.getElementById(this._name + "_boundary_min_x");
        this._input_max_x = document.getElementById(this._name + "_boundary_max_x");

        this._input_min_y = document.getElementById(this._name + "_boundary_min_y");
        this._input_max_y = document.getElementById(this._name + "_boundary_max_y");

        this._input_min_z = document.getElementById(this._name + "_boundary_min_z");
        this._input_max_z = document.getElementById(this._name + "_boundary_max_z");

        if ($(this._input_min_x).val() === '') {
            $(this._input_min_x).val(0);
        }
        if ($(this._input_min_y).val() === '') {
            $(this._input_min_y).val(0);
        }
        if ($(this._input_min_z).val() === '') {
            $(this._input_min_z).val(0);
        }
        if ($(this._input_max_x).val() === '') {
            $(this._input_max_x).val(0);
        }
        if ($(this._input_max_y).val() === '') {
            $(this._input_max_y).val(0);
        }
        if ($(this._input_max_z).val() === '') {
            $(this._input_max_z).val(0);
        }

        let minX = parseFloat($(this._input_min_x).val());
        let minY = parseFloat($(this._input_min_y).val());
        let minZ = parseFloat($(this._input_min_z).val());

        let maxX = parseFloat($(this._input_max_x).val());
        let maxY = parseFloat($(this._input_max_y).val());
        let maxZ = parseFloat($(this._input_max_z).val());

        this._app._csManager._cs._boundary.set(new Vector3(minX, minY, minZ), new Vector3(maxX, maxY, maxZ));
        this.generateStructure();

        this._app._3dRender._renderer.autofitCameraObjList([this._app._csManager._cs.getMesh()], 100);

        // 거리 각도 측정 삭제 호출
        this._app._uiHandler.ClearAllMeasures();

    }

    /**
     * 테이블에 cutoff palne을 추가한다.
     * @param {Number} id plane id
     * @param {Number} h h value
     * @param {Number} k k value
     * @param {Number} l l value
     * @param {Number} d distance
     * @param {Boolean} sym symmetry or not
     */
    AddShapeToTable(id, h, k, l, d, sym) {
        let innerHTML = "\
            <td id='" + this._name + "_cutoff_shape_no' style='display:none'>" + id + "</td>\
            <td class='cryUI_Big_Td_With_Margin cryUI_Text_Center' id='" + this._name + "_cutoff_shape_h'>" + h + "</td>\
            <td class='cryUI_Big_Td_With_Margin cryUI_Text_Center' id='" + this._name + "_cutoff_shape_k'>" + k + "</td>\
            <td class='cryUI_Big_Td_With_Margin cryUI_Text_Center' id='" + this._name + "_cutoff_shape_l'>" + l + "</td>\
            <td class='cryUI_Big_Td_With_Margin cryUI_Text_Center' id='" + this._name + "_cutoff_shape_distance'>" + d + "</td>\
            ";

        //      <td class='cryUI_Big_Td_With_Margin cryUI_Text_Center'><input type='checkbox' id='" + this._name + "_cutoff_shape_sym' checked='" + sym + "'></td>\

        this._shapeTable.appTable(innerHTML, true);
     
        let elements = document.querySelectorAll('tr.sortable');
        Array.from(elements).forEach(function (element) {
            $(element).mousedown(function () {
                crystalBoundarySettingDialog.I.UpdateSelect();
            });
        });
    }

    /**
     * 선택된 row 값을 읽어 입력창을 갱신한다.
     * */
    UpdateSelect() {
        let selected = this._shapeTable.getSelected();

        if (selected.length === 1) {
            rayLog(3, selected);

            let tokens = selected[0].innerText.split("\t");
            
            $(this._input_h).val(tokens[1]);
            $(this._input_k).val(tokens[2]);
            $(this._input_l).val(tokens[3]);
            $(this._input_d).val(tokens[4]);
            
        }
    }
    /**
     * 선택된 row를 입력값을 바탕으로 업데이트한다.
     * */
    ChangeSelected() {
        let selected = this._shapeTable.getSelected();

        if (selected.length === 1) {
            this.UpdateSelectByInput();
        }
    }

    /**
     * 입력값을 선택된 row에 적용한다.
     * */
    UpdateSelectByInput() {
        let selected = this._shapeTable.getSelected();

        if (selected.length === 1) {

            let idx = parseInt($(selected[0]).find("#" + this._name + "_cutoff_shape_no").html());

            let cutoffPlane = this._app._csManager._cs._boundary._cutoffPlanes[idx];

            this.SetCutOffPlaneByInput(cutoffPlane);
            this.UpdateSelectedCutOffPlaneRow(selected[0], cutoffPlane);
        }
    }

    /**
     * 현재 선택된 row에 plane의 데이터를 반영한다.
     * @param {HTMLElement} selectedCutOffPlaneRow 선택된 plane row
     * @param {Plane} plane row에 반영할 plane 객체
     */
    UpdateSelectedCutOffPlaneRow(selectedCutOffPlaneRow, plane) {
        $(selectedCutOffPlaneRow).find("#" + this._name + "_cutoff_shape_h").html(plane._h);
        $(selectedCutOffPlaneRow).find("#" + this._name + "_cutoff_shape_k").html(plane._k);
        $(selectedCutOffPlaneRow).find("#" + this._name + "_cutoff_shape_l").html(plane._l);
        $(selectedCutOffPlaneRow).find("#" + this._name + "_cutoff_shape_d").html(plane._d);
    }

    /**
     * CStructure generate
     * */
    generateStructure() {
        this._app._csManager._cs.generate(this._app.GetSymmetryIdxList());
        this._app.UpdateStructureProperty();
        this._app.UpdateRenderOptions();
    }

    UpdateBoundary() {
        $(this._input_min_x).val(this._app._csManager._cs._boundary._min._x);
        $(this._input_min_y).val(this._app._csManager._cs._boundary._min._y);
        $(this._input_min_z).val(this._app._csManager._cs._boundary._min._z);

        $(this._input_max_x).val(this._app._csManager._cs._boundary._max._x);
        $(this._input_max_y).val(this._app._csManager._cs._boundary._max._y);
        $(this._input_max_z).val(this._app._csManager._cs._boundary._max._z);
    }

    SetCutOffPlaneByInput(cutoffPlane) {
        cutoffPlane._h = parseFloat($(this._input_h).val());
        cutoffPlane._k = parseFloat($(this._input_k).val());
        cutoffPlane._l = parseFloat($(this._input_l).val());
        cutoffPlane._d = parseFloat($(this._input_d).val());
    }
}