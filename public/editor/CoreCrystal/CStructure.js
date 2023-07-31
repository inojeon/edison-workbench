import * as THREE from '../build/three.module.js';
import { rayLog } from '../Renderer/log.js';
import { UnitCell } from './UnitCell.js';
import { Boundary } from './Boundary.js';
import { iAtom } from './iAtom.js';
import { iBond } from './iBond.js';
import { CAtom } from './CAtom.js';
import { CBond } from './CBond.js';
import { aVector } from './aVector.js';

import { Polyhedron } from './Polyhedron.js';
import { CrystalShape } from './CrystalShape.js';
import { LatticePlanes } from './LatticePlanes.js';

import { tVector } from './tVector.js';
import * as SYM from './SymmetryMatrix.js';
import { Vector3 } from '../Math/Vector3.js';
import { Plane } from './Plane.js';

const _mdist = 0.00001;

/**
 * Crystal Structure 클래스
 * */
export class CStructure {


    /**
     * 생성자
     * */
    constructor() {
        SYM.initMatrix();

        iAtom.init();

        this._name = "";
        this._position = new Vector3(0, 0, 0);
        this._direction = new Vector3(0, 0, 0);


        this._atoms = [];
        this._bonds = [];
        this._unitcell = new UnitCell();

        this._boundary = new Boundary();

        this._name = "";

        this._tvectors = []; // template. vector 정의
        this._avectors = []; // 한 vector를 어디에 둘지 정의

        
        this._curAtomIdx = -1;
        this._curBondIdx = -1;
        this._curVectorIdx = -1;
        this._curShapeId = -1;


        this._iatomList = [];
        this._ibondList = [];

        this._ivectors = []; // 생성된 ivectors, 한 메쉬를 정의

        // 전체 메쉬 가지고 있슴. 
        this._groupMesh = new THREE.Group();

        // 아톰 메쉬
        this._groupAtomMesh = new THREE.Group();

        // 본드 메쉬
        this._groupBondMesh = new THREE.Group();

        // 기타 : dot surface, crystal shape, 등등
        this._groupEtcMesh = new THREE.Group();

        this._groupMesh.add(this._groupAtomMesh);
        this._groupMesh.add(this._groupBondMesh);
        this._groupMesh.add(this._groupEtcMesh);
        this._groupMesh.name = "CStructure";

        this._clipOption = 0;

        this._crystalPlanes = [];

        this._polyhedron = null;
        this._crystalShape = null;
        this._latticePlaneObj = null;

        this._polyhedronVisible = false;
        this._crystalShapeVisible = true;

        this._latticePlanes = [];

        this._ROatom = 1;
        this._RObond = 0;
    }

    pickiAtom(renderer, normalizedPos) {
        let ia = renderer.pickObject(normalizedPos);
        if (ia) {
            if (ia.name == "atom")
                ia._iatom.select(true);
                return ia._iatom;
        }
        return null;
    }

    pickiBond(renderer, normalizedPos) {
        let ia = renderer.pickObject(normalizedPos);
        if (ia) {
            if (ia.name == "bond0" || ia.name == "bond1")
                ia._ibond.select(true);
                return ia._ibond;
        }
        return null;
    }

    selectiBondRect(renderer, rect) {

        let ret = [];
        const blen = this._ibondList.length;
        for (let ib = 0; ib < blen; ib++) {
            let bond = this._ibondList[ib];
            if (!bond._mesh)
                continue;

            let p2 = renderer.toScreenPosition(bond._mesh);

            if (p2[0] >= rect[0] &&
                p2[0] <= rect[2] &&
                p2[1] <= rect[1] &&
                p2[1] >= rect[3]
            ) {
                ret.push(bond);
                bond.select(true);
            }

        }

        return ret;
    }

    unselectAll() {
        let len = this._iatomList.length;
        let i;
        for (i = 0; i < len; i++) {
            let ia = this._iatomList[i];
            ia.select(false);
        }

        const blen = this._ibondList.length;
        for (let ib = 0; ib < blen; ib++) {
            let bond = this._ibondList[ib];
            bond.select(false);
        }

    }

    // rect = [left,top, right, bottom]
    selectiAtomRect(renderer,rect) {

        let ret = [];
        let len = this._iatomList.length;
        let i;
        for (i = 0; i < len; i++) {
            let ia = this._iatomList[i];
            if (!ia._mesh)
                continue;

            let p2 = renderer.toScreenPosition(ia._mesh);

            if (p2[0] >= rect[0] &&
                p2[0] <= rect[2] &&
                p2[1] <= rect[1] &&
                p2[1] >= rect[3]
            ) {
                ret.push(ia);
                ia.select(true);
            }
        }

        return ret;
    }

    /**
     * atom의 광택 정도를 설정한다.
     * @param {Number} value shininess
     */
    setAtomShininess(value) {

        let len = this._iatomList.length;
        let i;
        for (i = 0; i < len; i++) {
            let ia = this._iatomList[i];
            ia.setShininess(value);
        }

    }

    setBondShininess(value) {

        let len = this._ibondList.length;
        let i;
        for (i = 0; i < len; i++) {
            let ib = this._ibondList[i];
            ib.setShininess(value);
        }

    }

