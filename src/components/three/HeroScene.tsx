"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import * as THREE from "three";

function HopeParticles({ count = 200 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      const t = Math.random();
      colors[i * 3] = 0.2 + t * 0.3;
      colors[i * 3 + 1] = 0.5 + t * 0.3;
      colors[i * 3 + 2] = 0.4 + t * 0.2;

      sizes[i] = Math.random() * 0.08 + 0.02;
    }

    return { positions, colors, sizes };
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[particles.colors, 3]}
        />
        <bufferAttribute attach="attributes-size" args={[particles.sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function GlowingPath() {
  const ref = useRef<THREE.Mesh>(null);

  const curve = useMemo(() => {
    const points = [
      new THREE.Vector3(-4, -2, 0),
      new THREE.Vector3(-2, -0.5, 0.5),
      new THREE.Vector3(0, 0.5, 0),
      new THREE.Vector3(2, 1.5, -0.3),
      new THREE.Vector3(4, 3, 0),
    ];
    return new THREE.CatmullRomCurve3(points);
  }, []);

  const tubeGeometry = useMemo(
    () => new THREE.TubeGeometry(curve, 64, 0.03, 8, false),
    [curve]
  );

  useFrame((state) => {
    if (ref.current) {
      const material = ref.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity =
        0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.3;
    }
  });

  return (
    <mesh ref={ref} geometry={tubeGeometry}>
      <meshStandardMaterial
        color="#35927a"
        emissive="#52ae94"
        emissiveIntensity={0.5}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

function HopeTree() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[3, -1.5, -1]}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.08, 0.12, 1, 8]} />
          <meshStandardMaterial color="#6d4629" />
        </mesh>
        <mesh position={[0, 1.5, 0]}>
          <coneGeometry args={[0.8, 1.2, 8]} />
          <meshStandardMaterial
            color="#35927a"
            emissive="#287562"
            emissiveIntensity={0.2}
          />
        </mesh>
        <mesh position={[0, 2.3, 0]}>
          <coneGeometry args={[0.6, 1, 8]} />
          <meshStandardMaterial
            color="#52ae94"
            emissive="#35927a"
            emissiveIntensity={0.15}
          />
        </mesh>
        <pointLight position={[0, 2.5, 0.5]} color="#cfa55a" intensity={0.5} distance={3} />
      </Float>
    </group>
  );
}

function FloatingBooks() {
  const books = useMemo(
    () =>
      Array.from({ length: 4 }, (_, i) => ({
        position: [
          -3 + i * 0.8,
          1 + Math.sin(i) * 0.5,
          -0.5 + i * 0.3,
        ] as [number, number, number],
        rotation: [0.2, i * 0.5, 0.1] as [number, number, number],
        color: i % 2 === 0 ? "#cfa55a" : "#35927a",
      })),
    []
  );

  return (
    <group position={[-2, 0, 0]}>
      {books.map((book, i) => (
        <Float key={i} speed={1.5 + i * 0.3} floatIntensity={0.4}>
          <mesh position={book.position} rotation={book.rotation}>
            <boxGeometry args={[0.5, 0.08, 0.35]} />
            <meshStandardMaterial
              color={book.color}
              emissive={book.color}
              emissiveIntensity={0.1}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#fff8f0" />
      <directionalLight position={[-3, 2, -2]} intensity={0.3} color="#84cbb5" />
      <pointLight position={[0, 3, 2]} intensity={0.6} color="#cfa55a" />

      <HopeParticles count={150} />
      <GlowingPath />
      <HopeTree />
      <FloatingBooks />

      <Stars
        radius={30}
        depth={20}
        count={300}
        factor={2}
        saturation={0.3}
        fade
        speed={0.5}
      />
    </>
  );
}

export function HeroScene() {
  return (
    <div
      className="absolute inset-0 -z-10"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
