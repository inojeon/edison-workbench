import { CStructure } from "../CoreCrystal/CStructure.js";
import { crystalUndoStack } from './crystalUndoStack.js';
import { AtomDef } from '../Renderer/AtomDef.js';

/**
 * Structure 관리 클래스
 * */
export class crystalStructureManager {

    /**
     * 생성자
     * @param {crystalEditor} app 상위 앱 객체
     * @param {CStructure} cs 관리할 CStructure
     */
    constructor(app, cs) {

        this._app = app;

        if (cs)
            this._cs = cs;
        else
            this._cs = new CStructure();

        this._undoStack = new crystalUndoStack(app);

        crystalStructureManager.I = this;

    }

    /**
     * CStructure를 반환한다.
     * 
     * @returns {CStrucure} cstructure
     * */
    static GetCS() {
        return this._cs;
    }

    /**
      * UI와 Renderer 모두 현재 주어진 cstructure로 대체한다.
      * 
      * @param {CStructure} cstructure 대체할 CStructure 클래스 변수
      */
    ReplaceCS(cstructure) {
        this._cs = cstructure.clone();

        // CStructure와 관련된 UI를 모두 업데이트한다.

        // unitcell
        $(this._app._dlgEditData._input_a_length).val(this._cs._unitcell._axis._la);
        $(this._app._dlgEditData._input_b_length).val(this._cs._unitcell._axis._lb);
        $(this._app._dlgEditData._input_c_length).val(this._cs._unitcell._axis._lc);
        $(this._app._dlgEditData._input_alpha).val(this._cs._unitcell._axis._a);
        $(this._app._dlgEditData._input_beta).val(this._cs._unitcell._axis._b);
        $(this._app._dlgEditData._input_gamma).val(this._cs._unitcell._axis._c);

        // boundary
        $(this._app._dlgBoundarySetting._input_min_x).val(this._cs._boundary._min._x);
        $(this._app._dlgBoundarySetting._input_min_y).val(this._cs._boundary._min._y);
        $(this._app._dlgBoundarySetting._input_min_z).val(this._cs._boundary._min._z);
        $(this._app._dlgBoundarySetting._input_max_x).val(this._cs._boundary._max._x);
        $(this._app._dlgBoundarySetting._input_max_y).val(this._cs._boundary._max._y);
        $(this._app._dlgBoundarySetting._input_max_z).val(this._cs._boundary._max._z);

        // atom table
        this._app._dlgEditData._atomTable.clearAll();
        for (let i = 0; i < this._cs._atoms.length; ++i) {
            let atom = this._cs._atoms[i];
            this._app._dlgEditData.AddAtomToTable(atom._idx, atom._id, AtomDef.GetDefWithNumber(atom._id)._atom_id, atom._label, atom._position._x, atom._position._y, atom._position._z, 0, 0);
        }

        // bond table
        this._app._dlgEditBond._bondTable.clearAll();
        for (let i = 0; i < this._cs._bonds.length; ++i) {
            let bond = this._cs._bonds[i];
            this._app._dlgEditBond.AddBondToTable(bond._idx, bond._A1Idx, bond._A2Idx, bond._minLength, bond._maxLength, bond._boundaryMode, bond._showPolyhederal);
        }

        // object table
        this._app._property._propertyObject._objectDataTable.updateTable();

        // CStructure 렌더링 업데이트
        this._cs.generate();

        this._app.UpdateStructureProperty();
    }

    /**
     * undo 스택을 모두 제거한다.
     * */
    ClearUndo() {
        this._undoStack.Clear();
    }

    /**
     * undo를 추가한다.
     * */
    AddUndo() {
        this._undoStack.AddUndo(this._prev.clone());
        this.UpdateUI();
    }

    /**
     * 데이터 임시 저장
     * @param {CStructure} prev 변경 사항 발생 시 저장할 데이터
     */
    SetPrev(prev) {
        this._prev = prev.clone();
    }

    /**
     * undo를 수행한다.
     * */
    DoUndo() {
        if (!this._undoStack.CanUndo())
            return;

        // get undo data
        const hdata = this._undoStack.Undo(this._cs.clone());

        // restore CStruct data with undo data

        this._cs = hdata.struct;
        this.ReplaceCS(this._cs);
        this._app._property._propertyStyle.OnApply();
        this._app._3dRender._renderer._scene.children.pop();
        this._app._3dRender._renderer._scene.add(this._cs._groupMesh);
        this.UpdateUI();
    }


    /**
     * redo를 수행한다.
     * @param {CStructure} addData 추가할 데이터
     */
    DoRedo(addData) {
        if (!this._undoStack.CanRedo())
            return;

        // get undo data
        const hdata = this._undoStack.Redo(this._undoStack._redo[this._undoStack._redo.length - 1], addData);

        // restore CStruct data with undo data

        this._cs = hdata.struct;
        this.ReplaceCS(this._cs);
        this._app._property._propertyStyle.OnApply();
        this._app._3dRender._renderer._scene.children.pop();
        this._app._3dRender._renderer._scene.add(this._cs._groupMesh);
        this.UpdateUI();
    }

    /**
     * UI 업데이트
     * */
    UpdateUI() {

        if (this._cs._atoms.length === 0) {
            this._app._dlgEditData.DisableInput(true);
        }
        if (this._cs._bonds.length === 0) {
            this._app._dlgEditBond.DisableInput(true);
        }

    }

}