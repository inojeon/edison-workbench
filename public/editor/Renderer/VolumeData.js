import * as THREE from '../build/three.module.js';


/**
 * Volume 렌더링 데이터 관리 클래스
 * */
export class VolumeData {

    /**
     * 클래스 생성자
     * @param {String} str 데이터 문자열
     * @param {String} format 데이터 포맷 (cube 만 가능)
     * @param {Object} options 옵션
     */
    constructor(str, format, options) {

        //Covalent radii
        this.bondTable = {
            H: 0.37, He: 0.32,
            Li: 1.34, Be: 0.90, B: 0.82, C: 0.77, N: 0.75, O: 0.73, F: 0.71, Ne: 0.69,
            Na: 1.54, Mg: 1.30, Al: 1.18, Si: 1.11, P: 1.06, S: 1.02, Cl: 0.99, Ar: 0.97,
            K: 1.96, Ca: 1.74, Sc: 1.44, Ti: 1.56, V: 1.25,/* Cr */Mn: 1.39, Fe: 1.25, Co: 1.26, Ni: 1.21, Cu: 1.38, Zn: 1.31, Ga: 1.26, Ge: 1.22,/* As */Se: 1.16, Br: 1.14, Kr: 1.10,
            Rb: 2.11, Sr: 1.92, Y: 1.62, Zr: 1.48, Nb: 1.37, Mo: 1.45, Tc: 1.56, Ru: 1.26, Rh: 1.35, Pd: 1.31, Ag: 1.53, Cd: 1.48, In: 1.44, Sn: 1.41, Sb: 1.38, Te: 1.35, I: 1.33, Xe: 1.30,
            Cs: 2.25, Ba: 1.98, Lu: 1.60, Hf: 1.50, Ta: 1.38, W: 1.46, Re: 1.59, Os: 1.44, Ir: 1.37, Pt: 1.28, Au: 1.44, Hg: 1.49, Tl: 1.48, Pb: 1.47, Bi: 1.46,/* Po *//* At */Rn: 1.45,

            // None of the bottom row or any of the Lanthanides have bond lengths
        };

        this.anumToSymbol = {
            1: 'H', 2: 'He',
            3: 'Li', 4: 'Be', 5: 'B', 6: 'C', 7: 'N', 8: 'O', 9: 'F', 10: 'Ne',
            11: 'Na', 12: 'Mg', 13: 'Al', 14: 'Si', 15: 'P', 16: 'S', 17: 'Cl', 18: 'Ar',
            19: 'K', 20: 'Ca', 21: 'Sc', 22: 'Ti', 23: 'V', 24: 'Cr', 25: 'Mn', 26: 'Fe', 27: 'Co', 28: 'Ni', 29: 'Cu', 30: 'Zn', 31: 'Ga', 32: 'Ge', 33: 'As', 34: 'Se', 35: 'Br', 36: 'Kr',
            37: 'Rb', 38: 'Sr', 39: 'Y', 40: 'Zr', 41: 'Nb', 42: 'Mo', 43: 'Tc', 44: 'Ru', 45: 'Rh', 46: 'Pd', 47: 'Ag', 48: 'Cd', 49: 'In', 50: 'Sn', 51: 'Sb', 52: 'Te', 53: 'I', 54: 'Xe',
            55: 'Cs', 56: 'Ba', 71: 'Lu', 72: 'Hf', 73: 'Ta', 74: 'W', 75: 'Re', 76: 'Os', 77: 'Ir', 78: 'Pt', 79: 'Au', 80: 'Hg', 81: 'Tl', 82: 'Pb', 83: 'Bi', 84: 'Po', 85: 'At', 86: 'Rn',
            87: 'Fr', 88: 'Ra', 104: 'Rf', 105: 'Db', 106: 'Sg', 107: 'Bh', 108: 'Hs', 109: 'Mt', 110: 'Ds', 111: 'Rg', 112: 'Cn', 113: 'Nh', 114: 'Fl', 115: 'Mc', 116: 'Lv', 117: 'Ts', 118: 'Og',

            57: 'La', 58: 'Ce', 59: 'Pr', 60: 'Nd', 61: 'Pm', 62: 'Sm', 63: 'Eu', 64: 'Gd', 65: 'Tb', 66: 'Dy', 67: 'Ho', 68: 'Er', 69: 'Tm', 70: 'Yb',
            89: 'Ac', 90: 'Th', 91: 'Pa', 92: 'U', 93: 'Np', 94: 'Pu', 95: 'Am', 96: 'Cm', 97: 'Bk', 98: 'Cf', 99: 'Es', 100: 'Fm', 101: 'Md', 102: 'No',
        };



        /*
        this.unit = {
            x: 1,
            y: 1,
            z: 1
        }; // scale of each voxel
        this.origin = {
            x: 0,
            y: 0,
            z: 0
        }; // origin (bottom "left", not center)
        this.size = {
            x: 0,
            y: 0,
            z: 0
        }; // number of voxels in each direction
        */

        this.unit = new THREE.Vector3(1, 1, 1);
        this.origin = new THREE.Vector3(0, 0, 0);
        this.size = new THREE.Vector3(0, 0, 0);


        this.data = new Float32Array([]); // actual floating point data, arranged
        // x->y->z
        
        this.matrix = null; //if set must transform data

        format = format.toLowerCase();

        // parse data with format.
        if (format === "cube") {
            this.parseCUBE(str);
        } else if (format === "vasp") {
            this.parseVASP(str);
        } else if (format === "dx") {
            this.parseDX(str);
        } else {
            console.log("cannot parse volume data : " + format + " is unknown format.");
        }


        if (this.data) {
            // apply options
            if (options) {
                if (options.negate) {
                    for (let i = 0, n = this.data.length; i < n; i++) {
                        this.data[i] = -this.data[i];
                    }
                }
                if (options.normalize) {
                    var total = 0.0;
                    for (let i = 0, n = this.data.length; i < n; i++) {
                        total += this.data[i];
                    }
                    var mean = total / this.data.length;
                    console.log("computed mean: " + mean);
                    total = 0;
                    for (let i = 0, n = this.data.length; i < n; i++) {
                        var diff = this.data[i] - mean;
                        total += diff * diff; //variance is ave of squared difference with mean
                    }
                    var variance = total / this.data.length;

                    console.log("Computed variance: " + variance);
                    //now normalize
                    for (let i = 0, n = this.data.length; i < n; i++) {
                        this.data[i] = (this.data[i] - mean) / variance;
                    }
                }
                if (options.normalize_minmax) {
                    var min = 100000000;
                    var max = -100000000;
                    for (let i = 0, n = this.data.length; i < n; i++) {
                        if (this.data[i] < min)
                            min = this.data[i];
                        if (this.data[i] > max)
                            max = this.data[i];
                    }
                    console.log("Computed min-max : " + min + " - " + max);
                    var scale = max - min;
                    //now normalize
                    for (let i = 0, n = this.data.length; i < n; i++) {
                        this.data[i] = (this.data[i] - min) / scale;
                    }
                }
            }
        }

    }


