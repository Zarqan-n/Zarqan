import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Float, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { Group } from 'three';

type SkillCubeProps = {
  position: [number, number, number];
  skill: string;
  color: string;
  delay?: number;
};

function SkillCube({ position, skill, color, delay = 0 }: SkillCubeProps) {
  // Use the mesh type from THREE.js
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      // Rotate the mesh
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
      
      // Pulse size effect when hovered
      if (hovered) {
        const scale = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.05;
        meshRef.current.scale.set(scale, scale, scale);
      }
    }
  });

  return (
    <Float 
      speed={2} 
      rotationIntensity={0.5} 
      floatIntensity={0.5}
      position={position}
    >
      <mesh
        ref={meshRef}
        position={[0, 0, 0]}
        scale={clicked ? 1.2 : 1}
        onClick={() => setClicked(!clicked)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[1.2, 1.2, 1.2]} />
        <meshStandardMaterial 
          color={hovered ? '#a855f7' : color} 
          wireframe={hovered}
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>
      <Text
        position={[0, 0, 0.8]}
        fontSize={0.2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
        maxWidth={1}
        lineHeight={1}
        textAlign="center"
      >
        {skill}
      </Text>
    </Float>
  );
}

export function RotatingSkillCubes() {
  // List of skills to showcase
  const skills = [
    { name: "React", color: "#61dafb" },
    { name: "TypeScript", color: "#3178c6" },
    { name: "ThreeJS", color: "#049ef4" },
    { name: "Node.js", color: "#68a063" },
    { name: "Tailwind", color: "#38b2ac" },
  ];
  
  return (
    <div className="h-[300px] w-full">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        {skills.map((skill, index) => {
          // Position skills in a pentagon pattern
          const angle = (index / skills.length) * Math.PI * 2;
          const radius = 2.5;
          const x = Math.sin(angle) * radius;
          const y = Math.cos(angle) * radius;
          
          return (
            <SkillCube 
              key={skill.name}
              position={[x, y, 0]}
              skill={skill.name}
              color={skill.color}
              delay={index * 0.2}
            />
          );
        })}
        
        <Environment preset="city" />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}

// A floating and rotating 3D logo
type FloatingLogoProps = {
  size?: number;
  text: string;
  color?: string;
};

export function FloatingLogo({ size = 2, text, color = '#a855f7' }: FloatingLogoProps) {
  return (
    <div className="h-[150px] w-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 40 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        
        <Float speed={1.5} rotationIntensity={1} floatIntensity={1}>
          <Text
            color={color}
            fontSize={size}
            maxWidth={200}
            lineHeight={1}
            letterSpacing={0.02}
            textAlign="center"
            font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
            anchorX="center"
            anchorY="middle"
          >
            {text}
          </Text>
        </Float>
        
        <Environment preset="sunset" />
      </Canvas>
    </div>
  );
}

// Interactive 3D animated hero scene
export function InteractiveHeroScene() {
  return (
    <div className="h-[600px] w-full">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        
        <ParticleField />
        <HeroText />
        
        <Environment preset="night" />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}

function ParticleField() {
  const particlesCount = 200;
  const particles = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (particles.current) {
      particles.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });
  
  return (
    <group ref={particles}>
      {Array.from({ length: particlesCount }).map((_, i) => {
        const radius = 10 + Math.random() * 10;
        const angle1 = Math.random() * Math.PI * 2;
        const angle2 = Math.random() * Math.PI * 2;
        
        const x = Math.sin(angle1) * Math.cos(angle2) * radius;
        const y = Math.sin(angle1) * Math.sin(angle2) * radius;
        const z = Math.cos(angle1) * radius;
        
        const size = Math.random() * 0.05 + 0.02;
        
        return (
          <mesh key={i} position={[x, y, z]}>
            <sphereGeometry args={[size, 8, 8]} />
            <meshStandardMaterial 
              color={Math.random() > 0.5 ? '#a855f7' : '#818cf8'} 
              emissive={Math.random() > 0.5 ? '#a855f7' : '#818cf8'}
              emissiveIntensity={0.5}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function HeroText() {
  return (
    <group position={[0, 0, 0]}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <Text
          color="#ffffff"
          fontSize={1.2}
          maxWidth={5}
          lineHeight={1.2}
          letterSpacing={0.02}
          textAlign="center"
          font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
          anchorX="center"
          anchorY="middle"
          position={[0, 0, 0]}
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          ZARQAN
          <meshStandardMaterial color="#ffffff" />
        </Text>
        <Text
          color="#a855f7"
          fontSize={0.4}
          maxWidth={5}
          lineHeight={1.2}
          letterSpacing={0.02}
          textAlign="center"
          font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
          anchorX="center"
          anchorY="middle"
          position={[0, -0.8, 0]}
          outlineWidth={0.01}
          outlineColor="#000000"
        >
          INTERACTIVE DEVELOPER
          <meshStandardMaterial color="#a855f7" />
        </Text>
      </Float>
    </group>
  );
}

// Main component that can be used in various parts of the application
export default function InteractiveScene() {
  return (
    <motion.div
      className="w-full h-96 bg-transparent"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} />
        
        <mesh>
          <torusKnotGeometry args={[1, 0.3, 128, 32]} />
          <meshStandardMaterial 
            color="#a855f7"
            roughness={0.3}
            metalness={0.8}
            wireframe
          />
        </mesh>
        
        <OrbitControls 
          enableZoom={false} 
          autoRotate
          autoRotateSpeed={2}
        />
      </Canvas>
    </motion.div>
  );
}