import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, MeshDistortMaterial, PerspectiveCamera, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Skill } from '../../types';
import { Color } from 'three';

interface SkillSphereProps {
  skill: Skill;
  index: number;
  totalSkills: number;
  onClick: (skill: Skill) => void;
  isSelected: boolean;
}

function SkillSphere({ skill, index, totalSkills, onClick, isSelected }: SkillSphereProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  
  // Position skills in a circle
  const angle = (index / totalSkills) * Math.PI * 2;
  const radius = 3;
  const x = Math.sin(angle) * radius;
  const y = Math.cos(angle) * radius;
  
  // Determine color based on percentage
  const getSkillColor = (percentage: number) => {
    if (percentage >= 90) return '#a855f7'; // Purple for expert
    if (percentage >= 70) return '#6366f1'; // Indigo for advanced
    if (percentage >= 50) return '#3b82f6'; // Blue for intermediate
    return '#0ea5e9'; // Light blue for beginner
  };
  
  const color = getSkillColor(skill.percentage);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      // Add subtle movement when hovered or selected
      if (hovered || isSelected) {
        meshRef.current.scale.x = meshRef.current.scale.y = meshRef.current.scale.z = 
          1.2 + Math.sin(state.clock.elapsedTime * 3) * 0.1;
      } else {
        meshRef.current.scale.x = meshRef.current.scale.y = meshRef.current.scale.z = 
          1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      }
    }
  });
  
  // Scale the size based on skill percentage
  const size = 0.4 + (skill.percentage / 100) * 0.6;
  
  return (
    <Float 
      speed={1 + (skill.percentage / 100)} 
      rotationIntensity={0.4} 
      floatIntensity={0.6}
      position={[x, y, 0]}
    >
      <mesh
        ref={meshRef}
        scale={size}
        onClick={() => onClick(skill)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[1, 48, 48]} />
        <MeshDistortMaterial
          color={isSelected ? '#f472b6' : color}
          speed={3}
          distort={isSelected || hovered ? 0.6 : 0.3}
          radius={1}
        />
      </mesh>
      
      <Text
        position={[0, -1.2, 0]}
        fontSize={0.2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {skill.name}
      </Text>
      
      {isSelected && (
        <Text
          position={[0, -1.5, 0]}
          fontSize={0.15}
          color="#f472b6"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.01}
          outlineColor="#000000"
        >
          {`${skill.percentage}%`}
        </Text>
      )}
    </Float>
  );
}

interface CentralSkillDisplayProps {
  skill: Skill | null;
}

function CentralSkillDisplay({ skill }: CentralSkillDisplayProps) {
  const ringRef = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    if (ringRef.current && skill) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.5;
    }
  });
  
  if (!skill) return null;
  
  return (
    <group position={[0, 0, 0]}>
      {/* Progress ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[1.8, 0.1, 16, 100, skill.percentage / 100 * Math.PI * 2]} />
        <meshStandardMaterial color="#f472b6" emissive="#f472b6" emissiveIntensity={0.5} />
      </mesh>
      
      <Text
        position={[0, 0, 0]}
        fontSize={0.7}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Montserrat-Bold.ttf"
        outlineWidth={0.04}
        outlineColor="#000000"
      >
        {skill.name}
      </Text>
      
      <Text
        position={[0, -0.8, 0]}
        fontSize={1}
        color="#f472b6"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Montserrat-Bold.ttf"
        outlineWidth={0.04}
        outlineColor="#000000"
      >
        {`${skill.percentage}%`}
      </Text>
    </group>
  );
}

interface SkillsVisualizationProps {
  skills: Skill[];
  className?: string;
}

export default function SkillsVisualization({ skills, className = "" }: SkillsVisualizationProps) {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  
  const handleSkillClick = (skill: Skill) => {
    setSelectedSkill(skill === selectedSkill ? null : skill);
  };
  
  return (
    <div className={`w-full h-[600px] ${className}`}>
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#f472b6" />
        
        {/* Central display for selected skill */}
        <CentralSkillDisplay skill={selectedSkill} />
        
        {/* Orbiting skill spheres */}
        {skills.map((skill, index) => (
          <SkillSphere
            key={skill.name}
            skill={skill}
            index={index}
            totalSkills={skills.length}
            onClick={handleSkillClick}
            isSelected={selectedSkill?.name === skill.name}
          />
        ))}
        
        <Environment preset="night" />
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
      </Canvas>
      
      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-white/70 text-center max-w-md mx-auto px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg"
        >
          {selectedSkill 
            ? `${selectedSkill.name}: ${selectedSkill.percentage}% proficiency`
            : "Click on a skill sphere to learn more about my proficiency"}
        </motion.p>
      </div>
    </div>
  );
}