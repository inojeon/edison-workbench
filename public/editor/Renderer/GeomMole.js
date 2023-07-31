import * as THREE from '../build/three.module.js';
import { ptSplineV3 } from './ptSpline.js';
import { Spline } from './cubic_spline.js';
import { ProteinTrajectory } from './ProteinTrajectory.js';
import { ptSplinePoint } from './ptSpline.js';
import { AtomDef } from './AtomDef.js';
import { Renderer } from './Renderer.js';
import { BufferGeometryUtils } from '../Renderer/jsm/utils/BufferGeometryUtils.js';

/**
 * Geom을 렌더링하는 클래스
 * */
export class GeomMole {

    static AtomRadius = {
        "H": 1.2,
        "He": 1.4,
        "Li": 1.82,
        "Be": 1.53,
        "B": 1.92,
        "C": 1.7,
        "N": 1.55,
        "O": 1.52,
        "F": 1.47,
        "Ne": 1.54,
        "Na": 2.27,
        "Mg": 1.73,
        "Al": 1.84,
        "Si": 2.1,
        "P": 1.8,
        "S": 1.8,
        "Cl": 1.75,
        "Ar": 1.88,
        "K": 2.75,
        "Ca": 2.31,
        "Ni": 1.63,
        "Cu": 1.4,
        "Zn": 1.39,
        "Ga": 1.87,
        "Ge": 2.11,
        "As": 1.85,
        "Se": 1.9,
        "Br": 1.85,
        "Kr": 2.02,
        "Rb": 3.03,
        "Sr": 2.49,
        "Pd": 1.63,
        "Ag": 1.72,
        "Cd": 1.58,
        "In": 1.93,
        "Sn": 2.17,
        "Sb": 2.06,
        "Te": 2.06,
        "I": 1.98,
        "Xe": 2.16,
        "Cs": 3.43,
        "Ba": 2.68,
        "Pt": 1.75,
        "Au": 1.66,
        "Hg": 1.55,
        "Tl": 1.96,
        "Pb": 2.02,
        "Bi": 2.07,
        "Po": 1.97,
        "At": 2.02,
        "Rn": 2.20,
        "Fr": 3.48,
        "Ra": 2.83,
        "U": 1.86
    };

    static _renderType = 0;
    static _bondCylinder = null;
    static _bondDotCylinder = null;

    static _iBondCylinder = null;
    static _atomSphere = null;
    static _letterAtomGeom = {};

    static _atomRenderType = 0;

    static _geomQuality = 1;

    /**
     * GeomRenderer 생성자
     * @param {any} api 다른 외부 라이브러리와 연동하기 위한 api 객체
     * @param {any} renderer 렌더러
     * @param {any} point_tex_fn 
     */
    static init(atom_render_type) {

        if (!atom_render_type)
            atom_render_type = 0;

        GeomMole.generateGeometry();

        let shade = 1;
        let len = GeomMole._sphere.attributes.position.array.length / 3;
        let colors = [];
        for (let i = 0; i < len; i++) {
            colors[i * 3 + 0] = shade;
            colors[i * 3 + 1] = shade;
            colors[i * 3 + 2] = shade;
        }
        GeomMole._sphere.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
        GeomMole._atomRenderType = atom_render_type;
    }

    /**
     * Mesh Qualitry 값을 반환한다.
     * @returns {Number} Mesh Quality 값
     * */
    static getMeshQuality() {
        return GeomMole._geomQuality*30 + 20;
    }

    //mesh quality
    //low: 0
    //medium: 1
    //high: 2
    //very high: 3


    /**
 * Geometry를 생성한다.
 * */
    static generateGeometry() {
        GeomMole.generateBondCylinder();

        let div = GeomMole.getMeshQuality();
        GeomMole._sphere = new THREE.SphereGeometry(1, div, div / 2);
    }

    /**
     * Mesh Quality 값을 설정한다.
     * @param {Number} quality 설정값
     */
    static setQuality(quality) {
        GeomMole._geomQuality = quality;
        GeomMole.generateGeometry();
    }

    /**
     * 현재 Mesh Quality 설정값을 반환한다.
     * @returns {Number} 현재 Mesh Quality 설정값
     * */
    static getQuality() {
        return GeomMole._geomQuality ;
    }


