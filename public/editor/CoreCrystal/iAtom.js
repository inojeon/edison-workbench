import * as THREE from '../build/three.module.js';
import { Vector3 } from '../Math/Vector3.js';
import { GeomMole } from '../Renderer/GeomMole.js';
import { BufferGeometryUtils } from '../Renderer/jsm/utils/BufferGeometryUtils.js';
import { LatticeAxis } from './LatticeAxis.js';
import { rayLog } from '../Renderer/log.js';
import { CStructure } from './CStructure.js';


var _dotSurfaceGeom = null;

/**
 * Instanced Atom 클래스
 * */
export class iAtom {

    /**
     * 초기화
     * */
    static init() {

        if (_dotSurfaceGeom)
            return;

        const r = 1;
        const bsize = 0.02;
        _dotSurfaceGeom = new THREE.BoxGeometry(bsize, bsize, bsize);
        _dotSurfaceGeom.translate(0, r, 0);

        const pi = 3.1415927;
        const pi2 = 3.1415927 * 2;

        const delta = pi / 20;

        let x;
        let y;
        let z;
        let geom;
        let geoms = [];
        for (let s = 0; s < pi2; s += delta) {
            for (let t = 0; t < pi; t += delta) {

                x = r * Math.cos(s) * Math.sin(t);
                y = r * Math.sin(s) * Math.sin(t);
                z = r * Math.cos(t);

                geom = new THREE.BoxGeometry(bsize, bsize, bsize);
                geom.translate(x, y, z);

                geoms.push(geom);
            }
        }

        _dotSurfaceGeom = BufferGeometryUtils.mergeBufferGeometries(geoms);

    }

    /**
     * 주어진 iAtom과의 거리를 구한다.
     * @param {iAtom} iatom
     * @returns {Number} position과 iatom과의 거리
     */
    distance(iatom) {
        let pos = this._position.clone();
        pos.sub(iatom._position);
        return pos.length();
    }

    /**
     * unitcell 상에서의 위치와 index를 설정한다.
     * @param {Number} x x 좌표
     * @param {Number} y y 좌표
     * @param {Number} z z 좌표
     * @param {Number} idx index
     */
    setUnitcellLoc(x, y, z, idx) {
        this._unitcellLoc = [x, y, z];

        // catom의 index
        this._index = idx;
    }

    /**
     * 생성자
     * iAtom의 cAtom, position을 설정한다.
     * @param {cAtom} catom iAtom의 definition
     * @param {THREE.Vector3} position iAtom position
     */
    constructor(catom, position) {
        this._def = catom;

        if (position)
            this._position = position.clone(); // three.vector3

        this._mesh = null;
        this._visible = true;
        this._cvisible = true;


        this._exist = true;

        this._vectorMeshes = new THREE.Group();
        this._ivectors = [];

        // catom의 index
        this._index = 0;

        this._selected = false;

        this._canPick = this._visible;
    }

    select(select) {
        this._selected = select;

        if (this._mesh) {
            if (select) {
                this._mesh.material.color.fromArray([1, 0, 0], 0);
            } else {
                this._mesh.material.color.fromArray(this._def._color, 0);
            }
        }
    }

    /**
     * cAtom의 index4cstructure를 반환한다.
     * @returns {Number}
     * */
    getIndex() {
        return this._def._index4cstructure;
    }

    /**
     * iAtom의 mesh를 반환한다.
     * @returns {THREE.Mesh}
     * */
    getMesh() {
        return this._mesh;
    }

    /**
     * vector mesh를 반환한다.
     * @returns {Array} 
     * */
    getVectorMesh() {
        return this._vectorMeshes;
    }

    /**
     * dot surface mesh를 반환한다.
     * @returns {THREE.Mesh}
     * */
    getDotSurface() {
        return this._dotSurfaceMesh;
    }

    /**
     * dot surface mesh 가시화 여부를 설정한다.
     * @param {Boolean} show 가시화 여부
     */
    showDotSurface(show) {
        this._dotSurfaceMesh.visible = show;
    }

    /**
     * iVector를 추가한다.
     * @param {iVector} iv 추가할 iVector
     */
    addiVector(iv) {
        this._ivectors.push(iv);
    }

    /**
     * iVector 메쉬를 생성한다.
     * @param {CStructure} cs
     */
    generateMesh4iVectors(cs) {


        let vectors = this._ivectors;

        if (this._visible) {
            for (let i = 0; i < vectors.length; i++) {
                let iv = vectors[i];
                let vmesh = iv.generateMesh(cs);

                this._vectorMeshes.add(vmesh);
            }
        }

    }

