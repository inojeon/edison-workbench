import * as THREE from '../build/three.module.js';
import * as G from './Global.js';
import { rayLog } from './log.js';

/**
 * 좌표축 Geometry 클래스
 * */
export class AxisGeom {

    /**
     * 클래스 생성자
     * @param {Renderer} renderer 렌더러 참조
     */
    constructor(renderer){
        this._renderer = renderer;

        this._xp = null;
        this._yp = null;
        this._zp = null;

        this._vPos = new THREE.Vector4(-0.9, -0.9, -0.9, 1);
    }

    /**
    * axis mesh를 현재 카메라를 기준으로 화면의 우측 하단에 위치 시킨다. 
    */
    updateAxisMesh() {

        if (!this._renderer._isOrthoCamera) {
            /*
            this._renderer._raycaster.setFromCamera(new THREE.Vector2(0.5, 0.5), this._renderer._camera);

            var width = this._renderer._div.clientWidth;
            var height = this._renderer._div.clientHeight;
            var aspect = width / height;

            var fov = this._renderer._camera.fov;
            var cz = 20;
            var cx = cz * Math.tan(fov * Math.PI / 180 / 2) * 0.95 * aspect;
            var cy = cz * Math.tan(fov * Math.PI / 180 / 2) * 0.93;

            var forward = new THREE.Vector3(0, 0, 1);
            forward.applyQuaternion(this._renderer._camera.quaternion);
            var right = new THREE.Vector3(1, 0, 0);
            right.applyQuaternion(this._renderer._camera.quaternion);
            var up = new THREE.Vector3(0, 1, 0);
            up.applyQuaternion(this._renderer._camera.quaternion);

            right.multiplyScalar(-cx);
            up.multiplyScalar(-cy);
            forward.multiplyScalar(-cz);
            var pos = new THREE.Vector3();
            pos.copy(this._renderer._camera.position);

            pos.add(right);
            pos.add(up);
            pos.add(forward);


            this._renderer._axisMesh.position.copy(pos);
            */
            // orthogonal camera
            this._renderer._camera.updateProjectionMatrix();
            let pmat = this._renderer._camera.projectionMatrixInverse;

            let pos = this._vPos.clone();

            pos.applyMatrix4(pmat);

            this._renderer._camera.updateMatrixWorld();
            let mvmat = this._renderer._camera.matrixWorld;

            pos.applyMatrix4(mvmat);

            pos.divideScalar(pos.w);

            this._renderer._axisMesh.position.fromArray([pos.x, pos.y, pos.z]);
            this._renderer._axisMesh.scale.fromArray([G._cameraPersfAxisSize, G._cameraPersfAxisSize, G._cameraPersfAxisSize]);

            this._renderer._axisMesh.updateMatrixWorld(true);

            this._aCenter = new THREE.Vector3();
            this._renderer._axisMesh.getWorldPosition(this._aCenter);

            this._apx = new THREE.Vector3(8, 0, 0).applyMatrix4(this._renderer._axisMesh.matrixWorld);
            this._apy = new THREE.Vector3(0, 8, 0).applyMatrix4(this._renderer._axisMesh.matrixWorld);
            this._apz = new THREE.Vector3(0, 0, 8).applyMatrix4(this._renderer._axisMesh.matrixWorld);
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
            this._renderer._axisMesh.position.fromArray([pos.x, pos.y, pos.z]);
            this._renderer._axisMesh.scale.fromArray([size,size,size]);

            let t = 32;

            this._aCenter = new THREE.Vector3();
            this._renderer._axisMesh.getWorldPosition(this._aCenter);

            this._apx = new THREE.Vector3(8, 0, 0).applyMatrix4(this._renderer._axisMesh.matrixWorld);
            this._apy = new THREE.Vector3(0, 8, 0).applyMatrix4(this._renderer._axisMesh.matrixWorld);
            this._apz = new THREE.Vector3(0, 0, 8).applyMatrix4(this._renderer._axisMesh.matrixWorld);
        }


    }

