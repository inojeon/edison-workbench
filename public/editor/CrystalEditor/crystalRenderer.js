import { crystalEditor } from "./crystalEditor.js";
import { Renderer } from '../Renderer/Renderer.js';
import { GeomRenderer } from '../Renderer/GeomRenderer.js';

import { Vector3 } from '../Math/Vector3.js';
import { CStructure } from '../CoreCrystal/CStructure.js';
import { GeomMole } from "../Renderer/GeomMole.js";
import * as THREE from '../build/three.module.js';
import { crystalLabelManager } from './crystalLabelManager.js';
import { cryst } from './crystalVariable.js';
import { crystalStructureManager } from "./crystalStructureManager.js";

/**
 * crystal renderer 클래스
 * */
export class crystalRenderer {

    /**
     * 생성자
     * 
     * @param {String} name 다른 앱과 구분하기 위한 이름
     * @param {crystalEditor} app 상위 앱 객체
     * @param {HTMLElement} div_elem crystalRenderer가 부착될 HTML Element
     */
    constructor(name, app, div_elem) {


        this._name = name;

        this._app = app;

        this._div = div_elem;

        crystalRenderer.I = this;

        kVisLib.Init(function () {

            crystalRenderer.I._renderer = new Renderer(crystalEditor.I._div_3dRender, false, true);
            crystalRenderer.I._renderer.setBackgroundColor(1, 1, 1);
            crystalRenderer.I._renderer.createPerspecriveCamera(100, 100, 100, 50, 1.5, 0.01, 500);
            crystalRenderer.I._renderer.create3DOrthographicCamera(-100, 100, 100, -100, 0.1, 500);

            crystalRenderer.I._renderer.createOrbitControl();
            crystalRenderer.I._renderer.createCameraLight();
            crystalRenderer.I._renderer.setOrthoCamera();
            crystalRenderer.I._renderer.setOrthoCameraDistance(100);
            crystalRenderer.I._geomRenderer = new GeomRenderer(kVisLib.api, crystalRenderer.I._renderer);

            crystalRenderer.I._app._csManager = new crystalStructureManager(crystalRenderer.I._app, new CStructure());
            crystalRenderer.I._app._csManager._cs._unitcell.set(cryst.Unitcell.alpha, cryst.Unitcell.beta, cryst.Unitcell.gamma, cryst.Unitcell.a, cryst.Unitcell.b, cryst.Unitcell.c);
            crystalRenderer.I._app._csManager._cs._boundary.set(new Vector3(cryst.Boundary['minX'], cryst.Boundary['minY'], cryst.Boundary['minZ']), new Vector3(cryst.Boundary['maxX'], cryst.Boundary['maxY'], cryst.Boundary['maxZ']));


            GeomMole.init();
            GeomMole.setAtomRenderType(0);

            crystalRenderer.I._app._labelManager = new crystalLabelManager(crystalRenderer.I._app);
            crystalRenderer.I._app._labelManager.createLabelForAxis();

            let unitcell = crystalRenderer.I._app._csManager._cs._unitcell;
            crystalRenderer.I.RebuildAxisGeom(unitcell._axis._va, unitcell._axis._vb, unitcell._axis._vc);
            // crystalRenderer.I._autoRotateCamera = false;

            crystalRenderer.I.Render();

            crystalRenderer.I._app.OnResize();

            crystalRenderer.I._app._csManager._cs.generate();

            crystalRenderer.I._renderer.autofitCameraObjList([crystalRenderer.I._app._csManager._cs.getMesh()], 100);
            for (let elem of crystalRenderer.I._renderer._scene.children) {
                if (elem.name === "CStructure")
                    crystalRenderer.I._3dRender._renderer._scene.remove(elem);
            }

            crystalRenderer.I._app._3dRender._renderer._scene.add(crystalRenderer.I._app._csManager._cs._groupMesh);
        });
    }

    /**
     * 한 프레임을 렌더링한다.
     * */
    Render() {
        requestAnimationFrame(crystalRenderer.I.Render);

 
            switch (crystalRenderer.I._app._property._propertyTool._orientationMode) {
                case 0:
                    crystalRenderer.I._renderer.doCameraRotate(0.001, 1);
                    break;
                case 1:
                    crystalRenderer.I._renderer.doCameraRotate(0.001, 0);
                    break;
                case 2:
                    crystalRenderer.I._renderer.doCameraRotate(0.001, 2);
            
        }

        Renderer.I.tick();
        Renderer.I.render();

        if (crystalRenderer.I._postRender) {
            crystalRenderer.I._postRender();
        }
    }

    /**
     * 샘플 생성
     * */
    CreateSample() {

        let sphereGeom = new THREE.SphereBufferGeometry(3, 32, 32);
        let material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        let sphere = new THREE.Mesh(sphereGeom, material);

        crystalRenderer.I._renderer._scene.add(sphere);

    }

    /**
     * 모든 객체 제거
     * */
    Clear() {
        this._geomRenderer.clear();
    }

    /**
     * 월드 좌표계를 스크린 좌표계로 변환한다.
     * @param {THREE.Vector3} wpt 월드 좌표
     */
    WorldToScreen(wpt) {

        let lcv = wpt.clone().project(this._app._3dRender._renderer._camera);

        let px = (lcv.x + 1.0) * 0.5 * this._app._div_3dRender.clientWidth;
        let py = (1.0 - (lcv.y + 1.0) * 0.5) * this._app._div_3dRender.clientHeight;

        return new THREE.Vector3(px, py, 0);
    }

    /**
     * 후처리 작업
     * */
    _postRender() {
        if (this._app._labelManager) {
            // labelmanager를 가져와서 label 위치 갱신하기
            this._app._labelManager._postRender();
        }

        if (this._app._uiHandler) {
            this._app._uiHandler._postRender();
        }
    }

    /**
     * 좌표축을 재생성한다.
     * @param {THREE.Vector3} a a축 벡터
     * @param {THREE.Vector3} b b축 벡터
     * @param {THREE.Vector3} c c축 벡터
     */
    RebuildAxisGeom(a, b, c) {
        if (this._renderer) {
            if (this._renderer._axisMesh)
                this._renderer._scene2.remove(this._renderer._axisMesh);
            this._renderer._axisMesh = this._renderer._axisGeom.createAxisMeshWithVectors(a, b, c);
            this._renderer.setAxisViewportPosition(-0.84, -0.8, -0.8, 1);
            this._renderer._scene2.add(this._renderer._axisMesh);
        }
    }

}