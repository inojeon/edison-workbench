import * as THREE from '../build/three.module.js';
import { rayLog } from '../Renderer/log.js';
import { crystalUISelect } from './crystalUISelect.js';
import { crystalUIMeasureDistance } from './crystalUIMeasureDistance.js';
import { crystalUIMeasureAngle } from './crystalUIMeasureAngle.js';
import { crystalUIMeasureAngleDihedral } from './crystalUIMeasureAngleDihedral.js';
import { crystalUIMeasureAngleInterfacial } from './crystalUIMeasureAngleInterfacial.js';

/**
 * ui handler 클래스
 * */
export class crystalUIHandler {

    /**
     * 생성자 
     * @param {crystalEditor} app 상위 앱 객체
     */
    constructor(app) {

        this._app = app;


        // button flags

        this._mode = 0;

        this._bStartClick = false;
        this._bDragStart = false;

        this._clickPosX = -1;
        this._clickPosY = -1;

        this._bStartSelect = false;
        this._bStartMeasureDistance = false;
        this._bStartMeasureAngle = false;
        this._bStartMeasureAngleDihedral = false;
        this._bStartMeasureAngleInterfacial = false;

        this._select = new crystalUISelect(this._app, this._app._div_3dRender, this);
        this._measureDistance = new crystalUIMeasureDistance(this._app, this._app._div_3dRender, this);
        this._measureAngle = new crystalUIMeasureAngle(this._app, this._app._div_3dRender, this);
        this._measureAngleDihedral = new crystalUIMeasureAngleDihedral(this._app, this._app._div_3dRender, this);
        this._measureAngleInterfacial = new crystalUIMeasureAngleInterfacial(this._app, this._app._div_3dRender, this);
    }


    /**
     * 월드 좌표계를 스크린 좌표계로 변환한다
     * @param {THREE.Vector3} wpt 월드좌표계
     * @returns 변환된 점
     */
    WorldToScreen(wpt) {

        //rayLog(3, "mouse px : " + px + "," + py);

        var lcv = wpt.clone().project(this._app._3dRender._renderer._camera);

        var px = (lcv.x + 1.0) * 0.5 * this._app._div_3dRender.clientWidth;
        var py = (1.0 - (lcv.y + 1.0) * 0.5) * this._app._div_3dRender.clientHeight;

        //var cx = (px / this._app._div_rbase.clientWidth) * 2.0 - 1.0;
        //var cy = (1.0 - py / this._app._div_rbase.clientHeight) * 2.0 - 1.0;
        //rayLog(3, "mouse coord : " + cx + "," + cy);

        return new THREE.Vector3(px, py, 0);
    }

    /**
     * 스크린 좌표계에서 월드 좌표계로 변환한다
     * @param {Number} px x 좌표
     * @param {Number} py y 좌표
     * @returns wcv
     */
    ScreenToWorld(px, py) {

        //rayLog(3, "mouse px : " + px + "," + py);

        var cx = (px / this._app._div_3dRender.clientWidth) * 2.0 - 1.0;
        var cy = (1.0 - py / this._app._div_3dRender.clientHeight) * 2.0 - 1.0;
        //rayLog(3, "mouse coord : " + cx + "," + cy);

        var wcv = new THREE.Vector3(cx, cy, -1).unproject(this._app._3dRender._renderer._camera);
        return wcv;
    }

