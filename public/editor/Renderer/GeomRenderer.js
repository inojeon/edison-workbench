import * as THREE from '../build/three.module.js';
import { ptSplineV3 } from './ptSpline.js';
import { Spline } from './cubic_spline.js';
import { ProteinTrajectory } from './ProteinTrajectory.js';
import { ptSplinePoint } from './ptSpline.js';
import { AtomDef } from './AtomDef.js';
import { rayLog } from '../Renderer/log.js';
import { GeomMole } from '../Renderer/GeomMole.js';
import { Util } from './Util.js';


/**
 * Geom Renderer 클래스
 * */
export class GeomRenderer {

    /**
     * GeomRenderer 생성자
     * @param {any} api 다른 외부 라이브러리와 연동하기 위한 api 객체
     * @param {any} renderer 렌더러
     * @param {any} point_tex_fn 
     */
    constructor(api, renderer) {

        this._baseID = 0;
        this._group = new THREE.Group();
        this._renderer = renderer;
        renderer._scene.add(this._group);
        this._api = api;

        this._atomMaterial = [];

        this._sphere = new THREE.SphereGeometry(1, 32, 32);

        this._cylinder = new THREE.CylinderGeometry(1, 1, 1, 32).lookAt(new THREE.Vector3(0, 10, 0));
        this._cylinder.deleteAttribute("uv");

        this._materials = [];
        this._current_material = null;
        this._dic = {};
        this._maxid = 0;

        /*
                this._pointVShader = "attribute float size;"+
                    "attribute vec3 customColor;"+
                    "varying vec3 vColor;"+
                    "void main() {"+
                    "   vColor = customColor;"+
                    "   vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);"+
                    "   gl_PointSize = 1.0 ;"+
                    "   gl_Position = projectionMatrix * mvPosition;"+
                    "}";
        
                this._pointPShader = "uniform vec3 color;" +
                    "uniform sampler2D pointTexture;"+
                    "varying vec3 vColor;" +
                    "void main() {" +
                    "gl_FragColor = vec4(color * vColor, 1.0);" +
                    "gl_FragColor = gl_FragColor * texture2D(pointTexture, gl_PointCoord);" +
                    "}";
                    */
        this._genFunctions = [];
        this.initGenFunctions();

        this._trajectoryType = 0;

    }


    /**
     * Base ID를 설정한다.
     * @param {any} base_id
     */
    SetBaseID(base_id) {
        this._baseID = base_id;
        this._api.KRFTextParser.SetBaseID4Load(this._baseID);
    }

    /**
     * 프로그래스바와 함께 문자열로부터 geom 데이터를 로드한다
     * @param {String} data krf text 데이터
     */
    LoadFromStringProgressPrepare(data) {
        var parser = new this._api.KRFTextParser();

        var mb = new this._api.MemoryBlock();
        mb.CreateWithString(data);

        parser.Load(mb);
        //        var cl2 = new this._api.CommandList();
        this._loadingList = parser.GetCommandList();
        this._loadingIdx = 0;

        const num = this._loadingList.GetNumberOfCommands();
        const max_step = Math.ceil(num / 30);
        return max_step;
    }

    /**
     * 일정 수준 이상 로드되면 finished로 처리한다
     * */
    LoadFromStringProgressLoading() {
        const num = this._loadingList.GetNumberOfCommands();
        var finished = false;
        var endidx = this._loadingIdx + 30;
        if (endidx >= num) {
            finished = true;
            endidx = num;
        }

        for (; this._loadingIdx < endidx; this._loadingIdx++) {

            var cmd1 = this._loadingList.GetCommand(this._loadingIdx);
            this.generateOne(cmd1, this._group);
        }

        return finished;
    }

    /**
     * krf text 데이터로부터 geom을 생성한다
     * @param {any} data krf text data
     */
    LoadFromString(data) {
        var parser = new this._api.KRFTextParser();

        var mb = new this._api.MemoryBlock();
        mb.CreateWithString(data);

        parser.Load(mb);
        //        var cl2 = new this._api.CommandList();
        var cl2 = parser.GetCommandList();

        rayLog(3, " cl2 LoadFromString = " + cl2.GetNumberOfCommands());

        const num = cl2.GetNumberOfCommands();

        let geom_list = [];
        for (var i = 0; i < num; i++) {
            var cmd1 = cl2.GetCommand(i);
            geom_list.push(cmd1);
        }

        this.generateGeomDictionary(geom_list);

        for (var i = 0; i < num; i++) {
            rayLog(3, " gen id = " + i);
            var cmd1 = cl2.GetCommand(i);
            this.generateOne(cmd1, this._group);
        }
    }

    /**
     * 데이터 로드 진행율 값을 반환한다.
     * @returns {Number} progress 진행율 값
     * */
    getProgressLoadFromString() {
        return this._progress;
    }

    /**
     * 비동기로 krf text 데이터를 로드한다
     * @param {String} data krf text 데이터
     */
    async LoadFromStringAsync(data) {
        this._progress = 0;

        var parser = new this._api.KRFTextParser();

        var mb = new this._api.MemoryBlock();
        mb.CreateWithString(data);

        await parser.Load(mb);
        this._progress = 0.2;

        //        var cl2 = new this._api.CommandList();
        var cl2 = parser.GetCommandList();

        rayLog(3, " cl2 LoadFromString = " + cl2.GetNumberOfCommands());

        const num = cl2.GetNumberOfCommands();

        for (var i = 0; i < num; i++) {
            rayLog(3, " gen id = " + i);
            var cmd1 = cl2.GetCommand(i);
            await this.generateOneAsync(cmd1, this._group);

            this._progress = 0.2 + i / num * 0.8;
        }

        this._progress = 1;
    }

