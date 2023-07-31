import { tVector } from '../CoreCrystal/tVector.js';
import { cryst, crystalVariable } from './crystalVariable.js';

/**
 * Vector 생성 다이얼로그
 * */
export class crystalCreateVectorDialog {

    /**
     * 생성자
     * @param {String} name 다른 앱과 구분하기 위한 이름
     * @param {crystalEditor} app Crystal Editor 앱 참조
     * @param {HTMLElement} div_elem crystalCreateVectorDialog가 부착될 HTML Element
     */
    constructor(name, app, div_elem) {

        this._name = name;

        this._app = app;

        this._div = div_elem;

        this._div.innerHTML = this._appElementHTML(name);

        crystalCreateVectorDialog.I = this;


        this._dialog = $(this._div).dialog({
            autoOpen: false,
            maxHeight: 240,
            height: 240,
            maxWidth: 400,
            width: 400,
            modal: true,
            closeOnEscape: true,
            resizable: false,
            title: "Create Vector",
            buttons: {
                "OK": function () {
                    if (crystalCreateVectorDialog.I._bModified) {
                        crystalCreateVectorDialog.I._app._bModified = true;
                        crystalCreateVectorDialog.I._app._csManager.AddUndo();
                    }
                    crystalCreateVectorDialog.I.OnApply();
                    crystalCreateVectorDialog.I.CloseDialog();
                },

                "Cancel": function () {
                    crystalCreateVectorDialog.I.CloseDialog();
                },
            },

            close: function () {
                crystalCreateVectorDialog.I._show = false;
            }
        });

        this._vectorColor = document.getElementById(name + "_vector_color_background");

        this._input_u = document.getElementById(name + "_lattice_vector_u");
        this._input_v = document.getElementById(name + "_lattice_vector_v");
        this._input_w = document.getElementById(name + "_lattice_vector_w");
        this._radius = document.getElementById(name + "_vector_radius");

        $(this._vectorColor).colorpicker({
            modal: true,
            buttonColorize: true,
            buttonImageOnly: true,
            ok: function (event, formatted) {
                event.target.style.backgroundColor = formatted.css;
            }
        });

        $(this._input_u).on("input", function () {
            if (crystalCreateVectorDialog.I._mode === cryst.Mode.ModifyVector) {
                crystalCreateVectorDialog.I._bModified = true;
            }
        });

        $(this._input_v).on("input", function () {
            if (crystalCreateVectorDialog.I._mode === cryst.Mode.ModifyVector) {
                crystalCreateVectorDialog.I._bModified = true;
            }
        });

        $(this._input_w).on("input", function () {
            if (crystalCreateVectorDialog.I._mode === cryst.Mode.ModifyVector) {
                crystalCreateVectorDialog.I._bModified = true;
            }
        });

        $(this._radius).on("input", function () {
            if (crystalCreateVectorDialog.I._mode === cryst.Mode.ModifyVector) {
                crystalCreateVectorDialog.I._bModified = true;
            }
        });
    }

    /**
     * CreateVectorDialog에 대한 html element를 작성한다.
     * 
     * @param {String} name 다른 앱과 구분하기 위한 이름
     * @returns {String} HTML 문자열
     */
    _appElementHTML(name) {
        let ihtml = [];
        let idx = 0;

        ihtml[idx] = "<div>";
        idx++;

        ihtml[idx] = "<label for='" + name + "_vector_radius'>Radius:</label>";
        idx++;
        ihtml[idx] = "<input class='cryUI_Normal_Td' type='number' id='" + name + "_vector_radius'>";
        idx++;

        ihtml[idx] = "</div><br>";
        idx++;


        // fieldset = label + input number + input number + input number
        ihtml[idx] = "<div>";
        idx++;
        ihtml[idx] = "<fieldset>";
        idx++;
        ihtml[idx] = "<legend>Vector components</legend>";
        idx++;
        ihtml[idx] = "<label for='" + name + "_lattice_vector_notation'>Lattice vector notation [u v w]:</label><br>";
        idx++;
        ihtml[idx] = "<input class='cryUI_Big_Td_With_Margin' type='number' id='" + name + "_lattice_vector_u'>";
        idx++;
        ihtml[idx] = "<input class='cryUI_Big_Td_With_Margin' type='number' id='" + name + "_lattice_vector_v'>";
        idx++;
        ihtml[idx] = "<input class='cryUI_Big_Td_With_Margin' type='number' id='" + name + "_lattice_vector_w'>";
        idx++;
        ihtml[idx] = "</fieldset>";
        idx++;
        ihtml[idx] = "</div>";
        idx++;

        // label + input number + input number + input number + color picker
        ihtml[idx] = "<div><br>";
        idx++;
        ihtml[idx] = "<label for='" + name + "_vector_color'>Color:</label>";
        idx++;
        ihtml[idx] = "<input type='text' id='" + name + "_vector_color_background'>";
        idx++;
        ihtml[idx] = "</div>";
        idx++;

        return ihtml.join("");
    }

    /**
     * 다이얼로그를 띄운다.
     * */
    ShowDialog() {
        if (this._show)
            return;

        this._dialog.dialog("open");
        this._show = true;

        if (this._mode === cryst.Mode.AddVector)
            this.SetDefault();
        else
            this.SetSelected();
    }

