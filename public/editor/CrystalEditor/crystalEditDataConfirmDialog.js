/**
 * 데이터 Clear 다이얼로그
 * */
export class crystalEditDataConfirmDialog {

    /**
     * 생성자
     * @param {String} name 다른 앱과 구분하기 위한 이름
     * @param {crystalEditor} app 상위 앱 객체
     * @param {HTMLElement} div_elem EditDataConfirmDialog가 부착될 html element
     */
    constructor(name, app, div_elem) {

        this._name = name;

        this._app = app;

        this._div = div_elem;

        this._show = false;

        this._div.innerHTML = this._appElementHTML(name);

        crystalEditDataConfirmDialog.I = this;

        this._dialog = $(this._div).dialog({
            autoOpen: false,
            maxWidth: 200,
            maxHeight: 120,
            width: 200,
            height: 120,
            modal: true,
            closeOnEscape: true,
            resizable: false,
            title: "Clear Data",
            buttons: {
                "OK": function () {
                    crystalEditDataConfirmDialog.I._app._csManager.AddUndo();
                    crystalEditDataConfirmDialog.I.OnApply();
                    crystalEditDataConfirmDialog.I._app._dlgEditVectors.RestoreAddedVectorFromCS();
                    crystalEditDataConfirmDialog.I.CloseDialog();
                },
                "Cancel": function () {
                    crystalEditDataConfirmDialog.I.CloseDialog();
                },
            },
            close: function () {
                crystalEditDataConfirmDialog.I._show = false;
            },
        });

    }

    /**
     * EditDataConfirmDialog에 대한 html element를 작성한다.
     * 
     * @param {String} name 다른 앱과 구분하기 위한 이름
     * @returns {String} HTML 문자열
     */
    _appElementHTML(name) {

        var ihtml = [];

        var idx = 0;

        ihtml[idx] = "<div>Are you sure to clear all atoms?</div>"
        idx++;

        return ihtml.join("");
    };

    /**
     * edit data confirm dialog를 띄운다.
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
     * @memberof crystalEditDataConfirmDialog
     */
    CloseDialog() {
        this._dialog.dialog("close");
        this._show = false;
    }

    /**
     * 현재 상태를 적용한다.
     * */
    OnApply() {
        crystalEditDataConfirmDialog.I._app._csManager._cs.clearAtom();
        crystalEditDataConfirmDialog.I._app._dlgEditData._atomTable.clearAll();

        crystalEditDataConfirmDialog.I._app._csManager._cs.clearBond();
        crystalEditDataConfirmDialog.I._app._dlgEditBond._bondTable.clearAll();

        crystalEditDataConfirmDialog.I._app._dlgEditData.DisableInput(true);
        crystalEditDataConfirmDialog.I._app._dlgEditBond.DisableInput(true);
        crystalEditDataConfirmDialog.I._app._dlgEditData.DisableAnisotropicInput(true);

        crystalEditDataConfirmDialog.I._app._dlgEditData.generateStructure();
        crystalEditDataConfirmDialog.I._app._dlgEditData.SetTab4Size();
        crystalEditDataConfirmDialog.I._app._dlgEditBond.UpdateTable();
    }
}