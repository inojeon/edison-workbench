import { crystalEditVectorsVectorsTab } from "./crystalEditVectorsVectorsTab.js";
import { crystalEditVectorsCrystalGraphicSitesTab } from "./crystalEditVectorsCrystalGraphicSitesTab.js";
import { crystalEditVectorsIndividualAtomTab } from "./crystalEditVectorsIndividualAtomTab.js";
import { rayLog } from "../Renderer/log.js";

/**
 * Vector 관련 다이얼로그
 * */
export class crystalEditVectorsDialog {

    /**
     * 생성자
     * @param {String} name 다른 앱과 구분하기 위한 이름
     * @param {crystalEditor} app 상위 앱 객체
     * @param {HTMLElement} div_elem crystalEditVectorsDialog가 부착될 HTML Element
     */
    constructor(name, app, div_elem) {

        this._name = name;

        this._app = app;

        this._div = div_elem;

        this._div.innerHTML = this._appElementHTML(name);

        crystalEditVectorsDialog.I = this;

        this._tabsLeft = document.getElementById(name + "_edit_vectors_left_tab");

        this._tabsRight = document.getElementById(name + "_edit_vectors_right_tab");

        this._div_crystal_graphic_sties_tab = document.getElementById(name + "_edit_crystalgraphic_sites");

        this._div_individual_atom_tab = document.getElementById(name + "_edit_individual_atom");

        this._div_vectors_tab = document.getElementById(name + "_edit_vectors");

        this._individual_atom_tab = new crystalEditVectorsIndividualAtomTab(this._name, this._app, this._div_individual_atom_tab);

        this._crystal_graphic_sites_tab = new crystalEditVectorsCrystalGraphicSitesTab(this._name, this._app, this._div_crystal_graphic_sties_tab);

        this._vectors_tab = new crystalEditVectorsVectorsTab(this._name, this._app, this._div_vectors_tab);

        this._set_btn = document.getElementById(name + "_set_vector");

        this._remove_btn = document.getElementById(name + "_remove_vector");

        this._bModified = false;

        $(this._set_btn).click(function () {

            let tabIdx = crystalEditVectorsDialog.I.GetActiveTabIndex();

            // get current selected crystallographic sites
            let selectedCrystallo = crystalEditVectorsDialog.I._crystal_graphic_sites_tab._crystal_graphic_site_table.getSelected();
            let selectedIndividual = crystalEditVectorsDialog.I._individual_atom_tab._individual_atom_table.getSelected();

            // get current selected vector
            let selectedVector = crystalEditVectorsDialog.I._vectors_tab._crystal_vectors_table.getSelected();

            if (tabIdx === 0 && selectedCrystallo.length === 1 && selectedVector.length === 1) {

                crystalEditVectorsDialog.I._bModified = true;

                let idx = parseInt($(selectedCrystallo).find("#" + crystalEditVectorsDialog.I._name + "_crystallo_graphic_catom_idx").html());
                // get selected crystallo catom from csManager
                let catom = crystalEditVectorsDialog.I._app._csManager._cs.getAtomByIdx(idx);

                let number = parseInt($(selectedVector).find("#" + crystalEditVectorsDialog.I._name + "_vectors_tab_vector_number").html());
                // get selected vector ivector from csManager
                let tvector = crystalEditVectorsDialog.I._app._csManager._cs.gettVectorByNumber(number)[0];
                // addvector to catom
                crystalEditVectorsDialog.I._app._csManager._cs.addVector2CAtom(catom, tvector);

                crystalEditVectorsDialog.I.AddSelectedVectorToCrystallo(selectedVector, selectedCrystallo);

                // generate
                crystalEditVectorsDialog.I.generateStructure();


            }

            else if (tabIdx === 1 && selectedIndividual.length === 1 && selectedVector.length === 1) {

                crystalEditVectorsDialog.I._bModified = true;

                let idx = parseInt($(selectedIndividual).find("#" + crystalEditVectorsDialog.I._name + "_individual_atom_iatom_idx").html());

                let iatom = crystalEditVectorsDialog.I._app._csManager._cs._iatomList[idx];

                let number = parseInt($(selectedVector).find("#" + crystalEditVectorsDialog.I._name + "_vectors_tab_vector_number").html());
                // get selected vector ivector from csManager
                let tvector = crystalEditVectorsDialog.I._app._csManager._cs.gettVectorByNumber(number)[0];
                // addvector to catom
                crystalEditVectorsDialog.I._app._csManager._cs.addVector2iAtom(iatom, tvector);

                crystalEditVectorsDialog.I.AddSelectedVectorToIndividual(selectedVector, selectedIndividual);

                // generate
                crystalEditVectorsDialog.I.generateStructure();


            }
        });

        $(this._remove_btn).click(function () {
            rayLog(3, "vector remove button clicked");

            let tabIdx = crystalEditVectorsDialog.I.GetActiveTabIndex();

            // get current selected crystallographic sites
            let selectedCrystallo = crystalEditVectorsDialog.I._crystal_graphic_sites_tab._crystal_graphic_site_table.getSelected();
            let selectedIndividual = crystalEditVectorsDialog.I._individual_atom_tab._individual_atom_table.getSelected();

            if (tabIdx === 0 && selectedCrystallo.length === 1) {

                crystalEditVectorsDialog.I._bModified = true;

                let idx = parseInt($(selectedCrystallo).find("#" + crystalEditVectorsDialog.I._name + "_crystallo_graphic_catom_idx").html());
                // get selected crystallo catom from csManager
                let catom = crystalEditVectorsDialog.I._app._csManager._cs.getAtomByIdx(idx);
                // remove vector
                catom.clearVectors();

                crystalEditVectorsDialog.I.RemoveVectorFromSelectedCrystallo(selectedCrystallo);

                // generate
                crystalEditVectorsDialog.I.generateStructure();

            }

            else if (tabIdx === 1 && selectedIndividual.length === 1) {

                crystalEditVectorsDialog.I._bModified = true;

                let idx = parseInt($(selectedIndividual).find("#" + crystalEditVectorsDialog.I._name + "_individual_atom_iatom_idx").html());
                let iatom = crystalEditVectorsDialog.I._app._csManager._cs._iatomList[idx];

                crystalEditVectorsDialog.I._app._csManager._cs.removeAllVectors4iAtom(iatom);

                crystalEditVectorsDialog.I.RemoveVectorFromSelectedIndividual(selectedIndividual);

                crystalEditVectorsDialog.I.generateStructure();

            }

        });

        this._dialog = $(this._div).dialog({
            autoOpen: false,
            maxHeight: 400,
            height: 400,
            maxWidth: 900,
            width: 900,
            modal: true,
            closeOnEscape: true,
            resizable: false,
            title: "Vectors",
            buttons: {
                "OK": function () {
                    if (crystalEditVectorsDialog.I._bModified) {
                        crystalEditVectorsDialog.I._app._bModified = true;
                        crystalEditVectorsDialog.I._app._csManager.AddUndo();
                    }
                    // crystalEditVectorsDialog.I.OnApply();
                    crystalEditVectorsDialog.I.CloseDialog();
                },

                "Cancel": function () {
                    crystalEditVectorsDialog.I.CloseDialog();
                }
            },

            close: function () {
                crystalEditVectorsDialog.I._show = false;
                crystalEditVectorsDialog.I._app.UpdateUI();
            }
        });

        $(this._tabsLeft).tabs({
            active: 0
        });

        $(this._tabsRight).tabs({
            active: 0
        });
    }