    /**
     * 아이디에 해당하는 geom을 반환한다
     * @param {Number} id geom id
     * @returns geom
     */
    get(id) {
        return this._dic[id];
    }

    /**
     * max id를 설정한다
     * @param {Number} id
     */
    setMaxID(id) {
        if (this._maxid < id)
            this._maxid = id;
    }

    test1() {

        const fileUrl = '../_testdata/test.krf' // provide file location

        fetch(fileUrl)
            .then(r => r.text())
            .then(t => {
                this.LoadFromString(t);
                //this.deleteOne(2);

                var gg = new this._api.Sphere();
                gg.Set(20, 0, 20, 4);
                gg.SetID(6);
                //this.updateGeom(gg);

                this.addNewGeom(gg, 4);

                this.setColor(4, 1, 1, 1);
                //this.deleteOne(2);

            });

        /*
        var cmd =
            "LineSeg,0,0,0,1,0,0\n" +
            "LineSeg,1,0,0,1,0,1\n" + 
            "Sphere,2,0,2,0.2\n" +
            "Sphere,3,3,3,0.2\n" +
            "Cylinder,2,0,2,3,3,3,0.1\n" 
            ;

        var cl2 = new this._api.CommandList();
        cl2.LoadFromString(cmd);
        console.log(" cl2 LoadFromString = " + cl2.GetNumberOfCommands());

        const num = cl2.GetNumberOfCommands();

        for (var i = 0; i < num; i++) {
            var cmd1 = cl2.GetCommand(i);
            this.generateOne(cmd1);
        }
        */
    }

    /**
     * id에 해당하는 메쉬를 갱신한다
     * @param {any} mesh 메쉬
     * @param {any} id 아이디
     * @param {any} geom geom
     * @param {any} parent geom의 parent
     */
    updateMeshWithID(mesh, id, geom, parent) {
        mesh._id = id;
        mesh._geom = geom;
        mesh._parent = parent;

        if (id != 0) {
            this._dic[id] = mesh;
        }

        if (parent)
            parent.add(mesh);
    }

    // 3.mesh에 geom의 데이터를 넣기
    // mesh._id : geom의 ID. 렌더링 파일의 id
    // mesh._geom : geom의 pointer
    // mesh._parent : 3.js의 mesh parent임. 
    // geomGenerator._dic에는 id로 분류되어 mesh 포인터가 들어감.

    /**
     * 메쉬를 업데이트한다
     * @param {any} mesh _id : geom의 id. 렌더링 파일의 id / _geom : geom의 pointer / _parent : 3.js의 mesh parent / geomGenerator._dic에는 id로 분류되어 mesh 포인터가 들어간다
     * @param {any} geom geom
     * @param {any} parent geom의 parent
     */
    updateMesh(mesh, geom, parent) {
        mesh._id = geom.GetID();
        mesh._geom = geom;
        mesh._parent = parent;

        geom._id = geom.GetID();
        geom._mesh = mesh;

        if (mesh._id != 0) {
            this._dic[mesh._id] = mesh;
        }

        if (parent)
            parent.add(mesh);
    }

    /**
     * mesh 색상을 설정한다
     * @param {any} mesh
     * @param {Number} r 컬러의 red component [0,1]
     * @param {Number} g 컬러의 green component [0,1]
     * @param {Number} b 컬러의 blue component [0,1]
     */
    static _setColor(mesh, r, g, b) {
        if (!mesh)
            return;

        if (mesh._mat)
            mesh._mat.color.setRGB(r, g, b);

        var geom = mesh._geom;
        if (!geom)
            return;

        if (geom.GetType() == 6) { // group

            for (let i = 0; i < mesh.children.length; i++) {
                var child = mesh.children[i];

                GeomRenderer._setColor(child, r, g, b);
            }
        }
    }

    /**
     * mesh의 original color를 설정한다
     * @param {any} mesh 
     * @param {Number} r 컬러의 red component [0,1]
     * @param {Number} g 컬러의 green component [0,1]
     * @param {Number} b 컬러의 blue component [0,1]
     */
    static setOriginalColorWithMesh(mesh, r, g, b) {

        if (!mesh) return;

        mesh._originalColorR = r;
        mesh._originalColorG = g;
        mesh._originalColorB = b;

        GeomRenderer._setColor(mesh, r, g, b);
    }

    /**
     * id에 해당하는 메쉬의 original color를 설정한다
     * @param {Number} id mesh id
     * @param {Number} r 컬러의 red component [0,1]
     * @param {Number} g 컬러의 green component [0,1]
     * @param {Number} b 컬러의 blue component [0,1]
     */
    setOriginalColor(id, r, g, b) {
        var mesh = this._dic[id];
        if (!mesh)
            return;

        mesh._originalColorR = r;
        mesh._originalColorG = g;
        mesh._originalColorB = b;

        GeomRenderer._setColor(mesh, r, g, b);
    }

    /**
     * 원래의 색상으로 복원한다
     * @param {Number} id mesh의 id
     */
    restoreOriginalColor(id) {
        var mesh = this._dic[id];
        if (!mesh)
            return;

        GeomRenderer._setColor(mesh, mesh._originalColorR, mesh._originalColorG, mesh._originalColorB);
    }

    /**
     * 메쉬의 색상을 원래대로 복원한다.
     * @param {THREE.Mesh} mesh 메쉬
     */
    static restoreOriginalColorMesh(mesh) {
        GeomRenderer._setColor(mesh, mesh._originalColorR, mesh._originalColorG, mesh._originalColorB);
    }

