/**
 * log bar 클래스
 * */
export class crystalLogBar {

    /**
     * 생성자
     * @param {String} name 다른 앱과 구분하기 위한 이름
     * @param {crystalEditor} app 상위 앱 객체
     * @param {HTMLElement} div_elem crystalBoundarySettingDialog가 부착될 HTML Element
     */
    constructor(name, app, div_elem) {

        this._name = name;

        this._app = app;

        this._div = div_elem;

        this._show = true;

        this._div.innerHTML = this._appElementHTML(name);

        this._msgText = document.getElementById(name + "_cmdMsgText");

        this.SetShow(true);

        // this.AddMsgText("Log Bar Area");

        crystalLogBar.I = this;
    }

    /**
     * LogBar에 대한 html element를 작성한다.
     *
     * @param {String} name 다른 앱과 구분하기 위한 이름
     * @returns {String} HTML 문자열
     */
    _appElementHTML(name) {

        let ihtml = [];
        let idx = 0;

        ihtml[idx] = "<div class='cryUI_cmdBarMsgText' id='" + name + "_cmdMsgText'></div>";
        idx++;

        return ihtml.join("");
    }

    /**
     * log bar visibility setting
     * @param {Boolean} show log bar visibility
     */
    SetShow(show) {
        this._show = show;

        if (this._show) {
            this._div.style.display = 'block';
        } else {
            this._div.style.display = 'none';
        }

        this._app.OnResize();
        // this._app.UpdateUI();
    }

    /**
     * log bar show toggle
     * */
    ToggleShow() {
        this.SetShow(!this._show);
    }

    /**
     * log bar clear
     * */
    ClearMsgText() {
        this._msgText.innerText = "";
    };

    /**
     * log bar add text
     * @param {String} txt
     */
    AddMsgText(txt) {
        this._msgText.innerText = txt;
    };
}