import * as THREE from '../build/three.module.js';


var __camera_cookie_list = [];

/**
 * 카메라 정의(위치, 회전 등의 정보)를 Save & Load하는 클래스
 * */
export class CameraDef {

    // 실제 쿠키에 저장, 로드하는 과정을 추가하기
    /**
     * 카메라 저장값 초기화
     * */
    static resetCookie() {
        var c = document.cookie.split("; ");
        for (let i in c) 
         document.cookie =/^[^=]+/.exec(c[i])[0]+"=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
        
        __camera_cookie_list = [];
    }

    /**
     * index에 카메라 정의를 저장
     * @param {String} index 저장하고자 하는 위치
     * @param {CameraDef} camera_def 카메라 정의
     */
    static setCookie(index, camera_def) {
        let expiredays = 365, expires; 
        let date = new Date();

        __camera_cookie_list[index] = camera_def;
        date.setTime(date.getTime() + expiredays * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toGMTString(); 
        document.cookie = index + "=" + escape(camera_def.toString()) + expires + "; path=/";
    }
    
    

    
    
    /**
     *name에 해당하는 카메라 정보를 가져온다
     * @param {String} name 파라메터 이름
     * @returns {String} 데이터
     */
    static getCookie(key) {
        var result = null;
        var cookie = document.cookie.split(';');
        cookie.some(function (item) {
            // 공백을 제거
            item = item.replace(' ', '');
     
            var dic = item.split('=');
     
            if (key === dic[0]) {
                result = dic[1];
                return true;    // break;
            }
        });
        return result;
    }

    /**
     * 저장된 모든 카메라 정보를 가져온다
     * @returns {String} 데이터
     * */
    static getCookies(){
        __camera_cookie_list = {};
        let c = document.cookie.split(';');

        if(c.toString() === "")
            return null;
            
        c.some(function (item) {
            item = item.replace(' ', '');
            let dic = item.split('=');

            __camera_cookie_list[dic[0]] = dic[1];
        });
        return __camera_cookie_list;
      }

    /**
     * 카메라 속성에 들어가게 될 기본값
     * */
    constructor() {
        this._position = new THREE.Vector3(); // position
        this._target = new THREE.Vector3(); // rotation quaternion
        this._fov = 60; // field of view 
        this._type = 0; // perspective : 0 or orthogonal : 1
    }


    // Three.js Camera 에서 데이터 받아오기
    /**
     * perspective 카메라로부터 데이터를 복사한다
     * 
     * @param {THREE.Camera} camera 카메라 참조
     * @param {THREE.CameraControl} camera 카메라 컨트롤 참조
     */
    copyFromPerspective(camera, control) {
        this._position =camera.position.clone();
        this._target = control.target.clone();
        this._fov = camera.fov;
        this._type = 0;
    }

    // Three.js Camera 로 데이터 복사
    /**
     * 현재 카메라를 인자로 받은 perspective 카메라에 복사한다
     * @param {THREE.Camera} camera 카메라 참조
     * @param {THREE.CameraControl} camera 카메라 컨트롤 참조
     */
    copyToPerspective(camera, control) {
        camera.position.set(this._position.x, this._position.y, this._position.z);
        control.target.set(this._target.x, this._target.y, this._target.z);

        camera.fov = this._fov;

        control.update();
    }

    // Three.js Camera 에서 데이터 받아오기
    /**
     * orthogonal 카메라를 현재 카메라에 복사한다
     * @param {THREE.Camera} camera 카메라 참조
     * @param {THREE.CameraControl} camera 카메라 컨트롤 참조
     */
    copyFromOrthogonal(camera, control) {
        this._position = camera.position.clone();
        this._target = control.target.clone();
        this._fov = camera.fov;
        this._type = 1;
    }

    // Three.js Camera 로 데이터 복사
    /**
     * 현재 카메라를 인자로 받은 orthogonal 카메라에 복사한다
     * @param {THREE.Camera} camera 카메라 참조
     * @param {THREE.CameraControl} camera 카메라 컨트롤 참조
     */
    copyToOrthogonal(camera, control) {
        camera.position.set(this._position.x, this._position.y, this._position.z);
        control.target.set(this._target);
        camera.fov = this._fov;
        control.update();
    }

    // comma 구분자로 type, pos x,y,z, rot x,y,z, fov
    /**
     * 현재 카메라의 정보를 문자열로 나타낸다
     * @returns {String} 카메라 정보 문자열
     * */
    toString() {
        return this._type.toString() + "/" + this._position.x.toString() + "," + this._position.y.toString() + "," + this._position.z.toString() + "/" 
        + this._target.x.toString() + "," + this._target.y.toString() + "," + this._target.z.toString() + "/" + this._fov.toString();
    }

    // data로부터 다시 카메라 복원
    /**
     * 데이터로부터 카메라 정보를 복원한다 (속성, 위치, 회전 등)
     * 
     * @param {String} data 카메라 정보 문자열
     * @returns {CameraDef} 복원한 카메라 정보
     */
    static fromString(data) {

        let camDef = new CameraDef();
        if(typeof(data) == 'string'){
            const token = data.split('/');
            camDef._type = Number(token[0]);

            // cookie의 경우 '%2C'을 split delimiter로 사용한다
            let pos = token[1].split(',');
            if(pos.length === 3){
                camDef._position.x = Number(pos[0]);
                camDef._position.y = Number(pos[1]);
                camDef._position.z = Number(pos[2]);
            }

            let rot = token[2].split(',');
            if(rot.length === 3){
                camDef._target.x = Number(rot[0]);
                camDef._target.y = Number(rot[1]);
                camDef._target.z = Number(rot[2]);
            }

            camDef._fov = Number(token[3]);
        }
        return camDef;
    }
}