    /**
     * 메쉬의 색상을 설정한다
     * @param {Number} id mesh의 id
     * @param {Number} r 컬러의 red component [0,1]
     * @param {Number} g 컬러의 green component [0,1]
     * @param {Number} b 컬러의 blue component [0,1]
     */
    setColor(id, r, g, b) {
        var mesh = this._dic[id];
        if (!mesh)
            return;

        GeomRenderer._setColor(mesh, r, g, b);
    }

    /**
     * preview를 생성한다
     * @param {GeomRenderer} gr GeomRenderer class pointer 이다. Core.Geom을 사용하여 Three.js Mesh를 생성할 때 사용된다.
     * @param {any} geom 생성 할 Core.Geom class pointer 이다.
     * @param {any} parent Core.Geom의 parent pointer 이다.
     */
    genPreview(gr, geom, parent) {
        var group = new gr._api.Group();

        geom.GeneratePreview(group);
        group.SetID(geom.GetID());

        var ret = gr.generateOne(group, parent);

        return ret;
    }

    /**
     * lineseg를 생성한다
     * @param {GeomRenderer} gr GeomRenderer class pointer 이다. Core.Geom을 사용하여 Three.js Mesh를 생성할 때 사용된다.
     * @param {any} geom 생성 할 Core.Geom class pointer 이다.
     * @param {any} parent Core.Geom의 parent pointer 이다.
     */
    genLineSeg(gr, geom, parent) {

        const points = [];
        const p1 = geom.Get(0);
        const p2 = geom.Get(1);
        points.push(new THREE.Vector3(p1[0], p1[1], p1[2]));
        points.push(new THREE.Vector3(p2[0], p2[1], p2[2]));

        const geometry = new THREE.BufferGeometry().setFromPoints(points);

        var mat = null;

        var material = new THREE.MeshBasicMaterial({
            color: 0xff0000
        });

        const mesh = new THREE.Line(geometry, material);
        mesh._mat = material;

        gr.updateMesh(mesh, geom, parent);

        return mesh;
    }

    /**
     * group을 생성한다
     * @param {GeomRenderer} gr GeomRenderer class pointer 이다. Core.Geom을 사용하여 Three.js Mesh를 생성할 때 사용된다.
     * @param {any} geom 생성 할 Core.Geom class pointer 이다.
     * @param {any} parent Core.Geom의 parent pointer 이다.
     */
    genGroup(gr, geom, parent) {
        var mesh = new THREE.Group();

        gr.updateMesh(mesh, geom, parent);


        const num = geom.GetNumberOfChildren();

        for (var i = 0; i < num; i++) {
            var child = geom.Get(i);
            var cmesh = gr.__generateOne(child, mesh);
        }


        return mesh;
    }

    // 라인리스트 임. 
    /**
     * polyline을 생성한다
     * @param {GeomRenderer} gr GeomRenderer class pointer 이다. Core.Geom을 사용하여 Three.js Mesh를 생성할 때 사용된다.
     * @param {any} geom 생성 할 Core.Geom class pointer 이다.
     * @param {any} parent Core.Geom의 parent pointer 이다.
     */
    genPLine(gr, geom, parent) {

        //const p1x = geom.GetData(0);

        const points = [];
        //const p1 = geom.GetPoint(0);
        //const p2 = geom.GetPoint(1);

        const num = geom.GetNumberOfPoints();
        for (var i = 0; i < num; i++) {
            const pp = geom.GetPoint(i);
            const tp = new THREE.Vector3(pp[0], pp[1], pp[2]);
            points.push(tp);
        }


        const geometry = new THREE.BufferGeometry().setFromPoints(points);

        var material = new THREE.MeshBasicMaterial({
            color: 0xff0000
        });

        const mesh = new THREE.Line(geometry, material);
        mesh._mat = material;

        gr.updateMesh(mesh, geom, parent);



        return mesh;
    }



