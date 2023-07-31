import { cryst } from './crystalVariable.js';
import { CrystalShape } from '../CoreCrystal/CrystalShape.js';

/**
 * property style 탭 클래스
 * */
export class crystalPropertyStyle {


    /**
     * 생성자
     * @param {String} name 다른 앱과 구분하기 위한 이름
     * @param {crystalEditor} app 상위 앱 객체
     * @param {HTMLElement} div_elem crystalPropertyStyle이 부착될 HTML Element
     */
    constructor(name, app, div_elem) {

        this._name = name;

        this._app = app;

        this._div = div_elem;

        this._div.innerHTML = this._appElementHTML(name);

        crystalPropertyStyle.I = this;

        this._showModels = false;
        this._showDotSurface = false;
        this._styleStructMode = null;

        this._showAtoms = true;
        this._showBonds = true;

        this._showSections = false;
        this._showIsoSurface = false;
        this._surfaceColoring = false;
        this._styleVolumeMode = null;

        this._showShapes = false;
        this._styleCrystalMode = null;

        // Structural style
        this._chkStructShowModels = document.getElementById(name + "_structural_modes_1");
        this._chkStructShowDotSurface = document.getElementById(name + "_structural_modes_2");

        this._chkStructuralStyle = [];
        this._chkStructuralStyle.push(document.getElementById(name + "_style_1"));
        this._chkStructuralStyle.push(document.getElementById(name + "_style_2"));
        this._chkStructuralStyle.push(document.getElementById(name + "_style_3"));
        this._chkStructuralStyle.push(document.getElementById(name + "_style_4"));
        this._chkStructuralStyle.push(document.getElementById(name + "_style_5"));

        this._chkAtomVisibility = document.getElementById(name + "_visibility_1");
        this._chkBondVisibility = document.getElementById(name + "_visibility_2");


        // Volumetric style
        this._chkVolumeShowSections = document.getElementById(name + "_volumetric_data_1");
        this._chkVolumeShowIsoSurface = document.getElementById(name + "_volumetric_data_2");
        this._chkVolumeSurfaceColoring = document.getElementById(name + "_volumetric_data_3");

        this._chkVolumetricStyle = [];
        this._chkVolumetricStyle.push(document.getElementById(name + "_volumetric_data_style_1"));
        this._chkVolumetricStyle.push(document.getElementById(name + "_volumetric_data_style_2"));
        this._chkVolumetricStyle.push(document.getElementById(name + "_volumetric_data_style_3"));

        // Crystal style
        this._chkCrystalShowShapes = document.getElementById(name + "_crystal_shapes_1");
        this._chkCrystalShapes = [];
        this._chkCrystalShapes.push(document.getElementById(name + "_crystal_shapes_style_1"));
        // this._chkCrystalShapes.push(document.getElementById(name + "_crystal_shapes_style_2"));
        this._chkCrystalShapes.push(document.getElementById(name + "_crystal_shapes_style_3"));


        this._btnProperties = document.getElementById(name + "_style_properties");
        this._btnBoundary = document.getElementById(name + "_style_boundary");
        // this._btnOrientation = document.getElementById(name + "_style_orientation");
        this._btnResize = document.getElementById(name + "_resizeable");


        // Style Tab Btn
        $(this._chkStructShowModels).checkboxradio();
        $(this._chkStructShowDotSurface).checkboxradio();

        for (let chkStructuralStyle of this._chkStructuralStyle) {
            $(chkStructuralStyle).checkboxradio();
        }

        $(this._chkVolumeShowSections).checkboxradio();
        $(this._chkVolumeShowIsoSurface).checkboxradio();
        $(this._chkVolumeSurfaceColoring).checkboxradio();

        for (let chkVolumetricStyle of this._chkVolumetricStyle) {
            $(chkVolumetricStyle).checkboxradio();
        }

        // Visibility
        $(this._chkAtomVisibility).checkboxradio();
        $(this._chkBondVisibility).checkboxradio();
        $(this._chkAtomVisibility).prop("checked", true);
        $(this._chkAtomVisibility).checkboxradio("refresh");
        $(this._chkBondVisibility).prop("checked", true);
        $(this._chkBondVisibility).checkboxradio("refresh");
        // Crystal shapes
        $(this._chkCrystalShowShapes).checkboxradio();

        for (let chkCrystalShapes of this._chkCrystalShapes) {
            $(chkCrystalShapes).checkboxradio();
        }

        // 하단 버튼
        $(this._btnProperties).button();
        $(this._btnBoundary).button();
        // $(this._btnOrientation).button();

        $(this._btnProperties).click(function () {
            // show property dialog
            crystalPropertyStyle.I._app._dlgStructureProperty.ShowDialog();
        });

        $(this._btnBoundary).click(function () {
            // show boundary setting dialog
            crystalPropertyStyle.I._app._dlgBoundarySetting.ShowDialog();
        });

        for (let label of $(this._div).find("label")) {
            label.classList.add("cryUI_CheckRadio_Btn_NoBorder");
        }

        for (let i = 0; i < this._chkStructuralStyle.length; ++i) {
            $(this._chkStructuralStyle[i]).change(function () {
                if (this.checked) {
                    crystalPropertyStyle.I._app._csManager._cs.setRenderStyle(i);
                    cryst.Style.StructuralMode = i;

                    if (i === 2) {
                        crystalPropertyStyle.I._app._csManager._cs.setVisiblePolyhedron(true);
                    }
                    else {
                        crystalPropertyStyle.I._app._csManager._cs.setVisiblePolyhedron(false);
                    }
                }
            });
        }

        $(this._chkCrystalShapes[0]).change(function () {
            let visible = $(crystalPropertyStyle.I._chkCrystalShowShapes).prop('checked');
            if (this.checked) {
                if (crystalPropertyStyle.I._app._csManager._cs._crystalShape._mesh) {
                    crystalPropertyStyle.I._app._csManager._cs._crystalShape._mesh.material.wireframe = false;
                }

                // color는 crystal shape에 color picker를 다시 넣어서 거기서 가져오도록하자
                if (crystalPropertyStyle.I._app._csManager._cs._crystalShape) {
                    crystalPropertyStyle.I._app._csManager._cs._crystalShape.dispose();
                    crystalPropertyStyle.I._app._csManager._cs._crystalShape = null;
                }

                crystalPropertyStyle.I._app._csManager._cs._crystalShape = new CrystalShape(crystalPropertyStyle.I._app._csManager._cs._groupEtcMesh);
                crystalPropertyStyle.I._app._csManager._cs.generateCrystalShape();
                crystalPropertyStyle.I._app._csManager._cs._crystalShape.setColor(crystalPropertyStyle.I._app._dlgEditData._selectedShapeColor);
                crystalPropertyStyle.I._app._csManager._cs._crystalShape.setVisible(visible);
                crystalPropertyStyle.I._app._csManager._cs._crystalShape._visible = visible;
            }
        });

        $(this._chkCrystalShapes[1]).change(function () {
            if (this.checked) {
                if (crystalPropertyStyle.I._app._csManager._cs._crystalShape._mesh) {
                    crystalPropertyStyle.I._app._csManager._cs._crystalShape._mesh.material.wireframe = true;
                }
            }
        });

        $(this._chkStructShowModels).click(function () {
            if (this.checked) {
                crystalPropertyStyle.I._app._csManager._cs.getMesh().visible = true;

                crystalPropertyStyle.I._app._csManager._cs.ClipBoundary();
            }
            else {
                crystalPropertyStyle.I._app._csManager._cs.getMesh().visible = false;
            }
        });

        $(this._chkAtomVisibility).click(function () {
            crystalPropertyStyle.I._app._csManager._cs._groupAtomMesh.visible = this.checked;
        });

        $(this._chkBondVisibility).click(function () {
            crystalPropertyStyle.I._app._csManager._cs._groupBondMesh.visible = this.checked;
        });

        $(this._chkStructShowDotSurface).click(function () {

            crystalPropertyStyle.I._app._csManager._cs.showDotSurface(this.checked);
            cryst.Style.ShowDotSurface = this.checked;
        });

        $(this._chkCrystalShowShapes).click(function () {
            crystalPropertyStyle.I._app._csManager._cs._crystalShape._visible = this.checked;
            crystalPropertyStyle.I._app._csManager._cs._crystalShape.setVisible(this.checked);
        });

        this.UpdateUI();
    }

