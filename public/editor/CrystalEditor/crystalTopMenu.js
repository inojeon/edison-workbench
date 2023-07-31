/**
 * 상단 메뉴 클래스
 * */
export class crystalTopMenu {

    /**
     * 생성자
     * @param {String} name 다른 앱과 구분하기 위한 이름
     * @param {crystalEditor} app 상위 앱 객체
     * @param {HTMLElement} div_elem crystalTopMenu가 부착될 HTML Element
     */
    constructor(name, app, div_elem) {

        this._name = name;

        this._app = app;

        this._div = div_elem;

        this._div.innerHTML = this._appElementHTML(name);

        this._onMode = false;

        this._onClick = false;

        crystalTopMenu.I = this;

        // File 최상위 메뉴 버튼
        this._topFile = document.getElementById(name + "_topMenu_file");

        // File 서브 메뉴 아이템
        this._menuFile = document.getElementById(name + "_subMenu_file");

        // Edit 최상위 메뉴 버튼
        this._topEdit = document.getElementById(name + "_topMenu_edit");

        // Edit 서브 메뉴 버튼
        this._menuEdit = document.getElementById(name + "_subMenu_edit");

        // Data 최상위 메뉴 버튼
        this._topData = document.getElementById(name + "_topMenu_data");

        // Data 서브 메뉴 버튼
        this._menuData = document.getElementById(name + "_subMenu_data");

        // View 최상위 메뉴 버튼
        this._topView = document.getElementById(name + "_topMenu_view");

        // View 서브 메뉴 버튼
        this._menuView = document.getElementById(name + "_subMenu_view");


        $(this._menuFile).menu({
            select: function (event, ui) {
                let item = $(ui.item[0]).attr("value");
                crystalTopMenu.I.HandleMenuItem(item);
            }
        });

        $(this._menuEdit).menu({
            select: function (event, ui) {
                let item = $(ui.item[0]).attr("value");
                crystalTopMenu.I.HandleMenuItem(item);
            }
        });

        $(this._menuData).menu({
            select: function (event, ui) {
                let item = $(ui.item[0]).attr("value");
                crystalTopMenu.I.HandleMenuItem(item);
            }
        });

        $(this._menuView).menu({
            select: function (event, ui) {
                let item = $(ui.item[0]).attr("value");
                crystalTopMenu.I.HandleMenuItem(item);
            }
        })

        $(this._topFile).on("mouseenter", function (event) {
            crystalTopMenu.I.HandleMouseEnterTopMenu(0);
        });

        $(this._topEdit).on("mouseenter", function (event) {
            crystalTopMenu.I.HandleMouseEnterTopMenu(1);
        });

        $(this._topData).on("mouseenter", function (event) {
            crystalTopMenu.I.HandleMouseEnterTopMenu(2);
        });

        $(this._topView).on("mouseenter", function (event) {
            crystalTopMenu.I.HandleMouseEnterTopMenu(3);
        });

        $(this._topFile).on("click", function (event) {
            event.preventDefault();
            crystalTopMenu.I.HandleClickTopMenu(0);
        });

        $(this._topEdit).on("click", function (event) {
            event.preventDefault();
            crystalTopMenu.I.HandleClickTopMenu(1);
        });

        $(this._topData).on("click", function (event) {
            event.preventDefault();
            crystalTopMenu.I.HandleClickTopMenu(2);
        });

        $(this._topView).on("click", function (event) {
            event.preventDefault();
            crystalTopMenu.I.HandleClickTopMenu(3);
        });


        window.addEventListener("click", function (event) {
            if (!crystalTopMenu.I._onClick)
                crystalTopMenu.I.UpdateSubMenus(-1);

            crystalTopMenu.I._onClick = false;
        });

        this.CalcSubMenuPos();
    }