    /**
     * sphere geometry 를 생성한다
     * @param {array} vlist vertex list : number의 list
     * @param {number} vidx vertex index : vlist에서 vertex가 시작하는 위치
     * @param {array} nlist normal list
     * @param {number} nidx normal index : nlist에서 normal이 시작하는 위치
     * @param {array} ilist index list
     * @param {number} iidx index index 에서 시작하는 위치
     * @param {array} vclist vertex color의 list
     * @param {Vector3} center center of the sphere
     * @param {number} radius radius of the sphere
     * @param {array} color the sphere 의 컬러
     * @param {number} lat_furfaces sphere 생성 시 위도 당 polygon 수
     * @param {number} lon_furfaces sphere 생성 시 경도 당 polygon 수
     * 
     */
    static genGeomSphere(vlist, vidx, nlist, nidx, ilist, iidx, vclist, center, radius, color, lat_furfaces, lon_furfaces) {

        let start_vidx = vidx;

        const thetaLength = Math.PI * 2;
        const thetaStart = 0;
        const thetaEnd = thetaLength - thetaStart;

        const phiStart = 0;
        const phiLength = Math.PI * 2;

        const widthSegments = lat_furfaces;
        const heightSegements = lon_furfaces;

        let index = (vidx + 1) / 3;
        const grid = [];

        const vertex = new THREE.Vector3();
        const normal = new THREE.Vector3();


        for (let iy = 0; iy <= heightSegements; ++iy) {

            const verticesRow = [];
            const v = iy / heightSegements;

            // special case for the poles

            let uOffset = 0;
            if (iy == 0 && thetaStart == 0) {
                uOffset = 0.5 / widthSegments;
            }
            else if (iy == heightSegements && thetaEnd == Math.PI) {
                uOffset = -0.5 / widthSegments;
            }

            for (let ix = 0; ix <= widthSegments; ++ix) {
                const u = ix / widthSegments;

                vertex.x = - radius * Math.cos(phiStart + u * phiLength) * Math.sin(thetaStart + v * thetaLength);
                vertex.y = radius * Math.cos(thetaStart + v * thetaLength);
                vertex.z = radius * Math.sin(phiStart + u * phiLength) * Math.sin(thetaStart + v * thetaLength);
                vlist[vidx++] = vertex.x + center.x;
                vlist[vidx++] = vertex.y + center.y;
                vlist[vidx++] = vertex.z + center.z;

                normal.copy(vertex).normalize();
                nlist[nidx++] = normal.x;
                nlist[nidx++] = normal.y;
                nlist[nidx++] = normal.z;

                verticesRow.push(index++);
            }

            grid.push(verticesRow);
        }

        for (let iy = 0; iy < heightSegements; ++iy) {

            for (let ix = 0; ix < widthSegments; ++ix) {

                const a = grid[iy][ix + 1];
                const b = grid[iy][ix];
                const c = grid[iy + 1][ix];
                const d = grid[iy + 1][ix + 1];

                // 상단 pole인 경우 생략
                if (iy !== 0 || thetaStart > 0) {
                    ilist[iidx++] = a;
                    ilist[iidx++] = b;
                    ilist[iidx++] = d;
                }

                // 하단 pole인 경우 생략
                if (iy !== heightSegements - 1 || thetaEnd < Math.PI) {
                    ilist[iidx++] = b;
                    ilist[iidx++] = c;
                    ilist[iidx++] = d;
                }
            }
        }

        return [vidx, nidx, iidx];

    }

    /**
     * sphere geometry 를 생성 할 때 필요한 index(number*3), vertex(number*3) 수를 구한다. 
     * @param {number} lat_furfaces sphere 생성 시 위도 당 polygon 수
     * @param {number} lon_furfaces sphere 생성 시 경도 당 polygon 수
     */
    static getSizeGeomSphere(lat_furfaces, lon_furfaces) {

        let numOfVertex = (lat_furfaces + 1) * (lon_furfaces + 1) * 3;
        let numOfIndex = lat_furfaces * lon_furfaces * 6 - 3 * lon_furfaces - 3 * lat_furfaces;

        return [numOfIndex, numOfVertex];
    }

    /**
     * cylinder geometry 를 생성한다
     * @param {array} vlist vertex list : number의 list
     * @param {number} vidx vertex index : vlist에서 vertex가 시작하는 위치
     * @param {array} nlist normal list
     * @param {number} nidx normal index : nlist에서 normal이 시작하는 위치
     * @param {array} ilist index list
     * @param {number} iidx index index 에서 시작하는 위치
     * @param {array} vclist vertex color의 list
     * @param {Vector3} p1 cylinder의 시작점
     * @param {Vector3} p2 cylinder의 끝 점
     * @param {number} radius cylinder의 반지름
     * @param {array} color the sphere 의 컬러
     * @param {number} num_furfaces cylinder 를 생성시 360도 당 polygon의 수
     */
    static genGeomCylinder(vlist, vidx, nlist, nidx, ilist, iidx, vclist, p1, p2, radius, color, num_furfaces) {

        let vertex = new THREE.Vector3();
        let normal = new THREE.Vector3();

        const center_diff = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(1 / 2);
        const height = p1.distanceTo(p2);
        const halfHeight = height / 2;
        const thetaStart = 0;
        const thetaLength = Math.PI * 2;
        const slope = 0;

        const radialSegments = num_furfaces;
        const heightSegments = 1;

        let mat = new THREE.Matrix4();
        mat.set(
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        );

        let quaternion = new THREE.Quaternion();
        let basis = new THREE.Vector3(0, 1, 0);
        let rotation_diff = new THREE.Vector3();
        rotation_diff.subVectors(p1, p2);
        quaternion.setFromUnitVectors(basis, rotation_diff.normalize());
        let index = (vidx + 1) / 3;
        const indexArray = [];

        for (let y = 0; y <= heightSegments; ++y) {
            const indexRow = [];
            const v = y / heightSegments;

            for (let x = 0; x <= radialSegments; ++x) {

                const u = x / radialSegments;

                const theta = u * thetaLength + thetaStart;

                const sinTheta = Math.sin(theta);
                const cosTheta = Math.cos(theta);

                vertex.x = radius * sinTheta;
                vertex.y = -v * height + halfHeight;
                vertex.z = radius * cosTheta;

                normal.set(sinTheta, slope, cosTheta).applyQuaternion(quaternion).normalize();

                vertex.applyQuaternion(quaternion);
                vertex.add(center_diff);

                vlist[vidx++] = vertex.x;
                vlist[vidx++] = vertex.y;
                vlist[vidx++] = vertex.z;

                nlist[nidx++] = normal.x;
                nlist[nidx++] = normal.y;
                nlist[nidx++] = normal.z;

                indexRow.push(index++);
            }

            indexArray.push(indexRow);
        }

        for (let x = 0; x < radialSegments; ++x) {

            for (let y = 0; y < heightSegments; ++y) {
                const a = indexArray[y][x];
                const b = indexArray[y + 1][x];
                const c = indexArray[y + 1][x + 1];
                const d = indexArray[y][x + 1];

                ilist[iidx++] = a;
                ilist[iidx++] = b;
                ilist[iidx++] = d;

                ilist[iidx++] = b;
                ilist[iidx++] = c;
                ilist[iidx++] = d;
            }
        }

        return [vidx, nidx, iidx];
    }

