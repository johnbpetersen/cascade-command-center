import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function CanvasBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);

  useEffect(() => {
    console.log('CanvasBackground useEffect start, container:', containerRef.current);

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

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true });
      const canvasEl = renderer.domElement;
      canvasEl.style.position = 'absolute';
      canvasEl.style.top = '0';
      canvasEl.style.left = '0';
      canvasEl.style.width = '100%'; // Ensure canvas element stretches
      canvasEl.style.height = '100%';// Ensure canvas element stretches
      canvasEl.style.pointerEvents = 'none';

      // Use container's dimensions for the renderer
      const containerWidth = containerRef.current.clientWidth;
      const containerHeight = containerRef.current.clientHeight;
      renderer.setSize(containerWidth, containerHeight);

      containerRef.current.appendChild(renderer.domElement);
      console.log('Three.js renderer initialized and appended to DOM, size:', containerWidth, 'x', containerHeight);
    } catch (error) {
      console.error('Failed to initialize WebGLRenderer:', error);
      return;
    }

    const scene = new THREE.Scene();
    // For OrthographicCamera with PlaneGeometry(2,2), aspect ratio changes will stretch the shader.
    // This is often fine for background effects.
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    camera.position.set(0, 0, 1);
    camera.lookAt(0, 0, 0);

    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;

    const geometry = new THREE.PlaneGeometry(2, 2);

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
    varying vec2 vUv;
    uniform float time;

    void main() {
      // float wave = sin(vUv.x * 5.0 + time * 0.5) * cos(vUv.y * 3.0 + time * 0.3);
      // vec3 color1 = vec3(0.2, 0.4, 0.8); // Darker blue
      // vec3 color2 = vec3(0.6, 0.8, 1.0); // Lighter blue
      // vec3 color = mix(color1, color2, wave * 0.5 + 0.5);
      // float alpha = smoothstep(0.4, 0.6, abs(wave)) * 0.8;
      // gl_FragColor = vec4(color, alpha);
      // Debug: Uncomment next line to test with solid red (if animation isn't showing)
      gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // Output solid RED and fully OPAQUE
    }
  `;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        time: { value: 0 },
      },
      transparent: true,
    });
    materialRef.current = material;

    const plane = new THREE.Mesh(geometry, material);
    plane.position.set(0, 0, 0);
    scene.add(plane);
    console.log('Three.js plane added to scene');

    let animationId: number;
    const animate = (time: number) => {
      // console.log('Animating frame with time:', time); // Can be noisy, enable if needed
      if (materialRef.current) {
        materialRef.current.uniforms.time.value = time * 0.001;
      }
      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);
    console.log('Three.js animation loop started');


    const handleResize = () => {
      if (containerRef.current && rendererRef.current && cameraRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const containerHeight = containerRef.current.clientHeight;
        rendererRef.current.setSize(containerWidth, containerHeight);
        // No camera aspect update needed for this OrthographicCamera setup if you want the -1 to 1 mapping to stretch.
        // cameraRef.current.updateProjectionMatrix(); // Only if camera params change
        console.log('Three.js renderer resized to container:', containerWidth, containerHeight);
      }
    };
    window.addEventListener('resize', handleResize);

    // Initial call to handleResize to set correct size if container dimensions are established after initial mount.
    handleResize();


    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      if (containerRef.current && renderer.domElement) {
        // Check if domElement is still a child before removing
        if(containerRef.current.contains(renderer.domElement)) {
            containerRef.current.removeChild(renderer.domElement);
        }
      }
      renderer.dispose();
      material.dispose(); // Dispose material
      geometry.dispose(); // Dispose geometry

      sceneRef.current = null;
      cameraRef.current = null;
      rendererRef.current = null;
      materialRef.current = null;
      console.log('Three.js cleanup complete');
    };
  }, []); // Empty dependency array ensures this runs once on mount and cleans up on unmount

  return (
    <div
      ref={containerRef}
      className="absolute top-0 left-0 w-full h-screen z-[-1]" // This div will be the container for the canvas
    />
  );
}