    /**
    * Axis를 그릴 geometry를 cone, cylinder 를 사용하여 생성한다.  
    * @returns 생성된 Three.js Mesh 클래스를 리턴
    */
    createAxisGeometry() {

        let geometryArrow, meshXArrow, geometryXAxis, materialXAxis, meshXAxis, 
        meshYArrow, geometryYAxis, materialYAxis, meshYAxis, meshZArrow, 
        geometryZAxis, materialZAxis, meshZAxis, radius, height;

        let params = null;
        // This function allows for the changing of parameters for all the axis helpers. I have used .2 as radius
        // and 10 for height for this assignment because it makes the helpers the most visible for my scene
        if (params == null) {
            params = {};
        }
    
        if(!radius)
            radius = 0.1;
        if(!height)
            height = 5;
    
        let scene = this._renderer._scene;
        geometryArrow = new THREE.CylinderBufferGeometry(0, 7 * radius, height / 3, 32);

        // This part defines and adds the X axis helper
        materialXAxis = new THREE.MeshBasicMaterial({
            color: 0xFF0000
        });
        geometryXAxis = new THREE.CylinderBufferGeometry(radius, radius, height, 32);
        meshXAxis = new THREE.Mesh(geometryXAxis, materialXAxis);
        meshXArrow = new THREE.Mesh(geometryArrow, materialXAxis);
        meshXAxis.add(meshXArrow);
        meshXArrow.position.y += height / 2;     // 원뿔에 한해서 위치 조정
        meshXAxis.rotation.z -= 90 * Math.PI / 180;     // z 축에 대해서 -90도 회전
        meshXAxis.position.x += height / 2;      // 화살표 위치 조정 
       
        // This part defines and adds the Y axis helper
        materialYAxis = new THREE.MeshBasicMaterial({
            color: 0x00FF00
        });
        
        geometryYAxis = new THREE.CylinderBufferGeometry(radius, radius, height, 32);
        meshYAxis = new THREE.Mesh(geometryYAxis, materialYAxis);
        meshYArrow = new THREE.Mesh(geometryArrow, materialYAxis);
        meshYAxis.add(meshYArrow);
        meshYArrow.position.y += height / 2;
        meshYAxis.position.y += height / 2;
        
        // This part defines and adds the Z axis helper
        materialZAxis = new THREE.MeshBasicMaterial({
            color: 0x0000FF
        });

        geometryZAxis = new THREE.CylinderBufferGeometry(radius, radius, height, 32);
        meshZAxis = new THREE.Mesh(geometryZAxis, materialZAxis);
        meshZArrow = new THREE.Mesh(geometryArrow, materialZAxis);
        meshZAxis.add(meshZArrow);
        meshZAxis.rotation.x += 90 * Math.PI / 180;
        meshZArrow.position.y += height / 2;
        meshZAxis.position.z += height / 2;

        this._renderer._axisMesh = new THREE.Group();

        this._renderer._axisMesh.add(meshXAxis);
        this._renderer._axisMesh.add(meshYAxis);
        this._renderer._axisMesh.add(meshZAxis);

        this._renderer._axisMesh.position.set(0,0,0);
        this._renderer._axisMesh.scale.set(0.1, 0.1, 0.1);
        this._renderer._axisMesh.name = "axis mesh";

        return this._renderer._axisMesh;
    }

