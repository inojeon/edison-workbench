
/**
 * 작업 진행율 다이얼로그 UI 클래스
 * */
export class crystalProgressDialog {

    /**
     * UI 초기화를 진행한다
     * @param {String} name 다른 앱과 구분하기 위한 이름
     * @param {crystalEditor} app 앱 참조
     * @param {HTMLElement} div_elem crystalProgressDialog가 부착될 HTML Element
     * @param {HTMLElement} div_elem waiter object HTML Element
     */
    constructor(name, app, div_elem, div_waiter) {

        // 앱 이름
        this._name = name;

        // 앱
        this._app = app;

        // 앱 루트 HTML DIV
        this._div = div_elem;
        this._divWaiter = div_waiter;

        // 다이얼로그 보이기 플래그
        this._show = false;

        // 프로그레스 메시지
        this._msg = "";

        // 프로그레스 진행율 (%)
        this._ratio = 0;

        this._div.innerHTML = this._appElementHTML(name);

        this._divMsg = document.getElementById(name + "_dlgProgress_msg");
        this._divProgressBar = document.getElementById(name + "_dlgProgress_bar");
        this._divProgressLabel = document.getElementById(name + "_dlgProgress_label");

        crystalProgressDialog.I = this;

        this._dialog = $(this._div).dialog({
            autoOpen: false,
            dialogClass: "no-close cryUI_Progress",
            height: "auto",
            width: "320px",
            position: { my: "center", at: "center", of: "#" + crystalProgressDialog.I._name + "_waiter" },
            modal: false,
            zIndex: 200,
            closeOnEscape: false,
            resizable: false,
            buttons: {
                "Cancel": function () {
                }
            },
            close: function () {
                this._show = false;
            },
        });

        this._progressBar = $(this._divProgressBar).progressbar({
            max: 1,
            change: function () {
                $(crystalProgressDialog.I._divProgressLabel).text(parseInt(parseFloat($(crystalProgressDialog.I._divProgressBar).progressbar("value")) * 100.0) + "%");
            }
        });

        this._progressBar.css("display", "none");
    }

    /**
     * Progress Dialog에 대한 html element를 작성한다
     *
     * @param {String} name 다른 앱과 구분하기 위한 이름
     * @return {String} HTML 문자열 
     */
    _appElementHTML(name) {

        var ihtml = [];

        var idx = 0;

        ihtml[idx] = "<div class='cryUI_MsgBox_Msg' id = '" + name + "_dlgProgress_msg'></div>";
        idx++;
        ihtml[idx] = "<br/><div id = '" + name + "_dlgProgress_bar' style='position:relative;'>";
        idx++;
        ihtml[idx] = "<div id = '" + name + "_dlgProgress_label' style='position:absolute;left:50%;top:4px;'>...</div></div>";
        idx++;

        return ihtml.join("");
    };

    /**
     * 비동기 UI 업데이트 함수
     * @param {Number} msec 업데이트 대기 시간
     */
    async TSleep(msec) {
        return new Promise(resolve => setTimeout(resolve, msec));
    }

    /**
     * 다이얼로그를 보여준다
     * @param {String} title 다이얼로그 제목
     * @param {String} msg 다이얼로그 메시지
     */
    async ShowDialog(title, msg) {
        this._divMsg.innerText = msg;
        this._dialog.dialog("option", "title", title);
        this._dialog.dialog("open");
        this.SetProgress(0);
        this._show = true;
        this._divWaiter.style.visibility = "visible";
        await this.TSleep(10);

        //this._app.SetWaitForServerRequest();
    }

    /**
     * 다이얼로그 메시지를 설정한다
     * @param {String} msg 다이얼로그 메시지
     */
    async SetMsg(msg) {
        this._divMsg.innerText = msg;
        await this.TSleep(10);
    }

    /**
     * progress를 설정한다
     * @param {Number} ratio progress ratio
     */
    async SetProgress(ratio) {
        //kvis.Log("Set Progress " + ratio);
        this._progressBar.css("display", "block");
        this._progressBar.progressbar("value", ratio);
        await this.TSleep(10);
    }

    /**
     * 다이얼로그를 닫는다
     * */
    CloseDialog() {
        this._dialog.dialog("close");
        this._divWaiter.style.visibility = "hidden";
        //this._app.ResetWaitForServerRequest();
    }

}