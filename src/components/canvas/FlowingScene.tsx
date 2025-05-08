
import { OrbitControls } from '@react-three/drei';
import FlowingThread from './FlowingThread';
import SecondThread from './SecondThread';

const FlowingScene = () => {
  return (
    <>
      <ambientLight intensity={0.8} />
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
      />
      <FlowingThread />
      <SecondThread />
    </>
  );
};

export default FlowingScene;