    /**
     * 축 모델을 생성한다.
     * @param {Number} radius 반지름
     * @param {Number} height 길이
     */
    createAxis(radius, height) {
        let geometryArrow, meshXArrow, geometryXAxis, materialXAxis, meshXAxis, 
        meshYArrow, geometryYAxis, materialYAxis, meshYAxis, meshZArrow, 
        geometryZAxis, materialZAxis, meshZAxis;

        let params = null;
        // This function allows for the changing of parameters for all the axis helpers. I have used .2 as radius
        // and 10 for height for this assignment because it makes the helpers the most visible for my scene
        if (params == null) {
            params = {};
        }
    
        if(!radius)
            radius = 1;
        if(!height)
            height = 10;
    
        let scene = this._renderer._scene;
        geometryArrow = new THREE.CylinderBufferGeometry(0, 2 * radius, height / 5, 32);

        // This part defines and adds the X axis helper
        materialXAxis = new THREE.MeshBasicMaterial({
            color: 0xFF0000
        });
        geometryXAxis = new THREE.CylinderBufferGeometry(radius, radius, height, 32);
        meshXAxis = new THREE.Mesh(geometryXAxis, materialXAxis);
        meshXArrow = new THREE.Mesh(geometryArrow, materialXAxis);
        meshXAxis.add(meshXArrow);
        meshXArrow.position.y += height / 2;     // 원뿔에 한해서 위치 조정
        meshXAxis.rotation.z -= 90 * Math.PI / 180;     // z 축에 대해서 -90도 회전
        meshXAxis.position.x += height / 2;      // 화살표 위치 조정 
        scene.add(meshXAxis);

        // This part defines and adds the Y axis helper
        materialYAxis = new THREE.MeshBasicMaterial({
            color: 0x00FF00
        });
        
        geometryYAxis = new THREE.CylinderBufferGeometry(radius, radius, height, 32);
        meshYAxis = new THREE.Mesh(geometryYAxis, materialYAxis);
        meshYArrow = new THREE.Mesh(geometryArrow, materialYAxis);
        meshYAxis.add(meshYArrow);
        meshYArrow.position.y += height / 2;
        meshYAxis.position.y += height / 2;
        scene.add(meshYAxis);

        // This part defines and adds the Z axis helper
        materialZAxis = new THREE.MeshBasicMaterial({
            color: 0x0000FF
        });

        geometryZAxis = new THREE.CylinderBufferGeometry(radius, radius, height, 32);
        meshZAxis = new THREE.Mesh(geometryZAxis, materialZAxis);
        meshZArrow = new THREE.Mesh(geometryArrow, materialZAxis);
        meshZAxis.add(meshZArrow);
        meshZAxis.rotation.x += 90 * Math.PI / 180;
        meshZArrow.position.y += height / 2;
        meshZAxis.position.z += height / 2;
        scene.add(meshZAxis);
    }

