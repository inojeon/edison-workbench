
/**
 * 메쉬 컨테이너 클래스
 * */
export class MeshContainer {

    /**
     * 클래스 생성자
     * */
    constructor() {
        this._dic = {};

    }

    /**
     * 데이터를 초기화한다.
     * */
    clear() {
        this._dic = {};
    }

    /**
     * 메쉬 데이터를 반환한다.
     * @param {Number} id 메쉬 ID
     */
    get(id) {
        return this._dic[id];
    }

    /**
     * 메쉬 데이터를 추가한다.
     * @param {THREE.Mesh} mesh
     */
    addMesh(mesh) {

        if (mesh._id) {
            this._dic[mesh._id] = mesh;
        }

        let I = this;
        if (mesh.children) {
            mesh.children.forEach(function (child) {
                I.addMesh(child);
            });
        }
    }


}