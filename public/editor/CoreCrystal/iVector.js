import * as THREE from '../build/three.module.js';
import { Vector3 } from '../Math/Vector3.js';
import { GeomMole } from '../Renderer/GeomMole.js';
import { CStructure } from './CStructure.js';


var geom1 = new THREE.CylinderBufferGeometry(1, 1, 1, 32);
var geom2 = new THREE.ConeGeometry(1, 1, 32);

/**
 * Instanced Vector 클래스
 * */
export class iVector {

    /**
     * 생성자
     * iAtom과 tVector에 매칭되는 iVector를 생성한다.
     * @param {any} tvector
     * @param {any} iatom
     * @param {any} cs
     */
    constructor(tvector, iatom, cs) {


        this._number = 0;

        this._iatom = iatom;

        this._parent = null;


        this._tvector = tvector;


        this._number = 0;
    }   



    /**
     * iVector mesh를 생성한다.
     * @param {CStructure} cs
     * @returns {THREE.Mesh} 생성된 iVector Mesh
     */
    generateMesh(cs) {

        let color = new THREE.Color();
        color.fromArray(this._tvector._color, 0);


        let v1 = new THREE.Vector3();
        v1.fromArray(this._tvector._vector , 0);
        v1 = cs._unitcell._axis.transform(v1);


        let mat = new THREE.MeshLambertMaterial({
            color: color,
            transparent: false,
            vertexColors: false,
        });

        let mesh = new THREE.Group();

        const len = v1.length();
        let mesh1 = new THREE.Mesh(geom1, mat);
        mesh1.scale.fromArray([this._tvector._radius, len * 2, this._tvector._radius], 0);
        mesh.add(mesh1);
        
        let mesh2 = new THREE.Mesh(geom2, mat);
        mesh.add(mesh2);

        let radius = this._tvector._radius*3;
        mesh2.scale.fromArray([radius, radius, radius  ], 0);
        mesh2.position.fromArray([0,len ,0],0);

        mesh.lookAt(v1);
        mesh.position.copy(this._iatom._position2);

        return mesh;
    }

    /**
     * 주어진 iVector를 복사한다.
     * @param {iVector} iVector 복사하려는 iVector
     * @returns {iVector} this
     */
    cloneFromiVector(iVector) {
        Object.assign(this, iVector);
        //this._vector = new THREE.Vector3(this._vector.x, this._vector.y, this._vector.z);
        //this._color = new THREE.Color(this._color.x, this._color.y, this._color.z);

        return this;
    }

}