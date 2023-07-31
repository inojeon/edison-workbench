import * as THREE from '../build/three.module.js';
import { rayLog } from "../Renderer/log.js";
import { crystalUIHandler } from './crystalUIHandler.js';
import { crystalUtil } from './crystalUtil.js';

/**
 * 거리 측정 클래스
 * */
export class crystalUIMeasureDistance {

    /**
     * 생성자
     * @param {crystalEditor} app 상위 앱 객체
     * @param {HTMLElement} div_base crystalUIMeasureDistance가 부착될 HTML Element
     * @param {crystalUIHandler} ui UI Handler
     */
    constructor(app, div_base, ui) {

        this._app = app;
        this._div_base = div_base;
        this._ui = ui;

        this._mdists = [];

        this._preview = null;
        this._previewLine = null;

        this._color = 0xff00ff;

        this._prevPickPoint = null;

        this._sceneRoot = null;
    }

    /**
     * 초기화
     * */
    CheckInitRoot() {
        if (this._sceneRoot)
            return;

        this._sceneRoot = new THREE.Group();
        this._sceneRoot.name = "M_DIST";
        this._app._3dRender._renderer._scene2.add(this._sceneRoot);
    }

    /**
     * Measure Distance Clear
     * */
    ClearAll() {
        for (var md of this._mdists) {
            this._sceneRoot.remove(md._mesh);
            md._mesh.geometry.dispose();
            md._mesh.material.dispose();
            md.remove();
        }

        this._mdists = [];
    }

    /**
     * 마우스 이동 처리
     * 
     * @param {Number} px 포인터 x
     * @param {Number} py 포인터 y
     */
    HandleMouseMove(px, py) {
        if (!this._preview)
            return;

        var ncoord = this._ui.ScreenToNormalized(px, py);
        var paobj = this._app._3dRender._renderer.pickObjectAtom(ncoord);
        if (paobj) {
            let wpt = new THREE.Vector3();
            paobj._obj.getWorldPosition(wpt);

            if (wpt.distanceTo(this._prevPickPoint) > 0.001)
                this.UpdatePreview(wpt, true);
            else
                this.UpdatePreview(wpt, false);

            return true;
        }

        let wpt = this._ui.ScreenToWorldOnPlane(px, py, this._app._3dRender._renderer._camera, this._prevPickPoint);
        this.UpdatePreview(wpt, false);
    }

    /**
     * 마우스 클릭 처리
     * 
     * @param {Number} px 마우스 x
     * @param {Number} py 마우스 y
     */
    HandleClick(px, py) {

        var ncoord = this._ui.ScreenToNormalized(px, py);
        var paobj = this._app._3dRender._renderer.pickObjectAtom(ncoord);
        if (paobj) {
            var wpt = new THREE.Vector3();
            paobj._obj.getWorldPosition(wpt);

            if (this._preview) {
                if (wpt.distanceTo(this._prevPickPoint) > 0.001)
                    this.PreviewToMeasure(wpt);
            } else {
                this.CreatePreview(wpt);
            }

            return true;
        }

        return false;
    }


    /**
     * 미리보기 생성
     * @param {THREE.Vector3} wpt 월드 좌표
     */
    CreatePreview(wpt) {
        this.ResetPreview();

        this._prevPickPoint = wpt.clone();

        // make line geometry for preview
        var pts = new Float32Array(6);
        pts[0] = wpt.x; pts[1] = wpt.y; pts[2] = wpt.z;
        pts[3] = wpt.x; pts[4] = wpt.y; pts[5] = wpt.z;
        var lgeom = new THREE.BufferGeometry();
        lgeom.setAttribute("position", new THREE.BufferAttribute(pts, 3));
        lgeom.setDrawRange(0, 2);
        var lmat = new THREE.LineBasicMaterial({ color: this._color });
        this._previewLine = new THREE.Line(lgeom, lmat);
        this._sceneRoot.add(this._previewLine);

        // preview distancetext.
        this._preview = document.createElement("div");
        this._preview.classList.add("cryUI_MeasureTextDist");
        this._div_base.appendChild(this._preview);
        this._preview.style.left = "4px";
        this._preview.style.top = "4px";
        this._preview.innerText = "";

        this._preview._startPt = wpt.clone();
        this._preview._midPt = wpt.clone();
        this._preview._endPt = wpt.clone();

        const spt = this._preview._startPt;
        const dist = spt.distanceTo(wpt);
        const mpt = spt.clone().add(wpt).multiplyScalar(0.5);
        const scrpt = this._ui.WorldToScreen(mpt);

        this._preview._distance = dist;
        this._preview.innerText = dist.toFixed(2) + "Å";
        this._preview.style.left = scrpt.x.toFixed(0) + "px";
        this._preview.style.top = scrpt.y.toFixed(0) + "px";

        this._preview.style.backgroundColor = "rgba(255,255,0,0.9)";
    }

