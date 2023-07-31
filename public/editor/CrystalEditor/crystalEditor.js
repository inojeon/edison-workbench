import { rayLog } from "../Renderer/log.js";
import { crystalTopMenu } from "./crystalTopMenu.js";
import { crystalTopToolBar } from "./crystalTopToolBar.js";
import { crystalLeftToolBar } from "./crystalLeftToolBar.js";
import { crystalLogBar } from "./crystalLogBar.js";
import { crystalPropertyBar } from "./crystalPropertyBar.js";
import { crystalRenderer } from "./crystalRenderer.js";
import { crystalEditDataDialog } from "./crystalEditDataDialog.js";
import { crystalEditBondDialog } from "./crystalEditBondDialog.js";
import { crystalPeriodicDialog } from "./crystalPeriodicDialog.js";
import { crystalEditBondConfirmDialog } from "./crystalEditBondConfirmDialog.js";
import { crystalEditDataConfirmDialog } from "./crystalEditDataConfirmDialog.js"
import { crystalBoundarySettingDialog } from "./crystalBoundarySettingDialog.js";
import { CStructure } from '../CoreCrystal/CStructure.js';
import { crystalUIHandler } from './crystalUIHandler.js';
import { crystalUIFloatingToolMeasure } from './crystalUIFloatingToolMeasure.js';
import { crystalEditVectorsDialog } from "./crystalEditVectorsDialog.js";
import { crystalCreateVectorDialog } from "./crystalCreateVectorDialog.js";
import { cryst, crystalVariable } from './crystalVariable.js';
import { crystalInputTextDialog } from "./crystalInputTextDialog.js";
import { AtomDef } from '../CoreCrystal/AtomDef.js';
import { Loader } from '../CoreCrystal/Loader.js';
import { crystalEditLatticePlaneDialog } from "./crystalEditLatticePlaneDialog.js";
import { crystalRenderOptionDialog } from "./crystalRenderOptionDialog.js";
import { crystalStructurePropertyDialog } from "./crystalStructurePropertyDialog.js";
import { crystalProgressDialog } from "./crystalProgressDialog.js";
import { Vector3 } from '../Math/Vector3.js';
import { crystalNewConfirmDialog } from "./crystalNewConfirmDialog.js";
import { crystalExportImageDialog } from "./crystalExportImageDialog.js";

import { Renderer} from "../Renderer/Renderer.js";

import { SystemDef, SpaceGroupDef, SettingDef } from './SymmetryDef.js';
import * as SYM from "../CoreCrystal/SymmetryMatrix.js";
/**
 * Crystal Editor App 클래스
 * */
export class crystalEditor {

