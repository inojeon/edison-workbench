import { crystalTable } from './crystalTable.js';
import { cryst, crystalVariable  } from './crystalVariable.js';
import { AtomDef } from "../Renderer/AtomDef.js";
import { rayLog } from "../Renderer/log.js";

/**
 * Property Object 클래스
 * */
export class crystalPropertyObject {

    /**
     * 생성자
     * @param {String} name 다른 앱과 구분하기 위한 이름
     * @param {crystalEditor} app 상위 앱 객체
     * @param {HTMLElement} div_elem crystalPropertyObject가 부착될 HTML Element
     */
    constructor(name, app, div_elem) {

        this._name = name;

        this._app = app;

        this._div = div_elem;

        this._div.innerHTML = this._appElementHTML(name);

        crystalPropertyObject.I = this;

        this._div_object_data_table = document.getElementById(name + "_object_data_table_area");

        this.CreateObjectTable();
    }

    /**
     * PropertyObject에 대한 html element를 작성한다.
     * 
     * @param {String} name 다른 앱과 구분하기 위한 이름 
     * @returns {String} html element string
     */
    _appElementHTML(name) {
        let ihtml = [];
        let idx = 0;

        // atom 정보 테이블
        ihtml[idx] = "<div class='cryUI_Edit_Structure_Table_Area' id='" + name + "_object_data_table_area'>";
        idx++;
        ihtml[idx] = "</div>";
        idx++;

        ihtml[idx] = "</div>";
        idx++;

        return ihtml.join("");
    }

    /**
     * Object Tab에 테이블을 추가한다.
     * */
    CreateObjectTable() {
        this._objectDataTable = new crystalTable(this._name, this._app, this._div_object_data_table, "objects_table");
        this._objectDataTable.createHeader("\
            <tr>\
                <th class='cryUI_Big_Td_With_Margin'>Site</th>\
                <th class='cryUI_Big_Td_With_Margin'>r(A)</th>\
                <th class='cryUI_Small_Td'>C</th>\
                <th class='cryUI_Small_Td'>V</th>\
            </tr>", false);
    }

