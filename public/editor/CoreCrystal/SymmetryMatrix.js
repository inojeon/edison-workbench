import { CStructure } from './CStructure.js';
import * as THREE from '../build/three.module.js';

var _mat_a_b_c;
var _mat_na_b_c;
var _mat_a_nb_c;
var _mat_a_b_nc;
var _mat_a_5_b_c;
var _mat_a_b_5_c;
var _mat_a_b_c_5;
var _mat_a_5_b_5_c;
var _mat_a_5_b_c_5;
var _mat_a_b_5_c_5;
var _mat_a_5_b_5_c_5;
var _mat_a_3_b_3_c_3;
var _mat_a_3_b_3_c_6;
var _mat_a_3_b_6_c_3;
var _mat_a_6_b_3_c_3;
var _mat_a_6_b_6_c_6;
var _mat_a_6_b_6_c_3;
var _mat_a_6_b_3_c_6;
var _mat_a_3_b_6_c_6;
var _mat_na_nb_nc;
var _mat_a_nb_nc;
var _mat_na_b_nc;
var _mat_na_nb_c;

var _mat_na_5_nb_5_nc_5;
var _mat_na_5_nb_5_nc;
var _mat_na_5_nb_nc_5;
var _mat_na_nb_5_nc_5;

var _mat_na_6_nb_6_nc_3;
var _mat_na_6_nb_3_nc_6;
var _mat_na_3_nb_6_nc_6;

var _mat_na_3_nb_3_nc_6;
var _mat_na_3_nb_6_nc_3;
var _mat_na_6_nb_3_nc_3;

var _mat_na_nb_c_5;
var _mat_na_b_5_nc;
var _mat_a_5_nb_nc;

var _mat_na_nb_5_c;
var _mat_na_5_nb_c;
var _mat_na_b_nc_5;
var _mat_na_5_b_nc;
var _mat_a_nb_nc_5;
var _mat_a_nb_5_nc;

var _mat_na_5_nb_5_c;
var _mat_na_5_nb_c_5;
var _mat_na_nb_5_c_5;

var _mat_na_5_b_5_nc;
var _mat_na_5_b_nc_5;
var _mat_na_b_5_nc_5;

var _mat_a_5_nb_5_nc;
var _mat_a_5_nb_nc_5;
var _mat_a_nb_5_nc_5;

var _mat_na_5_nb_5_c_5;
var _mat_na_5_b_5_nc_5;
var _mat_a_5_nb_5_nc_5;


var _mat_a_b_nc_5;
var _mat_a_b_5_nc;
var _mat_a_5_b_nc;

var _mat_a_nb_c_5;
var _mat_a_nb_5_c;
var _mat_a_5_nb_c;

var _mat_na_b_c_5;
var _mat_na_b_5_c;
var _mat_na_5_b_c;

var _mat_a_b_5_nc_5;
var _mat_a_5_b_nc_5;
var _mat_a_5_b_5_nc;

var _mat_a_nb_5_c_5;
var _mat_a_5_nb_c_5;
var _mat_a_5_nb_5_c;

var _mat_na_b_5_c_5;
var _mat_na_5_b_c_5;
var _mat_na_5_b_5_c;

var _mat_a_5_b_5_nc_5;
var _mat_a_5_nb_5_c_5;
var _mat_na_5_b_5_c_5;

var _mat_$_nb_$_a_nb_$_c;
var _mat_$_na_b_$_na_$_c;
var _mat_$_b_$_na_b_$_c;
var _mat_$_a_nb_$_a_$_c;

var _mat_$_nb_$_a_nb_$_c_3;
var _mat_$_na_b_$_na_$_c_6;
var _mat_$_b_$_na_b_$_c_8;
var _mat_$_a_nb_$_a_$_c_1;

var _mat_$_nb_$_a_nb_$_c_6;
var _mat_$_na_b_$_na_$_c_3;
var _mat_$_b_$_na_b_$_c_1;
var _mat_$_a_nb_$_a_$_c_8;

var _mat_$_b_$_na_b_$_c_6;
var _mat_$_a_nb_$_a_$_c_3;

var _mat_$_b_$_na_b_$_c_3;
var _mat_$_a_nb_$_a_$_c_6;

var _mat_$_b_$_na_b_$_c_5;
var _mat_$_a_nb_$_a_$_c_5;

var _mat_$_nb_$_a_nb_$_nc;
var _mat_$_na_b_$_na_$_nc;

var _mat_$_b_$_na_b_$_nc;
var _mat_$_na_$_b_$_na_c;
var _mat_$_a_nb_$_a_$_nc;

var _mat_$_nb_$_a_nb_$_nc_5;
var _mat_$_na_b_$_na_$_nc_5;

var _mat_b_a_nc;
var _mat_$_a_nb_$_nb_$_nc;
var _mat_$_na_$_na_b_$_nc;
var _mat_nb_na_nc;
var _mat_$_na_b_$_b_$_nc;
var _mat_$_a_$_a_nb_$_nc;

var _mat_$_nb_$_na_b_$_c_8;

var _mat_b_a_nc_3;
var _mat_$_na_$_na_b_$_nc_6;
var _mat_nb_na_nc_8;
var _mat_$_na_b_$_b_$_nc_5;
var _mat_$_a_$_a_nb_$_nc_1;

var _mat_$_a_nb_$_a_$_nc_8;
var _mat_b_a_nc_6;
var _mat_$_na_$_na_b_$_nc_3;
var _mat_nb_na_nc_1;
var _mat_$_a_$_a_nb_$_nc_8;
var _mat_nb_na_nc_6;

var _mat_$_a_$_a_nb_$_nc_3;
var _mat_$_b_$_a_$_nc_3;
var _mat_nb_na_nc_3;
var _mat_$_a_$_a_nb_$_nc_6;

var _mat_nb_na_c;
var _mat_$_na_b_$_b_$_c;
var _mat_$_a_$_a_nb_$_c;
var _mat_nb_na_nc_5;
var _mat_b_a_c_5;
var _mat_$_a_nb_$_nb_$_c_5;
var _mat_$_a_$_a_nb_$_nc_5;
var _mat_$_na_$_na_b_$_c_5;

var _mat_b_a_c;
var _mat_$_a_nb_$_nb_$_c;
var _mat_$_na_$_na_b_$_c;

var _mat_nb_na_c_5;
var _mat_na_b_$_b_$_c_5;
var _mat_a_$_a_nb_$_c_5;

var _mat_b_a_nc_5;
var _mat_$_a_nb_$_nc_$_nc_5;
var _mat_$_na_$_na_b_$_nc_5;

var _mat_c_a_b;
var _mat_c_na_nb;
var _mat_nc_na_b;
var _mat_nc_a_nb;
var _mat_b_c_a;
var _mat_nb_c_na;
var _mat_b_nc_na;
var _mat_nb_nc_a;

var _mat_c_a_5_b_5;
var _mat_c_na_5_nb_5;
var _mat_nc_na_5_b_5;
var _mat_nc_a_5_nb_5;
var _mat_b_c_5_a_5;
var _mat_nb_c_5_na_5;
var _mat_b_nc_5_na_5;
var _mat_nb_na_5_a_5;
var _mat_c_5_a_b_5;
var _mat_c_5_na_nb_5;
var _mat_nc_5_na_b_5;
var _mat_nc_5_a_nb_5;
var _mat_b_5_c_a_5;
var _mat_nb_5_c_na_5;
var _mat_b_5_nc_na_5;
var _mat_nb_5_nc_a_5;
var _mat_c_5_a_5_b;
var _mat_c_5_na_5_nb;
var _mat_nc_5_na_5_b;
var _mat_na_5_a_5_nb;
var _mat_b_5_c_5_a;
var _mat_nb_5_c_5_na;
var _mat_b_5_nc_5_na;
var _mat_nb_5_nc_5_a;

var _mat_c_5_a_5_b_5;
var _mat_c_5_na_5_nb_5;
var _mat_nc_5_na_5_b_5;
var _mat_nc_5_a_5_nb_5;
var _mat_b_5_c_5_a_5;
var _mat_nb_5_c_5_na_5;
var _mat_b_5_nc_5_na_5;
var _mat_nb_5_nc_5_a_5;

var _mat_c_5_na_5_nb;
var _mat_nc_5_na_b_5;
var _mat_nc_a_5_nb_5;
var _mat_nb_c_5_na_5;
var _mat_b_5_nc_5_na;
var _mat_nb_5_nc_a_5;

var _mat_na_5_na_b_5;
var _mat_nc_a_5_b_5;
var _mat_c_na_nb_5;
var _mat_nc_na_5_b;
var _mat_nc_5_a_nb;
var _mat_nb_5_c_na;
var _mat_b_nc_na_5;
var _mat_nb_nc_5_a;

var _mat_b_na_c;
var _mat_nb_a_c;
var _mat_a_c_nb;
var _mat_na_c_b;
var _mat_na_nc_nb;
var _mat_a_nc_b;
var _mat_c_b_na;
var _mat_c_nb_a;
var _mat_nc_b_a;
var _mat_nc_nb_na;
var _mat_b_5_a_5_nc_5;
var _mat_nb_5_na_5_nc_5;
var _mat_b_5_na_5_c_5;
var _mat_nb_5_a_5_c_5;
var _mat_a_5_c_5_nb_5;
var _mat_na_5_c_5_b_5;
var _mat_na_5_nc_5_nb_5;
var _mat_a_5_nc_5_b_5;
var _mat_c_5_b_5_na_5;
var _mat_c_5_nb_5_a_5;
var _mat_nc_5_b_5_a_5;
var _mat_nc_5_nb_5_na_5;

