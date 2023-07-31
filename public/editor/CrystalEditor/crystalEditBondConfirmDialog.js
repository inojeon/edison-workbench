
/**
 * ������ Clear ���̾�α�
 * */
export class crystalEditBondConfirmDialog {

    /**
     * ������
     * @param {String} name �ٸ� �۰� �����ϱ� ���� �̸�
     * @param {crystalEditor} app ���� �� ��ü
     * @param {HTMLElement} div_elem EditBondConfirmDialog�� ������ html element
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
     * EditBondConfirmDialog�� ���� html element�� �ۼ��Ѵ�.
     * 
     * @param {String} name �ٸ� �۰� �����ϱ� ���� �̸�
     * @returns {String} HTML ���ڿ�
     */
    _appElementHTML(name) {

        var ihtml = [];

        var idx = 0;

        ihtml[idx] = "<div>Are you sure to clear all bonds?</div>"
        idx++;

        return ihtml.join("");
    };

    /**
     * edit Bond confirm dialog�� ����.
     * */
    ShowDialog() {
        if (this._show)
            return;

        this._dialog.dialog("open");
        this._show = true;
    }


    /**
     * ���̾�α� â�� �ݴ´�.
     *
     * @memberof crystalEditBondConfirmDialog
     */
    CloseDialog() {
        this._dialog.dialog("close");
        this._show = false;
    }

    /**
     * ���� ���¸� �����Ѵ�.
     * */
    OnApply() {

        crystalEditBondConfirmDialog.I._app._csManager._cs.clearBond();
        crystalEditBondConfirmDialog.I._app._dlgEditBond._bondTable.clearAll();

        crystalEditBondConfirmDialog.I._app._dlgEditBond.DisableInput(true);

        crystalEditBondConfirmDialog.I._app._dlgEditBond.generateStructure();
    }
}