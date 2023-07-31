import { rayLog } from "../Renderer/log.js";
import { crystalVariable } from "./crystalVariable.js";

/**
 * Structure Property 설정을 위한 다이얼로그 UI 클래스
 * */
export class crystalStructurePropertyDialog {

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


        this._div.innerHTML = this._appElementHTML(name);

        this._selectedColorUnitCell = [0, 0, 0];

        this._checkUnitCellShowLine = document.getElementById(name + "_property_unitcell_show_line");
        this._colorUnitCell = document.getElementById(name + "_property_unitcell_color");

        this._checkCrystalShowColor = document.getElementById(name + "_property_crystal_show_color");
        this._checkCrystalShowLine = document.getElementById(name + "_property_crystal_show_line");


        this._spinAtomShininess = document.getElementById(name + "_property_atom_shininess");
        this._checkAtomShowLabel = document.getElementById(name + "_property_atom_show_label");

        this._spinBondShininess = document.getElementById(name + "_property_bond_shininess");
        // this._spinBondMeshDetail = document.getElementById(name + "_property_bond_detail");

        this._spinPolyhedronShininess = document.getElementById(name + "_property_polyhedron_shininess");
        this._checkPolyhedronShowLine = document.getElementById(name + "_property_polyhedron_show_line");


        crystalStructurePropertyDialog.I = this;

        this._dialog = $(this._div).dialog({
            autoOpen: false,
            height: "auto",
            width: "auto",
            modal: false,
            closeOnEscape: true,
            resizable: false,
            title: "Structure Properties",
            buttons: {
                "Restore Defaults": function () {
                    crystalStructurePropertyDialog.I.RestoreDefaults();
                },
                "OK": function () {
                    crystalStructurePropertyDialog.I.OnApply();
                    crystalStructurePropertyDialog.I._dialog.dialog("close");
                },
                "Cancel": function () {
                    crystalStructurePropertyDialog.I._dialog.dialog("close");
                },
                "Apply": function () {
                    crystalStructurePropertyDialog.I.OnApply();
                }
            },
            close: function () {
                crystalStructurePropertyDialog.I._show = false;
            }
        });


        $(this._checkUnitCellShowLine).checkboxradio();
        $(this._colorUnitCell).colorpicker({
            modal: true,
            buttonColorize: true,
            buttonImageOnly: true,
            ok: function (event, formatted) {
                event.target.style.backgroundColor = formatted.css;
                crystalStructurePropertyDialog.I.OnChangeColorUnitCell([formatted.rgb["r"], formatted.rgb["g"], formatted.rgb["b"]]);
            }
        });

        $(this._checkCrystalShowColor).checkboxradio();
        $(this._checkCrystalShowLine).checkboxradio();

        $(this._spinAtomShininess).spinner({
            numberFormat: 'n', min: 0, max: 100, step: 1, incremental: true,
        });
        $(this._checkAtomShowLabel).checkboxradio();

        $(this._spinBondShininess).spinner({
            numberFormat: 'n', min: 0, max: 100, step: 1, incremental: true,
        });
        /*
        $(this._spinBondMeshDetail).spinner({
            numberFormat: 'n', min: 0, max: 100, step: 1, incremental: true,
        });
        */

        $(this._spinPolyhedronShininess).spinner({
            numberFormat: 'n', min: 0, max: 100, step: 1, incremental: true,
        });
        $(this._checkPolyhedronShowLine).checkboxradio();

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

        // UnitCell

        ihtml[idx] = "<table class='cryUI_Preset_Wrapper_Table'>";
        idx++;

        // unit cell