    /**
     * 렌더링 옵션을 설정한다.
     * @param {CrystalEditor} app 
     * @param {Object} options
     */
    setRenderOption(app, options) {
        //this._renderer
        let renderer = app._3dRender._renderer;

        renderer.setBackgroundColor(options.BackgroundColor[0], options.BackgroundColor[1], options.BackgroundColor[2]);

        switch (options.LightingMode) {
            case 1:
                renderer.setLightMode(1);
                break;
            case 2:
                renderer.setLightMode(6);
                break;
            case 3:
                renderer.setLightMode(7);
                break;
        }

        renderer.setAntialias(options.Antialiasing == 1);


        const alen = this._iatomList.length;
        for (let ia = 0; ia < alen; ia++) {
            let atom = this._iatomList[ia];
            atom.setMaterialType(options.AtomStyle);
        }

        const blen = this._ibondList.length;
        for (let ib = 0; ib < blen; ib++) {
            let bond = this._ibondList[ib];
            bond.setMaterialType(options.BondStyle);
        }

        
        switch (options.CameraType) {
            case 0: // ortho
                if (renderer._cameraMode == "P") {
                    renderer.setOrthoCamera();
                }

                break;

            case 1:
                if (renderer._cameraMode == "O") {
                    renderer.setPerspectiveCamera();
                }
                break;
        }
        

        switch (options.ShowAxis) {
            case 0:
                renderer._axisMesh.visible = false;
                app._labelManager._xLabel.style.display = 'none';
                app._labelManager._yLabel.style.display = 'none';
                app._labelManager._zLabel.style.display = 'none';
                break;

            case 1:
                renderer._axisMesh.visible = true;
                app._labelManager._xLabel.style.display = '';
                app._labelManager._yLabel.style.display = '';
                app._labelManager._zLabel.style.display = '';
                break;
        }
    }


    /**
     * cstructure의 이름을 반환한다.
     * @returns {String} CStructure의 이름
     * */
    getName() {
        return this._name;
    }

    /**
     * cstructure의 이름을 설정한다.
     * @param {String} name
     */
    setName(name) {
        this._name = name;
    }

    /**
     * lattice axis를 반환한다.
     * @returns {LatticeAxis} 
     * */
    getLatticeAxis() {
        return this._unitcell._axis;
    }

    /**
     * idx에 해당하는 crystal plane을 반환한다.
     * @param {Number} idx
     * @returns {Plane}
     */
    getPlaneByIdx(idx) {
        return this._crystalPlanes[idx];
    }

    getPlaneById(id) {
        return this._crystalPlanes.filter(elem => {
            return elem._id === id;
        });
    }

    /**
     * idx에 해당하는 lattice plane을 반환한다.
     * @param {Number} idx
     * @returns {Plane}
     */
    getLatticePlaneByIdx(idx) {
        return this._latticePlanes[idx];
    }

    /**
     * lattice plane을 추가한다.
     * @param {Plane} plane
     */
    addLatticePlane(plane) {
        this._latticePlanes.push(plane);
    }

    /**
     * lattice plane을 제거한다.
     * @param {Plane} plane
     */
    removeLatticePlane(plane) {
        const idx = this._latticePlanes.indexOf(plane);
        if (idx > -1)
            this._latticePlanes.splice(idx, 1);
    }

    /**
     * idx에 해당하는 lattice plane을 제거한다.
     * @param {Number} idx
     */
    removeLatticePlaneByIdx(idx) {
        if (idx >= 0)
            this._latticePlanes.splice(idx, 1);
    }

    /**
     * crystal plane을 추가한다.
     * @param {Plane} plane
     */
    addPlane(plane) {
        this._crystalPlanes.push(plane);
    }

    /**
     * crystal plane을 제거한다.
     * @param {Plane} plane
     */
    removePlane(plane) {
        const idx = this._crystalPlanes.indexOf(plane);
        if (idx > -1)
            this._crystalPlanes.splice(idx, 1);
    }

    /**
     * idx에 해당하는 crystal plane을 제거한다.
     * @param {Plane} idx
     */
    removePlaneByIdx(idx) {
        if (idx >= 0)
            this._crystalPlanes.splice(idx, 1);
    }

    /**
     * 
     * @param {any} plane_id
     */
    removePlaneById(plane_id) {
        this._crystalPlanes = this._crystalPlanes.filter(elem => {
            return elem._id !== plane_id;
        });
    }

    /**
     * clip option을 설정한다.
     * @param {Object} option
     */
    setClipOption(option) {
        this._clipOption = option;
    }

    /**
     * boundary의 min, max를 설정한다.
     * @param {Array} min
     * @param {Array} max
     */
    setBoundary(min, max) {
        this._boundary.set(new THREE.Vector3(min[0], min[1], min[2]), new THREE.Vector3(max[0], max[1], max[2]));
    }

    /**
     * clone method
     * @returns {CStructure} cloned cstructure
     * */
    clone() {
        let clone = new CStructure();

        clone._name = this._name;
        clone._position = this._position.clone();
        clone._direction = this._direction.clone();

        let len = this._atoms.length;
        for (let i = 0; i < len; i++) {
            clone.addAtom(this._atoms[i].clone());
        }

        len = this._bonds.length;
        for (let i = 0; i < len; i++) {
            clone.addBond(this._bonds[i].clone());
        }

        clone._unitcell = this._unitcell.clone();
        clone._boundary = this._boundary.clone();

        len = this._tvectors.length;
        for (let i = 0; i < len; i++) {
            clone.addtVector(this._tvectors[i].clone());
        }

        len = this._avectors.length;
        for (let i = 0; i < len; i++) {
            let av = this._avectors[i];
            let idx = this._tvectors.indexOf(av._def);
            let tv = clone._tvectors[idx];
            clone.addVector2iAtomWithPos(av._unitcellPos, av._index, tv);
        }

        len = this._crystalPlanes.length;
        for (let i = 0; i < len; i++) {
            clone.addPlane(this._crystalPlanes[i].clone());
        }

        len = this._latticePlanes.length;
        for (let i = 0; i < len; i++) {
            clone.addLatticePlane(this._latticePlanes[i].clone());
        }

        return clone;
    }
 
