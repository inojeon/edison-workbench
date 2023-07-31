import { crystalMeasureTool } from "./crystalMeasureTool.js";

/**
 * 좌측 측정 모드 바
 * */
export class crystalLeftToolBar {

    /**
     * 생성자
     * @param {String} name 다른 앱과 구분하기 위한 이름
     * @param {crystalEditor} app 상위 앱 객체
     * @param {HTMLElement} div_elem crystalLeftToolBar가 부착될 HTML Element
     */
    constructor(name, app, div_elem) {

        this._name = name;

        this._app = app;

        this._div = div_elem;

        this._show = true;

        this._div.innerHTML = this._appElementHTML(name);

        this._div_visOptions = document.getElementById(name + "_left_visOption");

        this._viewVisOption = true;

        this._measureTool = new crystalMeasureTool(this._name, this._app, this._div_visOptions);

        crystalLeftToolBar.I = this;
    }
    /**
     * LeftToolBar에 대한 html element를 작성한다.
     *
     * @param {String} name 다른 앱과 구분하기 위한 이름
     * @returns {String} HTML 문자열
     */
    _appElementHTML(name) {

        var ihtml = [];

        var idx = 0;


        ihtml[idx] = "<div class='cryUI_VisOption_Title' id='" + name + "_left_visOption'></div>";
        idx++;


        return ihtml.join("");
    }

    /**
     * 툴바 상태를 업데이트한다.
     * */
    UpdateToolbarState() {
        if (this._measureTool) {
            this._measureTool.UpdateToolbarState();
        }
    }

}