    /**
     * 결합 실린더 geometry 를 생성한다.
     * */
    static generateBondCylinder() {

        let div = GeomMole.getMeshQuality()/4;

        GeomMole._iBondCylinder = new THREE.CylinderGeometry(1, 1, 1, div).lookAt(new THREE.Vector3(0, 10, 0));
        GeomMole._iBondCylinder.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 0, 0.5));



        GeomMole._bondCylinder = new THREE.CylinderGeometry(1, 1, 1, div).lookAt(new THREE.Vector3(0, 10, 0));
        GeomMole._bondCylinder.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 0, 0.5));
        GeomMole._bondCylinder.computeBoundingSphere();

        let dot1 = new THREE.CylinderGeometry(1, 1, 1, div).lookAt(new THREE.Vector3(0, 10, 0));
        let mat2 = new THREE.Matrix4().makeScale(1, 1, .2);
        let mat1 = new THREE.Matrix4().makeTranslation(0, 0, 0.1 + 0.3).multiply(mat2);
        dot1.applyMatrix4(mat1);

        let dot2 = new THREE.CylinderGeometry(1, 1, 1, div).lookAt(new THREE.Vector3(0, 10, 0));
        mat2.makeScale(1, 1, .2);
        mat1.makeTranslation(0, 0, 0.1 + 0.3 + 0.4).multiply(mat2);
        dot2.applyMatrix4(mat1);

        GeomMole._bondDotCylinder = BufferGeometryUtils.mergeBufferGeometries([dot1,dot2], false);
    }

    /**
     * 원소 렌더링 타입 설정값을 반환한다.
     * @returns {Number} 원소 렌더링 타입 설정값
     * */
    static getAtomRenderType() {
        return GeomMole._atomRenderType;
    }

    /**
     * 원소 렌더링 타입 값을 설정한다.
     * @param {Number} type 렌더링 타입
     */
    static setAtomRenderType(type) {
        GeomMole._atomRenderType = type;
    }

    /**
     * 분자를 하나의 메쉬로 생성한다.
     * @param {any} geom_renderer Geom Renderer
     * @param {any} atom_list 원자 리스트
     * @param {any} bond_list 본드 리스트
     */
    static generateOneMeshMole(geom_renderer, atom_list, bond_list) {

    }

    /**
     * 분자를 여러개의 메쉬로 생성한다.
     * @param {any} alist 원자 리스트
     * @param {any} blist 본드 리스트
     */
    static generateMoleWithMultipleMesh(alist, blist) {


    }


    /**
     * 본드 메쉬를 생성한다.
     * @param {any} pos1 본드 끝점 1 위치
     * @param {any} pos2 본드 끝점 2 위치
     * @param {any} atomADef Atom A 정의
     * @param {any} atomBDef Atom B 정의
     * @param {any} is_ionic Ionic 플래그
     * @param {any} dpos displacement pos
     * @param {any} radius_scale 본드 실린더 스케일
     * @param {any} materials 렌더링 매터리얼
     */
    static createBondMesh(pos1, pos2, atomADef, atomBDef, is_ionic, dpos, radius_scale, materials) {

        let a = pos1.clone();
        let b = pos2.clone();
        let center = new THREE.Vector3(a.x, a.y, a.z).add(b).multiplyScalar(0.5);;

        let vba = b.clone();
        const len = vba.sub(a).length() / 2;

        var vn = vba.clone();
        var vup = new THREE.Vector3(0, 1, 0);
        vn.cross(vup);
        vn.normalize();

        var disp = vn.clone();
        disp.multiplyScalar(dpos);

        a.add(disp);
        b.add(disp);
        center.add(disp);

        let ionic = is_ionic;
        let geometry = GeomMole._bondCylinder;
        if (ionic) {
            if (ionic == 1) {
                geometry = GeomMole._bondDotCylinder;
            }
        }

        var mat1 = null;
        var mat2 = null;

        if (materials) {
            mat1 = materials[0];
            mat2 = materials[1];
        } else {
            mat1 = new THREE.MeshLambertMaterial();
            mat2 = new THREE.MeshLambertMaterial();
        }

        var mesh1 = new THREE.Mesh(geometry, mat1);
        mesh1.position.copy(a);
        mesh1.lookAt(center);

        mat1.color = new THREE.Color(atomADef._color[0], atomADef._color[1], atomADef._color[2]);
        mesh1._mat = mat1;
        mesh1._originalColorR = atomADef._color[0];
        mesh1._originalColorG = atomADef._color[1];
        mesh1._originalColorB = atomADef._color[2];
        mesh1._first = true;

        mesh1._atomDef = atomADef;

        var radius = radius_scale;
        mesh1.scale.set(radius, radius, len);
        mesh1._radiusScale = radius_scale;


        var mesh2 = new THREE.Mesh(geometry, mat2);
        mesh2.position.copy(b);
        mesh2.lookAt(center);

        mat2.color = new THREE.Color(atomBDef._color[0], atomBDef._color[1], atomBDef._color[2]);
        mesh2._mat = mat2;
        mesh2._originalColorR = atomBDef._color[0];
        mesh2._originalColorG = atomBDef._color[1];
        mesh2._originalColorB = atomBDef._color[2];
        mesh2._atomDef = atomBDef;
        mesh2._radiusScale = radius_scale;

        mesh2.scale.set(radius, radius, len);



        return [mesh1, mesh2];
    }


    /**
     * Bond를 생성한다
     * @param {any} gr geom renderer
     * @param {any} geom geom 객체
     * @param {any} parent geom의 parent
     * @param {any} dpos displacement pos
     * @param {any} radius_scale 본드 실린더 스케일
     * @param {any} rep_bond 
     * @returns {THREE.Mesh} 생성된 메쉬
     */
    static generateBond(gr, geom, parent, dpos, radius_scale, rep_bond) {


        const atomA_id = geom.GetAtom1ID();
        const atomA = gr._geomDic[atomA_id];
        if (!atomA) {
            return null;
        }
        const atomB_id = geom.GetAtom2ID();
        const atomB = gr._geomDic[atomB_id];
        if (!atomB) {
            return null;
        }

        let atomADef = AtomDef.GetDefWithNumber(atomA.GetAtomNumber());
        let atomBDef = AtomDef.GetDefWithNumber(atomB.GetAtomNumber());

        let aa = new THREE.Vector3(atomA.GetX(), atomA.GetY(), atomA.GetZ());
        let bb = new THREE.Vector3(atomB.GetX(), atomB.GetY(), atomB.GetZ());

        let ionic = geom.GetTag("i");

        let meshes = GeomMole.createBondMesh(aa, bb, atomADef, atomBDef, ionic, dpos, radius_scale);

        let mesh1 = meshes[0];
        let mesh2 = meshes[1];

        if (rep_bond) {
            gr.updateMeshWithID(mesh1, 0, geom, parent);
            gr.updateMeshWithID(mesh2, 0, geom, parent);

            rep_bond._children.push(mesh1);
            rep_bond._children.push(mesh2);
        } else {
            gr.updateMesh(mesh1, geom, parent);
            gr.updateMeshWithID(mesh2, 0, geom, parent);

            mesh1._children = [];
            mesh1._children.push(mesh2);

        }

        return mesh1;
    }

    /**
     * Bond를 메쉬를 생성한다
     * @param {any} gr geom renderer
     * @param {any} geom geom 객체
     * @param {any} parent geom의 parent
     * @returns {THREE.Mesh} 생성된 메쉬
     */
    static genBond(gr, geom, parent) {
        const type = geom.GetBondType();
        var mesh1;
        switch (type) {
            case 1:
                mesh1 = GeomMole.generateBond(gr, geom, parent, 0, 0.15);
                break;
            case 2:
                mesh1 = GeomMole.generateBond(gr, geom, parent, 0.15, 0.15);
                GeomMole.generateBond(gr, geom, parent, -0.15, 0.15, mesh1);
                break;
            case 3:
                mesh1 = GeomMole.generateBond(gr, geom, parent, 0.15, 0.15);
                GeomMole.generateBond(gr, geom, parent, 0, 0.15, mesh1);
                GeomMole.generateBond(gr, geom, parent, -0.15, 0.15, mesh1);
                break;
        }

        return mesh1;
    }

    /**
     * 원자 메쉬를 생성한다.
     * @param {any} pos 원자 위치
     * @param {any} radius 반지름
     * @param {any} atom_def 원소 정의
     * @param {any} mat 매터리얼
     */
    static createAtomMesh(pos, radius, atom_def, mat) {
        let material = null;
        if (mat) {
            material = mat;
        } else {
            material = new THREE.MeshLambertMaterial({
                color: 0x0000ff,
                vertexColors: false,
            });

        }


        material.color = new THREE.Color(atom_def._color[0], atom_def._color[1], atom_def._color[2]);

        let geometry = GeomMole.getAtomGeometry(atom_def._atom_number, Renderer._renderer);

        const mesh = new THREE.Mesh(geometry, material);
        mesh._mat = material;
        mesh.position.copy(pos);
        mesh.scale.set(radius, radius, radius);

        mesh._originalColorR = atom_def._color[0];
        mesh._originalColorG = atom_def._color[1];
        mesh._originalColorB = atom_def._color[2];

        mesh._disposeMaterial = true;
        mesh._disposeGeometry = false;
        mesh._isAtom = true;
        mesh._atomType = atom_def._atom_number;
        mesh._atomDef = atom_def;

        return mesh;
    }

    /**
     * 유닛 셀 메쉬를 생성한다.
     * @param {any} geom geom 객체
     * @param {any} renderer 렌더러
     */
    static createUnitcellMesh(geom, renderer) {
        let mesh = renderer._geomRenderer.generateOne(geom, null);
        return mesh;
    }

    /**
     * Atom을 생성한다
     * @param {any} gr geom renderer
     * @param {any} geom geom 객체
     * @param {any} parent geom의 parent
     * @returns {THREE.Mesh} 생성된 메쉬
     */
    static genAtom(gr, geom, parent) {

        const atomid = geom.GetAtomNumber();
        let adef = AtomDef._atomNumList[atomid];

        const center = geom.GetCenter();
        let pos = new THREE.Vector3(center[0], center[1], center[2]);

        let mesh = GeomMole.createAtomMesh(pos, 0.3, adef);
        mesh._id = geom.GetID();

        gr.updateMesh(mesh, geom, parent);


        return mesh;
    }

    /**
     * 원자 구 지오메트리를 반환한다.
     * @returns {THREE.Geometry} Geometry
     * */
    static getAtomSphereGeometry() {
        return GeomMole._sphere;
    }

    /**
     * 원소 Geometry 를 반환한다.
     * @param {any} atomid
     * @param {any} renderer
     * @returns {THREE.Geometry} 원소 Geometry
     */
    static getAtomGeometry(atomid, renderer) {
        let geometry = GeomMole._sphere;

        if (GeomMole._atomRenderType == 1) {
            geometry = GeomMole._letterAtomGeom[atomid];
            if (!geometry) {
                let adef = AtomDef.GetDefWithNumber(atomid);
                geometry = GeomMole.createAtomGeometryWithLetter(adef._atom_id, renderer._font);
                GeomMole._letterAtomGeom[atomid] = geometry;
            }
        }

        return geometry;
    }

    /**
     * 원소 기호 모델이 포함된 원소 Geometry 를 생성한다.
     * @param {any} atom_letter
     * @param {any} font
     * @returns {THREE.Geometry} 원소 Geometry
     */
    static createAtomGeometryWithLetter(atom_letter, font) {

        // atom sphere geometry 생성하기
        //let atomSphere = new THREE.SphereBufferGeometry(1, 64, 64);
        let atomSphere = GeomMole._sphere.clone();


        // atom letter geometry 생성하기
        const id = atom_letter;
        const size = 1;

        const depth = 1;
        let fsize = 1;
        let atomFrontLetter = new THREE.TextGeometry(id,
            {
                font: font,
                size: 0.8 * fsize,
                height: 0.1 * fsize,
                curveSegments: 12,
                bevelEnabled: false,
                bevelThickness: 0.005 * fsize,
                bevelSize: 0.01 * fsize,
                bevelOffset: 0,
                bevelSegments: 5
            });

        let fIndex = [];
        for (let i = 0; i < atomFrontLetter.attributes.position.count; ++i) {
            fIndex.push(i);
        }
        atomFrontLetter.index = new THREE.Uint16BufferAttribute(fIndex, 1);

        let shade = 0.3;
        let len = atomFrontLetter.attributes.position.array.length/3;
        let colors = [];
        for (let i = 0; i < len; i++) {
            colors[i * 3 + 0] = shade;
            colors[i * 3 + 1] = shade;
            colors[i * 3 + 2] = shade;
        }
        atomFrontLetter.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));


        atomFrontLetter.scale(size, size, size);
        atomFrontLetter.center();
        atomFrontLetter.translate(0, 0, depth );



        let atomBackLetter = new THREE.TextGeometry(id,
            {
                font: font,
                size: 0.8 * fsize,
                height: 0.1 * fsize,
                curveSegments: 12,
                bevelEnabled: false,
                bevelThickness: 0.005 * fsize,
                bevelSize: 0.01 * fsize,
                bevelOffset: 0,
                bevelSegments: 5
            });

        let bIndex = [];
        for (let i = 0; i < atomBackLetter.attributes.position.count; ++i) {
            bIndex.push(i);
        }
        atomBackLetter.index = new THREE.Uint16BufferAttribute(bIndex, 1);

        //shade = 0.3;
        len = atomBackLetter.attributes.position.array.length / 3;
        colors = [];
        for (let i = 0; i < len; i++) {
            colors[i * 3 + 0] = shade;
            colors[i * 3 + 1] = shade;
            colors[i * 3 + 2] = shade;
        }
        atomBackLetter.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

        atomBackLetter.rotateY(180 * 3.1415 / 180);
        atomBackLetter.scale(size, size, size);
        atomBackLetter.center();
        atomBackLetter.translate(0, 0, -depth );


        let mergedGeometry = BufferGeometryUtils.mergeBufferGeometries([atomSphere, atomBackLetter, atomFrontLetter], false);

        return mergedGeometry;
    }


}