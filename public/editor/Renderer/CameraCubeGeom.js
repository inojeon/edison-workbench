import * as THREE from '../build/three.module.js';
import * as G from './Global.js';
import { rayLog } from './log.js';

/**
 * Camera Cube Geometry 클래스
 * */
export class CameraCubeGeom {

    /**
     * 클래스 생성자
     * @param {Renderer} renderer 렌더러 참조
     */
    constructor(renderer){
        this._renderer = renderer;

        this._pnormals = [];
        this._pnormals.push(new THREE.Vector3(1, 0, 0));
        this._pnormals.push(new THREE.Vector3(-1, 0, 0));
        this._pnormals.push(new THREE.Vector3(0, 1, 0));
        this._pnormals.push(new THREE.Vector3(0, -1, 0));
        this._pnormals.push(new THREE.Vector3(0, 0, 1));
        this._pnormals.push(new THREE.Vector3(0, 0, -1));

        this._pupvs = [];
        this._pupvs.push(new THREE.Vector3(0, 1, 0));
        this._pupvs.push(new THREE.Vector3(0, 1, 0));
        this._pupvs.push(new THREE.Vector3(0, 0, 1));
        this._pupvs.push(new THREE.Vector3(0, 0, 1));
        this._pupvs.push(new THREE.Vector3(0, 1, 0));
        this._pupvs.push(new THREE.Vector3(0, 1, 0));

        this._pnames = [];
        this._pnames.push("Right");
        this._pnames.push("Left");
        this._pnames.push("Back");
        this._pnames.push("Front");
        this._pnames.push("Top");
        this._pnames.push("Bottom");

        this._raycaster = new THREE.Raycaster();

        this._size = 9;
        this._opacity = 0.6;

        this._vPos = new THREE.Vector4(-0.89, 0.8, -0.9, 1);

        this._startDownClick = false;
    }

    /**
    * axis mesh를 현재 카메라를 기준으로 정해진 뷰포트에 렌더링되도록 조정한다.
    */
    updateAxisMesh() {

        if (!this._renderer._isOrthoCamera) {
            // perspective camera
            this._renderer._camera.updateProjectionMatrix();
            let pmat = this._renderer._camera.projectionMatrixInverse;

            let pos = this._vPos.clone();

            pos.applyMatrix4(pmat);

            this._renderer._camera.updateMatrixWorld();
            let mvmat = this._renderer._camera.matrixWorld;

            pos.applyMatrix4(mvmat);

            pos.divideScalar(pos.w);

            this._cube.position.fromArray([pos.x, pos.y, pos.z]);
            this._cube.scale.fromArray([G._cameraPersfAxisSize, G._cameraPersfAxisSize, G._cameraPersfAxisSize]);

            this._cube.updateMatrixWorld(true);

            this._aCenter = new THREE.Vector3();
            this._cube.getWorldPosition(this._aCenter);
        }
        else {
            // orthogonal camera
            this._renderer._camera.updateProjectionMatrix();
            let pmat = this._renderer._camera.projectionMatrixInverse;

            let pos = this._vPos.clone();

            pos.applyMatrix4(pmat);

            this._renderer._camera.updateMatrixWorld();
            let mvmat = this._renderer._camera.matrixWorld;

            pos.applyMatrix4(mvmat);

            pos.divideScalar(pos.w);

            let size = G._cameraOrthoAxisSize / this._renderer._camera.zoom;
            //rayLog(3, "camera : " + this._renderer._camera.zoom);

            //size = 1.01;
            this._cube.position.fromArray([pos.x, pos.y, pos.z]);
            this._cube.scale.fromArray([size,size,size]);

            let t = 32;

            this._aCenter = new THREE.Vector3();
            this._cube.getWorldPosition(this._aCenter);
        }


    }

