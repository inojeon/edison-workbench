import { CAtom } from "../CoreCrystal/CAtom.js";
import { CStructure } from "../CoreCrystal/CStructure.js";
import { Plane } from "../CoreCrystal/Plane.js";
import { Vector3 } from '../Math/Vector3.js';
import { AtomDef } from '../Renderer/AtomDef.js';
import { crystalTable } from './crystalTable.js';
import { rayLog } from '../Renderer/log.js';
import { crystalTableData } from './crystalTableData.js';
import { cryst, crystalVariable } from './crystalVariable.js';
import { crystalEditBondDialog } from "./crystalEditBondDialog.js";
/**
 * 메인 메뉴의 [Edit] - [Edit Data] 다이얼로그 클래스
 *
 * @class crystalEditDataDialog
 */
export class crystalEditDataDialog {

    /**
     * 생성자
     * @param {String} name 다른 앱과 구분하기 위한 이름
     * @param {crystalEditor} app 상위 앱 객체
     * @param {HTMLElement} div_elem EditDataDialog가 부착될 html element
     */
    constructor(name, app, div_elem) {

        this._name = name;

        this._app = app;

        this._div = div_elem;

        this._show = false;

        this._div.innerHTML = this._appElementHTML(name);

        this._tabsEdit = document.getElementById(name + "_edit_data_Tabs");
        // this._div_tab1 = document.getElementById(name + "_edit_data_Tab1");
        this._div_tab2 = document.getElementById(name + "_edit_data_Tab2");
        this._div_tab3 = document.getElementById(name + "_edit_data_Tab3");
        this._div_tab4 = document.getElementById(name + "_edit_data_Tab4");
        this._div_tab5 = document.getElementById(name + "_edit_data_Tab5");

        crystalEditDataDialog.I = this;

        this._input_cs_name = document.getElementById(name + "_cs_name");
        this._input_cs_pos_x = document.getElementById(name + "_cs_pos_x");
        this._input_cs_pos_y = document.getElementById(name + "_cs_pos_y");
        this._input_cs_pos_z = document.getElementById(name + "_cs_pos_z");
        this._input_cs_dir_x = document.getElementById(name + "_cs_dir_x");
        this._input_cs_dir_y = document.getElementById(name + "_cs_dir_y");
        this._input_cs_dir_z = document.getElementById(name + "_cs_dir_z");

        this._input_a_length = document.getElementById(name + "_a_length");
        this._input_b_length = document.getElementById(name + "_b_length");
        this._input_c_length = document.getElementById(name + "_c_length");

        this._input_alpha = document.getElementById(name + "_alpha");
        this._input_beta = document.getElementById(name + "_beta");
        this._input_gamma = document.getElementById(name + "_gamma");

        this._input_su_a_length = document.getElementById(name + "_su_a_length");
        this._input_su_b_length = document.getElementById(name + "_su_b_length");
        this._input_su_c_length = document.getElementById(name + "_su_c_length");

        this._input_su_alpha = document.getElementById(name + "_su_alpha");
        this._input_su_beta = document.getElementById(name + "_su_beta");
        this._input_su_gamma = document.getElementById(name + "_su_gamma");

        this._div_system_table = document.getElementById(name + "_edit_unit_cell_system_table");
        this._div_space_group_table = document.getElementById(name + "_edit_unit_cell_space_group_table");
        this._div_setting_table = document.getElementById(name + "_edit_unit_cell_setting_table");

        this._system_table = new crystalTable(this._name, this._app, this._div_system_table, "System");
        this._space_group_table = new crystalTable(this._name, this._app, this._div_space_group_table, "Space_Group");
        this._setting_table = new crystalTable(this._name, this._app, this._div_setting_table, "Setting");


        this._crystalTableData = new crystalTableData(name, this);

        this._div_blank_left = document.getElementById(name + "_edit_strcture_blank_left");
        this._div_info = document.getElementById(name + "_edit_structure_info");
        this._div_inner_1_info = document.getElementById(name + "_edit_structure_inner_1_info");
        this._div_inner_2_info = document.getElementById(name + "_edit_structure_inner_2_info");
        this._div_inner_3_info = document.getElementById(name + "_edit_structure_inner_3_info");
        this._div_blank_right = document.getElementById(name + "_edit_structure_blank_right");
        this._div_table = document.getElementById(name + "_edit_structure_table");
        $(this._div_table).css("table-layout", "fixed");
        $(this._div_table).css("overflow", "auto");

        this._div_modify = document.getElementById(name + "_edit_structure_modify");
        this._div_info_area = document.getElementById(name + "_edit_structure_info_area");
        this._div_table_area = document.getElementById(name + "_edit_structure_table_area");
        this._div_import_area = document.getElementById(name + "_edit_structure_import_area");
        this._div_etc_area = document.getElementById(name + "_edit_structure_etc_area");
        this._div_import_text = document.getElementById(name + "_edit_structure_import_text");

        this._div_atomTable_area = document.getElementById(name + "_edit_structure_table_area");
        this._div_atomTable = document.getElementById(name + "_edit_structure_table");
        this._atomTable = new crystalTable(this._name, this._app, this._div_atomTable, "atomTable");
        this._atomTable.createHeader("\
                <th class='cryUI_Text_Center cryUI_Big_Td_With_Margin'>No.</th>\
                <th class='cryUI_Text_Center cryUI_Big_Td_With_Margin'>Atom</th>\
                <th class='cryUI_Text_Center cryUI_Big_Td_With_Margin'>Label</th>\
                <th class='cryUI_Text_Center cryUI_Big_Td_With_Margin'>x</th>\
                <th class='cryUI_Text_Center cryUI_Big_Td_With_Margin'>y</th>\
                <th class='cryUI_Text_Center cryUI_Big_Td_With_Margin'>z</th>\
                <th class='cryUI_Text_Center cryUI_Big_Td_With_Margin'>Occ.</th>\
                <th class='cryUI_Text_Center cryUI_Big_Td_With_Margin'>U</th>\
        ", false);

        // 버튼 가져와서 event 처리 붙이기
        this._div_atomTable_btn_area = document.getElementById(name + "_atom_table_btn_area");
        this._btnNewAtom = document.getElementById(name + "_new_atom_btn");
        this._btnNewFromTxt = document.getElementById(name + "_new_atom_from_txt_btn");
        this._btnDeleteAtom = document.getElementById(name + "_delete_atom_btn");
        this._btnClearAtom = document.getElementById(name + "_clear_atom_btn");
        this._btnSymbol = document.getElementById(name + "_atom_symbol_btn");
        this._div_table_objs = document.getElementById(name + "_objects_table");
        this._btnImport = document.getElementById(name + "_import_atom_btn");
        this._btnNewShape = document.getElementById(name + "_new_shape_btn");
        this._btnDeleteShape = document.getElementById(name + "_delete_shape_btn");
        this._btnClearShape = document.getElementById(name + "_clear_shape_btn");

        this._selectedShapeColor = [1, .5, 0];
        this._selectedCatomColor = null;

        this._bModified = false;
        this._bModifiedUnitcell = false;

        this._div_shapeTable = document.getElementById(name + "_edit_crystal_shape_table");
        this._shapeTable = new crystalTable(this._name, this._app, this._div_shapeTable, "shapeTable");
        this._shapeTable.createHeader("\
                <th class='cryUI_Text_Center cryUI_Big_Td_With_Margin'>No.</th>\
                <th class='cryUI_Text_Center cryUI_Big_Td_With_Margin'>h</th>\
                <th class='cryUI_Text_Center cryUI_Big_Td_With_Margin'>k</th>\
                <th class='cryUI_Text_Center cryUI_Big_Td_With_Margin'>l</th>\
                <th class='cryUI_Text_Center cryUI_Big_Td_With_Margin'>d(A)</th>\
        ", false);

        /*
        <th class='cryUI_Text_Center cryUI_Big_Td_With_Margin'>color</th>\
        <th class='cryUI_Text_Center cryUI_Big_Td_With_Margin'>sym.</th>\
        */

        $(this._div_shapeTable).css("table-layout", "fixed");
        $(this._div_shapeTable).css("overflow", "auto");

        $(this._btnNewAtom).button();
        $(this._btnNewFromTxt).button();
        $(this._btnDeleteAtom).button();
        $(this._btnClearAtom).button();
        $(this._btnSymbol).button();
        $(this._btnImport).button();

        $(this._btnNewShape).button();
        $(this._btnDeleteShape).button();
        $(this._btnClearShape).button();


        $(this._btnNewAtom).click(function (event) {

            crystalEditDataDialog.I._bModified = true;

            crystalEditDataDialog.I.UpdateVariable();

            if (!crystalEditDataDialog.I._app._csManager._cs) {

                crystalEditDataDialog.I._app._csManager._cs = new CStructure();

                let a = crystalEditDataDialog.I._variable["a"];
                let b = crystalEditDataDialog.I._variable["b"];
                let c = crystalEditDataDialog.I._variable["c"];
                let abc = crystalEditDataDialog.I._variable["abc"];

                let unitcell = crystalEditDataDialog.I._app._csManager._cs._unitcell;
                unitcell.set(abc[0], abc[1], abc[2], a, b, c);

                crystalEditDataDialog.I._app._csManager._cs._unitcell.set(abc[0], abc[1], abc[2], a, b, c);
                crystalEditDataDialog.I._app._3dRender.RebuildAxisGeom(unitcell._axis._va, unitcell._axis._vb, unitcell._axis._vc);
            }

            let symbol = crystalEditDataDialog.I._variable["atom"];
            let id = crystalEditDataDialog.I._variable["id"];
            let label = crystalEditDataDialog.I._variable["label"];
            let x = crystalEditDataDialog.I._variable["x"];
            let y = crystalEditDataDialog.I._variable["y"];
            let z = crystalEditDataDialog.I._variable["z"];
            let occ = crystalEditDataDialog.I._variable["occ"];
            let su_pos = [crystalEditDataDialog.I._variable["su_x"], crystalEditDataDialog.I._variable["su_y"], crystalEditDataDialog.I._variable["su_z"]];
            let u_arr = [crystalEditDataDialog.I._variable["u11"], crystalEditDataDialog.I._variable["u22"], crystalEditDataDialog.I._variable["u33"],
            crystalEditDataDialog.I._variable["u12"], crystalEditDataDialog.I._variable["u13"], crystalEditDataDialog.I._variable["u23"]];
            let anisoType = crystalEditDataDialog.I._variable["anisoType"];
            let isoType = crystalEditDataDialog.I._variable["isoType"];
            let u = crystalEditDataDialog.I._variable["u"];
            let color = crystalEditDataDialog.I._variable["catomColor"];


            let atom = crystalEditDataDialog.I.createAtom(crystalEditDataDialog.I._app._csManager._cs.assignAtomIdx(), id, label, x, y, z,
                                                            occ, su_pos, anisoType, u_arr, isoType, u, color);
            crystalEditDataDialog.I._app._csManager._cs.addAtom(atom);
            crystalEditDataDialog.I.AddAtomToTable(atom._idx, id, symbol, label, x, y, z, occ, u);

            crystalEditDataDialog.I.SetTab4Size();

            // 마지막 추가된 row 선택되도록 설정
            crystalEditDataDialog.I._atomTable.initSelect();
            crystalEditDataDialog.I._atomTable.selectLast();

            // input 창 업데이트
            crystalEditDataDialog.I.UpdateSelect();
        });

        $(this._btnNewFromTxt).click(function (event) {
            // txt input dialog 띄우기
            crystalEditDataDialog.I._app._dlgInputText.ShowDialog();
        });

        $(this._btnDeleteAtom).click(function (event) {

            crystalEditDataDialog.I._bModified = true;
            let atomRows = crystalEditDataDialog.I._atomTable.getSelected();

            for (let atomRow of atomRows) {
                rayLog(3, $(atomRow).text()[0]);
                let idx = parseInt($(atomRow).find("#" + crystalEditDataDialog.I._app._name + "_atom_idx").html());
                let atom = crystalEditDataDialog.I._app._csManager._cs.getAtomByIdx(idx);
                crystalEditDataDialog.I._app._csManager._cs.removeAtom(atom);
            }

            crystalEditDataDialog.I._atomTable.deleteSelected();    // table 상의 선택된 atom row를 모두 삭제한다.

            crystalEditDataDialog.I.SetTab4Size();

            crystalEditDataDialog.I._app._dlgEditBond.UpdateTable();

            if (crystalEditDataDialog.I._atomTable.getAllRow().length === 0)
                crystalEditDataDialog.I.DisableInput(true);

            crystalEditDataDialog.I._atomTable.updateTable();
        });

        $(this._btnClearAtom).click(function (event) {
            crystalEditDataDialog.I._bModified = true;
            // 확인 다이얼로그를 띄운다.
            crystalEditDataDialog.I._app._dlgEditDataConfirm.ShowDialog();
        });

        // dialog가 열리도록 설정 dialog div elem은 app에 부착하도록 한다.
        $(this._btnSymbol).click(function (event) {
            crystalEditDataDialog.I._app.MenuPeriodic();
        });

        $(this._btnImport).click(function (event) {
        });


        this._dialog = $(this._div).dialog({
            autoOpen: false,
            maxWidth: 680,
            maxHeight: 555,
            width: 680,
            height: 555,
            modal: true,
            closeOnEscape: true,
            resizable: false,
            title: "Edit Data",
            buttons: {
                "OK": function () {
                    if (crystalEditDataDialog.I._bModified) {
                        crystalEditDataDialog.I._app._bModified = true;
                        crystalEditDataDialog.I._app._dlgEditVectors.RestoreAddedVectorFromCS();
                        crystalEditDataDialog.I._app._csManager.AddUndo();
                    }

                    crystalEditDataDialog.I.OnApply();
                    crystalEditDataDialog.I.CloseDialog();
                },
                "Close": function () {
                    crystalEditDataDialog.I.CloseDialog();
                },
            },

            close: function () {
                crystalEditDataDialog.I._show = false;
                crystalEditDataDialog.I._app.UpdateUI();
            },

            open: function () {
                crystalEditDataDialog.I.SetTabSize();
            }
        });

        $(this._tabsEdit).tabs({
            active: 0
        });


        // 입력란 모두 가져오기
        this._input_no = document.getElementById(name + "_tr_no");
        this._input_pos_x = document.getElementById(name + "_atom_pos_x");
        this._input_pos_y = document.getElementById(name + "_atom_pos_y");
        this._input_pos_z = document.getElementById(name + "_atom_pos_z");
        this._input_symbol = document.getElementById(name + "_atom_symbol");
        this._input_label = document.getElementById(name + "_atom_label");
        this._input_occ = document.getElementById(name + "_atom_occ");
        this._input_u = document.getElementById(name + "_atom_u");
        this._input_charge = document.getElementById(name + "_atom_charge");
        this._input_su_x = document.getElementById(name + "_su_x");
        this._input_su_y = document.getElementById(name + "_su_y");
        this._input_su_z = document.getElementById(name + "_su_z");
        this._input_U11 = document.getElementById(name + "_U11");
        this._input_U22 = document.getElementById(name + "_U22");
        this._input_U33 = document.getElementById(name + "_U33");
        this._input_U12 = document.getElementById(name + "_U12");
        this._input_U13 = document.getElementById(name + "_U13");
        this._input_U23 = document.getElementById(name + "_U23");

        this._label_u = document.getElementById(name + "_u_label");
        this._label_U11 = document.getElementById(name + "_U11_label");
        this._label_U22 = document.getElementById(name + "_U22_label");
        this._label_U33 = document.getElementById(name + "_U33_label");
        this._label_U12 = document.getElementById(name + "_U12_label");
        this._label_U13 = document.getElementById(name + "_U13_label");
        this._label_U23 = document.getElementById(name + "_U23_label");

        this._input_h = document.getElementById(name + "_miller_indice_h");
        this._input_k = document.getElementById(name + "_miller_indice_k");
        this._input_l = document.getElementById(name + "_miller_indice_l");
        this._input_d = document.getElementById(name + "_distance_from_origin_A");
        this._input_color_background = document.getElementById(name + "_shape_color_background");
        this._input_alpha_background = document.getElementById(name + "_shape_alpha_background");
        $(this._input_color_background).css("background-color", "#" + $(this._input_color_background).val());

        this._input_catom_color = document.getElementById(name + "_catom_color_picker");

        $(this._input_symbol).attr("disabled", true);

        // on change event listener 달기
        $(this._input_a_length).on("input", function () {
            crystalEditDataDialog.I._bModifiedUnitcell = true;
        });

        $(this._input_b_length).on("input", function () {
            crystalEditDataDialog.I._bModifiedUnitcell = true;
        });

        $(this._input_c_length).on("input", function () {
            crystalEditDataDialog.I._bModifiedUnitcell = true;
        });

        $(this._input_alpha).on("input", function () {
            crystalEditDataDialog.I._bModifiedUnitcell = true;
        });

        $(this._input_beta).on("input", function () {
            crystalEditDataDialog.I._bModifiedUnitcell = true;
        });

        $(this._input_gamma).on("input", function () {
            crystalEditDataDialog.I._bModifiedUnitcell = true;
        });


        $(this._input_pos_x).on("input", function () {
            crystalEditDataDialog.I.ChangeSelectedAtom();
        });

        $(this._input_pos_y).on("input", function () {
            crystalEditDataDialog.I.ChangeSelectedAtom();
        });

        $(this._input_pos_z).on("input", function () {
            crystalEditDataDialog.I.ChangeSelectedAtom();
        });

        $(this._input_symbol).on("input", function () {
            crystalEditDataDialog.I.ChangeSelectedAtom();
        });

        $(this._input_label).on("input", function () {
            crystalEditDataDialog.I.ChangeSelectedAtom();
        });

        $(this._input_occ).on("input", function () {
            crystalEditDataDialog.I.ChangeSelectedAtom();
        });

        $(this._input_u).on("input", function () {
            crystalEditDataDialog.I.ChangeSelectedAtom();
        });

        $(this._input_su_x).on("input", function () {
            crystalEditDataDialog.I.ChangeSelectedAtom();
        });
        $(this._input_su_y).on("input", function () {
            crystalEditDataDialog.I.ChangeSelectedAtom();
        });
        $(this._input_su_z).on("input", function () {
            crystalEditDataDialog.I.ChangeSelectedAtom();
        });

        $(this._input_U11).on("input", function () {
            crystalEditDataDialog.I.ChangeSelectedAtom();
        });
        $(this._input_U22).on("input", function () {
            crystalEditDataDialog.I.ChangeSelectedAtom();
        });
        $(this._input_U33).on("input", function () {
            crystalEditDataDialog.I.ChangeSelectedAtom();
        });
        $(this._input_U12).on("input", function () {
            crystalEditDataDialog.I.ChangeSelectedAtom();
        });
        $(this._input_U13).on("input", function () {
            crystalEditDataDialog.I.ChangeSelectedAtom();
        });
        $(this._input_U23).on("input", function () {
            crystalEditDataDialog.I.ChangeSelectedAtom();
        });

        $(this._selectedCatomColor).on("input", function () {
            crystalEditDataDialog.I.ChangeSelectedAtom();
        });

        $(this._input_h).on("input", function () {
            crystalEditDataDialog.I.ChangeSelectedShape();
        });

        $(this._input_k).on("input", function () {
            crystalEditDataDialog.I.ChangeSelectedShape();
        });

        $(this._input_l).on("input", function () {
            crystalEditDataDialog.I.ChangeSelectedShape();
        });

        $(this._input_d).on("input", function () {
            crystalEditDataDialog.I.ChangeSelectedShape();
        });

        $(this._selectedShapeColor).on("input", function () {
            crystalEditDataDialog.I.ChangeSelectedShape();
        });

        $(this._input_alpha_background).on("input", function () {
            crystalEditDataDialog.I.ChangeSelectedShape();
        });

        this.DisableInput(true);
        this.DisableAnisotropicInput(true);

        $(this._input_color_background).colorpicker({
            modal: true,
            buttonColorize: true,
            buttonImageOnly: true,
            ok: function (event, formatted) {
                event.target.style.backgroundColor = formatted.css;
                crystalEditDataDialog.I.OnChangeColorBackground([formatted.rgb["r"], formatted.rgb["g"], formatted.rgb["b"]]);
                crystalEditDataDialog.I.ChangeSelectedShape();
            }
        });

        $(this._input_catom_color).colorpicker({
            modal: true,
            buttonColorize: true,
            buttonImageOnly: true,
            ok: function (event, formatted) {
                event.target.style.backgroundColor = formatted.css;
                crystalEditDataDialog.I.OnChangeCAtomColor([formatted.rgb["r"], formatted.rgb["g"], formatted.rgb["b"]]);
                crystalEditDataDialog.I.ChangeSelectedAtom();
            }
        });

        $(this._btnNewShape).click(function (event) {

            crystalEditDataDialog.I._bModified = true;

            let id = crystalEditDataDialog.I._app._csManager._cs.assignShapeId();
            let h = parseFloat($(crystalEditDataDialog.I._input_h).val());
            let k = parseFloat($(crystalEditDataDialog.I._input_k).val());
            let l = parseFloat($(crystalEditDataDialog.I._input_l).val());

            let d = parseFloat($(crystalEditDataDialog.I._input_d).val());

            if (h === 0 && k === 0 && l === 0) {
                alert("hkl can not be all zero");
                return;
            }
            let color = crystalEditDataDialog.I._selectedShapeColor;
            let alpha = parseFloat($(crystalEditDataDialog.I._input_alpha_background).val());

            crystalEditDataDialog.I.AddShapeToTable(id, h, k, l, d, color, alpha, true);

            let plane = new Plane();
            let lattice_axis = crystalEditDataDialog.I._app._csManager._cs.getLatticeAxis();
            plane.setMillerIndices(lattice_axis, h, k, l, d);
            plane.setColor(color[0], color[1], color[2], alpha);
            plane._id = id;
            crystalEditDataDialog.I._app._csManager._cs.addPlane(plane);
            crystalEditDataDialog.I._app._dlgEditData.generateStructure();


            crystalEditDataDialog.I._shapeTable.initSelect();
            crystalEditDataDialog.I._shapeTable.selectLast();
        });

        $(this._btnDeleteShape).click(function (event) {

            crystalEditDataDialog.I._bModified = true;

            let shapeRows = crystalEditDataDialog.I._shapeTable.getSelected();

            for (let shapeRow of shapeRows) {
                let id = parseInt($(shapeRow).find("#" + crystalEditDataDialog.I._app._name + "_shape_no").html());
                crystalEditDataDialog.I._app._csManager._cs.removePlaneById(id);
            }

            crystalEditDataDialog.I._shapeTable.deleteSelected();

            crystalEditDataDialog.I._app._dlgEditData.generateStructure();

            crystalEditDataDialog.I._shapeTable.updateTable();
        });

        $(this._btnClearShape).click(function (event) {
            
            crystalEditDataDialog.I._bModified = true;

            crystalEditDataDialog.I._app._csManager._cs.clearPlane();
            crystalEditDataDialog.I._app._dlgEditData._shapeTable.clearAll();
            crystalEditDataDialog.I._app._dlgEditData.generateStructure();
        });

        this._selectAnisotropic = document.getElementById(name + "_atom_anisotropic");
        this._selectIsotropic = document.getElementById(name + "_atom_isotropic");

        $(this._selectAnisotropic).selectmenu({
            width: '80px',
            change: function (event, ui) {
                crystalEditDataDialog.I.OnChangeAnisotropic(crystalEditDataDialog.I._selectAnisotropic.value);
            }
        });

        $(this._selectIsotropic).selectmenu({
            width: '60px',
            change: function (event, ui) {
                crystalEditDataDialog.I.OnChangeIsotropic(crystalEditDataDialog.I._selectIsotropic.value);
            }
        });

    }

