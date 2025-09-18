'use client';

import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars, Float } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

// Animated Sphere Component
const AnimatedSphere: React.FC = () => {
  const meshRef = useRef<THREE.Mesh | null>(null);
  const glowRef = useRef<THREE.Mesh | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const [hovered, setHovered] = useState(false);
  const { mouse } = useThree();

  // Create particle system (positions + colors + basePositions)
  const particles = React.useMemo(() => {
    const count = 2000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const radius = 3 + Math.random() * 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const t = Math.random();
      colors[i * 3] = 0.15 + t * 0.85;
      colors[i * 3 + 1] = 0.65 + t * 0.15;
      colors[i * 3 + 2] = 0.85 + t * 0.15;
    }

    // basePositions usada como referência imutável para animação
    const basePositions = new Float32Array(positions);

    return { positions, colors, basePositions, count };
  }, []);

  useFrame((state) => {
    if (!meshRef.current || !glowRef.current || !particlesRef.current) return;

    const time = state.clock.getElapsedTime();

    meshRef.current.rotation.y = time * 0.2;
    meshRef.current.rotation.x = Math.sin(time * 0.3) * 0.1;

    glowRef.current.rotation.y = -time * 0.1;
    glowRef.current.rotation.z = time * 0.05;

    // Atualiza posições das partículas com base no array base (não acumula)
    const posAttr = particlesRef.current.geometry.getAttribute('position') as THREE.BufferAttribute;
    const positions = posAttr.array as Float32Array;
    const base = particles.basePositions;
    // pequenas oscilações conforme o tempo
    for (let i = 0; i < positions.length; i += 3) {
      // usa base para Y e aplica um deslocamento suave
      positions[i + 1] = base[i + 1] + Math.sin(time + i * 0.0005) * 0.04;
    }
    posAttr.needsUpdate = true;

    // scale lerp conforme hover
    if (meshRef.current.scale) {
      const target = hovered ? new THREE.Vector3(1.08, 1.08, 1.08) : new THREE.Vector3(1, 1, 1);
      meshRef.current.scale.lerp(target, 0.08);
    }

    // leve follow do mouse
    const targetX = mouse.x * 0.2;
    const targetY = mouse.y * 0.2;
    meshRef.current.rotation.x += (targetY - meshRef.current.rotation.x) * 0.05;
    meshRef.current.rotation.y += (targetX - meshRef.current.rotation.y) * 0.05;
  });

  return (
    <group>
      {/* Background particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          {/* Use 'args' — construtor BufferAttribute(array, itemSize) */}
          <bufferAttribute attach="attributes-position" args={[particles.positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[particles.colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          vertexColors={true}
          transparent={true}
          opacity={0.6}
          sizeAttenuation={true}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Main sphere */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <mesh
          ref={meshRef}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          castShadow
        >
          <sphereGeometry args={[1.5, 64, 64]} />
          <meshPhysicalMaterial
            transparent
            transmission={0.9}
            roughness={0.1}
            metalness={0.1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            color="#27A6D9"
            emissive="#27A6D9"
            emissiveIntensity={0.1}
          />
        </mesh>
      </Float>

      {/* Outer glow ring */}
      <mesh ref={glowRef}>
        <torusGeometry args={[2.2, 0.05, 16, 100]} />
        <meshBasicMaterial color="#FF7247" transparent opacity={0.6} />
      </mesh>

      {/* Inner glow */}
      <mesh>
        <sphereGeometry args={[1.6, 32, 32]} />
        <meshBasicMaterial transparent opacity={0.1} color="#27A6D9" />
      </mesh>
    </group>
  );
};

// Loading fallback
const Loader: React.FC = () => (
  <div className="flex items-center justify-center h-full">
    <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary-blue border-t-transparent" />
  </div>
);

// Main ThreeDemo Component
export interface ThreeDemoProps {
  className?: string;
}

const ThreeDemoClient: React.FC<ThreeDemoProps> = ({ className = '' }) => {
  const [loaded, setLoaded] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`relative w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        onCreated={() => setLoaded(true)}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        }}
      >
        <Suspense fallback={<Loader />}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#27A6D9" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#FF7247" />

          <Stars radius={300} depth={60} count={1000} factor={7} saturation={0} fade />

          <AnimatedSphere />

          <OrbitControls
            enableZoom
            enablePan={false}
            enableRotate
            enableDamping
            dampingFactor={0.08}
            minDistance={2}
            maxDistance={10}
            maxPolarAngle={Math.PI}
            minPolarAngle={0}
          />

          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        </Suspense>
      </Canvas>

      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: showTooltip ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm pointer-events-none"
      >
        Clique e arraste para rotacionar • Role para dar zoom
      </motion.div>

      {!loaded && (
        <div className="absolute inset-0 bg-bg-deep-start/90 backdrop-blur-sm flex items-center justify-center">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default ThreeDemoClient;