var _mat_nc_na_nb;
var _mat_nc_a_b;
var _mat_c_a_nb;
var _mat_c_na_b;
var _mat_nb_nc_na;
var _mat_b_nc_a;
var _mat_nb_c_a;
var _mat_b_c_na;
var _mat_nb_a_nc;
var _mat_b_na_nc;
var _mat_na_nc_b;
var _mat_a_nc_nb;
var _mat_a_c_b;
var _mat_na_c_nb;
var _mat_nc_nb_a;
var _mat_nc_b_na;
var _mat_c_nb_na;
var _mat_c_b_a;
var _mat_nc_5_na_5_nb_5;
var _mat_nc_5_a_5_b_5;
var _mat_c_5_a_5_nb_5;
var _mat_c_5_na_5_b_5;
var _mat_nb_5_nc_5_na_5;
var _mat_b_5_nc_5_a_5;
var _mat_nb_5_c_5_a_5;
var _mat_b_5_c_5_na_5;

var _mat_nb_nc_5_a_5;
var _mat_nc_5_a_5_nb;

/**
 * symmetry matrix 생성
 * */
export function initMatrix() {
    let mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ], 0);
    _mat_a_b_c = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            -1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ], 0);
    _mat_na_b_c = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            1, 0, 0, 0,
            0, -1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ], 0);
    _mat_a_nb_c = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, -1, 0,
            0, 0, 0, 1
        ], 0);
    _mat_a_b_nc = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            1, 0, 0, 0.5,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ], 0);
    _mat_a_5_b_c = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            1, 0, 0, 0,
            0, 1, 0, 0.5,
            0, 0, 1, 0,
            0, 0, 0, 1
        ], 0);
    _mat_a_b_5_c = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0.5,
            0, 0, 0, 1
        ], 0);
    _mat_a_b_c_5 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            1, 0, 0, 0.5,
            0, 1, 0, 0.5,
            0, 0, 1, 0,
            0, 0, 0, 1
        ], 0);
    _mat_a_5_b_5_c = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            1, 0, 0, 0.5,
            0, 1, 0, 0,
            0, 0, 1, 0.5,
            0, 0, 0, 1
        ], 0);
    _mat_a_5_b_c_5 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            1, 0, 0, 0,
            0, 1, 0, 0.5,
            0, 0, 1, 0.5,
            0, 0, 0, 1
        ], 0);
    _mat_a_b_5_c_5 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            1, 0, 0, 0.5,
            0, 1, 0, 0.5,
            0, 0, 1, 0.5,
            0, 0, 0, 1
        ], 0);
    _mat_a_5_b_5_c_5 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            1, 0, 0, 0.333333,
            0, 1, 0, 0.333333,
            0, 0, 1, 0.333333,
            0, 0, 0, 1
        ], 0);
    _mat_a_3_b_3_c_3 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            1, 0, 0, 0.333333,
            0, 1, 0, 0.333333,
            0, 0, 1, 0.666667,
            0, 0, 0, 1
        ], 0);
    _mat_a_3_b_3_c_6 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            1, 0, 0, 0.333333,
            0, 1, 0, 0.666667,
            0, 0, 1, 0.333333,
            0, 0, 0, 1
        ], 0);
    _mat_a_3_b_6_c_3 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            1, 0, 0, 0.666667,
            0, 1, 0, 0.333333,
            0, 0, 1, 0.333333
            , 0, 0, 0, 1
        ], 0);
    _mat_a_6_b_3_c_3 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            1, 0, 0, 0.666667,
            0, 1, 0, 0.666667,
            0, 0, 1, 0.666667,
            0, 0, 0, 1
        ], 0);
    _mat_a_6_b_6_c_6 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            1, 0, 0, 0.666667,
            0, 1, 0, 0.666667,
            0, 0, 1, 0.333333,
            0, 0, 0, 1
        ], 0);
    _mat_a_6_b_6_c_3 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            1, 0, 0, 0.666667,
            0, 1, 0, 0.333333,
            0, 0, 1, 0.666667,
            0, 0, 0, 1
        ], 0);
    _mat_a_6_b_3_c_6 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            1, 0, 0, 0.333333,
            0, 1, 0, 0.666667,
            0, 0, 1, 0.666667,
            0, 0, 0, 1
        ], 0);
    _mat_a_3_b_6_c_6 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            -1, 0, 0, 0,
            0, -1, 0, 0,
            0, 0, -1, 0,
            0, 0, 0, 1
        ], 0);
    _mat_na_nb_nc = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            1, 0, 0, 0,
            0, -1, 0, 0,
            0, 0, -1, 0,
            0, 0, 0, 1
        ], 0);
    _mat_a_nb_nc = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            -1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, -1, 0,
            0, 0, 0, 1

        ], 0);
    _mat_na_b_nc = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            -1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, -1, 0,
            0, 0, 0, 1
        ], 0);
    _mat_na_b_nc = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            -1, 0, 0, 0,
            0, -1, 0, 0,
            0, 0, 1, 0
        ], 0);
    _mat_na_nb_c = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            -1, 0, 0, 0.5,
            0, -1, 0, 0.5,
            0, 0, -1, 0.5,
            0, 0, 0, 1
        ], 0);
    _mat_na_5_nb_5_nc_5 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            -1, 0, 0, 0.5,
            0, -1, 0, 0.5,
            0, 0, -1, 0,
            0, 0, 0, 1
        ], 0);
    _mat_na_5_nb_5_nc_5 = mat;


    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            -1, 0, 0, 0.5,
            0, -1, 0, 0,
            0, 0, -1, 0.5,
            0, 0, 0, 1
        ], 0);
    _mat_na_5_nb_nc_5 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            -1, 0, 0, 0,
            0, -1, 0, 0.5,
            0, 0, -1, 0.5,
            0, 0, 0, 1
        ], 0);
    _mat_na_nb_5_nc_5 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            -1, 0, 0, 0.666667,
            0, -1, 0, 0.666667,
            0, 0, -1, 0.333333,
            0, 0, 0, 1
        ], 0);
    _mat_na_6_nb_6_nc_3 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            -1, 0, 0, 0.666667,
            0, -1, 0, 0.333333,
            0, 0, -1, 0.666667,
            0, 0, 0, 1
        ], 0);
    _mat_na_6_nb_3_nc_3 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            -1, 0, 0, 0.333333,
            0, -1, 0, 0.666667,
            0, 0, -1, 0.666667,
            0, 0, 0, 1
        ], 0);
    _mat_na_3_nb_6_nc_6 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            -1, 0, 0, 0.333333,
            0, -1, 0, 0.333333,
            0, 0, -1, 0.666667,
            0, 0, 0, 1
        ], 0);
    _mat_na_3_nb_3_nc_6 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            -1, 0, 0, 0.333333,
            0, -1, 0, 0.666667,
            0, 0, -1, 0.333333,
            0, 0, 0, 1
        ], 0);
    _mat_na_3_nb_6_nc_3 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            -1, 0, 0, 0.666667,
            0, -1, 0, 0.333333,
            0, 0, -1, 0.333333,
            0, 0, 0, 1
        ], 0);
    _mat_na_6_nb_3_nc_3 = mat;


    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            -1, 0, 0, 0,
            0, -1, 0, 0,
            0, 0, 1, 0.5,
            0, 0, 0, 1
        ], 0);
    _mat_na_nb_c_5 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            -1, 0, 0, 0,
            0, 1, 0, 0.5,
            0, 0, -1, 0,
            0, 0, 0, 1
        ], 0);
    _mat_na_b_5_nc = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            1, 0, 0, 0.5,
            0, -1, 0, 0,
            0, 0, -1, 0,
            0, 0, 0, 1
        ], 0);
    _mat_a_5_nb_nc = mat;


    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            -1, 0, 0, 0,
            0, -1, 0, 0.5,
            0, 0, 1, 0,
            0, 0, 0, 1
        ], 0);
    _mat_na_nb_5_c = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            -1, 0, 0, 0.5,
            0, -1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ], 0);
    _mat_na_5_nb_c = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            -1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, -1, 0.5,
            0, 0, 0, 1
        ], 0);
    _mat_na_b_nc_5 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            -1, 0, 0, 0.5,
            0, 1, 0, 0,
            0, 0, -1, 0,
            0, 0, 0, 1
        ], 0);
    _mat_na_5_b_nc = mat;


    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            1, 0, 0, 0,
            0, -1, 0, 0,
            0, 0, -1, 0.5,
            0, 0, 0, 1
        ], 0);
    _mat_a_nb_nc_5 = mat;


    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            1, 0, 0, 0,
            0, -1, 0, 0.5,
            0, 0, -1, 0,
            0, 0, 0, 1
        ], 0);
    _mat_a_nb_5_nc = mat;





    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            -1, 0, 0, 0.5,
            0, -1, 0, 0.5,
            0, 0, 1, 0,
            0, 0, 0, 1
        ], 0);
    _mat_na_5_nb_5_c = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            -1, 0, 0, 0.5,
            0, -1, 0, 0,
            0, 0, 1, 0.5,
            0, 0, 0, 1
        ], 0);
    _mat_na_5_nb_c_5 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            -1, 0, 0, 0,
            0, -1, 0, 0.5,
            0, 0, 1, 0.5,
            0, 0, 0, 1
        ], 0);
    _mat_na_nb_5_c_5 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            -1, 0, 0, 0.5,
            0, 1, 0, 0,
            0, 0, -1, 0.5,
            0, 0, 0, 1
        ], 0);
    _mat_na_5_b_5_nc = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            -1, 0, 0, 0.5,
            0, 1, 0, 0,
            0, 0, -1, 0.5,
            0, 0, 0, 1
        ], 0);
    _mat_na_5_b_nc_5 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            -1, 0, 0, 0,
            0, 1, 0, 0.5,
            0, 0, -1, 0.5,
            0, 0, 0, 1
        ], 0);
    _mat_na_b_5_nc_5 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            1, 0, 0, 0.5,
            0, -1, 0, 0.5,
            0, 0, -1, 0,
            0, 0, 0, 1
        ], 0);
    _mat_a_5_nb_5_nc = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            1, 0, 0, 0.5,
            0, -1, 0, 0,
            0, 0, -1, 0.5,
            0, 0, 0, 1
        ], 0);
    _mat_a_5_nb_nc_5 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            1, 0, 0, 0,
            0, -1, 0, 0.5,
            0, 0, -1, 0.5,
            0, 0, 0, 1
        ], 0);
    _mat_a_nb_5_nc_5 = mat;



    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            -1, 0, 0, 0.5,
            0, -1, 0, 0.5,
            0, 0, 1, 0.5,
            0, 0, 0, 1
        ], 0);
    _mat_na_5_nb_5_c_5 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            -1, 0, 0, 0.5,
            0, 1, 0, 0, 0.5,
            0, 0, -1, 0.5,
            0, 0, 0, 1
        ], 0);
    _mat_na_5_b_5_nc_5 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            1, 0, 0, 0.5,
            0, -1, 0, 0.5,
            0, 0, -1, 0.5,
            0, 0, 0, 1
        ], 0);
    _mat_a_5_nb_5_nc_5 = mat;


    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, -1, 0.5,
            0, 0, 0, 1
        ], 0);
    _mat_a_b_nc_5 = mat;


    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            1, 0, 0, 0,
            0, 1, 0, 0.5,
            0, 0, -1, 0,
            0, 0, 0, 1
        ], 0);
    _mat_a_b_5_nc = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            1, 0, 0, 0.5,
            0, 1, 0, 0,
            0, 0, -1, 0,
            0, 0, 0, 1
        ], 0);
    _mat_a_5_b_nc = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            1, 0, 0, 0,
            0, -1, 0, 0,
            0, 0, 1, 0.5,
            0, 0, 0, 1
        ], 0);
    _mat_a_nb_c_5 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            1, 0, 0, 0,
            0, -1, 0, 0.5,
            0, 0, 1, 0,
            0, 0, 0, 1
        ], 0);
    _mat_a_nb_5_c = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            1, 0, 0, 0.5,
            0, -1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ], 0);
    _mat_a_5_nb_c = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            -1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0.5,
            0, 0, 0, 1
        ], 0);
    _mat_na_b_c_5 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            -1, 0, 0, 0,
            0, 1, 0, 0.5,
            0, 0, 1, 0,
            0, 0, 0, 1
        ], 0);
    _mat_na_b_5_c = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            -1, 0, 0, 0.5,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ], 0);
    _mat_na_5_b_c = mat;





    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            1, 0, 0, 0,
            0, 1, 0, 0.5,
            0, 0, -1, 0.5,
            0, 0, 0, 1
        ], 0);
    _mat_a_b_5_nc_5 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            1, 0, 0, 0.5,
            0, 1, 0, 0,
            0, 0, -1, 0.5,
            0, 0, 0, 1
        ], 0);
    _mat_a_5_b_nc_5 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            1, 0, 0, 0.5,
            0, 1, 0, 0.5,
            0, 0, -1, 0,
            0, 0, 0, 1
        ], 0);
    _mat_a_5_b_5_nc = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            1, 0, 0, 0,
            0, -1, 0, 0.5,
            0, 0, 1, 0.5,
            0, 0, 0, 1
        ], 0);
    _mat_a_nb_5_c_5 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            1, 0, 0, 0.5,
            0, -1, 0, 0,
            0, 0, 1, 0.5,
            0, 0, 0, 1
        ], 0);
    _mat_a_5_nb_c_5 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            1, 0, 0, 0.5,
            0, -1, 0, 0.5,
            0, 0, 1, 0,
            0, 0, 0, 1
        ], 0);
    _mat_a_5_nb_5_c = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            -1, 0, 0, 0,
            0, 1, 0, 0.5,
            0, 0, 1, 0.5,
            0, 0, 0, 1
        ], 0);
    _mat_na_b_5_c_5 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            -1, 0, 0, 0.5,
            0, 1, 0, 0,
            0, 0, 1, 0.5,
            0, 0, 0, 1
        ], 0);
    _mat_na_5_b_c_5 = mat;


    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            -1, 0, 0, 0.5,
            0, 1, 0, 0.5,
            0, 0, 1, 0,
            0, 0, 0, 1
        ], 0);
    _mat_na_5_b_5_c = mat;


    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            1, 0, 0, 0.5,
            0, 1, 0, 0.5,
            0, 0, -1, 0.5,
            0, 0, 0, 1
        ], 0);
    _mat_a_5_b_5_nc_5 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            1, 0, 0, 0.5,
            0, -1, 0, 0.5,
            0, 0, 1, 0.5,
            0, 0, 0, 1
        ], 0);
    _mat_a_5_nb_5_c_5 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            -1, 0, 0, 0.5,
            0, 1, 0, 0.5,
            0, 0, 1, 0.5,
            0, 0, 0, 1
        ], 0);
    _mat_na_5_b_5_c_5 = mat;



    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, -1, 0, 0,
            1, -1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ], 0);
    _mat_$_nb_$_a_nb_$_c = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            -1, 1, 0, 0,
            -1, 0, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ], 0);
    _mat_$_na_b_$_na_$_c = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, 1, 0, 0,
            -1, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ], 0);
    _mat_$_b_$_na_b_$_c = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            1, -1, 0, 0,
            1, 0, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ], 0);
    _mat_$_a_nb_$_a_$_c = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, -1, 0, 0,
            1, -1, 0, 0,
            0, 0, 1, 0.333333,
            0, 0, 0, 1
        ], 0);
    _mat_$_nb_$_a_nb_$_c_3 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            -1, 1, 0, 0,
            -1, 0, 0, 0,
            0, 0, 1, 0.666667,
            0, 0, 0, 1
        ], 0);
    _mat_$_na_b_$_na_$_c_6 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, 1, 0, 0,
            -1, 1, 0, 0,
            0, 0, 1, 0.833333,
            0, 0, 0, 1
        ], 0);
    _mat_$_b_$_na_b_$_c_8 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            1, -1, 0, 0,
            1, 0, 0, 0,
            0, 0, 1, 0.166667,
            0, 0, 0, 1
        ], 0);
    _mat_$_a_nb_$_a_$_c_1 = mat;


    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, -1, 0, 0,
            1, -1, 0, 0,
            0, 0, 1, 0.666667,
            0, 0, 0, 1
        ], 0);
    _mat_$_nb_$_a_nb_$_c_6 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            -1, 1, 0, 0,
            -1, 0, 0, 0,
            0, 0, 1, 0.333333,
            0, 0, 0, 1
        ], 0);
    _mat_$_na_b_$_na_$_c_3 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, 1, 0, 0,
            -1, 1, 0, 0,
            0, 0, 1, 0.166667,
            0, 0, 0, 1
        ], 0);
    _mat_$_b_$_na_b_$_c_1 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            1, -1, 0, 0,
            1, 0, 0, 0,
            0, 0, 1, 0.833333,
            0, 0, 0, 1
        ], 0);
    _mat_$_a_nb_$_a_$_c_8 = mat;


    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, 1, 0, 0,
            -1, 1, 0, 0,
            0, 0, 1, 0.666667,
            0, 0, 0, 1
        ], 0);
    _mat_$_b_$_na_b_$_c_6 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            1, -1, 0, 0,
            1, 0, 0, 0,
            0, 0, 1, 0.33333,
            0, 0, 0, 1
        ], 0);
    _mat_$_a_nb_$_a_$_c_3 = mat;


    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, 1, 0, 0,
            -1, 1, 0, 0,
            0, 0, 1, 0.33333,
            0, 0, 0, 1
        ], 0);
    _mat_$_b_$_na_b_$_c_3 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            1, -1, 0, 0,
            1, 0, 0, 0,
            0, 0, 1, 0.666667,
            0, 0, 0, 1
        ], 0);
    _mat_$_a_nb_$_a_$_c_6 = mat;


    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, 1, 0, 0,
            -1, 1, 0, 0,
            0, 0, 1, 0.5,
            0, 0, 0, 1
        ], 0);
    _mat_$_b_$_na_b_$_c_5 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            1, -1, 0, 0,
            1, 0, 0, 0,
            0, 0, 1, 0.5,
            0, 0, 0, 1
        ], 0);
    _mat_$_a_nb_$_a_$_c_5 = mat;



    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, -1, 0, 0,
            1, -1, 0, 0,
            0, 0, -1, 0,
            0, 0, 0, 1
        ], 0);
    _mat_$_nb_$_a_nb_$_nc = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            -1, 1, 0, 0,
            -1, 0, 0, 0,
            0, 0, -1, 0,
            0, 0, 0, 1
        ], 0);
    _mat_$_na_b_$_na_$_nc = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, -1, 0, 0,
            1, -1, 0, 0,
            0, 0, -1, 0,
            0, 0, 0, 1
        ], 0);
    _mat_$_nb_$_a_nb_$_nc = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            -1, 1, 0, 0,
            -1, 0, 0, 0,
            0, 0, -1, 0,
            0, 0, 0, 1
        ], 0);
    _mat_$_na_b_$_na_$_nc = mat;


    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, 1, 0, 0,
            -1, 1, 0, 0,
            0, 0, -1, 0,
            0, 0, 0, 1
        ], 0);
    _mat_$_b_$_na_b_$_nc = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            -1, 1, 0, 0,
            -1, 0, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ], 0);
    _mat_$_na_$_b_$_na_c = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            1, -1, 0, 0,
            1, 0, 0, 0,
            0, 0, -1, 0,
            0, 0, 0, 1
        ], 0);
    _mat_$_a_nb_$_a_$_nc = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, -1, 0, 0,
            1, -1, 0, 0,
            0, 0, -1, 0.5
        ], 0);
    _mat_$_nb_$_a_nb_$_nc_5 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            -1, 1, 0, 0,
            -1, 0, 0, 0,
            0, 0, -1, 0.5,
            0, 0, 0, 1
        ], 0);
    _mat_$_na_b_$_na_$_nc_5 = mat;


    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, 1, 0, 0,
            1, 0, 0, 0,
            0, 0, -1, 0,
            0, 0, 0, 1
        ], 0);
    _mat_b_a_nc = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            1, -1, 0, 0,
            0, -1, 0, 0,
            0, 0, -1, 0,
            0, 0, 0, 1
        ], 0);
    _mat_$_a_nb_$_nb_$_nc = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            -1, 0, 0, 0,
            -1, 1, 0, 0,
            0, 0, -1, 0,
            0, 0, 0, 1
        ], 0);
    _mat_$_na_$_na_b_$_nc = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, -1, 0, 0,
            -1, 0, 0, 0,
            0, 0, -1, 0,
            0, 0, 0, 1
        ], 0);
    _mat_nb_na_nc = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            -1, 1, 0, 0,
            0, 1, 0, 0,
            0, 0, -1, 0,
            0, 0, 0, 1
        ], 0);
    _mat_$_na_b_$_b_$_nc = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            1, 0, 0, 0,
            1, -1, 0, 0,
            0, 0, -1, 0,
            0, 0, 0, 1
        ], 0);

    _mat_$_a_$_a_nb_$_nc = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, 1, 0, 0,
            -1, 1, 0, 0,
            0, 0, 1, 0.833333,
            0, 0, 0, 1
        ], 0);
    _mat_$_nb_$_na_b_$_c_8 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, 1, 0, 0,
            1, 0, 0, 0,
            0, 0, -1, 0.333333,
            0, 0, 0, 1
        ], 0);

    _mat_b_a_nc_3 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            -1, 0, 0, 0,
            -1, 1, 0, 0,
            0, 0, -1, 0.677777,
            0, 0, 0, 1
        ], 0);
    _mat_$_na_$_na_b_$_nc_6 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, -1, 0, 0,
            -1, 0, 0, 0,
            0, 0, -1, 0.833333,
            0, 0, 0, 1
        ], 0);
    _mat_nb_na_nc_8 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            -1, 1, 0, 0,
            0, 1, 0, 0,
            0, 0, -1, 0.5,
            0, 0, 0, 1
        ], 0);
    _mat_$_na_b_$_b_$_nc_5 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            1, 0, 0, 0,
            1, -1, 0, 0,
            0, 0, -1, 0.166667,
            0, 0, 0, 1
        ], 0);
    _mat_$_a_$_a_nb_$_nc_1 = mat;



    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            1, -1, 0, 0,
            1, 0, 0, 0,
            0, 0, 1, 0.833333,
            0, 0, 0, 1
        ], 0);
    _mat_$_a_nb_$_a_$_nc_8 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, 1, 0, 0,
            1, 0, 0, 0,
            0, 0, -1, 0.666667,
            0, 0, 0, 1
        ], 0);
    _mat_b_a_nc_6 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            -1, 0, 0, 0,
            -1, 1, 0, 0,
            0, 0, -1, 0.333333,
            0, 0, 0, 1
        ], 0);
    _mat_$_na_$_na_b_$_nc_3 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, -1, 0, 0,
            -1, 0, 0, 0,
            0, 0, -1, 0.166667,
            0, 0, 0, 1
        ], 0);
    _mat_nb_na_nc_1 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            1, 0, 0, 0,
            1, -1, 0, 0,
            0, 0, -1, 0.833333,
            0, 0, 0, 1
        ], 0);
    _mat_$_a_$_a_nb_$_nc_8 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, -1, 0, 0,
            -1, 0, 0, 0,
            0, 0, -1, 0.666667
        ], 0);
    _mat_nb_na_nc_6 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            1, 0, 0, 0,
            1, -1, 0, 0,
            0, 0, -1, 0.333333,
            0, 0, 0, 1
        ], 0);
    _mat_$_a_$_a_nb_$_nc_3 = mat;


    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, 1, 0, 0,
            1, 0, 0, 0,
            0, 0, -1, 0.333333,
            0, 0, 0, 1
        ], 0);
    _mat_$_b_$_a_$_nc_3 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, -1, 0, 0,
            -1, 0, 0, 0,
            0, 0, -1, 0.333333,
            0, 0, 0, 1
        ], 0);
    _mat_nb_na_nc_3 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            1, 0, 0, 0,
            1, -1, 0, 0,
            0, 0, -1, 0.666667,
            0, 0, 0, 1
        ], 0);
    _mat_$_a_$_a_nb_$_nc_6 = mat;





    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, -1, 0, 0,
            -1, 0, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ], 0);
    _mat_nb_na_c = mat;
    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            -1, 1, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ], 0);
    _mat_$_na_b_$_b_$_c = mat;
    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            1, 0, 0, 0,
            1, -1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ], 0);
    _mat_$_a_$_a_nb_$_c = mat;
    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, -1, 0, 0,
            -1, 0, 0, 0,
            0, 0, -1, 0.5,
            0, 0, 0, 1
        ], 0);
    _mat_nb_na_nc_5 = mat;
    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, 1, 0, 0,
            1, 0, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ], 0);
    _mat_b_a_c_5 = mat;
    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            1, -1, 0, 0,
            0, -1, 0, 0,
            0, 0, 1, 0.5,
            0, 0, 0, 1
        ], 0);
    _mat_$_a_nb_$_nb_$_c_5 = mat;
    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            1, 0, 0, 0,
            1, -1, 0, 0,
            0, 0, -1, 0.5,
            0, 0, 0, 1
        ], 0);
    _mat_$_a_$_a_nb_$_nc_5 = mat;
    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            -1, 0, 0, 0,
            -1, 1, 0, 0,
            0, 0, 1, 0.5,
            0, 0, 0, 1
        ], 0);
    _mat_$_na_$_na_b_$_c_5 = mat;


    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, 1, 0, 0,
            1, 0, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ], 0);
    _mat_b_a_c = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            1, -1, 0, 0,
            0, -1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ], 0);
    _mat_$_a_nb_$_nb_$_c = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            -1, 0, 0, 0,
            -1, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ], 0);
    _mat_$_na_$_na_b_$_c = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, -1, 0, 0,
            -1, 0, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ], 0);
    _mat_nb_na_c_5 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            -1, 1, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0.5,
            0, 0, 0, 1
        ], 0);
    _mat_na_b_$_b_$_c_5 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            1, 0, 0, 0,
            1, -1, 0, 0,
            0, 0, 1, 0.5,
            0, 0, 0, 1
        ], 0);
    _mat_a_$_a_nb_$_c_5 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, 1, 0, 0,
            1, 0, 0, 0,
            0, 0, -1, 0.5,
            0, 0, 0, 1
        ], 0);
    _mat_b_a_nc_5 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            1, -1, 0, 0,
            0, -1, 0, 0,
            0, 0, -1, 0.5,
            0, 0, 0, 1
        ], 0);
    _mat_$_a_nb_$_nc_$_nc_5 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            -1, 0, 0, 0,
            -1, 1, 0, 0,
            0, 0, -1, 0.5,
            0, 0, 0, 1
        ], 0);
    _mat_$_na_$_na_b_$_nc_5 = mat;



    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, 0, 1, 0,
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 0, 1
        ], 0);
    _mat_c_a_b = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [

            0, 0, 1, 0,
            -1, 0, 0, 0,
            0, -1, 0, 0,
            0, 0, 0, 1
        ], 0);
    _mat_c_na_nb = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, 0, -1, 0,
            -1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 0, 1
        ], 0);
    _mat_nc_na_b = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, 0, -1, 0,
            1, 0, 0, 0,
            0, -1, 0, 0,
            0, 0, 0, 1
        ], 0);
    _mat_nc_a_nb = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, 1, 0, 0,
            0, 0, 1, 0,
            1, 0, 0, 0,
            0, 0, 0, 1
        ], 0);
    _mat_b_c_a = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, -1, 0, 0,
            0, 0, 1, 0,
            -1, 0, 0, 0,
            0, 0, 0, 1
        ], 0);
    _mat_nb_c_na = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, 1, 0, 0,
            0, 0, -1, 0,
            -1, 0, 0, 0,
            0, 0, 0, 1
        ], 0);
    _mat_b_nc_na = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, -1, 0, 0,
            0, 0, -1, 0,
            1, 0, 0, 0,
            0, 0, 0, 1
        ], 0);
    _mat_nb_nc_a = mat;







    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, 0, 1, 0,
            1, 0, 0, 0.5,
            0, 1, 0, 0.5,
            0, 0, 0, 1
        ], 0);
    _mat_c_a_5_b_5 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, 0, 1, 0,
            -1, 0, 0, 0.5,
            0, -1, 0, 0.5,
            0, 0, 0, 1
        ], 0);
    _mat_c_na_5_nb_5 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, 0, -1, 0,
            -1, 0, 0, 0.5,
            0, 1, 0, 0.5,
            0, 0, 0, 1
        ], 0);
    _mat_nc_na_5_b_5 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, 0, -1, 0,
            1, 0, 0, 0.5,
            0, -1, 0, 0.5,
            0, 0, 0, 1
        ], 0);
    _mat_nc_a_5_nb_5 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, 1, 0, 0,
            0, 0, 1, 0.5,
            1, 0, 0, 0.5,
            0, 0, 0, 1
        ], 0);
    _mat_b_c_5_a_5 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, -1, 0, 0,
            0, 0, 1, 0.5,
            -1, 0, 0, 0.5,
            0, 0, 0, 1
        ], 0);
    _mat_nb_c_5_na_5 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, 1, 0, 0,
            0, 0, -1, 0.5,
            -1,0,0,0.5
        ], 0);
    _mat_b_nc_5_na_5 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, -1, 0, 0,
            0, 0, -1, 0.5,
            1, 0, 0, 0.5,
            0, 0, 0, 1
        ], 0);
    _mat_nb_na_5_a_5 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, 0, 1, 0.5,
            1, 0, 0, 0,
            0, 1, 0, 0.5,
            0, 0, 0, 1
        ], 0);
    _mat_c_5_a_b_5 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, 0, 1, 0.5,
            -1, 0, 0, 0,
            0, -1, 0, 0.5,
            0, 0, 0, 1
        ], 0);
    _mat_c_5_na_nb_5 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, 0, -1, 0.5,
            -1, 0, 0, 0,
            0, 1, 0, 0.5,
            0, 0, 0, 1
        ], 0);
    _mat_nc_5_na_b_5 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, 0, 0 - 1, 0.5,
            1, 0, 0, 0,
            0, -1, 0, 0.5,
            0, 0, 0, 1
        ], 0);
    _mat_nc_5_a_nb_5 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, 1, 0, 0.5,
            0, 0, 1, 0,
            1, 0, 0, 0.5,
            0, 0, 0, 1
        ], 0);
    _mat_b_5_c_a_5 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, -1, 0, 0.5,
            0, 0, 1, 0,
            -1, 0, 0, 0.5,
            0, 0, 0, 1
        ], 0);
    _mat_nb_5_c_na_5 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, 1, 0, 0.5,
            0, 0, -1, 0,
            -1, 0, 0, 0.5,
            0, 0, 0, 1
        ], 0);
    _mat_b_5_nc_na_5 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, -1, 0, 0.5,
            0, 0, -1, 0,
            1, 0, 0, 0.5,
            0, 0, 0, 1
        ], 0);
    _mat_nb_5_nc_a_5 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, 0, 1, 0.5,
            1, 0, 0, 0.5,
            0, 1, 0, 0,
            0, 0, 0, 1
        ], 0);
    _mat_c_5_a_5_b = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, 0, 1, 0.5,
            -1, 0, 0, 0.5,
            0, -1, 0, 0,
            0, 0, 0, 1
        ], 0);
    _mat_c_5_na_5_nb = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, 0, -1, 0.5,
            -1, 0, 0, 0.5,
            0, 1, 0, 0,
            0, 0, 0, 1
        ], 0);
    _mat_nc_5_na_5_b = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, 0, -1, 0.5,
            1, 0, 0, 0.5,
            0, -1, 0, 0,
            0, 0, 0, 1
        ], 0);
    _mat_na_5_a_5_nb = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, 1, 0, 0.5,
            0, 0, 1, 0.5,
            1, 0, 0, 0,
            0, 0, 0, 1
        ], 0);
    _mat_b_5_c_5_a = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, -1, 0, 0.5,
            0, 0, 1, 0.5,
            -1, 0, 0, 0,
            0, 0, 0, 1
        ], 0);
    _mat_nb_5_c_5_na = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, 1, 0, 0.5,
            0, 0, -1, 0.5,
            -1, 0, 0, 0,
            0, 0, 0, 1
        ], 0);
    _mat_b_5_nc_5_na = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, -1, 0, 0.5,
            0, 0, -1, 0.5,
            1, 0, 0, 0,
            0, 0, 0, 1
        ], 0);
    _mat_nb_5_nc_5_a = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, 0, 1, 0.5,
            1, 0, 0, 0.5,
            0, 1, 0, 0.5,
            0, 0, 0, 1
        ], 0);
    _mat_c_5_a_5_b_5 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, 0, 1, 0.5,
            -1, 0, 0, 0.5,
            0, -1, 0, 0.5,
            0, 0, 0, 1
        ], 0);
    _mat_c_5_na_5_nb_5 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, 0, -1, 0.5,
            -1, 0, 0, 0.5,
            0, 1, 0, 0.5,
            0, 0, 0, 1
        ], 0);
    _mat_nc_5_na_5_b_5 = mat;
    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, 0, -1, 0.5,
            1, 0, 0, 0.5,
            0, -1, 0, 0.5,
            0, 0, 0, 1
        ], 0);
    _mat_nc_5_a_5_nb_5 = mat;
    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, 1, 0, 0.5,
            0, 0, 1, 0.5,
            1, 0, 0, 0.5,
            0, 0, 0, 1
        ], 0);
    _mat_b_5_c_5_a_5 = mat;
    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, -1, 0, 0.5,
            0, 0, 1, 0.5,
            -1, 0, 0, 0.5,
            0, 0, 0, 1
        ], 0);
    _mat_nb_5_c_5_na_5 = mat;
    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, 1, 0, 0.5,
            0, 0, -1, 0.5,
            -1, 0, 0, 0.5,
            0, 0, 0, 1
        ], 0);
    _mat_b_5_nc_5_na_5 = mat;
    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, -1, 0, 0.5,
            0, 0, -1, 0.5,
            1, 0, 0, 0.5,
            0, 0, 0, 1
        ], 0);
    _mat_nb_5_nc_5_a_5 = mat;


    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, 0, 1, 0.5,
            -1, 0, 0, 0.5,
            0, -1, 0, 0,
            0, 0, 0, 1
        ], 0);
    _mat_c_5_na_5_nb = mat;
    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, 0, -1, 0.5,
            -1, 0, 0, 0,
            0, 1, 0, 0.5,
            0, 0, 0, 1
        ], 0);
    _mat_nc_5_na_b_5 = mat;
    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, 0, -1, 0,
            1, 0, 0, 0.5,
            0, -1, 0, 0.5,
            0, 0, 0, 1
        ], 0);
    _mat_nc_a_5_nb_5 = mat;
    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, -1, 0, 0,
            0, 0, 1, 0.5,
            -1, 0, 0, 0.5,
            0, 0, 0, 1
        ], 0);
    _mat_nb_c_5_na_5 = mat;
    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, 1, 0, 0.5,
            0, 0, -1, 0.5,
            -1, 0, 0, 0,
            0, 0, 0, 1
        ], 0);
    _mat_b_5_nc_5_na = mat;
    mat = new THREE.Matrix4();
    mat.fromArray(
        [
            0, -1, 0, 0.5,
            0, 0, -1, 0,
            1, 0, 0, 0.5,
            0, 0, 0, 1
        ], 0);
    _mat_nb_5_nc_a_5 = mat;



    mat = new THREE.Matrix4();
    mat.fromArray([
        0, 0, -1, 0.5,
        -1, 0, 0, 0,
        0, 1, 0, 0.5,
        0, 0, 0, 1
    ], 0);
    _mat_na_5_na_b_5 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray([
        0, 0, -1, 0,
        1, 0, 0, 0.5,
        0, -1, 0, 0.5,
        0, 0, 0, 1
    ], 0);
    _mat_nc_a_5_b_5 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray([
        0, 0, 1, 0,
        -1, 0, 0, 0,
        0, -1, 0, 0.5,
        0, 0, 0, 1
    ], 0);
    _mat_c_na_nb_5 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray([
        0, 0, -1, 0,
        -1, 0, 0, 0.5,
        0, 1, 0, 0,
        0, 0, 0, 1
    ], 0);
    _mat_nc_na_5_b = mat;

    mat = new THREE.Matrix4();
    mat.fromArray([
        0, 0, -1, 0.5,
        1, 0, 0, 0,
        0, -1, 0, 0,
        0, 0, 0, 1
    ], 0);
    _mat_nc_5_a_nb = mat;

    mat = new THREE.Matrix4();
    mat.fromArray([
        0, -1, 0, 0.5,
        0, 0, 1, 0,
        -1, 0, 0, 0,
        0, 0, 0, 1
    ], 0);
    _mat_nb_5_c_na = mat;

    mat = new THREE.Matrix4();
    mat.fromArray([
        0, 1, 0, 0,
        0, 0, -1, 0,
        -1, 0, 0, 0.5,
        0, 0, 0, 1
    ], 0);
    _mat_b_nc_na_5 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray([
        0, -1, 0, 0,
        0, 0, -1, 0.5,
        1, 0, 0, 0,
        0, 0, 0, 1
    ], 0);
    _mat_nb_nc_5_a = mat;


    mat = new THREE.Matrix4();
    mat.fromArray([
        0, 1, 0, 0,
        -1, 0, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ], 0);
    _mat_b_na_c = mat;

    mat = new THREE.Matrix4();
    mat.fromArray([
        0, -1, 0, 0,
        1, 0, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ], 0);
    _mat_nb_a_c = mat;

    mat = new THREE.Matrix4();
    mat.fromArray([
        1, 0, 0, 0,
        0, 0, 1, 0,
        0, -1, 0, 0,
        0, 0, 0, 1
    ], 0);
    _mat_a_c_nb = mat;

    mat = new THREE.Matrix4();
    mat.fromArray([
        -1, 0, 0, 0,
        0, 0, 1, 0,
        0, 1, 0, 0,
        0, 0, 0, 1
    ], 0);
    _mat_na_c_b = mat;

    mat = new THREE.Matrix4();
    mat.fromArray([
        -1, 0, 0, 0,
        0, 0, -1, 0,
        0, -1, 0, 0,
        0, 0, 0, 1
    ], 0);
    _mat_na_nc_nb = mat;

    mat = new THREE.Matrix4();
    mat.fromArray([
        1, 0, 0, 0,
        0, 0, -1, 0,
        0, 1, 0, 0,
        0, 0, 0, 1
    ], 0);
    _mat_a_nc_b = mat;

    mat = new THREE.Matrix4();
    mat.fromArray([
        0, 0, 1, 0,
        0, 1, 0, 0,
        -1, 0, 0, 0,
        0, 0, 0, 1
    ], 0);
    _mat_c_b_na = mat;

    mat = new THREE.Matrix4();
    mat.fromArray([
        0, 0, 1, 0,
        0, -1, 0, 0,
        1, 0, 0, 0,
        0, 0, 0, 1
    ], 0);
    _mat_c_nb_a = mat;

    mat = new THREE.Matrix4();
    mat.fromArray([
        0, 0, -1, 0,
        0, 1, 0, 0,
        1, 0, 0, 0,
        0, 0, 0, 1
    ], 0);
    _mat_nc_b_a = mat;

    mat = new THREE.Matrix4();
    mat.fromArray([
        0, 0, -1, 0,
        0, -1, 0, 0,
        -1, 0, 0, 0,
        0, 0, 0, 1
    ], 0);
    _mat_nc_nb_na = mat;

    mat = new THREE.Matrix4();
    mat.fromArray([
        0, 1, 0, 0.5,
        1, 0, 0, 0.5,
        0, 0, -1, 0.5,
        0, 0, 0, 1
    ], 0);
    _mat_b_5_a_5_nc_5 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray([
        0, -1, 0, 0.5,
        -1, 0, 0, 0.5,
        0, 0, -1, 0.5,
        0, 0, 0, 1
    ], 0);
    _mat_nb_5_na_5_nc_5 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray([
        0, 1, 0, 0.5,
        -1, 0, 0, 0.5,
        0, 0, 1, 0.5,
        0, 0, 0, 1
    ], 0);
    _mat_b_5_na_5_c_5 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray([
        0, -1, 0, 0.5,
        1, 0, 0, 0.5,
        0, 0, 1, 0.5,
        0, 0, 0, 1
    ], 0);
    _mat_nb_5_a_5_c_5 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray([
        1, 0, 0, 0.5,
        0, 0, 1, 0.5,
        0, -1, 0, 0.5,
        0, 0, 0, 1
    ], 0);
    _mat_a_5_c_5_nb_5 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray([
        -1, 0, 0, 0.5,
        0, 0, 1, 0.5,
        0, 1, 0, 0.5,
        0, 0, 0, 1
    ], 0);
    _mat_na_5_c_5_b_5 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray([
        -1, 0, 0, 0.5,
        0, 0, -1, 0.5,
        0, -1, 0, 0.5,
        0, 0, 0, 1
    ], 0);
    _mat_na_5_nc_5_nb_5 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray([
        1, 0, 0, 0.5,
        0, 0, -1, 0.5,
        0, 1, 0, 0.5,
        0, 0, 0, 1
    ], 0);
    _mat_a_5_nc_5_b_5 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray([
        0, 0, 1, 0.5,
        0, 1, 0, 0.5,
        -1, 0, 0, 0.5,
        0, 0, 0, 1
    ], 0);
    _mat_c_5_b_5_na_5 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray([
        0, 0, 1, 0.5,
        0, -1, 0, 0.5,
        1, 0, 0, 0.5,
        0, 0, 0, 1
    ], 0);
    _mat_c_5_nb_5_a_5 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray([
        0, 0, -1, 0.5,
        0, 1, 0, 0.5,
        1, 0, 0, 0.5,
        0, 0, 0, 1
    ], 0);
    _mat_nc_5_b_5_a_5 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray([
        0, 0, -1, 0.5,
        0, -1, 0, 0.5,
        -1, 0, 0, 0.5,
        0, 0, 0, 1
    ], 0);
    _mat_nc_5_nb_5_na_5 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray([
        0, 0, -1, 0,
        -1, 0, 0, 0,
        0, -1, 0, 0,
        0, 0, 0, 1
    ], 0);
    _mat_nc_na_nb = mat;

    mat = new THREE.Matrix4();
    mat.fromArray([
        0, 0, -1, 0,
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 0, 1
    ], 0);
    _mat_nc_a_b = mat;

    mat = new THREE.Matrix4();
    mat.fromArray([
        0, 0, 1, 0,
        1, 0, 0, 0,
        0, -1, 0, 0,
        0, 0, 0, 1
    ], 0);
    _mat_c_a_nb = mat;

    mat = new THREE.Matrix4();
    mat.fromArray([
        0, 0, 1, 0,
        -1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 0, 1
    ], 0);
    _mat_c_na_b = mat;

    mat = new THREE.Matrix4();
    mat.fromArray([
        0, -1, 0, 0,
        0, 0, -1, 0,
        -1, 0, 0, 0,
        0, 0, 0, 1
    ], 0);
    _mat_nb_nc_na = mat;

    mat = new THREE.Matrix4();
    mat.fromArray([
        0, 1, 0, 0,
        0, 0, -1, 0,
        1, 0, 0, 0,
        0, 0, 0, 1
    ], 0);
    _mat_b_nc_a = mat;

    mat = new THREE.Matrix4();
    mat.fromArray([
        0, -1, 0, 0,
        0, 0, 1, 0,
        1, 0, 0, 0,
        0, 0, 0, 1
    ], 0);
    _mat_nb_c_a = mat;


    mat = new THREE.Matrix4();
    mat.fromArray([
        0, 1, 0, 0,
        0, 0, 1, 0,
        -1, 0, 0, 0,
        0, 0, 0, 1
    ], 0);
    _mat_b_c_na = mat;


    mat = new THREE.Matrix4();
    mat.fromArray([
        0, -1, 0, 0,
        1, 0, 0, 0,
        0, 0, -1, 0,
        0, 0, 0, 1
    ], 0);
    _mat_nb_a_nc = mat;


    mat = new THREE.Matrix4();
    mat.fromArray([
        0, 0, -1, 0,
        -1, 0, 0, 0,
        0, -1, 0, 0,
        0, 0, 0, 1
    ], 0);
    _mat_b_na_nc = mat;

    mat = new THREE.Matrix4();
    mat.fromArray([
        -1, 0, 0, 0,
        0, 0, -1, 0,
        0, 1, 0, 0,
        0, 0, 0, 1
    ], 0);
    _mat_na_nc_b = mat;


    mat = new THREE.Matrix4();
    mat.fromArray([
        1, 0, 0, 0,
        0, 0, -1, 0,
        0, -1, 0, 0,
        0, 0, 0, 1
    ], 0);
    _mat_a_nc_nb = mat;

    mat = new THREE.Matrix4();
    mat.fromArray([
        1, 0, 0, 0,
        0, 0, 1, 0,
        0, 1, 0, 0,
        0, 0, 0, 1
    ], 0);
    _mat_a_c_b = mat;

    mat = new THREE.Matrix4();
    mat.fromArray([
        -1, 0, 0, 0,
        0, 0, 1, 0,
        0, -1, 0, 0,
        0, 0, 0, 1
    ], 0);
    _mat_na_c_nb = mat;

    mat = new THREE.Matrix4();
    mat.fromArray([
        0, 0, -1, 0,
        0, -1, 0, 0,
        1, 0, 0, 0,
        0, 0, 0, 1
    ], 0);
    _mat_nc_nb_a = mat;

    mat = new THREE.Matrix4();
    mat.fromArray([
        0, 0, -1, 0,
        0, 1, 0, 0,
        -1, 0, 0, 0,
        0, 0, 0, 1
    ], 0);
    _mat_nc_b_na = mat;

    mat = new THREE.Matrix4();
    mat.fromArray([
        0, 0, 1, 0,
        0, -1, 0, 0,
        -1, 0, 0, 0,
        0, 0, 0, 1
    ], 0);
    _mat_c_nb_na = mat;

    mat = new THREE.Matrix4();
    mat.fromArray([
        0, 0, 1, 0,
        0, 1, 0, 0,
        1, 0, 0, 0,
        0, 0, 0, 1
    ], 0);
    _mat_c_b_a = mat;

    mat = new THREE.Matrix4();
    mat.fromArray([
        0, 0, -1, 0.5,
        -1, 0, 0, 0.5,
        0, -1, 0, 0.5,
        0, 0, 0, 1
    ], 0);
    _mat_nc_5_na_5_nb_5 = mat;


    mat = new THREE.Matrix4();
    mat.fromArray([
        0, 0, -1, 0.5,
        1, 0, 0, 0.5,
        0, 1, 0, 0.5,
        0, 0, 0, 1
    ], 0);
    _mat_nc_5_a_5_b_5 = mat;
    mat = new THREE.Matrix4();
    mat.fromArray([
        0, 0, 1, 0.5,
        1, 0, 0, 0.5,
        0, -1, 0, 0.5
    ], 0);
    _mat_c_5_a_5_nb_5 = mat;
    mat = new THREE.Matrix4();
    mat.fromArray([
        0, 0, 1, 0.5,
        -1, 0, 0, 0.5,
        0, 1, 0, 0.5,
        0, 0, 0, 1
    ], 0);
    _mat_c_5_na_5_b_5 = mat;
    mat = new THREE.Matrix4();
    mat.fromArray([
        0, -1, 0, 0.5,
        0, 0, -1, 0.5,
        -1, 0, 0, 0.5
    ], 0);
    _mat_nb_5_nc_5_na_5 = mat;
    mat = new THREE.Matrix4();
    mat.fromArray([
        0, 1, 0, 0.5,
        0, 0, -1, 0.5,
        1, 0, 0, 0.5,
        0, 0, 0, 1
    ], 0);
    _mat_b_5_nc_5_a_5 = mat;
    mat = new THREE.Matrix4();
    mat.fromArray([
        0, -1, 0, 0.5,
        0, 0, 1, 0.5,
        1, 0, 0, 0.5
    ], 0);
    _mat_nb_5_c_5_a_5 = mat;
    mat = new THREE.Matrix4();
    mat.fromArray([
        0, 1, 0, 0.5,
        0, 0, 1, 0.5,
        -1, 0, 0, 0.5,
        0, 0, 0, 1
    ], 0);
    _mat_b_5_c_5_na_5 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray([
        0, -1, 0, 0.5,
        0, 0, -1, 0.5,
        1, 0, 0, 0.5,
        0, 0, 0, 1
    ], 0);
    _mat_nb_nc_5_a_5 = mat;

    mat = new THREE.Matrix4();
    mat.fromArray([
        0, 0, -1, 0.5,
        1, 0, 0, 0.5,
        0, -1, 0, 0,
        0, 0, 0, 1
    ]);
    _mat_nc_5_a_5_nb = mat;
}

