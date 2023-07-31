import { cryst } from "./crystalVariable.js";
import { Vector3 } from "../Math/Vector3.js";
import { CStructure } from "../CoreCrystal/CStructure.js";

export class crystalNewConfirmDialog {

    constructor(name, app, div_elem) {

        this._name = name;

        this._app = app;

        this._div = div_elem;

        this._div.innerHTML = this._appElementHTML(name);

        this._show = false;

        crystalNewConfirmDialog.I = this;

        this._dialog = $(this._div).dialog({
            autoOpen: false,
            maxWidth: 240,
            maxHeight: 120,
            width: 240,
            height: 120,
            modal: true,
            closeOnEscape: true,
            resizable: false,
            title: "Clear Data",
            buttons: {
                "OK": function () {
                    crystalNewConfirmDialog.I._app._csManager.ClearUndo();
                    crystalNewConfirmDialog.I.OnApply();
                    crystalNewConfirmDialog.I.CloseDialog();
                },
                "Cancel": function () {
                    crystalNewConfirmDialog.I.CloseDialog();
                },
            },
            close: function () {
                crystalNewConfirmDialog.I._show = false;
            },
        });
    }

    _appElementHTML(name) {

        var ihtml = [];

        var idx = 0;

        ihtml[idx] = "<div>Are you sure to clear current structure?</div>";
        idx++;

        return ihtml.join("");
    }

    ShowDialog() {
        if (this._show)
            return;

        this._dialog.dialog("open");
        this._show = true;
    }

    CloseDialog() {
        this._dialog.dialog("close");
        this._show = false;
    }

    OnApply() {
        cryst.RestoreDefault();
        this._app._csManager._cs = new CStructure();

        this._app.RestoreDefault();

        this._app._3dRender.Clear();
        this._app._csManager._cs.generate(this._app.GetSymmetryIdxList());
        this._app.UpdateStructureProperty();
        this._app.UpdateRenderOptions();

        for (let elem of this._app._3dRender._renderer._scene.children) {
            if (elem.name === "CStructure")
                this._app._3dRender._renderer._scene.remove(elem);
        }

        this._app._3dRender._renderer._scene.add(this._app._csManager._cs._groupMesh);
        this._app._dlgEditData._atomTable.clearAll();
        this._app._dlgEditData._shapeTable.clearAll();
        this._app._dlgEditData.DisableInput(true);
        this._app._dlgEditBond._bondTable.clearAll();
        this._app._dlgEditVectors._crystal_graphic_sites_tab._crystal_graphic_site_table.clearAll();
        this._app._dlgEditVectors._individual_atom_tab._individual_atom_table.clearAll();
        this._app._dlgEditVectors._vectors_tab._crystal_vectors_table.clearAll();
        this._app._dlgEditData.UpdateUnitcellByCS(this._app._csManager._cs);
        this._app._dlgBoundarySetting.UpdateBoundary();


        // object table update
        this._app._property.UpdateUI();

        this._app._3dRender._renderer.autofitCameraObjList([this._app._csManager._cs.getMesh()], 100);

        this._app._uiHandler.ClearAllMeasures();
        this._app._csManager.ClearUndo();
    }

}