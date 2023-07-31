import * as THREE from '../build/three.module.js';
import { OrbitControls } from './jsm/controls/OrbitControls.js';
import { TrackballControls } from './jsm/controls/TrackballControls.js';

import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';
import { RGBELoader } from './jsm/loaders/RGBELoader.js';
import { RoughnessMipmapper } from './jsm/utils/RoughnessMipmapper.js';
import { GLTFExporter } from './jsm/exporters/GLTFExporter.js';
import { AxisGeom } from './AxisGeom.js';
import { rayLog } from '../Renderer/log.js';

import { Lut } from './jsm/math/Lut.js';

import { EffectComposer } from './jsm/postprocessing/EffectComposer.js';
import { SSAOPass } from './jsm/postprocessing/SSAOPass.js';
import { RenderPass } from './jsm/postprocessing/RenderPass.js';
import { SAOPass } from './jsm/postprocessing/SAOPass.js';

import { CameraCubeGeom } from './CameraCubeGeom.js';


/**
 * Three.js을 사용하여 3D 모델을 렌더링하고 가시화 하는데 필요한 기능을 모아둔 클래스
 * */
export class Renderer {

    static _font = null;
    static _renderer = null;

    static _lightCameraIntensity1 = 0.6;
    static _lightCameraIntensity2 = 1;
    static _lightCameraIntensity3 = 0.4;

    /**
     * 폰트 데이터를 로드한다.
     * @param {Function} callback 콜백 함수
     */
    LoadFont(callback) {
        this._font_loader = new THREE.FontLoader();

        const fn = '../_resources/helvetiker_bold.typeface.json';

        let I = this;

        this._font_loader.load(fn,
            function (font) {
                I._font = font;

                if (callback)
                    callback(font);
            });
    }


