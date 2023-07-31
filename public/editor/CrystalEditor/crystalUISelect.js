import { rayLog } from '../Renderer/log.js';

export class crystalUISelect {

    constructor(app, div_base, ui) {

        this._app = app;
        this._div_base = div_base;
        this._ui = ui;


        this._step = 0;

        this._startX = null;
        this._startY = null;

        this._scrDragStartX = null;
        this._scrDragStartY = null;

        this._scrDragEndX = null;
        this._scrDragEndY = null;

        this._previewDragSelect = null;

        this._bClicked = false;

        this._labelList = [];
    }

    /**
     * ui select 초기화
     * */
    Init() {
        this._step = 0;
        this._bClicked = false;

        this._scrDragStartX = null;
        this._scrDragStartY = null;

        this._scrDragEndX = null;
        this._scrDragEndY = null;

        this.RemovePreviewDragSelect();



    }

    /**
     * 현재까지 선택된 atom, bond 모두 선택해제
     * */
    ClearAll() {
        this._app._csManager._cs.unselectAll();
        this._app._logBar.ClearMsgText();
        this.Init();
        this.ClearLabel();
    }

    /**
     * 마우스 이동 처리하기
     * @param {Number} px 마우스 x 좌표
     * @param {Number} py 마우스 y 좌표
     */
    HandleMouseMove(px, py) {

        if (this._step === 0) {

            this.ClearAll();

            this._scrDragStartX = px;
            this._scrDragStartY = py;

            this._step++;
        }
        else {
            this._drag = true;
            this._scrDragEndX = px;
            this._scrDragEndY = py;
            this._scrDragStartX = this._startX;
            this._scrDragStartY = this._startY;

            if (this._scrDragEndX < this._scrDragStartX) {
                let tmp = this._scrDragEndX;
                this._scrDragEndX = this._scrDragStartX;
                this._scrDragStartX = tmp;
            }

            if (this._scrDragStartY < this._scrDragEndY) {
                let tmp = this._scrDragStartY;
                this._scrDragStartY = this._scrDragEndY;
                this._scrDragEndY = tmp;
            }

            this.UpdatePreview();
        }
    }

    SetClick(px, py) {
        this._startX = px;
        this._startY = py;
    }

    /**
     * 마우스 클릭 처리하기
     * 
     * @param {Number} px 마우스 x 좌표
     * @param {Number} py 마우스 y 좌표
     */
    HandleClick(px, py) {

        let selectediAtom;

        if (this._bClicked) {
            this.ClearAll();
        }

        this._scrDragEndX = px;
        this._scrDragEndY = py;
        this._scrDragStartX = this._startX;
        this._scrDragStartY = this._startY;

        let ncoord = this._ui.ScreenToNormalized(px, py);

        selectediAtom = this._app._csManager._cs.pickiAtom(this._app._3dRender._renderer, ncoord);

        if (this._scrDragEndX < this._scrDragStartX) {
            let tmp = this._scrDragEndX;
            this._scrDragEndX = this._scrDragStartX;
            this._scrDragStartX = tmp;
        }

        if (this._scrDragStartY < this._scrDragEndY) {
            let tmp = this._scrDragStartY;
            this._scrDragStartY = this._scrDragEndY;
            this._scrDragEndY = tmp;
        }

        if (this._drag) {
            this.UpdatePreview();

            // select 수행
            let selectediAtomList = this._app._csManager._cs.selectiAtomRect(this._app._3dRender._renderer, [this._scrDragStartX, this._scrDragStartY, this._scrDragEndX, this._scrDragEndY]);
            let selectediBondList = this._app._csManager._cs.selectiBondRect(this._app._3dRender._renderer, [this._scrDragStartX, this._scrDragStartY, this._scrDragEndX, this._scrDragEndY]);

            this.UpdateSelectedInfo(selectediAtomList, selectediBondList);

            this.CreateLabel(selectediAtomList);

            this.Init();
            this._drag = false;
        }

        else if(selectediAtom){
           
            if (selectediAtom) {
                this.ClearAll();
                selectediAtom.select(true);
                this.UpdateSelectedInfo([selectediAtom]);
                this._bClicked = true;

                // label 보여주기
                this.CreateLabel([selectediAtom]);
            }
        }

        else {
            this.ClearAll();
        }
    }


