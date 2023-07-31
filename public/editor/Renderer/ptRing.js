import * as THREE from '../build/three.module.js';

var _coil1;

var _strand1;
var _strand2;
var _strand3;

var _helix1;
var _dna;

var _end;

var _inited = false;
var _num_faces = 40;

/**
 * 단백질 링을 초기화한다.
 * */
export function ptRing_init() {
    if (_inited)
        return;

    _inited = true;

    _coil1 = new ptRing(_num_faces);
    _coil1.setCircle(0.2, 0.2);

    _strand1 = new ptRing(_num_faces);
    _strand1.setBox(0.1 ,1);
    _strand2 = new ptRing(_num_faces);
    _strand2.setBox( 0.1, 2);
    _strand3 = new ptRing(_num_faces);
    _strand3.setBox(0.1, 0.1);

    _helix1 = new ptRing(_num_faces);
    _helix1.setCircle(0.15, 1);

    _dna = new ptRing(_num_faces);
    _dna.setCircle(0.2, 0.7);

}

/**
 * 단백질 링 데이터 클래스
 * */
export class ptRing {

    static setQuality(quality) {
        switch (quality) {
            case 0:
                _num_faces = 10;
                break;
            case 1:
                _num_faces = 40;
                break;
            case 2:
                _num_faces = 80;
                break;
            case 3:
                _num_faces = 120;
                break;
        }
        _inited = false;
        ptRing_init();
    }

    /**
     * 클래스 생성자
     * */
    constructor() {
        this._point = null;
        this._type = 0;
        this._numFaces = _num_faces;
        this._ring = [];

        ptRing_init();
    }

    /**
     * 데이터를 복사해 온다
     * @param {any} src 원본 데이터
     */
    copyFrom(src) {
        for (var i = 0; i < this._numFaces; i++) {
            this._ring[i] = src._ring[i];
        }
    }

    /**
     * 끝 점을 지정한다.
     * */
    setEnd() {
        var vz = new THREE.Vector3(0, 0, 0);
        for (var i = 0; i < this._numFaces; i++) {
            this._ring[i] = vz;
        }

    }

    /**
     * 박스 데이터를 설정한다.
     * @param {any} dx x 크기
     * @param {any} dy y 크기
     */
    setBox(dx, dy) {

        const dd = this._numFaces / 8;
        var p1;

        for (var i = 0; i < this._numFaces; i++) {
            var ii = i / this._numFaces;

            if (ii < 1 / 8) {
                const it = ii * 8;

                p1 = new THREE.Vector2(dx, dy * it);
                this._ring[i] = p1;

                continue;
            }
            if (ii < 3 / 8) {
                const it = (ii - 1 / 8) * 8; // 0~2

                p1 = new THREE.Vector2(dx - dx * it, dy);
                this._ring[i] = p1;
                continue;
            }
            if (ii < 5 / 8) {
                const it = (ii - 3 / 8) * 8; // 0~2

                p1 = new THREE.Vector2(-dx, dy - dy * it);
                this._ring[i] = p1;
                continue;
            }

            if (ii < 7 / 8) {
                const it = (ii - 5 / 8) * 8; // 0~2

                p1 = new THREE.Vector2(-dx + dx * it, -dy);
                this._ring[i] = p1;
                continue;
            }

            {
                const it = (ii - 7 / 8) * 8; // 0~1

                p1 = new THREE.Vector2(dx, -dy + dy * it);
                this._ring[i] = p1;
                continue;
            }


        }
    }

