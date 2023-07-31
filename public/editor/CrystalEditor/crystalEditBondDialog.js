import { crystalTable } from "./crystalTable.js";
import { CBond } from "../CoreCrystal/CBond.js";
import { CStructure } from "../CoreCrystal/CStructure.js";
import { Vector3 } from '../Math/Vector3.js';
import { AtomDef } from '../Renderer/AtomDef.js';
import { rayLog } from '../Renderer/log.js';
import { cryst } from './crystalVariable.js';

/**
 * Bond 편집 다이얼로그
 * */
export class crystalEditBondDialog {

    /**
     * 생성자
     * @param {String} name 다른 앱과 구분하기 위한 이름
     * @param {crystalEditor} app 상위 앱 객체
     * @param {HTMLElement} div_elem crystalEditBondDialog가 부착될 html element
     */
    constructor(name, app, div_elem) {

        this._name = name;

        this._app = app;

        this._div = div_elem;

        crystalEditBondDialog.I = this;

        this._div.innerHTML = this._appElementHTML(this._name);

        this._bModified = false;

        this._div_bondTable_area = document.getElementById(name + "_bonds_table_area");
        this._div_bondTable = document.getElementById(name + "_bonds_table");
        this._bondTable = new crystalTable(this._name, this._app, this._div_bondTable, "bondTable");
        this._bondTable.createHeader("\
            <tr>\
                <th class='cryUI_Big_Td'>No.</th>\
                <th class='cryUI_Big_Td'>Atom 1</th>\
                <th class='cryUI_Big_Td'>Atom 2</th>\
                <th class='cryUI_Normal_Td'>Min.</th>\
                <th class='cryUI_Normal_Td'>Max.</th>\
                <th class='cryUI_Normal_Td'>Bound.</th>\
                <th class='cryUI_Normal_Td'>Poly.</th>\
            </tr>");


        this._dialog = $(this._div).dialog({
            autoOpen: false,
            maxHeight: 340,
            height: 340,
            maxWidth: 610,
            width: 610,
            modal: true,
            closeOnEscape: true,
            resizable: false,
            title: "Bond",
            buttons: {
                "OK": function () {
                    if (crystalEditBondDialog.I._bModified) {
                        crystalEditBondDialog.I._app._bModified = true;
                        crystalEditBondDialog.I._app._dlgEditVectors.RestoreAddedVectorFromCS();
                        crystalEditBondDialog.I._app._csManager.AddUndo();
                    }
                    crystalEditBondDialog.I.OnApply();
                    crystalEditBondDialog.I.CloseDialog();
                },

                "Cancel": function () {
                    crystalEditBondDialog.I.CloseDialog();
                },
                /*
                "Apply": function () {
                    crystalEditBondDialog.I.OnApply();
                },
                */
            },

            close: function () {
                crystalEditBondDialog.I._show = false;
                crystalEditBondDialog.I._app.UpdateUI();
            }
        });


        this._btnNewBond = document.getElementById(name + "_new_bond_btn");
        this._btnDeleteBond = document.getElementById(name + "_delete_bond_btn");
        this._btnClearBond = document.getElementById(name + "_clear_bond_btn");

        this._inputMinLength = document.getElementById(name + "_min_length");
        this._inputMaxLength = document.getElementById(name + "_max_length");

        this._selectAtom1 = document.getElementById(name + "_select_atom1");
        this._selectAtom2 = document.getElementById(name + "_select_atom2");

        $(this._inputMinLength).on("input", function () {

            crystalEditBondDialog.I.ChangeSelected();
        });
        $(this._inputMaxLength).on("input", function () {

            crystalEditBondDialog.I.ChangeSelected();
        });
        $(this._selectAtom1).change(function () {

            crystalEditBondDialog.I.ChangeSelected();
        });
        $(this._selectAtom2).change(function () {

            crystalEditBondDialog.I.ChangeSelected();
        });

        $(this._btnNewBond).button();
        $(this._btnDeleteBond).button();
        $(this._btnClearBond).button();

        $(this._btnNewBond).click(function (event) {

            crystalEditBondDialog.I._bModified = true;

            let atom1Idx = $(crystalEditBondDialog.I._selectAtom1)[0].selectedIndex;
            let atom2Idx = $(crystalEditBondDialog.I._selectAtom2)[0].selectedIndex;

            let atom1 = crystalEditBondDialog.I._app._csManager._cs._atoms[atom1Idx];
            let atom2 = crystalEditBondDialog.I._app._csManager._cs._atoms[atom2Idx];

            let min = parseFloat($(crystalEditBondDialog.I._inputMinLength).val());
            let max = parseFloat($(crystalEditBondDialog.I._inputMaxLength).val());

            let bound = 2;
            let is_poly = true;


            if (atom1 && atom2) {
                let bond = crystalEditBondDialog.I.createBond(crystalEditBondDialog.I._app._csManager._cs.assignBondIdx(), atom1, atom2, min, max);

                crystalEditBondDialog.I.AddBondToTable(bond._idx, atom1Idx, atom2Idx, min, max, bound, is_poly);

                if (!crystalEditBondDialog.I._app._csManager._cs) {
                    crystalEditBondDialog.I._app._csManager._cs = new CStructure();
                    crystalEditBondDialog.I._app._csManager._cs._boundary.set(new Vector3(0, 0, 0), new Vector3(1, 1, 1));
                }
                crystalEditBondDialog.I._app._csManager._cs.addBond(bond);

                crystalEditBondDialog.I.generateStructure();            // 렌더러 갱신

                crystalEditBondDialog.I._bondTable.initSelect();
                crystalEditBondDialog.I._bondTable.selectLast();

                crystalEditBondDialog.I.UpdateSelect();
            }
            else {
                alert("Bond can not be created");
            }

        });

        $(this._btnDeleteBond).click(function (event) {

            crystalEditBondDialog.I._bModified = true;

            let bondRows = crystalEditBondDialog.I._bondTable.getSelected();

            for (let idx in bondRows) {
                idx = parseInt(idx);
                if (isNaN(idx))
                    break;

                // bondRows[idx]에서 atom1과 atom2를 가져오기..
                let atom1 = bondRows[idx].getElementsByClassName(crystalEditBondDialog.I._name + "_edit_bond_table_atom1")[0].innerHTML;
                let atom2 = bondRows[idx].getElementsByClassName(crystalEditBondDialog.I._name + "_edit_bond_table_atom2")[0].innerHTML;

                crystalEditBondDialog.I._app._csManager._cs.removeBond(atom1, atom2);    // bond 삭제

                crystalEditBondDialog.I._bondTable.deleteSelected();    // 삭제

                crystalEditBondDialog.I.generateStructure();            // 렌더러 갱신
            }

            if (crystalEditBondDialog.I._bondTable.getAllRow().length === 0)
                crystalEditBondDialog.I.DisableInput(true);

            crystalEditBondDialog.I._bondTable.updateTable();
        });

        $(this._btnClearBond).click(function (event) {

            crystalEditBondDialog.I._bModified = true;

            crystalEditBondDialog.I._app._dlgEditBondConfirm.ShowDialog();
        });

        this._div_structure_select = document.getElementById(this._name + "_bonds_structure_select");
        this._div_phase = document.getElementById(this._name + "_bonds_phase");
        this._div_structure_dropdown = document.getElementById(this._name + "_bonds_structure_dropdown");
        this._div_search_area = document.getElementById(this._name + "_bonds_search_area");
        this._div_search_mode = document.getElementById(this._name + "_bonds_search_mode");
        this._div_boundary_mode = document.getElementById(this._name + "_bonds_boundary_mode");
        this._div_search_value = document.getElementById(this._name + "_bonds_search_value");
        this._div_table_area = document.getElementById(this._name + "_bonds_table_area");
        this._div_table = document.getElementById(this._name + "_bonds_table");
        this._div_modify_table = document.getElementById(this._name + "_bonds_modify_table");
        $(this._div_table).css("table-layout", "fixed");
        $(this._div_table).css("overflow", "auto");

        this._div_search_mode_0 = document.getElementById(this._name + "_check_search_mode_0");
        this._div_search_mode_1 = document.getElementById(this._name + "_check_search_mode_1");
        this._div_search_mode_2 = document.getElementById(this._name + "_check_search_mode_2");

        this._div_boundary_mode_0 = document.getElementById(this._name + "_check_boundary_mode_0");
        this._div_boundary_mode_1 = document.getElementById(this._name + "_check_boundary_mode_1");
        this._div_boundary_mode_2 = document.getElementById(this._name + "_check_boundary_mode_2");

        $('input[name="search_mode"]').change(function () {
            $('input[name="search_mode"]').each(function () {
                if ($(this).prop('checked'))
                    cryst.Mode.Search = parseInt($(this).val());                    
            });
        });

        $('input[name="boundary_mode"]').change(function () {
            $('input[name="boundary_mode"]').each(function () {
                if ($(this).prop('checked')) {
                    cryst.Mode.Boundary = parseInt($(this).val());
                    crystalEditBondDialog.I._app._csManager._cs.setClipOption(cryst.Mode.Boundary);
                }
            });
        });

        $(this._div_search_mode_0).prop('checked', true);
        $(this._div_boundary_mode_1).prop('checked', true);



        this.DisableInput(true);


        $(this._selectAtom1).on("change", function () {
            crystalEditBondDialog.I._bModified = true;
        });

        $(this._selectAtom2).on("change", function () {
            crystalEditBondDialog.I._bModified = true;
        });

        $(this._inputMaxLength).on("input", function () {
            crystalEditBondDialog.I._bModified = true;
        });

        $(this._inputMinLength).on("input", function () {
            crystalEditBondDialog.I._bModified = true;
        });
    }

