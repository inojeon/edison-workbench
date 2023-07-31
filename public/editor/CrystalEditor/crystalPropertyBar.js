import { rayLog } from "../Renderer/log.js";
import { crystalPropertyTool } from './crystalPropertyTool.js';
import { crystalPropertyStyle } from './crystalPropertyStyle.js';
import { crystalPropertyObject } from './crystalPropertyObject.js';

/**
 * Property 모음 클래스
 * */
export class crystalPropertyBar {

    /**
     * UI 초기화를 진행한다
     * @param {String} name 다른 앱과 구분하기 위한 이름
     * @param {cryUIApp} app 상위 앱 객체
     * @param {HTMLElement} div_elem cryUILeftBar가 부착될 HTML Element
     */
    constructor(name, app, div_elem) {

        // 앱 이름
        this._name = name;

        // 앱
        this._app = app;

        // 앱 루트 HTML DIV
        this._div = div_elem;

        this._show = true;

        this._div.innerHTML = this._appElementHTML(name);

        crystalPropertyBar.I = this;

        this._tabsPref = document.getElementById(name + "_pref_Tabs");

        $(this._tabsPref).tabs({
            active: 0
        });

        $(this._btnResize).resizable({
            maxHeight: 250,
            maxWidth: 350,
            minHeight: 150,
            minWidth: 200
        });



        this._div_tab1 = document.getElementById(name + "_pref_Tab1");
        this._div_tab2 = document.getElementById(name + "_pref_Tab2");
        this._div_tab3 = document.getElementById(name + "_pref_Tab3");

        this._propertyTool = new crystalPropertyTool(name, app, this._div_tab1);
        this._propertyStyle = new crystalPropertyStyle(name, app, this._div_tab2);
        this._propertyObject = new crystalPropertyObject(name, app, this._div_tab3);
    }

    /**
     * LeftBar에 대한 html element를 작성한다
     * @param {String} name 다른 앱과 구분하기 위한 이름
     * @returns {String} HTML 문자열
     */
    _appElementHTML(name) {

        let ihtml = [];
        let idx = 0;

        ihtml[idx] = "<div id='" + name + "_pref_Tabs' style='height:100%'>";
        idx++;
        ihtml[idx] = "<ul>";
        idx++;
        ihtml[idx] = "<li><a href='#" + name + "_pref_Tab1' class='cryUI_TabBtn'>Tools</a></li>";
        idx++;
        ihtml[idx] = "<li><a href='#" + name + "_pref_Tab2' class='cryUI_TabBtn'>Style</a></li>";
        idx++;
        ihtml[idx] = "<li><a href='#" + name + "_pref_Tab3' class='cryUI_TabBtn'>Objects</a></li>";
        idx++;
        ihtml[idx] = "</ul>";
        idx++;


        // Property - Tab1 - Tools
        ihtml[idx] = "<div id='" + name + "_pref_Tab1' class='cryUI_Tabs'>";
        idx++;

        ihtml[idx] = "</div>";
        idx++;



        // Property - Tab2 - Style
        ihtml[idx] = "<div id='" + name + "_pref_Tab2' class='cryUI_Tabs'>";
        idx++;

        ihtml[idx] = "</div>";
        idx++;


        // Property - Tab3 - Objects
        ihtml[idx] = "<div id='" + name + "_pref_Tab3' class='cryUI_Tabs' style='height:100%; overflow-y:scroll; overflow-x:hidden'>";
        idx++;

        ihtml[idx] = "</div>";
        idx++;


        return ihtml.join("");
    }

    /**
     * UI 업데이트
     * */
    UpdateUI() {
        /*
        if (this._propertyTool)
            this._propertyTool.UpdateUI();
        */

        if(this._propertyStyle)
            this._propertyStyle.UpdateUI();
        if(this._propertyObject)
            this._propertyObject.UpdateUI();
    }
}