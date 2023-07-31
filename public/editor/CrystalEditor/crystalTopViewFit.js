/**
 * 카메라 fit 메뉴 클래스
 * */
export class crystalTopViewFit {

    /**
     * 생성자
     * @param {String} name 다른 앱과 구분하기 위한 이름
     * @param {crystalEditor} app 상위 앱 객체
     * @param {HTMLElement} div_elem crystalTopViewFit이 부착될 HTML Element
     */
    constructor(name, app, div_elem) {

        this._name = name;

        this._app = app;

        this._div = div_elem;

        this._div.innerHTML = this._appElementHTML(name);

        this._btnZoomIn = document.getElementById(name + "_top_zoom_in");

        this._btnZoomOut = document.getElementById(name + "_top_zoom_out");

        this._btnFitToScreen = document.getElementById(name + "_top_fit_to_screen");

        crystalTopViewFit.I = this;

        $(this._btnZoomIn).button();
        $(this._btnZoomOut).button();
        $(this._btnFitToScreen).button();

        $(this._btnZoomIn).css("background-image", "url(images/Icon_Zoom_In.png)");
        $(this._btnZoomOut).css("background-image", "url(images/Icon_Zoom_Out.png)");
        $(this._btnFitToScreen).css("background-image", "url(images/Icon_Fit_To_Screen.png)");

        $(this._btnZoomIn).click(function (event) {
            crystalTopViewFit.I._app.MenuViewZoomIn();
            $('.cryUI_topBar_Btn_Tool').blur();
        });

        $(this._btnZoomOut).click(function (event) {
            crystalTopViewFit.I._app.MenuViewZoomOut();
            $('.cryUI_topBar_Btn_Tool').blur();
        });

        $(this._btnFitToScreen).click(function (event) {
            $('.cryUI_topBar_Btn_Tool').blur();
            crystalTopViewFit.I._app._3dRender._renderer.autofitCameraObjList([crystalTopViewFit.I._app._csManager._cs.getMesh()], 10);
        });
    }

    /**
     * TopViewFit에 대한 html element를 작성한다.
     * 
     * @param {String} name 다른 앱과 구분하기 위한 이름
     * @returns {String} HTML 문자열
     */
    _appElementHTML(name) {

        let ihtml = [];
        let idx = 0;

        ihtml[idx] = "<table class='cryUI_topToolbarTab'><tr>";
        idx++;
        ihtml[idx] = "<td><button title='Zoom-in' id='" + name + "_top_zoom_in' class='ui-button ui-widget ui-corner-all ui-button-icon-only cryUI_topBar_Btn_Tool'></button></td>";
        idx++;
        ihtml[idx] = "<td><button title='Zoom-out' id='" + name + "_top_zoom_out' class='ui-button ui-widget ui-corner-all ui-button-icon-only cryUI_topBar_Btn_Tool'></button></td>";
        idx++;
        ihtml[idx] = "<td><button title='Fit-to-screen' id='" + name + "_top_fit_to_screen' class='ui-button ui-widget ui-corner-all ui-button-icon-only cryUI_topBar_Btn_Tool'></button></td>";
        idx++;
        ihtml[idx] = "</tr></table>";
        idx++;

        return ihtml.join("");
    }
}