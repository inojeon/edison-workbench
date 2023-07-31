import { crystalEditDataDialog } from './crystalEditDataDialog.js';
import { SystemDef, SpaceGroupDef, SettingDef } from './SymmetryDef.js';
import { rayLog } from '../Renderer/log.js';

/**
 * Symmetry Matrix 모음 테이블
 * */
export class crystalTableData {

    /**
     * 생성자
     * @param {String} name 다른 앱과 구분하기 위한 이름
     * @param {crystalEditDataDialog} crystalEditDataDiglog 상위 객체
     */
    constructor(name, crystalEditDataDiglog) {
        this._name = name;

        this._dlgEditData = crystalEditDataDiglog;

        crystalTableData.I = this;

        this._system_table = this._dlgEditData._system_table;

        this._space_group_table = this._dlgEditData._space_group_table;

        this._setting_table = this._dlgEditData._setting_table;

        this._system_table.createHeader("\
            <th class='cryUI_Unit_Cell_Td'>System</th>\
        ", false);

        this._space_group_table.createHeader("\
            <th class='cryUI_Unit_Cell_Num_Td'>No.</th>\
            <th class='cryUI_Unit_Cell_Td'>Space Group</th>\
        ", false);


        this._setting_table.createHeader("\
            <th class='cryUI_Unit_Cell_Num_Td'>No.</th>\
            <th class='cryUI_Unit_Cell_Setting_Td'>Setting</th>\
        ", false);


        this._bMagnetic = false;

        this._selectedSystem = null;

        this._selectedSpaceGroup = null;

        this._selectedSetting = null;

        crystalTableData.I = this;


        this._system_table.applySelectable(this.clickSystemData);
        this._space_group_table.applySelectable(this.clickSpaceGroupData);
        this._setting_table.applySelectable(this.clickSettingData);


        this._systemArray = [
            null,
            null,
            [0, 1],
            [2, 14],
            [15, 73],
            [74, 141],
            [142, 166],
            [167, 193],
            [194, 229]
        ];

        this.addSystemData();

        let idx = 0;
        for (let elem of Array.prototype.slice.call(crystalTableData.I._system_table._div.getElementsByTagName('tr'))) {
            idx++;
            if (idx % 2 === 0)
                crystalTableData.I.applyColor(elem, false);
            else
                crystalTableData.I.applyColor(elem, true);
        }

        this.addSpaceGroupData();

        this.hideElement(this._space_group_table._div.getElementsByTagName('tr'), true);
        this.hideElement(this._space_group_table._div.getElementsByTagName('tr')[0], false);

    }

    /**
     * 시스템 테이블 추가
     * */
    addSystemData() {
        let sysData = SystemDef._defList;

        for (let data of Object.keys(sysData)) {
            this._system_table.appTable("\
                <td class='cryUI_Unit_Cell_Td'>" + data + "</td>\
                ");
        }

        // add mouse event listener => get selected
        let table = document.getElementById(this._name + "_System");
        if (table != null) {
            for (let i = 0; i < table.rows.length; i++) {
                for (let j = 0; j < table.rows[i].cells.length; j++)
                    table.rows[i].cells[j].onmouseup = function () {
                        crystalTableData.I.clickSystemData();
                    };
            }
        }
    }