        ihtml[idx] = "<tr><td class='cryUI_Td_TopAlign'><table class='cryUI_Preset_Table'><caption>Unit Cell</caption><tr><td class='cryUI_Td_TopAlign'><table class='cryUI_Preset_Detail_Table'>";
        idx++;
        ihtml[idx] = "<tr><td class='cryUI_DropTitle3'>Show Line</td><td><label for='" + name + "_property_unitcell_show_line'></label><input type='checkbox' id='" + name + "_property_unitcell_show_line'></td></tr>";
        idx++;
        ihtml[idx] = "<tr><td class='cryUI_DropTitle3'>Color</td>";
        idx++;
        ihtml[idx] = "<td><input type='text' id='" + name + "_property_unitcell_color' class='cryUI_Widget_Spin'></td></tr>";
        idx++;
        ihtml[idx] = "</table></td></tr></table></td>";
        idx++;

        // crystal structure

        ihtml[idx] = "<td class='cryUI_Td_TopAlign'><table class='cryUI_Preset_Table'><caption>Crystal Structure</caption><tr><td class='cryUI_Td_TopAlign'><table class='cryUI_Preset_Detail_Table'>";
        idx++;
        ihtml[idx] = "<tr><td class='cryUI_DropTitle3'>Show Color</td><td><label for='" + name + "_property_crystal_show_color'></label><input type='checkbox' id='" + name + "_property_crystal_show_color'></td></tr>";
        idx++;
        ihtml[idx] = "<tr><td class='cryUI_DropTitle3'>Show Line</td><td><label for='" + name + "_property_crystal_show_line'></label><input type='checkbox' id='" + name + "_property_crystal_show_line'></td></tr>";
        idx++;
        ihtml[idx] = "</table></td></tr></table></td></tr>";
        idx++;

        // atom

        ihtml[idx] = "<tr><td class='cryUI_Td_TopAlign'><table class='cryUI_Preset_Table'><caption>Atom</caption><tr><td class='cryUI_Td_TopAlign'><table class='cryUI_Preset_Detail_Table'>";
        idx++;
        ihtml[idx] = "<tr><td class='cryUI_DropTitle3'>Shininess</td>";
        idx++;
        ihtml[idx] = "<td><input type='text' id='" + name + "_property_atom_shininess' class='cryUI_Widget_Spin'></td></tr>";
        idx++;
        ihtml[idx] = "<tr><td class='cryUI_DropTitle3'>Show Label</td><td><label for='" + name + "_property_atom_show_label'></label><input type='checkbox' id='" + name + "_property_atom_show_label'></td></tr>";
        idx++;
        ihtml[idx] = "</table></td></tr></table></td>";
        idx++;

        // bond

        ihtml[idx] = "<td class='cryUI_Td_TopAlign'><table class='cryUI_Preset_Table'><caption>Bond</caption><tr><td class='cryUI_Td_TopAlign'><table class='cryUI_Preset_Detail_Table'>";
        idx++;
        ihtml[idx] = "<tr><td class='cryUI_DropTitle3'>Shininess</td>";
        idx++;
        ihtml[idx] = "<td><input type='text' id='" + name + "_property_bond_shininess' class='cryUI_Widget_Spin'></td></tr>";
        idx++;
        /*
        ihtml[idx] = "<tr><td class='cryUI_DropTitle3'>Mesh Detail</td>";
        idx++;
        ihtml[idx] = "<td><input type='text' id='" + name + "_property_bond_detail' class='cryUI_Widget_Spin'></td></tr>";
        idx++;
        */
        ihtml[idx] = "</table></td></tr></table></td></tr>";
        idx++;

        // polyhedron

        ihtml[idx] = "<tr><td class='cryUI_Td_TopAlign'><table class='cryUI_Preset_Table'><caption>Polyhedron</caption><tr><td class='cryUI_Td_TopAlign'><table class='cryUI_Preset_Detail_Table'>";
        idx++;
        ihtml[idx] = "<tr><td class='cryUI_DropTitle3'>Shininess</td>";
        idx++;
        ihtml[idx] = "<td><input type='text' id='" + name + "_property_polyhedron_shininess' class='cryUI_Widget_Spin'></td></tr>";
        idx++;
        ihtml[idx] = "<tr><td class='cryUI_DropTitle3'>Show Line</td><td><label for='" + name + "_property_polyhedron_show_line'></label><input type='checkbox' id='" + name + "_property_polyhedron_show_line'></td></tr>";
        idx++;
        ihtml[idx] = "</table></td></tr></table></td>";
        idx++;