    /**
     * TopMenu에 대한 html element를 작성한다.
     * 
     * @param {String} name 다른 앱과 구분하기 위한 이름
     * @returns {String} HTML 문자열
     */
    _appElementHTML(name) {

        let ihtml = [];

        let idx = 0;

        ihtml[idx] = "<div class='cryUI_TopMenuItem' id='" + name + "_topMenu_file'>File</div>";
        idx++;

        // File 서브 메뉴
        ihtml[idx] = "<ul class='cryUI_TopMenuSubMenu' id='" + name + "_subMenu_file' style='display:none'>";
        idx++;
        ihtml[idx] = "<li id='" + name + "_menu_file_new' value='file_new'><div>New</div></li>";
        idx++;
        /*        
        ihtml[idx] = "<li id='" + name + "_menu_file_open_cif' value='file_open_cif'><div>Open CIF</div></li>";
        idx++;
        */
        ihtml[idx] = "<li id='" + name + "_menu_file_open' value='file_open'><div>Open KCS</div></li>";
        idx++;
        ihtml[idx] = "<li id='" + name + "_menu_file_save' value='file_save'><div>Save KCS</div></li>";
        idx++;
        
        ihtml[idx] = "<li id='" + name + "_menu_file_import'><div>Import</div>";
        idx++;
        ihtml[idx] = "<ul><li value='file_import_cif'><div><span id='" + name + "_menu_file_import_cif'></span>Import CIF</div></li>";
        idx++;
        ihtml[idx] = "<li value='file_import_mol'><div><span id='" + name + "_menu_file_import_mol'></span>Import MOL</div></li>";
        idx++;
        ihtml[idx] = "</ul></li>";
        idx++;
        ihtml[idx] = "<li id='" + name + "_menu_file_export'><div>Export</div>";
        idx++;
        ihtml[idx] = "<ul><li value='file_export_cif'><div><span id='" + name + "_menu_file_export_cif'></span>Export CIF</div></li>";
        idx++;
        ihtml[idx] = "<li value='file_export_mol'><div><span id='" + name + "_menu_file_export_mol'></span>Export MOL</div></li>";
        idx++;
        ihtml[idx] = "<li value='file_export_obj'><div><span id='" + name + "_menu_file_export_obj'></span>Export OBJ</div></li>";
        idx++;
        ihtml[idx] = "</ul></li>";
        idx++;
        ihtml[idx] = "<li id='" + name + "_menu_file_save_render_image' value='file_save_render_image'><div>Save Render Image</div></li>";
        idx++;
        ihtml[idx] = "</ul>";
        idx++;


        // Edit 서브 메뉴
        ihtml[idx] = "<div class='cryUI_TopMenuItem' id='" + name + "_topMenu_edit'>Edit</div>";
        idx++;
        ihtml[idx] = "<ul class='cryUI_TopMenuSubMenu' id='" + name + "_subMenu_edit' style='display:none'>";
        idx++;
        ihtml[idx] = "<li id='" + name + "_menu_edit_undo' value='edit_undo'><div>Undo</div></li>";
        idx++;
        ihtml[idx] = "<li id='" + name + "_menu_edit_redo' value='edit_redo'><div>Redo</div></li>";
        idx++;
        ihtml[idx] = "</ul>";
        idx++;


        ihtml[idx] = "</ul>";
        idx++;

        // Data 서브 메뉴
        ihtml[idx] = "<div class='cryUI_TopMenuItem' id='" + name + "_topMenu_data'>Data</div>";
        idx++;
        ihtml[idx] = "<ul class='cryUI_TopMenuSubMenu' id='" + name + "_subMenu_data' style='display:none'>";
        idx++;
        ihtml[idx] = "<li id='" + name + "_menu_data_info' value='data_info'><div>Edit Info</div></li>";
        idx++;
        ihtml[idx] = "<li id='" + name + "_menu_data_unitcell' value='data_unitcell'><div>Edit Unitcell</div></li>";
        idx++;
        ihtml[idx] = "<li id='" + name + "_menu_data_cstructre' value='data_cstructure'><div>Edit CStructure</div></li>";
        idx++;
        ihtml[idx] = "<li id='" + name + "_menu_data_crystal_shape' value='data_crystal_shape'><div>Edit CrystalShape</div></li>";
        idx++;
        ihtml[idx] = "<li id='" + name + "_menu_data_bond' value='data_bond'><div>Edit Bond</div></li>";
        idx++;
        ihtml[idx] = "<li id='" + name + "_menu_data_vector' value='data_vector'><div>Edit Vectors</div></li>";
        idx++;
        ihtml[idx] = "<li id='" + name + "_menu_data_lattice_plane' value='data_lattice_plane'><div>Edit Lattice Plane</div></li>";
        idx++;
        ihtml[idx] = "<li id='" + name + "_menu_data_boundary' value='data_boundary'><div>Edit Boundary</div></li>";
        idx++;
        ihtml[idx] = "</ul>";
        idx++;

        // View 서브 메뉴
        ihtml[idx] = "<div class='cryUI_TopMenuItem' id='" + name + "_topMenu_view'>View</div>";
        idx++;
        ihtml[idx] = "<ul class='cryUI_TopMenuSubMenu' id='" + name + "_subMenu_view' style='display:none'>";
        idx++;
        ihtml[idx] = "<li id='" + name + "_menu_view_render_options' value='view_render_options'><div>Render Options</div></li>";
        idx++;
        ihtml[idx] = "<li id='" + name + "_menu_view_clear_measures' value='view_clear_measures'><div>Clear Measures</div></li>";
        idx++;
        ihtml[idx] = "<li id='" + name + "_menu_view_camera_auto_fit' value='view_camera_auto_fit'><div>Auto Fit Camera</div></li>";
        idx++;
        ihtml[idx] = "<hr/>";
        idx++;
        ihtml[idx] = "<li id='" + name + "_menu_view_along_axis_a' value='view_along_axis_a'><div>Along axis a</div></li>";
        idx++;
        ihtml[idx] = "<li id='" + name + "_menu_view_along_axis_b' value='view_along_axis_b'><div>Along axis b</div></li>";
        idx++;
        ihtml[idx] = "<li id='" + name + "_menu_view_along_axis_c' value='view_along_axis_c'><div>Along axis c</div></li>";
        idx++;
        ihtml[idx] = "</ul>";
        idx++;

        return ihtml.join("");
    }

