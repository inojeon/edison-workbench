/**
 * 테이블 생성 클래스
 * */
export class crystalTable {

    /**
     * 생성자
     * @param {String} name 다른 앱과 구분하기 위한 이름
     * @param {crystalEditor} app 상위 앱 객체
     * @param {HTMLElement} div_elem crystalTable이 부착될 HTML Element
     * @param {String} table_id 다른 테이블과 구분하기 위한 이름
     */
    constructor(name, app, div_elem, table_id) {

        this._name = name;

        this._app = app;

        this._div = div_elem;

        this._table_id = table_id;

        this._div.innerHTML = this._appElementHTML(name);

        this._div_table = document.getElementById(this._name + '_table');

        this._div_tbody = document.getElementById(this._name + '_' + this._table_id + "_tbody");

        this._div_header_tbody = document.getElementById(this._name + '_' + this._table_id + '_header');

        crystalTable.I = this;
    }

    /**
     * Table에 대한 html element를 작성한다.
     *
     * @param {String} name 다른 앱과 구분하기 위한 이름
     * @returns {String} HTML 문자열
     */
    _appElementHTML(name) {

        let ihtml = [];
        let idx = 0;

        ihtml[idx] = "<table id='" + name + "_" + this._table_id +  "_header_table'>";
        idx++;

        ihtml[idx] = "<tbody id='" + name + "_" + this._table_id + "_header'>";
        idx++;

        ihtml[idx] = "</tbody>";
        idx++;

        ihtml[idx] = "</table>";
        idx++;

        ihtml[idx] = "<table id='" + name + "_table'>";
        idx++;

        ihtml[idx] = "<tbody id='" + name + "_" + this._table_id + "_tbody'>";
        idx++;

        ihtml[idx] = "</tbody>";
        idx++;

        ihtml[idx] = "</table>";
        idx++;

        ihtml[idx] = "</div>";
        idx++;

        return ihtml.join("");
    }

    /**
     * sort 기능 적용
     * */
    applySortable() {
        let id = this._name + "_" + this._table_id + "_tbody";
        $("#" + id)
            /*
            .sortable({
                handle: ".handle",
                update: function (event, ui) {
                    let idx = 1;
                    $("#" + id + " .position").each(function (e) {
                        $(this).text(idx.toString());
                        idx++;
                    });
                }
            })
            */
            .selectable({
                filter: "tr",
                cancel: ".handle",
                selected: function (event, ui) {
                    // 현재 활성화된 다이얼로그 판별
                    /*
                    if (crystalTable.I._app._dlgEditData._show)
                        crystalTable.I._app._dlgEditData.UpdateSelect();
                    else if (crystalTable.I._app._dlgEditBond._show)
                        crystalTable.I._app._dlgEditBond.UpdateSelect();
                    */
                }
            });

        $("#" + id + " tr").last().addClass("ui-corner-all").prepend("<div class='handle'><span class='ui-icon ui-icon-carat-2-n-s'></span></div>");
    }

    /**
     * 선택 기능 적용
     * @param {Function} cb callback function
     */
    applySelectable(cb) {
        let id = this._name + "_" + this._table_id + "_tbody";
        $("#" + id).selectable({
            filter: "tr",
            cancel: ".handle",
            selected: function (event, ui) {
                cb();
            }
        });
    }

    /**
     * 테이블 업데이트
     * */
    updateTable() {
        let id = this._name + "_" + this._table_id + "_tbody";
        let idx = 1;

        $("#" + id + " .position").each(function (e) {
            $(this).text(idx.toString());
            idx++;
        });
    }

    /**
     * 테이블 row 추가
     * @param {String} innerHTML 테이블 row html
     * @param {Boolean} hasPosition 순번 포함 여부
     */
    appTable(innerHTML, hasPosition = false) {

        if (hasPosition) {
            $(this._div_tbody).append("<tr class='sortable'><td class='position cryUI_Normal_Td'></td>" + innerHTML + "</tr>");

            this.updateTable();
            this.applySortable();
        }
        else
            $(this._div_tbody).append("<tr class='sortable'><td class='position cryUI_Normal_Td' style='display:none;'></td>" + innerHTML + "</tr>");
    }

    /**
     * 테이블 row 추가
     * @param {String} innerHTML table row string
     */
    appInnerHTML(innerHTML) {
        $(this._div_tbody).append(innerHTML);
    }

    /**
     * 테이블 row 선택 초기화
     * */
    initSelect() {
  
        let selected = this.getSelected();
        let length = selected.length;

        for (let i = 0; i < length; ++i) {
            $(selected[i]).removeClass("ui-selected");
        }

    }

    /**
     * 테이블의 마지막 row 선택
     * */
    selectLast() {

        let allRows = this.getAllRow();
        let lastRow = allRows[allRows.length - 1];

        $(lastRow).addClass("ui-selected");
    }

    /**
     * header 추가
     * @param {String} innerHTML table header string
     * @param {Boolean} bSortable 정렬 가능 여부
     */
    createHeader(innerHTML, bSortable = true) {
        $(this._div_header_tbody).prepend("<tr>" + innerHTML + "</tr>");

        if (bSortable) {
            this.updateTable();
            this.applySortable();
        }
    }

    /**
     * header row 삭제
     * */
    removeHeader() {
        $(this._div_header_tbody).find("tr:first")[0].remove();
    }

    /**
     * 선택된 row 반환
     * */
    getSelected() {
        let selected = $('#' + this._name + '_' + this._table_id + "_tbody" + " tr").filter('.ui-selected');
        return selected;
    }

    /**
     * 모든 row 반환
     * */
    getAllRow() {
        let rows = $("#" + this._name + "_" + this._table_id  + "_tbody" + ' .position').parent();
        return rows;
    }

    /**
     * 선택된 row 삭제
     * */
    deleteSelected() {
        let selected = this.getSelected();
        if (selected)
            selected.remove();
    }

    /**
     * 모든 row 삭제
     * */
    clearAll() {
        let rows = this.getAllRow();
        if (rows) {
            rows.remove();
        }
    }
}