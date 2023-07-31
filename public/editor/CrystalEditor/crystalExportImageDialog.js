import { rayLog } from '../Renderer/log.js';

/**
 * 이미지를 외부로 내보내기 위한 UI 클래스
 */
export class crystalExportImageDialog {

    /**
     * UI 초기화를 진행한다
     * @param {String} name 다른 앱과 구분하기 위한 이름
     * @param {cryUIApp} app 상위 앱 객체
     * @param {HTMLElement} div_elem cryUIDlgExportImage가 부착될 HTML Element
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


        this._div.innerHTML = this._appElementHTML(name);

        this._btnRadioByPixel = document.getElementById(name + "_radio_export_pixel");
        this._btnRadioByDPI = document.getElementById(name + "_radio_export_dpi");

        this._tabPixel = document.getElementById(name + "_tab_export_pixel");
        this._tabDPI = document.getElementById(name + "_tab_export_dpi");

        $(this._btnRadioByPixel).checkboxradio();
        $(this._btnRadioByDPI).checkboxradio();


        this._spinPixelWidth = document.getElementById(name + "_export_pixel_width");
        this._spinPixelHeight = document.getElementById(name + "_export_pixel_height");
        this._spinDPIWidth = document.getElementById(name + "_export_dpi_width");
        this._spinDPIHeight = document.getElementById(name + "_export_dpi_height");

        this._dropDPI = document.getElementById(name + "_export_dpi_select");


        this._imgWidth = "";
        this._imgHeight = "";


        crystalExportImageDialog.I = this;

        this._dialog = $(this._div).dialog({
            autoOpen: false,
            height: "auto",
            width: "auto",
            modal: true,
            closeOnEscape: true,
            resizable: false,
            title: "Export Image",
            buttons: {
                "OK": function () {
                    crystalExportImageDialog.I.OnOK();
                },

                "Cancel": function () {
                    crystalExportImageDialog.I._dialog.dialog("close");
                }
            },
            close: function () {
                crystalExportImageDialog.I._show = false;
            }
        });


        $(this._btnRadioByPixel).click(function (event) {
            crystalExportImageDialog.I._tabPixel.style.display = "block";
            crystalExportImageDialog.I._tabDPI.style.display = "none";
        });

        $(this._btnRadioByDPI).click(function (event) {
            crystalExportImageDialog.I._tabPixel.style.display = "none";
            crystalExportImageDialog.I._tabDPI.style.display = "block";
        });


        $(this._spinPixelWidth).spinner({
            min: 32,
            max: 4096,
            step: 1
        });
        $(this._spinPixelWidth).spinner("value", 1024);

        $(this._spinPixelHeight).spinner({
            min: 32,
            max: 4096,
            step: 1
        });
        $(this._spinPixelHeight).spinner("value", 768);

        $(this._spinDPIWidth).spinner({
            min: 1,
            max: 30,
            step: 0.1
        });
        $(this._spinDPIWidth).spinner("value", 29.7);

        $(this._spinDPIHeight).spinner({
            min: 1,
            max: 30,
            step: 0.1
        });
        $(this._spinDPIHeight).spinner("value", 21.0);
        
        $(this._dropDPI).selectmenu({
            width: '112px'
        });


        $(this._btnRadioByPixel).prop("checked", true);
        $(this._btnRadioByPixel).checkboxradio("refresh");
        this._tabPixel.style.display = "block";
        this._tabDPI.style.display = "none";


        //this.ShowDialog();
    }

    /**
     * DlgExportImage에 대한 html element를 작성한다  
     * @param {String} name 다른 앱과 구분하기 위한 이름 
     * @returns {String} HTML 문자열
     */
    _appElementHTML(name) {

        var ihtml = [];

        var idx = 0;

        ihtml[idx] = "<fieldset><table width='256px' height='200px' class='cryUI_Dlgs'><tr>";
        idx++;
        ihtml[idx] = "<td class='cryUI_Widget_Spin'><label for='" + name + "_radio_export_pixel'>By Pixel</label>";
        idx++;
        ihtml[idx] = "<input type='radio' name='" + name + "_radio_export_by' id='" + name + "_radio_export_pixel'></td>";
        idx++;
        ihtml[idx] = "<td class='cryUI_Widget_Spin'><label for='" + name + "_radio_export_dpi'>By DPI</label>";
        idx++;
        ihtml[idx] = "<input type='radio' name='" + name + "_radio_export_by' id='" + name + "_radio_export_dpi'></td></tr>";
        idx++;

        ihtml[idx] = "<tr><td colspan='2'>";
        idx++;
        ihtml[idx] = "<div id='" + name + "_tab_export_pixel'><fieldset><table height='120px'>";
        idx++;
        ihtml[idx] = "<tr><td class='cryUI_DropTitle3'>Width</td><td><input id='" + name + "_export_pixel_width' class='cryUI_Widget_Spin'></td></tr>";
        idx++;
        ihtml[idx] = "<tr><td class='cryUI_DropTitle3'>Height</td><td><input id='" + name + "_export_pixel_height' class='cryUI_Widget_Spin'></td></tr>";
        idx++;
        ihtml[idx] = "<tr><td colspan='2'></td></tr></table></fieldset></div>";
        idx++;

        ihtml[idx] = "<div id='" + name + "_tab_export_dpi'><fieldset><table height='120px'>";
        idx++;
        ihtml[idx] = "<tr><td class='cryUI_DropTitle3'>DPI</td><td><select id='" + name + "_export_dpi_select' class='cryUI_Widget_Spin'>";
        idx++;
        ihtml[idx] = "<option value='150'>150</option><option value='300' selected>300</option><option value='600'>600</option></td></tr>";
        idx++;
        ihtml[idx] = "<tr><td class='cryUI_DropTitle3'>Width (CM)</td><td><input id='" + name + "_export_dpi_width' class='cryUI_Widget_Spin'></td></tr>";
        idx++;
        ihtml[idx] = "<tr><td class='cryUI_DropTitle3'>Height (CM)</td><td><input id='" + name + "_export_dpi_height' class='cryUI_Widget_Spin'></td></tr>";
        idx++;
        ihtml[idx] = "</table></fieldset></div></td></tr></table></fieldset>";
        idx++;

        return ihtml.join("");
    }

