
/**
 * undo 메뉴 클래스
 * */
export class crystalTopViewUndo {

    /**
     * 생성자
     * @param {String} name 다른 앱과 구분하기 위한 이름
     * @param {crystalEditor} app 상위 앱 객체
     * @param {HTMLElement} div_elem crystalTopViewUndo가 부착될 HTML Element
     */
    constructor(name, app, div_elem) {

        this._name = name;

        this._app = app;

        this._div = div_elem;

        this._div.innerHTML = this._appElementHTML(name);

        this._btnUndo = document.getElementById(name + "_top_undo");

        this._btnRedo = document.getElementById(name + "_top_redo");

        crystalTopViewUndo.I = this;

        $(this._btnUndo).button();
        $(this._btnRedo).button();

        $(this._btnUndo).css("background-image", "url(images/Icon_Undo.png");
        $(this._btnRedo).css("background-image", "url(images/Icon_Redo.png");

        $(this._btnUndo).click(function (event) {
            crystalTopViewUndo.I._app.MenuEditUndo();
            $('.cryUI_topBar_Btn_Tool').blur();
        });


        $(this._btnRedo).click(function (event) {
            crystalTopViewUndo.I._app.MenuEditRedo();
            $('.cryUI_topBar_Btn_Tool').blur();
        });
    }

    /**
     * TopViewUndo에 대한 html element를 작성한다.
     * 
     * @param {String} name 다른 앱과 구분하기 위한 이름
     * @returns {String} HTML 문자열
     */
    _appElementHTML(name) {

        let ihtml = [];
        let idx = 0;

        ihtml[idx] = "<table class='cryUI_topToolbarTab'><tr>";
        idx++;
        ihtml[idx] = "<td><button title='Undo' id='" + name + "_top_undo' class='ui-button ui-widget ui-corner-all ui-button-icon-only cryUI_topBar_Btn_Tool'></button></td>";
        idx++;
        ihtml[idx] = "<td><button title='Redo' id='" + name + "_top_redo' class='ui-button ui-widget ui-corner-all ui-button-icon-only cryUI_topBar_Btn_Tool'></button></td>";
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