    /**
     * UI 업데이트
     * */
    UpdateUI() {

        let csManager = crystalPropertyObject.I._app._csManager;

        this._objectDataTable.clearAll();
        this._objectDataTable.updateTable();

        /**
         * atoms의 정보를 모두 수집한다 => main tr에 child tr을 추가하는 방식으로 구성한다.
         * main tr에 이벤트 리스너를 달아 child tr이 expand / shrink 되도록 만든다.
         *
         * 1. atom symbol이 같은 element들을 따로 모은다.
         * 2. table 추가 시 main tr은 그대로, child tr은 display:none 속성을 추가하여 집어넣는다.
         *
         */
        let atomDict = {};

        for (let atom of csManager._cs._atoms) {
            let atomDef = AtomDef.GetDefWithNumber(atom._id);
            if (!atomDict[atomDef._atom_number])
                atomDict[atomDef._atom_number] = [];

            atomDict[atomDef._atom_number].push(atom);
        }

        for (let key in atomDict) {
            let atomDef = AtomDef.GetDefWithNumber(key);
            let visibleChk = true;
            for (let atom of atomDict[key]) {
                if (atom._visible === false) {
                    visibleChk = false;
                    break;
                }
            }

            let headHTML = "\
                <tr class='sortable' id='" + this._name + "_" + atomDef._id + "_object_data_parent'>\
            	<td class='position cryUI_Normal_Td' style='display:none'></td>\
                <td class='cryUI_Big_Td_With_Margin'><button class='cryUI_Float_Left' id='" + this._name + "_" + atomDef._id + "_object_button_parent'>ᐳ</button>" + atomDef._id + "</td>\
                <td class='cryUI_Big_Td_With_Margin'>" + atomDef._radius + "</td>\
                <td class='cryUI_Small_Td' id='" + this._name + "_" + atomDef._id + "_object_data_color_parent'></td>\
                <td class='cryUI_Small_Td'><input type='checkbox' id='" + this._name + "_" + atomDef._id + "_object_data_visible_parent'></td>\
                </tr>";

            this._objectDataTable.appInnerHTML(headHTML, false);
            // $("#" + this._name + "_" + atomDef._id + "_object_data_color_parent").css("background-color", '#' + crystalVariable.ColorRGBtoHexNum(atomDef._color));
            $("#" + this._name + "_" + atomDef._id + "_object_data_visible_parent").prop("checked", visibleChk);

            for (let atom of atomDict[key]) {
                // 특정 atom임을 구분할 수 있는 정보가 필요하다.
                let atomDef = AtomDef.GetDefWithNumber(atom._id);
                let childHTML = "\
                	<tr class='sortable' id='" + this._name + "_" + atomDef._id + "_object_data_child" + "_" + atom._idx + "' style='display:none'>\
                	<td class='position cryUI_Normal_Td' style='display:none'></td>\
                    <td class='cryUI_Big_Td_With_Margin'>"+ atom._label + "</td>\
                    <td class='cryUI_Big_Td_With_Margin'>" + atomDef._radius + "</td>\
                    <td class='cryUI_Small_Td' id='" + this._name + "_" + atomDef._id + "_object_data_color_child" + "_" + atom._idx + "'></td>\
                    <td class='cryUI_Small_Td'><input type='checkbox' id='" + this._name + "_" + atomDef._id + "_object_data_visible_child" + "_" + atom._idx + "'></td>\
                    </tr>";

                this._objectDataTable.appInnerHTML(childHTML, false);

                $("#" + this._name + "_" + atomDef._id + "_object_data_color_child" + "_" + atom._idx).css("background-color", '#' + crystalVariable.HTMLColorRGB([atom._color[0], atom._color[1], atom._color[2]]));
                $("#" + this._name + "_" + atomDef._id + "_object_data_visible_child" + "_" + atom._idx).prop("checked", atom._visible);

                $("#" + this._name + "_" + atomDef._id + "_object_data_visible_child" + "_" + atom._idx).on("click", function () {
                    let idx = atom._idx;
                    let csAtom = csManager._cs.getAtomByIdx(idx);

                    if ($(this).is(':checked')) {

                        csAtom._visible = true;
                        for (let i = 0; i < csManager._cs._iatomList.length; ++i) {
                            if (csManager._cs._iatomList[i]._def === csAtom) {
                                csManager._cs._iatomList[i].setVisible(true);
                            }
                        }

                    }
                    else {
                        if ($("#" + crystalPropertyObject.I._name + "_" + atomDef._id + "_object_data_visible_parent").prop("checked")) {
                            $("#" + crystalPropertyObject.I._name + "_" + atomDef._id + "_object_data_visible_parent").prop("checked", false);
                        }

                        csAtom._visible = false;

                        for (let i = 0; i < csManager._cs._iatomList.length; ++i) {
                            if (csManager._cs._iatomList[i]._def === csAtom) {
                                csManager._cs._iatomList[i].setVisible(false);
                            }
                        }
                    }

                    // crystalPropertyObject.I.generateStructure();
                });
            }

            let name = this._name;
            let id = atomDef._id;

            $("#" + name + "_" + id + "_object_button_parent").on("click", function () {
                if ($(this).text() === "ᐳ")
                    $(this).text("ᐯ");
                else
                    $(this).text("ᐳ");

                $("tr[id^='" + name + "_" + id + "_object_data_child']").each(function () {

                    if ($(this).css("display") == "none") {
                        $(this).show();
                    }
                    else {
                        $(this).hide();
                    }
                });
            });



            $("#" + name + "_" + id + "_object_data_visible_parent").change(function () {
                if ($(this).is(':checked')) {
                    // 모두 체크
                    $("input[id^='" + name + "_" + id + "_object_data_visible_child']").each(function () {
                        $(this).prop("checked", true);
                        let tokens = $(this).attr('id').split('_');
                        let idx = parseInt(tokens[tokens.length - 1]);
                        let csAtom = csManager._cs.getAtomByIdx(idx);

                        csAtom._visible = true;

                        for (let i = 0; i < csManager._cs._iatomList.length; ++i) {
                            if (csManager._cs._iatomList[i]._def === csAtom) {
                                csManager._cs._iatomList[i].setVisible(true);
                            }
                        }
                    });
                }
                else {
                    // 모두 체크 해제
                    $("input[id^='" + name + "_" + id + "_object_data_visible_child']").each(function () {
                        $(this).prop("checked", false);
                        let tokens = $(this).attr('id').split('_');
                        let idx = parseInt(tokens[tokens.length - 1]);
                        let csAtom = csManager._cs.getAtomByIdx(idx);

                        csAtom._visible = false;

                        for (let i = 0; i < csManager._cs._iatomList.length; ++i) {
                            if (csManager._cs._iatomList[i]._def === csAtom) {
                                csManager._cs._iatomList[i].setVisible(false);
                            }
                        }
                    });
                }
                // crystalPropertyObject.I.generateStructure();
            });
        }
    }

    /**
     * 원자 중 가시화 옵션이 활성화된 인덱스리스트를 반환한다.
     * 
     * @returns {Array} 가시화 옵션이 활성화된 원자 인덱스 리스트
     * */
    GetVisibleIdxList() {
        let idxList = [];
        
        // get all rows
        let rows = this._objectDataTable.getAllRow();

        // get idx from each row
        for (let row of rows) {

            // visible input이 체크 안 된 경우
            if (!$(row).find("input")[0].checked)
                continue;

            let tokens = row.id.split('_');
            let idx = parseInt(tokens[tokens.length - 1]);

            if (isNaN(idx))
                continue;

            idxList.push(idx);
        }

        return idxList;
    }

    generateStructure() {
        let renderer = this._app._3dRender;
        let csManager = this._app._csManager;

        renderer.Clear();
        csManager._cs.generate(this._app.GetSymmetryIdxList());
        csManager._cs.ClipBoundary(cryst.Mode.Boundary);
        this._app.UpdateStructureProperty();
        this._app.UpdateRenderOptions();
        renderer._renderer._scene.children.pop();
        renderer._renderer._scene.add(csManager._cs._groupMesh);
    }
}