    /**
     * EditVectorsDialog에 대한 html element를 작성한다.
     * 
     * @param {String} name 다른 앱과 구분하기 위한 이름
     * @returns {String} HTML 문자열
     */
    _appElementHTML(name) {

        let ihtml = [];
        let idx = 0;


        // left tab
        ihtml[idx] = "<div class='cryUI_Edit_Vectors_Left_Tab' id='" + name + "_edit_vectors_left_tab'>";
        idx++;
        ihtml[idx] = "<ul>";
        idx++;
        ihtml[idx] = "<li><a href='#" + name + "_edit_crystalgraphic_sites' class='cryUI_TabBtn'>Crystallographic Sites</a></li>";
        idx++;
        ihtml[idx] = "<li><a href='#" + name + "_edit_individual_atom' class='cryUI_TabBtn'>Individual Atom</a></li>";
        idx++;
        ihtml[idx] = "</ul>";
        idx++;

        // CrystalGraphic Sites
        ihtml[idx] = "<div id='" + name + "_edit_crystalgraphic_sites' class='cryUI_Tabs' style='overflow:auto'>";
        idx++;
        ihtml[idx] = "</div>";
        idx++;

        // Individual Atom
        ihtml[idx] = "<div id='" + name + "_edit_individual_atom' class='cryUI_Tabs' style='overflow:auto'>";
        idx++;
        ihtml[idx] = "</div>";
        idx++;

        ihtml[idx] = "</div>";
        idx++;

        ihtml[idx] = "<div class='cryUI_Edit_Vectors_Button_Area' id='" + name + "_edit_vectors_button_area'>";
        idx++;
        ihtml[idx] = "<br><br><br>";
        idx++;
        ihtml[idx] = "<button class='cryUI_Width_100 ui-button ui-widget ui-corner-all' id='" + name + "_set_vector'><< Set</button>";
        idx++;
        ihtml[idx] = "<br><br><br>";
        idx++;
        ihtml[idx] = "<button class='cryUI_Width_100 ui-button ui-widget ui-corner-all' id='" + name + "_remove_vector'>>> Remove</button>";
        idx++;
        ihtml[idx] = "</div>";
        idx++;

        // right tab
        ihtml[idx] = "<div class='cryUI_Edit_Vectors_Right_Tab' id='" + name + "_edit_vectors_right_tab'>";
        idx++;
        ihtml[idx] = "<ul>";
        idx++;
        ihtml[idx] = "<li><a href='#" + name + "_edit_vectors' class='cryUI_TabBtn'>Vectors</a></li>";
        idx++;
        ihtml[idx] = "</ul>";
        idx++;

        // Vectors
        ihtml[idx] = "<div id='" + name + "_edit_vectors' class='cryUI_Tabs' style='overflow:auto'>";
        idx++;
        ihtml[idx] = "</div>";
        idx++;

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

        crystalEditVectorsDialog.I._app._csManager.SetPrev(crystalEditVectorsDialog.I._app._csManager._cs);
        this._dialog.dialog("open");
        this._show = true;
    }