    /**
     * Menu 위치를 계산한다.
     * */
    CalcSubMenuPos() {
        this._menuFile.style.left = $(this._topFile).offset().left + "px";
        this._menuEdit.style.left = $(this._topEdit).offset().left + "px";
        this._menuData.style.left = $(this._topData).offset().left + "px";
        this._menuView.style.left = $(this._topView).offset().left + "px";
    }

    /**
     * 메뉴 아이템을 처리한다.
     * @param {String} item 처리할 메뉴 항목 값
     */
    HandleMenuItem(item) {

        if (item === "file_new") {
            this._app.MenuNew();
        }
        
        else if (item === "file_save") {
            this._app.MenuSave();
        }
        else if (item === "file_open") {
            this._app.MenuOpen();
        }
            /*
        else if (item === "file_open_cif") {
            this._app.MenuOpenCIF();
        }
        */
        else if (item === "file_export_cif") {
            this._app.MenuExportCIF();
        }
        else if (item === "file_export_mol") {
            this._app.MenuExportMOL();
        }
        else if (item === "file_export_obj") {
            this._app.MenuExportOBJ();
        }
        else if (item === "file_import_cif") {
            this._app.MenuImportCIF();
        }
        else if (item === "file_import_mol") {
            this._app.MenuImportMOL();
        }
        else if (item === "file_save_render_image") {
            this._app.MenuSaveRenderImage();
        }
        else if (item === "edit_undo") {
            this._app.MenuEditUndo();
        }
        else if (item === "edit_redo") {
            this._app.MenuEditRedo();
        }
        else if (item === "data_info") {
            this._app.MenuDataInfo();
        }
        else if (item === "data_unitcell") {
            this._app.MenuDataUnitcell();
        }
        else if (item === "data_cstructure") {
            this._app.MenuDataCStructure();
        }
        else if (item === "data_crystal_shape") {
            this._app.MenuDataCrystalShape();
        }
        else if (item === "data_bond") {
            this._app.MenuDataBond();
        }
        else if (item === "data_lattice_plane") {
            this._app.MenuDataLatticePlane();
        }
        else if (item === "data_vector") {
            this._app.MenuDataVector();
        }
        else if (item === "data_boundary") {
            this._app.MenuDataBoundary();
        }
        else if (item === "view_render_options") {
            this._app.MenuViewRenderOptions();
        }
        else if (item === "view_clear_measures") {
            this._app.MenuToolClearMeasure();
        }
        else if (item === "view_camera_auto_fit") {
            this._app.MenuAutoFit();
        }
        else if (item === "view_along_axis_a") {
            this._app.MenuViewAlignA();
        }
        else if (item === "view_along_axis_b") {
            this._app.MenuViewAlignB();
        }
        else if (item === "view_along_axis_c") {
            this._app.MenuViewAlignC();
        }


        this.UpdateSubMenus(-1);
    }

    /**
     * 서브 메뉴 펼쳐보기
     * @param {Number} idx 메뉴 인덱스
     */
    UpdateSubMenus(idx) {

        this._menuFile.style.display = (idx === 0) ? "" : "none";
        this._menuEdit.style.display = (idx === 1) ? "" : "none";
        this._menuData.style.display = (idx === 2) ? "" : "none";
        this._menuView.style.display = (idx === 3) ? "" : "none";
        this._onMode = (idx >= 0);
    }

    /**
     * UI 상태 업데이트
     * */
    UpdateUIState() {

        $(this._checkViewTopBar).css("visibility", (this._app._topSeqBar && this._app._topSeqBar._show) ? "visible" : "hidden");
        // $(this._checkViewCameraAutoRotate).css("visibility", this._app._autoRotateCamera ? "visible" : "hidden");

    }

    /**
     * 마우스로 top menu 진입 시 업데이트
     * 
     * @param {Number} idx 메뉴 인덱스
     */
    HandleMouseEnterTopMenu(idx) {
        if (this._onMode)
            this.UpdateSubMenus(idx);
    }

    /**
     * top menu 클릭 처리
     * @param {Number} idx top menu 인덱스
     */
    HandleClickTopMenu(idx) {
        this._onClick = true;

        if (this._onMode)
            this.UpdateSubMenus(-1);
        else
            this.UpdateSubMenus(idx);
    }
}