    /**
     * 생성자
     * @param {String} name 다른 앱과 구분하기 위한 이름
     * @param {HTMLElement} div_elem crystalEditor가 부착될 html element
     * @param {Boolean} is_portlet portlet 여부
     */
    constructor(name, div_elem, is_portlet) {

        new crystalVariable();

        this._name = name;

        this._div = div_elem;

        this._div.innerHTML = this._appElementHTML(name);

        this._div_topMenu = document.getElementById(name + '_topMenu');

        this._div_topToolBar = document.getElementById(name + '_topToolBar');

        this._div_leftToolBar = document.getElementById(name + '_leftToolBar');

        this._div_property = document.getElementById(name + '_propertyWindow');

        this._div_3dRender = document.getElementById(name + '_3DRender');

        this._div_logBar = document.getElementById(name + "_logBar");

        this._div_subarea = document.getElementsByClassName("subarea1")[0];

        this._div_edit_data = document.getElementById(name + '_dlgEditData');

        this._div_edit_data_confirm = document.getElementById(name + "_dlgEditDataConfirm");

        this._div_edit_bond = document.getElementById(name + "_dlgEditBond");

        this._div_edit_bond_confirm = document.getElementById(name + "_dlgEditBondConfirm");

        this._div_periodic = document.getElementById(name + "_dlgPeriodic");

        this._div_property_general = document.getElementById(name + "_dlgPropertyGeneral");

        this._div_boundary_setting = document.getElementById(name + "_dlgBoundarySetting");

        this._div_floatingToolMeasure = document.getElementById(name + "_floatingToolMeasure");

        this._div_edit_vectors = document.getElementById(name + "_dlgEditVectors");

        this._div_edit_lattice_plane = document.getElementById(name + "_dlgEditLatticePlane");

        this._div_create_vector = document.getElementById(name + "_dlgCreateVector");

        this._div_input_text = document.getElementById(name + "_dlgInputText");

        this._div_render_options = document.getElementById(name + "_dlgRenderOptions");

        this._div_structure_property = document.getElementById(name + "_dlgStructureProperty");

        this._div_export_image = document.getElementById(name + "_dlgExportImage");

        this._div_progress = document.getElementById(name + "_dlgProgress");
        this._div_waiter = document.getElementById(name + "_waiter");

        this._div_new_confirm = document.getElementById(name + "_dlgNewConfirm");

        this._load_file = document.getElementById(name + "_load_file");

        this._load_cif = document.getElementById(name + "_load_cif");

        this._import_cif = document.getElementById(name + "_import_cif");

        this._import_mol = document.getElementById(name + "_import_mol");



        this._topMenu = new crystalTopMenu(name, this, this._div_topMenu);

        this._topToolBar = new crystalTopToolBar(name, this, this._div_topToolBar);

        this._leftToolBar = new crystalLeftToolBar(name, this, this._div_leftToolBar);

        this._property = new crystalPropertyBar(name, this, this._div_property);

        crystalEditor.I = this;

        this._logBar = new crystalLogBar(name, this, this._div_logBar);

        this._3dRender = new crystalRenderer(name, this, this._div_3dRender);

        this._dlgEditData = new crystalEditDataDialog(name, this, this._div_edit_data);

        this._dlgEditDataConfirm = new crystalEditDataConfirmDialog(name, this, this._div_edit_data_confirm);

        this._dlgEditBond = new crystalEditBondDialog(name, this, this._div_edit_bond);

        this._dlgEditBondConfirm = new crystalEditBondConfirmDialog(name, this, this._div_edit_bond_confirm);

        this._dlgPeriodic = new crystalPeriodicDialog(name, this, this._div_periodic);

        this._dlgBoundarySetting = new crystalBoundarySettingDialog(name, this, this._div_boundary_setting);

        this._dlgEditVectors = new crystalEditVectorsDialog(name, this, this._div_edit_vectors);

        this._dlgEditLatticePlane = new crystalEditLatticePlaneDialog(name, this, this._div_edit_lattice_plane);

        this._dlgCreateVector = new crystalCreateVectorDialog(name, this, this._div_create_vector);

        this._dlgInputText = new crystalInputTextDialog(name, this, this._div_input_text);

        this._dlgRenderOptions = new crystalRenderOptionDialog(name, this, this._div_render_options);

        this._dlgStructureProperty = new crystalStructurePropertyDialog(name, this, this._div_structure_property);

        this._dlgExportImage = new crystalExportImageDialog(name, this, this._div_export_image);

        this._dlgProgress = new crystalProgressDialog(name, this, this._div_progress, this._div_waiter);

        this._dlgNewConfirm = new crystalNewConfirmDialog(name, this, this._div_new_confirm);

        this._uiHandler = new crystalUIHandler(this);

        this._floatingToolMeasure = new crystalUIFloatingToolMeasure(name, this, this._div_floatingToolMeasure);

        this._bModified = false;

        window.onbeforeunload = function () {
            if (crystalEditor.I._isPortlet)
                return;

            if(crystalEditor.I._bModified)
                return "Are you sure?";
            
        };


        window.addEventListener("resize", function () {
            crystalEditor.I.OnResize();
        });

        this._div_3dRender.addEventListener("pointerdown", function (event) {
            if (crystalEditor.I.OnMouseDown(event)) {
                event.stopPropagation();
                event.preventDefault();
            }
        });

        this._div_3dRender.addEventListener("pointermove", function (event) {
            if (crystalEditor.I.OnMouseMove(event)) {
                event.stopPropagation();
                event.preventDefault();
            }
        });


        this._div_3dRender.addEventListener("pointerup", function (event) {
            if (crystalEditor.I.OnMouseUp(event)) {
                event.stopPropagation();
                event.preventDefault();
            }
        });

        window.addEventListener("keyup", function (event) {
            if (crystalEditor.I.OnKeyPress(event)) {
                event.stopPropagation();
                event.preventDefault();
            }
        });

        this._load_file.onchange = function (event) {
            crystalEditor.I.LoadCSFromKCS(event.target.files[0]);
            crystalEditor.I._load_file.value = null;
        }

        this._load_cif.onchange = function (event) {
            crystalEditor.I.LoadFromCIF(event.target.files[0]);
            crystalEditor.I._load_cif.value = null;
        }

        this._import_cif.onchange = function (event) {
            // import function
            crystalEditor.I.ImportCIF(event.target.files[0]);
            crystalEditor.I._import_cif.value = null;
        }

        this._import_mol.onchange = function (event) {
            // import function
            crystalEditor.I.ImportMOL(event.target.files[0]);
            crystalEditor.I._import_mol.value = null;
        }

        this.InitRenderOptions();
        this.InitStructureProperty();
        this.InitMeasureOption();

    }