/**
 * symmetry matrix 반환
 * @param {Number} idx matrix index
 */
export function getMatrix(idx) {
    switch (idx) {
        case 0:
            return _mat_a_b_c;
        case 1:
            return _mat_na_b_c;
        case 2:
            return _mat_a_nb_c;
        case 3:
            return _mat_a_b_nc;
        case 4:
            return _mat_a_5_b_c;
        case 5:
            return _mat_a_b_5_c;
        case 6:
            return _mat_a_b_c_5;


        case 7:
            return _mat_a_5_b_5_c;
        case 8:
            return _mat_a_5_b_c_5;
        case 9:
            return _mat_a_b_5_c_5;
        case 10:
            return _mat_a_5_b_5_c_5;

        case 11:
            return _mat_a_3_b_3_c_3;
        case 12:
            return _mat_a_3_b_3_c_6;
        case 13:
            return _mat_a_3_b_6_c_3;
        case 14:
            return _mat_a_6_b_3_c_3;


        case 15:
            return _mat_a_6_b_6_c_6;
        case 16:
            return _mat_a_6_b_6_c_3;
        case 17:
            return _mat_a_6_b_3_c_6;
        case 18:
            return _mat_a_3_b_6_c_6;


        case 19:
            return _mat_na_nb_nc;
        case 20:
            return _mat_a_nb_nc;
        case 21:
            return _mat_na_b_nc;
        case 22:
            return _mat_na_nb_c;


        case 23:
            return _mat_na_5_nb_5_nc_5;
        case 24:
            return _mat_na_5_nb_5_nc;
        case 25:
            return _mat_na_5_nb_nc_5;
        case 26:
            return _mat_na_nb_5_nc_5;

        case 27:
            return _mat_na_6_nb_6_nc_3;
        case 28:
            return _mat_na_6_nb_3_nc_6;
        case 29:
            return _mat_na_3_nb_6_nc_6;


        case 30:
            return _mat_na_3_nb_3_nc_6;
        case 31:
            return _mat_na_3_nb_6_nc_3;
        case 32:
            return _mat_na_6_nb_3_nc_3;

        case 33:
            return _mat_na_nb_c_5;
        case 34:
            return _mat_na_b_5_nc;
        case 35:
            return _mat_a_5_nb_nc;


        case 36:
            return _mat_na_nb_5_c;
        case 37:
            return _mat_na_5_nb_c;
        case 38:
            return _mat_na_b_nc_5;
        case 39:
            return _mat_na_5_b_nc;
        case 40:
            return _mat_a_nb_nc_5;
        case 41:
            return _mat_a_nb_5_nc;


        case 42:
            return _mat_na_5_nb_5_c;
        case 43:
            return _mat_na_5_nb_c_5;
        case 44:
            return _mat_na_nb_5_c_5;

        case 45:
            return _mat_na_5_b_5_nc;
        case 46:
            return _mat_na_5_b_nc_5;
        case 47:
            return _mat_na_b_5_nc_5;

        case 48:
            return _mat_a_5_nb_5_nc;
        case 49:
            return _mat_a_5_nb_nc_5;
        case 50:
            return _mat_a_nb_5_nc_5;

        case 51:
            return _mat_na_5_nb_5_c_5;
        case 52:
            return _mat_na_5_b_5_nc_5;
        case 53:
            return _mat_a_5_nb_5_nc_5;

        case 54:
            return _mat_a_b_nc_5;
        case 55:
            return _mat_a_b_5_nc;
        case 56:
            return _mat_a_5_b_nc;
        case 57:
            return _mat_a_nb_c_5;
        case 58:
            return _mat_a_nb_5_c;
        case 59:
            return _mat_a_5_nb_c;
        case 60:
            return _mat_na_b_c_5;
        case 61:
            return _mat_na_b_5_c;
        case 62:
            return _mat_na_5_b_c;

        case 63:
            return _mat_a_b_5_nc_5;
        case 64:
            return _mat_a_5_b_nc_5;
        case 65:
            return _mat_a_5_b_5_nc;
        case 66:
            return _mat_a_nb_5_c_5;
        case 67:
            return _mat_a_5_nb_c_5;
        case 68:
            return _mat_a_5_nb_5_c;
        case 69:
            return _mat_na_b_5_c_5;
        case 70:
            return _mat_na_5_b_c_5;
        case 71:
            return _mat_na_5_b_5_c;


        case 72:
            return _mat_a_5_b_5_nc_5;
        case 73:
            return _mat_a_5_nb_5_c_5;
        case 74:
            return _mat_na_5_b_5_c_5;

        case 75:
            return _mat_$_nb_$_a_nb_$_c;
        case 76:
            return _mat_$_na_b_$_na_$_c;
        case 77:
            return _mat_$_b_$_na_b_$_c;
        case 78:
            return _mat_$_a_nb_$_a_$_c;


        case 79:
            return _mat_$_nb_$_a_nb_$_c_3;
        case 80:
            return _mat_$_na_b_$_na_$_c_6;
        case 81:
            return _mat_$_b_$_na_b_$_c_8;
        case 82:
            return _mat_$_a_nb_$_a_$_c_1;

        case 83:
            return _mat_$_nb_$_a_nb_$_c_6;
        case 84:
            return _mat_$_na_b_$_na_$_c_3;
        case 85:
            return _mat_$_b_$_na_b_$_c_1;
        case 86:
            return _mat_$_a_nb_$_a_$_c_8;

        case 87:
            return _mat_$_b_$_na_b_$_c_6;
        case 88:
            return _mat_$_a_nb_$_a_$_c_3;

        case 89:
            return _mat_$_b_$_na_b_$_c_3;
        case 90:
            return _mat_$_a_nb_$_a_$_c_6;

        case 91:
            return _mat_$_b_$_na_b_$_c_5;
        case 92:
            return _mat_$_a_nb_$_a_$_c_5;

        case 93:
            return _mat_$_nb_$_a_nb_$_nc;
        case 94:
            return _mat_$_na_b_$_na_$_nc;

        case 95:
            return _mat_$_b_$_na_b_$_nc;
        case 96:
            return _mat_$_na_$_b_$_na_c;
        case 97:
            return _mat_$_a_nb_$_a_$_nc;
        case 98:
            return _mat_$_nb_$_a_nb_$_nc_5;
        case 99:
            return _mat_$_na_b_$_na_$_nc_5;

        case 100:
            return _mat_b_a_nc;
        case 101:
            return _mat_$_a_nb_$_nb_$_nc;
        case 102:
            return _mat_$_na_$_na_b_$_nc;
        case 103:
            return _mat_nb_na_nc;
        case 104:
            return _mat_$_na_b_$_b_$_nc;
        case 105:
            return _mat_$_a_$_a_nb_$_nc;
        case 106:
            return _mat_$_nb_$_na_b_$_c_8;

        case 107:
            return _mat_b_a_nc_3;
        case 108:
            return _mat_$_na_$_na_b_$_nc_6;
        case 109:
            return _mat_nb_na_nc_8;
        case 110:
            return _mat_$_na_b_$_b_$_nc_5;
        case 111:
            return _mat_$_a_$_a_nb_$_nc_1;


        case 112:
            return _mat_$_a_nb_$_a_$_nc_8;
        case 113:
            return _mat_b_a_nc_6;
        case 114:
            return _mat_$_na_$_na_b_$_nc_3;
        case 115:
            return _mat_nb_na_nc_1;
        case 116:
            return _mat_$_a_$_a_nb_$_nc_8;
        case 117:
            return _mat_nb_na_nc_6;
        case 118:
            return _mat_$_a_$_a_nb_$_nc_3;
        case 119:
            return _mat_$_b_$_a_$_nc_3;
        case 120:
            return _mat_nb_na_nc_3;
        case 121:
            return _mat_$_a_$_a_nb_$_nc_6;


        case 122:
            return _mat_nb_na_c;
        case 123:
            return _mat_$_na_b_$_b_$_c;
        case 124:
            return _mat_$_a_$_a_nb_$_c;
        case 125:
            return _mat_nb_na_nc_5;
        case 126:
            return _mat_b_a_c_5;
        case 127:
            return _mat_$_a_nb_$_nb_$_c_5;
        case 128:
            return _mat_$_a_$_a_nb_$_nc_5;
        case 129:
            return _mat_$_na_$_na_b_$_c_5;

        case 130:
            return _mat_b_a_c;
        case 131:
            return _mat_$_a_nb_$_nb_$_c;
        case 132:
            return _mat_$_na_$_na_b_$_c;

        case 133:
            return _mat_nb_na_c_5;
        case 134:
            return _mat_na_b_$_b_$_c_5;
        case 135:
            return _mat_a_$_a_nb_$_c_5;

        case 136:
            return _mat_b_a_nc_5;
        case 137:
            return _mat_$_a_nb_$_nc_$_nc_5;
        case 138:
            return _mat_$_na_$_na_b_$_nc_5;


        case 139:
            return _mat_c_a_b;
        case 140:
            return _mat_c_na_nb;
        case 141:
            return _mat_nc_na_b;
        case 142:
            return _mat_nc_a_nb;
        case 143:
            return _mat_b_c_a;
        case 144:
            return _mat_nb_c_na;
        case 145:
            return _mat_b_nc_na;
        case 146:
            return _mat_nb_nc_a;

        case 147:
            return _mat_c_a_5_b_5;
        case 148:
            return _mat_c_na_5_nb_5;
        case 149:
            return _mat_nc_na_5_b_5;
        case 150:
            return _mat_nc_a_5_nb_5;
        case 151:
            return _mat_b_c_5_a_5;
        case 152:
            return _mat_nb_c_5_na_5;
        case 153:
            return _mat_b_nc_5_na_5;
        case 154:
            return _mat_nb_na_5_a_5;
        case 155:
            return _mat_c_5_a_b_5;
        case 156:
            return _mat_c_5_na_nb_5;
        case 157:
            return _mat_nc_5_na_b_5;
        case 158:
            return _mat_nc_5_a_nb_5;
        case 159:
            return _mat_b_5_c_a_5;
        case 160:
            return _mat_nb_5_c_na_5;
        case 161:
            return _mat_b_5_nc_na_5;
        case 162:
            return _mat_nb_5_nc_a_5;
        case 163:
            return _mat_c_5_a_5_b;
        case 164:
            return _mat_c_5_na_5_nb;
        case 165:
            return _mat_nc_5_na_5_b;
        case 166:
            return _mat_na_5_a_5_nb;
        case 167:
            return _mat_b_5_c_5_a;
        case 168:
            return _mat_nb_5_c_5_na;
        case 169:
            return _mat_b_5_nc_5_na;
        case 170:
            return _mat_nb_5_nc_5_a;

        case 171:
            return _mat_c_5_a_5_b_5;
        case 172:
            return _mat_c_5_na_5_nb_5;
        case 173:
            return _mat_nc_5_na_5_b_5;
        case 174:
            return _mat_nc_5_a_5_nb_5;
        case 175:
            return _mat_b_5_c_5_a_5;
        case 176:
            return _mat_nb_5_c_5_na_5;
        case 177:
            return _mat_b_5_nc_5_na_5;
        case 178:
            return _mat_nb_5_nc_5_a_5;

        case 179:
            return _mat_c_5_na_5_nb;
        case 180:
            return _mat_nc_5_na_b_5;
        case 181:
            return _mat_nc_a_5_nb_5;
        case 182:
            return _mat_nb_c_5_na_5;
        case 183:
            return _mat_b_5_nc_5_na;
        case 184:
            return _mat_nb_5_nc_a_5;

        case 185:
            return _mat_na_5_na_b_5;

        case 186:
            return _mat_nc_a_5_b_5;

        case 187:
            return _mat_c_na_nb_5;

        case 188:
            return _mat_nc_na_5_b;

        case 189:
            return _mat_nc_5_a_nb;

        case 190:
            return _mat_nb_5_c_na;

        case 191:
            return _mat_b_nc_na_5;

        case 192:
            return _mat_nb_nc_5_a;

        case 193:
            return _mat_b_na_c;
        case 194:
            return _mat_nb_a_c;
        case 195:
            return _mat_a_c_nb;
        case 196:
            return _mat_na_c_b;
        case 197:
            return _mat_na_nc_nb;
        case 198:
            return _mat_a_nc_b;
        case 199:
            return _mat_c_b_na;
        case 200:
            return _mat_c_nb_a;
        case 201:
            return _mat_nc_b_a;
        case 202:
            return _mat_nc_nb_na;
        case 203:
            return _mat_b_5_a_5_nc_5;
        case 204:
            return _mat_nb_5_na_5_nc_5;
        case 205:
            return _mat_b_5_na_5_c_5;
        case 206:
            return _mat_nb_5_a_5_c_5;
        case 207:
            return _mat_a_5_c_5_nb_5;
        case 208:
            return _mat_na_5_c_5_b_5;
        case 209:
            return _mat_na_5_nc_5_nb_5;
        case 210:
            return _mat_a_5_nc_5_b_5;
        case 211:
            return _mat_c_5_b_5_na_5;
        case 212:
            return _mat_c_5_nb_5_a_5;
        case 213:
            return _mat_nc_5_b_5_a_5;
        case 214:
            return _mat_nc_5_nb_5_na_5;
        case 215:
            return _mat_nc_na_nb;
        case 216:
            return _mat_nc_a_b;
        case 217:
            return _mat_c_a_nb;
        case 218:
            return _mat_c_na_b;
        case 219:
            return _mat_nb_nc_na;
        case 220:
            return _mat_b_nc_a;
        case 221:
            return _mat_nb_c_a;
        case 222:
            return _mat_b_c_na;
        case 223:
            return _mat_nb_a_nc;
        case 224:
            return _mat_b_na_nc;
        case 225:
            return _mat_na_nc_b;
        case 226:
            return _mat_a_nc_nb;
        case 227:
            return _mat_a_c_b;
        case 228:
            return _mat_na_c_nb;
        case 229:
            return _mat_nc_nb_a;
        case 230:
            return _mat_nc_b_na;
        case 231:
            return _mat_c_nb_na;
        case 232:
            return _mat_c_b_a;
        case 233:
            return _mat_nc_5_na_5_nb_5;

        case 234:
            return _mat_nc_5_a_5_b_5;
        case 235:
            return _mat_c_5_a_5_nb_5;
        case 236:
            return _mat_c_5_na_5_b_5;
        case 237:
            return _mat_nb_5_nc_5_na_5;
        case 238:
            return _mat_b_5_nc_5_a_5;
        case 239:
            return _mat_nb_5_c_5_a_5;
        case 240:
            return _mat_b_5_c_5_na_5;

        case 241:
            return _mat_nb_nc_5_a_5;
        case 242:
            return _mat_nc_5_a_5_nb;
        
    }
}