    /**
     * PropertyStyle에 대한 html element를 작성한다.
     * 
     * @param {String} name 다른 앱과 구분하기 위한 이름
     * @returns {String} HTML 문자열
     */
    _appElementHTML(name) {
        let ihtml = [];
        let idx = 0;

        ihtml[idx] = "<fieldset>";
        idx++;
        ihtml[idx] = "<legend>Structural models</legend>";
        idx++;
        ihtml[idx] = "<label for='" + name + "_structural_modes_1'>Show models</label>";
        idx++;
        ihtml[idx] = "<input type='checkbox' name='structural_modes_1' id='" + name + "_structural_modes_1'>";
        idx++;
        ihtml[idx] = "<br>";
        idx++;
        ihtml[idx] = "<label for='" + name + "_structural_modes_2'>Show dot surface</label>";
        idx++;
        ihtml[idx] = "<input type='checkbox' name='structural_modes_2' id='" + name + "_structural_modes_2'>";
        idx++;

        ihtml[idx] = "<fieldset>";
        idx++;
        ihtml[idx] = "<legend>Style</legend>";
        idx++;
        ihtml[idx] = "<label for='" + name + "_style_1'>Ball-and-stick</label>";
        idx++;
        ihtml[idx] = "<input type='radio' name='style' id='" + name + "_style_1'>";
        idx++;
        ihtml[idx] = "<br>";
        idx++;
        ihtml[idx] = "<label for='" + name + "_style_2'>Space-filling</label>";
        idx++;
        ihtml[idx] = "<input type='radio' name='style' id='" + name + "_style_2'>";
        idx++;
        ihtml[idx] = "<br>";
        idx++;
        ihtml[idx] = "<label for='" + name + "_style_3'>Polyhedral</label>";
        idx++;
        ihtml[idx] = "<input type='radio' name='style' id='" + name + "_style_3'>";
        idx++;
        ihtml[idx] = "<br>";
        idx++;
        ihtml[idx] = "<label for='" + name + "_style_4'>Wireframe</label>";
        idx++;
        ihtml[idx] = "<input type='radio' name='style' id='" + name + "_style_4'>";
        idx++;
        ihtml[idx] = "<br>";
        idx++;
        ihtml[idx] = "<label for='" + name + "_style_5'>Stick</label>";
        idx++;
        ihtml[idx] = "<input type='radio' name='style' id='" + name + "_style_5'>";
        idx++;
        ihtml[idx] = "<br>";
        idx++;
        ihtml[idx] = "</fieldset></fieldset>";
        idx++;

        ihtml[idx] = "<br><br><fieldset>";
        idx++;
        ihtml[idx] = "<legend>Visibility</legend>";
        idx++;
        ihtml[idx] = "<label for='" + name + "_visibility_1'>Show atoms</label>";
        idx++;
        ihtml[idx] = "<input type='checkbox' name='visibility' id='" + name + "_visibility_1'>";
        idx++;
        ihtml[idx] = "<br>";
        idx++;
        ihtml[idx] = "<label for='" + name + "_visibility_2'>Show bonds</label>";
        idx++;
        ihtml[idx] = "<input type='checkbox' name='visibility' id='" + name + "_visibility_2'>";
        idx++;
        ihtml[idx] = "<br>";
        idx++;
        ihtml[idx] = "</fieldset>";
        idx++;


        ihtml[idx] = "<br><br><fieldset>";
        idx++;
        ihtml[idx] = "<legend>Crystal shapes</legend>";
        idx++;
        ihtml[idx] = "<label for='" + name + "_crystal_shapes_1'>Show shapes</label>";
        idx++;
        ihtml[idx] = "<input type='checkbox' name='crystal_shapes' id='" + name + "_crystal_shapes_1'>";
        idx++;
        ihtml[idx] = "<fieldset>";
        idx++;
        ihtml[idx] = "<legend>Style</legend>";
        idx++;
        ihtml[idx] = "<label for='" + name + "_crystal_shapes_style_1'>Unicolor</label>";
        idx++;
        ihtml[idx] = "<input type='radio' name='crystal_shapes_style' id='" + name + "_crystal_shapes_style_1'>";
        idx++;
        ihtml[idx] = "<br>";
        idx++;
        /*
        ihtml[idx] = "<label for='" + name + "_crystal_shapes_style_2'>Custom color</label>";
        idx++;
        ihtml[idx] = "<input type='radio' name='crystal_shapes_style' id='" + name + "_crystal_shapes_style_2'>";
        idx++;
        ihtml[idx] = "<br>";
        idx++;
        */
        ihtml[idx] = "<label for='" + name + "_crystal_shapes_style_3'>Wireframe</label>";
        idx++;
        ihtml[idx] = "<input type='radio' name='crystal_shapes_style' id='" + name + "_crystal_shapes_style_3'>";
        idx++;
        ihtml[idx] = "</fieldset></fieldset>";
        idx++;
        

        ihtml[idx] = "<br><br>";
        idx++;
        ihtml[idx] = "<button title='Properties' id='" + name + "_style_properties' class='ui-button ui-widget ui-corner-all cryUI_propertyBar_Btn_X2_Tool'>Properties</button>";
        idx++;
        ihtml[idx] = "<br>";
        idx++;
        ihtml[idx] = "<button title='Boundary' id='" + name + "_style_boundary' class='ui-button ui-widget ui-corner-all cryUI_propertyBar_Btn_X2_Tool'>Boundary...</button>";
        idx++;
        /*
        ihtml[idx] = "<button title='Orientation' id='" + name + "_style_orientation' class='ui-button ui-widget ui-corner-all cryUI_propertyBar_Btn_Tool'>Orientation...</button>";
        idx++;
        */
        return ihtml.join("");
    }

