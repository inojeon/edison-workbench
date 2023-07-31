import * as THREE from '../build/three.module.js';
import { VolumeTexture } from './VolumeTexture.js';

/**
 * Volume 렌더링 메쉬 오브젝트 클래스
 * */
export class VolumeMesh {

	/**
	 * 클래스 생성자
	 * */
    constructor(){
    }

	/**
	 * 메쉬 데이터를 생성한다.
	 * @param {VolumeTexture} volume_texture Volume Texture
	 * @returns {THREE.Mesh} 메쉬 데이터
	 */
    create(volume_texture) {
		this.createMaterial(volume_texture);
		return this.createMesh();
	}

	/**
	 * 메쉬 데이터를 생성한다.
	 * @returns {THREE.Mesh} 메쉬 데이터
	 */
	createMesh() {
		this._geometry = new THREE.BoxGeometry(1, 1, 1);
		//this._geometry.translate(0.5, 0.5, 0.5);
		this._mesh = new THREE.Mesh(this._geometry, this._material);
		this._mesh.position.fromArray([0.5, 0.5, 0.5]);
		this._parent = new THREE.Mesh();
		this._parent.add(this._mesh);
		return this._mesh;
    }

	/**
	 * Volume Material을 생성한다.
	 * @param {VolumeTexture} volume_texture Volume Texture
	 */
	createMaterial(volume_texture) {
		this._texture = volume_texture.get();
		this._volumeTexture = volume_texture;

		let tex3d = volume_texture.get();

		const fragmentShader = /* glsl */`
					precision highp float;
					precision highp sampler3D;
					uniform mat4 modelViewMatrix;
					uniform mat4 projectionMatrix;
					in vec3 vOrigin;
					in vec3 vDirection;
					out vec4 color;
					uniform vec3 base;
					uniform sampler3D map;
					uniform float threshold;
					uniform float range;
					uniform float opacity;
					uniform float steps;
					uniform float frame;
					uint wang_hash(uint seed)
					{
							seed = (seed ^ 61u) ^ (seed >> 16u);
							seed *= 9u;
							seed = seed ^ (seed >> 4u);
							seed *= 0x27d4eb2du;
							seed = seed ^ (seed >> 15u);
							return seed;
					}
					float randomFloat(inout uint seed)
					{
							return float(wang_hash(seed)) / 4294967296.;
					}
					vec2 hitBox( vec3 orig, vec3 dir ) {
						const vec3 box_min = vec3( - 0.5 );
						const vec3 box_max = vec3( 0.5 );
						vec3 inv_dir = 1.0 / dir;
						vec3 tmin_tmp = ( box_min - orig ) * inv_dir;
						vec3 tmax_tmp = ( box_max - orig ) * inv_dir;
						vec3 tmin = min( tmin_tmp, tmax_tmp );
						vec3 tmax = max( tmin_tmp, tmax_tmp );
						float t0 = max( tmin.x, max( tmin.y, tmin.z ) );
						float t1 = min( tmax.x, min( tmax.y, tmax.z ) );
						return vec2( t0, t1 );
					}
					float sample1( vec3 p ) {
						return texture( map, p ).r;
					}
					float shading( vec3 coord ) {
						float step = 0.01;
						return sample1( coord + vec3( - step ) ) - sample1( coord + vec3( step ) );
					}
					void main(){
						vec3 rayDir = normalize( vDirection );
						vec2 bounds = hitBox( vOrigin, rayDir );
						if ( bounds.x > bounds.y ) discard;
						bounds.x = max( bounds.x, 0.0 );
						vec3 p = vOrigin + bounds.x * rayDir;
						vec3 inc = 1.0 / abs( rayDir );
						float delta = min( inc.x, min( inc.y, inc.z ) );
						delta /= steps;
						// Jitter
						// Nice little seed from
						// https://blog.demofox.org/2020/05/25/casual-shadertoy-path-tracing-1-basic-camera-diffuse-emissive/
						uint seed = uint( gl_FragCoord.x ) * uint( 1973 ) + uint( gl_FragCoord.y ) * uint( 9277 ) + uint( frame ) * uint( 26699 );
						vec3 size = vec3( textureSize( map, 0 ) );
						float randNum = randomFloat( seed ) * 2.0 - 1.0;
						p += rayDir * randNum * ( 1.0 / size );
						//
						vec4 ac = vec4( base, 0.0 );
						for ( float t = bounds.x; t < bounds.y; t += delta ) {
							float d = sample1( p + 0.5 );
							d = smoothstep( threshold - range, threshold + range, d ) * opacity;
							float col = shading( p + 0.5 ) * 3.0 + ( ( p.x + p.y ) * 0.25 ) + 0.2;
							ac.rgb += ( 1.0 - ac.a ) * d * col;
							ac.a += ( 1.0 - ac.a ) * d;
							if ( ac.a >= 0.95 ) break;
							p += rayDir * delta;
						}
						color = ac;
						if ( color.a == 0.0 ) discard;
					}
				`;

		const vertexShader = /* glsl */`
					in vec3 position;
					uniform mat4 modelMatrix;
					uniform mat4 modelViewMatrix;
					uniform mat4 projectionMatrix;
					uniform vec3 cameraPos;
					out vec3 vOrigin;
					out vec3 vDirection;
					void main() {
						vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
						vOrigin = vec3( inverse( modelMatrix ) * vec4( cameraPos, 1.0 ) ).xyz;
						vDirection = position - vOrigin;
						gl_Position = projectionMatrix * mvPosition;
					}
				`;

		const material = new THREE.RawShaderMaterial({
			glslVersion: THREE.GLSL3,
			uniforms: {
				base: { value: new THREE.Color(0x798aa0) },
				map: { value: tex3d },
				cameraPos: { value: new THREE.Vector3() },
				threshold: { value: 0.25 },
				opacity: { value: 0.25 },
				range: { value: 0.1 },
				steps: { value: 100 },
				frame: { value: 0 }
			},
			vertexShader,
			fragmentShader,
			side: THREE.BackSide,
			transparent: true
		});


		this._material = material;
		return material;
    }