    /**
     * editDataDialog에 대한 html element를 작성한다.
     * 
     * @param {String} name 다른 앱과 구분하기 위한 이름
     * @returns {String} HTML 문자열
     */
    _appElementHTML(name) {

        var ihtml = [];

        var idx = 0;

        // Tab1 - Phase
        ihtml[idx] = "<div id='" + name + "_edit_data_Tabs'>";
        idx++;
        ihtml[idx] = "<ul>";
        idx++;
        ihtml[idx] = "<li><a href='#" + name + "_edit_data_Tab4' class='cryUI_TabBtn'>Info</a></li>";
        idx++;
        ihtml[idx] = "<li><a href='#" + name + "_edit_data_Tab2' class='cryUI_TabBtn'>Unit Cell</a></li>";
        idx++;
        ihtml[idx] = "<li><a href='#" + name + "_edit_data_Tab3' class='cryUI_TabBtn'>CStructure</a></li>";
        idx++;
        ihtml[idx] = "<li><a href='#" + name + "_edit_data_Tab5' class='cryUI_TabBtn'>Crystal Shape</a></li>";
        idx++;
        
        ihtml[idx] = "</ul>";
        idx++;


        ///////////////////// [Tab4 - Structure Parameters] /////////////////////
        ihtml[idx] = "<div id='" + name + "_edit_data_Tab4' class='cryUI_Tabs'>";
        idx++;




        ihtml[idx] = "<fieldset>";
        idx++;
        ihtml[idx] = "<legend>CStructure Info</legend>";
        idx++;
        ihtml[idx] = "<table class='cryUI_Lattice_Wrapper_Table'>";
        idx++;

        ihtml[idx] = "<div class='cryUI_Lattice_Left_Blank'></div>";
        idx++;



        ihtml[idx] = "<tr><td class='cryUI_Big_Td_With_Margin'></td><td class='cryUI_Big_Td_With_Margin cryUI_Text_Center'>name</td></tr>";
        idx++;
        ihtml[idx] = "<tr><td class='cryUI_Big_Td_With_Margin'></td><td class='cryUI_Lattice_Input'><input class='cryUI_Big_Td' type='text' id='" + name + "_cs_name'></td></tr>";
        idx++;

        ihtml[idx] = "<tr><td class='cryUI_Big_Td_With_Margin'></td><td class='cryUI_Big_Td_With_Margin cryUI_Text_Center'>pos x</td><td class='cryUI_Big_Td_With_Margin cryUI_Text_Center'>pos y</td><td class='cryUI_Big_Td_With_Margin cryUI_Text_Center'>pos z</td><td class='cryUI_Big_Td_With_Margin cryUI_Text_Center'>dir x</td><td class='cryUI_Big_Td_With_Margin cryUI_Text_Center'>dir y</td><td class='cryUI_Big_Td_With_Margin cryUI_Text_Center'>dir z</td></tr>";
        idx++;

        ihtml[idx] = "<tr><td class='cryUI_Big_Td_With_Margin'></td>";
        idx++;
        ihtml[idx] = "<td class='cryUI_Lattice_Input'><input class='cryUI_Big_Td' type='number' id='" + name + "_cs_pos_x' value=0></td>";
        idx++;
        ihtml[idx] = "<td class='cryUI_Lattice_Input'><input class='cryUI_Big_Td' type='number' id='" + name + "_cs_pos_y' value=0></td>";
        idx++;
        ihtml[idx] = "<td class='cryUI_Lattice_Input'><input class='cryUI_Big_Td' type='number' id='" + name + "_cs_pos_z' value=0></td>";
        idx++;
        ihtml[idx] = "<td class='cryUI_Lattice_Input'><input class='cryUI_Big_Td' type='number' id='" + name + "_cs_dir_x' value=0></td>";
        idx++;
        ihtml[idx] = "<td class='cryUI_Lattice_Input'><input class='cryUI_Big_Td' type='number' id='" + name + "_cs_dir_y' value=0></td>";
        idx++;
        ihtml[idx] = "<td class='cryUI_Lattice_Input'><input class='cryUI_Big_Td' type='number' id='" + name + "_cs_dir_z' value=0></td></tr>";
        idx++;

        ihtml[idx] = "</table>";
        idx++;

        ihtml[idx] = "</fieldset>";
        idx++;

        ihtml[idx] = "</div>";
        idx++;

   
        //////////////////////////////////////////////////////////////////////////

        // Tab2 - Unit Cell
        ihtml[idx] = "<div id='" + name + "_edit_data_Tab2' class='cryUI_Tabs'>";
        idx++;

        // Symmetry

        // A area
        ihtml[idx] = "<div class='cryUI_Edit_Unit_Cell_Symmetry' id='" + name + "_edit_unit_cell_symmetry'>";
        idx++;
        ihtml[idx] = "<fieldset>";
        idx++;
        ihtml[idx] = "<legend>Symmetry</legend>";
        idx++;

        // A' area
        /*
        ihtml[idx] = "<div class='cryUI_Edit_Unit_Cell_Magnetic_Structure' id='" + name + "_edit_unit_cell_magnetic_structre'>";
        idx++;
        ihtml[idx] = "<label for='" + name + "_magnetic_structure_check'>Magnetic structure</label>";
        idx++;
        ihtml[idx] = "<input id='" + name + "_magnetic_structure_check' type='checkbox'></input>";
        idx++;
        ihtml[idx] = "</div>";
        idx++;
        */

        // A'' area
        ihtml[idx] = "<div class='cryUI_Edit_Unit_Cell_System_Space_Group_Setting' id='" + name + "_edit_unit_cell_system_space_group_setting'>";
        idx++;

        // A''-1 area
        ihtml[idx] = "<div class='cryUI_Edit_Unit_Cell_System' id='" + name + "_edit_unit_cell_system_table'>";
        idx++;
        ihtml[idx] = "</div>";
        idx++;

        // A''-2 area
        ihtml[idx] = "<div class='cryUI_Edit_Unit_Cell_Space_Group' id='" + name + "_edit_unit_cell_space_group_table'>";
        idx++;
        ihtml[idx] = "</div>";
        idx++;

        // A''-3 area
        ihtml[idx] = "<div class='cryUI_Edit_Unit_Cell_Setting' id='" + name + "_edit_unit_cell_setting_table'>";
        idx++;
        ihtml[idx] = "</div>";
        idx++;


        ihtml[idx] = "</div></fieldset></div>";
        idx++;

        // B Area
        // Lattice Parameters
        ihtml[idx] = "<fieldset>";
        idx++;
        ihtml[idx] = "<legend>Lattice parameters</legend>";
        idx++;
        ihtml[idx] = "<table class='cryUI_Lattice_Wrapper_Table'>";
        idx++;

        ihtml[idx] = "<div class='cryUI_Lattice_Left_Blank'>";
        idx++;

        ihtml[idx] = "<tr><td class='cryUI_Big_Td_With_Margin'></td><td class='cryUI_Big_Td_With_Margin cryUI_Text_Center'>a(?)</td><td class='cryUI_Big_Td_With_Margin cryUI_Text_Center'>b(?)</td><td class='cryUI_Big_Td_With_Margin cryUI_Text_Center'>c(?)</td><td class='cryUI_Big_Td_With_Margin cryUI_Text_Center'>α(?)</td><td class='cryUI_Big_Td_With_Margin cryUI_Text_Center'>β(?)</td><td class='cryUI_Big_Td_With_Margin cryUI_Text_Center'>γ(?)</td></tr>";
        idx++;

        ihtml[idx] = "<tr><td class='cryUI_Big_Td_With_Margin'></td>";
        idx++;
        ihtml[idx] = "<td class='cryUI_Lattice_Input'><input class='cryUI_Big_Td' type='number' id='" + name + "_a_length' value=" + cryst.Unitcell.a + "></td>";
        idx++;
        ihtml[idx] = "<td class='cryUI_Lattice_Input'><input class='cryUI_Big_Td' type='number' id='" + name + "_b_length' value=" + cryst.Unitcell.b + "></td>";
        idx++;
        ihtml[idx] = "<td class='cryUI_Lattice_Input'><input class='cryUI_Big_Td' type='number' id='" + name + "_c_length' value=" + cryst.Unitcell.c + "></td>";
        idx++;
        ihtml[idx] = "<td class='cryUI_Lattice_Input'><input class='cryUI_Big_Td' type='number' id='" + name + "_alpha' value=" + cryst.Unitcell.alpha + "></td>";
        idx++;
        ihtml[idx] = "<td class='cryUI_Lattice_Input'><input class='cryUI_Big_Td' type='number' id='" + name + "_beta' value=" + cryst.Unitcell.beta + "></td>";
        idx++;
        ihtml[idx] = "<td class='cryUI_Lattice_Input'><input class='cryUI_Big_Td' type='number' id='" + name + "_gamma' value=" + cryst.Unitcell.gamma + "></td></tr>";
        idx++;

        /*
        ihtml[idx] = "<tr>";
        idx++;
        ihtml[idx] = "<td class='cryUI_Big_Td_With_Margin'>s.u.:</td>";
        idx++;
        ihtml[idx] = "<td class='cryUI_Big_Td_With_Margin'><input class='cryUI_Big_Td' type='number' id='" + name + "_su_a_length'></td><td class='cryUI_Big_Td'><input class='cryUI_Big_Td' type='number' id='" + name + "_su_b_length'></td><td class='cryUI_Big_Td'><input class='cryUI_Big_Td' type='number' id='" + name + "_su_c_length'></td>";
        idx++;
        ihtml[idx] = "<td class='cryUI_Big_Td_With_Margin'><input class='cryUI_Big_Td' type='number' id='" + name + "_su_alpha'></td><td class='cryUI_Big_Td'><input class='cryUI_Big_Td' type='number' id='" + name + "_su_beta'></td><td class='cryUI_Big_Td'><input class='cryUI_Big_Td' type='number' id='" + name + "_su_gamma'></td>";
        idx++;
        ihtml[idx] = "</tr>";
        idx++;
        */
        ihtml[idx] = "</table>";
        idx++;

        ihtml[idx] = "</fieldset></div>";
        idx++;

        // [Tab - CStructure]
        ihtml[idx] = "<div id='" + name + "_edit_data_Tab3' class='cryUI_Tabs'><fieldset>";
        idx++;

        ihtml[idx] = "<div class='cryUI_Edit_Structure_Info_Area' id='" + name + "_edit_structure_info_area'>";
        idx++;


        // A 공간
        ihtml[idx] = "<div class='cryUI_Edit_Structure_Blank_Left' id='" + name + "_edit_strcture_blank_left'></div>";
        idx++;


        // B 공간
        ihtml[idx] = "<div class='cryUI_Edit_Structure_Info' id='" + name + "_edit_structure_info'>";
        idx++;
           /*
        ihtml[idx] = "<div class='cryUI_Edit_Structure_Inner_1_Info' id='" + name + "_edit_structure_inner_1_info'>";
        idx++;
        ihtml[idx] = "<tr>";
        idx++;
        ihtml[idx] = "<td class='cryUI_Big_Td_With_Margin'>Atomic displacement parameter&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>";
        idx++;
     
        ihtml[idx] = "<td class='cryUI_Big_Td_With_Margin'><label for='" + name + "_atom_anisotropic'>Anisotropic:</td>";
        idx++;
        ihtml[idx] = "<td class='cryUI_Big_Td_With_Margin'><select  id='" + name + "_atom_anisotropic'>";
        idx++;
        ihtml[idx] = "<option value='none'>None</option>";
        idx++;
        ihtml[idx] = "<option value='u'>U</option>";
        idx++;
        ihtml[idx] = "<option value='beta'>beta</option>";
        idx++;
        ihtml[idx] = "</select>";
        idx++;
        ihtml[idx] = "</td>";
        idx++;
        ihtml[idx] = "&nbsp;&nbsp;&nbsp;&nbsp;";
            idx++;

        ihtml[idx] = "<td class='cryUI_Big_Td_With_Margin'><label for='" + name + "_atom_isotropic'>Isotropic:</label></td>";
        idx++;
        ihtml[idx] = "<td class='cryUI_Big_Td_With_Margin'><select id='" + name + "_atom_isotropic'>";
        idx++;
        ihtml[idx] = "<option value='u'>U</option>";
        idx++;
        ihtml[idx] = "<option value='b'>B</option>";
        idx++;
        ihtml[idx] = "</select>";
        idx++;
        ihtml[idx] = "</td>";
        idx++;
        ihtml[idx] = "</tr>";
        idx++;
        ihtml[idx] = "</div>";
        idx++;
        */

        ihtml[idx] = "<div class='cryUI_Edit_Structure_Inner_2_Info' id='" + name + "_edit_structure_inner_2_info'>";
        idx++;
        ihtml[idx] = "<tr>";
        idx++;
        ihtml[idx] = "<td class='cryUI_Big_Td_With_Margin'>No:</td><td><input type='number' class='cryUI_Big_Td_With_Margin' id='" + name + "_tr_no'>&nbsp;&nbsp;&nbsp;&nbsp;</td>";
        idx++;
        ihtml[idx] = "<td class='cryUI_Big_Td_With_Margin'><button id='" + name + "_atom_symbol_btn' class='cryUI_Normal_Btn'>Symbol...</button></td><td><input type='text' id='" + name + "_atom_symbol' class='cryUI_Big_Td_With_Margin'>&nbsp;&nbsp;&nbsp;&nbsp;</td>";
        idx++;
        ihtml[idx] = "<td class='cryUI_Big_Td_With_Margin'>Label:</td><td><input type='text' id='" + name + "_atom_label' class='cryUI_Big_Td_With_Margin'>&nbsp;&nbsp;&nbsp;&nbsp;</td>";
        idx++;
        ihtml[idx] = "<td class='cryUI_Big_Td_With_Margin'>Charge:</td>";
        idx++;
        ihtml[idx] = "<td><input class='cryUI_Big_Td_With_Margin' type='number' value=0 step='1' id='" + name + "_atom_charge'>&nbsp;&nbsp;&nbsp;&nbsp;</td>";
        idx++;
        ihtml[idx] = "</tr>";
        idx++;
        ihtml[idx] = "</div>";
        idx++;

        ihtml[idx] = "<div class='cryUI_Edit_Structure_Inner_3_Info' id='" + name + "_edit_structure_inner_3_info'>";
        idx++;
        ihtml[idx] = "<table>";
        idx++;
        ihtml[idx] = "<tr>";
        idx++;
        ihtml[idx] = "<td class='cryUI_Big_Td_With_Margin'>x:</td>";
        idx++;
        ihtml[idx] = "<td class='cryUI_Big_Td_With_Margin'><input type='number' step='0.1' class='cryUI_Normal_Td_Left' value=0.0 id='" + name + "_atom_pos_x'></td><td class='cryUI_Big_Td_With_Margin'>y:</td><td class='cryUI_Big_Td_With_Margin'><input type='number' step='0.1'  class='cryUI_Normal_Td_Left' value=0.0 id='" + name + "_atom_pos_y'></td><td class='cryUI_Big_Td_With_Margin'>z:</td><td class='cryUI_Big_Td_With_Margin'><input type='number' step='0.1'  class='cryUI_Normal_Td_Left' value=0.0 id='" + name + "_atom_pos_z'></td>";
        idx++;
        ihtml[idx] = "<td class='cryUI_Big_Td_With_Margin'>Occ:</td><td class='cryUI_Big_Td_With_Margin'><input type='number' step='0.1'  class='cryUI_Normal_Td_Left' value=1 id='" + name + "_atom_occ'></td>";
        idx++;
        ihtml[idx] = "</tr>";
        idx++;


        ihtml[idx] = "<tr>";
        idx++;
        /*
        ihtml[idx] = "<td class='cryUI_Big_Td_With_Margin'>s.u.(x):</td><td><input type='number' step='0.1'  class='cryUI_Normal_Td_Left' value=0.0 id='" + name + "_su_x'></td><td class='cryUI_Big_Td_With_Margin'>s.u.(y):</td><td><input type='number' step='0.1'  class='cryUI_Normal_Td_Left' value=0.0 id='" + name + "_su_y'></td><td class='cryUI_Big_Td_With_Margin'>s.u.(z):</td><td><input type='number' step='0.1' class='cryUI_Normal_Td_Left' value=0.0 id='" + name + "_su_z'></td>"
        idx++;
        */
        ihtml[idx] = "<td class='cryUI_Big_Td_With_Margin' id='" + name + "_u_label'>U:</td><td><input type='number' step='0.1'  class='cryUI_Normal_Td_Left' value=0.0 id='" + name + "_atom_u'></td>";
        idx++;
        ihtml[idx] = "<td class='cryUI_Big_Td_With_Margin'>Color:</td>";
        idx++;
        ihtml[idx] = "<td class='cryUI_Big_Td_With_Margin'><input type='text' class='cryUI_Normal_Td_Left' id='" + name + "_catom_color_picker'></td>";
        idx++;
        ihtml[idx] = "</tr>";
        idx++;

        /*
        ihtml[idx] = "<tr>";
        idx++;
        ihtml[idx] = "<td class='cryUI_Big_Td_With_Margin' id='" + name + "_U11_label'>U11:</td>";
        idx++;
        ihtml[idx] = "<td class='cryUI_Big_Td_With_Margin'><input type='number' step='0.1'  class='cryUI_Normal_Td_Left' value=0.0 id='" + name + "_U11'></td>";
        idx++;
        ihtml[idx] = "<td class='cryUI_Big_Td_With_Margin' id='" + name + "_U22_label'>U22:</td><td><input type='number' step='0.1'  class='cryUI_Normal_Td_Left' value=0.0 id='" + name + "_U22'></td>";
        idx++;
        ihtml[idx] = "<td class='cryUI_Big_Td_With_Margin' id='" + name + "_U33_label'>U33:</td>";
        idx++;
        ihtml[idx] = "<td class='cryUI_Big_Td_With_Margin'><input type='number' step='0.1'  class='cryUI_Normal_Td_Left' value=0.0 id='" + name + "_U33'></td>";
        idx++;
        ihtml[idx] = "</tr>";
        idx++;
         */

        /*
        ihtml[idx] = "<tr>";
        idx++;
        ihtml[idx] = "<td class='cryUI_Big_Td_With_Margin' id='" + name + "_U12_label'>U12:</td><td><input type='number' step='0.1' class='cryUI_Normal_Td_Left' value=0.0 id='" + name + "_U12'></td>";
        idx++;
        ihtml[idx] = "<td class='cryUI_Big_Td_With_Margin' id='" + name + "_U13_label'>U13:</td><td><input type='number' step='0.1' class='cryUI_Normal_Td_Left' value=0.0 id='" + name + "_U13'></td>";
        idx++;
        ihtml[idx] = "<td class='cryUI_Big_Td_With_Margin' id='" + name + "_U23_label'>U23:</td><td><input type='number' step='0.1' class='cryUI_Normal_Td_Left' value=0.0 id='" + name + "_U23'></td>";
        idx++;
        ihtml[idx] = "</tr>";
        idx++;
        */

        ihtml[idx] = "</table>";
        idx++;
        ihtml[idx] = "</div>";
        idx++;
        ihtml[idx] = "</div>";
        idx++;

        // C 공간
        /*
        ihtml[idx] = "<div class='cryUI_Edit_Structure_Blank_Right' id='" + name + "_edit_structure_blank_right'></div>";
        idx++;
        ihtml[idx] = "</div>";
        idx++;
        */

        // D,E 공간

        ihtml[idx] = "<div class='cryUI_Edit_Structure_Table_Area' id='" + name + "_edit_structure_table_area'>";
        idx++;

        ihtml[idx] = "<div class='cryUI_Edit_Structure_Table' id='" + name + "_edit_structure_table'>";
        idx++;
        ihtml[idx] = "</div>";
        idx++;
        ihtml[idx] = "<div class='cryUI_Edit_Structure_Modify' id='" + name + "_edit_structure_modify'>";
        idx++;
        ihtml[idx] = "<button class='ui - button ui - widget ui - corner - all cryUI_Normal_Thick_Btn' id='" + name + "_new_atom_btn'>New</button>";
        idx++;
        ihtml[idx] = "<button class='ui - button ui - widget ui - corner - all cryUI_Normal_Thick_Btn' id='" + name + "_new_atom_from_txt_btn'>Txt</button>";
        idx++;
        ihtml[idx] = "<button class='ui - button ui - widget ui - corner - all cryUI_Normal_Thick_Btn' id='" + name + "_delete_atom_btn'>Delete</button>";
        idx++;
        ihtml[idx] = "<button class='ui - button ui - widget ui - corner - all cryUI_Normal_Thick_Btn' id='" + name + "_clear_atom_btn'>Clear</button>";
        idx++;
        ihtml[idx] = "</div>";
        idx++;
        ihtml[idx] = "</div>";
        idx++;

        // F,G 공간
        /*
        ihtml[idx] = "<div class='cryUI_Edit_Structure_Import_Area' id='" + name + "_edit_structure_import_area'>";
        idx++;
        ihtml[idx] = "<div id='" + name + "_edit_structure_import_text' class='cryUI_Edit_Structure_Import_Text'>";
        idx++;
        ihtml[idx] = "<input type='text' class='cryUI_Edit_Structure_Import_Text'>";
        idx++;
        ihtml[idx] = "</div>";
        idx++;
        ihtml[idx] = "<div id='" + name + "_edit_structure_import_btn' class='cryUI_Edit_Structure_Import_Btn'>";
        idx++;
        ihtml[idx] = "<button class='cryUI_Normal_Thick_Btn ui - button ui - widget ui - corner - all' id='" + name + "_import_atom_btn'>Import</button>";
        idx++;
        ihtml[idx] = "</div>";
        idx++;
        ihtml[idx] = "</div>";
        idx++;
        */
        /*
        // Link / Right Bottom 공간
        ihtml[idx] = "<div></div>";
        idx++;
        */

        ihtml[idx] = "</fieldset></div>";
        idx++;

        ////////////////////////////////////////////















    


        // Tab4 - Volumetric Data
        /*
        ihtml[idx] = "<div id='" + name + "_edit_data_Tab4' class='cryUI_Tabs'>";
        idx++;
        ihtml[idx] = "</div>";
        idx++;
        */

        // Tab5 - Crystal Shape
        ihtml[idx] = "<div id='" + name + "_edit_data_Tab5' class=cryUI_Tabs'>";
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
        ihtml[idx] = "<td class='cryUI_Lattice_Input'><input class='cryUI_Big_Td_With_Margin' type='number' id='" + name + "_miller_indice_h' value=1></td>";
        idx++;
        ihtml[idx] = "<td class='cryUI_Lattice_Input'><input class='cryUI_Big_Td_With_Margin' type='number' id='" + name + "_miller_indice_k' value=0></td>";
        idx++;
        ihtml[idx] = "<td class='cryUI_Lattice_Input'><input class='cryUI_Big_Td_With_Margin' type='number' id='" + name + "_miller_indice_l' value=0></td>";
        idx++;
        ihtml[idx] = "</tr>";
        idx++;

        ihtml[idx] = "<tr>";
        idx++;
        ihtml[idx] = "<td class='cryUI_Float_Td'>Distance from origin:</td>";
        idx++;
        ihtml[idx] = "<td class='cryUI_Lattice_Input'><input class='cryUI_Big_Td_With_Margin' type='number' id='" + name + "_distance_from_origin_A' value=1></td>";
        idx++;
        ihtml[idx] = "</tr>";
        idx++;

        
        ihtml[idx] = "<tr>";
        idx++;
        ihtml[idx] = "<td class='cryUI_Float_Td'>Color (RGB):</td>";
        idx++;
        // color picker 추가하기
        ihtml[idx] = "<td class='cryUI_Lattice_Input'><input class='cryUI_Normal_Td' type='text' id='" + name + "_shape_color_background' value='ff7b00'></td>";
        idx++;
        // ihtml[idx] = "<td class='cryUI_Lattice_Input'><input class='cryUI_Normal_Td' type='number' id='" + name + "_shape_alpha_background' value=255 onkeyup='if (value < 0) value = 0; if (value > 255) value=255;'></td>";
        // idx++;
        ihtml[idx] = "</tr>";
        idx++;
        

        ihtml[idx] = "</table>";
        idx++;
        // table
        ihtml[idx] = "<div class='cryUI_Edit_Structure_Table_Area' id='" + name + "_edit_crystal_shape_area'>";
        idx++;

        ihtml[idx] = "<div class='cryUI_Edit_Structure_Table' id='" + name + "_edit_crystal_shape_table'>";
        idx++;
        ihtml[idx] = "</div>";
        idx++;
        ihtml[idx] = "<div class='cryUI_Edit_Structure_Modify' id='" + name + "_edit_shape_modify'>";
        idx++;
        ihtml[idx] = "<button class='ui - button ui - widget ui - corner - all cryUI_Normal_Thick_Btn' id='" + name + "_new_shape_btn'>New</button>";
        idx++;
        ihtml[idx] = "<button class='ui - button ui - widget ui - corner - all cryUI_Normal_Thick_Btn' id='" + name + "_delete_shape_btn'>Delete</button>";
        idx++;
        ihtml[idx] = "<button class='ui - button ui - widget ui - corner - all cryUI_Normal_Thick_Btn' id='" + name + "_clear_shape_btn'>Clear</button>";
        idx++;
        ihtml[idx] = "</div>";
        idx++;

        ihtml[idx] = "</fieldset>";
        idx++;
        ihtml[idx] = "</div>";
        idx++;
        

        return ihtml.join("");
    };