    /*
    setBox(dx, dy) {
        for (var i = 0; i < this._numFaces; i++) {
            var a = Math.PI * 2 / this._numFaces * i;

            var ax = Math.cos(a) ;
            var ay = Math.sin(a);

            var p1;
            var p2; 
            if (ax == 0) {
                if (ay > 0) {
                    p2 = new THREE.Vector2(dy * (ax / ay), dy);
                    this._ring[i] = p2;
                } else {
                    p2 = new THREE.Vector2(-dy * (ax / ay), -dy);
                    this._ring[i] = p2;

                }
                continue;
            }

            if (ax > 0) {
                if (ay == 0) {
                    p1 = new THREE.Vector2(dx, dx * (ay / ax));
                    this._ring[i] = p1;

                    continue;
                } else if (ay > 0) {
                    // ++
                    p1 = new THREE.Vector2(dx, dx * (ay / ax));
                    p2 = new THREE.Vector2(dy * (ax/ay), dy);
                } else {
                    // +-
                    p1 = new THREE.Vector2(dx, dx * (ay / ax));
                    p2 = new THREE.Vector2(-dy * (ax / ay), -dy);
                }
            } else {
                if (ay == 0) {
                    p1 = new THREE.Vector2(-dx, -dx * (ay / ax));
                    this._ring[i] = p1;
                    continue;
                } else if (ay > 0) {
                    // -+
                    p1 = new THREE.Vector2(-dx, -dx * (ay / ax));
                    p2 = new THREE.Vector2(dy * (ax / ay), dy);

                } else {
                    // --
                    p1 = new THREE.Vector2(-dx, -dx * (ay / ax));
                    p2 = new THREE.Vector2(-dy * (ax / ay), -dy);

                }
            }

            const l1 = p1.length();
            const l2 = p2.length();

            if (l1 > l2) {
                this._ring[i] = p2;
            } else {
                this._ring[i] = p1;
            }


            //this._ring[i] = new THREE.Vector3(ax, ay, 0);
        }

    }
    */

    /**
     * 원형 데이터를 설정한다.
     * @param {any} rx x 반지름
     * @param {any} ry y 반지름
     */
    setCircle(rx,ry) {        

        for (var i = 0; i < this._numFaces; i++) {
            var a = Math.PI * 2 / this._numFaces * i;

            var ax = Math.cos(a) * rx;
            var ay = Math.sin(a) * ry;

            this._ring[i] = new THREE.Vector3(ax, ay, 0);
        }
    }

    /**
     * Coil 데이터를 설정한다.
     * @param {any} t 매개변수
     */
    setCoil(t) {
        this.copyFrom(_coil1);
        //this.interpolate(_strand1, _strand2, t);
    }

    /**
     * Strand 데이터를 설정한다.
     * @param {any} t 매개변수
     */
    setStrand(t) {
        this.copyFrom(_strand1);
    }

    /**
     * Strand Arrow 데이터를 설정한다.
     * @param {any} t 매개변수
     */
    setStrandArrow(t) {
        this.interpolate(_strand2, _strand3, t);
    }

    /**
     * Helix 데이터를 설정한다.
     * @param {any} t 매개변수
     */
    setHelix(t) {
        this.copyFrom(_helix1);
    }

    setDNA(t) {
        this.copyFrom(_dna);
    }

    /**
     * 타입 및 매개변수를 사용하여 초기화한다.
     * @param {any} type 타입
     * @param {any} t 매개변수
     */
    set(type, t) {
        this._type = type;

        var da = Math.PI * 2 / this._numFaces;

        switch (type) {

            case 'd': // DNA
            case 'D': // DNA
                return this.setDNA(t);

            case 'c': // coil
            case 'C': // coil
                return this.setCoil(t);

            case 'H': // helix
            case 'h': // helix
                return this.setHelix(t);

            case 'S': // strand
            case 's': // strand
                return this.setStrand(t);

            case 'A': // strand , arrow
                return this.setStrandArrow(t);
        }

    }

    /**
     * 두개의 링 데이터를 인터폴레이션한다.
     * @param {any} ring1 링 1
     * @param {any} ring2 링 2
     * @param {any} t 매개변수
     */
    interpolate(ring1, ring2, t) {
        var len = ring1._numFaces;
        var _t = 1 - t;
        this._ring = [];
        for (var i = 0; i < len; i++) {
            var a1 = ring1._ring[i];            
            var a2 = ring2._ring[i];
            var aa = new THREE.Vector3(0, 0, 0);
            aa.addScaledVector(a1, _t);
            aa.addScaledVector(a2, t);

            this._ring.push(aa);
        }
    }

}