    /**
     * 다이얼로그를 닫는다.
     * */
    CloseDialog() {
        this._dialog.dialog("close");
        this._show = false;
        this._bModified = false;
        this._app.UpdateUI();
    }

    /**
     * 다이얼로그 내역을 적용시킨다.
     * */
    OnApply() {
        if (this._mode === cryst.Mode.AddVector) {
            this.AddVector();
            crystalCreateVectorDialog.I._app._dlgEditVectors._vectors_tab._crystal_vectors_table.initSelect();
            crystalCreateVectorDialog.I._app._dlgEditVectors._vectors_tab._crystal_vectors_table.selectLast();

        }
        else if (this._mode === cryst.Mode.ModifyVector)
            this.ModifyVector();


    }

    /**
     * 입력란 초기화
     * */
    SetDefault() {
        $(this._input_u).val(0.1);
        $(this._input_v).val(0.0);
        $(this._input_w).val(0.0);
        $(this._radius).val(0.1);
        $(this._vectorColor).val("ff0000");
        $(this._vectorColor).css("background-color", "rgb(255,0,0)");
    }

    /**
     * 선택된 row 데이터를 입력창에 적용한다.
     * */
    SetSelected() {
        let selected = this._app._dlgEditVectors._vectors_tab._crystal_vectors_table.getSelected();

        if (selected.length === 1) {
            let u = parseFloat($(selected[0]).find("#" + this._name + "_edit_vectors_u").text());
            let v = parseFloat($(selected[0]).find("#" + this._name + "_edit_vectors_v").text());
            let w = parseFloat($(selected[0]).find("#" + this._name + "_edit_vectors_w").text());
            let radius = parseFloat($(selected[0]).find("#" + this._name + "_edit_vectors_radius").text());
            let color = crystalVariable.HTMLColorRGB($(selected[0]).find("#" + this._name + "_vectors_tab_vector_color").text().split(","));

            let rgb = crystalVariable.HexStringtoColor(color);

            $(this._input_u).val(u);
            $(this._input_v).val(v);
            $(this._input_w).val(w);
            $(this._radius).val(radius);
            $(this._vectorColor).val(color);

            $(this._vectorColor).css("background-color", "rgb(" + rgb[0] * 255 + "," + rgb[1] * 255 + "," + rgb[2] * 255 + ")");
        }

    }

    /**
     * 벡터를 추가한다.
     * */
    AddVector() {
        let u = parseFloat($(this._input_u).val());
        let v = parseFloat($(this._input_v).val());
        let w = parseFloat($(this._input_w).val());
        let radius = parseFloat($(this._radius).val());
        let color = crystalVariable.HexStringtoColor($(this._vectorColor).val());

     
        let tvector = new tVector([u, v, w], color, radius);

        // csManager에 추가하기
        this._app._csManager._cs.addtVector(tvector);

        // table에 추가하기
        this._app._dlgEditVectors._vectors_tab._crystal_vectors_table.appTable("\
            <td class='cryUI_Big_Td' id='" + this._name + "_edit_vectors_u'>" + u + "</td>\
            <td class='cryUI_Big_Td' id='" + this._name + "_edit_vectors_v'>" + v + "</td>\
            <td class='cryUI_Big_Td' id='" + this._name + "_edit_vectors_w'>" + w + "</td >\
            <td class='cryUI_Big_Td'>0</td>\
            <td class='cryUI_Big_Td' id='" + this._name + "_edit_vectors_radius'>" + radius + "</td>\
            <td id='" + this._name + "_vectors_tab_vector_number' style='display:none'>" + tvector._number + "</td>\
            <td id='" + this._name + "_vectors_tab_vector_color' style='display:none'>" + color[0] + "," + color[1] + "," + color[2] + "</td>\
            ", true);
    }

    /**
     * 기존 벡터를 수정한다.
     * */
    ModifyVector() {    
        let currentVector = this._app._dlgEditVectors._vectors_tab._crystal_vectors_table.getSelected();
        if (currentVector.length === 1) {
            let currentRow = currentVector[0];
            let number = parseInt($(currentRow).find("#" + this._name + "_vectors_tab_vector_number").html());

            let u = parseFloat($(this._input_u).val());
            let v = parseFloat($(this._input_v).val());
            let w = parseFloat($(this._input_w).val());
            let radius = parseFloat($(this._radius).val());

            // csManager로부터 해당 vector를 가져온다
            let vector = this._app._csManager._cs.gettVectorByNumber(number)[0];

            vector._vector = [u, v, w];
            let color = crystalVariable.HexStringtoColor($(this._vectorColor).val());
            vector._color = color;
            vector._radius = radius;
            this._app._csManager._cs.generateMesh4iVectors();

            // row 재설정
            $(currentRow).find("#" + this._name + "_vectors_tab_vector_color").html(color[0] + "," + color[1] + "," + color[2]);
            $(currentRow).find("#" + this._name + "_edit_vectors_u").html(u);
            $(currentRow).find("#" + this._name + "_edit_vectors_v").html(v);
            $(currentRow).find("#" + this._name + "_edit_vectors_w").html(w);

            // 현재 이 벡터를 참조하고 있는 atom의 벡터를 모두 갱신한다.
            crystalCreateVectorDialog.I._app._dlgEditVectors.generateStructure();
            crystalCreateVectorDialog.I._app.UpdateStructureProperty();
        }
    }

   
}