    OnChangeAnisotropic(value) {

        let selected = this._atomTable.getSelected();
        let idx = parseInt($(selected[0]).find("#" + this._name + "_atom_idx").html());
        let catom = this._app._csManager._cs.getAtomByIdx(idx);

        switch (value) {
            case "none": 
                // disable input
                crystalEditDataDialog.I.DisableAnisotropicInput();

                if(catom)
                catom._anisotype = -1;
                break;

            case "u":
                if (crystalEditDataDialog.I._atomTable.getSelected().length === 1) {
                    // change input label
                    crystalEditDataDialog.I.DisableAnisotropicInput(false);
                    $(crystalEditDataDialog.I._label_U11).html("U11:");
                    $(crystalEditDataDialog.I._label_U22).html("U22:");
                    $(crystalEditDataDialog.I._label_U33).html("U33:");
                    $(crystalEditDataDialog.I._label_U12).html("U12:");
                    $(crystalEditDataDialog.I._label_U13).html("U13:");
                    $(crystalEditDataDialog.I._label_U23).html("U23:");

                    if (catom._anisoU.length === 6) {
                        $(crystalEditDataDialog.I._input_U11).val(catom._anisoU[0]);
                        $(crystalEditDataDialog.I._input_U22).val(catom._anisoU[1]);
                        $(crystalEditDataDialog.I._input_U33).val(catom._anisoU[2]);
                        $(crystalEditDataDialog.I._input_U12).val(catom._anisoU[3]);
                        $(crystalEditDataDialog.I._input_U13).val(catom._anisoU[4]);
                        $(crystalEditDataDialog.I._input_U23).val(catom._anisoU[5]);
                    }
                    else {
                        $(crystalEditDataDialog.I._input_U11).val(0.0);
                        $(crystalEditDataDialog.I._input_U22).val(0.0);
                        $(crystalEditDataDialog.I._input_U33).val(0.0);
                        $(crystalEditDataDialog.I._input_U12).val(0.0);
                        $(crystalEditDataDialog.I._input_U13).val(0.0);
                        $(crystalEditDataDialog.I._input_U23).val(0.0);
                    }
                    if (catom)
                    catom._anisotype = 0;
                }
                break;

            case "beta":
                if (crystalEditDataDialog.I._atomTable.getSelected().length === 1) {
                    // change input label
                    crystalEditDataDialog.I.DisableAnisotropicInput(false);
                    $(crystalEditDataDialog.I._label_U11).html("beta11:");
                    $(crystalEditDataDialog.I._label_U22).html("beta22:");
                    $(crystalEditDataDialog.I._label_U33).html("beta33:");
                    $(crystalEditDataDialog.I._label_U12).html("beta12:");
                    $(crystalEditDataDialog.I._label_U13).html("beta13:");
                    $(crystalEditDataDialog.I._label_U23).html("beta23:");

                    if (catom._anisoBeta.length === 6) {
                        $(crystalEditDataDialog.I._input_U11).val(catom._anisoBeta[0]);
                        $(crystalEditDataDialog.I._input_U22).val(catom._anisoBeta[1]);
                        $(crystalEditDataDialog.I._input_U33).val(catom._anisoBeta[2]);
                        $(crystalEditDataDialog.I._input_U12).val(catom._anisoBeta[3]);
                        $(crystalEditDataDialog.I._input_U13).val(catom._anisoBeta[4]);
                        $(crystalEditDataDialog.I._input_U23).val(catom._anisoBeta[5]);
                    }
                    else {
                        $(crystalEditDataDialog.I._input_U11).val(0.0);
                        $(crystalEditDataDialog.I._input_U22).val(0.0);
                        $(crystalEditDataDialog.I._input_U33).val(0.0);
                        $(crystalEditDataDialog.I._input_U12).val(0.0);
                        $(crystalEditDataDialog.I._input_U13).val(0.0);
                        $(crystalEditDataDialog.I._input_U23).val(0.0);
                    }
                    if (catom)
                    catom._anisotype = 1;
                }

                break;
        }

        // 현재 선택된 atom row의 모드를 변경하여야 한다.
    }