    /**
     * UI update를 수행한다
     * */
    UpdateUI() {
    }

    /**
     * 이미지 사이즈를 계산한다
     */
    CalcImageSize() {

        if ($(this._btnRadioByPixel).prop("checked")) {
            this._imgWidth = Number($(this._spinPixelWidth).val());
            this._imgHeight = Number($(this._spinPixelHeight).val());
        } else {
            var dpi = Number($(this._dropDPI).val());
            var cmw = Number($(this._spinDPIWidth).val());
            var cmh = Number($(this._spinDPIHeight).val());
            var pw = cmw / 2.54 * dpi;
            var ph = cmh / 2.54 * dpi;
            this._imgWidth =  pw;
            this._imgHeight = ph;
        }

    }

    /**
     * 이미지 내보내기 기능을 수행한다 
     */
    OnOK() {

        this.CalcImageSize();

        rayLog(3, "Export Image with size = " + this._imgWidth + this._imgHeight);

        this._app.ExportRenderImage(this._imgWidth, this._imgHeight);

        this.CloseDialog();
    }

    /**
     * 다이얼로그를 띄운다
     */
    ShowDialog() {
        if (this._show)
            return;

        this.UpdateUI();
        this._dialog.dialog("open");
        this._show = true;
    }

    /**
     * 다이얼로그를 숨긴다
     */
    CloseDialog() {
        this._dialog.dialog("close");
        this._app.UpdateUI();
    }

}
