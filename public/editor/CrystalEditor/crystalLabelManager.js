import { cryst } from './crystalVariable.js';

/**
 * 라벨 관리 클래스
 * */
export class crystalLabelManager {
    /**
     * 생성자
     * @param {crystalEditor} app 상위 앱 객체
     */
    constructor(app) {

        this._app = app;

        this._canvas = this._app._canvas;

        this._xLabel = null;
        this._yLabel = null;
        this._zLabel = null;

        this.clearAll();
    }

    /**
     * axis label 생성
     * */
    createLabelForAxis() {

        let x = this._app._3dRender._renderer._axisGeom.getXPoint();
        let y = this._app._3dRender._renderer._axisGeom.getYPoint();
        let z = this._app._3dRender._renderer._axisGeom.getZPoint();

        // worldToScreen
        let px = this._app._3dRender.WorldToScreen(x);
        let py = this._app._3dRender.WorldToScreen(y);
        let pz = this._app._3dRender.WorldToScreen(z);


        let xLabel = document.createElement("div");
        let yLabel = document.createElement("div");
        let zLabel = document.createElement("div");

        xLabel.classList.add("cryUI_LabelText");
        yLabel.classList.add("cryUI_LabelText");
        zLabel.classList.add("cryUI_LabelText");

        xLabel.innerHTML = cryst.Name.Axis.X;
        yLabel.innerHTML = cryst.Name.Axis.Y;
        zLabel.innerHTML = cryst.Name.Axis.Z;

        this._app._3dRender._div.appendChild(xLabel);
        this._app._3dRender._div.appendChild(yLabel);
        this._app._3dRender._div.appendChild(zLabel);

        xLabel.style.left = px.x.toFixed(0) + "px";
        xLabel.style.top = px.y.toFixed(0) + "px";
        xLabel.style.zIndex = 3;
        xLabel.style.backgroundColor = "";
        this._xLabel = xLabel;

        yLabel.style.left = py.x.toFixed(0) + "px";
        yLabel.style.top = py.y.toFixed(0) + "px";
        yLabel.style.zIndex = 3;
        yLabel.style.backgroundColor = "";
        this._yLabel = yLabel;

        zLabel.style.left = pz.x.toFixed(0) + "px";
        zLabel.style.top = pz.y.toFixed(0) + "px";
        zLabel.style.zIndex = 3;
        zLabel.style.backgroundColor = "";
        this._zLabel = zLabel;
    }

    /**
     * axis label 제거
     * */
    clearAll() {
        if(this._xLabel)
            this._xLabel.remove();
        if (this._yLabel)
            this._yLabel.remove();
        if (this._zLabel)
            this._zLabel.remove();
    }

    /**
     * 후처리 작업
     * */
    _postRender() {

        let x = this._app._3dRender._renderer._axisGeom._apx.clone();//GetXPoint();
        let px = this._app._3dRender.WorldToScreen(x);
        this._xLabel.style.left = px.x.toFixed(0) + "px";
        this._xLabel.style.top = px.y.toFixed(0) + "px";

        let y = this._app._3dRender._renderer._axisGeom._apy.clone();//GetYPoint();
        let py = this._app._3dRender.WorldToScreen(y);
        this._yLabel.style.left = py.x.toFixed(0) + "px";
        this._yLabel.style.top = py.y.toFixed(0) + "px";

        let z = this._app._3dRender._renderer._axisGeom._apz.clone();//GetZPoint();
        let pz = this._app._3dRender.WorldToScreen(z);
        this._zLabel.style.left = pz.x.toFixed(0) + "px";
        this._zLabel.style.top = pz.y.toFixed(0) + "px";
    }
}