    /**
     * 다이얼로그를 닫는다.
     * */
    CloseDialog() {
        this._dialog.dialog("close");
        this._show = false;
        this._bModified = false;
    }

    /**
     * CStructure generate
     * */
    generateStructure() {
        let renderer = crystalEditVectorsDialog.I._app._3dRender;
        let csManager = crystalEditVectorsDialog.I._app._csManager;

        renderer.Clear();
        csManager._cs.generate(crystalEditVectorsDialog.I._app.GetSymmetryIdxList());
        crystalEditVectorsDialog.I._app.UpdateStructureProperty();
        crystalEditVectorsDialog.I._app.UpdateRenderOptions();
        renderer._renderer._scene.children.pop();
        renderer._renderer._scene.add(csManager._cs._groupMesh);
    }

    /**
     * 현재 탭 인덱스를 반환한다.
     * @returns {Number} 현재 탭 인덱스
     * */
    GetActiveTabIndex() {
        return $(this._tabsLeft).tabs("option", "active");
    }

    /**
     * 선택된 vector를 선택된 crystallo에 추가한다.
     * @param {HTMLElement} selectedVector 선택된 vector
     * @param {HTMLElement} selectedCrystallo 선택된 crystallo
     */
    AddSelectedVectorToCrystallo(selectedVector, selectedCrystallo) {

        // get current selectedCrystallo vector string
        let crystalloStr = $(selectedCrystallo).find("#" + crystalEditVectorsDialog.I._name + "_crystallo_vector_idxs").html();
        let crystalloToken = crystalloStr.split(',');

        // get current selevcted vector number
        let number = $(selectedVector).find(".position").html();


        if (!crystalloToken.includes(number)) {

            // add number to selected crystallo
            rayLog(3, $(selectedCrystallo).find("#" + crystalEditVectorsDialog.I._name + "_crystallo_vector_idxs"));

            let res = "";
            if (crystalloStr.length > 0)
                res = crystalloStr + "," + number;
            else
                res = number;

            $(selectedCrystallo).find("#" + crystalEditVectorsDialog.I._name + "_crystallo_vector_idxs").html(res);
        }

    }

    /**
     * 선택된 vector를 선택된 individual에 추가한다.
     * @param {HTMLElement} selectedVector 선택된 vector
     * @param {HTMLElement} selectedIndividual 선택된 individual
     */
    AddSelectedVectorToIndividual(selectedVector, selectedIndividual) {
        let individualStr = $(selectedIndividual).find("#" + crystalEditVectorsDialog.I._name + "_individual_vector_idxs").html();
        let individualToken = individualStr.split(',');

        let number = $(selectedVector).find(".position").html();

        if (!individualToken.includes(number)) {

            let res = "";
            if (individualStr.length > 0)
                res = individualStr + "," + number;
            else
                res = number;

            $(selectedIndividual).find("#" + crystalEditVectorsDialog.I._name + "_individual_vector_idxs").html(res);
        }
    }