    /**
     * Isotropic 옵션 변경 적용
     * @param {String} value u / b
     */
    OnChangeIsotropic(value) {

        let selected = this._atomTable.getSelected();
        let idx = parseInt($(selected[0]).find("#" + this._name + "_atom_idx").html());
        let catom = this._app._csManager._cs.getAtomByIdx(idx);
        let atomRows;

        switch (value) {
            case "u":
                // [미구현] : 테이블 header와 모든 데이터들을 바꿔야 한다.
                $(crystalEditDataDialog.I._label_u).html("U:");
                $(this._input_u).val(catom._isoU);

                this._atomTable.removeHeader();
                this._atomTable.createHeader("\
                <th class='cryUI_Text_Center cryUI_Big_Td_With_Margin'>No.</th>\
                <th class='cryUI_Text_Center cryUI_Big_Td_With_Margin'>Atom</th>\
                <th class='cryUI_Text_Center cryUI_Big_Td_With_Margin'>Label</th>\
                <th class='cryUI_Text_Center cryUI_Big_Td_With_Margin'>x</th>\
                <th class='cryUI_Text_Center cryUI_Big_Td_With_Margin'>y</th>\
                <th class='cryUI_Text_Center cryUI_Big_Td_With_Margin'>z</th>\
                <th class='cryUI_Text_Center cryUI_Big_Td_With_Margin'>Occ.</th>\
                <th class='cryUI_Text_Center cryUI_Big_Td_With_Margin'>U</th>", false);

                atomRows = this._atomTable.getAllRow();

                for (let atomRow of atomRows) {
                    let idx = parseInt($(atomRow).find("#" + crystalEditDataDialog.I._app._name + "_atom_idx").html());
                    let catom = crystalEditDataDialog.I._app._csManager._cs.getAtomByIdx(idx);

                    $(atomRow).find("#" + crystalEditDataDialog.I._app._name + "_v").html(catom._isoU);
                }

                break;

            case "b":
                // [미구현] : 테이블 header와 모든 데이터들을 바꿔야 한다.
                $(crystalEditDataDialog.I._label_u).html("B:");
                $(this._input_u).val(catom._isoB);

                // remove header and create new one
                this._atomTable.removeHeader();
                this._atomTable.createHeader("\
                <th class='cryUI_Text_Center cryUI_Big_Td_With_Margin'>No.</th>\
                <th class='cryUI_Text_Center cryUI_Big_Td_With_Margin'>Atom</th>\
                <th class='cryUI_Text_Center cryUI_Big_Td_With_Margin'>Label</th>\
                <th class='cryUI_Text_Center cryUI_Big_Td_With_Margin'>x</th>\
                <th class='cryUI_Text_Center cryUI_Big_Td_With_Margin'>y</th>\
                <th class='cryUI_Text_Center cryUI_Big_Td_With_Margin'>z</th>\
                <th class='cryUI_Text_Center cryUI_Big_Td_With_Margin'>Occ.</th>\
                <th class='cryUI_Text_Center cryUI_Big_Td_With_Margin'>B</th>", false);

                // get all row
                atomRows = this._atomTable.getAllRow();

                for (let atomRow of atomRows) {
                    let idx = parseInt($(atomRow).find("#" + crystalEditDataDialog.I._app._name + "_atom_idx").html());
                    let catom = crystalEditDataDialog.I._app._csManager._cs.getAtomByIdx(idx);

                    $(atomRow).find("#" + crystalEditDataDialog.I._app._name + "_v").html(catom._isoB);
                }

                break;
        }

        // 현재 선택된 atom row의 모드를 변경하고 값을 초기화한다.
    }

