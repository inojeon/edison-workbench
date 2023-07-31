import * as THREE from '../build/three.module.js';

class InstancedMeshDef {

    constructor() {
        this._size = 0;
        this._id = "";
        this._matrices = [];
        this._colors = [];
    }
}

export class InstancedMeshDic {

    constructor(geom_dic){

        this._geomDic = geom_dic;
        this._imeshDic = {};
    }

    add(id) {

    }

}