    /**
     * EditBondDialog에 대한 html element를 작성한다.
     * @param {String} name 다른 앱과 구분하기 위한 이름
     * @returns {String} HTML 문자열
     */
    _appElementHTML(name) {
        let ihtml = [];
        let idx = 0;

        ihtml[idx] = "<div id='" + name + "_edit_bond_dialog'>";
        idx++;

        /*
        ihtml[idx] = "<div class='cryUI_Bonds_Structure_Select' id='" + name + "_bonds_structure_select'>";
        idx++;
        ihtml[idx] = "<div class='cryUI_Bonds_Phase' id='"+name+"_bonds_phase'><tr><td>Phase:</td><td><input class='cryUI_Normal_Td' type='number'></td></tr></div>";
        idx++;
        ihtml[idx] = "<div class='cryUI_Bonds_Structure_Dropdown' id='" + name + "_bonds_structure_dropdown'><td>dropdown</td></div>";
        idx++;
        ihtml[idx] = "</div>";
        idx++;
        */

        /*
        ihtml[idx] = "<div class='cryUI_Bonds_Search_Area' id='" + name + "_bonds_search_area'>";
        idx++;

        ihtml[idx] = "<fieldset>";
        idx++;
        ihtml[idx] = "<legend>Search bonds and atoms</legend>";
        idx++;


        ihtml[idx] = "<div class='cryUI_Bonds_Search_Mode' id='" + name + "_bonds_search_mode'>";
        idx++;
        ihtml[idx] = "<fieldset>";
        idx++;
        ihtml[idx] = "<legend>Search mode</legend>"
        idx++;
        ihtml[idx] = "<input type='radio' id='" + name + "_check_search_mode_0' value='0' name='search_mode'><label for='search_mode_one'>Search A2 bonded to A1</label><br>";
        idx++;
        ihtml[idx] = "<input type='radio' id='" + name + "_check_search_mode_1' value='1' name='search_mode'><label for='search_mode_two'>Search atoms bonded to A1</label><br>";
        idx++;
        ihtml[idx] = "<input type='radio' id='" + name + "_check_search_mode_2' value='2' name='search_mode'><label for='search_mode_three'>Search molecules</label>";
        idx++;
        ihtml[idx] = "</fieldset>";
        idx++;
        ihtml[idx] = "</div>";
        idx++;

        idx++;


        ihtml[idx] = "<div class='cryUI_Bonds_Boundary_Mode' id='" + name + "_bonds_binary_mode'>";
        idx++;
        ihtml[idx] = "<fieldset>";
        idx++;
        ihtml[idx] = "<legend>Boundary mode</legend>";
        idx++;
        ihtml[idx] = "<input type='radio' id='" + name + "_check_boundary_mode_0' value='0' name='boundary_mode'><label for='boundary_mode_one'>Do not search atoms beyond the boundary</label><br>";
        idx++;
        ihtml[idx] = "<input type='radio' id='" + name + "_check_boundary_mode_1' value='1' name='boundary_mode'><label for='boundary_mode_two'>Search additional atoms if A1 is included in the boundary</label><br>";
        idx++;
        ihtml[idx] = "<input type='radio' id='" + name + "_check_boundary_mode_2' value='2' name='boundary_mode'><label for='boundary_mode_three'>Search additional atoms recursively if either A1 or A2 is visible</label>";
        idx++;
        ihtml[idx] = "</fieldset></div>"
        idx++;

        ihtml[idx] = "<div class='cryUI_Bonds_Search_Value_I' id='" + name + "_bonds_search_value'>";
        idx++;
        ihtml[idx] = "<div class='cryUI_Div_Element'><input type='checkbox'> Search by Label</div ><div class='cryUI_Div_Element'><input type='checkbox'>Show polyhedra</div>";
        idx++;
        ihtml[idx] = "</div>";
        idx++;
        */
        ihtml[idx] = "<div class='cryUI_Bonds_Search_Value_II' id='" + name + "_bonds_search_value'>";
        idx++;
        ihtml[idx] = "<div class='cryUI_Div_Element'><label for='atom1'>Atom1:</label>";
        idx++;
        ihtml[idx] = "<select name='atom1' id='" + name + "_select_atom1'></select></div>";
        idx++;
        ihtml[idx] = "<div class='cryUI_Div_Element'><label for='atom2'>Atom2:</label>";
        idx++;
        ihtml[idx] = "<select name='atom2' id='" + name + "_select_atom2'></select></div>";
        idx++;
        ihtml[idx] = "<div class='cryUI_Div_Element'><label for='min_length'>Min. Length:</label>";
        idx++;
        ihtml[idx] = "<input class='cryUI_Big_Td' name='min_length' type='number' value=0 id='" + name + "_min_length'></div>";
        idx++;
        ihtml[idx] = "<div class='cryUI_Div_Element'><label for='max_length'>Max. Length:</label>";
        idx++;
        ihtml[idx] = "<input class='cryUI_Big_Td' name='max_length' type='number' value=5 id='" + name + "_max_length'></div></div>";
        idx++;

        ihtml[idx] = "</fieldset></div>";
        idx++;

        ihtml[idx] = "</div>";
        idx++;

        ihtml[idx] = "</div>";
        idx++;


        ihtml[idx] = "<div class='cryUI_Bonds_Table_Area' id='" + name + "_bonds_table_area'>";
        idx++;

        ihtml[idx] = "<div class='cryUI_Bonds_Table' id='" + name + "_bonds_table'></div>";
        idx++;

        ihtml[idx] = "<div class='cryUI_Bonds_Modify_Table' id='" + name + "_bonds_table_modify_table'>";
        idx++;

        ihtml[idx] = "<button class='cryUI_Normal_Btn_Margin_Bottom ui - button ui - widget ui - corner - all' id='" + name + "_new_bond_btn'>New</button>";
        idx++;
        ihtml[idx] = "<button class='cryUI_Normal_Btn_Margin_Bottom ui - button ui - widget ui - corner - all' id='" + name + "_delete_bond_btn'>Delete</button>";
        idx++;
        ihtml[idx] = "<button class='cryUI_Normal_Btn_Margin_Bottom ui - button ui - widget ui - corner - all' id='" + name + "_clear_bond_btn'>Clear</button>";
        idx++;

        ihtml[idx] = "</div></div>";
        idx++;

        ihtml[idx] = "</div>";
        idx++;

        return ihtml.join("");
    }