    /**
     * tVector를 추가한다.
     * @param {tVector} tvector
     */
    addtVector(tvector) {
        const idx = this._tvectors.indexOf(tvector);
        if (idx <= -1) {
            this._tvectors.push(tvector);
            this.numberVectors();
        }
    }

    /**
     * tVector를 제거한다.
     * @param {tVector} tvector
     */
    removetVector(tvector) {
        const idx = this._tvectors.indexOf(tvector);
        if (idx > -1)
            this._tvectors.splice(idx, 1);
    }


  
    /**
     * tVector를 하나의 iAtom에 추가한다.
     * @param {Array} opos unitcell 위치의 중심 좌표 배열
     * @param {Number} index cAtom의 _idx
     * @param {tVector} tvector 렌더링 될 벡터가 정의된 클래스
     * @returns {aVector} added aVector
     */
    addVector2iAtomWithPos(opos, index, tvector) {
        this.addtVector(tvector);

        let av = new aVector(tvector);
        av.setiAtomPos(opos, index);

        this._avectors.push(av);

        //this.numberVectors();

        return av;
    }

    /**
     * iAtom의 모든 벡터를 제거한다.
     * @param {iAtom} iatom
     */
    removeAllVectors4iAtom(iatom) {

        let pos = iatom._unitcellLoc;
        let idx = iatom._index;

        let avs = [];
        let len = this._avectors.length;
        for (let i = len-1; i >=0 ; i--) {
            let av = this._avectors[i];

            if (av._unitcellPos[0] == pos[0] &&
                av._unitcellPos[1] == pos[1] &&
                av._unitcellPos[2] == pos[2] &&
                av._index == idx
                )
                avs.push(av);
        }


        len = avs.length;
        for (let i = 0; i < len; i++) {
            let av = avs[i];
            const idx2 = this._avectors.indexOf(av);
            if (idx2 > -1)
                this._avectors.splice(idx2, 1);
        }
    }

    /**
     * iAtom에 vector를 추가한다.
     * @param {iAtom} iatom
     * @param {tVector} tvector
     * @returns {aVector} 추가된 aVector
     */
    addVector2iAtom(iatom, tvector) {

        let ucpos = iatom._unitcellLoc;
        let idx = iatom._index;

        let av = this.addVector2iAtomWithPos(ucpos, idx, tvector);
        return av;
    }
 
    /**
     * iAtom의 iVector를 제거한다.
     * @param {iAtom} iatom
     * @param {tVector} tvector
     */
    removeVector4iAtom(iatom, tvector) {
        let iv = this.findiVector(iatom, tvector);

        const idx = this._ivectors.indexOf(iv);
        if (idx > -1)
            this._ivectors.splice(idx, 1);
    }

    /**
     * cAtom의 aVector를 제거한다.
     * @param {cAtom} catom
     * @param {tVector} tvector
     */
    removeVector4CAtom(catom, tvector) {
        catom.removeVector(tvector);
    }

    /**
     * cAtom에 aVector를 추가한다.
     * @param {cAtom} catom
     * @param {tVector} tvector
     */
    addVector2CAtom(catom, tvector) {
        this.addtVector(tvector);

        let av = new aVector(tvector);
        av.setCAtom(catom);
        catom.addVector(av);

    }

    /**
     * tVector numbering
     * */
    numberVectors() {
        const len = this._tvectors.length;
        let i;
        for (i = 0; i < len; i++) {
            this._tvectors[i]._number = i;
        }
    }

    /**
     * iVector 메쉬를 생성한다.
     * */
    generateMesh4iVectors() {
        let len = this._iatomList.length;
        let i;

        len = this._ivectors.length;
        for (i = 0; i < len; i++) {
            let iv = this._ivectors[i];

            if (!iv._iatom) {
                let t = 32;
            }
            
            let parent = iv._iatom.getVectorMesh();
            let mesh = iv.generateMesh(this);

            parent.add(mesh);

        }

    }

    /**
     * aVector로부터 iVector를 복원한다.
     * */
    generateiVectors() {
        const len = this._avectors.length;
        let i;
        for (i = 0; i < len; i++) {
            let av = this._avectors[i];

            let ia = this.findiAtom(av._unitcellPos, av._index);

            if (!ia){
                rayLog(3,"Error!! atom index cannot found!");
            }

            let iv = av.generateIVector(ia, this);

            this._ivectors.push(iv);
        }

    }

    /**
     * cAtom을 추가한다.
     * @param {cAtom} atom
     */
    addAtom(atom) {
        if (atom.constructor === Array) {
            const len = atom.length;
            let i;
            for (i = 0; i < len; i++) {
                this._atoms.push(atom[i]);
            }
        } else {
            this._atoms.push(atom);
        }

        this.setAtomIndex();
    }

    /**
     * cAtom의 인덱스를 설정한다.
     * */
    setAtomIndex() {
        const len = this._atoms.length;
        let i;
        for (i = 0; i < len; i++) {
            this._atoms[i]._index4cstructure = i;
            this._atoms[i]._idx = i;
        }
    }

    /**
     * 추가될 cAtom의 인덱스를 반환한다.
     * @returns {Number} 추가된 atom의 index
     * */
    assignAtomIdx() {
        return ++this._curAtomIdx;
    }

    assignShapeId() {
        return ++this._curShapeId;
    }

    /**
     * 추가될 cBond의 인덱스를 반환한다.
     * @returns {Number} 추가된 bond의 index
     * */
    assignBondIdx() {
        return ++this._curBondIdx;
    }

