
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function CanvasBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Setup
    let width = containerRef.current.clientWidth;
    let height = containerRef.current.clientHeight;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    
    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    
    // Shader material
    const vertexShader = `
      varying vec2 vUv;
      
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;
    
    const fragmentShader = `
      varying vec2 vUv;
      uniform float uTime;
      
      // Simplex 2D noise function
      vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
      
      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187,
                            0.366025403784439,
                           -0.577350269189626,
                            0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy));
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod(i, 289.0);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
          + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
          dot(x12.zw,x12.zw)), 0.0);
        m = m*m ;
        m = m*m ;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }
      
      void main() {
        // Create a slower flowing effect
        float slowTime = uTime * 0.1;
        
        // Generate multiple noise layers with different scales and speeds
        float noise1 = snoise(vec2(vUv.x * 1.5 + slowTime * 0.2, vUv.y * 1.5 - slowTime * 0.1)) * 0.5 + 0.5;
        float noise2 = snoise(vec2(vUv.x * 3.0 - slowTime * 0.15, vUv.y * 2.0 + slowTime * 0.05)) * 0.25 + 0.75;
        
        // Calculate distance from center for radial gradient
        vec2 center = vec2(0.5);
        float dist = distance(vUv, center);
        float radialGradient = smoothstep(0.8, 0.2, dist);
        
        // Blue primary color for Trophic Cascade
        vec3 blueColor = vec3(0.0, 0.337, 0.824); // #0056D2
        vec3 lightBlueColor = vec3(0.0, 0.38, 1.0); // #0061FF
        vec3 deepBlueColor = vec3(0.0, 0.22, 0.6); // Deeper variation
        
        // Create a flowing, liquid-like effect
        float flowEffect = noise1 * noise2;
        
        // Blend between blue tones based on the noise
        vec3 finalColor = mix(deepBlueColor, lightBlueColor, flowEffect);
        
        // Apply radial gradient for a vignette effect
        finalColor = mix(vec3(1.0), finalColor, radialGradient * 0.7);
        
        // Adjust opacity for subtle background
        float opacity = radialGradient * 0.15; // Very subtle
        
        gl_FragColor = vec4(finalColor, opacity);
      }
    `;
    
    // Create a plane with the shader
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
      },
      transparent: true,
      depthTest: false,
    });
    
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);
    
    // Animation
    const animate = (time: number) => {
      material.uniforms.uTime.value = time * 0.001;
      renderer.render(scene, camera);
      requestRef.current = requestAnimationFrame(animate);
    };
    
    requestRef.current = requestAnimationFrame(animate);
    
    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      width = containerRef.current.clientWidth;
      height = containerRef.current.clientHeight;
      
      renderer.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose of Three.js objects
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);
  
  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full z-[-1] overflow-hidden"
      aria-hidden="true"
    />
  );
}