    /**
     * 테이블에 bond를 추가한다.
     * @param {Number} idx bond index
     * @param {Number} atom1Idx catom index
     * @param {Number} atom2Idx catom index
     * @param {Number} min min length
     * @param {Number} max max length
     * @param {Number} bound 
     * @param {Boolean} is_poly
     */
    AddBondToTable(idx, atom1Idx, atom2Idx, min, max, bound, is_poly) {
        let atom1 = this._app._csManager._cs._atoms[atom1Idx]._def._atom_id;
        let atom2 = this._app._csManager._cs._atoms[atom2Idx]._def._atom_id;

        let innerHTML = "\
            <td style='display:none' id='" + this._name + "_bond_idx_" + idx + "'>\
            <td class='cryUI_Big_Td " + this._name + "_edit_bond_table_atom1'>" + atom1 + "</td>\
            <td id='" + this._name + "_bond_atom1_idx' style='display:none'>" + atom1Idx + "</td>\
            <td class='cryUI_Big_Td " + this._name + "_edit_bond_table_atom2'>" + atom2 + "</td>\
            <td id='" + this._name + "_bond_atom2_idx' style='display:none'>" + atom2Idx + "</td>\
            <td class='cryUI_Normal_Td' id='" + this._name + "_bond_min_length'>" + min + "</td>\
            <td class='cryUI_Normal_Td' id='" + this._name + "_bond_max_length'>" + max + "</td>\
            <td class='cryUI_Normal_Td'>" + bound + "</td>\
            <td class='cryUI_Normal_Td'> <input type='checkbox' checked='" + is_poly + "'></td>";

        this._bondTable.appTable(innerHTML, true);
    }