    UpdatePreview() {

        this.RemovePreviewDragSelect();

        let l = (this._scrDragStartX < this._scrDragEndX) ? this._scrDragStartX : this._scrDragEndX;
        let r = (this._scrDragStartX > this._scrDragEndX) ? this._scrDragStartX : this._scrDragEndX;
        let t = (this._scrDragStartY < this._scrDragEndY) ? this._scrDragStartY : this._scrDragEndY;
        let b = (this._scrDragStartY > this._scrDragEndY) ? this._scrDragStartY : this._scrDragEndY;

        let w = r - l;
        let h = b - t;

        this._previewDragSelect = document.createElement("div");
        this._previewDragSelect.classList.add("cryUI_SelectionBox");
        this._app._div_3dRender.appendChild(this._previewDragSelect);
        this._previewDragSelect.style.zIndex = 4;
        this._previewDragSelect.style.left = l + "px";
        this._previewDragSelect.style.top = t + "px";
        this._previewDragSelect.style.width = w + "px";
        this._previewDragSelect.style.height = h + "px";
    }

    RemovePreviewDragSelect() {
        if (this._previewDragSelect != null) {
            this._previewDragSelect.remove();
            this._previewDragSelect = null;
        }
    }

    UpdateSelectedInfo(selectediAtomList, selectediBondList) {

        let txt = "";
        rayLog(3, selectediBondList);
        for (let i = 0; i < selectediAtomList.length; ++i) {

            txt += "Selected Atom " + (i + 1) + " \t / ";

            // 이름
            txt += "Symbol : " + selectediAtomList[i]._def._def._atom_id + " \t / ";

            // 위치
            txt += "Position : (" + selectediAtomList[i]._position2.x + "," + selectediAtomList[i]._position2.y + ","+ selectediAtomList[i]._position2.z + ")\t / ";

            // 아톰의 타입
            txt += "Type : " + selectediAtomList[i]._def._type + "\n\n";
         }


        this._app._logBar.AddMsgText(txt);
    }


    CreateLabel(selectediAtomList) {
        if (!this._app._structureProperty.Atom.ShowLabel)
            return;

        for (let i = 0; i < selectediAtomList.length; ++i) {

            let iAtom = selectediAtomList[i];

            if (iAtom._def._label) {
                let label = document.createElement("div");
                label.classList.add("cryUI_MeasureTextDist");
                this._div_base.appendChild(label);
                label.style.left = "4px";
                label.style.top = "4px";

                const pt = iAtom._position2;
                const scrpt = this._ui.WorldToScreen(pt);

                label.innerText = iAtom._def._label;
                label.style.left = scrpt.x.toFixed(0) + "px";
                label.style.top = scrpt.y.toFixed(0) + "px";

                label.style.backgroundColor = "rgba(255,255,0,0.9)";

                iAtom._label = label;
                label._pt = pt;
                this._labelList.push(label);
            }
        }

    }

    ClearLabel() {
        for (let i = 0; i < this._app._csManager._cs._iatomList.length; ++i) {
            if (this._app._csManager._cs._iatomList[i]._label) {
                this._app._csManager._cs._iatomList[i]._label.remove();
                delete this._app._csManager._cs._iatomList[i]._label;
            }
        }

    }

    RemoveLabel(iAtom) {
        iAtom._label.remove();
        iAtom._label = null;
    }

    AutoAlignText() {
        for (let label of this._labelList) {
            let pt = label._pt;
            let scrpt = this._ui.WorldToScreen(pt);
            label.style.left = scrpt.x.toFixed(0) + "px";
            label.style.top = scrpt.y.toFixed(0) + "px";
        }
    }
}