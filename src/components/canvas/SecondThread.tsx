
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { createFlowingVertexShader, createFlowingFragmentShader } from './ShaderUtils';

const SecondThread = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const curve = useRef<THREE.CatmullRomCurve3>(null);
  
  // Initialize curve on component mount
  useEffect(() => {
    const points = [
      new THREE.Vector3(-8, 3, 1),
      new THREE.Vector3(-3, -3, -2),
      new THREE.Vector3(2, 1, 0),
      new THREE.Vector3(8, -2, 1)
    ];
    
    // Create the curve and assign it to the ref
    curve.current = new THREE.CatmullRomCurve3(points);
    curve.current.curveType = 'catmullrom';
    curve.current.tension = 0.3;
  }, []);

  // Animation loop
  useFrame(({ clock }) => {
    if (!materialRef.current || !meshRef.current) return;
    
    const time = clock.getElapsedTime() * 0.15;
    materialRef.current.uniforms.uTime.value = time;
    
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(time * 0.15) * 0.03;
      meshRef.current.rotation.x = Math.sin(time * 0.08) * 0.02;
    }
  });

  // Shaders for the flowing effect
  const vertexShader = createFlowingVertexShader({ 
    waveIntensity: 0.3, 
    waveFrequency: 0.03 
  });
  
  const fragmentShader = createFlowingFragmentShader(
    [0.0, 0.3, 0.7],   // Deeper blue
    [0.1, 0.4, 0.9],   // Mid blue
    [0.8, 0.9, 1.0],   // Light blue/white
    {
      flowFrequency: 8.0,
      glowIntensity: 0.6,
      opacity: 0.5
    }
  );

  // Only render when curve is initialized
  if (!curve.current) return null;

  return (
    <mesh ref={meshRef} rotation={[0, 0, -Math.PI / 8]} position={[0, -2, 0]}>
      <tubeGeometry 
        args={[curve.current, 100, 0.3, 8, false]} 
      />
      <shaderMaterial
        ref={materialRef}
        args={[{
          vertexShader: vertexShader,
          fragmentShader: fragmentShader,
          uniforms: {
            uTime: { value: 0 }
          },
          transparent: true,
          depthWrite: false,
          side: THREE.DoubleSide
        }]}
      />
    </mesh>
  );
};

export default SecondThread;