    /**
     * 글로벌 좌표상의 볼륨 데이터 값을 얻기위한 데이터 인덱스를 계산한다.
     * @param {Number} x x좌표
     * @param {Number} y y좌표
     * @param {Number} z z좌표
     * @returns {Number} 데이터 인덱스
     */
    getIndex(x, y, z) {

        if (this.matrix) {
            //all transformation is done through matrix multiply
            if (!this.inversematrix) {
                this.inversematrix = this.matrix.clone().invert();// new $3Dmol.Matrix4().getInverse(this.matrix);
            }
            var pt = new THREE.Vector3(x, y, z); // new $3Dmol.Vector3(x, y, z);
            pt = pt.applyMatrix4(this.inversematrix);
            x = pt.x;
            y = pt.y;
            z = pt.z;
        } else { //use simple origin/unit transform
            x -= this.origin.x;
            y -= this.origin.y;
            z -= this.origin.z;

            x /= this.unit.x;
            y /= this.unit.y;
            z /= this.unit.z;
        }
        x = Math.round(x + this.size.x * 0.5);
        y = Math.round(y + this.size.y * 0.5);
        z = Math.round(z + this.size.z * 0.5);

        if (x < 0 || x >= this.size.x) return -1;
        if (y < 0 || y >= this.size.y) return -1;
        if (z < 0 || z >= this.size.z) return -1;

        return x * this.size.y * this.size.z + y * this.size.z + z;
    };

