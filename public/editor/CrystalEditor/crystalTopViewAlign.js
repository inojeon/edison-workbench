/**
 * align 메뉴 클래스
 * */
export class crystalTopViewAlign {

    /**
     * 생성자
     * @param {String} name 다른 앱과 구분하기 위한 이름
     * @param {crystalEditor} app 상위 앱 객체
     * @param {HTMLElement} div_elem crystalTopViewAlign이 부착될 HTML Element
     */
    constructor(name, app, div_elem) {

        this._name = name;

        this._app = app;

        this._div = div_elem;

        this._div.innerHTML = this._appElementHTML(name);

        this._btnAAlign = document.getElementById(name + "_top_align_a");

        this._btnBAlign = document.getElementById(name + "_top_align_b");

        this._btnCAlign = document.getElementById(name + "_top_align_c");

        crystalTopViewAlign.I = this;

        // 버튼 생성
        $(this._btnAAlign).button();
        $(this._btnBAlign).button();
        $(this._btnCAlign).button();

        $(this._btnAAlign).css("background-image", "url(images/Icon_A_Axis.png");
        $(this._btnBAlign).css("background-image", "url(images/Icon_B_Axis.png");
        $(this._btnCAlign).css("background-image", "url(images/Icon_C_Axis.png");
    
        // click 이벤트 처리
        $(this._btnAAlign).click(function (event) {
            crystalTopViewAlign.I._app.MenuViewAlignA();
            $('.cryUI_topBar_Btn_Tool').blur();
        });

        $(this._btnBAlign).click(function (event) {
            crystalTopViewAlign.I._app.MenuViewAlignB();
            $('.cryUI_topBar_Btn_Tool').blur();
        });

        $(this._btnCAlign).click(function (event) {
            crystalTopViewAlign.I._app.MenuViewAlignC();
            $('.cryUI_topBar_Btn_Tool').blur();
        });


    }

    /**
     * TopViewAlign에 대한 html element를 작성한다.
     * 
     * @param {String} name 다른 앱과 구분하기 위한 이름
     * @returns {String} HTML 문자열
     */
    _appElementHTML(name) {

        let ihtml = [];
        let idx = 0;

        ihtml[idx] = "<table class='cryUI_topToolbarTab'><tr>";
        idx++;
        ihtml[idx] = "<td><button title='View along the a axis' id='" + name + "_top_align_a' class='ui-button ui-widget ui-corner-all ui-button-icon-only cryUI_topBar_Btn_Tool'></button></td>";
        idx++;
        ihtml[idx] = "<td><button title='View along the b axis' id='" + name + "_top_align_b' class='ui-button ui-widget ui-corner-all ui-button-icon-only cryUI_topBar_Btn_Tool'></button></td>";
        idx++;
        ihtml[idx] = "<td><button title='View along the c axis' id='" + name + "_top_align_c' class='ui-button ui-widget ui-corner-all ui-button-icon-only cryUI_topBar_Btn_Tool'></button></td>";
        idx++;
        ihtml[idx] = "</tr></table>";
        idx++;

        return ihtml.join("");
    }
}