    /**
     * CStructure generate
     * */
    generateStructure() {
        let renderer = crystalEditBondDialog.I._app._3dRender;
        let csManager = crystalEditBondDialog.I._app._csManager;

        renderer.Clear();
        csManager._cs.generate(crystalEditBondDialog.I._app.GetSymmetryIdxList());
        crystalEditBondDialog.I._app.UpdateStructureProperty();
        crystalEditBondDialog.I._app.UpdateRenderOptions();
        renderer._renderer._scene.children.pop();
        renderer._renderer._scene.add(csManager._cs._groupMesh);
    }

    /**
     * 결합을 생성한다.
     * @param {Number} idx bond index
     * @param {String} atom1 atom1 name
     * @param {String} atom2 atom2 name
     * @param {Number} min min length
     * @param {Number} max max length
     * @param {Number} bound
     * @param {Boolean} is_poly 
     * 
     * @returns {CBond} 생성된 결합
     */
    createBond(idx, atom1, atom2, min, max, bound, is_poly) {
        let newBond = new CBond();
        newBond.setLength(min, max);
        newBond.setAtom(atom1, atom2);
        newBond._idx = idx;

        return newBond;
    }

    /**
     * edit bond dialog를 띄운다.
     * */
    ShowDialog() {
        if (this._show)
            return;

        crystalEditBondDialog.I._app._csManager.SetPrev(crystalEditBondDialog.I._app._csManager._cs);
        this._dialog.dialog("open");
        this._show = true;
    }

