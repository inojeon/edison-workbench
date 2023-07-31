/**
 * 측정 도구 클래스
 * */
export class crystalMeasureTool {

    /**
     * 생성자
     * @param {String} name 다른 앱과 구분하기 위한 이름
     * @param {crystalEditor} app 상위 앱 객체
     * @param {HTMLElement} div_elem crystalMeasureTool이 부착될 html element
     */
    constructor(name, app, div_elem) {

        this._name = name;

        this._app = app;

        this._div = div_elem;

        this._div.innerHTML = this._appElementHTML(name);



        this._btnRotate = document.getElementById(name + "_left_rotate");
        this._btnSelect = document.getElementById(name + "_left_select");
        //this._btnMove = document.getElementById(name + "_left_move");
        //this._btnMagnify = document.getElementById(name + "_left_magnify");

        this._btnDistance = document.getElementById(name + "_left_distance");
        this._btnAngle = document.getElementById(name + "_left_angle");
        //this._btnClearMeasure = document.getElementById(name + "_left_clear_measure");

        this._btnDihedral = document.getElementById(name + "_left_dihedral");
        this._btnInterfacial = document.getElementById(name + "_left_interfacial");


        $(this._btnRotate).button();
        $(this._btnSelect).button();
        $(this._btnMove).button();
        $(this._btnMagnify).button();
        $(this._btnDistance).button();
        $(this._btnAngle).button();
        $(this._btnClearMeasure).button();
        $(this._btnDihedral).button();
        $(this._btnInterfacial).button();

        $(this._btnRotate).css("background-image", "url(images/Icon_Rotate.png)");
        $(this._btnSelect).css("background-image", "url(images/Icon_Select.png)");
        //$(this._btnMove).css("background-image", "url(images/Icon_Translate.png)");
        //$(this._btnMagnify).css("background-image", "url(images/Icon_Magnify.png)");

        $(this._btnDistance).css("background-image", "url(images/Icon_Tool_Length.png)");
        $(this._btnAngle).css("background-image", "url(images/Icon_Tool_Angle.png)");
        //$(this._btnClearMeasure).css("background-image", "url(images/Icon_Tool_Delet.png)");

        $(this._btnDihedral).css("background-image", "url(images/Icon_Dihedral.png)");
        $(this._btnInterfacial).css("background-image", "url(images/Icon_Interfacial.png)");

        crystalMeasureTool.I = this;

        $(this._btnRotate).click(function (event) {
            crystalMeasureTool.I._app.MenuToolRotate();
            $('.cryUI_topBar_Btn_Tool').blur();
        });

        $(this._btnSelect).click(function (event) {
            crystalMeasureTool.I._app.MenuToolSelect();
            $('.cryUI_topBar_Btn_Tool').blur();
        });

        $(this._btnDistance).click(function (event) {
            crystalMeasureTool.I._app.MenuToolMeasureDistance();
            $('.cryUI_topBar_Btn_Tool').blur();
        });

        $(this._btnAngle).click(function (event) {
            crystalMeasureTool.I._app.MenuToolMeasureAngle();
            $('.cryUI_topBar_Btn_Tool').blur();
        });


        $(this._btnDihedral).click(function (event) {
            crystalMeasureTool.I._app.MenuToolMeasureAngleDihedral();
            $('.cryUI_topBar_Btn_Tool').blur();
        });
        
        $(this._btnInterfacial).click(function (event) {
            crystalMeasureTool.I._app.MenuToolMeasureAngleInterfacial();
            $('.cryUI_topBar_Btn_Tool').blur();
        });
        

    }

