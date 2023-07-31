/**
 * property tool 클래스
 * */
export class crystalPropertyTool {

    /**
     * 생성자
     * @param {String} name 다른 앱과 구분하기 위한 이름
     * @param {crystalEditor} app 상위 앱 객체
     * @param {HTMLElement} div_elem crystalPropertyTool이 부착될 HTML Element
     */
    constructor(name, app, div_elem) {

        this._name = name;

        this._app = app;

        this._div = div_elem;

        this._div.innerHTML = this._appElementHTML(name);

        crystalPropertyTool.I = this;
        // Tools Tab Btn
        //this._btnRotationModeDrag = document.getElementById(name + "_rotation_mode_1");
        //this._btnRotationModeAnimtaion = document.getElementById(name + "_rotation_mode_2");

        this._btnOrientationNoRotation = document.getElementById(name + "_orientation_mode_1");
        this._btnOrientationAroundXAxis = document.getElementById(name + "_orientation_mode_2");
        this._btnOrientationAroundYAxis = document.getElementById(name + "_orientation_mode_3");
        this._btnOrientationAroundZAxis = document.getElementById(name + "_orientation_mode_4");

        this._rotationMode = 0;
        this._orientationMode = -1;

        // Tools Tab Btn
        // $(this._btnRotationModeDrag).checkboxradio();
        // $(this._btnRotationModeAnimtaion).checkboxradio();

        $(this._btnOrientationNoRotation).checkboxradio();
        $(this._btnOrientationAroundXAxis).checkboxradio();
        $(this._btnOrientationAroundYAxis).checkboxradio();
        $(this._btnOrientationAroundZAxis).checkboxradio();

        for (let label of $(this._div).find("label")) {
            label.classList.add("cryUI_CheckRadio_Btn_NoBorder");
        }

        $(this._btnOrientationNoRotation).click(function (event) {
            crystalPropertyTool.I._orientationMode = -1;
        });

        $(this._btnOrientationNoRotation).prop("checked", true).checkboxradio('refresh');

        $(this._btnOrientationAroundXAxis).click(function (event) {
            crystalPropertyTool.I._orientationMode = 1;
        });

        $(this._btnOrientationAroundYAxis).click(function (event) {
            crystalPropertyTool.I._orientationMode = 0;
        });

        $(this._btnOrientationAroundZAxis).click(function (event) {
            crystalPropertyTool.I._orientationMode = 2;
        });
    }

    /**
     * PropertyTool에 대한 html element를 작성한다.
     * 
     * @param {String} name 다른 앱과 구분하기 위한 이름
     * @returns {String} HTML 문자열
     */
    _appElementHTML(name) {
        let ihtml = [];
        let idx = 0;

        /*
        ihtml[idx] = "<fieldset>";
        idx++;
        ihtml[idx] = "<legend>Rotation modes</legend>";
        idx++;
        ihtml[idx] = "<label for='" + name + "_rotation_mode_1'>Drag</label>";
        idx++;
        ihtml[idx] = "<input type='radio' name='rotation_mode' id='" + name + "_rotation_mode_1'>";
        idx++;
        ihtml[idx] = "<label for='" + name + "_rotation_mode_2'>Animation</label>";
        idx++;
        ihtml[idx] = "<input type='radio' name='rotation_mode' id='" + name + "_rotation_mode_2'>";
        idx++;
        */
        ihtml[idx] = "<fieldset>";
        idx++;
       
        ihtml[idx] = "<legend>Orientation</legend>";
        idx++;

        ihtml[idx] = "<label for='" + name + "_orientation_mode_1'>No rotation</label>";
        idx++;
        ihtml[idx] = "<input type='radio' name='orientation_mode' id='" + name + "_orientation_mode_1'>";
        idx++;
        ihtml[idx] = "<br>";
        idx++;

        ihtml[idx] = "<label for='" + name + "_orientation_mode_2'>Around X axis</label>";
        idx++;
        ihtml[idx] = "<input type='radio' name='orientation_mode' id='" + name + "_orientation_mode_2'>";
        idx++;
        ihtml[idx] = "<br>";
        idx++;

        ihtml[idx] = "<label for='" + name + "_orientation_mode_3'>Around Y axis</label>";
        idx++;
        ihtml[idx] = "<input type='radio' name='orientation_mode' id='" + name + "_orientation_mode_3'>";
        idx++;
        ihtml[idx] = "<br>";
        idx++;

        ihtml[idx] = "<label for='" + name + "_orientation_mode_4'>Around Z axis</label>";
        idx++;
        ihtml[idx] = "<input type='radio' name='orientation_mode' id='" + name + "_orientation_mode_4'>";
        idx++;
        ihtml[idx] = "<br>";
        idx++;

        /*
        ihtml[idx] = "</fieldset>";
        idx++;
        */
        ihtml[idx] = "</fieldset>";
        idx++;

        return ihtml.join("");
    }
}