    /**
     * iAtom의 shininess를 설정한다.
     * @param {Number} value shininess
     */
    setShininess(value) {
        if (this._mesh)
            this._mesh.material.shininess = value;
    }

    setMaterialType(type) {
        if (!this._mesh)
            return;

        switch (type) {
            case 0:
                this._mesh.material = this._mat1;
                break;
            case 1:
                this._mesh.material = this._mat2;
                break;
        }
    }

    calcPos2(cs) {

        this._position2 = cs._unitcell._axis.transform(this._position);
    }

    /**
     * iAtom을 생성한다.
     * @param {CStructure} cs
     */
    generate(cs) {

        //this._vectorMeshes.clear();


        this.calcPos2(cs);

        if (!this._visible)
            return;


        this._mat1 = new THREE.MeshBasicMaterial({
            color: 0x0000ff,
        });
        this._mat2 = new THREE.MeshPhongMaterial({
            color: 0x0000ff,
            specular: 0x505050,
            vertexColors: false,
            shininess: 30,
        });


        let mat = null;

        switch (cs._ROatom) {
            case 0:
                mat = this._mat1;
                break;
            case 1:
                mat = this._mat1;
                break;
        }

        this._mesh = GeomMole.createAtomMesh(this._position2, 0.3, this._def._def, mat);
        this._mesh.name = "atom";
        this._mesh._canPick = true;

        this._mat1.color.fromArray(this._def._color,0);
        this._mat2.color.fromArray(this._def._color, 0);

        this._mesh._iatom = this;

        this._ivectors = [];

        let vectors = this._def._avectors;

        for (let i = 0; i < vectors.length; i++) {
            let av = vectors[i];

            let iv = av.generateIVector(this, cs);
            this._ivectors.push(iv);
        }

        let dssize = this._mesh.scale.x * 2;

        this._dotSurfaceMesh = new THREE.Mesh(_dotSurfaceGeom, this._mesh.material);
        this._dotSurfaceMesh.scale.fromArray([dssize, dssize, dssize], 0);
        this._dotSurfaceMesh.position.copy(this._position2);
        this._dotSurfaceMesh.visible = false;

        this.generateMesh4iVectors(cs);

    }

    
    /**
     * iAtom의 radius를 설정한다.
     * @param {Number} radius iAtom 반지름
     */
    setRadius(radius) {
        if (!this._mesh)
            return false;

        this._mesh.scale.set(radius, radius, radius);
    }

    /**
     * cAtom의 정의를 바탕으로 iAtom의 반지름을 설정한다.
     * @param {Number} ratio iAtom radius 비율
     */
    setNormalRadius(ratio) {
        let radius = this._def._def._radius * ratio;
        this.setRadius(radius);

    }

    /**
     * iAtom의 wireframe 여부를 설정한다.
     * @param {Boolean} w wireframe 여부
     * @returns {Boolean} 메쉬가 존재하지 않는 경우 false return 값 발생
     */
    setWireframe(w) {
        if (!this._mesh)
            return false;

        this._mesh.material.wireframe = w;
    }

    /**
     * iAtom 가시화 여부를 반환한다.
     * @returns {Boolean} 메쉬의 가시화 여부 반환
     * */
    getVisible() {
        if (!this._mesh)
            return false;

        return this._mesh.visible;
    }

    /**
     * iAtom 가시화 여부를 설정한다.
     * @param {Boolean} visible 가시화 여부
     */
    setVisible(visible) {
        this._visible = visible;
        this._canPick = this._visible;

        if (!this._mesh)
            return;

        this._mesh.visible = visible;
        this._vectorMeshes.visible = visible;
        this._visible = visible;
    }

    /**
     * 주어진 iAtom을 복사한다.
     * @param {CStructure} cs 재생성할 CStructure
     * @param {iAtom} iAtom 복사할 iAtom
     * @returns {iAtom} 복제한 iAtom
     */
    cloneFromIAtom(cs, iAtom) {
        Object.assign(this, iAtom);
        this._axis = new LatticeAxis(this._axis._a, this._axis._b, this._axis._c, this._axis._la, this._axis._lb, this._axis._lc);
       
        for (let i = 0; i < this._def._ivectors.length; ++i) {
            this._def._ivectors[i] = new iVector().cloneFromiVector(this._def._ivectors[i]);
        }

        for (let i = 0; i < this._def._position.length; ++i) {
            this._def._position[i] = new Vector3(this._def._position[i]._x, this._def._position[i]._y, this._def._position[i]._z);
        }

        this._vectorMeshes = new THREE.Group();
        this.generate(cs);

        return this;
    }

}