    /**
     * cylinder geometry 를 생성할 때 필요한 index, vertex 의 수를 계산한다. 
     * @param {number} num_furfaces cylinder 를 생성시 360도 당 polygon의 수
     */
    static getSizeGeomCylinder(num_furfaces) {

        return [num_furfaces * 6, (num_furfaces + 1) * 6];
    }

    /**
     * sphere를 생성한다
     * @param {GeomRenderer} gr GeomRenderer class pointer
     * @param {any} geom 생성 할 geom class pointer
     * @param {any} parent geom의 parent pointer
     */
    genSphere(gr, geom, parent) {

        const center = geom.GetCenter();
        const radius = geom.GetRadius();

        var material = new THREE.MeshLambertMaterial({
            color: 0x0000ff
        });

        const mesh = new THREE.Mesh(gr._sphere, material);
        mesh._mat = material;
        mesh.position.fromArray(center, 0);
        mesh.scale.set(radius, radius, radius);

        mesh._originalColorR = 0x0 / 0xff;
        mesh._originalColorG = 0x0 / 0xff;
        mesh._originalColorB = 0xff / 0xff;

        mesh._disposeMaterial = true;
        mesh._disposeGeometry = false;

        gr.updateMesh(mesh, geom, parent);


        return mesh;
    }

    /**
     * mesh를 생성한다
     * @param {GeomRenderer} gr GeomRenderer class pointer 이다. Core.Geom을 사용하여 Three.js Mesh를 생성할 때 사용된다. 
     * @param {any} geom 생성 할 Core.Geom class pointer 이다. 
     * @param {any} parent Core.Geom의 parent pointer 이다. 
     */
    genMesh(gr, geom, parent) {

        const geometry = new THREE.BufferGeometry();

        const nVtx = geom.GetNumVertex();
        const nTri = geom.GetNumTris();

        for (var i = 0; i < nVtx; i++) {
            const x = geom.GetVertexData(i * 3 + 0);
            const y = geom.GetVertexData(i * 3 + 1);
            const z = geom.GetVertexData(i * 3 + 2);
            geometry.vertices.push(new THREE.Vector3(x, y, z));
        }

        for (var i = 0; i < nTri; i++) {
            const i1 = geom.GetTriIndex(i * 3 + 0);
            const i2 = geom.GetTriIndex(i * 3 + 1);
            const i3 = geom.GetTriIndex(i * 3 + 2);

            geometry.faces.push(new THREE.Face3(i1, i3, i2));
        }

        geometry.computeFaceNormals();
        geometry.computeBoundingSphere();

        var material = new THREE.MeshLambertMaterial({
            color: 0xffffff
        });

        var mesh = new THREE.Mesh(geometry, material);
        mesh._mat = material;

        gr.updateMesh(mesh, geom, parent);


        return mesh;
    }

    /**
     * material을 생성한다
     * @param {GeomRenderer} gr GeomRenderer class pointer 이다. Core.Geom을 사용하여 Three.js Mesh를 생성할 때 사용된다.
     * @param {any} geom 생성 할 Core.Geom class pointer 이다.
     * @param {any} parent Core.Geom의 parent pointer 이다.
     */
    genMaterial(gr, geom, parent) {
        var cc = geom.GetColor();
        const color = cc[0] * 256 * 256 + cc[1] * 256 + cc[2];
        const name = geom.GetName();

        var material = new THREE.MeshLambertMaterial({
            color: color
        });

        gr._materials[name] = material;
        gr._current_material = material;

        mat._id = geom.GetID();

        return null;
    }


    /**
     * spline을 생성한다
     * @param {GeomRenderer} gr GeomRenderer class pointer 이다. Core.Geom을 사용하여 Three.js Mesh를 생성할 때 사용된다.
     * @param {any} geom 생성 할 Core.Geom class pointer 이다.
     * @param {any} parent Core.Geom의 parent pointer 이다.
     */
    genSpline(gr, geom, parent) {
        const len = geom.GetNumberOfPoints();

        const points = [];
        //const p1 = geom.GetPoint(0);
        //const p2 = geom.GetPoint(1);


        const num = geom.GetNumberOfPoints();
        var spt = [];
        var spx = [];
        var spy = [];
        var spz = [];

        for (var i = 0; i < num; i++) {
            const p2 = geom.GetPoint(i);

            spt.push(i);
            spx.push(p2[0]);
            spy.push(p2[1]);
            spz.push(p2[2]);
        }



        var spline_x = new Spline(spt, spx);
        var spline_y = new Spline(spt, spy);
        var spline_z = new Spline(spt, spz);

        for (var j = 0; j <= num - 1; j += 0.002) {
            const x = spline_x.at(j);
            const y = spline_y.at(j);
            const z = spline_z.at(j);
            if (isNaN(x) || isNaN(y) || isNaN(z)
            ) {
                var ttt = 323;
            }
            points.push(new THREE.Vector3(x, y, z));
        }

        const geometry = new THREE.BufferGeometry().setFromPoints(points);

        var material = new THREE.MeshBasicMaterial({
            color: 0xff0000
        });

        const mesh = new THREE.Line(geometry, material);
        mesh._mat = material;

        gr.updateMesh(mesh, geom, parent);
        return mesh;
    }