    /**
     * UI 업데이트
     * */
    UpdateUI() {
        // cryst에서 값 가져오기
        this._showModels = cryst.Style.ShowModel;
        this._showDotSurface = cryst.Style.ShowDotSurface;
        this._styleStructMode = cryst.Style.StructuralMode;

        this._showSections = cryst.Style.VolumetricSection;
        this._showIsoSurface = cryst.Style.VolumetricIsoSurface;
        this._surfaceColoring = cryst.Style.VolumetricSurfaceColor;
        this._styleVolumeMode = cryst.Style.VolumetricMode;

        this._showShapes = cryst.Style.ShowCrystalShape;
        this._styleCrystalMode = cryst.Style.CrystalMode;

        // 상황에 맞게 ui 설정
        $(this._chkStructShowModels).prop("checked", cryst.Style.ShowModel);
        $(this._chkStructShowModels).checkboxradio("refresh");

        $(this._chkStructShowDotSurface).prop("checked", cryst.Style.ShowDotSurface);
        $(this._chkStructShowDotSurface).checkboxradio("refresh");

        for (let i = 0; i < this._chkStructuralStyle.length; ++i) {
            $(this._chkStructuralStyle[i]).prop("checked", false);
        }
        $(this._chkStructuralStyle[cryst.Style.StructuralMode]).prop("checked", true);
        for (let i = 0; i < this._chkStructuralStyle.length; ++i) {
            $(this._chkStructuralStyle[i]).checkboxradio("refresh");
        }

        $(this._chkVolumeShowSections).prop("checked", cryst.Style.VolumetricSection);
        $(this._chkVolumeShowSections).checkboxradio("refresh");
        $(this._chkVolumeShowIsoSurface).prop("checked", cryst.Style.VolumetricIsoSurface);
        $(this._chkVolumeShowIsoSurface).checkboxradio("refresh");
        $(this._chkVolumeSurfaceColoring).prop("checked", cryst.Style.VolumetricSurfaceColor);
        $(this._chkVolumeSurfaceColoring).checkboxradio("refresh");

        for (let i = 0; i < this._chkVolumetricStyle.length; ++i) {
            $(this._chkVolumetricStyle[i]).prop("checked", false);
        }
        $(this._chkVolumetricStyle[cryst.Style.VolumetricMode]).prop("checked", true);
        for (let i = 0; i < this._chkVolumetricStyle.length; ++i) {
            $(this._chkVolumetricStyle[i]).checkboxradio("refresh");
        }


        $(this._chkCrystalShowShapes).prop("checked", cryst.Style.ShowCrystalShape);
        $(this._chkCrystalShowShapes).checkboxradio("refresh");

        for (let i = 0; i < this._chkCrystalShapes.length; ++i) {
            $(this._chkCrystalShapes[i]).prop("checked", false);
        }
        $(this._chkCrystalShapes[cryst.Style.CrystalMode]).prop("checked", true);
        for (let i = 0; i < this._chkCrystalShapes.length; ++i) {
            $(this._chkCrystalShapes[i]).checkboxradio("refresh");
        }

    }