    /**
     * 탭 사이즈 설정
     * */
    SetTabSize() {
        this.SetTab4Size();
    }

    /**
     * 탭 4 사이즈 설정
     * */
    SetTab4Size() {

        // B의 너비는 전체 너비에서 A, C를 뺀 너비다
        let div_info_w = $(this._div_info_area).width() - $(this._div_blank_left).width() - $(this._div_blank_right).width();
        this._div_info.style.width = div_info_w + "px";

        // B''의 높이는 B에서 B', B''를 뺀 높이다
        let div_info_h = $(this._div_info).height();
        this._div_inner_2_info.style.height = div_info_h - $(this._div_inner_1_info).height() - $(this._div_inner_3_info).height() + "px";

        // D의 너비는 전체 너비에서 E를 뺀 너비다
        let div_table_w = $(this._div_table_area).width() - $(this._div_modify).width() - 2;
        this._div_table.style.width = div_table_w + "px";

        // G의 너비는 전체 너비에서 F를 뺀 너비다
     
        
        // let div_import_text_w = $(this._div_import_area).width() - $(this._div_import_btn).width() - 30;
        // this._div_import_text.style.width = div_import_text_w + "px";
    }

    /**
     * EditDataDialog를 띄운다.
     */
    ShowDialog() {
        if (this._show)
            return;

        crystalEditDataDialog.I._app._csManager.SetPrev(crystalEditDataDialog.I._app._csManager._cs);

        // this.UpdateUI();
        this._dialog.dialog("open");
        this.SetTabSize();
        this._show = true;
    }

    
    /**
     * 다이얼로그 창을 닫는다.
     *
     * @memberof crystalEditDataDialog
     */
    CloseDialog() {
        this._dialog.dialog("close");
        this._show = false;
        this._bModified = false;
        this._bModifiedUnitcell = false;
        this._app.UpdateUI();
    }