    /**
     * resize 수행 메소드
     * */
    OnResize() {
        this._divw = window.innerWidth;
        this._divh = window.innerHeight;

        this._div.style.width = this._divw + "px";
        this._div.style.height = this._divh + "px";

        if(this._div_topMenu && this._div_leftToolBar && this._div_topToolBar) {
            this._leftToolBar_height = this._divh - $(this._div_topMenu).height() - $(this._div_topToolBar).height();
            this._div_leftToolBar.style.height = this._leftToolBar_height + "px";
        }
        
        if(this._div_topMenu && this._div_property && this._div_topToolBar) {
            this._property_height = this._divh - $(this._div_topMenu).height() - $(this._div_topToolBar).height();
            this._div_property.style.height = this._property_height + "px";
        }

        this._topToolBar_height = $(this._div_topToolBar).height();
        this._leftToolBar_width = $(this._div_leftToolBar).width();
        this._property_width = $(this._div_property).width();

        // 상단 메뉴바에 걸친 영역도 모두 포함한다.
        var viewHeight = this._divh - this._topToolBar_height;
        var viewWidth = this._divw - this._leftToolBar_width - this._property_width;

        // 맨 아래 빈 공간
        this._canvas_width = viewWidth;
        this._canvas_height = viewHeight- $(this._div_logBar).height();
        this._canvas_aspect = this._canvas_width / this._canvas_height;

        this._div_3dRender.style.width = this._canvas_width + "px";
        this._div_3dRender.style.height = this._canvas_height + "px";

        this._div_logBar.style.width = this._div_3dRender.style.width;

        if (crystalRenderer.I && crystalRenderer.I._renderer) {
            crystalRenderer.I._renderer.onWindowResize(this._canvas_width, this._canvas_height);
        }
    }

    /**
     * mouse down 이벤트 처리
     * @param {Event} event mouse down
     */
    OnMouseDown(event) {
        return this._uiHandler.OnMouseDown(event);
    }

    /**
     * mouse move 이벤트 처리
     * @param {Event} event mouse move
     */
    OnMouseMove(event) {
        return this._uiHandler.OnMouseMove(event);
    }

    /**
     * mouse up 이벤트 처리
     * @param {Event} event mouse up
     */
    OnMouseUp(event) {
        return this._uiHandler.OnMouseUp(event);
    }

    /**
     * key press 이벤트 처리
     * @param {Event} event key press
     */
    OnKeyPress(event) {
        return this._uiHandler.OnKeyPress(event);
    }

    /**
     * camera auto fit
     * */
    MenuAutoFit() {
        this._3dRender._renderer.autofitCameraObjList([this._csManager._cs.getMesh()], 100);
    }

    /**
     * camera auto rotate
     * */
    MenuAutoRotate() {
        this._3dRender._autoRotateCamera = !this._3dRender._autoRotateCamera;
    }

    /**
     * export mol
     * */
    MenuExportMOL() {
        this.ExportMOL("crystal", this._csManager._cs);
    }

    /**
     * export obj
     * */
    MenuExportCIF() {
        this.ExportCIF("crystal", this._csManager._cs);
    }

    MenuExportOBJ() {
        this.ExportOBJ("crystal", this._csManager._cs);
    }

    /**
     * import cif
     * */
    MenuImportCIF() {
        rayLog(3, "import cif");
        this._import_cif.click();
    }

    /**
     * import mol
     * */
    MenuImportMOL() {
        rayLog(3, "import mol");
        this._import_mol.click();
    }

    /**
     * open edit data dialog - info tab
     * */
    MenuDataInfo() {
        this._dlgEditData.ShowDialog();
        $(this._dlgEditData._tabsEdit).tabs({
            active: 0
        });
    }

    /**
     * open edit data dialog - unitcell tab
     * */
    MenuDataUnitcell() {
        this._dlgEditData.ShowDialog();
        $(this._dlgEditData._tabsEdit).tabs({
            active: 1
        });
    }

    /**
     * open edit data dialog - csturcture tab
     * */
    MenuDataCStructure() {
        this._dlgEditData.ShowDialog();
        $(this._dlgEditData._tabsEdit).tabs({
            active: 2
        });
    }

    /**
     * open edit data dialog - crystal shape tab
     * */
    MenuDataCrystalShape() {
        this._dlgEditData.ShowDialog();
        $(this._dlgEditData._tabsEdit).tabs({
            active: 3
        });
    }

    /**
     * open edit bond dialog
     * */
    MenuDataBond() {
        this._dlgEditBond.ShowDialog();
    }

    /**
     * open edit vector dialog
     * */
    MenuDataVector() {
        this._dlgEditVectors.ShowDialog();
    }

    
    /**
     * open edit lattice plane dialog
     * */
    MenuDataLatticePlane() {
        this._dlgEditLatticePlane.ShowDialog();
    }

    /**
     * open edit boundary dialog
     * */
    MenuDataBoundary() {
        this._dlgBoundarySetting.ShowDialog();
    }

    /**
     * cstructure 변경 사항에 대해 undo 수행
     * */
    MenuEditUndo() {
        rayLog(3, "menu edit undo");
        this._csManager.DoUndo();
        this.UpdateRenderOptions();
    }

    /**
     * cstructure 변경 사항에 대해 redo 수행
     * */
    MenuEditRedo() {
        rayLog(3, "menu edit redo");
        this._csManager.DoRedo(this._csManager._cs.clone());
        this.UpdateRenderOptions();
    }

