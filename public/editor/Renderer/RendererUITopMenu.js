// ������ ���� �޴�
export class rendererUITopMenu {

    constructor(name, app, div_elem) {

        this._name = name;

        this._app = app;

        this._div = div_elem;

        this._div.innerHTML = this._appElementHTML(name);

        this._onMode = false;
        this._onClick = false;

        this._topFile = document.getElementById(name + "_topMenu_file");

        this._menuFile = document.getElementById(name + "_subMenu_file");

        rendererUITopMenu.I = this;

        $(this._menuFile).menu({
            select: function (event, ui) {
                let item = $(ui.item[0]).attr('value');
                rendererUITopMenu.I.HandleMenuItem(item);
            }
        });

        //��� �޴� 'File' Ŭ�� �� ����Ǵ� ����
        $(this._topFile).on("click", function (event) {
            event.preventDefault();
            rendererUITopMenu.I.HandleClickTopMenu(0);
        });

        // [File] �޴� ���� ���콺�� �÷����� �� ȣ��Ǵ� �Լ�
        $(this._topFile).on("mouseenter", function (event) {
            rendererUITopMenu.I.HandleMouseEnterTopMenu(0);
        });
        this.CalcSubMenuPos();

    }

    _appElementHTML(name) {

        let ihtml = [], idx = 0;

        // [File] �޴�
        ihtml[idx] = "<div class='rendererUI_TopMenuItem' id='" + name + "_topMenu_file'>File</div>";
        idx++;
        ihtml[idx] = "<ul class='rendererUI_TopMenuSubMenu' id='" + name + "_subMenu_file' style='display:none'>";
        idx++;
        ihtml[idx] = "<li id='" + name + "_menu_file_open' value='file_open'><div>Open</div></li>";
        idx++;
        ihtml[idx] = "</ul>";
        idx++;

        return ihtml.join('');
    }

    /**
     * ���� �޴��� ��� �ٿ� ��ġ�� ����
     * */
    CalcSubMenuPos() {
        this._menuFile.style.left = $(this._topFile).offset().left + "px";
    }

    /**
     * ������ �޴� ������ ����� �����Ų��
     * @param {any} item
     */
    HandleMenuItem(item) {
        if (item === 'file_open') {
            this._app.MenuFileOpen();
        }

        this.UpdateSubMenus(-1);
    }

    UpdateSubMenus(idx) {
        this._menuFile.style.display = (idx === 0) ? "" : "none";

        this._onMode = (idx >= 0);
    }

    HandleMouseEnterTopMenu(idx) {
        if (this._onMode)
            this.UpdateSubMenus(idx);
    }

    HandleClickTopMenu(idx) {
        this._onClick = true;

        if (this._onMode)
            this.UpdateSubMenus(-1);
        else
            this.UpdateSubMenus(idx);
    }
}