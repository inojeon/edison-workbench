import { CStructure } from '../CoreCrystal/CStructure.js';
import { rayLog } from '../Renderer/log.js';

/**
 * 언두 스택 관리 클래스
 */
export class crystalUndoStack {

    /**
     * 생성자
     * @param {crystalEditor} app 상위 앱 객체
     */
    constructor(app) {

        this._app = app;

        this._maxUndo = 10;

        this._undo = [];
        this._redo = [];

        this.Clear();
    }

    /**
     * Undo / Redo Stack을 클리어한다
     *
     * @memberof cadUIUndoStack
     */
    Clear() {
        this._undo = [];
        this._redo = [];
    }

    /**
     * undo / redo를 위한 데이터 생성
     * @param {CStructure} data
     * @return {Object} key value pair
     */
    BuildData(data) {

        const cl = data.clone();
        const hdata = { "struct": cl };

        return hdata;
    }

    /**
     * undo stack에 현재 상태를 기록한다
     *
     * @param {Object} data Undo 저장 데이터
     */
    AddUndo(data_undo) {

        const hdata = this.BuildData(data_undo);
        this._undo.push(hdata);
        this._redo = [];
        if (this._undo.length > this._maxUndo) {
            this._undo.splice(0, 1);
        }
    }

    /**
     * undo를 수행한다
     *
     * @param {Object} data Undo 저장 데이터
     * @return {Object} Undo 결과물 
     */
    Undo(data) {
        if (!this.CanUndo())
            return null;

        this._app._uiHandler.ClearAllMeasures();

        const udata = this.BuildData(data);
        this._redo.push(udata);

        const hdata = this._undo[this._undo.length - 1];
        this._undo.splice(this._undo.length - 1, 1);

        rayLog(3, this._undo);
        rayLog(3, this._redo);
        rayLog(3, "Undo " + this._undo.length + " / " + "Redo " + this._redo.length);

        return hdata;
    }

    /**
     * redo를 수행한다
     *
     * @param {Array} data Redo 저장 데이터
     * @return {Object} Redo 결과물 
     */
    Redo(data, addData) {
        if (!this.CanRedo())
            return null;

        this._app._uiHandler.ClearAllMeasures();

        // const rdata = this.BuildData(data.struct);
        this._undo.push(this.BuildData(addData));

        const hdata = this._redo[this._redo.length - 1];
        this._redo.splice(this._redo.length - 1, 1);

        rayLog(3, this._undo);
        rayLog(3, this._redo);
        rayLog(3, "Undo " + this._undo.length + " / " + "Redo " + this._redo.length);

        return hdata;
    }

    /**
     * Undo 가능 여부를 반환한다
     *
     * @return {Boolean} undo 가능 여부 
     */
    CanUndo() {
        return (this._undo.length > 0);
    }

    /**
     * Redo 가능 여부를 반환한다
     *
     * @return {Boolean} redo 가능 여부 
     */
    CanRedo() {
        return (this._redo.length > 0);
    }

}