    /**
     * 글로벌 좌표상의 볼륨 데이터 샘플링 값을 반환한다.
     * @param {Number} x x좌표
     * @param {Number} y y좌표
     * @param {Number} z z좌표
     * @returns {Number} 볼륨 데이터 샘플링 값
     */
    getVal(x, y, z) {
        let i = this.getIndex(x, y, z);
        if (i < 0) return 0;

        //console.log("get data from index " + i);
        return this.data[i];
    };

    /**
     * 데이터 인덱스 좌표로부터 볼륨 데이터 샘플링 값을 반환한다.
     * @param {Number} ix 인덱스 x좌표
     * @param {Number} iy 인덱스 y좌표
     * @param {Number} iz 인덱스 z좌표
     * @returns {Number} 볼륨 데이터 샘플링 값
     */
    getValFromIndexCoords(ix, iy, iz) {
        let i = ix * this.size.y * this.size.z + iy * this.size.z + iz;
        if (i < 0) return 0;

        return this.data[i];
    }

    /**
     * 데이터 인덱스를 3D 글로벌 좌표로 변환한다.
     * @param {Number} index 데이터 인덱스
     * @returns {Object} 3D 글로벌 좌표
     */
    getCoordinates(index) {

        var x = index / (this.size.y * this.size.z);
        var y = index % (this.size.y * this.size.z);
        var z = index % this.size.z;

        x *= this.unit.x;
        y *= this.unit.y;
        z *= this.unit.z;

        x += this.origin.x;
        y += this.origin.y;
        z += this.origin.z;

        return { x: x, y: y, z: z };
    };

    /**
     * 원소의 결합 길이를 반환한다.
     * @param {String} elem 원소 기호
     * @returns {Number} 결합 길이
     */
    bondLength(elem) {
        return bondTable[elem] || 1.6;
    };

    // return true if atom1 and atom2 are probably bonded to each other
    // based on distance alone

    /**
     * 두 원자가 연결되어있는지 반환한다.
     * @param {Object} atom1 원자 1
     * @param {Object} atom2 원자 2
     * @returns {Boolean} 두 원자의 연결 상태
     */
    areConnected(atom1, atom2) {
        var maxsq = bondLength(atom1.elem) + bondLength(atom2.elem);
        maxsq += 0.25;// fudge factor, especially important for md frames, also see 1i3d
        maxsq *= maxsq;

        var xdiff = atom1.x - atom2.x;
        xdiff *= xdiff;
        if (xdiff > maxsq)
            return false;
        var ydiff = atom1.y - atom2.y;
        ydiff *= ydiff;
        if (ydiff > maxsq)
            return false;
        var zdiff = atom1.z - atom2.z;
        zdiff *= zdiff;
        if (zdiff > maxsq)
            return false;

        var distSquared = xdiff + ydiff + zdiff;

        if (isNaN(distSquared))
            return false;
        else if (distSquared < 0.5)
            return false; // maybe duplicate position.
        else if (distSquared > maxsq)
            return false;
        else if (atom1.altLoc != atom2.altLoc && atom1.altLoc != ' ' && atom2.altLoc != ' ')
            return false; // don't connect across alternate locations
        else
            return true;
    };

