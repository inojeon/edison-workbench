import * as THREE from '../build/three.module.js';
import { ImprovedNoise } from './jsm/math/ImprovedNoise.js';

/**
 * Volume 렌더링 텍스쳐 오브젝트 클래스
 * */
export class VolumeTexture{

    /**
     * 클래스 생성자
     * */
    constructor(){
    }

    /**
     * 샘플 텍스쳐를 생성한다.
     * */
    setSample1() {
        const size = 128;
        const data = new Uint8Array(size * size * size);

        let i = 0;
        const scale = 0.05;
        const perlin = new ImprovedNoise();
        const vector = new THREE.Vector3();

        for (let z = 0; z < size; z++) {

            for (let y = 0; y < size; y++) {

                for (let x = 0; x < size; x++) {

                    const d = 1.0 - vector.set(x, y, z).subScalar(size / 2).divideScalar(size).length();
                    data[i] = (128 + 128 * perlin.noise(x * scale / 1.5, y * scale, z * scale / 1.5)) * d * d;
                    i++;

                }

            }
        }

        this.setData(data, size, size, size);
    }

    /**
     * Value 배열 데이터를 사용하여 Volume 텍스쳐를 생성한다.
     * @param {Array} array 데이터 배열
     * @param {Number} dx x 크기
     * @param {Number} dy y 크기
     * @param {Number} dz z 크기
     */
    setData(array, dx, dy, dz) {
        if (this._texture) {
            this.dispose();
        }

        this._dx = dx;
        this._dy = dy;
        this._dz = dz;

        let texture = new THREE.DataTexture3D(array, dx, dy, dz);
        texture.format = THREE.RedFormat;
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.unpackAlignment = 1;

        this._texture = texture;
    }

    /**
     * 그래픽 리소스를 반환한다.
     * */
    dispose() {

    }

    /**
     * 텍스쳐를 반환한다.
     * @returns {THREE.Texture} 텍스쳐
     * */
    get() {
        return this._texture;
    }
}