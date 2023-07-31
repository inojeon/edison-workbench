
/**
 * undo �޴� Ŭ����
 * */
export class crystalTopViewUndo {

    /**
     * ������
     * @param {String} name �ٸ� �۰� �����ϱ� ���� �̸�
     * @param {crystalEditor} app ���� �� ��ü
     * @param {HTMLElement} div_elem crystalTopViewUndo�� ������ HTML Element
     */
    constructor(name, app, div_elem) {

        this._name = name;

        this._app = app;

        this._div = div_elem;

        this._div.innerHTML = this._appElementHTML(name);

        this._btnUndo = document.getElementById(name + "_top_undo");

        this._btnRedo = document.getElementById(name + "_top_redo");

        crystalTopViewUndo.I = this;

        $(this._btnUndo).button();
        $(this._btnRedo).button();

        $(this._btnUndo).css("background-image", "url(images/Icon_Undo.png");
        $(this._btnRedo).css("background-image", "url(images/Icon_Redo.png");

        $(this._btnUndo).click(function (event) {
            crystalTopViewUndo.I._app.MenuEditUndo();
            $('.cryUI_topBar_Btn_Tool').blur();
        });


        $(this._btnRedo).click(function (event) {
            crystalTopViewUndo.I._app.MenuEditRedo();
            $('.cryUI_topBar_Btn_Tool').blur();
        });
    }

    /**
     * TopViewUndo�� ���� html element�� �ۼ��Ѵ�.
     * 
     * @param {String} name �ٸ� �۰� �����ϱ� ���� �̸�
     * @returns {String} HTML ���ڿ�
     */
    _appElementHTML(name) {

        let ihtml = [];
        let idx = 0;

        ihtml[idx] = "<table class='cryUI_topToolbarTab'><tr>";
        idx++;
        ihtml[idx] = "<td><button title='Undo' id='" + name + "_top_undo' class='ui-button ui-widget ui-corner-all ui-button-icon-only cryUI_topBar_Btn_Tool'></button></td>";
        idx++;
        ihtml[idx] = "<td><button title='Redo' id='" + name + "_top_redo' class='ui-button ui-widget ui-corner-all ui-button-icon-only cryUI_topBar_Btn_Tool'></button></td>";
        idx++;
        ihtml[idx] = "</tr></table>";
        idx++;

        return ihtml.join("");
    }


    /**
     * UI ���� ������Ʈ
     * */
    UpdateUIState() {
        $('.cryUI_topBar_Btn_Tool').blur();
    }
}