    /**
     * 원자들 사이에 결합을 설정한다.
     * @param {Array} atoms 원자 리스트
     */
    assignBonds(atoms) {
        // assign bonds - yuck, can't count on connect records

        for (var i = 0, n = atoms.length; i < n; i++) {
            // Don't reindex if atoms are already indexed
            if (!atoms[i].index)
                atoms[i].index = i;
        }

        var grid = {};
        var MAX_BOND_LENGTH = 4.95; // (largest bond length, Cs) 2.25 * 2 * 1.1 (fudge factor)

        for (var index = 0; index < atoms.length; index++) {
            var atom = atoms[index];
            var x = Math.floor(atom.x / MAX_BOND_LENGTH);
            var y = Math.floor(atom.y / MAX_BOND_LENGTH);
            var z = Math.floor(atom.z / MAX_BOND_LENGTH);
            if (!grid[x]) {
                grid[x] = {};
            }
            if (!grid[x][y]) {
                grid[x][y] = {};
            }
            if (!grid[x][y][z]) {
                grid[x][y][z] = [];
            }

            grid[x][y][z].push(atom);
        }

        var OFFSETS = [
            { x: 0, y: 0, z: 1 },
            { x: 0, y: 1, z: -1 },
            { x: 0, y: 1, z: 0 },
            { x: 0, y: 1, z: 1 },
            { x: 1, y: -1, z: -1 },
            { x: 1, y: -1, z: 0 },
            { x: 1, y: -1, z: 1 },
            { x: 1, y: 0, z: -1 },
            { x: 1, y: 0, z: 0 },
            { x: 1, y: 0, z: 1 },
            { x: 1, y: 1, z: -1 },
            { x: 1, y: 1, z: 0 },
            { x: 1, y: 1, z: 1 }
        ];

        for (let x in grid) {
            x = parseInt(x);
            for (let y in grid[x]) {
                y = parseInt(y);
                for (let z in grid[x][y]) {
                    z = parseInt(z);
                    let points = grid[x][y][z];

                    for (let i = 0; i < points.length; i++) {
                        let atom1 = points[i];
                        for (let j = i + 1; j < points.length; j++) {
                            let atom2 = points[j];
                            if (this.areConnected(atom1, atom2)) {
                                if (atom1.bonds.indexOf(atom2.index) == -1) {
                                    atom1.bonds.push(atom2.index);
                                    atom1.bondOrder.push(1);
                                    atom2.bonds.push(atom1.index);
                                    atom2.bondOrder.push(1);
                                }
                            }
                        }
                    }

                    for (let o = 0; o < OFFSETS.length; o++) {
                        let offset = OFFSETS[o];
                        if (!grid[x + offset.x]
                            || !grid[x + offset.x][y + offset.y]
                            || !grid[x + offset.x][y + offset.y][z + offset.z]) continue;

                        let otherPoints = grid[x + offset.x][y + offset.y][z + offset.z];
                        this.findConnections(points, otherPoints);
                    }
                }
            }
        }
    }

    /**
     * 점 집합 사이에 연결 관계를 찾아낸다.
     * @param {Array} points 점 집합
     * @param {Array} otherPoints 점 집합
     */
    findConnections(points, otherPoints) {
        for (var i = 0; i < points.length; i++) {
            var atom1 = points[i];
            for (var j = 0; j < otherPoints.length; j++) {
                var atom2 = otherPoints[j];

                if (areConnected(atom1, atom2)) {
                    //gracefully handle one-sided bonds
                    var a2i = atom1.bonds.indexOf(atom2.index);
                    var a1i = atom2.bonds.indexOf(atom1.index);
                    if (a2i == -1 && a1i == -1) {
                        atom1.bonds.push(atom2.index);
                        atom1.bondOrder.push(1);
                        atom2.bonds.push(atom1.index);
                        atom2.bondOrder.push(1);
                    } else if (a2i == -1) {
                        atom1.bonds.push(atom2.index);
                        atom1.bondOrder.push(atom2.bondOrder[a1i]);
                    } else if (a1i == -1) {
                        atom2.bonds.push(atom1.index);
                        atom2.bondOrder.push(atom1.bondOrder[a2i]);
                    }

                }
            }
        }
    };

    /**
     * CUBE 볼륨 데이터를 파싱한다.
     * @param {String} str CUBE 포맷 데이터
     */
    parseCUBE(str) {
        var lines = str.split(/\r?\n/);

        if (lines.length < 6)
            return;

        var cryst = this.cubeParser(str).modelData[0].cryst;

        var lineArr = lines[2].replace(/^\s+/, "").replace(/\s+/g, " ").split(" ");

        var atomsnum = parseFloat(lineArr[0]); //includes sign, which indicates presence of oribital line in header
        var natoms = Math.abs(atomsnum);

        this.origin = cryst.origin;
        this.size = cryst.size;
        this.unit = cryst.unit;
        this.matrix = cryst.matrix4;

        var headerlines = 6;
        if (atomsnum < 0) headerlines++; //see: http://www.ks.uiuc.edu/Research/vmd/plugins/molfile/cubeplugin.html
        var raw = lines.splice(natoms + headerlines).join(" ");
        raw = raw.replace(/^\s+/, '');
        raw = raw.split(/[\s\r]+/);
        this.data = new Float32Array(raw);
    };