    /**
     * 스크린 상의 좌표를 월드 좌표계 평면으로 옮긴다
     * @param {Number} px x 좌표
     * @param {Number} py y 좌표
     * @param {THREE.Camera} camera 카메라
     * @param {THREE.Vector3} plane_point 평면 좌표
     * @returns 교차점
     */
    ScreenToWorldOnPlane(px, py, camera, plane_point) {

        var np = this.ScreenToNormalized(px, py);

        var cam_dir = new THREE.Vector3();
        camera.getWorldDirection(cam_dir);

        var plane = new THREE.Plane();
        plane.setFromNormalAndCoplanarPoint(cam_dir, plane_point);

        var raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(np, camera);
        var intersects = new THREE.Vector3(0, 0, 0);
        raycaster.ray.intersectPlane(plane, intersects);

        rayLog(3, "worlds on plane : " + plane_point.x + "," + plane_point.y + "," + plane_point.z + " / " + cam_dir.x + "," + cam_dir.y + "," + cam_dir.z);
        rayLog(3, "np : " + px + "," + py + " / int : " + intersects.x + "," + intersects.y + "," + intersects.z);

        if (intersects) {
            return intersects;
        }

        return null;
    }

    /**
     * 스크린 좌표를 normalize하여 반환한다.
     * @param {Number} px 
     * @param {Number} py 
     * @returns 
     */
    ScreenToNormalized(px, py) {

        //rayLog(3, "mouse px : " + px + "," + py);

        var cx = (px / this._app._div_3dRender.clientWidth) * 2.0 - 1.0;
        var cy = (1.0 - py / this._app._div_3dRender.clientHeight) * 2.0 - 1.0;
        //rayLog(3, "normalized (-1,1) coord : " + cx + "," + cy);

        var nc = new THREE.Vector2(cx, cy);
        return nc;
    }

    /**
     * 클릭 플래그 활성화
     * @param {Event} event 이벤트
     */
    OnMouseDown(event) {

        let crect = this._app._div_3dRender.getBoundingClientRect();
        let ex = event.x - crect.x;
        let ey = event.y - crect.y;

        if (event.button === 0) {
            this._bStartClick = true;
            this._clickPosX = ex;
            this._clickPosY = ey;
            this._bDragStart = false;
        }

        this._select.SetClick(ex, ey);

        return false;
    }

    /**
     * 드래그 설정 혹은 거리 측정
     * @param {Event} event 
     * @returns 
     */
    OnMouseMove(event) {

        let crect = this._app._div_3dRender.getBoundingClientRect();
        let ex = event.x - crect.x;
        let ey = event.y - crect.y;

        if (this._bStartClick) {
            if (!this._bDragStart) {
                if (Math.abs(ex - this._clickPosX) > 3 && Math.abs(ey - this._clickPosY) > 3) {
                    this._bDragStart = true;
                }
            }
            else {
                if (this._mode === 1) {
                    this._select.HandleMouseMove(ex, ey);
                }
            }
        } else {
            if (this._bStartMeasureDistance) {
                this._measureDistance.HandleMouseMove(ex, ey);
            }
            if (this._bStartMeasureAngle) {
                this._measureAngle.HandleMouseMove(ex, ey);
            }
            if (this._bStartMeasureAngleDihedral) {
                this._measureAngleDihedral.HandleMouseMove(ex, ey);
            }
            if (this._bStartMeasureAngleInterfacial) {
                this._measureAngleInterfacial.HandleMouseMove(ex, ey);
            }
        }

        return false;
    }

