import * as THREE from '../build/three.module.js';

/**
 * instanced mesh 클래스
 * */
export class InstancedMesh {

    /**
     * 생성자
     * */
    constructor() {
        this._colors = [];
        this._matrices = [];
        this._count = 0;
    }

    /**
     * color와 matrix를 추가한다.
     * @param {Array} color rgb 색상값
     * @param {THREE.Matrix4} matrix matrix
     */
    add(color, matrix) {
        this._colors.push(new THREE.Color(color[0], color[1], color[2]));
        this._matrices.push(matrix);
        this._count++;
    }

    /**
     * instanced mesh를 생성한다
     * @param {THREE.BufferGeometry} geometry
     * @param {THREE.Material} material
     */
    generate(geometry, material) {
        if (!this._mesh) {

-
            let mesh = THREE.InstancedMesh(geometry, material, this._count);

            for (let i = 0; i < this._count; i++) {
                mesh.setColorAt(i, this._colors[i]);
                mesh.setMatrixAt(i, this._matrix[i]);
            }

            this._mesh = mesh;
        }

        return this._mesh;
    }

}