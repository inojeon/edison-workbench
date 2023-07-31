
/**
 * edit 메뉴 클래스
 * */
export class crystalTopViewEdit {

    /**
     * 생성자
     * @param {String} name 다른 앱과 구분하기 위한 이름
     * @param {crystalEditor} app 상위 앱 객체
     * @param {HTMLElement} div_elem crystalTopViewEdit이 부착될 HTML Element
     */
    constructor(name, app, div_elem) {

        this._name = name;

        this._app = app;

        this._div = div_elem;

        this._div.innerHTML = this._appElementHTML(name);

        this._btnEditData = document.getElementById(name + "_top_edit_data");

        this._btnEditBond = document.getElementById(name + "_top_edit_bond");

        this._btnEditVector = document.getElementById(name + "_top_edit_vector");

        this._btnEditCrystal = document.getElementById(name + "_top_edit_crystal");

        crystalTopViewEdit.I = this;

        // 버튼 생성
        $(this._btnEditData).button();
        $(this._btnEditBond).button();
        $(this._btnEditVector).button();
        $(this._btnEditCrystal).button();


        $(this._btnEditData).css("background-image", "url(images/Icon_Edit_Atom.png");
        $(this._btnEditBond).css("background-image", "url(images/Icon_Edit_Bond.png");
        $(this._btnEditVector).css("background-image", "url(images/Icon_Edit_Vector.png");
        $(this._btnEditCrystal).css("background-image", "url(images/Icon_Edit_Crystal.png");


        // show edit data dialog
        $(this._btnEditData).click(function (event) {
            crystalTopViewEdit.I._app.MenuDataCStructure();
            $('.cryUI_topBar_Btn_Tool').blur();
        });

        // show edit bond dialog
        $(this._btnEditBond).click(function (event) {
            crystalTopViewEdit.I._app.MenuDataBond();
            $('.cryUI_topBar_Btn_Tool').blur();
        });

        // show edit vector dialog
        $(this._btnEditVector).click(function (event) {
            crystalTopViewEdit.I._app.MenuDataVector();
            $('.cryUI_topBar_Btn_Tool').blur();
        });

        $(this._btnEditCrystal).click(function (event) {
            crystalTopViewEdit.I._app.MenuDataCrystalShape();
            $('.cryUI_topBar_Btn_Tool').blur();
        });
    }

    /**
     * TopViewEdit에 대한 html element를 작성한다.
     * 
     * @param {String} name 다른 앱과 구분하기 위한 이름
     * @returns {String} HTML 문자열
     */
    _appElementHTML(name) {

        let ihtml = [];
        let idx = 0;

        ihtml[idx] = "<table class='cryUI_topToolbarTab'><tr>";
        idx++;
        ihtml[idx] = "<td><button title='EditAtom' id='" + name + "_top_edit_data' class='ui-button ui-widget ui-corner-all ui-button-icon-only cryUI_topBar_Btn_Tool'></button></td>";
        idx++;
        ihtml[idx] = "<td><button title='EditBond' id='" + name + "_top_edit_bond' class='ui-button ui-widget ui-corner-all ui-button-icon-only cryUI_topBar_Btn_Tool'></button></td>";
        idx++;
        ihtml[idx] = "<td><button title='EditVector' id='" + name + "_top_edit_vector' class='ui-button ui-widget ui-corner-all ui-button-icon-only cryUI_topBar_Btn_Tool'></button></td>";
        idx++;
        ihtml[idx] = "<td><button title='EditCrystal' id='" + name + "_top_edit_crystal' class='ui-button ui-widget ui-corner-all ui-button-icon-only cryUI_topBar_Btn_Tool'></button></td>";
        idx++;
        ihtml[idx] = "</tr></table>";
        idx++;

        return ihtml.join("");
    }

    /**
     * UI 상태 업데이트
     * */
    UpdateUIState() {
        $('.cryUI_topBar_Btn_Tool').blur();
    }
}