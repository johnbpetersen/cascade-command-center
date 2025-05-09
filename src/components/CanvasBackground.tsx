import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function CanvasBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);

  useEffect(() => {
    if (!containerRef.current) {
      console.error('Container div not found');
      return;
    }

    // Custom WebGL support check
    const isWebGLSupported = () => {
      try {
        const canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      } catch (e) {
        return false;
      }
    };

    if (!isWebGLSupported()) {
      console.error('WebGL not supported in this browser');
      return;
    }

    // Set up the scene, camera, and renderer
    const scene = new THREE.Scene();
    const aspect = window.innerWidth / window.innerHeight;
    const frustumHeight = 2;
    const frustumWidth = frustumHeight * aspect;
    const camera = new THREE.OrthographicCamera(
      -frustumWidth / 2,
      frustumWidth / 2,
      frustumHeight / 2,
      -frustumHeight / 2,
      0,
      1000
    );
    camera.position.set(0, 0, 5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;

    // Create a plane that spans the screen
    const geometry = new THREE.PlaneGeometry(frustumWidth, frustumHeight, 128, 128);

    // Vertex shader for wave displacement
    const vertexShader = `
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPosition;
      uniform float time;

      // Simplex noise function for smooth wave displacement
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy));
        vec2 x0 = v - i + dot(i, C.xx);
        vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
        vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
        m = m*m;
        m = m*m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      void main() {
        vUv = uv;
        vNormal = normal;
        vPosition = position;

        // Displace vertices to create wave-like motion
        vec3 pos = position;
        float noise = snoise(vec2(pos.x * 0.5 + time * 0.2, pos.y * 0.5 + time * 0.1));
        pos.z += sin(pos.x * 2.0 + time * 0.5 + noise) * cos(pos.y * 1.5 + time * 0.3 + noise) * 0.3;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `;

    // Fragment shader for gradient and glossy effect
    const fragmentShader = `
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPosition;
      uniform float time;
      uniform vec3 color1;
      uniform vec3 color2;

      void main() {
        // Gradient based on UV coordinates and wave motion
        float wave = sin(vUv.x * 3.0 + time * 0.5) * cos(vUv.y * 2.0 + time * 0.3);
        vec3 color = mix(color1, color2, vUv.x * 0.5 + wave * 0.2);

        // Add a glossy effect with fake lighting
        vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
        float diffuse = max(dot(vNormal, lightDir), 0.0);
        float specular = pow(diffuse, 32.0) * 0.5;
        color += vec3(specular);

        // Translucency with soft edges
        float alpha = smoothstep(0.2, 0.8, abs(wave)) * 0.6;
        alpha *= (1.0 - smoothstep(0.9, 1.0, vUv.y)); // Fade out at the top/bottom

        gl_FragColor = vec4(color, alpha);
      }
    `;

    // Create shader material
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color(200 / 255, 220 / 255, 255 / 255) }, // Soft blue
        color2: { value: new THREE.Color(255 / 255, 200 / 255, 100 / 255) }, // Golden hue
      },
      transparent: true,
      side: THREE.DoubleSide,
    });
    materialRef.current = material;

    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    let animationId: number;
    const animate = (time: number) => {
      if (materialRef.current) {
        materialRef.current.uniforms.time.value = time * 0.001;
      }
      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);

    const handleResize = () => {
      const newAspect = window.innerWidth / window.innerHeight;
      const newFrustumWidth = frustumHeight * newAspect;
      camera.left = -newFrustumWidth / 2;
      camera.right = newFrustumWidth / 2;
      camera.top = frustumHeight / 2;
      camera.bottom = -frustumHeight / 2;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      sceneRef.current = null;
      cameraRef.current = null;
      rendererRef.current = null;
      materialRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full z-0 pointer-events-none"
    />
  );
}