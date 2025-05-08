
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, Canvas, extend, useThree } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Extend Three with OrbitControls
extend({ OrbitControls });

// Custom camera controls
const CameraControls = () => {
  const { camera, gl } = useThree();
  const controlsRef = useRef<any>();
  
  useFrame(() => {
    if (controlsRef.current) {
      controlsRef.current.update();
    }
  });
  
  return (
    // @ts-ignore
    <orbitControls
      ref={controlsRef}
      args={[camera, gl.domElement]}
      enableDamping
      dampingFactor={0.05}
      enableZoom={false}
      enablePan={false}
      enableRotate={false}
    />
  );
};

// Flowing thread component
const FlowingThread = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const curveRef = useRef<THREE.CatmullRomCurve3>(null);
  
  // Initialize curve
  useEffect(() => {
    // Create a smooth, S-shaped curve
    const points = [
      new THREE.Vector3(-10, -2, 0),
      new THREE.Vector3(-5, 2, -3),
      new THREE.Vector3(0, -0.5, -1),
      new THREE.Vector3(5, 3, 2),
      new THREE.Vector3(10, -1, 0)
    ];
    
    curveRef.current = new THREE.CatmullRomCurve3(points);
    curveRef.current.curveType = 'catmullrom';
    curveRef.current.tension = 0.2;
  }, []);

  // Animation loop
  useFrame(({ clock }) => {
    if (!materialRef.current || !meshRef.current) return;
    
    const time = clock.getElapsedTime() * 0.2;
    materialRef.current.uniforms.uTime.value = time;
    
    // Subtle movement of the entire mesh
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(time * 0.2) * 0.05;
      meshRef.current.rotation.x = Math.sin(time * 0.1) * 0.03;
    }
  });

  // Shader for the flowing effect
  const vertexShader = `
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform float uTime;
    
    void main() {
      vUv = uv;
      vPosition = position;
      
      // Calculate wave effect
      float wave = sin(position.x * 0.05 + uTime) * 0.2;
      vec3 newPos = position;
      newPos.y += wave;
      newPos.z += sin(position.x * 0.08 + uTime * 1.2) * 0.1;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
    }
  `;

  const fragmentShader = `
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform float uTime;
    
    // Color variables
    vec3 colorA = vec3(0.0, 0.34, 0.82); // Main Cascade blue
    vec3 colorB = vec3(0.0, 0.38, 1.0);  // Light blue
    vec3 colorC = vec3(0.9, 0.9, 1.0);   // Almost white
    
    void main() {
      // Flow effect based on position and time
      float flow = sin(vUv.x * 10.0 + uTime) * 0.5 + 0.5;
      
      // Distance from center line for edge glow
      float centerLine = abs(vUv.y - 0.5) * 2.0;
      float edgeGlow = pow(1.0 - centerLine, 3.0);
      
      // Combine colors based on the flow and edge glow
      vec3 finalColor = mix(colorA, colorB, flow);
      finalColor = mix(finalColor, colorC, pow(edgeGlow, 2.0) * 0.7);
      
      // Opacity based on edge
      float opacity = edgeGlow * 0.7;
      
      gl_FragColor = vec4(finalColor, opacity);
    }
  `;

  return (
    <mesh ref={meshRef} rotation={[0, 0, Math.PI / 6]}>
      <tubeGeometry args={[curveRef.current, 120, 0.4, 8, false]} />
      <shaderMaterial 
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 }
        }}
        transparent={true}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

// Second flowing thread with different parameters
const SecondThread = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const curveRef = useRef<THREE.CatmullRomCurve3>(null);
  
  useEffect(() => {
    const points = [
      new THREE.Vector3(-8, 3, 1),
      new THREE.Vector3(-3, -3, -2),
      new THREE.Vector3(2, 1, 0),
      new THREE.Vector3(8, -2, 1)
    ];
    
    curveRef.current = new THREE.CatmullRomCurve3(points);
    curveRef.current.curveType = 'catmullrom';
    curveRef.current.tension = 0.3;
  }, []);

  useFrame(({ clock }) => {
    if (!materialRef.current || !meshRef.current) return;
    
    const time = clock.getElapsedTime() * 0.15;
    materialRef.current.uniforms.uTime.value = time;
    
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(time * 0.15) * 0.03;
      meshRef.current.rotation.x = Math.sin(time * 0.08) * 0.02;
    }
  });

  const vertexShader = `
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform float uTime;
    
    void main() {
      vUv = uv;
      vPosition = position;
      
      // Calculate wave effect - different parameters than first thread
      float wave = sin(position.x * 0.03 + uTime * 0.8) * 0.3;
      vec3 newPos = position;
      newPos.y += wave;
      newPos.z += sin(position.x * 0.05 + uTime * 0.9) * 0.15;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
    }
  `;

  const fragmentShader = `
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform float uTime;
    
    // Slightly different colors
    vec3 colorA = vec3(0.0, 0.3, 0.7); // Deeper blue
    vec3 colorB = vec3(0.1, 0.4, 0.9); // Mid blue
    vec3 colorC = vec3(0.8, 0.9, 1.0); // Light blue/white
    
    void main() {
      // Flow effect with different frequency
      float flow = sin(vUv.x * 8.0 + uTime * 1.2) * 0.5 + 0.5;
      
      // Distance from center for edge glow
      float centerLine = abs(vUv.y - 0.5) * 2.0;
      float edgeGlow = pow(1.0 - centerLine, 2.5);
      
      // Combine colors
      vec3 finalColor = mix(colorA, colorB, flow);
      finalColor = mix(finalColor, colorC, pow(edgeGlow, 1.8) * 0.6);
      
      // Slightly more transparent
      float opacity = edgeGlow * 0.5;
      
      gl_FragColor = vec4(finalColor, opacity);
    }
  `;

  return (
    <mesh ref={meshRef} rotation={[0, 0, -Math.PI / 8]} position={[0, -2, 0]}>
      <tubeGeometry args={[curveRef.current, 100, 0.3, 8, false]} />
      <shaderMaterial 
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 }
        }}
        transparent={true}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

// Main scene component for the flowing thread animation
const FlowingScene = () => {
  return (
    <>
      <ambientLight intensity={0.8} />
      <CameraControls />
      <FlowingThread />
      <SecondThread />
    </>
  );
};

// Main Container Component
export default function CanvasBackground() {
  return (
    <div className="absolute inset-0 w-full h-full z-[-1] overflow-hidden opacity-60">
      <Canvas
        camera={{
          position: [0, 0, 15],
          fov: 50,
          near: 0.1,
          far: 1000
        }}
        gl={{
          antialias: true,
          alpha: true,
        }}
        style={{ background: 'transparent' }}
      >
        <FlowingScene />
      </Canvas>
    </div>
  );
}