    /**
     * CUBE 볼륨 데이터를 파싱한다.
     * @param {String} str CUBE 포맷 데이터
     * @param {Object} options 옵션
     * @returns {Array} 원자 결정구조 데이터
     */
    cubeParser(str, options) {
        options = options || {};
        var atoms = [[]];
        var lines = str.split(/\r?\n/);
        var assignbonds = options.assignBonds === undefined ? true : options.assignBonds;

        if (lines.length < 6)
            return atoms;

        var lineArr = lines[2].replace(/^\s+/, "").replace(/\s+/g, " ").split(" ");

        var natoms = Math.abs(parseFloat(lineArr[0]));

        let cryst = {};
        var origin = cryst.origin = new THREE.Vector3(parseFloat(lineArr[1]), parseFloat(lineArr[2]), parseFloat(lineArr[3]));
            //new $3Dmol.Vector3(parseFloat(lineArr[1]), parseFloat(lineArr[2]), parseFloat(lineArr[3]));

        lineArr = lines[3].replace(/^\s+/, "").replace(/\s+/g, " ").split(" ");
        lineArr = lines[3].replace(/^\s+/, "").replace(/\s+/g, " ").split(" ");

        // might have to convert from bohr units to angstroms
        // there is a great deal of confusion here:
        // n>0 means angstroms: http://www.gaussian.com/g_tech/g_ur/u_cubegen.htm
        // n<0 means angstroms: http://paulbourke.net/dataformats/cube/
        // always assume bohr: openbabel source code
        // always assume angstrom: http://www.ks.uiuc.edu/Research/vmd/plugins/molfile/cubeplugin.html
        // we are going to go with n<0 means angstrom - note this is just the first n
        var convFactor = (lineArr[0] > 0) ? 0.529177 : 1;
        origin.multiplyScalar(convFactor);

        var nX = Math.abs(lineArr[0]);
        var xVec = new THREE.Vector3(parseFloat(lineArr[1]),
            parseFloat(lineArr[2]), parseFloat(lineArr[3]))
            .multiplyScalar(convFactor);

        lineArr = lines[4].replace(/^\s+/, "").replace(/\s+/g, " ").split(" ");
        var nY = Math.abs(lineArr[0]);
        var yVec = new THREE.Vector3(parseFloat(lineArr[1]),
            parseFloat(lineArr[2]), parseFloat(lineArr[3]))
            .multiplyScalar(convFactor);

        lineArr = lines[5].replace(/^\s+/, "").replace(/\s+/g, " ").split(" ");
        var nZ = Math.abs(lineArr[0]);
        var zVec = new THREE.Vector3(parseFloat(lineArr[1]),
            parseFloat(lineArr[2]), parseFloat(lineArr[3]))
            .multiplyScalar(convFactor);

        cryst.size = new THREE.Vector3(nX, nY, nZ);
        cryst.unit = new THREE.Vector3(xVec.x, yVec.y, zVec.z);

        if (xVec.y != 0 || xVec.z != 0 || yVec.x != 0 || yVec.z != 0 || zVec.x != 0
            || zVec.y != 0) {
            //need a transformation matrix
            cryst.matrix4 = new THREE.Matrix4(xVec.x, yVec.x, zVec.x, 0, xVec.y, yVec.y, zVec.y, 0, xVec.z, yVec.z, zVec.z, 0, 0, 0, 0, 1);
            // include translation in matrix
            let t = new THREE.Matrix4().makeTranslation(origin.x, origin.y, origin.z);
            cryst.matrix4 = cryst.matrix4.multiplyMatrices(t, cryst.matrix4);
            cryst.matrix = new THREE.Matrix3().getNormalMatrix(cryst.matrix4);
            // all translation and scaling done by matrix, so reset origin and unit
            cryst.origin = new THREE.Vector3(0, 0, 0);
            cryst.unit = new THREE.Vector3(1, 1, 1);
        }

        atoms.modelData = [{ cryst: cryst }];

        // Extract atom portion; send to new GLModel...
        lines = lines.splice(6, natoms);

        var start = atoms[atoms.length - 1].length;
        var end = start + lines.length;

        for (var i = start; i < end; ++i) {
            var atom = {};
            atom.serial = i;
            var line = lines[i - start];
            var tokens = line.replace(/^\s+/, "").replace(/\s+/g, " ").split(
                " ");
            atom.elem = this.anumToSymbol[tokens[0]];
            atom.x = parseFloat(tokens[2]) * convFactor;
            atom.y = parseFloat(tokens[3]) * convFactor;
            atom.z = parseFloat(tokens[4]) * convFactor;

            atom.hetflag = true;
            atom.bonds = [];
            atom.bondOrder = [];
            atom.properties = {};
            atoms[atoms.length - 1].push(atom);

        }

        if (this.assignbonds) {
            for (let i = 0; i < atoms.length; i++)
                this.assignBonds(atoms[i]);
        }

        return atoms;
    }