    /**
     * mouse up 이벤트를 처리한다.
     * 
     * @param {Event} event
     */
    OnMouseUp(event) {

        let crect = this._app._div_3dRender.getBoundingClientRect();
        let ex = event.x - crect.x;
        let ey = event.y - crect.y;


        if (this._mode === 1) {
            this._select.HandleClick(ex, ey);
        }


        if (event.button === 0) {

            if (this._bStartClick && !this._bDragStart) {

                if (this._bStartMeasureDistance) {
                    this._measureDistance.HandleClick(ex, ey);
                }
                if (this._bStartMeasureAngle) {
                    this._measureAngle.HandleClick(ex, ey);
                }
                if (this._bStartMeasureAngleDihedral) {
                    this._measureAngleDihedral.HandleClick(ex, ey);
                }
                if (this._bStartMeasureAngleInterfacial) {
                    this._measureAngleInterfacial.HandleClick(ex, ey);
                }

                /*
                var ncoord = this.ScreenToNormalized(event.offsetX, event.offsetY);
                var obj = null;
                var obj = this._app._3dRender._renderer.pickObjectAtom(ncoord);

                if (obj) {
                    let pos = new THREE.Vector3();
                    obj._obj.getWorldPosition(pos);
                    rayLog(3, "picked mesh for Atom " + obj._obj.id + " at " + pos.x + "," + pos.y + "," + pos.z);
                }
                */
            }


            /*

            if (!this._bDragStart) {
                if (this._bStartMeasure) {
                    this.HandleClickMeasure(event.offsetX, event.offsetY);
                } else {
                    var ncoord = this.ScreenToNormalized(event.offsetX, event.offsetY);
                    var obj = null;
                    obj = this._app._renderer.pickObject(ncoord);
                    if (obj && obj.visible) {
                        if (obj._isPVBB) {
                            if (obj._PVID >= 0) {
                                rayLog(3, "picked mesh BBOX PVID = " + obj._PVID);
                                this._app._topSeqBar.ForceSelectProteinByPVID(obj._PVID);
                            }
                        } else {
                            if (obj._PVID !== undefined && obj._PVID >= 0) {
                                if (obj._PVID === this._app._curProtein._PVID) {
                                    rayLog(3, " picked mesh ID = " + obj._id);

                                    if (obj._cartoon) {
                                        rayLog(3, "picked CartoonSeg meta-property : " + obj._cartoon._meta._property);
                                    }

                                    this.AddSelectedObjsIDList([obj._id], !window.event.ctrlKey);
                                } else {
                                    rayLog(3, " picked mesh is for another protein. change protein select (PVID " + obj._PVID + ")");
                                    this._app._topSeqBar.ForceSelectProteinByPVID(obj._PVID);
                                }
                            } else {
                                rayLog(3, " picked mesh has no PVID.");
                            }
                        }
                    } else {
                        if (!this._app.PickProteinBBOX(ncoord)) {
                            if (!window.event.ctrlKey)
                                this.ResetSelectedObj();
                        }
                    }

                }
            }
            */

            this._bStartClick = false;
            this._bDragStart = false;
        }

        return true;
    }


    /**
     * 키 이벤트 처리
     * @param {Event} event
     */
    OnKeyPress(event) {

        if (event.key === "Escape") {
            if (this.FinishAllMeasures())
                return true;
        }

        else if (event.key === "Delete") {
            // ui select 선택한 atom, bond 선택해제하기
        }

        return false;
    }

    /**
     * 후처리 과정 measure text align
     * */
    _postRender() {
        this._measureDistance.AutoAlignText();
        this._measureAngle.AutoAlignText();
        this._measureAngleDihedral.AutoAlignText();
        this._measureAngleInterfacial.AutoAlignText();
        this._select.AutoAlignText();
    }


    /**
     * 거리 측정 시작
     * */
    StartMeasureDistance() {
        this.FinishAllMeasures();
        this._mode = -1;
        if (this._app._3dRender._renderer)
            this._app._3dRender._renderer._controls.mouseButtons.LEFT = THREE.MOUSE.ROTATE;

        this._measureDistance.CheckInitRoot();
        this._bStartMeasureDistance = true;
        this._app._floatingToolMeasure.Show();
        this._app.UpdateUI();
    }

    /**
     * 각도 측정 시작
     * */
    StartMeasureAngle() {
        this.FinishAllMeasures();
        this._mode = -1;
        if (this._app._3dRender._renderer)
            this._app._3dRender._renderer._controls.mouseButtons.LEFT = THREE.MOUSE.ROTATE;

        this._measureAngle.CheckInitRoot();
        this._bStartMeasureAngle = true;
        this._app._floatingToolMeasure.Show();
        this._app.UpdateUI();
    }

