import * as THREE from '../build/three.module.js';
import { Vector3 } from '../Math/Vector3.js';
import { LatticeAxis } from './LatticeAxis.js';
import { GeomMole } from '../Renderer/GeomMole.js';
import { cryst } from '../CrystalEditor/crystalVariable.js';

/**
 * Unitcell 클래스
 * */
export class UnitCell {

    /**
     * 생성자
     * */
    constructor() {

        this._system = 0;
        this._spacegroup = 0;
        this._setting = 0;

        if (cryst)
            this._axis = new LatticeAxis(cryst.Unitcell.alpha, cryst.Unitcell.beta, cryst.Unitcell.gamma, cryst.Unitcell.a, cryst.Unitcell.b, cryst.Unitcell.c);
        else
            this._axis = new LatticeAxis(90, 90, 90, 1, 1, 1);

        this._type = 0; // atom number
        this._geom = new kVisLib.api.Group();

        this._mesh = null;
    }

    /**
     * clone method
     * @returns {UnitCell} cloned unitcell
     * */
    clone() {
        let clone = new UnitCell();

        clone._system = this._system;

        clone._spacegroup = this._spacegroup;
        clone._setting = this._setting;

        clone._axis = this._axis.clone();

        clone._type = this._type;

        return clone;
    }

    /**
     * lattice axis 설정
     * @param {Number} a alpha
     * @param {Number} b beta 
     * @param {Number} c gamma
     * @param {Number} la length a
     * @param {Number} lb length b
     * @param {Number} lc length c
     */
    set(a, b, c, la, lb, lc) {
        this._axis.set(a, b, c, la, lb, lc);
    }

    update() {

    }

    /**
     * unitcell transform
     * @param {THREE.Vector3} pos transform vector
     * @returns {THREE.Vector3} transformed position
     */
    transform(pos) {
        let tpos = this._axis.transform(pos);
        return tpos;
    }

    /**
     * unitcell의 line mesh를 생성한다.
     * @param {Number} x1 
     * @param {Number} y1
     * @param {Number} z1
     * @param {Number} x2
     * @param {Number} y2
     * @param {Number} z2
     * @returns {THREE.Mesh} line mesh
     */
    createMesh(x1,y1,z1,x2,y2,z2) {
        const points = [];
        //const p1 = geom.GetPoint(0);
        //const p2 = geom.GetPoint(1);

        let tp = new THREE.Vector3(x1,y1,z1);
        points.push(tp);
        tp = new THREE.Vector3(x2,y2,z2);
        points.push(tp);


        const geometry = new THREE.BufferGeometry().setFromPoints(points);

        var material = new THREE.MeshBasicMaterial({
            color: 0x000000
        });

        const mesh = new THREE.Line(geometry, material);
        mesh._mat = material;

        return mesh;
    }

    /**
     * unitcell geometry를 생성한다.
     * @returns {THREE.Group} 
     * */
    generateGeom() {
        this._geom.Clear();
        let group = new THREE.Group();

        let l1 = null;
                
        l1 = this.createMesh(0, 0, 0, this._axis._va.x, this._axis._va.y, this._axis._va.z);
        group.add(l1);

        l1 = this.createMesh(0, 0, 0, this._axis._vb.x, this._axis._vb.y, this._axis._vb.z);
        group.add(l1);

        l1 = this.createMesh(0, 0, 0, this._axis._vc.x, this._axis._vc.y, this._axis._vc.z);
        group.add(l1);
        

        let p1;
        let p2;

        let ab = this._axis._va.clone().add(this._axis._vb);
        let bc = this._axis._vb.clone().add(this._axis._vc);
        let ca = this._axis._va.clone().add(this._axis._vc);
        let abc = this._axis._va.clone().add(this._axis._vb).add(this._axis._vc);

        p1 = this._axis._va;
        p2 = ab;

        l1 = this.createMesh(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
        group.add(l1);

        
        p1 = this._axis._vb;
        l1 = this.createMesh(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
        group.add(l1);

        p1 = this._axis._vb;
        p2 = bc;
        l1 = this.createMesh(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
        group.add(l1);

        p1 = this._axis._vc;
        l1 = this.createMesh(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
        group.add(l1);

        p1 = this._axis._va;
        p2 = ca;
        l1 = this.createMesh(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
        group.add(l1);

        p1 = this._axis._vc;
        p2 = ca;
        l1 = this.createMesh(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
        group.add(l1);

        
        p1 = ab;
        p2 = abc;
        l1 = this.createMesh(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
        group.add(l1);

        p1 = bc;
        p2 = abc;
        l1 = this.createMesh(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
        group.add(l1);

        p1 = ca;
        p2 = abc;
        l1 = this.createMesh(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
        group.add(l1);


        return group;
    }

    /**
     * geometry 삭제
     * */
    clearGeom() {
        this._geom.Clear();
    }

    /**
     * 주어진 unitcell을 복사한다.
     * @param {UnitCell} unitcell 복사하려는 unitcell
     * @returns {UnitCell} this
     */
    cloneFromUnitcell(unitcell) {
        Object.assign(this, unitcell);

        // axis
        this._axis = new LatticeAxis(this._axis._a, this._axis._b, this._axis._c, this._axis._la, this._axis._lb, this._axis._lc);
        // geom
        this._geom = new kVisLib.api.Group();
        this.generateGeom();

        return this;
    }

    /**
     * unitcell을 저장하려는 형태로 변환한다.
     * @returns {Object}
     * */
    createData4Save() {
        let dat = new UnitCell();

        delete dat._axis._va;
        delete dat._axis._vb;
        delete dat._axis._vc;

        dat._axis._a = this._axis._a;
        dat._axis._b = this._axis._b;
        dat._axis._c = this._axis._c;

        dat._axis._la = this._axis._la;
        dat._axis._lb = this._axis._lb;
        dat._axis._lc = this._axis._lc;


        dat._type = this._type;
        dat._system = this._system;
        dat._setting = this._setting;
        dat._spacegroup = this._spacegroup;
 

        return dat;
    }
}