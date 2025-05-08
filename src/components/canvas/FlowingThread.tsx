
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { createFlowingVertexShader, createFlowingFragmentShader } from './ShaderUtils';

const FlowingThread = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const curve = useRef<THREE.CatmullRomCurve3>(null);
  
  // Initialize curve on component mount
  useEffect(() => {
    // Create a smooth, S-shaped curve
    const points = [
      new THREE.Vector3(-10, -2, 0),
      new THREE.Vector3(-5, 2, -3),
      new THREE.Vector3(0, -0.5, -1),
      new THREE.Vector3(5, 3, 2),
      new THREE.Vector3(10, -1, 0)
    ];
    
    // Create the curve and assign it to the ref
    curve.current = new THREE.CatmullRomCurve3(points);
    curve.current.curveType = 'catmullrom';
    curve.current.tension = 0.2;
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

  // Shaders for the flowing effect
  const vertexShader = createFlowingVertexShader();
  const fragmentShader = createFlowingFragmentShader(
    [0.0, 0.34, 0.82], // colorA: Main Cascade blue
    [0.0, 0.38, 1.0],  // colorB: Light blue
    [0.9, 0.9, 1.0]    // colorC: Almost white
  );

  // Only render when curve is initialized
  if (!curve.current) return null;

  return (
    <mesh ref={meshRef} rotation={[0, 0, Math.PI / 6]}>
      <tubeGeometry 
        args={[curve.current, 120, 0.4, 8, false]} 
      />
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

export default FlowingThread;
