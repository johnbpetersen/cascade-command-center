
import { Canvas } from '@react-three/fiber';
import FlowingScene from './canvas/FlowingScene';

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
