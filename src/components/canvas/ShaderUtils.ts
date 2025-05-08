
// Common shader utilities for flowing thread effects

export const createFlowingVertexShader = (params?: { waveIntensity?: number; waveFrequency?: number }) => {
  const waveIntensity = params?.waveIntensity || 0.2;
  const waveFrequency = params?.waveFrequency || 0.05;
  
  return `
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform float uTime;
    
    void main() {
      vUv = uv;
      vPosition = position;
      
      // Calculate wave effect
      float wave = sin(position.x * ${waveFrequency} + uTime) * ${waveIntensity};
      vec3 newPos = position;
      newPos.y += wave;
      newPos.z += sin(position.x * ${waveFrequency * 1.6} + uTime * 1.2) * ${waveIntensity / 2};
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
    }
  `;
};

export const createFlowingFragmentShader = (
  colorA: [number, number, number], 
  colorB: [number, number, number], 
  colorC: [number, number, number],
  params?: { flowFrequency?: number; glowIntensity?: number; opacity?: number }
) => {
  const flowFrequency = params?.flowFrequency || 10.0;
  const glowIntensity = params?.glowIntensity || 0.7;
  const opacity = params?.opacity || 0.7;
  
  return `
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform float uTime;
    
    // Color variables
    vec3 colorA = vec3(${colorA.join(', ')});
    vec3 colorB = vec3(${colorB.join(', ')});
    vec3 colorC = vec3(${colorC.join(', ')});
    
    void main() {
      // Flow effect based on position and time
      float flow = sin(vUv.x * ${flowFrequency} + uTime) * 0.5 + 0.5;
      
      // Distance from center line for edge glow
      float centerLine = abs(vUv.y - 0.5) * 2.0;
      float edgeGlow = pow(1.0 - centerLine, 3.0);
      
      // Combine colors based on the flow and edge glow
      vec3 finalColor = mix(colorA, colorB, flow);
      finalColor = mix(finalColor, colorC, pow(edgeGlow, 2.0) * ${glowIntensity});
      
      // Opacity based on edge
      float opacity = edgeGlow * ${opacity};
      
      gl_FragColor = vec4(finalColor, opacity);
    }
  `;
};
