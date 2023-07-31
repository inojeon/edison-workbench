
/**
 * 데이터 Clear 다이얼로그
 * */
export class crystalEditBondConfirmDialog {

    /**
     * 생성자
     * @param {String} name 다른 앱과 구분하기 위한 이름
     * @param {crystalEditor} app 상위 앱 객체
     * @param {HTMLElement} div_elem EditBondConfirmDialog가 부착될 html element
     * */
    constructor(name, app, div_elem) {

        this._name = name;

        this._app = app;

        this._div = div_elem;

        this._show = false;

        this._div.innerHTML = this._appElementHTML(name);

        crystalEditBondConfirmDialog.I = this;

        this._dialog = $(this._div).dialog({
            autoOpen: false,
            maxWidth: 200,
            maxHeight: 120,
            width: 200,
            height: 120,
            modal: true,
            closeOnEscape: true,
            resizable: false,
            title: "Clear Bond",
            buttons: {
                "OK": function () {
                    crystalEditBondConfirmDialog.I._app._csManager.AddUndo();
                    crystalEditBondConfirmDialog.I.OnApply();
                    crystalEditBondConfirmDialog.I._app._dlgEditVectors.RestoreAddedVectorFromCS();
                    crystalEditBondConfirmDialog.I.CloseDialog();
                },
                "Cancel": function () {
                    crystalEditBondConfirmDialog.I.CloseDialog();
                },
            },
            close: function () {
                crystalEditBondConfirmDialog.I._show = false;
            },
        });

    }

    /**
     * EditBondConfirmDialog에 대한 html element를 작성한다.
     * 
     * @param {String} name 다른 앱과 구분하기 위한 이름
     * @returns {String} HTML 문자열
     */
    _appElementHTML(name) {

        var ihtml = [];

        var idx = 0;

        ihtml[idx] = "<div>Are you sure to clear all bonds?</div>"
        idx++;

        return ihtml.join("");
    };

    /**
     * edit Bond confirm dialog를 띄운다.
     * */
    ShowDialog() {
        if (this._show)
            return;

        this._dialog.dialog("open");
        this._show = true;
    }


    /**
     * 다이얼로그 창을 닫는다.
     *
     * @memberof crystalEditBondConfirmDialog
     */
    CloseDialog() {
        this._dialog.dialog("close");
        this._show = false;
    }

    /**
     * 현재 상태를 적용한다.
     * */
    OnApply() {

        crystalEditBondConfirmDialog.I._app._csManager._cs.clearBond();
        crystalEditBondConfirmDialog.I._app._dlgEditBond._bondTable.clearAll();

        crystalEditBondConfirmDialog.I._app._dlgEditBond.DisableInput(true);

        crystalEditBondConfirmDialog.I._app._dlgEditBond.generateStructure();
    }
}