    /**
     * cAtom을 제거한다.
     * @param {CAtom} atom
     */
    removeAtom(atom) {
        let idx = atom._idx;
        this._atoms = this._atoms.filter(elem => {
            return elem !== atom;
        });

        this._bonds = this._bonds.filter(elem => {
            return elem._A1Idx !== idx && elem._A2Idx !== idx ;
        });



        this._avectors = this._avectors.filter(elem => {
            return elem._index !== idx;
        });


        this.setAtomIndex();
        const blen = this._bonds.length;
        let i;
        for (i = 0; i < blen; i++) {
            let bond = this._bonds[i];
            bond.touch();
        }

    }

    /**
     * atom id에 해당하는 cAtom을 제거한다.
     * @param {Number} atom_id
     */
    removeAtomById(atom_id) {
        this._atoms = this._atoms.filter(elem => {
            return elem._id !== atom_id;
        });

        this.setAtomIndex();
    }

    /**
     * atom index에 해당하는 cAtom을 반환한다.
     * @param {Number} atom_idx
     * @returns {CAtom} atom index에 해당하는 catom
     */
    getAtomByIdx(atom_idx) {
        let res = this._atoms[atom_idx];

        return res;
    }

    /**
     * atom index에 해당하는 iAtom을 반환한다.
     * @param {Number} atom_idx
     * @returns {IAtom} atom index에 해당하는 iatom
     */
    getIAtomByIdx(atom_idx) {
        let res = this._iatomList.filter(elem => {
            return elem._def._idx === atom_idx;
        });

        return res;
    }

    /**
     * atom id에 해당하는 cAtom을 반환한다.
     * @param {Number} atom_id
     * @returns {Array} atom id에 해당하는 atom
     */
    getAtomsById(atom_id) {
        return this._atoms.filter(elem => {
            return elem._id === atom_id;
        });
    }

    /**
     * vector number에 해당하는 iVector를 반환한다.
     * @param {Number} vector_number
     * @returns {Array} vector number에 해당하는 iVector
     */
    getiVectorByNumber(vector_number) {
        return this._ivectors.filter(elem => {
            return elem._number === vector_number;
        });
    }

    /**
     * vector number에 해당하는 tVector를 반환한다.
     * @param {Number} vector_number
     * @returns {Array} vector number에 해당하는 tVector
     */
    gettVectorByNumber(vector_number) {
        return this._tvectors.filter(elem => {
            return elem._number === vector_number;
        });
    }

    /**
     * vector number에 해당하는 cAtom을 반환한다.
     * @param {Number} vector_number
     * @returns {Array} vector number에 해당하는 CAtom
     */
    getAtomsByVectorNumber(vector_number) {
        return this._atoms.filter(elem => {
            let res = false;
            for (let vector of elem._ivectors) {
                if (vector._number === vector_number) {
                    res = true;
                    break;
                }
            }

            return res;
        });
    }

    /**
     * atom index에 해당하는 cAtom을 제거한다.
     * @param {Number} atom_idx
     */
    removeAtomByIdx(atom_idx) {
        this._atoms = this._atoms.filter(elem => {
            return elem._idx !== atom_idx;
        });
    }

    /**
     * cAtom을 모두 제거한다.
     * */
    clearAtom() {
        this._atoms = [];
        this._curAtomIdx = -1;
    }

    /**
     * aVector를 모두 제거한다.
     * */
    clearaVector() {
        this._avectors = [];
    }


    /**
     * cBond를 추가한다.
     * @param {cBond} bond
     */
    addBond(bond) {
        if (bond.constructor === Array) {
            const len = bond.length;
            let i;
            for (i = 0; i < len; i++) {
                this._bonds.push(bond[i]);
            }
        } else {
            this._bonds.push(bond);
        }
    }

    /**
     * atom1와 atom2를 데이터로 갖는 cBond를 제거한다.
     * @param {cAtom} atom1
     * @param {cAtom} atom2
     */
    removeBond(atom1, atom2) {
        this._bonds = this._bonds.filter(elem => {
            return elem.atom1 !== atom1 && elem.atom2 !== atom2;
        });
    }

    /**
     * bond index에 해당하는 cBond를 제거한다.
     * @param {Number} bond_idx
     */
    removeBondByIdx(bond_idx) {
        this._bonds = this._bonds.filter(elem => {
            return elem._idx !== bond_idx;
        });
    }

    /**
     * vector index에 해당하는 iVector를 제거한다.
     * @param {Number} vector_idx
     */
    removeVectorByIdx(vector_idx) {
        this._ivectors = this._ivectors.filter(elem => {
            return elem._idx !== vector_idx;
        });
    }

    /**
     * cBond를 모두 제거한다.
     * */
    clearBond() {
        this._bonds = [];
        this._curBondIdx = -1;
    }

    /**
     * unitcell geometry를 제거한다.
     * */
    clearUnitcell() {
        this._unitcell.clearGeom();
    }

    /**
     * crystal plane을 모두 제거한다.
     * */
    clearPlane() {
        this._crystalPlanes = [];
        this._curShapeId = -1;
    }

    /**
     * lattice plane을 모두 제거한다.
     * */
    clearLatticePlane() {
        this._latticePlanes = [];
    }

    /**
     * dot surface 가시화 여부를 설정한다.
     * @param {Boolean} show
     */
    showDotSurface(show) {

        const alen = this._iatomList.length;
        for (let ia = 0; ia < alen; ia++) {
            let atom = this._iatomList[ia];

            if (!atom._mesh)
                continue;

            if (atom._mesh.visible)
                atom.showDotSurface(show);
        }

    }