    /**
     * 이면각 측정 시작
     * */
    StartMeasureAngleDihedral() {
        this.FinishAllMeasures();
        this._mode = -1;
        if (this._app._3dRender._renderer)
            this._app._3dRender._renderer._controls.mouseButtons.LEFT = THREE.MOUSE.ROTATE;

        this._measureAngleDihedral.CheckInitRoot();
        this._bStartMeasureAngleDihedral = true;
        this._app._floatingToolMeasure.Show();
        this._app.UpdateUI();
    }

    /**
     * 평면 간 각도 측정 시작
     * */
    StartMeasureAngleInterfacial() {
        this.FinishAllMeasures();
        this._mode = -1;
        if (this._app._3dRender._renderer)
            this._app._3dRender._renderer._controls.mouseButtons.LEFT = THREE.MOUSE.ROTATE;

        this._measureAngleInterfacial.CheckInitRoot();
        this._bStartMeasureAngleInterfacial = true;
        this._app._floatingToolMeasure.Show();
        this._app.UpdateUI();
    }

    /**
     * 회전 모드
     * */
    StartRotate() {
        this.FinishAllMeasures();
        if (this._app._3dRender._renderer)
            this._app._3dRender._renderer._controls.mouseButtons.LEFT = THREE.MOUSE.ROTATE;
        this._mode = 0;
        this._app.UpdateUI();
    }

    /**
     * 선택 모드
     * */
    StartSelect() {
        this.FinishAllMeasures();
        this._mode = 1;
        if (this._app._3dRender._renderer)
            this._app._3dRender._renderer._controls.mouseButtons.LEFT = -1;
        this._app.UpdateUI();
    }

    /**
     * 측정 값 모두 제거
     * */
    ClearAllMeasures() {
        this.FinishAllMeasures();
        this._measureDistance.ClearAll();
        this._measureAngle.ClearAll();
        this._measureAngleDihedral.ClearAll();
        this._measureAngleInterfacial.ClearAll();
        this._select.ClearAll();
    }

    /**
     * 측정 종료
     * */
    FinishAllMeasures() {
        let bRet = false;

        if (this._bStartMeasureDistance) {
            this.FinishMeasureDistance();
            bRet = true;
        }
        if (this._bStartMeasureAngle) {
            this.FinishMeasureAngle();
            bRet = true;
        }
        if (this._bStartMeasureAngleDihedral) {
            this.FinishMeasureAngleDihedral();
            bRet = true;
        }
        if (this._bStartMeasureAngleInterfacial) {
            this.FinishMeasureAngleInterfacial();
            bRet = true;
        }
        if (this._mode === 1) {
            this.FinishSelect();
            bRet = true;
        }
       

        return bRet;
    }

    /**
     * 거리 측정 종료
     * */
    FinishMeasureDistance() {
        this._measureDistance.ResetPreview();
        this._bStartMeasureDistance = false;
        this._mode = 0;
        this._app._floatingToolMeasure.Hide();
        this._app.UpdateUI();
    }

    /**
     * 각도 측정 종료
     * */
    FinishMeasureAngle() {
        this._measureAngle.ResetPreview();
        this._bStartMeasureAngle = false;
        this._mode = 0;
        this._app._floatingToolMeasure.Hide();
        this._app.UpdateUI();
    }

    /**
     * 이면각 측정 종료
     * */
    FinishMeasureAngleDihedral() {
        this._measureAngleDihedral.ResetPreview();
        this._bStartMeasureAngleDihedral = false;
        this._mode = 0;
        this._app._floatingToolMeasure.Hide();
        this._app.UpdateUI();
    }

    /**
     * 평면 간 각 측정 종료
     * */
    FinishMeasureAngleInterfacial() {
        this._measureAngleInterfacial.ResetPreview();
        this._bStartMeasureAngleInterfacial = false;
        this._mode = 0;
        this._app._floatingToolMeasure.Hide();
        this._app.UpdateUI();
    }

    /**
     * drag 선택 종료
     * */
    FinishSelect() {
        this._select.Init();
    }
}