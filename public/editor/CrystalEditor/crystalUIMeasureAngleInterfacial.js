import * as THREE from '../build/three.module.js';
import { rayLog } from "../Renderer/log.js";
import { crystalUtil } from './crystalUtil.js';

/**
 * interfacial 측정 클래스
 * */
export class crystalUIMeasureAngleInterfacial {

    /**
     * 생성자
     * @param {crystalEditor} app 상위 앱 객체
     * @param {HTMLElement} div_base crystalUIMeasureAngleInterfacial이 부착될 HTML Element
     * @param {crystalUIHandler} ui UI Handler
     */
    constructor(app, div_base, ui) {

        this._app = app;
        this._div_base = div_base;
        this._ui = ui;

        this._mdists = [];

        this._preview = null;
        this._previewLine = null;

        this._color = 0xff7000;

        this._nmLen = 1.0;

        this._prevPickPoint = null;

        this._sceneRoot = null;

        this._step = 0;

        this._pickFaces = [];
    }

    /**
     * 초기화
     * */
    CheckInitRoot() {
        if (this._sceneRoot)
            return;

        this._sceneRoot = new THREE.Group();
        this._sceneRoot.name = "M_ANGLE_IF";
        this._app._3dRender._renderer._scene2.add(this._sceneRoot);

        this._step = 0;
        this._pickObjs = [];

        this._previewPickFace = null;
    }

    /**
     * Measure Angle Dihedral Clear
     * */
    ClearAll() {

        for (var md of this._mdists) {
            this._sceneRoot.remove(md._mesh1);
            md._mesh1.geometry.dispose();
            md._mesh1.material.dispose();
            this._sceneRoot.remove(md._mesh2);
            md._mesh2.geometry.dispose();
            md._mesh2.material.dispose();
            this._sceneRoot.remove(md._mesh3);
            md._mesh3.geometry.dispose();
            md._mesh3.material.dispose();
            md.remove();
        }

        this._mdists = [];
    }


    RemovePreviewPickFace() {

        if (this._previewPickFace) {
            this._sceneRoot.remove(this._previewPickFace);
            this._previewPickFace.geometry.dispose();
            this._previewPickFace.material.dispose();
            this._previewPickFace = null;
        }

    }

    UpdatePreviewPickFace(face) {

        this.RemovePreviewPickFace();


        let geom = new THREE.BufferGeometry();
        const vertices = [face.v1.x, face.v1.y, face.v1.z, face.v2.x, face.v2.y, face.v2.z, face.v3.x, face.v3.y, face.v3.z];
        const indices = [0, 1, 2];
        const normals = [face.normal.x, face.normal.y, face.normal.z, face.normal.x, face.normal.y, face.normal.z, face.normal.x, face.normal.y, face.normal.z];
        geom.setIndex(indices);
        geom.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
        geom.setAttribute("normal", new THREE.Float32BufferAttribute(vertices, 3));

        let lmat = new THREE.MeshPhongMaterial({ color: this._color, opacity: 0.5, transparent: true });

        this._previewPickFace = new THREE.Mesh(geom, lmat);

        this._sceneRoot.add(this._previewPickFace);
    }


    /**
     * 마우스 이동 처리
     * 
     * @param {Number} px 포인터 x
     * @param {Number} py 포인터 y
     */
    HandleMouseMove(px, py) {

        //this.RemovePreviewPickFace();

        if (this._step === 1) {
            var ncoord = this._ui.ScreenToNormalized(px, py);
            var pickFace = this._app._3dRender._renderer.pickObjectCrystalFace(ncoord);
            if (pickFace) {

                let mp = pickFace.midpoint;
                let nv = pickFace.normal;
                //rayLog(3, "pick Face Normal " + nv.x + "," + nv.y + "," + nv.z);
                //rayLog(3, "pick Face Midpoint " + mp.x + "," + mp.y + "," + mp.z);

                //this.UpdatePreviewPickFace(pickFace);

                this.UpdatePreview(mp.clone(), pickFace);
                return true;
            }
            else {
                let wpt = this._ui.ScreenToWorldOnPlane(px, py, this._app._3dRender._renderer._camera, this._preview._pt1);
                this.UpdatePreview(wpt, null);
            }

        }

    }

    /**
     * 마우스 클릭 처리
     * 
     * @param {Number} px 마우스 x
     * @param {Number} py 마우스 y
     */
    HandleClick(px, py) {


        var ncoord = this._ui.ScreenToNormalized(px, py);
        var pickFace = this._app._3dRender._renderer.pickObjectCrystalFace(ncoord);
        if (pickFace) {

            let mp = pickFace.midpoint;
            let nv = pickFace.normal;
            //rayLog(3, "pick Face Normal " + nv.x + "," + nv.y + "," + nv.z);
            //rayLog(3, "pick Face Midpoint " + mp.x + "," + mp.y + "," + mp.z);

            if (this._step === 0) {
                this.CreatePreview(pickFace);
            } else if (this._step === 1) {
                this.PreviewToMeasure(pickFace);
            }

            return true;
        }

        return false;
    }

