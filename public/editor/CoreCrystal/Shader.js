
/**
 * Shader 클래스
 * */
export class Shader {

    /**
     * material을 생성한다.
     * */
    static generateMaterial() {
        let material = new THREE.ShaderMaterial({
            uniforms: uniforms,
            fragmentShader: Shader.fragShader1(),
            vertexShader: Shader.vertexShader1(),
        });

        return material;
    }

    /**
     * vertex shader
     * @returns {String} vertex shader
     * */
    static vertexShader1() {
        return `
        varying vec3 vUv; 

        void main() {
          vUv = position; 

          vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * modelViewPosition; 
        }
      `
    }

    /**
     * fragment shader
     * @returns {String} fragment shader
     * */
    static fragShader1() {
        return `
      uniform vec3 colorA; 
      uniform vec3 colorB; 
      varying vec3 vUv;

      void main() {
        gl_FragColor = vec4(mix(colorA, colorB, vUv.z), 1.0);
      }
  `;
    }
}

