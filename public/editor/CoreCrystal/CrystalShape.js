import * as THREE from '../build/three.module.js';
import { ConvexGeometry } from '../Renderer/jsm/geometries/ConvexGeometry.js';

/**
 * Crystal Shape 렌더링 모델 관리 클래스
 * */
export class CrystalShape {

    /**
     * 클래스 생성자
     * @param {THREE.Group} parent 렌더링 오브젝트 그룹
     */
    constructor(parent) {
        this._parent = parent;

        this._visible = true;
        //this._visibleEdge = false;
        this._wireframe = false;

        this._root = null;
        this._mesh = null;
        this._wire = null;

        this._meshColor = [1, .5, 0];
        this._wireColor = [1, .5, 0];
        this._opacity = 0.5;
    }

    /**
     * 정점이 Plane Half space 안에 포함되는지 확인한다.
     * @param {THREE.Vector3} v 정점 좌표
     * @param {THREE.Plane} plane half space plane
     * @returns {Boolean} 정점의 half space 포함 여부
     */
    _vertexInnerHalfSpace(v, plane) {

        const vp_dist = plane.distanceToPoint(v);

        if (vp_dist < 0.001)
            return true;

        return false;
    }

    /**
     * 3개의 Plane의 교차점을 구한다.
     * @param {THREE.Plane} p1 평면 1
     * @param {THREE.Plane} p2 평면 2
     * @param {THREE.Plane} p3 평면 3
     * @returns {THREE.Vector3} intersection or null
     */
    _vertIntersectPlanes(p1, p2, p3) {

        let n1 = p1.normal, n2 = p2.normal, n3 = p3.normal;
        let x1 = p1.coplanarPoint(new THREE.Vector3());
        let x2 = p2.coplanarPoint(new THREE.Vector3());
        let x3 = p3.coplanarPoint(new THREE.Vector3());
        let f1 = new THREE.Vector3().crossVectors(n2, n3).multiplyScalar(x1.dot(n1));
        let f2 = new THREE.Vector3().crossVectors(n3, n1).multiplyScalar(x2.dot(n2));
        let f3 = new THREE.Vector3().crossVectors(n1, n2).multiplyScalar(x3.dot(n3));
        let det = new THREE.Matrix3().set(n1.x, n1.y, n1.z, n2.x, n2.y, n2.z, n3.x, n3.y, n3.z).determinant();

        if (isNaN(det)) {
            return null;
        }

        if (det < 0.0001 && det > -0.0001)
            return null;

        let vectorSum = new THREE.Vector3().add(f1).add(f2).add(f3);

        if (isNaN(vectorSum.x) || isNaN(vectorSum.y) || isNaN(vectorSum.z)) {
            return null;
        }

        let planeIntersection = new THREE.Vector3(vectorSum.x / det, vectorSum.y / det, vectorSum.z / det);
        return planeIntersection;
    }

