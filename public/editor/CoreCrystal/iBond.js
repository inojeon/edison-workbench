import * as THREE from '../build/three.module.js';
import { GeomMole } from '../Renderer/GeomMole.js';

/**
 * Instance Bond 클래스
 * */
export class iBond {

    /**
     * 생성자
     * atom1과 atom2를 연결하는 bond를 생성한다.
     * @param {iAtom} atom1 결합의 첫번째 원소
     * @param {iAtom} atom2 결합의 두번째 원소
     * @param {cBond} bond cBond
     */
    constructor(atom1,atom2,bond) {
        this._a1 = atom1; // iAtom
        this._a2 = atom2; // iAtom
        this._def = bond;
        //this._geom = null;
        this._meshes = null;
        this._visible = true;

        this._selected = false;
    }


    select(select) {
        this._selected = select;

        if (this._meshes) {
            if (select) {
                this._mat1[0].color.fromArray([1,0,0], 0);
                this._mat1[1].color.fromArray([1, 0, 0], 0);

                this._mat2[0].color.fromArray([1, 0, 0], 0);
                this._mat2[1].color.fromArray([1, 0, 0], 0);
            } else {

                this._mat1[0].color.copy(this._a1._mat1.color);
                this._mat1[1].color.copy(this._a2._mat1.color);

                this._mat2[0].color.copy(this._a1._mat1.color);
                this._mat2[1].color.copy(this._a2._mat1.color);

            }
        }
    }

    /**
     * bond의 첫번째 원소와 두번째 원소를 설정한다.
     * @param {iAtom} atom1 결합의 첫번째 원소
     * @param {iAtom} atom2 결합의 두번째 원소
     */
    setAtom(atom1, atom2) {
        this._a1 = atom1;
        this._a2 = atom2;
    }

    /**
     * cBond를 설정한다.
     * @param {cBond} bond iBond의 정의, cBond
     */
    setBond(bond) {
        this._def = bond;
    }

    /**
     * iBond의 메쉬를 반환한다.
     * @returns {Array}
     * */
    getMesh() {
        return this._meshes;
    }

    /**
     * wireframe 여부를 설정한다.
     * @param {Boolean} w wireframe 여부
     */
    setWireframe(w) {
        if (!this._meshes)
            return;

        for (let i = 0; i < this._meshes.length; i++) {
            this._meshes[i].material.wireframe = w;
        }        
    }


    /**
     * bond의 radius를 설정한다.
     * @param {Number} radius bond의 반지름
     */
    setRadius(radius) {

        this._radius = radius;

        if (!this._meshes)
            return;

        for (let i = 0; i < this._meshes.length; i++) {
            let len = this._meshes[i].scale.z;
            this._meshes[i].scale.set(radius, radius, len);
        }
    }

    setShininess(value) {
        if (this._mat1) {
            this._mat1[0].shininess = value;
            this._mat1[1].shininess = value;

            this._mat2[0].shininess = value;
            this._mat2[1].shininess = value;
        }
    }


    /**
     * material 타입을 설정한다.
     * @param {Number} type material type 옵션
     */
    setMaterialType(type) {
        if (!this._meshes)
            return;

        switch (type) {
            case 0:
                this._meshes[0].material = this._mat1[0];
                this._meshes[1].material = this._mat1[1];
                break;
            case 1:
                this._meshes[0].material = this._mat2[0];
                this._meshes[1].material = this._mat2[1];
                break;
        }
    }

    /**
     * iBond를 생성한다.
     * @param {CStructure} cs
     * @returns {Array} Mesh 배열
     */
    generate(cs) {

        if (!this._visible)
            return;

        let atomdefA = this._a1._def._def;
        let atomdefB = this._a2._def._def;

        let posA = new THREE.Vector3(this._a1._position2.x, this._a1._position2.y, this._a1._position2.z);
        let posB = new THREE.Vector3(this._a2._position2.x, this._a2._position2.y, this._a2._position2.z);

        this._radius = 0.07;

        this._mat1 = [];
        this._mat1[0] = new THREE.MeshBasicMaterial({
            color: 0x0000ff,
        });

        this._mat1[1] = new THREE.MeshBasicMaterial({
            color: 0x0000ff,
        });

        this._mat1[0].color.copy(this._a1._mat1.color);
        this._mat1[1].color.copy(this._a2._mat1.color);

        this._mat2 = [];
        this._mat2[0] = new THREE.MeshPhongMaterial({
            color: 0x0000ff,
            vertexColors: false,
            shininess: 30,
        });
        this._mat2[1] = new THREE.MeshPhongMaterial({
            color: 0x0000ff,
            vertexColors: false,
            shininess: 30,
        });

        this._mat2[0].color.copy(this._a1._mat1.color);
        this._mat2[1].color.copy(this._a2._mat1.color);

        let mats = null;

        switch (cs._RObond) {
            case 0:
                mats = this._mat1;
                break;
            case 1:
                mats = this._mat2;
                break;
        }


        this._meshes = GeomMole.createBondMesh(posA, posB, atomdefA, atomdefB, false, 0, this._radius, mats);
        this._meshes[0].name = "bond0";
        this._meshes[0]._ibond = this;
        this._meshes[0]._canPick = true;
        this._meshes[1].name = "bond1";
        this._meshes[1]._ibond = this;
        this._meshes[1]._canPick = true;

        return this._meshes;
    }

    /**
     * 가시화 여부를 설정한다.
     * @param {Boolean} visible mesh 가시화 여부
     */
    setVisible(visible) {

        this._visible = visible;

        if (!this._meshes)
            return;

        this._meshes[0].visible = visible;
        this._meshes[1].visible = visible;
    }

    /**
     * 주어진 iBond를 복사한다. 
     * @param {iBond} iBond 복사할 iBond
     */
    cloneFromBond(iBond) {
        Object.assign(this, iBond);
        this.generate();
    }
}