    // style 0: normal
    // 1: space-filling
    // 2: polyhedral
    // 3: wireframe
    // 4: stick
    /**
     * 렌더링 스타일을 설정한다.
     * @param {Number} style
     */
    setRenderStyle(style) {
        this._style = style;

        switch (style) {
            case 0: // normal
                this.setStyleWireframe(false);
                this.setStyleNormal(1, 0.05);
                break;

            case 1: // space-filling
                this.setStyleWireframe(false);
                this.setRadius(0, 0);
                this.setStyleNormal(2.39, 0.0);
                break;

            case 2: // polyhedral
                this.setStyleWireframe(false);
                this.setStyleNormal(1, 0.05);
                break;

            case 3: // wireframe
                this.setStyleWireframe(true);
                this.setStyleNormal(1, 0.003);
                //this.setRadius(0, 0.01);
                break;

            case 4: // stick
                this.setStyleWireframe(false);
                this.setRadius(0.02, 0.02);
                break;

        }
    }

    /**
     * mesh material의 wireframe 여부를 설정한다.
     * @param {Boolean} w
     */
    setStyleWireframe(w) {
        const alen = this._iatomList.length;
        for (let ia = 0; ia < alen; ia++) {
            let atom = this._iatomList[ia];
            atom.setWireframe(w);
        }

        const blen = this._ibondList.length;
        for (let ib = 0; ib < blen; ib++) {
            let bond = this._ibondList[ib];
            bond.setWireframe(w);
        }

    }


    /**
     * 원자와 결합에 적용될 가중치와 결합의 크기를 설정한다.
     * @param {Number} ratio
     * @param {Number} bond_radius
     */
    setStyleNormal(ratio, bond_radius) {
        const alen = this._iatomList.length;
        for (let ia = 0; ia < alen; ia++) {
            let atom = this._iatomList[ia];
            atom.setNormalRadius(ratio);
        }

        const blen = this._ibondList.length;
        for (let ib = 0; ib < blen; ib++) {
            let bond = this._ibondList[ib];
            bond.setRadius(bond_radius);
        }
    }

    /**
     * 원자의 크기, 결합의 크기를 설정한다.
     * @param {Number} aradius
     * @param {Number} bradius
     */
    setRadius(aradius, bradius) {

        const alen = this._iatomList.length;
        for (let ia = 0; ia < alen; ia++) {
            let atom = this._iatomList[ia];
            atom.setRadius(aradius);
        }

        const blen = this._ibondList.length;
        for (let ib = 0; ib < blen; ib++) {
            let bond = this._ibondList[ib];
            bond.setRadius(bradius);
        }
    }

    /**
     * iAtom 추가 가능 여부를 반환한다.
     * @param {iAtom} iatom
     * @returns {Boolean} iAtom 추가 가능 여부
     */
    canAddiAtom(iatom) {
        const len = this._iatomList.length;
        for (let i = 0; i < len; i++) {
            let atom = this._iatomList[i];
            let dist = atom.distance(iatom);
            if (dist < _mdist && atom.visible === true)
                return false;
        }

        return true;
    }

    /**
     * tVector와 매칭되는 iAtom의 iVector를 반환한다.
     * @param {iAtom} iatom
     * @param {tVector} tvector
     * @returns {iVector} 
     */
    findiVector(iatom, tvector) {
        const len = this._ivectors.length;
        for (let i = 0; i < len; i++) {
            let iv = this._ivectors[i];

            if (iv._iatom == iatom &&
                iv._tvector == tvector)
                return iv;
        }

        return null;
    }

    /**
     * unitcell location, index가 매칭되는 iAtom을 반환한다.
     * @param {Array} uc_loc
     * @param {Number} index
     * @returns {iAtom}
     */
    findiAtom(uc_loc, index) {
        const len = this._iatomList.length;
        for (let i = 0; i < len; i++) {
            let atom = this._iatomList[i];

            if (atom._unitcellLoc[0] == uc_loc[0] &&
                atom._unitcellLoc[1] == uc_loc[1] &&
                atom._unitcellLoc[2] == uc_loc[2] &&
                atom.getIndex() == index &&
                atom._exist == true
            ) {
                return atom;
            }
        }

        return null;
    }

    /**
     * iAtom, iBond, iVector를 모두 제거한다.
     * */
    cleariAtomiBond() {

        this._iatomList = [];
        this._ibondList = [];
        this._ivectors = [];

    }

    /**
     * iAtom을 생성한다.
     * @param {THREE.Matrix4} mat
     */
    generateAtom(mat) {

        this._boundary.update();

        let i = 0;
        let j = 0;
        let k = 0;

        const alen = this._atoms.length;
        let ia = 0;
        let idx = 0;
        let number = 0;
        for (ia = 0; ia < alen; ia++) {
            let atom = this._atoms[ia];
            atom.setAtomID(atom._id);
            idx = ia;
            for (i = this._boundary._imin._x; i < this._boundary._imax._x; i++) {
                for (j = this._boundary._imin._y; j < this._boundary._imax._y; j++) {
                    for (k = this._boundary._imin._z; k < this._boundary._imax._z; k++) {

                        let lpos = new THREE.Vector3(i + atom._position._x, j + atom._position._y, k + atom._position._z);
                        if (mat) {
                            let lpos4 = new THREE.Vector4(atom._position._x, atom._position._y, atom._position._z, 1);
                            lpos4.applyMatrix4(mat);
                            lpos4.divideScalar(lpos4.w);

                            lpos.x = lpos4.x + i;
                            lpos.y = lpos4.y + j;
                            lpos.z = lpos4.z + k;
                        }


                        let iatom = new iAtom(atom, lpos);
                        iatom.setUnitcellLoc(i, j, k, idx);
                        if (!this.canAddiAtom(iatom))
                            continue;

                        iatom._number = number;
                        number++;

                        //iatom.generate(this);

                        this._iatomList.push(iatom);
                    }
                }
            }
        }
    }

