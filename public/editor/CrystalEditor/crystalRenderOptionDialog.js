import { rayLog } from "../Renderer/log.js";
import { crystalVariable } from "./crystalVariable.js";

/**
 * Render Options 설정을 위한 다이얼로그 UI 클래스
 * */
export class crystalRenderOptionDialog {

    /**
     * UI 초기화를 진행한다
     * @param {String} name 다른 앱과 구분하기 위한 이름
     * @param {crystalEditor} app 상위 앱 객체
     * @param {HTMLElement} div_elem cadUIDlgSetting이 부착될 HTML Element
     */
    constructor(name, app, div_elem) {

        // 앱 이름
        this._name = name;
        // 앱
        this._app = app;
        // 앱 루트 HTML DIV
        this._div = div_elem;

        // 다이얼로그 보이기 플래그
        this._show = false;


        this._selectedColorBackground = [0, 0, 0];


        this._div.innerHTML = this._appElementHTML(name);

        this._tabsPref = document.getElementById(name + "_render_option_Tabs");
        this._divPrefViewer = document.getElementById(name + "_render_option_Tab1");

        this._colorBackground = document.getElementById(name + "_render_option_color_background");
        this._checkShowAxis = document.getElementById(name + "_render_option_check_show_axis");
        this._dropLighting = document.getElementById(name + "_render_option_lighting");

        this._dropCameraType = document.getElementById(name + "_render_option_camera_type");
        this._dropAntialiasing = document.getElementById(name + "_render_option_antialiasing");
        this._dropAtomStyle = document.getElementById(name + "_render_option_atom_style");
        this._dropBondStyle = document.getElementById(name + "_render_option_bond_style");

        crystalRenderOptionDialog.I = this;

        this._dialog = $(this._div).dialog({
            autoOpen: false,
            height: "auto",
            width: "auto",
            modal: false,
            closeOnEscape: true,
            resizable: false,
            title: "Render Options",
            buttons: {
                "Restore Defaults": function () {
                    crystalRenderOptionDialog.I.RestoreDefaults();
                },
                "OK": function () {
                    crystalRenderOptionDialog.I.OnApply();
                    crystalRenderOptionDialog.I._dialog.dialog("close");
                },
                "Cancel": function () {
                    crystalRenderOptionDialog.I._dialog.dialog("close");
                },
                "Apply": function () {
                    crystalRenderOptionDialog.I.OnApply();
                }
            },
            close: function () {
                crystalRenderOptionDialog.I._show = false;
            }
        });


        $(this._tabsPref).tabs({
            active: 0
        });

        $(this._colorBackground).colorpicker({
            modal: true,
            buttonColorize: true,
            buttonImageOnly: true,
            ok: function (event, formatted) {
                event.target.style.backgroundColor = formatted.css;
                crystalRenderOptionDialog.I.OnChangeColorBackground([formatted.rgb["r"], formatted.rgb["g"], formatted.rgb["b"]]);
            }
        });

        $(this._checkShowAxis).checkboxradio();

        $(this._dropLighting).selectmenu({
            width: '128px',
            change: function (event, ui) {
                crystalRenderOptionDialog.I.OnChangeLightingMode(crystalRenderOptionDialog.I._dropLighting.value);
            }
        });

        $(this._dropCameraType).selectmenu({
            width: '128px',
            change: function (event, ui) {
                crystalRenderOptionDialog.I.OnChangeCameraType(crystalRenderOptionDialog.I._dropCameraType.value);
            }
        });

        $(this._dropAntialiasing).selectmenu({
            width: '128px',
            change: function (event, ui) {
                crystalRenderOptionDialog.I.OnChangeAntialiasingMode(crystalRenderOptionDialog.I._dropAntialiasing.value);
            }
        });
        $(this._dropAtomStyle).selectmenu({
            width: '128px',
            change: function (event, ui) {
                crystalRenderOptionDialog.I.OnChangeAtomStyle(crystalRenderOptionDialog.I._dropAtomStyle.value);
            }
        });
        $(this._dropBondStyle).selectmenu({
            width: '128px',
            change: function (event, ui) {
                crystalRenderOptionDialog.I.OnChangeBondStyle(crystalRenderOptionDialog.I._dropBondStyle.value);
            }
        });

    };