    /**
     * 미리보기 생성
     * @param {Object} face crystal face
     */
    CreatePreview(face) {
        this.ResetPreview();

        // make line geometry for preview
        let wpt = face.midpoint;
        var pts = new Float32Array(6);
        pts[0] = wpt.x; pts[1] = wpt.y; pts[2] = wpt.z;
        pts[3] = wpt.x; pts[4] = wpt.y; pts[5] = wpt.z;
        var lgeom = new THREE.BufferGeometry();
        lgeom.setAttribute("position", new THREE.BufferAttribute(pts, 3));
        lgeom.setDrawRange(0, 2);
        var lmat = new THREE.LineBasicMaterial({ color: this._color });
        this._previewLine = new THREE.Line(lgeom, lmat);
        this._sceneRoot.add(this._previewLine);

        // preview text.
        this._preview = document.createElement("div");
        this._preview.classList.add("cryUI_MeasureTextAngleInterfacial");
        this._div_base.appendChild(this._preview);
        this._preview.style.left = "4px";
        this._preview.style.top = "4px";
        this._preview.innerText = "";
        this._preview.style.visibility = "hidden";

        this._preview._pt1 = wpt.clone();
        this._preview._pt2 = wpt.clone();

        // face 1 normal 
        var mat = new THREE.MeshBasicMaterial({ color: this._color });
        var geom = crystalUtil.generateDottedLineGeom(this._preview._pt1, this._preview._pt1.clone().add(face.normal.clone().normalize().multiplyScalar(this._nmLen)));
        var mesh = new THREE.Mesh(geom, mat);
        this._sceneRoot.add(mesh);
        this._preview._mesh1 = mesh;

        this._preview._face1 = face;

        this._step = 1;
    }

    /**
     * 미리보기 업데이트
     * @param {THREE.Vector3} wpt 월드 좌표
     * @param {Object} face crystal face
     */
    UpdatePreview(wpt, face) {
        if (!this._preview || !this._previewLine)
            return;

        const pts = this._previewLine.geometry.attributes.position.array;

        pts[0] = this._preview._pt1.x;
        pts[1] = this._preview._pt1.y;
        pts[2] = this._preview._pt1.z;
        pts[3] = wpt.x;
        pts[4] = wpt.y;
        pts[5] = wpt.z;

        this._previewLine.geometry.attributes.position.needsUpdate = true;
        this._previewLine.geometry.computeBoundingBox();
        this._previewLine.geometry.computeBoundingSphere();

        if (this._step === 1) {

            this._preview._pt2 = wpt.clone();

            if (!face) {
                this._preview.style.visibility = "hidden";
                this._preview.innerText = "???";
            } else {
                let va = this._preview._face1.normal;
                let vb = face.normal;
                let ang = va.angleTo(vb) / Math.PI * 180.0;
                this._preview._angle = ang;
                this._preview.innerText = ang.toFixed(2) + "°";

                this._preview._midPt = this._preview._pt1.clone().add(this._preview._pt2).multiplyScalar(0.5);
                let scrpt = this._ui.WorldToScreen(this._preview._midPt);

                this._preview.style.left = scrpt.x.toFixed(0) + "px";
                this._preview.style.top = scrpt.y.toFixed(0) + "px";
                this._preview.style.visibility = "visible";
            }

        }

    }

    /**
     * 단계별 measure preview 생성
     * @param {Object} face crystal face
     */
    PreviewToMeasure(face) {
        if (!this._preview)
            return;

        this.UpdatePreview(face.midpoint.clone(), face);
        this._preview.style.backgroundColor = "";

        if (this._step === 1) {

            this._preview._pt2 = face.midpoint.clone();

            // face 2 normal 
            var mat2 = new THREE.MeshBasicMaterial({ color: this._color });
            var geom2 = crystalUtil.generateDottedLineGeom(this._preview._pt2, this._preview._pt2.clone().add(face.normal.clone().normalize().multiplyScalar(this._nmLen)));
            var mesh2 = new THREE.Mesh(geom2, mat2);
            this._sceneRoot.add(mesh2);
            this._preview._mesh2 = mesh2;


            // add new segment on measure preview
            var mat = new THREE.MeshBasicMaterial({ color: this._color });
            var geom = crystalUtil.generateDottedLineGeom(this._preview._pt1, this._preview._pt2);
            var mesh = new THREE.Mesh(geom, mat);
            this._sceneRoot.add(mesh);
            this._preview._mesh3 = mesh;

            this._preview._face2 = face;

            this._mdists.push(this._preview);

            // clear line geom for preview
            if (this._previewLine) {
                this._sceneRoot.remove(this._previewLine);
                this._previewLine.geometry.dispose();
                this._previewLine.material.dispose();
                this._previewLine = null;
            }
            this._preview = null;

            this._step = 0;
            this._pickFaces = [];
        }
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

        if (this._preview._mesh3) {
            this._sceneRoot.remove(this._preview._mesh3);
            this._preview._mesh3.geometry.dispose();
            this._preview._mesh3.material.dispose();
        }

        if (this._preview._mesh2) {
            this._sceneRoot.remove(this._preview._mesh2);
            this._preview._mesh2.geometry.dispose();
            this._preview._mesh2.material.dispose();
        }

        if (this._preview._mesh1) {
            this._sceneRoot.remove(this._preview._mesh1);
            this._preview._mesh1.geometry.dispose();
            this._preview._mesh1.material.dispose();
        }

        this._preview.remove();
        this._preview = null;

        this._step = 0;
        this._pickFaces = [];
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