    /**
     * open periodic dialog
     * */
    MenuPeriodic() {
        this._dlgPeriodic.ShowDialog();
    }

    /**
     * clear cstructure
     * */
    MenuNew() {

        if (this._bModified)
            this._dlgNewConfirm.ShowDialog();

        else
            this._dlgNewConfirm.OnApply();
    }

    /**
     * unitcell 기본값 복원
     * */
    RestoreDefault() {
        this._csManager._cs._unitcell.set(cryst.Unitcell.alpha, cryst.Unitcell.beta, cryst.Unitcell.gamma, cryst.Unitcell.a, cryst.Unitcell.b, cryst.Unitcell.c);
    }

    /**
     * file dialog open
     * */
    MenuOpen() {
        rayLog(3, "menu open");
        this._load_file.click();
    }

    /**
     * cif file dialog open
     * */
    MenuOpenCIF() {
        rayLog(3, "menu open cif");
        this._load_cif.click();
    }

    /**
     * cstructure file save
     * */
    MenuSave() {
        rayLog(3, "menu save");
        this.SaveCSToKCS("CStructure");
        this._bModified = false;
    }

    /**
     * save render image
     * */
    MenuSaveRenderImage() {
        rayLog(3, "menu save render image");
        this._dlgExportImage.ShowDialog();
    }

    /**
     * rotate mode
     * */
    MenuToolRotate() {
        this._uiHandler.StartRotate();
    }

    /**
     * select mode
     * */
    MenuToolSelect() {
        this._uiHandler.StartSelect();
    }

    /**
     * measure distance mode
     * */
    MenuToolMeasureDistance() {
        this._uiHandler.StartMeasureDistance();
    }

    /**
     * measure angle mode
     * */
    MenuToolMeasureAngle() {
        this._uiHandler.StartMeasureAngle();
    }

    /**
     * measure dihedral angle mode
     * */
    MenuToolMeasureAngleDihedral() {
        this._uiHandler.StartMeasureAngleDihedral();
    }

    /**
     * measure interfacial angle mode
     * */
    MenuToolMeasureAngleInterfacial() {
        this._uiHandler.StartMeasureAngleInterfacial();
    }

    /**
     * clear all measure
     * */
    MenuToolClearMeasure() {
        this._uiHandler.ClearAllMeasures();
    }

    /**
     * render option dialog open
     * */
    MenuViewRenderOptions() {
        this._dlgRenderOptions.ShowDialog();
    }

    /**
     * zoom in
     * */
    MenuViewZoomIn() {
        this._3dRender._renderer.adjustOrthoZoom(cryst.ZoomIn);
    }

    /**
     * zoom out
     * */
    MenuViewZoomOut() {
        this._3dRender._renderer.adjustOrthoZoom(cryst.ZoomOut);
    }

    /**
     * view align axis A
     * */
    MenuViewAlignA() {
        this._3dRender._renderer.setOrthoCameraDirection(this._csManager._cs._unitcell._axis._va);
        this._3dRender._renderer.autofitCameraObjList([this._csManager._cs.getMesh()], 100);
    }

    /**
     * view align axis B
     * */
    MenuViewAlignB() {
        this._3dRender._renderer.setOrthoCameraDirection(this._csManager._cs._unitcell._axis._vb);
        this._3dRender._renderer.autofitCameraObjList([this._csManager._cs.getMesh()], 100);
    }

    /**
     * view align axis C
     * */
    MenuViewAlignC() {
        this._3dRender._renderer.setOrthoCameraDirection(this._csManager._cs._unitcell._axis._vc);
        this._3dRender._renderer.autofitCameraObjList([this._csManager._cs.getMesh()], 100);
   }

    /**
     * ui 업데이트
     * */
    UpdateUI() {
        if (this._topToolBar) {
            this._topToolBar.UpdateToolbarState();
        }
        if (this._leftToolBar) {
            this._leftToolBar.UpdateToolbarState();
        }
    }