    /**
     * 미리보기 업데이트
     * @param {THREE.Vector3} wpt 월드 좌표
     * @param {Boolean} can_finish 완료 가능 여부
     */
    UpdatePreview(wpt, can_finish = false) {
        if (!this._preview || !this._previewLine)
            return;

        const pts = this._previewLine.geometry.attributes.position.array;

        pts[0] = this._prevPickPoint.x;
        pts[1] = this._prevPickPoint.y;
        pts[2] = this._prevPickPoint.z;
        pts[3] = wpt.x;
        pts[4] = wpt.y;
        pts[5] = wpt.z;

        this._previewLine.geometry.attributes.position.needsUpdate = true;
        this._previewLine.geometry.computeBoundingBox();
        this._previewLine.geometry.computeBoundingSphere();

        const spt = this._prevPickPoint.clone();
        const dist = spt.distanceTo(wpt);
        const mpt = spt.clone().add(wpt).multiplyScalar(0.5);
        const scrpt = this._ui.WorldToScreen(mpt);

        this._preview._startPt = spt.clone();
        this._preview._midPt = mpt.clone();
        this._preview._endPt = wpt.clone();

        this._preview._distance = dist;
        this._preview.innerText = dist.toFixed(2) + "Å";
        this._preview.style.left = scrpt.x.toFixed(0) + "px";
        this._preview.style.top = scrpt.y.toFixed(0) + "px";

        if (can_finish) {
            this._preview.style.backgroundColor = "";
        } else {
            this._preview.style.backgroundColor = "rgba(255,255,0,0.9)";
        }

    }

    /**
     * 측정 완료된 measure preview 생성
     * @param {THREE.Vector3} wpt 월드 좌표
     */
    PreviewToMeasure(wpt) {
        if (!this._preview)
            return;

        this.UpdatePreview(wpt, true);
        this._preview.style.backgroundColor = "";

        // add new segment on measure preview
        var mat = new THREE.MeshBasicMaterial({ color: this._color });
        var geom = crystalUtil.generateDottedLineGeom(this._prevPickPoint, wpt);
        var mesh = new THREE.Mesh(geom, mat);
        this._sceneRoot.add(mesh);
        this._preview._mesh = mesh;

        this._mdists.push(this._preview);

        // clear line geom for preview
        if (this._previewLine) {
            this._sceneRoot.remove(this._previewLine);
            this._previewLine.geometry.dispose();
            this._previewLine.material.dispose();
            this._previewLine = null;
        }
        this._preview = null;
    }

    /**
     * 미리보기 제거
     * */
    ResetPreview() {
        if (!this._preview)
            return;

        if (this._previewLine) {
            this._sceneRoot.remove(this._previewLine);
            this._previewLine.geometry.dispose();
            this._previewLine.material.dispose();
            this._previewLine = null;
        }

        if (this._preview._mesh)
            this._sceneRoot.remove(this._preview._mesh);

        this._preview.remove();
        this._preview = null;
    }

    /**
     * measure text 정렬
     * */
    AutoAlignText() {
        for (var md of this._mdists) {
            let mpt = md._midPt;
            let scrpt = this._ui.WorldToScreen(mpt);
            md.style.left = scrpt.x.toFixed(0) + "px";
            md.style.top = scrpt.y.toFixed(0) + "px";
        }
    }

}