
import { AtomDef } from '../CoreCrystal/AtomDef.js';
import { rayLog } from '../Renderer/log.js';
import { crystalEditBondDialog } from './crystalEditBondDialog.js';
import { crystalEditDataDialog } from './crystalEditDataDialog.js';
import { crystalVariable } from './crystalVariable.js';

/**
 * 원소 주기율표 다이얼로그
 * */
export class crystalPeriodicDialog {

    /**
     * 생성자
     * @param {String} name 다른 앱과 구분하기 위한 이름
     * @param {crystalEditor} app 상위 앱 객체
     * @param {HTMLElement} div_elem crystalPeriodicDialog가 부착될 html element
     */
    constructor(name, app, div_elem) {

        this._name = name;

        this._app = app;

        this._div = div_elem;

        this._appElementHTML(name);

        this._show = false;

        crystalPeriodicDialog.I = this;

        this._dialog = $(this._div).dialog({
            autoOpen: false,
            width: 930,
            height: 'auto',
            modal: true,
            closeOnEscape: true,
            buttons: {
                "Close": function () {
                    crystalPeriodicDialog.I.CloseDialog();
                }
            },

            close: function () {
                crystalPeriodicDialog.I._show = false;
            },

            open: function () {

            }
        });
    }

    /**
     * PeriodicDialog에 대한 html element를 작성한다.
     * 
     * @param {String} name 다른 앱과 구분하기 위한 이름
     * @returns {String} HTML 문자열
     */
    _appElementHTML(name) {

        var ihtml = [];
        var idx = 0;

        for (var i = 0; i < 162; i++) {
            ihtml[idx] = "<div class='pTableSpace' id='" + name + "_ptee_" + i + "'></div>";
            idx++;
        }

        for (var ai in AtomDef._atomDefList) {

            var aDef = AtomDef._atomDefList[ai];

            if (aDef._group === 0 || aDef._period === 0)
                continue;

            if (aDef._atom_number) {

                var idx = (aDef._group - 1) + 18 * (aDef._period - 1);

                var css_color = "color: rgb(0, 0, 0);";
                if (aDef._color) {
                    var r = parseInt(aDef._color[0] * 255.0);
                    var g = parseInt(aDef._color[1] * 255.0);
                    var b = parseInt(aDef._color[2] * 255.0);
                    css_color = "color: rgb(" + r + "," + g + "," + b + ");";
                }

                var ehtml = "<div class='pTableElement' id='" + name + "_ptee_" + idx + "' atom_id='" + aDef._atom_id + "'>";
                ehtml += "<h4 class='periodic' id='" + name + "_favor_" + idx + "' atom_id='" + aDef._atom_id + "'>" + aDef._atom_number + "</h4>";
                ehtml += "<h3 class='periodic' style='" + css_color + "'>" + aDef._atom_id + "</h3></div>";

                ihtml[idx] = ehtml;
            }

        }

        this._div.innerHTML = ihtml.join("");

        for (var i = 0; i < 162; i++) {

            var elId = this._name + "_ptee_" + i;
            var el = document.getElementById(elId);
            if (el) {
                var cls = el.getAttribute("class");
                if (cls === "pTableElement") {
                    el.addEventListener("mousedown", function (event) {
                        var atom_id = event.currentTarget.getAttribute("atom_id");
                        if (atom_id) {
                            rayLog(3, "[DlgPeriodicTable] clicked atom " + atom_id);
                            $('#' + crystalPeriodicDialog.I._app._dlgEditData._name + "_atom_symbol").val(atom_id);
                            let color = AtomDef.GetDefWithID(atom_id.toUpperCase())._color;

                            $('#' + crystalPeriodicDialog.I._app._dlgEditData._name + "_catom_color_picker").val(crystalVariable.HTMLColorRGB(color));
                            $('#' + crystalPeriodicDialog.I._app._dlgEditData._name + "_catom_color_picker").css("background-color", "rgb(" + color[0] * 255 + "," + color[1] * 255 + "," + color[2] * 255 + ")");
                            // tr 갱신하기
                            crystalPeriodicDialog.I._app._dlgEditData.UpdateSelectedAtomByInput();

                            crystalPeriodicDialog.I.CloseDialog();
                        }
                    });
                }
            }
        }

    }


    /**
     * periodic dialog를 보여준다.
     * */
    ShowDialog() {
        if (this._show)
            return;

        // this.UpdateUI();
        this._dialog.dialog("open");
        this._show = true;
    }

    /**
     * dialog를 닫는다.
     * */
    CloseDialog() {
        this._dialog.dialog("close");
        this._show = false;
    }

    /**
     * 즐겨찾기된 atom list를 반환한다.
     * */
    _getFavorAtomList() {
        var fa_list = [];

        for (var i = 0; i < 162; i++) {
            var is_favor = false;
            var favorId = this._name + "_favor_" + i;
            var fav_el = document.getElementById(favorId);
            if (fav_el) {
                var aid = fav_el.getAttribute("atom_id");
                if (aid && fav_el.className === "periodic_favor") {
                    fa_list[aid] = aid;
                }
            }
        }

        this._fa_list = fa_list;

        return fa_list;
    }
}