    /**
     * crystalEditor에 대한 html element를 작성한다.
     * 
     * @param {String} name 다른 앱과 구분하기 위한 이름
     * @returns {String} HTML 문자열
     */
    _appElementHTML(name) {

        let ihtml = [];
        let idx = 0;

        ihtml[idx] = "<div class='MainMenu' id='" + name + "_topMenu'></div>";
        idx++;

        ihtml[idx] = "<div class='cryUI_topBar' id='" + name + "_topToolBar'></div>";
        idx++;

        ihtml[idx] = "<div class='subarea1'>";
        idx++;

        ihtml[idx] = "<div class='ToolBar2' id='" + name + "_leftToolBar'></div>";
        idx++;

        ihtml[idx] = "<div class='PropertyWindow' id='" + name + "_propertyWindow'></div>";
        idx++;

        ihtml[idx] = "<div class='subarea2'>";
        idx++;

        ihtml[idx] = "<div class='Render' id='" + name + "_3DRender'>";
        idx++;

        ihtml[idx] = "<div class='cryUI_FloatingToolMeasure' id='" + name + "_floatingToolMeasure'></div>";
        idx++;

        ihtml[idx] = "</div>";
        idx++;

        ihtml[idx] = "<div class='cryUI_LogBar' id='" + name + "_logBar'></div>";
        idx++;

        ihtml[idx] = "</div></div>";
        idx++;

        ihtml[idx] = "<div class='cryUI_MsgBox' id='" + name + "_dlgEditData'></div>";
        idx++;

        ihtml[idx] = "<div class='cryUI_MsgBox' id='" + name + "_dlgEditDataConfirm'></div>";
        idx++;

        ihtml[idx] = "<div class='cryUI_MsgBox' id='" + name + "_dlgEditBond'></div>";
        idx++;

        ihtml[idx] = "<div class='cryUI_MsgBox' id='" + name + "_dlgEditBondConfirm'></div>";
        idx++;

        ihtml[idx] = "<div class='cryUI_MsgBox' id='" + name + "_dlgPeriodic'></div>";
        idx++;

        ihtml[idx] = "<div class='cryUI_MsgBox' id='" + name + "_dlgPropertyGeneral'></div>";
        idx++;

        ihtml[idx] = "<div class='cryUI_MsgBox' id='" + name + "_dlgBoundarySetting'></div>";
        idx++;

        ihtml[idx] = "<div class='cryUI_MsgBox' id='" + name + "_dlgEditVectors'></div>";
        idx++;

        ihtml[idx] = "<div class='cryUI_MsgBox' id='" + name + "_dlgEditLatticePlane'></div>";
        idx++;

        ihtml[idx] = "<div class='cryUI_MsgBox' id='" + name + "_dlgCreateVector'></div>";
        idx++;

        ihtml[idx] = "<div class='cryUI_MsgBox' id='" + name + "_dlgInputText'></div>";
        idx++;

        ihtml[idx] = "<div class='cryUI_MsgBox' id='" + name + "_dlgRenderOptions'></div>";
        idx++;

        ihtml[idx] = "<div class='cryUI_MsgBox' id='" + name + "_dlgStructureProperty'></div>";
        idx++;

        ihtml[idx] = "<div class='cryUI_MsgBox' id='" + name + "_dlgExportImage'></div>";
        idx++;

        ihtml[idx] = "<div class='cryUI_MsgBox' id='" + name + "_dlgProgress'></div>";
        idx++;
        ihtml[idx] = "<div class='cryUI_Waiter' id='" + name + "_waiter'><div class='cryUI_Waiter_Msg' id='" + name + "_waiter_msg'></div></div>";
        idx++;

        ihtml[idx] = "<input id='" + name + "_load_file' type='file' accept='.kcs' value='' hidden />";
        idx++;

        ihtml[idx] = "<input id='" + name + "_load_cif' type='file' value='' hidden />";
        idx++;

        ihtml[idx] = "<input id='" + name + "_import_cif' type='file' accept='.cif' value='' hidden/>";
        idx++;

        ihtml[idx] = "<input id='" + name + "_import_mol' type='file' accept='.mol' value='' hidden/>";
        idx++;

        ihtml[idx] = "<div class='cryUI_MsgBox' id='" + name + "_dlgNewConfirm'></div>";
        idx++;

        return ihtml.join("");
    }


    /**
     * 현재 이미지를 export한다
     * @param {Number} pw 렌더링 너비
     * @param {Number} ph 렌더링 높이
     */
    ExportRenderImage(pw, ph) {

        var new_div = document.createElement("div");
        new_div.id = "_render_export";
        this._div.appendChild(new_div);
        new_div.style.position = "absolute";
        new_div.style.display = "block";
        new_div.style.visibility = "visible";
        new_div.style.zIndex = "-9999";
        new_div.style.width = pw + "px";
        new_div.style.height = ph + "px";

        var app = this;
        setTimeout(function () {

            rayLog(3, "div style " + new_div.style.width + "," + new_div.style.height);


            var new_rdr = new Renderer(new_div, true);
            new_rdr.renderFrameFromOtherRenderer(app._3dRender._renderer);

            new_rdr.saveScreenshot("export");
            new_rdr = null;
            new_div.remove();

        }, 100);
    }