    /**
     * protein trajectory를 생성한다
     * @param {GeomRenderer} gr GeomRenderer class pointer 이다. Core.Geom을 사용하여 Three.js Mesh를 생성할 때 사용된다.
     * @param {any} geom 생성 할 Core.Geom class pointer 이다.
     * @param {any} parent Core.Geom의 parent pointer 이다.
     */
    genProteinTrajectory(gr, geom, parent) {
        ProteinTrajectory.genProteinTrajectory(gr, geom, parent);
    }


    /**
    * point를 생성한다
     * @param {GeomRenderer} gr GeomRenderer class pointer 이다. Core.Geom을 사용하여 Three.js Mesh를 생성할 때 사용된다.
     * @param {any} geom 생성 할 Core.Geom class pointer 이다.
     * @param {any} parent Core.Geom의 parent pointer 이다.
    */
    genPoints(gr, geom, parent) {

        const amount = geom.GetNumberOfPoints();
        let vertices = [];

        for (let i = 0; i < amount; i++) {

            var pos = geom.GetPoint(i);
            vertices.push(pos[0], pos[1], pos[2]);
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

        //
        var material = new THREE.PointsMaterial({ size: 5, sizeAttenuation: false, color: 0xff00000 });
        //

        var mesh = new THREE.Points(geometry, material);
        mesh._mat = material;

        gr.updateMesh(mesh, geom, parent);
        return mesh;
    }

    /**
     * Cylinder geometry를 생성한다.
     * @param {any} gr
     * @param {any} pos1
     * @param {any} pos2
     * @param {any} radius
     */
    static createCylinderGeometry(gr, pos1, pos2, radius) {
        var a = pos1;
        var b = pos2;
        var center = new THREE.Vector3(a.x, a.y, a.z).add(b).multiplyScalar(0.5);;

        const len = b.sub(a).length();

        let geometry = gr._cylinder.clone();

        let up = new THREE.Vector3(0, 1, 0);

        let mat1 = new THREE.Matrix4();
        mat1.lookAt(center, a, up);

        let mat2 = new THREE.Matrix4();
        mat2.makeScale(radius, radius, len);

        let mat3 = new THREE.Matrix4();
        mat3.makeTranslation (center.x, center.y, center.z);

        //        mat2.multiply(mat3).multiply(mat1);
        mat3.multiply(mat1).multiply(mat2);

        geometry.applyMatrix4(mat3);

        return geometry;
    }

    /**
     * Cylinder Mesh를 생성한다.
     * @param {any} gr
     * @param {any} pos1
     * @param {any} pos2
     * @param {any} radius
     * @param {any} color
     */
    static createCylinderMesh(gr, pos1, pos2, radius, color) {
        var a = pos1;
        var b = pos2;
        var center = new THREE.Vector3(a.x, a.y, a.z).add(b).multiplyScalar(0.5);;

        const len = b.sub(a).length();
        var mat = new THREE.MeshLambertMaterial();

        mat.color.r = color[0];
        mat.color.g = color[1];
        mat.color.b = color[2];

        var mesh = new THREE.Mesh(gr._cylinder, mat);
        mesh.position.x = center.x;
        mesh.position.y = center.y;
        mesh.position.z = center.z;
        mesh.lookAt(a);

        mesh._mat = mat;
        mesh._originalColorR = color[0];
        mesh._originalColorG = color[1];
        mesh._originalColorB = color[2];

        mesh._disposeMaterial = true;
        mesh._disposeGeometry = false;


        //object.scale.set(len, geom.GetRadius(), geom.GetRadius());
        mesh.scale.set(radius, radius, len);

        return mesh;
    }

    /**
    * cylinder을 생성한다
     * @param {GeomRenderer} gr GeomRenderer class pointer 이다. Core.Geom을 사용하여 Three.js Mesh를 생성할 때 사용된다.
     * @param {any} geom 생성 할 Core.Geom class pointer 이다.
     * @param {any} parent Core.Geom의 parent pointer 이다.
    */
    genCylinder(gr, geom, parent) {

        var aa = geom.GetPosition1();
        var bb = geom.GetPosition2();

        var a = new THREE.Vector3(aa[0], aa[1], aa[2]);
        var b = new THREE.Vector3(bb[0], bb[1], bb[2]);
        var mesh = GeomRenderer.createCylinderMesh(gr, a, b, geom.GetRadius(),[0.5,0.5,0.5]);


        gr.updateMesh(mesh, geom, parent);


        return mesh;

    }

    /**
     * Generate 함수들을 초기화한다
     * */
    initGenFunctions() {
        this._genFunctions[1] = this.genLineSeg;
        this._genFunctions[2] = this.genPLine;
        this._genFunctions[4] = this.genPreview;
        this._genFunctions[6] = this.genGroup;
        this._genFunctions[7] = this.genSphere;
        this._genFunctions[8] = this.genCylinder;
        this._genFunctions[9] = this.genMesh;
        this._genFunctions[10] = this.genMaterial;
        this._genFunctions[11] = this.genSpline;
        this._genFunctions[13] = this.genPoints;
        this._genFunctions[14] = this.genProteinTrajectory;
        this._genFunctions[15] = this.genPreview;

        this._genFunctions[17] = GeomMole.genAtom;
        this._genFunctions[18] = GeomMole.genBond;
    }
    /**
     * 인덱스에 해당하는 함수를 설정한다
     * @param {Number} index 인덱스
     * @param {Function} func 함수
     */
    setGenFunction(index, func) {
        this._genFunctions[index] = func;
    }

    /**
     * 타입에 따른 기하 오브젝트를 비동기 생성한다
     * @param {any} geom geom
     * @param {any} parent geom의 parent
     */
    async generateOneAsync(geom, parent) {
        return await this.generateOne(geom, parent);
    }

    /**
     * geom 데이터 딕셔너리를 생성한다.
     * @param {any} geom_list geom 리스트
     */
    generateGeomDictionary(geom_list) {
        this._geomDic = {};

        for (let i in geom_list) {
            let geom = geom_list[i];
            Util.makeGeomDic(this._geomDic, geom);
        }        
    }


    /**
     * 타입에 따른 기하 오브젝트를 생성한다
     * @param {any} geom geom
     * @param {any} parent geom의 parent
     */
    generateOne(geom, parent) {

        let mesh = this.__generateOne(geom, parent);
        return mesh;
    }

    /**
     * 타입에 따른 기하 오브젝트를 생성한다
     * @param {any} geom
     * @param {any} parent
     */
    __generateOne(geom, parent) {
        if (!geom)
            return;

        if (geom.GetID() == -1) {
            this._maxid++;
            geom.SetID(this._maxid);
        } else {
            this.setMaxID(geom.GetID());
        }



        var type = geom.GetType();
        var mesh;

        if (this._genFunctions[type] != null) {
            mesh = this._genFunctions[type](this, geom, parent);
        }



        return mesh;
    }

    /**
     * geom list에 있는 오브젝트들을 생성한다
     * @param {Array} geom_list geom array
    generateWithArray(geom_list) {

        this._dic = {};

        geom_list.foreach(function (geom) {
            this.generateOne(geom, this._group);
        });
    }
     */

    /**
     * geom들을 모두 clear한다
     * */
    clear() {
        const len = this._group.children.length;

        for (var i = len - 1; i >= 0; i--) {
            var obj = this._group.children[i];
            const id = obj._geom.GetID();
            this.deleteOne(id);
        }

        this._maxid = 0;

        this._dic = {};
    }

    /**
     * id에 해당하는 geom을 삭제한다
     * @param {Number} id geom id
     */
    deleteOne(id) {
        var prev = this._dic[id];

        if (prev == null) {
            return;
        }

        var geom = prev._geom;

        if (geom.GetType() == 6) // group
        {
            const size = geom.GetNumberOfChildren();
            for (var i = 0; i < size; i++) {
                var gg = geom.Get(i);

                if (gg.GetID() == 0) {
                    // id가 0이면 dic에 넣지 않고 생성만 한다. 
                    // parent에서 빼준다. 
                    //gg._mesh.parent.remove(gg._mesh);
                } else {
                    this.deleteOne(gg.GetID());
                }
            }
        }

        this._dic[id] = null;
        prev.parent.remove(prev);

        if (prev._disposeGeometry) {
            prev.geometry.dispose();
        }

        if (prev._disposeMaterial) {
            prev.material.dispose();
        }


        //delete prev;
    }

    // 생성해서 추가 한다는 의미임. 기존에 같은 id가 존재하면 해당 id의 mesh, geom을 삭제하고 추가함. 
    //generateNaddGeom

    /**
     * geom을 업데이트한다
     * @param {any} geom
     */
    updateGeom(geom) {
        var id = geom.GetID();

        var prev = this._dic[id];

        var mesh;
        if (prev) {
            mesh = this.generateOne(geom, prev._parent);
            var parent = prev.parent;
            parent.attach(mesh);
            parent.remove(prev);
            if (mesh._id != 0)
                this._dic[mesh._id] = mesh;
        } else {
            mesh = this.generateOne(geom, this._group);
            var parent = this._group;
            parent.attach(mesh);
            if (mesh._id != 0)
                this._dic[mesh._id] = mesh;
        }

        return mesh;
    }

    /**
     * 새로운 geom을 추가한다
     * @param {any} geom geom
     * @param {any} parent_id geom의 parent_id
     */
    addNewGeom(geom, parent_id) {
        var id = geom.GetID();

        var parent;
        if (parent_id) {
            parent = this.get(parent_id);
            if (!parent)
                parent = this._group;
        } else {
            parent = this._group;
        }

        var pgeom = parent._geom;

        if (pgeom)
            if (pgeom.GetType() == 6) { // group
                pgeom.Add(geom);
            }

        var mesh;
        mesh = this.generateOne(geom, parent);

        parent.attach(mesh);

        if (mesh._id != 0)
            this._dic[mesh._id] = mesh;

        return mesh;
    }

    /**
     * 새로운 geom을 추가한다
     * @param {any} geom
     */
    addNewGeom2(geom) {
        var id = geom.GetID();

        var mesh;
        mesh = this.generateOne(geom, null);

        if (mesh._id != 0)
            this._dic[mesh._id] = mesh;

        return mesh;
    }

    /**
     * 단일 메쉬로 분자 메쉬를 생성한다.
     * @param {any} alist
     * @param {any} blist
     */
    generateOneMeshMole(alist, blist) {

        let atom;
        let bond;
        let position1, position2;

        let vlist = [], vidx = 0, nlist = [], nidx = 0, ilist = [], iidx = 0,
            vclist = [], color = new THREE.Color(0x000000),
            lat_furfaces = 30, lon_furfaces = 30, num_furfaces = 30;

        let sphereSize = GeomRenderer.getSizeGeomSphere(lat_furfaces, lon_furfaces);
        let cylinderSize = GeomRenderer.getSizeGeomCylinder(num_furfaces);

        let len1 = sphereSize[1] * alist.length + cylinderSize[1] * blist.length;
        let len2 = sphereSize[0] * alist.length + cylinderSize[0] * blist.length;

        vlist = new Array(len1);
        nlist = new Array(len1);
        ilist = new Array(len2);

        for (let i = 0; i < alist.length; ++i) {
            atom = alist[i];
            [vidx, nidx, iidx] = GeomRenderer.genGeomSphere(vlist, vidx, nlist, nidx, ilist, iidx, vclist, atom._position, 0.4, color, lat_furfaces, lon_furfaces);
        }

        for (let i = 0; i < blist.length; ++i) {
            bond = blist[i];
            if (bond.position1.x) {
                continue;
            }
            else {
                position1 = new THREE.Vector3(
                    bond.position1[0],
                    bond.position1[1],
                    bond.position1[2]
                );

                position2 = new THREE.Vector3(
                    bond.position2[0],
                    bond.position2[1],
                    bond.position2[2]
                );
            }
            [vidx, nidx, iidx] = GeomRenderer.genGeomCylinder(vlist, vidx, nlist, nidx, ilist, iidx, vclist, position1, position2, bond.radius, color, num_furfaces);
        }

        let geometry = new THREE.BufferGeometry();
        const positionAttr = new THREE.Float32BufferAttribute(vlist, 3);
        const normalAttr = new THREE.Float32BufferAttribute(nlist, 3);
        const count = vlist.length;

        geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(count * 3), 3));
        geometry.setAttribute('position', positionAttr);
        geometry.setAttribute('normal', normalAttr);
        geometry.setIndex(ilist);