    /**
     * 시스템 테이블 클릭 시 처리
     * */
    clickSystemData() {
        let selected = crystalTableData.I._system_table.getSelected();
        if (selected.length !== 1) {
            crystalTableData.I._system_table.initSelect();
            crystalTableData.I._selectedSystem = null;
            return;
        }
        else {
            crystalTableData.I._selectedSystem = selected;
            crystalTableData.I._setting_table.clearAll();

            // 선택된 system data에 따라 space group row를 enable 혹은 disable 시킨다.
            let systemKey = crystalTableData.I._selectedSystem[0].innerText;
            let range = SystemDef._defList[systemKey]._range;
            let lattice = SystemDef._defList[systemKey]._enableLattice;

            if (range[0] !== -1) {
                crystalTableData.I.hideElement(crystalTableData.I._space_group_table._div.getElementsByTagName('tr'), true);
                crystalTableData.I.hideElement(Array.prototype.slice.call(crystalTableData.I._space_group_table._div.getElementsByTagName('tr'))[0], false);
                crystalTableData.I.hideElement(Array.prototype.slice.call(crystalTableData.I._space_group_table._div.getElementsByTagName('tr')).slice(range[0], range[1] + 1), false);

                let idx = 0;
                for (let elem of Array.prototype.slice.call(crystalTableData.I._space_group_table._div.querySelectorAll('tr:not([style*="display:none"])'))) {
                    idx++;
                    if (idx % 2 === 0)
                        crystalTableData.I.applyColor(elem, false);
                    else
                        crystalTableData.I.applyColor(elem, true);
                }
            }
            else {
                if (systemKey === 'Custom' || systemKey === 'Molecule') {
                    crystalTableData.I.hideElement(crystalTableData.I._space_group_table._div.getElementsByTagName('tr'), true);
                    crystalTableData.I.hideElement(Array.prototype.slice.call(crystalTableData.I._space_group_table._div.getElementsByTagName('tr'))[0], false);

                    let idx = 0;
                    for (let elem of Array.prototype.slice.call(crystalTableData.I._space_group_table._div.querySelectorAll('tr:not([style*="display:none"])'))) {
                        idx++;
                        if (idx % 2 === 0)
                            crystalTableData.I.applyColor(elem, false);
                        else
                            crystalTableData.I.applyColor(elem, true);
                    }
                }
            }

            if (crystalTableData.I._selectedSpaceGroup) {
                crystalTableData.I._selectedSpaceGroup.removeClass('ui-selected');
                crystalTableData.I._selectedSpaceGroup = null;
            }
            if (crystalTableData.I._selectedSetting) {
                crystalTableData.I._selectedSetting.removeClass('ui-selected');
                crystalTableData.I._selectedSetting = null;
            }

            if (lattice) {
                $(crystalTableData.I._dlgEditData._input_a_length).attr("disabled", !lattice._enableA);
                $(crystalTableData.I._dlgEditData._input_b_length).attr("disabled", !lattice._enableB);
                $(crystalTableData.I._dlgEditData._input_c_length).attr("disabled", !lattice._enableC);
                $(crystalTableData.I._dlgEditData._input_alpha).attr("disabled", !lattice._enableAlpha);
                $(crystalTableData.I._dlgEditData._input_beta).attr("disabled", !lattice._enableBeta);
                $(crystalTableData.I._dlgEditData._input_gamma).attr("disabled", !lattice._enableGamma);
            }
           
        }
    }

    /**
     * 스페이스 그룹 클릭 시 처리
     * */
    clickSpaceGroupData() {
            
        if (crystalTableData.I._selectedSystem === null) {
            crystalTableData.I._selectedSpaceGroup = null;
            crystalTableData.I._selectedSetting = null;

            alert("Please Select System Category");
            return;
        }

        let selected = crystalTableData.I._space_group_table.getSelected();
        $(selected[0]).attr("disable");

        if (selected.length !== 1 || $(selected[0]).attr("disabled")) {
            crystalTableData.I._space_group_table.initSelect();
            crystalTableData.I._selectedSpaceGroup = null;
            return;
        }
        else {
            crystalTableData.I._selectedSpaceGroup = selected;

            if (crystalTableData.I._selectedSetting) {
                crystalTableData.I._selectedSetting.removeClass('ui-selected');
                crystalTableData.I._selectedSetting = null;
            }

            // clear all setting data
            crystalTableData.I._setting_table.clearAll();

            // add updated setting data
            crystalTableData.I.addSettingData();

            let idx = 0;
            for (let elem of Array.prototype.slice.call(crystalTableData.I._setting_table._div.querySelectorAll('tr:not([style*="display:none"])'))) {
                idx++;
                if (idx % 2 === 0)
                    crystalTableData.I.applyColor(elem, false);
                else
                    crystalTableData.I.applyColor(elem, true);
            }
        }

        crystalTableData.I._selectedSystem.addClass("ui-selected");
    }

