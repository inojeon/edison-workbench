/**
 * 측정 모드 도구 버튼
 */
export class crystalUIFloatingToolMeasure {

    /**
     * UI를 초기화한다
     * @param {String} name 다른 앱과 구분하기 위한 이름
     * @param {proUIApp} app 상위 앱 객체
     * @param {HTMLElement} div_elem crystalUIFloatingToolMeasure가 부착될 HTML Element
     */
    constructor(name, app, div_elem) {

        // 앱 이름
        this._name = name;

        // 앱
        this._app = app;

        // 앱 루트 HTML DIV
        this._div = div_elem;

        this._div.innerHTML = this._appElementHTML(name);

        this._btnToolMeasureFinish = document.getElementById(name + "_tool_measure_finish");

        $(this._btnToolMeasureFinish).button();


        crystalUIFloatingToolMeasure.I = this;

        $(this._btnToolMeasureFinish).mousemove(function (event) {
            event.stopPropagation();
            event.preventDefault();
        });

        $(this._btnToolMeasureFinish).click(function (event) {
            crystalUIFloatingToolMeasure.I._app._uiHandler.FinishAllMeasures();
            $('.cryUI_BtnToolMeasure').blur();
        });


        this.Hide();
    }

    /**
     * FloatingToolMeasure에 대한 html element를 작성한다
     * @param {String} name 다른 앱과 구분하기 위한 이름
     * @returns {String} HTML 문자열
     */
    _appElementHTML(name) {

        var ihtml = [];

        var idx = 0;

        ihtml[idx] = "<button title='Finish Measure' id='" + name + "_tool_measure_finish' class='ui-button ui-widget ui-corner-all proUI_BtnToolMeasure'>Finish<br/>Measure</button>";
        idx++;

        return ihtml.join("");
    }

    /**
     * FloatingToolMeasure를 보여준다
     */
    Show() {
        this._div.style.display = "block";
    }

    /**
     * FloatingToolMeasure를 숨긴다
     */
    Hide() {
        this._div.style.display = "none";
    }


}