    /**
     * Renderer.js 생성자. Three.js의 Renderer와 기타 변수등을 초기화 한다. 
     * @param {any} div 렌더링 될 창의 div 포인터
     * @param {Boolean} preserve_screen 화면을 저장하기 위한 버퍼를 생성할지 여부
     * @param {Boolean} is_main 생성된 렌더러가 메인 렌더러인지 여부
     */
    constructor(div, preserve_screen, is_main) {
        this._enableFog = false;
        Renderer._renderer = this;

        if (!preserve_screen)
            preserve_screen = false;

        this._div = div;

        if (is_main) {
            Renderer.I = this;
        }

        this._camera = null;
        this._cameraOrthoTop = 0;
        this._cameraOrthoBottom = 0;

        this._cameraZoomO = 1;
        this._cameraZoomP = 1;


        this._scene = null;

        this._renderer = null;

        this._clock = new THREE.Clock();

        this._container = null;

        this._backgroundColor = new THREE.Color(0.5, 0.5, 0.5);

        this._lightMode = 0;

        this._group = null;

        this._container = document.createElement('div');
        this._div.appendChild(this._container);

        this._sceneUI = new THREE.Scene();

        this._sceneAxis = new THREE.Scene();
        this._scene = new THREE.Scene();
        //this._scene.background = new THREE.Color(0xffffff);
        this._scene.background = this._backgroundColor;

        // add scene2
        this._scene2 = new THREE.Scene();

        this._windowWidth = 100;
        this._windowHeight = 100;

        this._vx = new THREE.Vector3(1, 0, 0);
        this._vy = new THREE.Vector3(0, 1, 0);
        this._vz = new THREE.Vector3(0, 0, 1);

        //var scr_width = window.innerWidth;
        //var scr_height = window.innerHeight;
        var scr_width = this._div.offsetWidth;
        var scr_height = this._div.offsetHeight;

        this._renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: preserve_screen });

        if (preserve_screen)
            this._renderer.setPixelRatio(1.0);
        else
            this._renderer.setPixelRatio(window.devicePixelRatio);

        this._renderer.setSize(scr_width, scr_height);
        //        this._renderer.outputEncoding = THREE.sRGBEncoding;
        this._renderer.shadowMap.enabled = true;
        this._renderer.antialias = true;
        this._renderer.setClearColor(0x6f6f6f, 1);
        //window.addEventListener('resize', this.onWindowResize, false);

        this._container.appendChild(this._renderer.domElement);


        this._raycaster = new THREE.Raycaster();
        this._intersectedObjects = [];


        // axisGeom 추가
        this._axes = [];
        this._axisGeom = new AxisGeom(this);
        this._axisMesh = this._axisGeom.createAxisMeshWithVectors();
        // this._axisMesh = this._axisGeom.createAxisGeometry();
        this._scene2.add(this._axisMesh);
        
        this._scene.fog = new THREE.Fog(this._backgroundColor, 30, 40);
        this._scene.fog = null;

        this._effectComposer = new EffectComposer(this._renderer);

        this._useEffectComposer = false; // normal
        this._renderPassMode = 0;
    };



    /**
     * 앤티 얼라이어싱 옵션을 설정한다.
     * @param {Boolean} enable 앤티 얼라이어스 옵션 사용 여부
     */
    setAntialias(enable) {
        this._renderer.antialias = enable;
    }

    // 렌더링 모드를 가져옴. 

    /**
     * Fog 효과 파라메터를 설정한다.
     * @param {Number} near Fog near
     * @param {Number} far Fog far
     */
    setFogDistance(near, far) {
        this._fogNear = near;
        this._fogFar = far;

        this.enableFog(this._enableFog);
    }

    /**
     * 현재 렌더링 모드를 반환한다.
     * @returns {Number} 렌더링 모드
     * */
    getRenderMode() {
        return this._renderPassMode;
    }

    toScreenPosition(mesh) {
        let obj = mesh;
        var vector = new THREE.Vector3();

        var widthHalf = 0.5 * this._renderer.getContext().canvas.clientWidth;
        var heightHalf = 0.5 * this._renderer.getContext().canvas.clientHeight;

        obj.updateMatrixWorld();
        vector.setFromMatrixPosition(obj.matrixWorld);
        vector.project(this._camera);

        vector.x = (vector.x * widthHalf) + widthHalf;
        vector.y = - (vector.y * heightHalf) + heightHalf;

        return [vector.x, vector.y];

    };



    // 렌더링 모드를 설정
    // 0: 일반 렌더링
    // 1: Screen Space ambient occlusion
    // 2: Scalable ambient occlusion

    /**
     * 렌더링 모드를 설정한다.
     * @param {Number} mode 렌더링 모드
     */
    setRenderMode(mode) {
        switch (mode) {
            case 0:
                this.setRenderPassDefault();
                break;

            case 1:
                this.setRenderPassSSAO();
                break;

            case 2:
                this.setRenderPassSAO();
                break;
        }
    }

    /**
     * 기본 Render Pass 를 설정한다.
     * */
    setRenderPassDefault() {
        this.RemoveAllPasses();

        this._useEffectComposer = false; // normal
        this._renderPassMode = 0;
    }

    /**
     * SSAO Render Pass를 설정한다.
     * */
    setRenderPassSSAO() {
        this.RemoveAllPasses();

        const width = window.innerWidth;
        const height = window.innerHeight;

        this._ssaoPass = new SSAOPass(this._scene, this._camera, width, height);
        this._ssaoPass.kernelRadius = 64;

        this._effectComposer.addPass(this._ssaoPass);

        this._useEffectComposer = true; // normal
        this._renderPassMode = 1;
    }

    /**
     * SAO Render Pass를 설정한다.
     * */
    setRenderPassSAO() {
        this.RemoveAllPasses();

        const width = window.innerWidth;
        const height = window.innerHeight;


        this._renderPass = new RenderPass(this._scene, this._camera);
        this._effectComposer.addPass(this._renderPass );

        this._saoPass = new SAOPass(this._scene, this._camera, false, true);

        this._saoPass.params.saoBias = 0.25;
        this._saoPass.params.saoIntensity = 0.15;
        this._saoPass.params.saoScale = 80;
        this._saoPass.params.saoKernelRadius = 100;
        this._saoPass.params.saoMinResolution = 0;
        this._saoPass.params.saoBlur = true;
        this._saoPass.params.saoBlurRadius = 8;
        this._saoPass.params.saoBlurStdDev = 4;
        this._saoPass.params.saoBlurDepthCutoff = 0.01;

        this._effectComposer.addPass(this._saoPass);

        this._useEffectComposer = true; // normal
        this._renderPassMode = 2;
    }

    /**
     * 기존 Render Pass를 삭제한다.
     * */
    RemoveAllPasses() {
        if (this._ssaoPass) {
            this._effectComposer.removePass(this._ssaoPass);
            this._ssaoPass = null;
        }
        if (this._saoPass) {
            this._effectComposer.removePass(this._saoPass);
            this._saoPass = null;
        }
        if (this._renderPass) {
            this._effectComposer.removePass(this._renderPass);
            this._renderPass = null;
        }
    }

    /**
    * 포그를 enable/disable 한다. 
    * @param {Boolean} enable enable/disable여부
    */
    enableFog(enable) {

        this._enableFog = enable;
        if (enable) {
            this._scene.fog = new THREE.Fog(this._backgroundColor, this._fogNear, this._fogFar);
            if (this._cameraP) {
                this._cameraP.near = 0.1;
                this._cameraP.updateProjectionMatrix();
            }
        }
        else {
            this._scene.fog = null;
            if (this._cameraP) {
                this._cameraP.near = 0.1;
                this._cameraP.updateProjectionMatrix();
            }
        }

    }

    /**
    * 특정 Three.js Geometry의 vertex color를 설정한다. 
    * @param {Three.Geometry} geom vretex color를 설정할 geometry
    * @param {Number} r red color [0,1]
    * @param {Number} g green color [0,1]
    * @param {Number} b blue color [0,1]
    */
    setGeometryVertexColor(geom, r, g, b) {
        let colors = new Float32Array([r,g,b]);
        geom.setAttribute( 'color', new THREE.BufferAttribute( colors, 3, true) );
    }

    
    /**
    * Axis를 그릴 geometry를 cone, cylinder 를 사용하여 생성한다.  
    * @returns 생성된 Three.js Mesh 클래스를 리턴
    */
   /*
    createAxisGeometry(axis1 = new THREE.Vector3(0,1,0), axis2 = new THREE.Vector3(1,0,0), axis3 = new THREE.Vector3(0,0,1)) {
    
        let defaultQuaternion = new THREE.Quaternion();

        const cr = 0.1;
        const clen = 3;
        var mergedGeo = new THREE.Geometry();

        var mat1 = new THREE.Matrix4();

        mat1.identity();
        mat1.compose(new THREE.Vector3(), 
            defaultQuaternion.clone().setFromUnitVectors(new THREE.Vector3(0,1,0), axis1), 
            new THREE.Vector3(1,1,1));

        var cylinder = new THREE.CylinderGeometry(cr, cr, clen, 8).translate(0, clen/2, 0);
        var cone = new THREE.ConeGeometry(cr*2, 1, 32).translate(0, clen,0);
        this.setGeometryVertexColor(cylinder, 0, 1, 0);
        this.setGeometryVertexColor(cone, 0, 1, 0);

        mergedGeo.merge(cylinder, mat1);
        mergedGeo.merge(cone, mat1);

        mat1.identity();
        mat1.compose(new THREE.Vector3(),
            defaultQuaternion.clone().setFromUnitVectors(new THREE.Vector3(0,1,0), axis2),
            new THREE.Vector3(1,1,1));

        cylinder = new THREE.CylinderGeometry(cr, cr, clen, 8).translate(0, clen / 2, 0);
        cone = new THREE.ConeGeometry(cr * 2, 1, 32).translate(0, clen, 0);
        this.setGeometryVertexColor(cylinder, 1, 0, 0);
        this.setGeometryVertexColor(cone, 1, 0, 0);

        mergedGeo.merge(cylinder, mat1);
        mergedGeo.merge(cone, mat1);

        mat1.identity();
        mat1.compose(new THREE.Vector3(),
            defaultQuaternion.clone().setFromUnitVectors(new THREE.Vector3(0,1,0), axis3),
            new THREE.Vector3(1,1,1));

        
        cylinder = new THREE.CylinderGeometry(cr, cr, clen, 8).translate(0, clen / 2, 0);
        cone = new THREE.ConeGeometry(cr * 2, 1, 32).translate(0, clen, 0);
        this.setGeometryVertexColor(cylinder, 0, 0, 1);
        this.setGeometryVertexColor(cone, 0, 0, 1);

        mergedGeo.merge(cylinder, mat1);
        mergedGeo.merge(cone, mat1);
        

        var matx = new THREE.MeshLambertMaterial({
            vertexColors: THREE.VertexColors,
            color: 0xffffff
        });


        this._axisMesh = new THREE.Mesh(mergedGeo, matx);
        this._axisMesh.scale.set(0.2, 0.2, 0.2);

        return this._axisMesh;
    }
    */


    /**
    * scene으로 받은 모델을 GLTF형식으로 익스포트 한다. 
    * @param {Three.Scene} scene export할 scene 데이터
    * @param {function} callback export되면 호출될 함수
    */
    exportGLTF(scene, callback) {

        const gltfExporter = new GLTFExporter();

        const options = {
            trs: false,
            onlyVisible: true,
            truncateDrawRange: false,
            binary: true,
            maxTextureSize: 40960000
        };

        var output = null;

        gltfExporter.parse(scene, function (result) {

            if (result instanceof ArrayBuffer) {

                //saveArrayBuffer(result, 'scene.glb');
                if (callback)
                    callback(result);

            } else {

                output = JSON.stringify(result, null, 2);
                rayLog(3,"GLTF generated.");
                //saveString(output, 'scene.gltf');
                if (callback)
                    callback(output);
            }

        }, options);

    }


    /**
    * axis mesh를 현재 카메라를 기준으로 화면의 우측 하단에 위치 시킨다. 
    */
    /*
    updateAxisMesh() {

        this._raycaster.setFromCamera(new THREE.Vector2(0.5,0.5), this._camera);

        
        // var pos = this._raycaster.ray.origin.clone();
        // var dir = this._raycaster.ray.direction.clone();
        // dir.multiplyScalar(20);
        // pos.add(dir);
        

        var width = this._div.clientWidth;
        var height = this._div.clientHeight;
        var aspect = width / height;

        var fov = this._camera.fov;
        var cz = 20;
        var cx = cz * Math.tan(fov * Math.PI / 180 / 2) * 0.95 * aspect;
        var cy = cz * Math.tan(fov * Math.PI / 180 / 2) * 0.93;
        
        var forward = new THREE.Vector3(0, 0, 1);
        forward.applyQuaternion(this._camera.quaternion);
        var right = new THREE.Vector3(1, 0, 0);
        right.applyQuaternion(this._camera.quaternion);
        var up = new THREE.Vector3(0, 1, 0);
        up.applyQuaternion(this._camera.quaternion);

        right.multiplyScalar(-cx);
        up.multiplyScalar(-cy);c
        forward.multiplyScalar(-cz);
        var pos = new THREE.Vector3();
        pos.copy(this._camera.position);

        pos.add(right);
        pos.add(up);
        pos.add(forward);
        

        this._axisMesh.position.copy( pos);
    }
    */


    /**
    * Renderer의 배경 색을 정의한다. 
    * @param {Three.Scene} scene export할 scene 데이터
    * @param {Number} r red color [0,1]
    * @param {Number} g green color [0,1]
    * @param {Number} b blue color [0,1]
    */
    setBackgroundColor(r, g, b) {
        this._backgroundColor = new THREE.Color(r, g, b);
        this._scene.background = this._backgroundColor;
        this.enableFog(this._enableFog);
    }


    /**
    * Renderer의 현재 배경 색을 가져온다. 
    * @returns 현재 배경색 [r,g,b]
    */
    getBackgroundColor() {
        return [this._backgroundColor.r, this._backgroundColor.g, this._backgroundColor.b];
    }


    /**
    * Three.js Renderer의 domElement를 리턴한다. 
    * @returns Renderer의 domElement
    */
    getContainer() {
        return this._renderer.domElement;
    }

    /**
     * Ortho 카메라의 방향을 설정한다.
     * @param {THREE.Vector3} direction 방향 벡터
     */
    setOrthoCameraDirection(direction, up) {

        let center = this._controls.target.clone();

        let dir = direction.clone();
        dir.normalize();
        dir.multiplyScalar(-this._ocameraDistance);


        var pos = new THREE.Vector3();
        pos.add(center);
        pos.add(dir);

        let zoom = this._cameraZoomO ;

        this._cameraO.position.set(pos.x, pos.y, pos.z);
        this._cameraO.zoom = zoom;
        if (up) {
            this._cameraO.up.set(up.x, up.y, up.z);
        }

        this._controls.position0.set(pos.x, pos.y, pos.z);
        this._controls.target0.set(center.x, center.y, center.z);
        this._controls.zoom0 = zoom;

        this._controls.reset();

    }

    /**
     * Ortho 카메라의 거리를 설정한다.
     * @param {Number} dist 거리 값
     */
    setOrthoCameraDistance(dist) {
        this._ocameraDistance = dist;

        let center = this._controls.target.clone();

        var dir = new THREE.Vector3();
        this._camera.getWorldDirection(dir);
        dir.normalize();
        dir.multiplyScalar(-this._ocameraDistance);

        var pos = new THREE.Vector3();
        pos.add(center);
        pos.add(dir);

        let zoom = this._cameraZoomO;

        this._cameraO.position.set(pos.x, pos.y, pos.z);
        this._cameraO.zoom = zoom;

        this._controls.position0.set(pos.x, pos.y, pos.z);
        this._controls.target0.set(center.x, center.y, center.z);
        this._controls.zoom0 = zoom;
        this._controls.reset();

    }

    // zoom_factor -n~n
    adjustOrthoZoom(zoom_factor) {

        let zoom = this._cameraO.zoom;
        zoom += zoom_factor;
        if (zoom < this._controls.minZoom)
            zoom = this._controls.minZoom;

        if (zoom > this._controls.maxZoom)
            zoom = this._controls.maxZoom;

        this._cameraO.zoom = zoom;
    }
    

    /**
    * 3차원 Three.js 의 Orthographic camera를 생성한다. 
    * @param {Number} left Orthograpic camera의 좌측 x좌표를 정의
    * @param {Number} right Orthograpic camera의 우측 x좌표를 정의
    * @param {Number} top Orthograpic camera의 상단 y좌표를 정의
    * @param {Number} bottom Orthograpic camera의 하단 y좌표를 정의
    * @param {Number} near Orthograpic camera의 가까운 평면을 정의
    * @param {Number} far Orthograpic camera의 먼 평면을 정의
    */
    create3DOrthographicCamera(left, right, top, bottom, near, far) {
        if (this._camera) {
            this._scene.remove(this._camera);
        }

        this._is2DOrthoCamera = false;
        this._isOrthoCamera = true;

        this._cameraOrthoTop = top;
        this._cameraOrthoBottom = bottom;

        var width = this._div.clientWidth;
        var height = this._div.clientHeight;
        var aspect = width / height;

        var ch = top - bottom;

        this._ocameraDistance = 100;

        this._cameraO = new THREE.OrthographicCamera(-aspect * ch / 2, aspect * ch / 2, top, bottom, near, far);
        this._cameraO.position.set(100, 100, 100);

        this._camera = this._cameraO;

        this._scene.add(this._camera);
    }

    /**
    * 현재 카메라를 Orthogonal camera로 설정한다. 
    */
    setOrthoCamera() {

        let pmode = this._cameraMode;

        this._cameraMode = "O";
        this._scene.remove(this._cameraP);
        this._scene.add(this._cameraO);

        //this._cameraO.position.set(this._cameraP.position.x, this._cameraP.position.y, this._cameraP.position.z);
        this._camera = this._cameraO;
        this._cameraO.add(this._cameraLight);


        this._isOrthoCamera = true;

        this.onWindowResize(this._windowWidth, this._windowHeight);

        this._controls.object = this._camera;
        this._controls.zoom0 = this._camera.zoom;

        this._controls.reset();

        if (pmode == "P") {
            this._cameraO.position.set(this._cameraP.position.x, this._cameraP.position.y, this._cameraP.position.z);
        }


        this.onWindowResize(this._windowWidth, this._windowHeight);
        //this.autofitCamera();

    }

    /**
    * 현재 카메라를 Perspective camera로 설정한다.
    */
    setPerspectiveCamera() {

        let pmode = this._cameraMode;

        this._cameraMode = "P";
        this._scene.remove(this._cameraO);
        //this._scene.remove(this._cameraP);
        this._scene.add(this._cameraP);

        this._cameraP.add(this._cameraLight);


        //this._cameraP.position.set(this._cameraO.position.x, this._cameraO.position.y, this._cameraO.position.z);
        this._camera = this._cameraP;

        this._controls.zoom0 = this._camera.zoom;
        this._controls.object = this._camera;
        this._controls.reset();

        if (pmode == "O") {
            this._cameraP.position.set(this._cameraO.position.x, this._cameraO.position.y, this._cameraO.position.z);
        }

        this._isOrthoCamera = false;

        this.onWindowResize(this._windowWidth, this._windowHeight);


    }

    /**
    * 2차원 Three.js 의 Orthographic camera를 생성한다.
    * @param {Number} left Orthograpic camera의 좌측 x좌표를 정의
    * @param {Number} right Orthograpic camera의 우측 x좌표를 정의
    * @param {Number} top Orthograpic camera의 상단 y좌표를 정의
    * @param {Number} bottom Orthograpic camera의 하단 y좌표를 정의
    * @param {Number} near Orthograpic camera의 가까운 평면을 정의
    * @param {Number} far Orthograpic camera의 먼 평면을 정의
    */
    createOrthographicCamera(left,right,top,bottom,near,far) {
        if (this._camera) {
            this._scene.remove(this._camera);
        }

        this._is2DOrthoCamera = true;
        this._isOrthoCamera = true;

        this._cameraOrthoTop = top;
        this._cameraOrthoBottom = bottom;

        var width = this._div.clientWidth;
        var height = this._div.clientHeight;
        var aspect = width / height;

        var ch = top - bottom;

        this._cameraO = new THREE.OrthographicCamera(-aspect * ch / 2, aspect * ch / 2, top, bottom, near, far);
        this._camera = this._cameraO;

        this._scene.add(this._camera);
        //this._cameraMode = "O";
    }

    /**
    * 3차원 Three.js 의 Perspective camera를 생성한다.
    * @param {Number} x camera의 x좌표를 정의
    * @param {Number} y camera의 y좌표를 정의
    * @param {Number} z camera의 z좌표를 정의
    * @param {Number} fov camera의 fov를 정의
    * @param {Number} aspect camera의 aspect ratio을 정의
    * @param {Number} near camera의 가까운 평면을 정의
    * @param {Number} far camera의 먼 평면을 정의
    */
    createPerspecriveCamera(x, y, z, fov,aspect, near, far) {
        if (this._camera) {
            this._scene.remove(this._camera);
        }

        this._is2DOrthoCamera = false;
        this._isOrthoCamera = false;

        this._cameraP = new THREE.PerspectiveCamera(fov,aspect,near,far);
        this._cameraP.position.set(x,y,z);

        this._camera = this._cameraP;

        this._scene.add(this._camera);

        //this._cameraMode = "P";
    }


    /**
    * 카메라를 컨트롤 하는 Three.js의 Trackball control을 생성한다. 
    */
    /*
    createTrackballControl() {

        this._controls = new TrackballControls(this._camera, this._container);

        this._controls.rotateSpeed = 35.0;
        this._controls.zoomSpeed = 1.2;
        this._controls.panSpeed = 0.8;
        this._controls.staticMoving = true;
        this._controls.dynamicDampingFactor = 5;
        this._controls.target.set(0, 0, 0);
        this._controls.update();
    }
    */

    /**
    * 카메라를 컨트롤 하는 Three.js의 Orbit control을 생성한다.
    */
    createOrbitControl() {
        this._controls = new OrbitControls(this._camera, this._container);
        this._controls.target.set(0, 0, 0);

        this._controls.object = this._camera;

        if (this._is2DOrthoCamera) {
            this._controls.enableRotate = false;
        }
        else {
            this._controls.enableRotate = true;

        }

        this._controls.update();
    }


    /**
    * 카메라를 컨트롤 하는 Three.js의 Orbit control을 생성한다.
    */
    createTrackballControl() {
        this._controls = new TrackballControls(this._camera, this._container);
        this._controls.target.set(0, 0, 0);

        this._controls.rotateSpeed = 35.0;
        this._controls.zoomSpeed = 1.2;
        this._controls.panSpeed = 0.8;
        this._controls.staticMoving = true;
        this._controls.dynamicDampingFactor = 5;
        this._controls.target.set(0, 0, 0);
        this._controls.noZoom = false;
        this._controls.noPan = false;
        this._controls.object = this._camera;

        if (this._is2DOrthoCamera) {
            this._controls.enableRotate = false;
        }
        else {
            this._controls.enableRotate = true;

        }

        this._controls.update();
    }

    
    /**
    * Skybox 텍스쳐를 로드하고 설정한다. 
    * @param {String} path 텍스쳐의 위치 URL
    * @param {String} fn 텍스쳐 파일 이름
    * @param {Function} func 로드가 완료되면 호출 될 callback 함수
    */
    loadSkybox(path,fn,func) {
        if (!Renderer.I._pmremGenerator) {
            Renderer.I._pmremGenerator = new THREE.PMREMGenerator( Renderer.I._renderer );
            Renderer.I._pmremGenerator.compileEquirectangularShader();            
        }
        
        new RGBELoader()
					.setDataType( THREE.UnsignedByteType )
					.setPath( path )
					.load( fn, function ( texture ) {

                        var pmremGenerator = new THREE.PMREMGenerator( Renderer.I._renderer );
                        pmremGenerator.compileEquirectangularShader();            
            
						var envMap = Renderer.I._pmremGenerator.fromEquirectangular( texture ).texture;

						Renderer.I._scene.background = envMap;
						Renderer.I._scene.environment = envMap;

						texture.dispose();
						pmremGenerator.dispose();

                        //render();
                        if (func)
                            func(texture);
					} );

    }

    /**
    * Skybox 메쉬 모델을 로드하는 함수
    * @param {String} path 텍스쳐의 위치 URL
    * @param {String} fn 텍스쳐 파일 이름
    * @param {Function} func 로드가 완료되면 호출 될 callback 함수
    */
    loadModel(path,fn,func) {
     
        var roughnessMipmapper = new RoughnessMipmapper( Renderer.I._renderer );

        var loader = new GLTFLoader().setPath( path );
        loader.load( fn, function ( gltf ) {

            var list = [];

            for (var i=0; i<gltf.scene.children.length; i++) {
                const child = gltf.scene.children[i];
                list.push(child);
            }

            //Renderer.I._scene.add( gltf.scene );

            var i = 0;
            for (i=0; i<list.length; i++) {
                Renderer.I._group.attach(list[i]);
            }


            roughnessMipmapper.dispose();

            //render();
            if (func)
                func(gltf);
        } );
    }


    /**
    * 바닥 평면 메쉬를 생성한다. 
    */
    createGround(){
        var geometry = new THREE.PlaneBufferGeometry(4000, 4000);


        var material = new THREE.MeshStandardMaterial( {
            color: 0x2e2e2e,
            roughness: 1.0,
            metalness: 0.0
        } );

        var floor = new THREE.Mesh( geometry, material );
        floor.position.set(0,-5,0);
        floor.rotation.x = - Math.PI / 2;
        floor.receiveShadow = true;
        this._scene.add( floor );
    }

    /**
     * 메쉬에서 사용하는 그래픽 리소스를 해제한다.
     * @param {THREE.Mesh} mesh 메쉬
     */
    disposeMesh(mesh) {
        this.removeMesh(mesh);
    }

    /**
     * 메쉬를 삭제한다.
     * @param {THRE.Mesh} mesh 메쉬
     */
    removeMesh(mesh) {

        if (!mesh)
            return;

        var list = [];
        mesh.children.forEach(child => list.push(child));

        for (var i = 0; i < list.length; i++) {
            this.removeMesh(list[i]);
        }

        if (mesh.parent)
            mesh.parent.remove(mesh);

        if (mesh.geometry) {
            if (mesh._disposeGeometry) {
                mesh.geometry.dispose();
                mesh._disposeGeometry = false;
            }
        }

        if (mesh.material) {
            if (mesh._disposeMaterial) {
                mesh.material.dispose();
                mesh._disposeMaterial = false;
            }
        }
    }

    /**
    * 카메라에 붙어 있는 라이트를 생성한다. 
    */
    createCameraLight(){

        this._hemisphereLight = new THREE.HemisphereLight(0x909090, 0x707070);
        this._scene.add(this._hemisphereLight);

        this._hemisphereLight2 = new THREE.HemisphereLight(0x909090, 0x707070);
        this._scene2.add(this._hemisphereLight2);

        this._cameraLight = new THREE.PointLight(0xffffff, 0.6);
        this._camera.add(this._cameraLight);

        //this._cameraLight2 = new THREE.PointLight(0xffffff, 1);
        //this._camera.add(this._cameraLight2);

        this._directionalLight =new THREE.DirectionalLight(0xffffff, 1);
        this._scene.add(this._directionalLight);

        this._directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
        this._scene2.add(this._directionalLight2);

        this._ambientLight = new THREE.AmbientLight(0x404040); // soft white light
        this._scene.add(this._ambientLight);

        this._ambientLight3 = new THREE.AmbientLight(0xffffff); // soft white light
        this._scene.add(this._ambientLight3);

        this._ambientLight2 = new THREE.AmbientLight(0xd0d0d0); // soft white light
        this._scene2.add(this._ambientLight2);

        this.setLightMode(0);

        /*
        var light = new THREE.DirectionalLight( 0xffffff );
        light.position.set( 0, 6, 0 );
        light.castShadow = true;
        light.shadow.camera.top = 2;
        light.shadow.camera.bottom = - 2;
        light.shadow.camera.right = 2;
        light.shadow.camera.left = - 2;
        light.shadow.mapSize.set( 4096, 4096 );
        this._scene.add( light );
        */
    }

    /**
    * 라이트 모드를 설정한다. 0,1,2,3,4 5가지 모드가 있다.  
    * @param {Number} mode 라이트 모드
    */
    setLightMode(mode) {
        this._lightMode = mode;
        switch (mode) {
            case 0: // camera light + hemi
                this._cameraLight.visible = true;
                this._cameraLight.intensity = Renderer._lightCameraIntensity1;
                this._hemisphereLight.visible = true;
                this._directionalLight.visible = false;
                this._ambientLight.visible = false;
                this._ambientLight3.visible = false;

                this._ambientLight2.visible = true;
                break;
            case 1: // camera 
                this._cameraLight.visible = true;
                this._cameraLight.intensity = Renderer._lightCameraIntensity2;
                this._hemisphereLight.visible = false;
                this._directionalLight.visible = false;
                this._ambientLight.visible = true;
                this._ambientLight3.visible = false;

                this._ambientLight2.visible = true;
                break;
            case 2: // dir + ambient
                this._cameraLight.visible = false;
                this._hemisphereLight.visible = false;
                this._directionalLight.visible = true;
                this._ambientLight.visible = true;
                this._ambientLight3.visible = false;

                this._ambientLight2.visible = true;
                break;
            case 3: // dir
                this._cameraLight.visible = false;
                this._hemisphereLight.visible = false;
                this._directionalLight.visible = true;
                this._ambientLight.visible = false;
                this._ambientLight3.visible = false;

                this._ambientLight2.visible = true;
                break;
            case 4: // no light
                this._cameraLight.visible = false;
                this._hemisphereLight.visible = false;
                this._directionalLight.visible = false;
                this._ambientLight.visible = false;
                this._ambientLight3.visible = true;

                this._ambientLight2.visible = true;
                break;

            case 5: // ambient only
                this._cameraLight.visible = false;
                this._hemisphereLight.visible = false;
                this._directionalLight.visible = false;
                this._ambientLight.visible = true;
                this._ambientLight3.visible = false;

                this._ambientLight2.visible = true;

                break;

            case 6: // ambient only
                this._cameraLight.visible = false;

                this._hemisphereLight.visible = true;
                this._directionalLight.visible = true;
                this._ambientLight.visible = true;
                this._ambientLight3.visible = false;

                this._ambientLight2.visible = false;

                break;

            case 7: // ambient only
                this._cameraLight.visible = false;

                this._hemisphereLight.visible = true;
                this._directionalLight.visible = false;
                this._ambientLight.visible = true;
                this._ambientLight3.visible = false;

                this._ambientLight2.visible = true;

                break;

        }
    }


    /**
    * 현재 브라우져가 어떤 브라우져인지 확인한다. 
    */
    checkBrowser(){
        this._isChromium = window.chrome;
        //this._winNav = window.navigator;
        //this._vendorName = winNav.vendor;
        //this._isOpera = typeof window.opr !== "undefined";
        this._isIEedge = window.navigator.userAgent.indexOf("Edge") > -1;
        this._isIOSChrome = window.navigator.userAgent.match("CriOS");        
    }

    /**
     * 콜백 함수를 설정한다.
     * @param {Function} cb_func 콜백 함수
     */
    setCallback(cb_func) {
        this._callback = cb_func;
    }

    /**
    * 한 프레임을 렌더링 한다.
    */
    render() {

        //rayLog(3, "cam pos :" + this._cameraO.position.x + "   " + this._cameraO.position.y + "   " + this._cameraO.position.z + "   " );

        if (this._callback)
            this._callback(this._clock.getDelta());


        this._renderer.autoClear = true;

        //this._renderer.clear();
        if (this._useEffectComposer) {
            this._effectComposer.render();
        } else {
            this._renderer.render(Renderer.I._scene, Renderer.I._camera);
        }

        this._renderer.autoClear = false;

        this._renderer.clearDepth();
        this._renderer.render(Renderer.I._scene2, Renderer.I._camera);


        if (this._controls)
            this._controls.update(this._clock.getDelta());


        //this._renderer.render(Renderer.I._sceneUI, Renderer.I._camera);
    }

    /**
    * 현재 Scene의 오브젝트를 모두 지운다.
    */
    clearScene(){
        /*
        while(this._scene.children.length > 0){ 
            this._scene.remove(this._scene.children[0]); 
        }
        */
    }



    /**
    * 한 프레임을 렌더링 할 때 필요한 작업을 한다.
    */
    tick(){
        this._dtime = this._clock.getDelta();

        const delta = this.getDeltaTime();

        // axisGeom update
        this._axisGeom.updateAxisMesh();

        if (this._cubeGeom)
            this._cubeGeom.updateAxisMesh();

        if (this._cameraMode == "P") {
            let pos = this._cameraP.position;
            this._cameraP.position.set(pos.x,pos.y, pos.z);
        } else if (this._cameraMode == "O") {
            this._cameraO.position.set(this._cameraO.position.x, this._cameraO.position.y, this._cameraO.position.z);

        }

    }

    /**
    * 현재 프레임의 delta time을 구한다.
    * @returns delta time
    */
    getDeltaTime(){
        return this._dtime;
    }


    /**
    * obj Mesh가 화면에 가득 보이도록 카메라의 위치를 조정한다. 
    * @param {Three.Mesh} obj 화면에 보일 Three.js Mesh
    */
    autofitOrthoCamera(obj) {

        //rayLog(3,"prev cam near :" + this._cameraO.near+"   far:" +  this._cameraO.far);
        //rayLog(3,"prev zoom:" + this._cameraO.zoom);
        //rayLog(3,"prev box :" + this._cameraO.left + "  "+this._cameraO.top + "   "+   this._cameraO.right + "  "+this._cameraO.bottom );

        var bbox = new THREE.Box3();
        bbox.expandByObject(obj);

        // no object, so bbox is invalid
        if (bbox.min.x > bbox.max.x || bbox.min.y > bbox.max.y)
            return;

        rayLog(3,"all bbox " + bbox.min.x + "," + bbox.min.y + "," + bbox.max.x + "," + bbox.max.y);


        var center = new THREE.Vector3();
        bbox.getCenter(center);
        var size = new THREE.Vector3();
        bbox.getSize(size);

        var zoom = size.x;
        if (zoom < size.y)
            zoom = size.y;

        zoom = 1/zoom * 10;

        var cpos = new THREE.Vector3();
        cpos.x = (this._camera.left + this._camera.right) * 0.5;
        cpos.y = (this._camera.top + this._camera.bottom) * 0.5;


        var dir = new THREE.Vector3();
        this._camera.getWorldDirection(dir);
        dir.normalize();
        dir.multiplyScalar(-this._ocameraDistan);

        var pos = new THREE.Vector3();
        pos.add(center);
        pos.add(dir);
        /*
        console.log+= move.x;
        this._camera.right += move.x;

        this._camera.top += move.y;
        this._camera.bottom += move.y;
        */

        this._camera.position.set(pos.x, pos.y, pos.z);
        this._camera.zoom = zoom;
        this._controls.target.set(center.x, center.y, center.z);
        this._controls.update();

        this._controls.saveState();
        this._controls.zoom0 = zoom;
        this._controls.reset();

        rayLog(3,"new cam near :" + this._cameraO.near+"   far:" +  this._cameraO.far);
        rayLog(3,"new zoom:" + this._cameraO.zoom);
        rayLog(3,"new box :" + this._cameraO.left + "  "+this._cameraO.top + "   " +  this._cameraO.right + "  "+this._cameraO.bottom );

    }


    /**
    * 카메라를 local 좌표계의 y축을 중심으로 회전시킨다. 
    * @param {Number} delta 회전 시킬 delta time
    */
    doCameraRotate(delta, axis = 0) {
        // up vector 구하기
        // 회전 quaternion구하고 matrix구하기
        // 

        let forward = new THREE.Vector3(0, 0, 1);
        let up = new THREE.Vector3(0, 1, 0);
        let right = new THREE.Vector3(1, 0, 0);



        if (axis == 1) {
            up = right;
        } else if (axis == 2) {
            up = forward;
        }

        var pos = this._camera.position.clone();
        var center = this._controls.target.clone();
        var quaternion = new THREE.Quaternion();

        pos.sub(center);
        pos.applyQuaternion(quaternion.setFromAxisAngle(up, delta));
        pos.add(center);

        this._camera.position.set(pos.x, pos.y, pos.z);
        this._controls.target.set(center.x, center.y, center.z);
        this._controls.update();
    }

    autofit3DOrthoCameraBBox(bounding_box, min_dist) {

        var bbox = bounding_box;

        var size = new THREE.Vector3();
        bbox.getSize(size);

        var zoom = size.x;
        if (zoom < size.y)
            zoom = size.y;
        if (zoom < size.z)
            zoom = size.z;

        zoom = 1 / zoom * 150;


        var center = new THREE.Vector3();
        bbox.getCenter(center);

        var r = size.length();

        this._ocameraDistance = r * 1.5;

        var dir = new THREE.Vector3();

        this._cameraO.getWorldDirection(dir);
        dir.normalize();
        dir.multiplyScalar(-this._ocameraDistance);

        var pos = new THREE.Vector3();
        pos.add(center);
        pos.add(dir);


        //this._camera.position.set(-0.97,1.59,-8.76);
        //this._controls.update();

        this._cameraZoomO = zoom;

        this._cameraO.position.set(pos.x, pos.y, pos.z);
        this._cameraO.zoom = zoom;

        this._controls.position0.set(pos.x, pos.y, pos.z);
        this._controls.target0.set(center.x, center.y, center.z);
        this._controls.zoom0 = zoom;
        this._controls.reset();

    }

    /**
    * Orthographic camera를 사용하여 obj_list들 모두가 잘 보이도록 설정한다. 
    * @param {Array} obj_list 화면에 보일 Three.js Mesh들의 array
    * @param {Number} min_dist 카메라의 최소 거리
    */
    autofit3DOrthoCameraObjList(obj_list) {

        var bbox = new THREE.Box3();

        const len = obj_list.length;
        for (var i = 0; i < len; i++) {
            var obj = obj_list[i];
            bbox.expandByObject(obj);
        }

        this.autofit3DOrthoCameraBBox(bbox);

    }

    /**
     * Orthographic camera를 사용하여 point_list에 포함된 점들 모두가 잘 보이도록 설정한다.
     * @param {Array} point_list 화면에 보일 Point들의 array
     */
    autofit3DOrthoCameraPointList(point_list) {

        var bbox = new THREE.Box3();

        const len = point_list.length;
        for (var i = 0; i < len; i++) {
            bbox.expandByPoint(point_list[i]);
        }

        this.autofit3DOrthoCameraBBox(bbox);


    }

    /**
     * 카메라를 bounding box 의 영역에 맞춘다.
     * @param {THREE.Box} bounding_box bounding box
     * @param {Number} min_dist 카메라 최소 거리
     */
    autofitCameraBBox(bounding_box, min_dist) {


        var bbox = bounding_box;

        var center = new THREE.Vector3();
        bbox.getCenter(center);
        var size = new THREE.Vector3();
        bbox.getSize(size);

        var r = size.length();

        let vfov = this._camera.fov;
        let hfov = this._camera.fov * this._windowWidth / this._windowHeight;


        var vdist = -r / Math.tan(vfov * Math.PI / 180) * 0.95;
        var hdist = -r / Math.tan(hfov * Math.PI / 180) * 0.95;

        var dist = hdist;
        if (vdist < hdist) {
            dist = vdist;
        }

        if (min_dist) {
            if (dist > -min_dist)
                dist = -min_dist;
        }

        var dir = new THREE.Vector3();

        this._camera.getWorldDirection(dir);
        dir.normalize();
        dir.multiplyScalar(dist);

        var pos = new THREE.Vector3();
        pos.add(center);
        pos.add(dir);


        //this._camera.position.set(-0.97,1.59,-8.76);
        //this._controls.update();


        this._camera.position.set(pos.x, pos.y, pos.z);
        this._controls.target.set(center.x, center.y, center.z);
        this._controls.update();

    }


    /**
    * Perspective camera를 사용하여 obj_list들 모두가 잘 보이도록 설정한다.
    * @param {Array} obj_list 화면에 보일 Three.js Mesh들의 array
    * @param {Number} min_dist 카메라의 최소 거리
    */
    autofitCameraObjList(obj_list, min_dist) {

        if (this._isOrthoCamera) {
            this.autofit3DOrthoCameraObjList(obj_list, min_dist);
            return;
        }

        var bbox = new THREE.Box3();
        
        const len = obj_list.length;
        for (var i = 0; i < len; i++) {
            var obj = obj_list[i];
            bbox.expandByObject(obj);
        }

        this.autofitCameraBBox(bbox, min_dist);


    }

    /**
     * Perspective camera를 사용하여 point_list에 포함된 점들 모두가 잘 보이도록 설정한다.
     * @param {Array} point_list 화면에 보일 Point들의 array
     * @param {any} min_dist 카메라의 최소 거리
     */
    autofitCameraPointList(point_list, min_dist) {

        if (this._isOrthoCamera) {
            this.autofit3DOrthoCameraPointList(point_list, min_dist);
            return;
        }

        var bbox = new THREE.Box3();

        const len = point_list.length;
        for (var i = 0; i < len; i++) {
            bbox.expandByPoint(point_list[i]);
        }

        this.autofitCameraBBox(bbox, min_dist);

    }


    /**
    * 카메라가 분자를 다 볼 수 있도록 분자의 위치를 계산한다.
    * @param {Three.Mesh} obj 화면에 보일 Three.js Mesh
    */
    autofitCamera(obj) {
        var obj_list = [obj];
        if (this._isOrthoCamera) {
            return this.autofitOrthoCamera(obj);
            //this.autofit3DOrthoCameraObjList(obj_list);
        } else {
            return this.autofitCameraObjList(obj_list, 0.1);
        }
    }


    /**
    * 윈도우 크기가 변경되었을 때 필요한 처리를 한다.
    * @param {Number} innerWidth - 윈도우 width
    * @param {Number} innerHeight - 윈도우 height
    */
    onWindowResize(width, height) {


        //console.log(this._camera);
        //console.log(this._renderer);

        //var width = document.getElementById(this._appname + "_rbase").clientWidth;
        //var height = document.getElementById(this._appname + "_rbase").clientHeight;
        //var width = this._div.clientWidth;
        //var height = this._div.clientHeight;

        //this._container.style.width = width + "px";
        //this._container.style.height = height + "px";

        if (this._camera) {
            if (this._is2DOrthoCamera || this._isOrthoCamera) {
                var aspect = width / height;
                var ch = this._cameraOrthoTop - this._cameraOrthoBottom;

                this._camera.left = -aspect * ch / 2;
                this._camera.right = aspect * ch / 2;
                this._camera.bottom = -ch / 2;
                this._camera.top = ch / 2;
                this._camera.updateProjectionMatrix();
                this._camera.updateMatrix();
                this._camera.updateMatrixWorld(true);
            } else {
                this._camera.aspect = width / height;
                this._camera.updateProjectionMatrix();
                this._camera.updateMatrix();
                this._camera.updateMatrixWorld(true);
            }
        }

        if (this._controls) {
            //this._controls.handleResize();
            this._controls.update();
        }

        this._renderer.setSize(width, height);
        this._windowWidth = width;
        this._windowHeight = height;

        this._effectComposer.setSize(width, height);

        //this.setResizeUI(innerWidth, innerHeight);
        
    }


    /**
    * 렌더러를 사용하여 한 프레임을 렌더링 한다. 주로 렌더 화면을 export할 때 사용한다. 
    * @param {Renderer} orenderer 렌더링에 사용될 Renderer클래스
    */
    renderFrameFromOtherRenderer(orenderer) {
        this._renderer.clear();
        this._renderer.render(orenderer._scene, orenderer._camera);
    }

    /**
    * 현재 렌더링 된 화면을 이미지로 추출하여 저장한다.
    * @param {String} filename 저장할 파일 이름
    */
    saveScreenshot(filename) {
        var dataURL = this._renderer.domElement.toDataURL();

        //var data = dataURL.replace(strMime, strDownloadMime);

        var link = document.createElement('a');
        if (typeof link.download === 'string') {
            document.body.appendChild(link); //Firefox requires the link to be in the body
            link.download = filename;
            link.href = dataURL;
            link.click();
            document.body.removeChild(link); //remove the link when done
        } else {
            location.replace(uri);
        }
    }

    /**
    * 렌더 버퍼에 사용될 렌더 타켓  WebGLRenderTarget 을 생성한다.
    * @param {Number} width RenderTarget의 width
    * @param {Number} height RenderTarget의 height
    * @returns 생성된 WebGLRenderTarget
    */
    createRenderTarget(width, height) {
        var bufferTexture = new THREE.WebGLRenderTarget(width, height, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter });
        return bufferTexture;
    }

    /**
    * WebGLRenderTarget 버퍼를 삭제한다. 
    * @param {Three.WebGLRenderTarget} texture 삭제할 버퍼
    */
    deleteRenderTarget(texture) {
        texture.dispose();
    }

    /**
    * 파라메터로 받은 버퍼 텍스쳐에 렌더링한다. 
    * @param {Three.WebGLRenderTarget} texture 렌더링에 사용될 버퍼 텍스쳐
    */
    renderToTexture(texture) {
        this._renderer.render(Renderer.I._scene, Renderer.I._camera, texture);
    }

    /**
    * 물체를 피킹 하는 함수
    * @param {Array} normalizedPosition 좌표 : ([-1,1], [-1,1]) 좌표계, y축 반전임.
    * @returns 피킹된 Three.js Mesh 클래스를 리턴
    */
    pickObject(normalizedPosition) {
        this._raycaster.setFromCamera(normalizedPosition, this._camera);
        this._intersectedObjects = this._raycaster.intersectObjects(this._scene.children, true);
        this._pickedObject = null;

        for (var i = 0; i < this._intersectedObjects.length; i++) {
            var obj = this._intersectedObjects[i].object;
            if (!this.isObjVisible(obj))
                continue;

            if (obj._canPick) {
                this._pickedObject = obj;
                return obj;
            }
        }

        return null;
    }

    /**
    * 물체를 피킹 하는 함수. 메쉬의 피킹 가능 여부를 비교하지 않고 모든 물체를 비교한다. 
    * @param {Array} normalizedPosition 좌표 : ([-1,1], [-1,1]) 좌표계, y축 반전임.
    * @returns 피킹된 Three.js Mesh 클래스를 리턴
    */
    pickObjectAny(normalizedPosition) {

        this._raycaster.setFromCamera(normalizedPosition, this._camera);
        this._intersectedObjects = this._raycaster.intersectObjects(this._scene.children, true);
        this._pickedObject = null;

        for (var i = 0; i < this._intersectedObjects.length; i++) {
            var obj = this._intersectedObjects[i].object;
            if (!this.isObjVisible(obj))
                continue;

            this._pickedObject = obj;
            return obj;
        }

        return null;
    }

    /**
    * 단백질의 아톰 메쉬를 피킹 하는 함수
    * @param {Array} normalizedPosition 좌표 : ([-1,1], [-1,1]) 좌표계, y축 반전임.
    * @returns 피킹된 Three.js Mesh 클래스를 리턴
    */
    pickObjectAtom(normalizedPosition) {

        this._raycaster.setFromCamera(normalizedPosition, this._camera);
        this._intersectedObjects = this._raycaster.intersectObjects(this._scene.children, true);
        this._pickedObject = null;

        for (var i = 0; i < this._intersectedObjects.length; i++) {
            var obj = this._intersectedObjects[i].object;
            if (!this.isObjVisible(obj))
                continue;

            if (!obj._isAtom && !obj._instancedAtom)
                continue;

            this._pickedObject = obj;

            var paObj = {};
            paObj._obj = obj;
            paObj._PVID = obj._PVID;
            paObj._symmIdx = obj._symmIdx;
            if (obj._instancedAtom) {
                paObj._instancedAtom = true;
                paObj._instanceId = this._intersectedObjects[i].instanceId;
                paObj._iatom = obj._iprotein.getIAtomWithIndex(paObj._instanceId);

                let pos = paObj._iatom.getWorldPosition();
                console.log("intersection idx : " + paObj._instanceId );
                console.log("intersection point : " + this._intersectedObjects[i].point.x + "," + this._intersectedObjects[i].point.y + "," + this._intersectedObjects[i].point.z);
                console.log("atom point : " + pos.x + "," + pos.y + "," + pos.z);

            } else {
                paObj._instancedAtom = false;
                paObj._iatom = obj._iatom;
            }

            return paObj;
        }

        return null;
    }

    /**
    * CAD 물체를 피킹 하는 함수
    * @param {Array} normalizedPosition 좌표 : ([-1,1], [-1,1]) 좌표계, y축 반전임.
    * @returns 피킹된 Three.js Mesh 클래스를 리턴
    */
    pickObjectCAD(normalizedPosition, group) {
        this._raycaster.setFromCamera(normalizedPosition, this._camera);

        let borigin = this._raycaster.ray.origin.clone().sub(this._raycaster.ray.direction.clone().multiplyScalar(1000));
        this._raycaster.ray.origin = borigin;

        this._intersectedObjects = this._raycaster.intersectObjects(group.children, true);
        this._pickedObject = null;

        for (var i = 0; i < this._intersectedObjects.length; i++) {
            var obj = this._intersectedObjects[i].object;
            if (!this.isObjVisible(obj))
                continue;

            if (obj._canPick) {
                this._pickedObject = obj;
                return obj;
            }

        }

        return null;
    }

    /**
    * 물체를 피킹 하는 함수
    * @param {Array} normalizedPosition 좌표 : ([-1,1], [-1,1]) 좌표계, y축 반전임.
    * @returns 피킹된 Three.js Mesh 클래스를 리턴
    */
    pickObjectPosition(normalizedPosition) {
        this._raycaster.setFromCamera(normalizedPosition, this._camera);
        this._intersectedObjects = this._raycaster.intersectObjects(this._scene.children, true);
        this._pickedObject = null;

        for (var i = 0; i < this._intersectedObjects.length; i++) {
            var obj = this._intersectedObjects[i].object;
            if (!this.isObjVisible(obj))
                continue;

            if (obj._canPick) {
                let pos = this._intersectedObjects[i].point;
                //rayLog(3, "pick obj id " + obj._id + " on pos " + pos.x + "," + pos.y + "," + pos.z);
                return pos;
            }
        }

        //rayLog(3, "no pick obj pos " + Date.now());
        return null;
    }


    /**
     * Crystal Shape Face를 피킹 하는 함수.
     * @param {Array} normalizedPosition 좌표 : ([-1,1], [-1,1]) 좌표계, y축 반전임.
     * @returns 피킹된 Three.js Face 클래스를 리턴
     */
    pickObjectCrystalFace(normalizedPosition) {

        this._raycaster.setFromCamera(normalizedPosition, this._camera);
        this._intersectedObjects = this._raycaster.intersectObjects(this._scene.children, true);
        this._pickedObject = null;

        for (var i = 0; i < this._intersectedObjects.length; i++) {
            var obj = this._intersectedObjects[i].object;
            if (!this.isObjVisible(obj))
                continue;

            if (obj._crystalFace) {

                let face = this._intersectedObjects[i].face;
                let posarr = obj.geometry.attributes.position.array;

                let v1 = new THREE.Vector3(posarr[3 * face.a], posarr[3 * face.a + 1], posarr[3 * face.a + 2]);
                let v2 = new THREE.Vector3(posarr[3 * face.b], posarr[3 * face.b + 1], posarr[3 * face.b + 2]);
                let v3 = new THREE.Vector3(posarr[3 * face.c], posarr[3 * face.c + 1], posarr[3 * face.c + 2]);

                let mp = v1.clone().add(v2).add(v3).multiplyScalar(1.0 / 3.0);

                face.v1 = v1;
                face.v2 = v2;
                face.v3 = v3;
                face.midpoint = mp;

                return face;

            }
        }

        return null;
    }


    /**
    * 주어진 Mesh가 visible한지 판단한다. 
    * @param {Three.Mesh} obj Three.js Mesh
    * @returns 가시화 여부
    */
    isObjVisible(obj) {
        if (!obj)
            return true;

        if (!obj.visible) {
            return false;
        }

        return this.isObjVisible(obj.parent);
    }

    /**
     * Axis 표시 뷰포트 영역을 설정한다.
     * @param {Number} x 뷰포트 영역 x값
     * @param {Number} y 뷰포트 영역 y값
     * @param {Number} z 뷰포트 영역 z값
     * @param {Number} w 뷰포트 영역 w값
     */
    setAxisViewportPosition(x, y, z, w) {
        if (this._axisGeom) {
            this._axisGeom.setViewportPosition(x, y, z, w);
        }
    }


    /**
     * 
     * */
    createCameraCubeGeom() {

        if (this._cubeGeom) {
            this._scene2.remove(this._cubeGeom._cube);
            this._cubeGeom = null;
        }

        this._cubeGeom = new CameraCubeGeom(this);
        this._cubeGeom.createMesh();
    }


};