    /**
     * 현재 상황을 적용한다.
     * */
    OnApply() {
        let tabIdx = this.GetActiveTabIndex();
        this.UpdateVariable();

        switch (tabIdx) {

            case 1:     // unitcell update

                let a = this._variable["a"];
                let b = this._variable["b"];
                let c = this._variable["c"];

                let abc = this._variable["abc"];

                if (!crystalEditDataDialog.I._app._csManager._cs) {
                    crystalEditDataDialog.I._app._csManager._cs = new CStructure();

                    let minx = parseFloat($(crystalEditDataDialog.I._app._dlgBoundarySetting._input_min_x).val());
                    let miny = parseFloat($(crystalEditDataDialog.I._app._dlgBoundarySetting._input_min_y).val());
                    let minz = parseFloat($(crystalEditDataDialog.I._app._dlgBoundarySetting._input_min_z).val());
                    let maxx = parseFloat($(crystalEditDataDialog.I._app._dlgBoundarySetting._input_max_x).val());
                    let maxy = parseFloat($(crystalEditDataDialog.I._app._dlgBoundarySetting._input_max_y).val());
                    let maxz = parseFloat($(crystalEditDataDialog.I._app._dlgBoundarySetting._input_max_z).val());

                    crystaleditDataDialog.I._app._csManager._cs._boundary.set(new Vector3(minx, miny, minz), new Vector3(maxx, maxy, maxz));
                }

                let unitcell = crystalEditDataDialog.I._app._csManager._cs._unitcell;
                crystalEditDataDialog.I._app._csManager._cs._unitcell.set(abc[0], abc[1], abc[2], a, b, c);
                crystalEditDataDialog.I._app._csManager._cs._unitcell._axis.calculate();
                crystalEditDataDialog.I._app._3dRender.RebuildAxisGeom(unitcell._axis._va, unitcell._axis._vb, unitcell._axis._vc);
                break;

            case 0:

                let name = this._variable["name"];
                let pos_x = this._variable["pos_x"];
                let pos_y = this._variable["pos_y"];
                let pos_z = this._variable["pos_z"];
                let dir_x = this._variable["dir_x"];
                let dir_y = this._variable["dir_y"];
                let dir_z = this._variable["dir_z"];

                crystalEditDataDialog.I._app._csManager._cs._name = name;
                crystalEditDataDialog.I._app._csManager._cs._position.set(pos_x, pos_y, pos_z);
                crystalEditDataDialog.I._app._csManager._cs._direction.set(dir_x, dir_y, dir_z);
                break;

        }



        // 거리 각도 측정 삭제 호출
        crystalEditDataDialog.I._app._uiHandler.ClearAllMeasures();

        // generate structure
        // crystalEditDataDialog.I.UpdateRenderer();
        crystalEditDataDialog.I._app._dlgEditBond.UpdateRenderer();

        crystalEditDataDialog.I._app._property.UpdateUI();
        crystalEditDataDialog.I._app._dlgEditBond.UpdateTable();
        crystalEditDataDialog.I._app._dlgEditVectors._crystal_graphic_sites_tab.UpdateTable();
        crystalEditDataDialog.I._app._dlgEditVectors._individual_atom_tab.UpdateTable();

        if (crystalEditDataDialog.I._bModifiedUnitcell) {
            crystalEditDataDialog.I._app._3dRender._renderer.autofitCameraObjList([crystalEditDataDialog.I._app._csManager._cs.getMesh()], 100);
        }

        crystalEditDataDialog.I._app._property._propertyStyle.OnApply();
    }

    /**
     * Structure 테이블에 새로운 원자를 추가한다.
     *
     * @param {String} atom_name 원자명
     * @param {String} label_name 라벨
     * @param {Number} x x좌표
     * @param {Number} y y좌표
     * @param {Number} z z좌표
     * @param {Number} Occ Occ
     * @param {Number} v v
     * @memberof crystalEditDataDialog
     */
    AddAtomToTable(idx, id, atom_name, label_name, x, y, z, Occ, v) {
        let innerHTML = "\
            <td style='display:none' id='" + this._name + "_atom_idx'>" + idx + "</td>\
            <td style='display:none' class='atom_id cryUI_Text_Center' id='" + this._name + "_atom_id'>" + id  + "</td>\
            <td class='cryUI_Big_Td_With_Margin cryUI_Text_Center' id='" + this._name + "_atom_name'>" + atom_name + "</td>\
            <td class='cryUI_Big_Td_With_Margin cryUI_Text_Center' id='" + this._name + "_label_name'>" + label_name + "</td>\
            <td class='cryUI_Big_Td_With_Margin cryUI_Text_Center' id='" + this._name + "_pos_x'>" + x + "</td>\
            <td class='cryUI_Big_Td_With_Margin cryUI_Text_Center' id='" + this._name + "_pos_y'>" + y + "</td>\
            <td class='cryUI_Big_Td_With_Margin cryUI_Text_Center' id='" + this._name + "_pos_z'>" + z + "</td>\
            <td class='cryUI_Big_Td_With_Margin cryUI_Text_Center' id='" + this._name + "_occ'>" + Occ + "</td>\
            <td class='cryUI_Big_Td_With_Margin cryUI_Text_Center' id='" + this._name + "_v'>" + v + "</td>";

        this._atomTable.appTable(innerHTML, true);
        $(this._atomTable.getAllRow()).last().on("click", function () {
            crystalEditDataDialog.I.UpdateSelect();
        });
    }

    /**
     * crystal shape를 테이블에 추가한다.
     * 
     * @param {Number} id crystal shape id
     * @param {Number} h miller index h
     * @param {Number} k miller index k
     * @param {Number} l miller index l
     * @param {Number} d distance
     * @param {Array} color color array
     * @param {Number} alpha alpha value
     * @param {Boolean} sym symmetry
     */
    AddShapeToTable(id, h, k, l, d, color, alpha, sym) {
        let innerHTML = "\
            <td id='" + this._name + "_shape_no' style='display:none'>" + id + "</td>\
            <td id='" + this._name + "_shape_no_" + id +"' style='display:none'></td>\
            <td class='cryUI_Big_Td_With_Margin cryUI_Text_Center' id='" + this._name + "_shape_h'>" + h + "</td>\
            <td class='cryUI_Big_Td_With_Margin cryUI_Text_Center' id='" + this._name + "_shape_k'>" + k + "</td>\
            <td class='cryUI_Big_Td_With_Margin cryUI_Text_Center' id='" + this._name + "_shape_l'>" + l + "</td>\
            <td class='cryUI_Big_Td_With_Margin cryUI_Text_Center' id='" + this._name + "_shape_distance'>" + d + "</td>\
            ";
        /*
        <td class='cryUI_Big_Td_With_Margin cryUI_Text_Center' id='" + this._name + "_shape_color'></td>\
        <td class='cryUI_Big_Td_With_Margin cryUI_Text_Center' id='" + this._name + "_shape_alpha' style='display:none'>" + alpha + "</td>\
        <td class='cryUI_Big_Td_With_Margin cryUI_Text_Center'><input type='checkbox' id='" + this._name + "_shape_sym' checked='" + sym + "'></td>\
        */

       
        this._shapeTable.appTable(innerHTML, true);
         /*
        $("#" + this._name + "_shape_no_" + id).parent().find("#" + this._name + "_shape_color").css("background-color", '#' + crystalVariable.HTMLColorRGB(color));
        */

        $(this._shapeTable.getAllRow()).last().on("click", function () {
            crystalEditDataDialog.I.UpdateSelect();
        });
    }

    /**
     * 렌더러에 새로운 원자를 추가한다.
     *
     * @param {String} atom_name 원자명
     * @param {String} label_name 라벨
     * @param {Number} x x좌표
     * @param {Number} y y좌표
     * @param {Number} z z좌표
     * @param {Number} Occ Occ
     * @param {Number} v v
     * @memberof crystalEditDataDialog
     */
    AddAtomToRenderer(id, label_name, x, y, z, Occ, v) {
        let csManager = crystalEditDataDialog.I._app._csManager;

        let newAtom = new CAtom();
        newAtom._position.set(x, y, z);


        newAtom._id = id;
        newAtom._label = label_name;

        if (!csManager._cs) {
            csManager._cs = new CStructure();
        }
        csManager._cs.addAtom(newAtom);
        csManager._cs._boundary.set(new Vector3(0,0,0), new Vector3(1,1,1));
        csManager._cs.generate(crystalEditDataDialog.I._app.GetSymmetryIdxList());

        renderer._scene.add(csManager._cs._groupMesh);

        return newAtom._id;
    }

    /**
     * 원자를 생성한다.
     * @param {Number} idx 원자 인덱스
     * @param {Number} id 원자 아이디
     * @param {String} label 라벨
     * @param {Number} x x 좌표
     * @param {Number} y y 좌표
     * @param {Number} z z 좌표
     * @param {Number} occ occ
     * @param {Array} su_arr su xyz
     * @param {String} anisoType ansiotropic 타입
     * @param {Array} u_arr anisotropic U / anisotropic Beta
     * @param {String} isoType isotropic 타입
     * @param {Number} u u / b
     * @param {Array} color color array
     * 
     * @returns {CAtom} 생성된 원자
     */
    createAtom(idx, id, label, x, y, z, occ, su_arr, anisoType, u_arr, isoType, u, color) {
        let newAtom = new CAtom();
        newAtom._position.set(x, y, z);

        newAtom._idx = idx;
        newAtom._id = id;
        newAtom._label = label;

        newAtom._occ = occ;

        newAtom._su = su_arr;

        newAtom._anisotype = anisoType;

        if(anisoType == 0)
            newAtom._anisoU = u_arr;
        else if(anisoType == 1)
            newAtom._anisoBeta = u_arr;

        newAtom._isotype = isoType;

        if(isoType == 0)
            newAtom._isoU = u;
        else if(isoType == 1)
            newAtom._isoB = u;

        newAtom._color = color;

        return newAtom;
    }