    /**
     * Cube 메쉬를 생성한다.
     */
    createMesh() {

        this._cube = new THREE.Group();
        this._pmeshs = [];

        for (let i = 0; i < this._pnormals.length; i++) {

            let mat = new THREE.MeshLambertMaterial({
                color: 0x808080,
                opacity: this._opacity,
                side: THREE.DoubleSide,
                transparent: true,
            });

            let pg = new THREE.PlaneGeometry(this._size, this._size);
            let mesh = new THREE.Mesh(pg, mat);
            mesh._pIndex = i;

            //let bbwire = new THREE.WireframeGeometry(pg);
            //let bboxWire = new THREE.LineSegments(bbwire);
            //bboxWire.material.opacity = this._opacity;
            //bboxWire.material.color.r = 1;
            //bboxWire.material.color.g = 1;
            //bboxWire.material.color.b = 1;
            //bboxWire.material.transparent = true;
            //bboxWire.visible = false;

            let shapes = this._renderer._font.generateShapes(this._pnames[i], 1.5);
            let tg = new THREE.ShapeGeometry(shapes);
            tg.computeBoundingBox();
            const xMid = -0.5 * (tg.boundingBox.max.x - tg.boundingBox.min.x);
            const yMid = -0.25 * (tg.boundingBox.max.y - tg.boundingBox.min.y);
            let matText = new THREE.MeshLambertMaterial({
                color: 0xFFFFFF,
            });
            let meshText = new THREE.Mesh(tg, matText);
            meshText.position.set(xMid, yMid, 0);

            let lp = new THREE.Group();
            lp.add(mesh);
            lp.add(meshText);

            //lp.setRotationFromQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), this._pnormals[i].clone().normalize()));

            let zv = this._pnormals[i];
            let yv = this._pupvs[i];
            let xv = this._pupvs[i].clone().cross(this._pnormals[i]).normalize();
            let tmat = new THREE.Matrix4().makeBasis(xv, yv, zv);
            lp.setRotationFromMatrix(tmat);

            let ppos = this._pnormals[i].clone().normalize().multiplyScalar(this._size * 0.5);
            lp.position.set(ppos.x, ppos.y, ppos.z);
            
            this._pmeshs.push(mesh);

            this._cube.add(lp);

            this._renderer._scene2.add(this._cube);
        }

        this._cube.position.set(0, 0, 0);
        this._cube.scale.set(0.1, 0.1, 0.1);
        this._cube.name = "camera_cube";

        return this._cube;
    }

    /**
     * Camera Cube 렌더링 뷰포트 위치를 지정한다.
     * @param {Number} x 뷰포트 x값
     * @param {Number} y 뷰포트 y값
     * @param {Number} z 뷰포트 z값
     * @param {Number} w 뷰포트 w값
     */
    setViewportPosition(x, y, z, w) {
        this._vPos = new THREE.Vector4(x, y, z, w);
    }

    /**
     * Camera Cube 평면을 피킹한다.
     * @param {THREE.Vector2} normalizedPosition normalized 좌표
     * @returns {Number} 피킹된 평면 인덱스
     */
    pickCubeObject(normalizedPosition) {

        this._raycaster.setFromCamera(normalizedPosition, this._renderer._camera);
        let borigin = this._raycaster.ray.origin.clone().sub(this._raycaster.ray.direction.clone().multiplyScalar(10000));
        this._raycaster.ray.origin = borigin;

        this._intersectedObjects = this._raycaster.intersectObjects(this._renderer._scene2.children, true);
        this._pickedObject = null;

        //console.log("raycast get on np " + normalizedPosition.x + "," + normalizedPosition.y + " : " + this._intersectedObjects.length);
        for (var i = 0; i < this._intersectedObjects.length; i++) {
            var obj = this._intersectedObjects[i].object;
            if (obj && obj._pIndex !== undefined) {
                console.log("pick cube plane index " + obj._pIndex);
                return obj._pIndex;
            }
        }

        return undefined;
    }

    /**
     * 마우스 이동 이벤트를 처리한다.
     * @param {THREE.Vector2} normalizedPosition normalized 좌표
     * @returns {Boolean} 이벤트 핸들 결과
     */
    handleMouseMove(normalizedPosition) {

        for (let mesh of this._pmeshs) {
            mesh.material.color.r = 0.6;
            mesh.material.color.g = 0.6;
            mesh.material.color.b = 0.6;
        }

        let pickIndex = this.pickCubeObject(normalizedPosition);
        if (pickIndex !== undefined) {
            let pm = this._pmeshs[pickIndex];
            pm.material.color.r = 0.3;
            pm.material.color.g = 1;
            pm.material.color.b = 1;
        }

    }

    /**
     * 마우스 버튼 다운 이벤트를 처리한다.
     * @param {THREE.Vector2} normalizedPosition normalized 좌표
     * @returns {Boolean} 이벤트 핸들 결과
     */
    handleMouseDown(normalizedPosition) {
        let pickIndex = this.pickCubeObject(normalizedPosition);
        if (pickIndex !== undefined) {
            this._downClickNP = normalizedPosition.clone();
            this._startDownClick = true;
            return true;
        }

        return false;
    }

    /**
     * 마우스 클릭 이벤트를 처리한다.
     * @param {THREE.Vector2} normalizedPosition normalized 좌표
     * @returns {Boolean} 이벤트 핸들 결과
     */
    handleMouseClick(normalizedPosition) {

        if (this._startDownClick) {
            let pickIndex = this.pickCubeObject(normalizedPosition);
            if (pickIndex !== undefined) {
                this._pickPlaneNormal = this._pnormals[pickIndex].clone().multiplyScalar(-1);
                this._pickPlaneUp = this._pupvs[pickIndex].clone();
                this._startDownClick = false;
                return true;
            }
        }

        this._startDownClick = false;
        return false;
    }


}