    /**
     * 세팅 데이터 클릭 시 처리
     * */
    clickSettingData() {

        if (crystalTableData.I._selectedSystem === null || crystalTableData.I._selectedSpaceGroup === null) {
            crystalTableData.I._selectedSetting = null;

            if (crystalTableData.I._selectedSystem === null)
                alert("Please Select System Category");
            if (crystalTableData.I._selectedSpaceGroup === null)
                alert("Please Select Space Group Category");

            return;
        }

        crystalTableData.I._selectedSystem.addClass("ui-selected");
        crystalTableData.I._selectedSpaceGroup.addClass("ui-selected");

        let selected = crystalTableData.I._setting_table.getSelected();
        if (selected.length !== 1) {
            crystalTableData.I._setting_table.initSelect();
            crystalTableData.I._selectedSetting = null;
            return;
        }
        else {
            crystalTableData.I._selectedSetting = selected;

            let settingKey, lattice, enableLattice;
            if (crystalTableData.I._mode) {
                settingKey = crystalTableData.I._selectedSetting[0].getElementsByClassName('cryUI_Unit_Cell_Setting_Td')[0].innerText;
                lattice = SettingDef._defOnList[settingKey]._lattice;
                enableLattice = SettingDef._defOnList[settingKey]._enableLattice;
            }
            else {
                settingKey = crystalTableData.I._selectedSetting[0].getElementsByClassName('cryUI_Unit_Cell_Setting_Td')[0].innerText;
                lattice = SettingDef._defOffList[settingKey]._lattice;
                enableLattice = SettingDef._defOffList[settingKey]._enableLattice;
            }

            if (lattice) {

                crystalTableData.I._dlgEditData._input_a_length.value = lattice._a;
                crystalTableData.I._dlgEditData._input_b_length.value = lattice._b;
                crystalTableData.I._dlgEditData._input_c_length.value = lattice._c;
                crystalTableData.I._dlgEditData._input_alpha.value = lattice._alpha;
                crystalTableData.I._dlgEditData._input_beta.value = lattice._beta;
                crystalTableData.I._dlgEditData._input_gamma.value = lattice._gamma;
            }

            if (enableLattice) {
                $(crystalTableData.I._dlgEditData._input_a_length).attr("disabled", !enableLattice._enableA);
                $(crystalTableData.I._dlgEditData._input_b_length).attr("disabled", !enableLattice._enableB);
                $(crystalTableData.I._dlgEditData._input_c_length).attr("disabled", !enableLattice._enableC);
                $(crystalTableData.I._dlgEditData._input_alpha).attr("disabled", !enableLattice._enableAlpha);
                $(crystalTableData.I._dlgEditData._input_beta).attr("disabled", !enableLattice._enableBeta);
                $(crystalTableData.I._dlgEditData._input_gamma).attr("disabled", !enableLattice._enableGamma);
            }
        }
    }

    /**
     * 스페이스 그룹 데이터 추가
     * */
    addSpaceGroupData() {


        let idx = 0;
        for (let data of Object.keys(SpaceGroupDef._defList)) {
            idx++;
            this._space_group_table.appTable("\
                <td class='cryUI_Unit_Cell_Num_Td'>" + idx + "</td>\
                <td class='cryUI_Unit_Cell_Space_Group_Td'>" + data + "<td>\
                ");
        }
    }

    /**
     * 세팅 데이터 추가
     * */
    addSettingData() {

        if (!crystalTableData.I._selectedSystem || !crystalTableData.I._selectedSpaceGroup) {
            return;
        }
        let currentKey = crystalTableData.I._selectedSpaceGroup[0].getElementsByClassName('cryUI_Unit_Cell_Space_Group_Td')[0].innerText;
        let idx = 0;

        if (this._mode) {
            for (const settingData of Object.entries(SettingDef._defOnList)) {
                if (settingData[1]._spaceGroupName === currentKey) {
                    idx++;
                    this._setting_table.appTable("\
                    <td class='cryUI_Unit_Cell_Num_Td'>" + idx + "</td>\
                    <td class='cryUI_Unit_Cell_Setting_Td'>" + settingData[0] + "</td>");
                }
            }
        }
        else {
            for (const settingData of Object.entries(SettingDef._defOffList)) {
                if (settingData[1]._spaceGroupName === currentKey) {
                    idx++;
                    this._setting_table.appTable("\
                    <td class='cryUI_Unit_Cell_Num_Td'>" + idx + "</td>\
                    <td class='cryUI_Unit_Cell_Setting_Td'>" + settingData[0] + "</td>");
                }
            }
        }
    }

    /**
     * table row 선택 가능 여부 설정
     * @param {HTMLElement} elem 선택 대상 
     * @param {Boolean} bEnable 활성화 여부
     */
    enableElement(elem, bEnable = true) {
        if (bEnable) {
            $(elem).removeAttr("disabled");
            $(elem).css("opacity", 1.0);
        }
        else {
            $(elem).attr("disabled", true);
            $(elem).css("opacity", 0.4);
        }
    }

    /**
     * table row 감추기
     * @param {HTMLElement} elem 선택 대상
     * @param {Boolean} bHide 숨김 여부
     */
    hideElement(elem, bHide = false) {
        if (bHide) {
            $(elem).css("display", "none");
        }
        else {
            $(elem).css("display", "");
        }
    }

    /**
     * table row 색상 적용
     * @param {HTMLElement} elem 색상 적용 대상
     * @param {Boolean} bDark 어두운 색상 적용 여부
     */
    applyColor(elem, bDark = false) {
        if (bDark) {
            $(elem).css("background-color", "#a1a1a1");
        }
        else {
            $(elem).css("background-color", "transparent");
        }
    }
}