    /**
     * 1개의 iBond를 생성한다. 
     * @param {iAtom} atom1 결합의 첫번째 원소
     * @param {iAtom} atom2 결합의 두번째 원소
     * @param {cBond} bond cBond
     * @returns {iBond}
     */
    createBond(atom1, atom2, bond) {
        let ibond = new iBond(atom1, atom2, bond);
        return ibond;
    }

    /**
     * CStructure 메쉬를 생성한다.
     * @param {any} mat_list
     */
    generateWithMatrices(mat_list) {
        if (!mat_list) {
            mat_list = [SYM.getMatrix(0)];
        }


        this._groupAtomMesh.clear();
        this._groupBondMesh.clear();
        this._groupEtcMesh.clear();

        this._ivectors = [];

        this.cleariAtomiBond();


        const len = mat_list.length;
        for (let i = 0; i < len; i++) {
            let mat = mat_list[i];

            this.generateAtom(mat);

        }


        this.generateBond();

        this.generateiVectors();
        this.generateMesh4iVectors();

        let mesh = this._unitcell.generateGeom();
        this._groupEtcMesh.add(mesh);


        this.ClipBoundary();

        this.generateMesh();



        this.generatePolyhedron();
        this.generateCrystalShape();
        this.generateLatticePlanes();

    }

    /**
     * symmetry matrix를 적용한 CStructure를 만든다.
     * @param {any} mat_idx_list
     */
    generate(mat_idx_list) {

        if (!mat_idx_list) {
            mat_idx_list = [0];
        }

        const len = mat_idx_list.length;
        let mat_list = [];
        for (let i = 0; i < len; i++) {
            let matidx = mat_idx_list[i];
            let mat = SYM.getMatrix(matidx);

            mat_list.push(mat);
        }

        this.generateWithMatrices(mat_list);
    }

    /**
     * CStructure의 mesh를 반환한다.
     * @returns {THREE.Mesh}
     * */
    getMesh() {
        return this._groupMesh;
    }

    /**
     * iBond를 생성한다.
     * */
    generateBond() {
        const alen = this._iatomList.length;

        const blen = this._bonds.length;

        let bi = 0;
        let i = 0;
        let j = 0;
        for (i = 0; i < alen - 1; i++) {
            let a1 = this._iatomList[i];
            a1.calcPos2(this);
            for (j = i + 1; j < alen; j++) {
                let a2 = this._iatomList[j];

                a2.calcPos2(this);

                for (bi = 0; bi < blen; bi++) {
                    let bond = this._bonds[bi];
                    if (bond.condition(a1, a2)) {
                        //generated = true;
                        let ibond = this.createBond(a1, a2, bond);

                        //ibond.generate(this);


                        this._ibondList.push(ibond);
                        break;
                    }
                }

            }
        }

    }

    /**
     * CStructure의 mesh를 생성한다.
     * */
    generateMesh() {

        for (let i = 0; i < this._iatomList.length; ++i) {
            let iatom = this._iatomList[i];

            iatom.generate(this);

            if (iatom._mesh) {
                this._groupAtomMesh.add(iatom.getMesh());
                this._groupEtcMesh.add(iatom.getVectorMesh());
                this._groupEtcMesh.add(iatom.getDotSurface());
            }


        }

        const blen = this._ibondList.length;
        for (let ib = 0; ib < blen; ib++) {
            let bond = this._ibondList[ib];
            bond.generate(this);

            let meshes = bond.getMesh();
            if (meshes) {
                this._groupBondMesh.add(meshes[0]);
                this._groupBondMesh.add(meshes[1]);

            }
        }


    }

    /**
     * boundary에 맞게 CStructure mesh를 clip한다.
     * */
    ClipBoundary() {

        let mode = this._clipOption;

        if (mode === 0) {
            // 전체 visible off
            for (let i = 0; i < this._iatomList.length; ++i) {
                this._iatomList[i]._cvisible = false;
                this._iatomList[i]._visible = false;
            }

            for (let i = 0; i < this._iatomList.length; ++i) {
                if (this._iatomList[i]._def._visible && this.isIn(this._iatomList[i])) {
                    this._iatomList[i]._cvisible = true;
                    this._iatomList[i]._visible = true;
                }
            }

            // ibond에서 살펴보기
            for (let elem of this._ibondList) {


                if (elem._a1._cvisible || elem._a2._cvisible) {
                    elem._a2._visible = true;
                    elem._a1._visible = true;
                    elem._visible = true;
                }
                else {
                    elem._visible = false;
                }
            }
        }
        else if (mode === 1) {

            // 전체 visible off
            for (let i = 0; i < this._iatomList.length; ++i) {
                this._iatomList[i].setVisible(false);
            }

            for (let i = 0; i < this._iatomList.length; ++i) {
                if (this._iatomList[i]._def._visible && this.isIn(this._iatomList[i])) {
                    this._iatomList[i].setVisible(true);
                }
            }

            // ibond에서 살펴보기
            for (let elem of this._ibondList) {

                if (elem._a1._visible && elem._a2._visible) {
                    for (let bond of elem._meshes) {
                        bond.visible = true;
                    }
                }
                else {
                    for (let bond of elem._meshes) {
                        bond.visible = false;
                    }
                }
            }
        }
    }