    /**
     * THREE.Plane 데이터를 사용하여 Crystal Shape을 생성한다.
     * @param {Array} planes THREE.Plane list
     */
    generateWithThreePlanes(planes) {

        this.dispose();


        var points = [];
        var c_points = [];

        var n = planes.length;

        // find all vertices from any 3 planes' intersection
        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                for (let k = j + 1; k < n; k++) {
                    let intrV = this._vertIntersectPlanes(planes[i], planes[j], planes[k]);
                    if (intrV) {
                        //console.log("add intr point " + intrV.x + "," + intrV.y + "," + intrV.z);
                        points.push(intrV);
                    }
                }
            }
        }

        // exclude vertices outer region of all half space intersection volume.
        for (let p of points) {
            var inner = true;
            for (let pl of planes) {
                if (!this._vertexInnerHalfSpace(p, pl)) {
                    inner = false;
                    break;
                }
            }

            if (inner) {
                let ex = false;
                for (let cp of c_points) {
                    if (cp.distanceTo(p) < 0.001) {
                        ex = true;
                        break;
                    }
                }

                if (!ex)
                    c_points.push(p);
            }
        }

        console.log("[CrystalShapes] " + c_points.length + " plane-intersection points");

        if (c_points.length < 4) {
            return;
        }

        // generate convex geometry and mesh with vertices.

        const meshMaterial = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            opacity: this._opacity,
            transparent: true,
        });
        if (planes[0]) {
            meshMaterial.color.r = planes[0]._color[0];
            meshMaterial.color.g = planes[0]._color[1];
            meshMaterial.color.b = planes[0]._color[2];
        }
        const ch = new ConvexGeometry(c_points);
        const mesh1 = new THREE.Mesh(ch, meshMaterial);

        mesh1._crystalFace = true;

        const bbwire = new THREE.WireframeGeometry(ch);
        const bboxWire = new THREE.LineSegments(bbwire);
        bboxWire.material.opacity = 1.0;
        if (planes[0]) {
            bboxWire.material.color.r = planes[0]._color[0];
            bboxWire.material.color.g = planes[0]._color[1];
            bboxWire.material.color.b = planes[0]._color[2];
        }
        bboxWire.material.transparent = true;

        this._mesh = mesh1;
        this._wire = bboxWire;

        this._root = new THREE.Group();
        this._root.add(this._mesh);
        this._root.add(this._wire);

        if (this._parent)
            this._parent.add(this._root);

        this.setVisible(this._visible);
        //this.setVisibleEdge(this._visibleEdge);
        this.setWireframe(this._wireframe);
        this.setColor([planes[0]._color[0], planes[0]._color[1], planes[0]._color[2]]);
    }

    /**
     * Crystal Plane 데이터를 사용하여 Crystal Shape을 생성한다.
     * @param {Array} planes Crystal Planes
     */
    generateWithPlanes(planes) {

        let tplanes = [];

        for (let pl of planes) {
            let nplane = new THREE.Plane().setFromNormalAndCoplanarPoint(pl._normal.clone().normalize(), pl._position)
            nplane._color = [pl._color[0], pl._color[1], pl._color[2]];
            tplanes.push(nplane);
        }

        this.generateWithThreePlanes(tplanes);
    }

    /**
     * Crystal Shape 모델 가시화 여부를 설정한다.
     * @param {Boolean} vis Crystal Shape 모델 가시화 여부
     */
    setVisible(vis) {
        this._visible = vis;
        if (this._root) {
            this._root.visible = this._visible;
        }
    }

    /**
     * 렌더링 타입을 wireframe으로 설정할지 정한다.
     * @param {Boolean} wir wireframe 
     */
    setWireframe(wir) {
        this._wireframe = wir;
        if (this._wire) {
            this._wire.visible = this._wireframe;
        }
        if (this._mesh) {
            this._mesh.visible = !this._wireframe;
        }
    }

    /**
     * crystal shape 색상을 설정한다.
     * @param {Array} col color r,g,b
     */
    setColor(col) {
        this._meshColor = [col[0], col[1], col[2]];
        this._wireColor = [col[0], col[1], col[2]];

        if (this._wire) {
            this._wire.material.color.r = this._wireColor[0];
            this._wire.material.color.g = this._wireColor[1];
            this._wire.material.color.b = this._wireColor[2];
        }
        if (this._mesh) {
            this._mesh.material.color.r = this._meshColor[0];
            this._mesh.material.color.g = this._meshColor[1];
            this._mesh.material.color.b = this._meshColor[2];
        }
    }


    /**
     * 렌더링 리소스를 해제한다.
     * */
    dispose() {
        if (this._root) {
            if (this._parent)
                this._parent.remove(this._root);

            if (this._mesh) {
                this._mesh.geometry.dispose();
                this._mesh.material.dispose();
            }

            if (this._wire) {
                this._wire.geometry.dispose();
                this._wire.material.dispose();
            }
        }

        this._root = null;
        this._mesh = null;
        this._wire = null;
    }

}