export function getMatrixList(spaceGroupNum, settingNum) {
    switch (spaceGroupNum) {

        case -1:
            return [getMatrix(0)];

        case 2: {
            switch (settingNum) {
                case 0:
                    return [getMatrix(0), getMatrix(21)];

                case 1:
                    return [getMatrix(0), getMatrix(22)];

                case 2:
                    return [getMatrix(0), getMatrix(20)];
            }
        }

        case 3: {
            switch (settingNum) {
                case 0:
                    return [getMatrix(0), getMatrix(34)];

                case 1:
                    return [getMatrix(0), getMatrix(33)];

                case 2:
                    return [getMatrix(0), getMatrix(35)];
            }
        }

        case 167: {
            switch (settingNum) {
                case 0:
                    return [getMatrix(0), getMatrix(75), getMatrix(76), getMatrix(22), getMatrix(77),
                    getMatrix(78)];
            }
        }

        case 168: {
            switch (settingNum) {
                case 0:
                    return [getMatrix(0), getMatrix(79), getMatrix(80), getMatrix(33), getMatrix(81),
                    getMatrix(86)];
            }
        }
        case 194: {
            switch (settingNum) {
                case 0:
                    return [getMatrix(0), getMatrix(22), getMatrix(21), getMatrix(20), getMatrix(139),
                    getMatrix(140), getMatrix(141), getMatrix(142), getMatrix(143), getMatrix(144),
                    getMatrix(145), getMatrix(146)];
            }
        }

        case 195: {
            switch (settingNum) {
                case 0:
                    return [getMatrix(0), getMatrix(22), getMatrix(21), getMatrix(20), getMatrix(139),
                    getMatrix(140), getMatrix(141), getMatrix(142), getMatrix(143), getMatrix(144),
                    getMatrix(145), getMatrix(146), getMatrix(9), getMatrix(44), getMatrix(47),
                    getMatrix(50), getMatrix(147), getMatrix(148), getMatrix(149), getMatrix(150),
                    getMatrix(151), getMatrix(152), getMatrix(153), getMatrix(241), getMatrix(8),
                    getMatrix(43), getMatrix(46), getMatrix(49), getMatrix(155), getMatrix(156),
                    getMatrix(180), getMatrix(158), getMatrix(159), getMatrix(160), getMatrix(161),
                    getMatrix(184), getMatrix(7), getMatrix(42), getMatrix(45), getMatrix(48),
                    getMatrix(163), getMatrix(179), getMatrix(165), getMatrix(242), getMatrix(167),
                    getMatrix(168), getMatrix(169), getMatrix(170)];
            }
        }

    }

    return [];
}