    /**
     * Setting Dialog에 대한 html element를 작성한다
     * 
     * @param {String} name 다른 앱과 구분하기 위한 이름
     * @return {String} HTML 문자열
     */
    _appElementHTML(name) {

        var ihtml = [];

        var idx = 0;

        ihtml[idx] = "<div id='" + name + "_render_option_Tabs'>";
        idx++;
        ihtml[idx] = "<ul>";
        idx++;
        ihtml[idx] = "<li><a href='#" + name + "_render_option_Tab1' class='cryUI_TabBtn'>Environment</a></li>";
        idx++;
        ihtml[idx] = "<li><a href='#" + name + "_render_option_Tab2' class='cryUI_TabBtn'>Options</a></li>";
        idx++;
        ihtml[idx] = "</ul>";
        idx++;

        ihtml[idx] = "<div id='" + name + "_render_option_Tab1' class='cryUI_Tabs'>";
        idx++;
        ihtml[idx] = "<fieldset><table width='320px' height='200px'>";
        idx++;
        ihtml[idx] = "<tr><td class='cryUI_DropTitle'>Background Color</td>";
        idx++;
        ihtml[idx] = "<td><input type='text' id='" + name + "_render_option_color_background' class='cryUI_Widget_Spin'></td></tr>";
        idx++;
        ihtml[idx] = "<tr><td class='cryUI_DropTitle'>Show Axis</td>";
        idx++;
        ihtml[idx] = "<td><label for='" + name + "_render_option_check_show_axis'></label><input type='checkbox' id='" + name + "_render_option_check_show_axis'></td></tr>";
        idx++;
        ihtml[idx] = "<tr><td class='cryUI_DropTitle'>Lighting Option</td>";
        idx++;
        ihtml[idx] = "<td><select id='" + name + "_render_option_lighting' class='cryUI_Widget_Spin'>";
        idx++;
        ihtml[idx] = "<option value='1'>Light Option 1</option><option value='2'>Light Option 2</option><option value='3'>Light Option 3</select></td></tr>";
        idx++;
        ihtml[idx] = "<tr><td class='cryUI_DropTitle'></td><td>&nbsp;</td></tr>";
        idx++;
        ihtml[idx] = "</table></fieldset></div>";
        idx++;

        ihtml[idx] = "<div id='" + name + "_render_option_Tab2' class='cryUI_Tabs'>";
        idx++;
        ihtml[idx] = "<fieldset><table width='320px' height='200px'>";
        idx++;
        ihtml[idx] = "<tr><td class='cryUI_DropTitle'>Camera Type</td>";
        idx++;
        ihtml[idx] = "<td><select id='" + name + "_render_option_camera_type' class='cryUI_Widget_Spin'>";
        idx++;
        ihtml[idx] = "<option value='0'>Orthogonal</option><option value='1'>Perspective</option></select></td></tr>";
        idx++;
        ihtml[idx] = "<tr><td class='cryUI_DropTitle'>Anti-Aliasing</td>";
        idx++;
        ihtml[idx] = "<td><select id='" + name + "_render_option_antialiasing' class='cryUI_Widget_Spin'>";
        idx++;
        ihtml[idx] = "<option value='1'>On</option><option value='0'>Off</option></select></td></tr>";
        idx++;
        ihtml[idx] = "<tr><td class='cryUI_DropTitle'>Atom Style</td>";
        idx++;
        ihtml[idx] = "<td><select id='" + name + "_render_option_atom_style' class='cryUI_Widget_Spin'>";
        idx++;
        ihtml[idx] = "<option value='1'>Normal</option><option value='0'>Flat</option></select></td></tr>";
        idx++;
        ihtml[idx] = "<tr><td class='cryUI_DropTitle'>Bond Style</td>";
        idx++;
        ihtml[idx] = "<td><select id='" + name + "_render_option_bond_style' class='cryUI_Widget_Spin'>";
        idx++;
        ihtml[idx] = "<option value='1'>Normal</option><option value='0'>Flat</option></select></td></tr>";
        idx++;
        ihtml[idx] = "</table></fieldset></div>";
        idx++;

        ihtml[idx] = "</div>";
        idx++;

        return ihtml.join("");
    };