    /**
     * 주어진 position에 대해 포함 여부를 반환한다.
     * @param {THREE.Vector3} pos 객체의 위치 정보
     * @returns {Boolean} 포함 여부
     */
    isIn(iatom) {
        return this._boundary.isIn(iatom._position, iatom._position2);
    }

    /**
     * CStructure 데이터를 저장한다.
     * @returns {CStructure} 저장 데이터 형식의 CStructure
     * */
    SaveCStructure() {

        let cs = this.clone();

        for (let i = 0; i < cs._atoms.length; ++i) {
            cs._atoms[i] = cs._atoms[i].createData4Save();
        }

        for (let i = 0; i < cs._bonds.length; ++i) {
            cs._bonds[i] = cs._bonds[i].createData4Save();
        }

        cs._unitcell = cs._unitcell.createData4Save();
        cs._boundary = cs._boundary.createData4Save();

        for (let i = 0; i < cs._tvectors.length; ++i) {
            cs._tvectors[i] = cs._tvectors[i].createData4Save();
        }

        for (let i = 0; i < cs._avectors.length; ++i) {
            cs._avectors[i] = cs._avectors[i].createData4Save();
        }

        for (let i = 0; i < cs._crystalPlanes.length; ++i) {
            cs._crystalPlanes[i] = cs._crystalPlanes[i].createData4Save();
        }

        for (let i = 0; i < cs._latticePlanes.length; ++i) {
            cs._latticePlanes[i] = cs._latticePlanes[i].createData4Save();
        }


        delete cs._iatomList;
        delete cs._ibondList;

        delete cs._groupMesh;
        delete cs._groupAtomMesh;
        delete cs._groupBondMesh;
        delete cs._groupEtcMesh;
        cs._ivectors = [];

        return cs;
    }

 
    /**
     * CStructure 정보를 가진 데이터로부터 CStructure를 복원한다.
     * @param {CStructure} cs
     */
    LoadCStructure(cs) {

        this._name = cs._name;
        this._position = new Vector3(cs._position._x, cs._position._y, cs._position._z);
        this._direction = new Vector3(cs._direction._x, cs._direction._y, cs._direction._z);

        for (let i = 0; i < cs._tvectors.length; ++i) {
            this.LoadtVectorFromJSON(cs._tvectors[i]);
        }

        this.numberVectors();

        // avector도 저장하는 걸 만들자
        for (let i = 0; i < cs._avectors.length; ++i) {
            this.LoadaVectorFromJSON(cs._avectors[i]);
        }

        for (let i = 0; i < cs._atoms.length; ++i) {
            this.LoadAtomFromJSON(cs._atoms[i]);
        }

        for (let i = 0; i < cs._bonds.length; ++i) {
            this.LoadBondFromJSON(cs._bonds[i]);
        }

        this.LoadBoundaryFromJSON(cs._boundary);
        this.LoadUnitcellFromJSON(cs._unitcell);

        for (let i = 0; i < cs._crystalPlanes.length; ++i) {
            this.LoadCrystalPlaneFromJSON(cs._crystalPlanes[i]);
        }

        for (let i = 0; i < cs._latticePlanes.length; ++i) {
            this.LoadLatticePlaneFromJSON(cs._latticePlanes[i]);
        }
    }

    /**
     * JSON 데이터로부터 tVector를 불러온다.
     * @param {String} tVectorJSON tVector 정보가 담긴 JSON
     */
    LoadtVectorFromJSON(tVectorJSON) {
        let tvector = new tVector([tVectorJSON._vector[0], tVectorJSON._vector[1], tVectorJSON._vector[2]], [tVectorJSON._color[0], tVectorJSON._color[1], tVectorJSON._color[2]], tVectorJSON._radius);

        this._tvectors.push(tvector);
    }

    /**
     * JSON 데이터로부터 aVector를 불러온다.
     * @param {String} aVectorJSON aVector 정보가 담긴 JSON
     */
    LoadaVectorFromJSON(aVectorJSON) {

        let avector = null;
        for (let i = 0; i < this._tvectors.length; ++i) {
            if (this._tvectors[i]._number === aVectorJSON._def._number) {
                avector = new aVector(this._tvectors[i]);
                break;
            }
        }

        if (avector) {
            avector._unitcellPos = aVectorJSON._unitcellPos;
            avector._index = aVectorJSON._index;
            this._avectors.push(avector);
        }
    }

    /**
     * JSON 데이터로부터 CStructure를 불러온다.
     * @param {String} jsonStr CStructure 정보가 담긴 JSON
     */
    LoadInstanceFromJSON(jsonStr) {
        this._atoms = [];
        for (let i = 0; i < jsonStr._atoms.length; ++i) {
            this.LoadAtomFromJSON(jsonStr._atoms[i]);
        }

        this._bonds = [];
        for (let i = 0; i < jsonStr._bonds.length; ++i) {
            this.LoadBondFromJSON(jsonStr._bonds[i]);
        }

        this._boundary = new Boundary();
        this.LoadBoundaryFromJSON(jsonStr._boundary);

        for (let i = 0; i < jsonStr._iatomList.length; ++i) {
            this.LoadIAtomFromJSON(jsonStr._iatomList[i]);
        }

        for (let i = 0; i < jsonStr._ibondList.length; ++i) {
            this.LoadIBondFromJSON(jsonStr._ibondList[i]);
        }

        // unitcell
        this.LoadUnitcellFromJSON(jsonStr._unitcell);
    }

