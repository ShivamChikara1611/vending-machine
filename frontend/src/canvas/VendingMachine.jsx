import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";


export function VendingMachineCanvas(props) {
  const { nodes, materials } = useGLTF('/vendingMachine/scene.gltf')
  const groupRef = useRef();
  let direction = 1;

  // Animate Y-axis rotation (back and forth within 150°)
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005 * direction;

      // Clamp between -75° and +75° (≈ 150° total)
      if (groupRef.current.rotation.y > Math.PI / 5) direction = -1; 
      if (groupRef.current.rotation.y < -Math.PI / 5) direction = 1;
    }
  });


  return (
    <group ref={groupRef} {...props} dispose={null}>
      <group scale={0.01}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere_Mat2_0.geometry}
          material={materials['Mat.2']}
          position={[26.448, 368.047, 377.101]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Extrude_2_Mat2_0.geometry}
          material={materials['Mat.2']}
          position={[26.731, 290.056, 377.101]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Extrude_1_Mat1_0.geometry}
          material={materials['Mat.1']}
          position={[-4.942, -390.144, 367.015]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Extrude_Mat2_0.geometry}
          material={materials['Mat.2']}
          position={[176.851, 380.378, 412.316]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Extrude_2_2_Mat1_0.geometry}
          material={materials['Mat.1']}
          position={[6.848, -494.513, 367.015]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Extrude_3_Mat3_0.geometry}
          material={materials['Mat.3']}
          position={[40.271, 581.207, 367.015]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder_7_Mat2_0.geometry}
          material={materials['Mat.2']}
          position={[-192.368, 46.969, 341.389]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['1_Mat2_0'].geometry}
          material={materials['Mat.2']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder_3_Mat2_0.geometry}
          material={materials['Mat.2']}
          position={[230.382, 187.359, 430.674]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder_2_Mat2_0.geometry}
          material={materials['Mat.2']}
          position={[230.382, 187.359, 330.674]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane_3_Mat3_0.geometry}
          material={materials['Mat.3']}
          position={[197.593, 190.43, 399.176]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_6_Mat2_0.geometry}
          material={materials['Mat.2']}
          position={[26.451, 285.68, 375.651]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane_2_Mat7_0.geometry}
          material={materials['Mat.7']}
          position={[158.021, 384.275, 405.283]}
          rotation={[-1.177, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane_1_Mat10_0.geometry}
          material={materials['Mat.10']}
          position={[188.028, 345.382, 412.95]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Disc_1_Mat2_0.geometry}
          material={materials['Mat.2']}
          position={[180.453, 41.451, 415.46]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane_Mat2_0.geometry}
          material={materials['Mat.2']}
          position={[180.448, 134.36, 411.66]}
          rotation={[Math.PI, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_5_Mat3_0.geometry}
          material={materials['Mat.3']}
          position={[0, 0, -1.603]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_4_Mat3_0.geometry}
          material={materials['Mat.3']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_3_Mat1_0.geometry}
          material={materials['Mat.1']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sweep_Mat12_0.geometry}
          material={materials['Mat.12']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_8_Mat3_0.geometry}
          material={materials['Mat.3']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Null_3_Mat12_0.geometry}
          material={materials['Mat.12']}
          position={[-3.704, -659.618, 103.245]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_2_Mat2_0.geometry}
          material={materials['Mat.2']}
          position={[187.657, 349.606, 431.156]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_1_Mat3_0.geometry}
          material={materials['Mat.3']}
          position={[183.218, 124.603, 367.015]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_Mat1_0.geometry}
          material={materials['Mat.1']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_7_Mat3_0.geometry}
          material={materials['Mat.3']}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/vendingMachine/scene.gltf')

const CameraAnimation = () => {
  let direction = 1;
  useFrame((state) => {
    const camera = state.camera;
    camera.position.z += 0.005 * direction;
    if (camera.position.z > 12) direction = -1;
    if (camera.position.z < 9) direction = 1;
  });
  return null;
};

const VendingMachineApp = () => {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 2, 10], fov: 60 }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />

      <Suspense fallback={null}>
        <VendingMachineCanvas scale={0.57} />
      </Suspense>

      {/* OrbitControls for zoom/pan, but rotation handled manually */}
      <OrbitControls
        enablePan={false}
        enableDamping={true}
        enableRotate={false} // disable manual rotation (we animate it)
        enableZoom={false}
      />

      <CameraAnimation />
    </Canvas>
  );
};

export default VendingMachineApp;