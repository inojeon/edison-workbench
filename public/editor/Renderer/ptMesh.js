import * as THREE from '../build/three.module.js';

/**
 * 포인트 메쉬 클래스
 * */
export class ptMesh {
    /**
     * 클래스 생성자
     * */
    constructor() {
    }

    /**
     * 초기화한다.
     * */
    reset() {
        this._3geom = new THREE.BufferGeometry();
        this._ringIdx = []; // store index list of previous ring
        this._vertexIdx = 0;
        this._lastRing = null;
        this._vertices = [];
        this._indices = [];
    }

    /**
     * 링 버텍스를 추가한다.
     * @param {Point} pos 버텍스 위치
     * @param {any} normal 노말 벡터
     * @param {any} binormal 바이노말 벡터
     * @param {any} ring 링
     */
    addRingVertex(pos, normal, binormal, ring) {
        this._lastRing = ring;

        for (var i = 0; i < ring._ring.length; i++) {
            var rr = ring._ring[i];
            var pp = pos.clone();

            pp.addScaledVector(normal, rr.x);
            pp.addScaledVector(binormal, rr.y);

            this._vertices.push(pp.x,pp.y,pp.z);
            //this._3geom.vertices.push(pp);
            this._ringIdx[i] = this._vertexIdx;

            this._vertexIdx++;
        }
        
    }

    /**
     * 링 인덱스를 추가한다.
     * */
    addRingIndex() {

        const len = this._lastRing._ring.length;

        {
            var i = 0;
            const t1 = this._ringIdx[i];
            const t2 = this._ringIdx[i] + len - 1;
            const t3 = this._ringIdx[i] - 1;

            this._indices.push(t1, t2, t3);

            const t4 = this._ringIdx[i];
            const t5 = this._ringIdx[i] - 1;
            const t6 = this._ringIdx[i] -len;

            this._indices.push(t4, t5, t6);

        }

        for (var i = 1; i < len; i++) {
            const t1 = this._ringIdx[i];
            const t2 = this._ringIdx[i ]-1;
            const t3 = this._ringIdx[i] - len - 1;

            this._indices.push(t1, t2, t3);

            const t4 = this._ringIdx[i];
            const t5 = this._ringIdx[i] - len - 1;
            const t6 = this._ringIdx[i] - len ;

            this._indices.push(t4, t5, t6);
        }
    }

    /**
     * 메쉬를 생성한다.
     * @param {any} material
     */
    generateGeometry() {

        this._3geom.setIndex(this._indices);
        this._3geom.setAttribute('position', new THREE.Float32BufferAttribute(this._vertices, 3));

        let vertex_color = [];
        for (let i = 0; i < this._vertices.length; i++) {
            vertex_color.push(1);
        }

        this._3geom.setAttribute('color', new THREE.Float32BufferAttribute(vertex_color, 3));

        this._3geom.computeVertexNormals();

        return this._3geom;
    }

    /**
     * 메쉬를 생성한다.
     * @param {any} material
     */
    generateMesh(material) {

        let geometry = this.generateGeometry();

        var obj = new THREE.Mesh(geometry , material);
        return obj;
    }

}