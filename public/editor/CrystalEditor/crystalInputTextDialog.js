/**
 * atom text 데이터 다이얼로그
 * */
export class crystalInputTextDialog {
    /**
     * 생성자
     * @param {String} name 다른 앱과 구분하기 위한 이름
     * @param {crystalEditor} app 상위 앱 객체
     * @param {HTMLElement} div_elem crystalInputTextDialog가 부착될 HTML Element
     */
    constructor(name, app, div_elem) {

        this._name = name;

        this._app = app;

        this._div = div_elem;

        this._div.innerHTML = this._appElementHTML(name);

        crystalInputTextDialog.I = this;

        this._dialog = $(this._div).dialog({
            autoOpen: false,
            maxHeight: 240,
            height: 240,
            maxWidth: 400,
            width: 400,
            modal: true,
            closeOnEscape: true,
            resizable: false,
            title: "Text Input Dialog",
            buttons: {
                "OK": function () {
                    crystalInputTextDialog.I.OnApply();
                    crystalInputTextDialog.I.CloseDialog();
                },

                "Cancel": function () {
                    crystalInputTextDialog.I.CloseDialog();
                },
            },

            close: function () {
                crystalInputTextDialog.I._show = false;
            }
        });

        this._inputTxt = document.getElementById(name + "_atom_data_input_text");
    }

    /**
     * InputTextDialog에 대한 html element를 작성한다.
     *
     * @param {String} name 다른 앱과 구분하기 위한 이름
     * @returns {String} HTML 문자열
     */
    _appElementHTML(name) {
        let ihtml = [];
        let idx = 0;

        ihtml[idx] = "<div>";
        idx++;
        ihtml[idx] = "<textarea class='cryUI_InputTextDialog' id='" + name + "_atom_data_input_text' type='text'></textarea>";
        idx++;
        ihtml[idx] = "</div>";
        idx++;

        return ihtml.join("");
    }

    /**
     * 다이얼로그를 띄운다.
     * */
    ShowDialog() {
        if (this._show)
            return;

        this._dialog.dialog("open");
        this._show = true;
    }

    /**
     * 다이얼로그를 닫는다.
     * */
    CloseDialog() {
        this._dialog.dialog("close");
        this._show = false;
        this._app.UpdateUI();
    }

    /**
     * 다이얼로그 내역을 적용시킨다.
     * */
    OnApply() {
        let txt = $(this._inputTxt).val();

        if (txt.length > 0)
            this._app._dlgEditData._bModified = true;
        crystalInputTextDialog.I._app.LoadAtomFromTxt(txt);
    }
}