    /**
     * 기본값 복원
     * */
    RestoreDefaults() {
        cryst.RestoreDefaults();
        this.UpdateUI();
        this.OnApply();
    }

    OnApply() {

        this._app._csManager._cs.setRenderStyle(cryst.Style.StructuralMode);
        if (cryst.Style.StructuralMode === 2) {
            this._app._csManager._cs.setVisiblePolyhedron(true);
        }
        else {
            this._app._csManager._cs.setVisiblePolyhedron(false);
        }

        if ($(this._chkCrystalShapes[0]).prop('checked') === true) {
            if (this._app._csManager._cs._crystalShape._mesh) {
                this._app._csManager._cs._crystalShape._mesh.material.wireframe = false;
            }
            // color는 crystal shape에 color picker를 다시 넣어서 거기서 가져오도록하자
            if (this._app._csManager._cs._crystalShape) {
                this._app._csManager._cs._crystalShape.dispose();
                this._app._csManager._cs._crystalShape = null;
            }

            this._app._csManager._cs._crystalShape = new CrystalShape(this._app._csManager._cs._groupEtcMesh);
            this._app._csManager._cs.generateCrystalShape();
            this._app._csManager._cs._crystalShape.setColor(this._app._dlgEditData._selectedShapeColor);

        }
        else {
            if (this._app._csManager._cs._crystalShape._mesh) {
                this._app._csManager._cs._crystalShape._mesh.material.wireframe = true;
            }
        }

        if($(this._chkCrystalShapes[1]).prop('checked') === true) {
            if (this._app._csManager._cs._crystalShape._mesh) {
                this._app._csManager._cs._crystalShape._mesh.material.wireframe = true;
            }
        };

        if($(this._chkStructShowModels).prop('checked') === true) {
            this._app._csManager._cs.getMesh().visible = true;
            this._app._csManager._cs.ClipBoundary();
        }
        else {
            this._app._csManager._cs.getMesh().visible = false;
        }
 

        this._app._csManager._cs._groupAtomMesh.visible = $(this._chkAtomVisibility).prop('checked');
        this._app._csManager._cs._groupBondMesh.visible = $(this._chkBondVisibility).prop('checked');

        this._app._csManager._cs.showDotSurface($(this._chkStructShowDotSurface).prop('checked'));

        this._app._csManager._cs._crystalShape._visible = $(this._chkCrystalShowShapes).prop('checked');
    }
}