    /**
     * 주어진 값 범위에 따라 보간된 샘플 Volume Texture 데이터를 생성한다.
     * @param {Number} vmin min 값
     * @param {Number} vmax max 값
     * @returns {Array} Volume Textrue array
     */
    getUint8TextDataWithValueRange(vmin, vmax) {

        var vctr = (vmin + vmax) * 0.5;
        var scale = vctr - vmin;

        var tex = new Uint8Array(this.data.length);
        for (let i = 0; i < this.data.length; i++) {

            //let v = Math.floor(Math.abs(this.data[i] - vctr) / scale * 255.0);
            let v = Math.floor((this.data[i] - vmin) * 255);
            if (v < 0)
                v = 0;
            else if (v > 255)
                v = 255;

            tex[i] = v;
        }

        return tex;

    }

    /**
     * 샘플 Volume Texture 데이터를 생성한다.
     * @returns {Array} Volume Textrue array
     * */
    getUint8TexDataFixedSpherical() {

        var abs_min = 0;
        var abs_max = 0.1;
        var dv_max = 0.75;

        var tex = new Uint8Array(this.data.length);

        let ctr = new THREE.Vector3(this.size.x / 2.0, this.size.y / 2.0, this.size.z / 2.0);

        let i = 0;
        for (let z = 0; z < this.size.z; z++) {

            for (let y = 0; y < this.size.y; y++) {

                for (let x = 0; x < this.size.x; x++) {

                    let dist = new THREE.Vector3(x, y, z).sub(ctr).length();

                    let sr = dist / 19.0;
                    if (sr > 1.0) {
                        tex[i] = 0;
                    } else {
                        tex[i] = Math.floor(sr * 255.0);
                    }

                    i++;
                }

            }
        }

        return tex;
    }

    /**
     * Volume Data의 전체 범위에 대해 주어진 해상도로 샘플링한 Volume Texture 데이터를 생성한다.
     * @param {Number} tex_size Texture 사이즈
     * @returns {Array} Volume Textrue array
     */
    getUint8TexDataCustom1(tex_size) {

        var abs_min = 0;
        var abs_max = 0.1;
        var dv_max = 0.75;

        var tex = new Uint8Array(tex_size * tex_size * tex_size);

        let gxsize = this.size.x * this.unit.x;
        let gysize = this.size.y * this.unit.y;
        let gzsize = this.size.z * this.unit.z;

        let gxmin = this.origin.x - gxsize * 0.5;
        let gymin = this.origin.y - gysize * 0.5;
        let gzmin = this.origin.z - gzsize * 0.5;

        let tunitx = gxsize / (tex_size - 1);
        let tunity = gysize / (tex_size - 1);
        let tunitz = gzsize / (tex_size - 1);

        let i = 0;
        for (let z = 0; z < tex_size; z++) {

            for (let y = 0; y < tex_size; y++) {

                for (let x = 0; x < tex_size; x++) {

                    let gx = gxmin + tunitx * x;
                    let gy = gymin + tunity * y;
                    let gz = gzmin + tunitz * z;
                    
                    let v = this.getVal(gx, gy, gz);

                    let tr_v = Math.floor((Math.abs(v) - abs_min) / abs_max * dv_max * 255);
                    if (tr_v > 255)
                        tr_v = 255;

                    tex[i] = tr_v;
                    i++;
                }

            }
        }

        return tex;
    }

    /**
     * Volume Data의 원본 사이즈로 재정렬한 Volume Texture 데이터를 생성한다.
     * @returns {Array} Volume Textrue array
     */
    getUint8TexDataCustom2() {

        var abs_min = 0;
        var abs_max = 0.1;
        var dv_max = 0.75;

        var tex = new Uint8Array(this.size.x * this.size.y * this.size.z);

        let i = 0;
        for (let z = 0; z < this.size.z; z++) {

            for (let y = 0; y < this.size.y; y++) {

                for (let x = 0; x < this.size.x; x++) {

                    let v = this.getValFromIndexCoords(x, y, z);

                    let tr_v = Math.floor((Math.abs(v) - abs_min) / abs_max * dv_max * 255);
                    if (tr_v > 255)
                        tr_v = 255;

                    tex[i] = tr_v;
                    i++;
                }

            }
        }

        return tex;
    }


}