    /**
     * MeasureTool에 대한 html element를 작성한다.
     * 
     * @param {String} name 다른 앱과 구분하기 위한 이름
     * @returns {String} HTML 문자열
     */
    _appElementHTML(name) {

        let ihtml = [];
        let idx = 0;

        /*
        ihtml[idx] = "<table class='cryUI_leftToolbarTab'><tr>";
        idx++;
        ihtml[idx] = "<td><button title='Rotate' id='" + name + "_left_rotate' class='ui-button ui-widget ui-corner-all ui-button-icon-only cryUI_topBar_Btn_Tool'></button>Rotate</td>";
        idx++;
        ihtml[idx] = "<td><button title='Select' id='" + name + "_left_select' class='ui-button ui-widget ui-corner-all ui-button-icon-only cryUI_topBar_Btn_Tool'></button>Select</td>";
        idx++;
        ihtml[idx] = "<td><button title='Translate' id='" + name + "_left_move' class='ui-button ui-widget ui-corner-all ui-button-icon-only cryUI_topBar_Btn_Tool'></button>Translate</td>";
        idx++;
        ihtml[idx] = "<td><button title='Magnify' id='" + name + "_left_magnify' class='ui-button ui-widget ui-corner-all ui-button-icon-only cryUI_topBar_Btn_Tool'></button>Magnify</td>";
        idx++;
        ihtml[idx] = "<td><button title='Distance' id='" + name + "_left_distance' class='ui-button ui-widget ui-corner-all ui-button-icon-only cryUI_topBar_Btn_Tool'></button>Distance</td>";
        idx++;
        ihtml[idx] = "<td><button title='Angle' id='" + name + "_left_angle' class='ui-button ui-widget ui-corner-all ui-button-icon-only cryUI_topBar_Btn_Tool'></button>Angle</td>";
        idx++;
        ihtml[idx] = "<td><button title='Diheral id='" + name + "_left_diheral' class='ui-button ui-widget ui-corner-all ui-button-icon-only cryUI_topBar_Btn_Tool'></button>Diheral</td>";
        idx++;
        ihtml[idx] = "<td><button title='Interfacial' id='" + name + "_left_interfacial' class='ui-button ui-widget ui-corner-all ui-button-icon-only cryUI_topBar_Btn_Tool'></button>Interfacial</td>";
        idx++;
        ihtml[idx] = "</tr></table>";
        idx++;
        */
        ihtml[idx] = "<br/><br/><br/><br/><div align='center'>";
        idx++;
        ihtml[idx] = "<div><button title='Rotate' id='" + name + "_left_rotate' class='ui-button ui-widget ui-corner-all ui-button-icon-only cryUI_topBar_Btn_Tool'></button></div>";
        idx++;
        ihtml[idx] = "<div><button title='Select' id='" + name + "_left_select' class='ui-button ui-widget ui-corner-all ui-button-icon-only cryUI_topBar_Btn_Tool'></button></div>";
        idx++;
        ihtml[idx] = "<div><button title='Distance' id='" + name + "_left_distance' class='ui-button ui-widget ui-corner-all ui-button-icon-only cryUI_topBar_Btn_Tool'></button></div>";
        idx++;
        ihtml[idx] = "<div><button title='Angle' id='" + name + "_left_angle' class='ui-button ui-widget ui-corner-all ui-button-icon-only cryUI_topBar_Btn_Tool'></button></div>";
        idx++;
        ihtml[idx] = "<div><button title='Diheral' id='" + name + "_left_dihedral' class='ui-button ui-widget ui-corner-all ui-button-icon-only cryUI_topBar_Btn_Tool'></button></div>";
        idx++;
        ihtml[idx] = "<div><button title='Interfacial' id='" + name + "_left_interfacial' class='ui-button ui-widget ui-corner-all ui-button-icon-only cryUI_topBar_Btn_Tool'></button></div>";
        idx++;
        ihtml[idx] = "</div>";
        idx++;

        return ihtml.join("");
    }

    /**
     * 툴바 상태를 업데이트한다.
     * */
    UpdateToolbarState() {

        if (this._app._uiHandler) {


            if (this._app._uiHandler._mode === 0)
                $(this._btnRotate).addClass("cryUI_topBar_Btn_Tool_Active");
            else
                $(this._btnRotate).removeClass("cryUI_topBar_Btn_Tool_Active");

            if (this._app._uiHandler._mode === 1)
                $(this._btnSelect).addClass("cryUI_topBar_Btn_Tool_Active");
            else
                $(this._btnSelect).removeClass("cryUI_topBar_Btn_Tool_Active");

            if (this._app._uiHandler._bStartMeasureDistance)
                $(this._btnDistance).addClass("cryUI_topBar_Btn_Tool_Active");
            else
                $(this._btnDistance).removeClass("cryUI_topBar_Btn_Tool_Active");

            if (this._app._uiHandler._bStartMeasureAngle)
                $(this._btnAngle).addClass("cryUI_topBar_Btn_Tool_Active");
            else
                $(this._btnAngle).removeClass("cryUI_topBar_Btn_Tool_Active");

            if (this._app._uiHandler._bStartMeasureAngleDihedral)
                $(this._btnDihedral).addClass("cryUI_topBar_Btn_Tool_Active");
            else
                $(this._btnDihedral).removeClass("cryUI_topBar_Btn_Tool_Active");

            if (this._app._uiHandler._bStartMeasureAngleInterfacial)
                $(this._btnInterfacial).addClass("cryUI_topBar_Btn_Tool_Active");
            else
                $(this._btnInterfacial).removeClass("cryUI_topBar_Btn_Tool_Active");

        }


    }

}