    /**
     * KCS 파일로부터 CStructure를 불러온다.
     * 
     * @param {File} file KCS 파일
     */
    LoadCSFromKCS(file) {


        let fileReader = new FileReader();
        fileReader.onload = async function () {

            await crystalEditor.I._dlgProgress.ShowDialog();
            await crystalEditor.I._dlgProgress.SetMsg("Loading CS from KCS File...");

            let data = fileReader.result;


            await crystalEditor.I._dlgProgress.SetProgress(0);

            // json 데이터로부터 cs를 복원한다.
            crystalEditor.I._csManager._cs = new CStructure();
            crystalEditor.I._dlgNewConfirm.OnApply();

            await crystalEditor.I._dlgProgress.SetProgress(.1);

            crystalEditor.I._csManager._cs.LoadCStructure(JSON.parse(data));

            await crystalEditor.I._dlgProgress.SetProgress(.2);

            crystalEditor.I._csManager._cs.generate();
            
            await crystalEditor.I._dlgProgress.SetProgress(.3);

            crystalEditor.I.UpdateStructureProperty();
            crystalEditor.I.UpdateRenderOptions();

            await crystalEditor.I._dlgProgress.SetProgress(.4);

            crystalEditor.I._3dRender._renderer._scene.add(crystalEditor.I._csManager._cs._groupMesh);
            crystalEditor.I._dlgEditData.UpdateTableByCS(crystalEditor.I._csManager._cs);

            await crystalEditor.I._dlgProgress.SetProgress(.5);

            crystalEditor.I._dlgEditData.UpdateUnitcellByCS(crystalEditor.I._csManager._cs);
            crystalEditor.I._dlgEditData.UpdateCrystalColor();
            await crystalEditor.I._dlgProgress.SetProgress(.6);

            crystalEditor.I._dlgEditBond.UpdateTableByCS(crystalEditor.I._csManager._cs);

            await crystalEditor.I._dlgProgress.SetProgress(.7);

            crystalEditor.I._dlgEditBond.UpdateTable();

            await crystalEditor.I._dlgProgress.SetProgress(.8);

            crystalEditor.I._dlgEditLatticePlane.UpdateTableByCS(crystalEditor.I._csManager._cs);
            crystalEditor.I._property.UpdateUI();   // object table update

            await crystalEditor.I._dlgProgress.SetProgress(.9);


            crystalEditor.I._dlgBoundarySetting.UpdateBoundary();
            // vector table update
            crystalEditor.I._dlgEditVectors.UpdateTable();
            crystalEditor.I._dlgEditVectors.RestoreAddedVectorFromCS();

            crystalEditor.I._3dRender._renderer.autofitCameraObjList([crystalEditor.I._csManager._cs.getMesh()], 100);

            await crystalEditor.I._dlgProgress.SetProgress(1);

            crystalEditor.I._dlgProgress.CloseDialog();
            crystalEditor.I._bModified = true;


            crystalEditor.I._csManager.ClearUndo();
        }

        fileReader.readAsText(file);
    }

    ImportCIF(file) {
        let fileReader = new FileReader();
        fileReader.onload = async function () {

            await crystalEditor.I._dlgProgress.ShowDialog();
            await crystalEditor.I._dlgProgress.SetMsg("Import CS from CIF File...");

            await crystalEditor.I._dlgProgress.SetProgress(0);
            let data = fileReader.result;
            crystalEditor.I._dlgNewConfirm.OnApply();
            Loader.loadFile("cif", data, crystalEditor.I._csManager._cs);

            await crystalEditor.I._dlgProgress.SetProgress(.1);

            crystalEditor.I._3dRender.Clear();

            await crystalEditor.I._dlgProgress.SetProgress(.2);

            crystalEditor.I._csManager._cs.generate();
   
            await crystalEditor.I._dlgProgress.SetProgress(.6);

            crystalEditor.I.UpdateStructureProperty();
            crystalEditor.I.UpdateRenderOptions();

            await crystalEditor.I._dlgProgress.SetProgress(.7);

            crystalEditor.I._dlgEditData.UpdateTableByCS(crystalEditor.I._csManager._cs);
            crystalEditor.I._dlgEditData.UpdateUnitcellByCS(crystalEditor.I._csManager._cs);
            crystalEditor.I._dlgEditBond.UpdateTableByCS(crystalEditor.I._csManager._cs);
            crystalEditor.I._dlgEditData.UpdateCrystalColor();
            crystalEditor.I._dlgEditLatticePlane.UpdateTableByCS(crystalEditor.I._csManager._cs);
            crystalEditor.I._dlgEditBond.UpdateTable();
            crystalEditor.I._dlgBoundarySetting.UpdateBoundary();
            crystalEditor.I._property.UpdateUI();
            

            await crystalEditor.I._dlgProgress.SetProgress(.8);


            crystalEditor.I._dlgEditVectors.UpdateTable();
            crystalEditor.I._dlgEditVectors.RestoreAddedVectorFromCS();


            await crystalEditor.I._dlgProgress.SetProgress(.9);

            crystalEditor.I._3dRender._renderer._scene.children.pop();
            crystalEditor.I._3dRender._renderer._scene.add(crystalEditor.I._csManager._cs._groupMesh);
            crystalEditor.I._3dRender._renderer.autofitCameraObjList([crystalEditor.I._csManager._cs.getMesh()], 100);


            await crystalEditor.I._dlgProgress.SetProgress(1);
            crystalEditor.I._dlgProgress.CloseDialog();

            crystalEditor.I._bModified = true;

            crystalEditor.I._csManager.ClearUndo();
        }

        fileReader.readAsText(file);
    }