        const colors = geometry.attributes.color;

        for (let i = 0; i < count; ++i) {
            color.setRGB(0, 0, 1);
            colors.setXYZ(i, color.r, color.g, color.b);
        }

        let uniforms = {};
        uniforms = THREE.UniformsUtils.merge([
            uniforms,
            THREE.UniformsLib['lights']
        ]);

        let material = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexColors: true,
            fragmentShader: lambertLightFragmentShader(),
            vertexShader: vertexShader(),
            lights: true,
        });

        let mesh = new THREE.Mesh(geometry, material);

        this._renderer._scene.add(mesh);
    }

    /**
     * 문자 데이터를 여러개의 메쉬로 생성한다.
     * @param {any} alist
     * @param {any} blist
     */
    generateMoleWithMultipleMesh(alist, blist) {
        let atom;
        let bond;
        let quaternion = new THREE.Quaternion();
        let basis = new THREE.Vector3(0, 1, 0);
        let rotation_diff = new THREE.Vector3();
        let position1, position2;
        let pos = new THREE.Vector3();
        let material = new THREE.MeshBasicMaterial({ color: 0x4488aa, side: THREE.DoubleSide });
        let lat_furfaces = 30, lon_furfaces = 30, num_furfaces = 30;

        for (let i = 0; i < alist.length; ++i) {
            atom = alist[i];
            let geometry = new THREE.SphereBufferGeometry(0.4, lat_furfaces, lon_furfaces);
            let mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(atom._position.x, atom._position.y, atom._position.z);
            this._renderer._scene.add(mesh);
        }

        for (let i = 0; i < blist.length; ++i) {
            bond = blist[i];
            if (bond.position1.x) {
                continue;
            }
            else {
                position1 = new THREE.Vector3(
                    bond.position1[0],
                    bond.position1[1],
                    bond.position1[2]
                );

                position2 = new THREE.Vector3(
                    bond.position2[0],
                    bond.position2[1],
                    bond.position2[2]
                );
            }

            let dist = position1.distanceTo(position2);
            let geometry = new THREE.CylinderBufferGeometry(bond.radius, bond.radialSegments, dist, num_furfaces, 1, true);
            let mesh = new THREE.Mesh(geometry, material);
            pos.addVectors(position1, position2).multiplyScalar(1 / 2);
            rotation_diff.subVectors(position1, position2);
            quaternion.setFromUnitVectors(basis, rotation_diff.normalize());

            mesh.applyQuaternion(quaternion);
            mesh.position.set(pos.x, pos.y, pos.z);

            this._renderer._scene.add(mesh);
        }

    }
}