    /**
     * CStructure generate
     * */
    generateStructure() {

        let csManager = crystalEditDataDialog.I._app._csManager;

        crystalEditDataDialog.I._app._3dRender.Clear();

        // boundary input 값 가져와서 설정하기
        let dlgBoundary = crystalEditDataDialog.I._app._dlgBoundarySetting;

        let minX = parseFloat($(dlgBoundary._input_min_x).val());
        let minY = parseFloat($(dlgBoundary._input_min_y).val());
        let minZ = parseFloat($(dlgBoundary._input_min_z).val());
        let maxX = parseFloat($(dlgBoundary._input_max_x).val());
        let maxY = parseFloat($(dlgBoundary._input_max_y).val());
        let maxZ = parseFloat($(dlgBoundary._input_max_z).val());

        csManager._cs._boundary.set(new Vector3(minX, minY, minZ), new Vector3(maxX, maxY, maxZ));
        csManager._cs.generate();

        crystalEditBondDialog.I._app.UpdateRenderOptions();
        crystalEditBondDialog.I._app.UpdateStructureProperty();

        crystalEditDataDialog.I._app._3dRender._renderer._scene.children.pop();
        crystalEditDataDialog.I._app._3dRender._renderer._scene.add(csManager._cs._groupMesh);
    }

    /**
     * 주어진 크기의 CStructure를 생성한다.
     *
     * @param {Number} a a angle
     * @param {Number} b b angle
     * @param {Number} c c angle
     * @memberof crystalEditDataDialog
     */
    SetCStrucre(a, b, c) {

        let csManager = crystalEditDataDialog.I._app._csManager;

        if (crystalRender._geomRenderer) {
            let cs = csManager._cs;

            if (!cs) {
                csManager._cs = new CStructure();
                cs = csManager._cs;
            }

            cs._unicell._axis.setAngle(a, b, c);
        }

    }

    /**
     * 현재 탭의 인덱스를 반환한다.
     *
     * @return {Number} 현재 탭 인덱스 
     * @memberof crystalEditDataDialog
     */
    GetActiveTabIndex() {
        return $(this._tabsEdit).tabs("option", "active");
    }

    UpdateSelect() {
        let tabIdx = this.GetActiveTabIndex();

        if (tabIdx === 1) {
            let selectedSystem = this._system_table.getSelected();
            let selectedSpaceGroup = this._space_group_table.getSelected();
            let selectedSetting = this._setting_table.getSelected();

            if (selectedSystem && selectedSystem.length === 1) {
                rayLog(3, selectedSystem);
            }

            if (selectedSpaceGroup && selectedSpaceGroup.length === 1) {
                rayLog(3, selectedSpaceGroup);
            }

            if (selectedSetting && selectedSetting.length === 1) {
                rayLog(3, selectedSetting);
            }
        }
        else if (tabIdx === 2) {
            let selected = this._atomTable.getSelected();

            if (selected.length === 1) {
                rayLog(3, selected);
                this.DisableInput(false);
                let tokens = selected[0].innerText.split("\t");
                let idx = parseInt($(selected[0]).find("#" + this._name + "_atom_idx").html());
                let catom = this._app._csManager._cs.getAtomByIdx(idx);
                
                $("#" + this._name + "_tr_no").val(tokens[0]);
                $("#" + this._name + "_atom_symbol").val(tokens[1]);
                $("#" + this._name + "_atom_label").val(tokens[2]);

                $("#" + this._name + "_atom_pos_x").val(tokens[3]);
                $("#" + this._name + "_atom_pos_y").val(tokens[4]);
                $("#" + this._name + "_atom_pos_z").val(tokens[5]);
                $("#" + this._name + "_atom_occ").val(tokens[6]);
                $("#" + this._name + "_atom_u").val(tokens[7]);

                /**
                 * Anisotropic, Isotropic 메뉴 dropdown과 input enable, disable control
                 */
                this.SetInputByCAtom(catom);
            }
            else {
                this.DisableInput(true);
            }
        }
        else if (tabIdx === 3) {
            let selected = this._shapeTable.getSelected();

            if (selected.length === 1) {
                let id = parseInt($(selected[0]).find("#" + this._name + "_shape_no").html());
                let plane = this._app._csManager._cs.getPlaneById(id)[0];

                $(this._input_h).val(plane._h);
                $(this._input_k).val(plane._k);
                $(this._input_l).val(plane._l);
                $(this._input_d).val(plane._d);

                /*
                $(this._input_color_background).css("background-color", "rgb(" + plane._color[0] * 255 + "," + plane._color[1] * 255 + "," + plane._color[2] * 255 + ")");
                $(this._input_color_background).val(crystalVariable.HTMLColorRGB([plane._color[0], plane._color[1], plane._color[2]]));
                $(this._input_alpha_background).val(plane._color[3]);
                */

                plane.setMillerIndices(crystalEditDataDialog.I._app._csManager._cs.getLatticeAxis(), plane._h, plane._k, plane._l, plane._d);
            }
        }
    }

    /**
     * 입력값에 맞게 atom 업데이트
     * */
    UpdateSelectedAtomByInput() {
        let selected = this._atomTable.getSelected();

        
        if (selected.length === 1) {
            
            let idx = parseInt($(selected[0]).find("#" + this._name + "_atom_idx").html());

            // 일단 선택된 녀석으로 입력란을 업데이트한다.


            let cs_atom = this._app._csManager._cs.getAtomByIdx(idx);

            this.SetCAtomByInput(cs_atom);
            this.UpdateSelectedAtomTableRow(selected[0], cs_atom);  // table row 업데이트도 수행한다.
            
        }
    }

    /**
     * 입력값에 맞게 crystal shape 업데이트
     * */
    UpdateSelectedShapeByInput() {
        let selected = this._shapeTable.getSelected();

        if (selected.length === 1) {
            let id = parseInt($(selected[0]).find("#" + this._name + "_shape_no").html());
            let plane = crystalEditDataDialog.I._app._csManager._cs.getPlaneById(id)[0];

            this.SetPlaneByInput(plane);
            this.UpdateSelectedShapeTableRow(selected[0], plane);
        }
    }

    

    /**
     * 선택된 row에 해당하는 catom에 맞는 입력란으로 변경한다.
     * @param {CAtom} catom
     */
    UpdateInputUI(catom) {

        if (catom._anisotype === -1) {
            // 입력란 disable
            this.DisableAnisotropicInput(true);
            $(this._selectAnisotropic).val("none");
            $(this._selectAnisotropic).selectmenu("refresh");
        }
        else if (catom._anisotype === 0) {
            this.DisableAnisotropicInput(false);
            $(this._selectAnisotropic).val("u");
            $(this._selectAnisotropic).selectmenu("refresh");

        }
        else if (catom._anisotype === 1) {
            this.DisableAnisotropicInput(false);
            $(this._selectAnisotropic).val("beta");
            $(this._selectAnisotropic).selectmenu("refresh");
        }

        if (catom._isotype === 0) {
            $(this._selectIsotropic).val("b");
            $(this._selectIsotropic).selectmenu("refresh");
        }
        else if (catom._isotype === 1) {
            $(this._selectIsotropic).val("u");
            $(this._selectIsotropic).selectmenu("refresh");
        }
    }

    /**
     * 선택된 row의 정보를 catom 데이터를 바탕으로 업데이트한다.
     * @param {HTMLElement} selectedAtomRow 선택된 atom row
     * @param {CAtom} catom catom
     */
    UpdateSelectedAtomTableRow(selectedAtomRow, catom) {
        $(selectedAtomRow).find("#" + this._name + "_atom_name").html(AtomDef.GetDefWithNumber(catom._id)._atom_id);
        $(selectedAtomRow).find("#" + this._name + "_label_name").html(catom._label);
        $(selectedAtomRow).find("#" + this._name + "_pos_x").html(catom._position._x);
        $(selectedAtomRow).find("#" + this._name + "_pos_y").html(catom._position._y);
        $(selectedAtomRow).find("#" + this._name + "_pos_z").html(catom._position._z);
        $(selectedAtomRow).find("#" + this._name + "_occ").html(catom._occ);
        
        if (catom._isotype === 0)
            $(selectedAtomRow).find("#" + this._name + "_v").html(catom._isoU);
        else if (catom._isotype === 1)
            $(selectedAtomRow).find("#" + this._name + "_v").html(catom._isoB);
    }

    /**
     * 선택된 row의 정보를 plane 데이터를 바탕으로 업데이트한다.
     * @param {HTMLElement} selectedPlaneRow 선택된 plane row
     * @param {Plane} plane plane
     */
    UpdateSelectedShapeTableRow(selectedPlaneRow, plane) {
        $(selectedPlaneRow).find("#" + this._name + "_shape_h").html(plane._h);
        $(selectedPlaneRow).find("#" + this._name + "_shape_k").html(plane._k);
        $(selectedPlaneRow).find("#" + this._name + "_shape_l").html(plane._l);
        $(selectedPlaneRow).find("#" + this._name + "_shape_distance").html(plane._d);
        /*
        $(selectedPlaneRow).find("#" + this._name + "_shape_color").css("background-color", "rgb(" + plane._color[0] * 255 + "," + plane._color[1] * 255 + "," + plane._color[2] * 255 + ")");
        $(selectedPlaneRow).find("#" + this._name + "_shape_alpha").html(plane._color[3]);
        */
    }

    /**
     * 입력값을 바탕으로 갱신한 variable 변수를 통해 catom을 설정한다.
     * @param {CAtom} catom 설정할 catom
     */
    SetCAtomByInput(catom) {
        this.UpdateVariable();
        catom._id = this._variable["id"];
        catom._label = this._variable["label"];
        catom._position._x = this._variable["x"];
        catom._position._y = this._variable["y"];
        catom._position._z = this._variable["z"];
        catom._su = [this._variable["su_x"], this._variable["su_y"], this._variable["su_z"]];
        catom._occ = this._variable["occ"];
        catom._anisotype = this._variable["anisoType"];
        catom._isotype = this._variable["isoType"];
        catom._color = this._variable["catomColor"];

        if (catom._anisotype === 0) {
            catom._anisoU = [this._variable["u11"], this._variable["u22"], this._variable["u33"],
                this._variable["u12"], this._variable["u13"], this._variable["u23"]];
        }
        else if (catom._anisotype === 1) {
            catom._anisoBeta = [this._variable["u11"], this._variable["u22"], this._variable["u33"],
                this._variable["u12"], this._variable["u13"], this._variable["u23"]];
        }

        if (catom._isotype === 0) {
            catom._isoU = this._variable["u"];
        }
        else if (catom._isotype === 1) {
            catom._isoB = this._variable["u"];
        }
    }

    /**
     * 입력값을 바탕으로 갱신한 variable 변수를 통해 plane을 설정한다.
     * @param {Plane} plane 설정할 plane
     */
    SetPlaneByInput(plane) {
        this.UpdateVariable();

        plane._h = this._variable["h"];
        plane._k = this._variable["k"];
        plane._l = this._variable["l"];
        plane._d = this._variable["d"];
        plane._color = [this._variable["shapeColor"][0], this._variable["shapeColor"][1], this._variable["shapeColor"][2]];

        let lattice_axis = crystalEditDataDialog.I._app._csManager._cs.getLatticeAxis();
        plane.setMillerIndices(lattice_axis, plane._h, plane._k, plane._l, plane._d);
    }