	/**
	 * Material 데이터를 반환한다.
	 * @returns {THREE.Material} Material 데이터
	 * */
	getMaterial() {
		return this._material;
	}

	/**
	 * 메쉬 데이터를 반환한다.
	 * @returns {THREE.Mesh} 메쉬 데이터
	 * */
	getMesh() {
		return this._mesh;
	}

	/**
	 * 부모 메쉬 데이터를 반환한다.
	 * @returns {THREE.Mesh} 메쉬 데이터
	 * */
	getParentMesh() {
		return this._parent;
	}

	/**
	 * 그래픽 리소스를 반환한다.
	 * */
	dispose() {
		if (this._volumeTexture) {
			this._volumeTexture.dispose();
			this._volumeTexture = null;
		}

		if (this._material) {
			this._material.dispose();
		}

		if (this._mesh) {
			this._mesh.geometry.dispose();
			this._mesh.removeFromParent();
			this._mesh = null;

			this._parent.removeFromParent();
			this._parent = null;
        }
    }

	/**
	 * Volume 데이터의 3D 원점 및 크기 정보를 받아 메쉬에 설정한다.
	 * @param {VolumeData} volume_data Volume 데이터
	 */
	setTransformFromVolumeData(volume_data) {
		let mesh = this._mesh;
		if (volume_data.matrix) {
			this._parent.matrix = volume_data.matrix.clone();
			//this._mesh.matrixWorldNeedsUpdate = true;
		} else {
			let pos = volume_data.origin.clone();
			let scale = volume_data.unit.clone().multiply(volume_data.size);
			//scale.multiplyScalar(2);

			this._parent.position.set(pos.x, pos.y, pos.z);
			this._parent.scale.set(scale.x, scale.y, scale.z);

		}
    }

}