/**
 * vertex shader를 반환한다
 * */
function vertexShader() {
    return `
    varying vec3 vUv; 
    varying vec4 modelViewPosition; 
    varying vec3 vecNormal;
    varying vec3 v_color;

    void main() {
      v_color = vec3(color);
      vUv = position; 
      vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
      vecNormal = (modelViewMatrix * vec4(normal, 0.0)).xyz; //????????
      gl_Position = projectionMatrix * modelViewPosition; 
    }
  `;
}


/**
 * lambert light fragment shader를 반환한다
 * */
function lambertLightFragmentShader() {
    return `

    varying vec3 v_color;

    struct PointLight {
        vec3 color;
        vec3 position;
        float distance; 
      };  
      uniform PointLight pointLights[NUM_POINT_LIGHTS];
      varying vec3 vUv;
      varying vec4 modelViewPosition; 
      varying vec3 vecNormal; 

      void main() {
        vec4 addedLights = vec4(0.1, 0.1, 0.1, 1.0);

        for(int l = 0; l < NUM_POINT_LIGHTS; l++) {
            vec3 lightDirection = normalize(modelViewPosition.xyz - pointLights[l].position - cameraPosition);
            addedLights.rgb += clamp(dot(-lightDirection, vecNormal), 0.0, 1.0) * pointLights[l].color; //'light intensity' 
        }

        vec3 colorAndPointLight = v_color * addedLights.rgb;
        vec3 finalColor = vec3(colorAndPointLight.r + 0.3, colorAndPointLight.g + 0.3, colorAndPointLight.b + 0.3);

        gl_FragColor = vec4(finalColor, 1.0);
        
      }
    `
}