    ImportMOL(file) {
        let fileReader = new FileReader();
        fileReader.onload = async function () {

            await crystalEditor.I._dlgProgress.ShowDialog();
            await crystalEditor.I._dlgProgress.SetMsg("Import CS from MOL File...");

            await crystalEditor.I._dlgProgress.SetProgress(0);
            let data = fileReader.result;
            crystalEditor.I._dlgNewConfirm.OnApply();
            Loader.loadFile("mol", data, crystalEditor.I._csManager._cs);

            await crystalEditor.I._dlgProgress.SetProgress(.1);

            crystalEditor.I._3dRender.Clear();

            // boundary input 값 가져와서 설정하기
            let dlgBoundary = crystalEditor.I._dlgBoundarySetting;

            let minX = parseFloat($(dlgBoundary._input_min_x).val());
            let minY = parseFloat($(dlgBoundary._input_min_y).val());
            let minZ = parseFloat($(dlgBoundary._input_min_z).val());
            let maxX = parseFloat($(dlgBoundary._input_max_x).val());
            let maxY = parseFloat($(dlgBoundary._input_max_y).val());
            let maxZ = parseFloat($(dlgBoundary._input_max_z).val());

            crystalEditor.I._csManager._cs._boundary.set(new Vector3(minX, minY, minZ), new Vector3(maxX, maxY, maxZ));
            crystalEditor.I._csManager._cs.generate();
            
            await crystalEditor.I._dlgProgress.SetProgress(.5);

            crystalEditor.I._3dRender._renderer.autofitCameraObjList([crystalEditor.I._csManager._cs.getMesh()], 100);

            crystalEditor.I.UpdateStructureProperty();
            crystalEditor.I.UpdateRenderOptions();

            crystalEditor.I._dlgEditData.UpdateTableByCS(crystalEditor.I._csManager._cs);
            crystalEditor.I._dlgEditData.UpdateUnitcellByCS(crystalEditor.I._csManager._cs);
            crystalEditor.I._dlgEditData.UpdateCrystalColor();
            crystalEditor.I._dlgEditBond.UpdateTableByCS(crystalEditor.I._csManager._cs);
            crystalEditor.I._dlgEditLatticePlane.UpdateTableByCS(crystalEditor.I._csManager._cs);
            crystalEditor.I._dlgEditBond.UpdateTable();
            crystalEditor.I._property.UpdateUI();


            await crystalEditor.I._dlgProgress.SetProgress(.7);


            crystalEditor.I._dlgEditVectors.UpdateTable();
            crystalEditor.I._dlgEditVectors.RestoreAddedVectorFromCS();

            await crystalEditor.I._dlgProgress.SetProgress(.9);
            crystalEditor.I._3dRender._renderer._scene.children.pop();
            crystalEditor.I._3dRender._renderer._scene.add(crystalEditor.I._csManager._cs._groupMesh);
            crystalEditor.I._3dRender._renderer.autofitCameraObjList([crystalEditor.I._csManager._cs.getMesh()], 100);

            await crystalEditor.I._dlgProgress.SetProgress(1);
            crystalEditor.I._dlgProgress.CloseDialog();

            crystalEditor.I._bModified = true;

            crystalEditor.I._csManager.ClearUndo();
        }

        fileReader.readAsText(file);
    }

    ExportCIF(filename, cs) {
        let data = Loader.saveFile("cif", cs);
        let blob = new Blob([data], { type: 'text/plain' });
        let url = URL.createObjectURL(blob);

        let hiddenElem = document.createElement('a');
        hiddenElem.href = url;
        hiddenElem.target = '_blank';
        hiddenElem.download = filename + ".cif";
        hiddenElem.click();

        this._bModified = false;
    }

    ExportMOL(filename, cs) {

        let data = Loader.saveFile("mol", cs);
        let blob = new Blob([data], { type: 'text/plain' });
        let url = URL.createObjectURL(blob);

        let hiddenElem = document.createElement('a');
        hiddenElem.href = url;
        hiddenElem.target = '_blank';
        hiddenElem.download = filename + ".mol";
        hiddenElem.click();


        this._bModified = false;
    }

    ExportOBJ(filename, cs) {
        let data = Loader.saveFile("obj", cs);
        let blob = new Blob([data], { type: 'text/plain' });
        let url = URL.createObjectURL(blob);

        let hiddenElem = document.createElement('a');
        hiddenElem.href = url;
        hiddenElem.target = '_blank';
        hiddenElem.download = filename + ".obj";
        hiddenElem.click();

        this._bModified = false;
    }