export function getMatrixIdxList(spaceGroupNum, settingNum) {
    switch (spaceGroupNum) {

        case -1:
            return [0];

        case 2: {
            switch (settingNum) {
                case 0:
                    return [0, 21];

                case 1:
                    return [0, 22];

                case 2:
                    return [0, 20];
            }
        }

        case 3: {
            switch (settingNum) {
                case 0:
                    return [0, 34];

                case 1:
                    return [0, 33];

                case 2:
                    return [0, 35];
            }
        }

        case 167: {
            switch (settingNum) {
                case 0:
                    return [0, 75, 76, 22, 77,
                        78];
            }
        }

        case 168: {
            switch (settingNum) {
                case 0:
                    return [0, 79, 80, 33, 81,
                        86];
            }
        }
        case 194: {
            switch (settingNum) {
                case 0:
                    return [0, 22, 21, 20, 139,
                        140, 141, 142, 143, 144,
                        145, 146];
            }
        }

        case 195: {
            switch (settingNum) {
                case 0:
                    return [0, 22, 21, 20, 139,
                        140, 141, 142, 143, 144,
                        145, 146, 9, 44, 47,
                        50, 147, 148, 149, 150,
                        151, 152, 153, 241, 8,
                        43, 46, 49, 155, 156,
                        180, 158, 159, 160, 161,
                        184, 7, 42, 45, 48,
                        163, 179, 165, 242, 167,
                        168, 169, 170];
            }
        }

    }

    return [];
}