    /**
     * 주어진 catom을 통해 입력란의 정보를 설정한다.
     * 
     * @param {CAtom} catom 
     */
    SetInputByCAtom(catom) {
        $(this._input_symbol).val(AtomDef.GetDefWithNumber(catom._id)._atom_id);
        $(this._input_label).val(catom._label);
        $(this._input_pos_x).val(catom._position._x);
        $(this._input_pos_y).val(catom._position._y);
        $(this._input_pos_z).val(catom._position._z);
        $(this._input_occ).val(catom._occ);
        $(this._input_su_x).val(catom._su[0]);
        $(this._input_su_y).val(catom._su[1]);
        $(this._input_su_z).val(catom._su[2]);
        $(this._input_catom_color).val(crystalVariable.HTMLColorRGB(catom._color));  // colorpicker 업데이트하는 방법 pv에서 찾아보기
        $(this._input_catom_color).css("background-color", "rgb(" + catom._color[0] * 255 + "," + catom._color[1] * 255 + "," + catom._color[2] * 255 + ")");


        if (catom._anisotype === -1) {

            $(this._selectAnisotropic).val("none");
            $(this._selectAnisotropic).selectmenu("refresh");

            $(this._input_U11).val(0);
            $(this._input_U22).val(0);
            $(this._input_U33).val(0);
            $(this._input_U12).val(0);  
            $(this._input_U13).val(0);
            $(this._input_U23).val(0);
            this.DisableAnisotropicInput(true);

        }
        else if (catom._anisotype === 0) {
            if (catom._anisoU.length === 6) {

                $(this._selectAnisotropic).val("u");
                $(this._selectAnisotropic).selectmenu("refresh");

                this.DisableAnisotropicInput(false);

                $(this._input_U11).val(catom._anisoU[0]);
                $(this._input_U22).val(catom._anisoU[1]);
                $(this._input_U33).val(catom._anisoU[2]);
                $(this._input_U12).val(catom._anisoU[3]);
                $(this._input_U13).val(catom._anisoU[4]);
                $(this._input_U23).val(catom._anisoU[5]);
            }
            else {
                rayLog(3, "CAtom AnisoU length is not 6");
            }
        }
        else if (catom._anisotype === 1) {
            if (catom._anisoBeta.length === 6) {

                $(this._selectAnisotropic).val("beta");
                $(this._selectAnisotropic).selectmenu("refresh");

                this.DisableAnisotropicInput(false);    

                $(this._input_U11).val(catom._anisoBeta[0]);
                $(this._input_U22).val(catom._anisoBeta[1]);
                $(this._input_U33).val(catom._anisoBeta[2]);
                $(this._input_U12).val(catom._anisoBeta[3]);
                $(this._input_U13).val(catom._anisoBeta[4]);
                $(this._input_U23).val(catom._anisoBeta[5]);
            }
            else {
                rayLog(3, "CAtom AnisoBeta length is not 6");
            }
        }

        if (catom._isotype === 0) {
            $(this._selectIsotropic).val("u");
            $(this._selectIsotropic).selectmenu("refresh");
            $(this._input_u).val(catom._isoU);

  
        }
        else if (catom._isotype === 1) {
            $(this._selectIsotropic).val("b");
            $(this._selectIsotropic).selectmenu("refresh");
            $(this._input_u).val(catom._isoB);
        }
        else {
            rayLog(3, "CAtom Isotropic Type Error");
        }

    }

    /**
     * 입력 데이터 값을 관리한다.
     * */
    UpdateVariable() {
        this._variable = {};

        this._variable["name"] = $(this._input_cs_name).val();
        this._variable["pos_x"] = parseFloat($(this._input_cs_pos_x).val());
        this._variable["pos_y"] = parseFloat($(this._input_cs_pos_y).val());
        this._variable["pos_z"] = parseFloat($(this._input_cs_pos_z).val());
        this._variable["dir_x"] = parseFloat($(this._input_cs_dir_x).val());
        this._variable["dir_y"] = parseFloat($(this._input_cs_dir_y).val());
        this._variable["dir_z"] = parseFloat($(this._input_cs_dir_z).val());


        this._variable["a"] = parseFloat($(this._input_a_length).val());
        this._variable["b"] = parseFloat($(this._input_b_length).val());
        this._variable["c"] = parseFloat($(this._input_c_length).val());
        this._variable["abc"] = [
            parseFloat($(crystalEditDataDialog.I._input_alpha).val()),
            parseFloat($(crystalEditDataDialog.I._input_beta).val()),
            parseFloat($(crystalEditDataDialog.I._input_gamma).val())
        ];

        this._variable["atom"] = $("#" + this._name + "_atom_symbol").val();
        if (this._variable["atom"] === "")
            this._variable["atom"] = "H";


        this._variable["id"] = AtomDef.GetDefWithID(this._variable["atom"])._atom_number;
        this._variable["label"] = $(this._input_label).val();
        this._variable["x"] = parseFloat($(this._input_pos_x).val());
        this._variable["y"] = parseFloat($(this._input_pos_y).val());
        this._variable["z"] = parseFloat($(this._input_pos_z).val());
        this._variable["occ"] = parseFloat($(this._input_occ).val());
        this._variable["u"] = parseFloat($(this._input_u).val());

        this._variable["su_x"] = parseFloat($(this._input_su_x).val());
        this._variable["su_y"] = parseFloat($(this._input_su_y).val());
        this._variable["su_z"] = parseFloat($(this._input_su_z).val());

        this._variable["u11"] = parseFloat($(this._input_U11).val());
        this._variable["u22"] = parseFloat($(this._input_U22).val());
        this._variable["u33"] = parseFloat($(this._input_U33).val());
        this._variable["u12"] = parseFloat($(this._input_U12).val());
        this._variable["u13"] = parseFloat($(this._input_U13).val());
        this._variable["u23"] = parseFloat($(this._input_U23).val());

        this._variable["h"] = parseFloat($(this._input_h).val());
        this._variable["k"] = parseFloat($(this._input_k).val());
        this._variable["l"] = parseFloat($(this._input_l).val());

        this._variable["d"] = parseFloat($(this._input_d).val());
        this._variable["shapeColor"] = this._selectedShapeColor;
        // this._variable["alpha"] = parseFloat($(this._input_alpha_background).val());

        if ($(this._input_catom_color).val())
            this._variable["catomColor"] = crystalVariable.HexStringtoColor($(this._input_catom_color).val());
        else
            this._variable["catomColor"] = AtomDef.GetDefWithNumber(1)._color;

        let anisoStr = $(this._selectAnisotropic).val();
        let isoStr = $(this._selectIsotropic).val();
        
        switch (anisoStr) {
            case "none":
                this._variable["anisoType"] = -1;
                break;

            case "u":
                this._variable["anisoType"] = 0;
                break;

            case "beta":
                this._variable["anisoType"] = 1;
                break;
        }

        switch (isoStr) {
            case "u":
                this._variable["isoType"] = 0;
                    break;

            case "b":
                this._variable["isoType"] = 1;
                break;
        }

    }

    /**
     * 선택된 atom row가 바뀌면 입력란을 업데이트한다.
     * */
    ChangeSelectedAtom() {
        let selected = this._atomTable.getSelected();

        if (selected.length === 1) {
            this.UpdateSelectedAtomByInput();
            this._bModified = true;
        }
    }


    /**
     * 선택된 shape row가 바뀌면 입력란을 업데이트한다.
     * */
    ChangeSelectedShape() {
        let selected = this._shapeTable.getSelected();

        if (selected.length === 1) {
            this.UpdateSelectedShapeByInput();
        }
    }

    /**
     * 변경된 cstructure의 내용을 적용한다.
     * */
    UpdateRenderer() {
        crystalEditDataDialog.I.generateStructure();
    }

    /**
     * CStructure 데이터를 통해 테이블을 갱신한다.
     * @param {CStructure} cs
     */
    UpdateTableByCS(cs) {
        for (let i = 0; i<cs._atoms.length; ++i) {
            this.AddAtomToTable(cs.assignAtomIdx(), cs._atoms[i]._id, AtomDef.GetDefWithNumber(cs._atoms[i]._id)._id, cs._atoms[i]._label, cs._atoms[i]._position._x, cs._atoms[i]._position._y, cs._atoms[i]._position._z, 0, 0);
        }

        for (let i = 0; i < cs._crystalPlanes.length; ++i) {
            this.AddShapeToTable(cs.assignShapeId(), cs._crystalPlanes[i]._h, cs._crystalPlanes[i]._k, cs._crystalPlanes[i]._l, cs._crystalPlanes[i]._d, cs._crystalPlanes[i]._color, 100, true);
        }
    }

    UpdateUnitcellByCS(cs) {

        $(this._input_a_length).val(cs._unitcell._axis._la);
        $(this._input_b_length).val(cs._unitcell._axis._lb);
        $(this._input_c_length).val(cs._unitcell._axis._lc);

        $(this._input_alpha).val(cs._unitcell._axis._a);
        $(this._input_beta).val(cs._unitcell._axis._b);
        $(this._input_gamma).val(cs._unitcell._axis._c);
    }

    /**
     * 입력창 비활성화
     * @param {Boolean} bDisable 비활성화 여부
     */
    DisableInput(bDisable = true) {
        $(this._btnSymbol).attr("disabled", bDisable);
        $(this._input_no).attr("disabled", bDisable);
        $(this._input_pos_x).attr("disabled", bDisable);
        $(this._input_pos_y).attr("disabled", bDisable);
        $(this._input_pos_z).attr("disabled", bDisable);
        // $(this._input_symbol).attr("disabled", bDisable);
        $(this._input_label).attr("disabled", bDisable);
        $(this._input_occ).attr("disabled", bDisable);
        $(this._input_u).attr("disabled", bDisable);
        $(this._input_charge).attr("disabled", bDisable);
        $(this._input_su_x).attr("disabled", bDisable);
        $(this._input_su_y).attr("disabled", bDisable);
        $(this._input_su_z).attr("disabled", bDisable);
        $(this._input_catom_color).attr("disabled", bDisable);

        if (bDisable) {
            $(this._input_symbol).val("");
            $(this._input_no).val("");
            $(this._input_catom_color).val("");
        }
    }

    /**
     * Anisotropic 입력창 비활성화
     * @param {Boolean} bDisable 비활성화 여부
     */
    DisableAnisotropicInput(bDisable = true) {
        $(this._input_U11).attr("disabled", bDisable);
        $(this._input_U22).attr("disabled", bDisable);
        $(this._input_U33).attr("disabled", bDisable);
        $(this._input_U12).attr("disabled", bDisable);
        $(this._input_U13).attr("disabled", bDisable);
        $(this._input_U23).attr("disabled", bDisable);
    }

    /**
     * shape color 지정
     * @param {Array} col color array
     */
    OnChangeColorBackground(col) {
        this._selectedShapeColor = col;

        Array.from($(this._shapeTable.getAllRow())).forEach(function (element) {
            rayLog(3, element);
            let idx = parseInt($(element).find("#cryapp_shape_no")[0].innerText);
            let plane = crystalEditDataDialog.I._app._csManager._cs._crystalPlanes[idx];
            plane._color = [crystalEditDataDialog.I._selectedShapeColor[0], crystalEditDataDialog.I._selectedShapeColor[1], crystalEditDataDialog.I._selectedShapeColor[2], crystalEditDataDialog.I._selectedShapeColor[3]];
        });
    }

    /**
     * atom color 지정
     * @param {Array} col shape array
     */
    OnChangeCAtomColor(col) {
        this._selectedCatomColor = col;
    }

    UpdateCrystalColor() {
        let plane = this._app._csManager._cs._crystalPlanes[0];
        if (plane) {
            $(this._input_color_background).css("background-color", "rgb(" + plane._color[0] * 255 + "," + plane._color[1] * 255 + "," + plane._color[2] * 255 + ")");
            $(this._input_color_background).val(crystalVariable.HTMLColorRGB([plane._color[0], plane._color[1], plane._color[2]]));
        }
    }
}