    /**
     * dialog를 닫는다.
     * */
    CloseDialog() {
        this._dialog.dialog("close");
        this._show = false;
        this._bModified = false;
    }

    /**
     * 테이블 업데이트
     * */
    UpdateTable() {
        // atom 가져오기
        let cs = crystalEditBondDialog.I._app._csManager._cs;
        let atoms = cs._atoms;

        // 현재 존재하는 원자 이름들을 가져와 배열에 넣기
        let atomNameList = [];
        for (let i = 0; i < atoms.length; ++i) {
            let atomName = AtomDef.GetDefWithNumber(atoms[i]._id)._atom_id;
            atomNameList.push(atomName);
        }

        // select 모두 지우고 업데이트하기
        $(this._selectAtom1)
            .find('option')
            .remove();
        $(this._selectAtom2)
            .find('option')
            .remove();

        for (let i = 0; i < atomNameList.length; ++i) {
            $(this._selectAtom1).append('<option>' + atomNameList[i] + '</option>');
        }
        for (let i = 0; i < atomNameList.length; ++i) {
            $(this._selectAtom2).append('<option>' + atomNameList[i] + '</option>');
        }

        $(this._bondTable.getAllRow()).removeClass("ui-selected");
    }


    /**
     * 선택된 row를 바탕으로 입력란을 업데이트한다.
     * */
    UpdateSelect() {
        let selected = this._bondTable.getSelected();

        if (selected.length === 1) {
            rayLog(3, selected);
            this.DisableInput(false);
            let tokens = selected[0].innerText.split("\t");

            $(crystalEditBondDialog.I._selectAtom1).val(tokens[1]);
            $(crystalEditBondDialog.I._selectAtom2).val(tokens[2]);

            $(crystalEditBondDialog.I._inputMinLength).val(parseFloat(tokens[3]));
            $(crystalEditBondDialog.I._inputMaxLength).val(parseFloat(tokens[4]));

        }
        else {
            this.DisableInput(true);
        }
    }