    /**
     * txt로부터 atom 데이터를 로드한다.
     * 
     * @param {String} txt atom 데이터가 포함된 텍스트
     */
    LoadAtomFromTxt(txt) {

        let res = crystalVariable.parse(txt);

        for (let i = 0; i < res.length; ++i) {
            let atomTxt = res[i];
            let id = AtomDef.GetDefWithID(atomTxt.atom)._atom_number;
            let atom = crystalEditor.I._dlgEditData.createAtom(crystalEditor.I._csManager._cs.assignAtomIdx(), id, "", atomTxt.a, atomTxt.b, atomTxt.c);


            crystalEditDataDialog.I._app._csManager._cs.addAtom(atom);
            crystalEditDataDialog.I.AddAtomToTable(atom._idx, id, atomTxt.atom, "", atomTxt.a, atomTxt.b, atomTxt.c, atomTxt.u, 0);
        }
    }

    /**
     * CStructure를 KCS 파일로 저장한다.
     * @param {String} filename 저장할 파일명
     */
    SaveCSToKCS(filename) {

        let jsonStr = JSON.stringify(crystalEditor.I._csManager._cs.SaveCStructure());
        let jsonData = new Blob([jsonStr], { type: 'text/json' });
        let jsonUrl = URL.createObjectURL(jsonData);

        let hiddenElem = document.createElement('a');
        hiddenElem.href = jsonUrl;
        hiddenElem.target = '_blank';
        hiddenElem.download = filename + '.kcs';
        hiddenElem.click();
    }

    /**
     * Rendering Option 초기화
     * */
    InitRenderOptions() {
        this._renderOptions = JSON.parse(JSON.stringify(cryst.RenderOptionDefault));
        this.UpdateRenderOptions();
    }

    /**
     * Rendering Option 적용
     * */
    UpdateRenderOptions() {

        if (!crystalEditor.I._csManager)
            return;

        crystalEditor.I._csManager._cs.setRenderOption(crystalEditor.I, this._renderOptions);
        // this._renderOptions is option values (see crystalVariable.RenderOptionDefault structure);
        // update render options here
    }

    /**
     * Structure Property 초기화
     * */
    InitStructureProperty() {
        this._structureProperty = JSON.parse(JSON.stringify(cryst.StructurePropertyDefault));
        this.UpdateStructureProperty();
    }

    /**
     * Measure Option 초기화
     * */
    InitMeasureOption() {
        if (!crystalEditor.I._uiHandler) {
            return;
        }

        crystalEditor.I._uiHandler.StartRotate();
    }

    /**
     * Structure Property 업데이트
     * */
    UpdateStructureProperty() {

        // this._structureProperty is option values (see crystalVariable.StructurePropertyDefault structure);;
        // update render options here

        if (this._csManager && this._csManager._cs) {



            // Unitcell Color, Visible
            for (let i = 0; i < this._csManager._cs._groupEtcMesh.children[0].children.length; ++i) {
                this._csManager._cs._groupEtcMesh.children[0].children[i].material.color.set(crystalVariable.ColorRGBtoHexNum(this._structureProperty.UnitCell.Color));
            }

            this._csManager._cs._groupEtcMesh.children[0].visible = this._structureProperty.UnitCell.ShowLine;

            // Atom Shininess, Show Label
            this._csManager._cs.setAtomShininess(this._structureProperty.Atom.Shininess);
            
            // Bond Shininess
            this._csManager._cs.setBondShininess(this._structureProperty.Bond.Shininess);

            // Polyhedron Shininess, Show Line
            this._csManager._cs.setVisiblePolyhedronEdge(this._structureProperty.Polyhedron.ShowLine === 1);
            this._csManager._cs.setPolyhedronShininess(this._structureProperty.Polyhedron.Shininess);

            // Crystal Structure Show Color, Show Line
            this._csManager._cs.setVisibleCrystalShapeEdge(this._structureProperty.Crystal.ShowLine === 1);

            this._property._propertyStyle.OnApply();
        }

    }


    /**
     * 선택한 symmetry 옵션에 맞는 matrix index list를 반환한다.
     * 
     * @returns {Array} symmetry matrix index list
     * */
    GetSymmetryIdxList() {
        let idxList = [];
        let settingNumIdx, spaceGroupIdx;

        if(this._dlgEditData._crystalTableData._selectedSetting)
            settingNumIdx = SettingDef._defOffList[$(this._dlgEditData._crystalTableData._selectedSetting[0]).find(".cryUI_Unit_Cell_Setting_Td").text()]._idx

        if(this._dlgEditData._crystalTableData._selectedSpaceGroup)
            spaceGroupIdx = SpaceGroupDef._defList[$(this._dlgEditData._crystalTableData._selectedSpaceGroup[0]).find(".cryUI_Unit_Cell_Space_Group_Td").text()]._idx

        if (!isNaN(spaceGroupIdx) && !isNaN(settingNumIdx))
            idxList = SYM.getMatrixIdxList(spaceGroupIdx, settingNumIdx);

        if (idxList.length === 0)
            return null;

        return idxList;
    }
}