        ihtml[idx] = "</table>";
        idx++;

        return ihtml.join("");
    };

    /**
     * UI를 갱신한다
     * */
    UpdateUI() {

        if (!this._app._structureProperty)
            return;

        const property = this._app._structureProperty;

        $(this._checkUnitCellShowLine).prop("checked", property.UnitCell.ShowLine);
        $(this._checkUnitCellShowLine).checkboxradio("refresh");

        this._selectedColorUnitCell = [property.UnitCell.Color[0], property.UnitCell.Color[1], property.UnitCell.Color[2]];
        var c_back = crystalVariable.HTMLColorRGB(this._selectedColorUnitCell);
        $(this._colorUnitCell).prop("value", c_back);
        $(this._colorUnitCell).css("background-color", "#" + c_back);

        $(this._checkCrystalShowColor).prop("checked", property.Crystal.ShowColor);
        $(this._checkCrystalShowColor).checkboxradio("refresh");
        $(this._checkCrystalShowLine).prop("checked", property.Crystal.ShowLine);
        $(this._checkCrystalShowLine).checkboxradio("refresh");

        $(this._spinAtomShininess).spinner("value", property.Atom.Shininess);
        $(this._checkAtomShowLabel).prop("checked", property.Atom.ShowLabel);
        $(this._checkAtomShowLabel).checkboxradio("refresh");

        $(this._spinBondShininess).spinner("value", property.Bond.Shininess);
        // $(this._spinBondMeshDetail).spinner("value", property.Bond.MeshDetail);

        $(this._spinPolyhedronShininess).spinner("value", property.Polyhedron.Shininess);
        $(this._checkPolyhedronShowLine).prop("checked", property.Polyhedron.ShowLine);
        $(this._checkPolyhedronShowLine).checkboxradio("refresh");

    };

    /**
     * 기본값 복원
     * */
    RestoreDefaults() {
        this._app.InitStructureProperty();
        this.UpdateUI();
    };

    /**
     * 설정값을 적용한다
     * */
    OnApply() {

        if (!this._app._structureProperty)
            return;

        const property = this._app._structureProperty;


        property.UnitCell.ShowLine = $(this._checkUnitCellShowLine).prop("checked");
        property.UnitCell.Color = [this._selectedColorUnitCell[0], this._selectedColorUnitCell[1], this._selectedColorUnitCell[2]];

        property.Crystal.ShowColor = $(this._checkCrystalShowColor).prop("checked");
        property.Crystal.ShowLine = $(this._checkCrystalShowLine).prop("checked");

        property.Atom.Shininess = Number($(this._spinAtomShininess).spinner("value"));
        property.Atom.ShowLabel = $(this._checkAtomShowLabel).prop("checked");

        property.Bond.Shininess = Number($(this._spinBondShininess).spinner("value"));
        // property.Bond.MeshDetail = Number($(this._spinBondMeshDetail).spinner("value"));

        property.Polyhedron.Shininess = Number($(this._spinPolyhedronShininess).spinner("value"));
        property.Polyhedron.ShowLine = $(this._checkPolyhedronShowLine).prop("checked");


        rayLog(3, "[structureProperty] change applied JSON " + JSON.stringify(property));

        this._app.UpdateStructureProperty();
        this._app.UpdateUI();
    };

    /**
     * 배경색을 변경한다
     * @param {Color} col 색상값
     */
    OnChangeColorUnitCell(col) {
        rayLog(3, "[structureProperty] change color unitcell " + col[0] + "," + col[1] + "," + col[2]);
        this._selectedColorUnitCell = col;
    };

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