    /**
     * json 데이터로부터 cAtom을 불러온다.
     * @param {String} atomJSON cAtom 정보가 담긴 json
     */
    LoadAtomFromJSON(atomJSON) {
        let idx = this._atoms.length;
        let catom = new CAtom().cloneFromAtom(atomJSON);
        
        // *** avector 생성 부분 수정하기 ***
        for (let i = 0; i < atomJSON._avectors.length; ++i) {
            catom._avectors[i] = new aVector(this._tvectors[atomJSON._avectors[i]._def._number]);
        }
        catom._idx = idx;
        this._atoms.push(catom);
    }

    /**
     * json 데이터로부터 cBnd 데이터를 불러온다.
     * @param {String} bondJSON cBond 정보가 담긴 json
     */
    LoadBondFromJSON(bondJSON) {
        let idx = this._bonds.length;
        let newBond = new CBond().cloneFromBond(bondJSON);
        newBond._idx = idx;
        this._bonds.push(newBond);
    }

    /**
     * json 데이터로부터 boundary 데이터를 불러온다.
     * @param {String} boundaryJSON boundary 정보가 담긴 json
     */
    LoadBoundaryFromJSON(boundaryJSON) {
        this._boundary = new Boundary().cloneFromBoundary(boundaryJSON);
    }

    /**
     * json 데이터로부터 iAtom 데이터를 불러온다.
     * @param {String} iAtomJSON iAtom 정보가 담긴 json
     */
    LoadIAtomFromJSON(iAtomJSON) {
        this._iatomList.push(new iAtom().cloneFromIAtom(this, iAtomJSON));
    }

    /**
     * json 데이터로부터 iBond 데이터를 불러온다.
     * @param {String} iBondJSON iBond 정보가 담긴 json
     */
    LoadIBondFromJSON(iBondJSON) {
        this._ibondList.push(new iBond().cloneFromBond(iBondJSON));
    }

    /**
     * json 데이터로부터 unitcell 데이터를 불러온다.
     * @param {String} unitcellJSON unitcell 정보가 담긴 json
     */
    LoadUnitcellFromJSON(unitcellJSON) {
        this._unitcell = new UnitCell().cloneFromUnitcell(unitcellJSON);
    }

    LoadCrystalPlaneFromJSON(crystalPlaneJSON) {
        let plane = new Plane().cloneFromPlane(crystalPlaneJSON);
        plane._id = this._crystalPlanes.length;

        this._crystalPlanes.push(plane);
    }

    LoadLatticePlaneFromJSON(latticePlaneJSON) {
        this._latticePlanes.push(new Plane().cloneFromPlane(latticePlaneJSON));
    }

    /**
     * polyhedron을 생성한다.
     * */
    generatePolyhedron() {

        if (this._polyhedron) {
            this._polyhedron.dispose();
            this._polyhedron = null;
        }

        this._polyhedron = new Polyhedron(this._groupEtcMesh);
        this._polyhedron.generateWithAtomBondList(this._iatomList, this._ibondList);

        this.setVisiblePolyhedron(this._polyhedronVisible);
    }

    /**
     * polyhedron 가시화 여부를 설정한다.
     * @param {Boolean} vis 가시화 여부
     */
    setVisiblePolyhedron(vis) {
        this._polyhedronVisible = vis;
        if (this._polyhedron) {
            this._polyhedron.setVisible(vis);
        }
    }

    /**
     * polyhedron edge 가시화 여부를 설정한다.
     * @param {Boolean} vis 가시화 여부
     */
    setVisiblePolyhedronEdge(vis) {
        this._polyhedronVisibleEdge = vis;
        if (this._polyhedron) {
            this._polyhedron.setVisibleEdge(vis);
        }
    }

    /**
     * polyhedron의 광도를 설정한다.
     * @param {Number} shi polyhedron shininess
     */
    setPolyhedronShininess(shi) {
        this._polyhedronShininess = shi;
        if (this._polyhedron) {
            this._polyhedron.setShininess(shi);
        }
    }

    /**
     * crystal shape를 생성한다.
     * */
    generateCrystalShape() {
        if (this._crystalShape) {
            this._crystalShape.dispose();
            this._crystalShape = null;
        }

        this._crystalShape = new CrystalShape(this._groupEtcMesh);
        this._crystalShape.generateWithPlanes(this._crystalPlanes);
    }

    /**
     * crystal shape 가시화 여부를 설정한다.
     * @param {Boolean} vis crystal shape 가시화 여부
     */
    setVisibleCrystalShape(vis) {
        this._crystalShapeVisible = vis;
        if (this._crystalShape) {
            this._crystalShape.setVisible(vis);
        }
    }

    /**
     * crystal shape edge 가시화 여부를 설정한다.
     * @param {Boolean} vis crystal shape edge 가시화 여부
     */
    setVisibleCrystalShapeEdge(vis) {
        this._crystalShapeVisibleEdge = vis;
        if (this._crystalShape) {
            this._crystalShape.setVisible(vis);
        }
    }

    /**
     * lattice plane을 생성한다.
     * */
    generateLatticePlanes() {
        if (this._latticePlaneObj) {
            this._latticePlaneObj.dispose();
            this._latticePlaneObj = null;
        }

        this._latticePlaneObj = new LatticePlanes(this._groupEtcMesh);

        let lpsize = 1;
        if (this._unitcell && this._unitcell._axis) {
            if (lpsize < this._unitcell._axis._la)
                lpsize = this._unitcell._axis._la;
            if (lpsize < this._unitcell._axis._lb)
                lpsize = this._unitcell._axis._lb;
            if (lpsize < this._unitcell._axis._lc)
                lpsize = this._unitcell._axis._lc;
        }
        lpsize *= 2.1;

        this._latticePlaneObj.generateWithPlanes(this._latticePlanes, lpsize);
    }
}