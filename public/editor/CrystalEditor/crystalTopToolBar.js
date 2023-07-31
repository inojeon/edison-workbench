import { crystalTopViewAlign } from "./crystalTopViewAlign.js";
import { crystalTopViewUndo } from "./crystalTopViewUndo.js";
import { crystalTopViewEdit } from "./crystalTopViewEdit.js";
import { crystalTopViewFit } from "./crystalTopViewFit.js";

/**
 * 상단 툴바 클래스
 * */
export class crystalTopToolBar {

    /**
     * 생성자
     * 
     * @param {String} name 다른 앱과 구분하기 위한 이름
     * @param {crystalEditor} app 상위 앱 객체
     * @param {HTMLElement} div_elem crystalTopToolBar가 부착될 HTML Element
     */
    constructor(name, app, div_elem) {

        this._name = name;
        this._app = app;
        this._div = div_elem;

        this._div.innerHTML = this._appElementHTML(name);

        $(this._div).tooltip({
            items: ":hover"
        });

        this._div_topViewEdit = document.getElementById(name + "_topViewEdit");
        this._div_topViewUndo = document.getElementById(name + "_topViewUndo");
        this._div_topViewAlign = document.getElementById(name + "_topViewAlign");
        this._div_topViewFit = document.getElementById(name + "_topViewFit");

        this._viewEdit = true;
        this._viewUndo = true;
        this._viewAlign = true;
        this._viewFit = true;

        this._topViewEdit = new crystalTopViewEdit(this._name, this._app, this._div_topViewEdit);
        this._topViewUndo = new crystalTopViewUndo(this._name, this._app, this._div_topViewUndo);
        this._topViewAlign = new crystalTopViewAlign(this._name, this._app, this._div_topViewAlign);
        this._topViewFit = new crystalTopViewFit(this._name, this._app, this._div_topViewFit);
    }

    /**
     * TopToolBar에 대한 html element를 작성한다.
     * 
     * @param {String} name 다른 앱과 구분하기 위한 이름
     * @returns {String} HTML 문자열
     */
    _appElementHTML(name) {

        let ihtml = [];
        let idx = 0;

        ihtml[idx] = "<div class='cryUI_topToolbarPanel' id='" + name + "_topViewEdit'></div>";
        idx++;

        ihtml[idx] = "<div class='cryUI_topToolbarSplitter'></div>";
        idx++;

        ihtml[idx] = "<div class='cryUI_topToolbarPanel' id='" + name + "_topViewUndo'></div>";
        idx++;

        ihtml[idx] = "<div class='cryUI_topToolbarSplitter'></div>";
        idx++;

        ihtml[idx] = "<div class='cryUI_topToolbarPanel' id='" + name + "_topViewAlign'></div>";
        idx++;
        
        ihtml[idx] = "<div class='cryUI_topToolbarSplitter'></div>";
        idx++;

        ihtml[idx] = "<div class='cryUI_topToolbarPanel' id='" + name + "_topViewFit'></div>";
        idx++;

        return ihtml.join("");
    }

    /**
     * tool bar 상태 업데이트
     * */
    UpdateToolbarState() {

        this._div_topViewEdit.style.display = this._viewEdit ? "" : "none";
        this._div_topViewUndo.style.display = this._viewUndo ? "" : "none";
        this._div_topViewAlign.style.display = this._viewAlign ? "" : "none";
        this._div_topViewFit.style.display = this._viewFit ? "" : "none";

        this._viewTopBar = this._viewEdit || this._viewAlign || this._viewFit;
        this._div.style.display = this._viewTopBar ? "" : "none";

        this._topViewEdit.UpdateUIState();
        // this._topViewAlign.UpdateUIState();
        // this._topViewFit.UpdateUIState();

        $(this._div).tooltip("close");

    }

    /**
     * edit menu 가시화 여부
     * @param {Boolean} show edit menu show / hide
     */
    UpdateShowViewEdit(show) {
        this._viewEdit = show;
        this._app.UpdateUIState();
        this._app.OnResize();
    }

    /**
     * undo menu 가시화 여부
     * @param {Boolean} show undo menu show / hide
     */
    UpdateShowViewUndo(show) {
        this._viewUndo = show;
        this._app.UpdateUIState();
        this._app.OnResize();
    }

    /**
     * align menu 가시화 여부
     * @param {Boolean} show align menu show / hide
     */
    UpdateShowViewAlign(show) {
        this._viewAlign = show;
        this._app.UpdateUIState();
        this._app.OnResize();
    }

    /**
     * fit menu 가시화 여부
     * @param {Boolean} show fit menu show / hide
     */
    UpdateShowViewFit(show) {
        this._viewFit = show;
        this._app.UpdateUIState();
        this._app.OnResize();
    }


}