    /**
     * X, Y, Z 벡터를 사용하여 축 모델을 생성한다.
     * @param {THREE.Vector3} vector_x x축 벡터
     * @param {THREE.Vector3} vector_y y축 벡터
     * @param {THREE.Vector3} vector_z z축 벡터
     * @returns {THREE.Mesh} 모델 메쉬
     */
    createAxisMeshWithVectors(vector_x = new THREE.Vector3(1,0,0), vector_y = new THREE.Vector3(0,1,0), vector_z = new THREE.Vector3(0,0,1)) {
        let radius, height;
        if (!radius)
            radius = 0.1;
        if (!height)
            height = 5;

        let nx = vector_x.clone().normalize();
        let ny = vector_y.clone().normalize();
        let nz = vector_z.clone().normalize();

        // y축으로 부터의 quaternion을 구한다.
        let standard = new THREE.Vector3(0, 1, 0);

        let quaternionX = new THREE.Quaternion();
        quaternionX.setFromUnitVectors(standard.clone(), nx.clone());

        let quaternionY = new THREE.Quaternion();
        quaternionY.setFromUnitVectors(standard.clone(), ny.clone());

        let quaternionZ = new THREE.Quaternion();
        quaternionZ.setFromUnitVectors(standard.clone(), nz.clone());

        let geometryXAxis = new THREE.CylinderBufferGeometry(radius, radius, height, 32);
        let geometryXArrow = new THREE.CylinderBufferGeometry(0, 7 * radius, height / 5, 32);
        //let geometryXLabel = new THREE.SphereBufferGeometry(radius, 15, 15);

        let geometryYAxis = new THREE.CylinderBufferGeometry(radius, radius, height, 32);
        let geometryYArrow = new THREE.CylinderBufferGeometry(0, 7 * radius, height / 5, 32);
        //let geometryYLabel = new THREE.SphereBufferGeometry(radius, 15, 15);

        let geometryZAxis = new THREE.CylinderBufferGeometry(radius, radius, height, 32);
        let geometryZArrow = new THREE.CylinderBufferGeometry(0, 7 * radius, height / 5, 32);
        //let geometryZLabel = new THREE.SphereBufferGeometry(radius, 15, 15);

        let materialX = new THREE.MeshBasicMaterial({
            color: 0xff0000
        });

        let materialY = new THREE.MeshBasicMaterial({
            color: 0x00ff00
        });

        let materialZ = new THREE.MeshBasicMaterial({
            color: 0x0000ff
        });

        let meshXAxis = new THREE.Mesh(geometryXAxis, materialX);
        let meshXArrow = new THREE.Mesh(geometryXArrow, materialX);
        //let meshXLabel = new THREE.Mesh(geometryXLabel, materialX);

        meshXAxis.add(meshXArrow);
        //meshXAxis.add(meshXLabel);
        meshXArrow.position.y += height / 2;
        //meshXLabel.position.y += height;
        meshXAxis.applyQuaternion(quaternionX);
        meshXAxis.position.add(nx.clone().multiplyScalar(height / 2));
        //this._meshXLabel = meshXLabel;

        let meshYAxis = new THREE.Mesh(geometryYAxis, materialY);
        let meshYArrow = new THREE.Mesh(geometryYArrow, materialY);
        meshYAxis.add(meshYArrow);
        meshYArrow.position.y += height / 2;
        meshYAxis.applyQuaternion(quaternionY);
        meshYAxis.position.add(ny.clone().multiplyScalar(height / 2));

        let meshZAxis = new THREE.Mesh(geometryZAxis, materialZ);
        let meshZArrow = new THREE.Mesh(geometryZArrow, materialZ);
        meshZAxis.add(meshZArrow);
        meshZArrow.position.y += height / 2;
        meshZAxis.applyQuaternion(quaternionZ);
        meshZAxis.position.add(nz.clone().multiplyScalar(height / 2));

        this._renderer._axisMesh = new THREE.Group();

        this._renderer._axisMesh.add(meshXAxis);
        this._renderer._axisMesh.add(meshYAxis);
        this._renderer._axisMesh.add(meshZAxis);

        this._renderer._axisMesh.position.set(0, 0, 0);
        this._renderer._axisMesh.scale.set(0.1, 0.1, 0.1);
        this._renderer._axisMesh.name = "axis mesh";

        this._nx = vector_x.clone().normalize();
        this._ny = vector_y.clone().normalize();
        this._nz = vector_z.clone().normalize();

        return this._renderer._axisMesh;
    }

    /**
     * x축 끝점 좌표를 반환한다.
     * @returns {THREE.Vector3} x축 끝점 좌표
     * */
    getXPoint() {
         return this._renderer._axisMesh.position.clone().add(this._nx);
    }

    /**
     * y축 끝점 좌표를 반환한다.
     * @returns {THREE.Vector3} y축 끝점 좌표
     * */
    getYPoint() {
         return this._renderer._axisMesh.position.clone().add(this._ny);
    }

    /**
     * z축 끝점 좌표를 반환한다.
     * @returns {THREE.Vector3} z축 끝점 좌표
     * */
    getZPoint() {
        return this._renderer._axisMesh.position.clone().add(this._nz);
    }

    /**
     * Axis 렌더링 뷰포트 위치를 지정한다.
     * @param {Number} x 뷰포트 x값
     * @param {Number} y 뷰포트 y값
     * @param {Number} z 뷰포트 z값
     * @param {Number} w 뷰포트 w값
     */
    setViewportPosition(x, y, z, w) {
        this._vPos = new THREE.Vector4(x, y, z, w);
    }

}