    /**
     * 선택된 crystallo로부터 vector를 제거한다.
     * @param {HTMLElement} selectedCrystallo 선택된 crystallo
     */
    RemoveVectorFromSelectedCrystallo(selectedCrystallo) {
        $(selectedCrystallo).find("#" + crystalEditVectorsDialog.I._name + "_crystallo_vector_idxs").html("");
    }

    /**
     * 선택된 individual로부터 vector를 제거한다.
     * @param {HTMLElement} selectedIndividual 선택된 individual
     */
    RemoveVectorFromSelectedIndividual(selectedIndividual) {
        $(selectedIndividual).find("#" + crystalEditVectorsDialog.I._name + "_individual_vector_idxs").html("");
    }

    /**
     * 테이블 업데이트
     * */
    UpdateTable() {
        this._crystal_graphic_sites_tab.UpdateTable();
        this._individual_atom_tab.UpdateTable();
        this._vectors_tab.UpdateTable();
    }

    /**
     * CStructure로부터 테이블을 복원한다.
     * */
    RestoreAddedVectorFromCS() {

        this.UpdateTable();
        // catom에 추가된 벡터 >> 

        // catom의 avectors를 순회한다.
        // avector의 def가 cs의 tvector의 어떤 것과 매칭되는지 판별
        // tvector의 index + 1의 값을 추가한다.
        for (let i = 0; i < this._app._csManager._cs._atoms.length; ++i) {
            let catom = this._app._csManager._cs._atoms[i];
            for (let j = 0; j < this._app._csManager._cs._atoms[i]._avectors.length; ++j) {
                let avector = catom._avectors[j];

                for (let k = 0; k < this._app._csManager._cs._tvectors.length; ++k) {
                    if (avector._def === this._app._csManager._cs._tvectors[k]) {
                        // atoms[i]에 해당하는 row에 k+1이라는 number를 추가하자.
                        let row = this._crystal_graphic_sites_tab._crystal_graphic_site_table.getAllRow()[i];
                        let txt = $(row).find("#" + this._name + "_crystallo_vector_idxs").text();
                        if (txt.length) {
                            txt += "," + (k + 1);
                        }
                        else
                            txt += (k + 1).toString();
                        $(row).find("#" + this._name + "_crystallo_vector_idxs").text(txt);
                    }
                }
            }
        }

        // iatom에 추가된 벡터 >>

        // iatomList 순회
        // cs의 avectors에서 _index 조회
        // iatom의 index와 cs의 avectors의 index가 매칭되면 avector의 def에 해당하는 tvector의 index + 1 추가
        for (let i = 0; i < this._app._csManager._cs._iatomList.length; ++i) {
            let iatom = this._app._csManager._cs._iatomList[i];

            if (iatom._visible) {
                for (let j = 0; j < this._app._csManager._cs._avectors.length; ++j) {
                    let avector = this._app._csManager._cs._avectors[j];
                    // iatom의 index와 avector의 index가 같다면 avector._def에 해당하는 tvector의 index를 cs에서 찾아 index + 1을 추가
                    if (iatom._index === avector._index && JSON.stringify(iatom._unitcellLoc) === JSON.stringify(avector._unitcellPos)) {
                        let number = this._app._csManager._cs._tvectors.indexOf(avector._def);
                        if (number >= 0) {
                            number += 1;
                            for (let k = 0; k < this._individual_atom_tab._individual_atom_table.getAllRow().length; ++k) {
                                let idx = parseInt($(this._individual_atom_tab._individual_atom_table.getAllRow()[k]).find("#" + this._name + "_individual_atom_iatom_idx").text());
                                if (idx === i) {
                                    let row = this._individual_atom_tab._individual_atom_table.getAllRow()[k];
                                    let txt = $(row).find("#" + this._name + "_individual_vector_idxs").text();
                                    if (txt.split(",").includes(number.toString()))
                                        continue;
                                    if (txt.length) {
                                        txt += "," + number;
                                    }
                                    else
                                        txt += number.toString();
                                    $(row).find("#" + this._name + "_individual_vector_idxs").text(txt);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}