    /**
     * 입력값을 바탕으로 선택된 row를 업데이트한다.
     * */
    UpdateSelectByInput() {
        let selected = this._bondTable.getSelected();

        if (selected.length === 1) {

            let idx = selected[0].innerText.split("\t")[0];

            let atom1Idx = $(crystalEditBondDialog.I._selectAtom1)[0].selectedIndex;
            let atom2Idx = $(crystalEditBondDialog.I._selectAtom2)[0].selectedIndex;

            let atom1 = this._app._csManager._cs._atoms[atom1Idx]._def._atom_id;
            let atom2 = this._app._csManager._cs._atoms[atom2Idx]._def._atom_id;

            let min = parseFloat($(crystalEditBondDialog.I._inputMinLength).val());
            let max = parseFloat($(crystalEditBondDialog.I._inputMaxLength).val());

            let innerHTML = "\
                <div class='handle'><span class='ui-icon ui-icon-carat-2-n-s'></span></div>\
                <td class='position cryUI_Normal_Td'>" + idx + "</td>\
                <td style='display:none' id='" + this._name + "_bond_idx_" + idx + "'>\
                <td class='cryUI_Big_Td " + this._name + "_edit_bond_table_atom1'>" + atom1 + "</td>\
                <td id='" + this._name + "_bond_atom1_idx' style='display:none'>" + atom1Idx + "</td>\
                <td class='cryUI_Big_Td " + this._name + "_edit_bond_table_atom2'>" + atom2 + "</td>\
                <td id='" + this._name + "_bond_atom2_idx' style='display:none'>" + atom2Idx + "</td>\
                <td class='cryUI_Normal_Td' id='" + this._name + "_bond_min_length'>" + min + "</td>\
                <td class='cryUI_Normal_Td' id='" + this._name + "_bond_max_length'>" + max + "</td>\
                <td class='cryUI_Normal_Td'></td>\
                <td class='cryUI_Normal_Td'> <input type='checkbox' checked=''></td>";

            selected[0].innerHTML = innerHTML;
        }
    }

    /**
     * CStructure를 바탕으로 테이블을 재구성한다.
     * @param {CStructure} cs 참고할 CStructure
     */
    UpdateTableByCS(cs) {
        for (let i = 0; i < cs._bonds.length; ++i) {
            this.AddBondToTable(cs._bonds[i]._idx, cs._bonds[i]._A1Idx, cs._bonds[i]._A2Idx, cs._bonds[i]._minLength, cs._bonds[i]._maxLength, 2, true);
        }
    }

    /**
     * 테이블 데이터를 바탕으로 bond를 재생성한다.
     * */
    UpdateRenderer() {
        crystalEditBondDialog.I._app._csManager._cs.clearBond();

        let dataList = crystalEditBondDialog.I._bondTable.getAllRow();
        for (let elem of dataList) {
            // let tokens = elem.innerText.split("\t");

            let atom1 = crystalEditBondDialog.I._app._csManager._cs._atoms[parseInt($(elem).find("#" + crystalEditBondDialog.I._name + "_bond_atom1_idx").html())];
            let atom2 = crystalEditBondDialog.I._app._csManager._cs._atoms[parseInt($(elem).find("#" + crystalEditBondDialog.I._name + "_bond_atom2_idx").html())];

            // let tokens = $(elem).text().replace(/\s+/g, ' ').split(' ');
            let min = parseFloat($(elem).find("#" + crystalEditBondDialog.I._name + "_bond_min_length").html());
            let max = parseFloat($(elem).find("#" + crystalEditBondDialog.I._name + "_bond_max_length").html());

            let bond = new CBond();

            if (atom1 && atom2) {
                bond.setLength(min, max);
                bond.setAtom(atom1, atom2);

                crystalEditBondDialog.I._app._csManager._cs.addBond(bond);
            } else {
                elem.remove();
            }

        }

        crystalEditBondDialog.I.generateStructure();
    }

    /**
     * 현재 상태를 적용한다.
     * */
    OnApply() {
        crystalEditBondDialog.I.UpdateRenderer();
        // camera auto fit 호출하기
        // crystalEditBondDialog.I._app._3dRender._renderer.autofitCameraObjList([crystalEditBondDialog.I._app._csManager._cs._groupMesh]);
        // 거리 각도 측정 삭제 호출
        crystalEditBondDialog.I._app._uiHandler.ClearAllMeasures();
        crystalEditBondDialog.I._app._dlgEditVectors.UpdateTable();
    }

    /**
     * 선택된 table row 업데이트
     * */
    ChangeSelected() {
        let selected = this._bondTable.getSelected();

        if (selected.length === 1) {
            this.UpdateSelectByInput();
        }
        else {
            this.DisableInput(true);
        }
    }


    /**
     * 입력란을 비활성화한다.
     * @param {Boolean} bDisable 입력란 비활성화 여부
     */
    DisableInput(bDisable = true) {

        $(this._inputMinLength).attr("disabled", bDisable);
        $(this._inputMaxLength).attr("disabled", bDisable);

        $(this._selectAtom1).attr("disabled", bDisable);
        $(this._selectAtom2).attr("disabled", bDisable);

        if (bDisable) {
            $(this._inputMinLength).val(0);
            $(this._inputMaxLength).val(0);

            $(this._selectAtom1).attr("selected", "selected");;
            $(this._selectAtom2).attr("selected", "selected");;
        }
    }
}