    /**
     * UI를 갱신한다
     * */
    UpdateUI() {

        if (!this._app._renderOptions)
            return;

        const renderOptions = this._app._renderOptions;

        this._selectedColorBackground = [renderOptions.BackgroundColor[0], renderOptions.BackgroundColor[1], renderOptions.BackgroundColor[2]];
        var c_back = crystalVariable.HTMLColorRGB(this._selectedColorBackground);
        $(this._colorBackground).prop("value", c_back);
        $(this._colorBackground).css("background-color", "#" + c_back);

        $(this._checkShowAxis).prop("checked", (renderOptions.ShowAxis === 1));
        $(this._checkShowAxis).checkboxradio("refresh");

        $(this._dropLighting).val(renderOptions.LightingMode);
        $(this._dropLighting).selectmenu("refresh");

        $(this._dropCameraType).val(renderOptions.CameraType);
        $(this._dropCameraType).selectmenu("refresh");

        $(this._dropAntialiasing).val(renderOptions.Antialiasing);
        $(this._dropAntialiasing).selectmenu("refresh");

        $(this._dropAtomStyle).val(renderOptions.AtomStyle);
        $(this._dropAtomStyle).selectmenu("refresh");

        $(this._dropBondStyle).val(renderOptions.BondStyle);
        $(this._dropBondStyle).selectmenu("refresh");
    };

    /**
     * Setting 기본값을 복원한다
     * */
    RestoreDefaults() {
        this._app.InitRenderOptions();
        this.UpdateUI();
    };

    /**
     * 설정값을 적용한다
     * */
    OnApply() {

        if (!this._app._renderOptions)
            return;

        const renderOptions = this._app._renderOptions;

        renderOptions.BackgroundColor = [this._selectedColorBackground[0], this._selectedColorBackground[1], this._selectedColorBackground[2]];
        renderOptions.ShowAxis = $(this._checkShowAxis).prop("checked") ? 1 : 0;
        renderOptions.LightingMode = parseInt($(this._dropLighting).val());
        renderOptions.CameraType = parseInt($(this._dropCameraType).val());
        renderOptions.Antialiasing = parseInt($(this._dropAntialiasing).val());
        renderOptions.AtomStyle = parseInt($(this._dropAtomStyle).val());
        renderOptions.BondStyle = parseInt($(this._dropBondStyle).val());

        rayLog(3, "[renderoption] change applied JSON " + JSON.stringify(renderOptions));

        this._app.UpdateRenderOptions();
        this._app.UpdateUI();
    };

    /**
     * 배경색을 변경한다
     * @param {Color} col 색상값
     */
    OnChangeColorBackground(col) {
        rayLog(3, "[renderoption] change color background " + col[0] + "," + col[1] + "," + col[2]);
        this._selectedColorBackground = col;
    };

    OnChangeLightingMode(val) {
        rayLog(3, "[renderoption] change lighting mode " + val);
    }

    OnChangeCameraType(val) {
        rayLog(3, "[renderoption] change camera type " + val);
    }

    OnChangeAntialiasingMode(val) {
        rayLog(3, "[renderoption] change anti-aliasing mode " + val);
    }

    OnChangeAtomStyle(val) {
        rayLog(3, "[renderoption] change atom style " + val);
    }

    OnChangeBondStyle(val) {
        rayLog(3, "[renderoption] change bond style " + val);
    }

    /**
     * setting dialog를 보여준다
     * */
    ShowDialog() {
        if (this._show)
            return;

        this.UpdateUI();
        this._dialog.dialog("open");
        this._show = true;
    }

    /**
     * dialog를 닫는다
     * */
    CloseDialog() {
        this._dialog.dialog("close");
        this._app.UpdateUI();
    }


}
