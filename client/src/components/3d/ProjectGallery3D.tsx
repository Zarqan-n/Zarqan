import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, Float, PresentationControls, Html } from '@react-three/drei';
import { Project } from '../../types';
import { motion } from 'framer-motion';

export default function ProjectGallery3D({ projects }: { projects: Project[] }) {
  return (
    <div className="w-full h-[600px] my-8">
      <Canvas camera={{ position: [0, 0, 8], fov: 40 }}>
        <ambientLight intensity={0.5} />
        <spotLight 
          position={[10, 10, 10]} 
          angle={0.15} 
          penumbra={1} 
          intensity={1} 
          castShadow 
        />
        
        <PresentationControls
          global
          zoom={0.8}
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 4, Math.PI / 4]}
          azimuth={[-Math.PI / 4, Math.PI / 4]}
        >
          <ProjectsGroup projects={projects} />
        </PresentationControls>
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}

function ProjectsGroup({ projects }: { projects: Project[] }) {
  return (
    <group position={[0, 0, 0]}>
      {projects.map((project, i) => {
        // Position projects in a circle
        const angle = (i / projects.length) * Math.PI * 2;
        const radius = 4;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;
        
        return (
          <ProjectCard
            key={project.id}
            project={project}
            position={[x, 0, z]}
            rotation={[0, -angle, 0]}
          />
        );
      })}
    </group>
  );
}

function ProjectCard({ project, position, rotation }: { 
  project: Project; 
  position: [number, number, number];
  rotation: [number, number, number];
}) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<THREE.Group>(null!);
  
  // Subtle floating animation
  useFrame((state) => {
    if (cardRef.current) {
      cardRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.05;
    }
  });
  
  return (
    <Float 
      speed={2} 
      rotationIntensity={0.2} 
      floatIntensity={0.5}
      position={position}
      rotation={rotation}
    >
      <group 
        ref={cardRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* 3D Card */}
        <mesh castShadow receiveShadow scale={hovered ? 1.05 : 1}>
          <boxGeometry args={[2, 3, 0.1]} />
          <meshStandardMaterial 
            color={hovered ? "#a855f7" : "#1e1e2e"} 
            roughness={0.3}
            metalness={0.5}
          />
        </mesh>
        
        {/* Project Information - Using HTML overlay for text */}
        <Html
          transform
          occlude
          position={[0, 0, 0.06]}
          style={{
            width: '180px',
            height: '280px',
            padding: '10px',
            borderRadius: '8px',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: 'white',
            textAlign: 'center',
            pointerEvents: 'none',
          }}
        >
          <div style={{ width: '100%' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 'bold', margin: '5px 0', color: '#a855f7' }}>
              {project.title}
            </h3>
            <div style={{ 
              width: '100%', 
              height: '100px', 
              backgroundImage: `url(${project.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '4px',
              margin: '10px 0'
            }} />
            <p style={{ fontSize: '0.7rem', marginTop: '5px', opacity: 0.8 }}>
              {project.description.length > 120 ? 
                project.description.substring(0, 120) + '...' : 
                project.description
              }
            </p>
          </div>
          
          <div style={{ marginTop: '10px', display: 'flex', gap: '5px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {project.tags.map((tag, i) => (
              <span key={i} style={{ 
                fontSize: '0.6rem', 
                backgroundColor: 'rgba(168, 85, 247, 0.3)',
                padding: '2px 5px',
                borderRadius: '4px'
              }}>
                {tag}
              </span>
            ))}
          </div>
        </Html>
      </group>
    </Float>
  );
}

// Simplified version for mobile or as alternative
export function ProjectGallery3DSimple({ projects }: { projects: Project[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const nextProject = () => {
    setActiveIndex((current) => (current + 1) % projects.length);
  };
  
  const prevProject = () => {
    setActiveIndex((current) => (current - 1 + projects.length) % projects.length);
  };
  
  return (
    <div className="w-full h-[400px] relative my-8">
      <Canvas camera={{ position: [0, 0, 5], fov: 40 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        
        <Float 
          speed={2} 
          rotationIntensity={0.5} 
          floatIntensity={0.5}
        >
          <mesh scale={[3, 4, 0.1]} rotation={[0, 0.1, 0]}>
            <boxGeometry />
            <meshStandardMaterial color="#1e1e2e" roughness={0.3} metalness={0.8} />
          </mesh>
          
          <Html
            transform
            occlude
            position={[0, 0, 0.06]}
            style={{
              width: '280px',
              height: '380px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              pointerEvents: 'none',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#a855f7', marginBottom: '10px' }}>
                {projects[activeIndex].title}
              </h3>
              <div style={{ 
                width: '100%', 
                height: '150px', 
                backgroundImage: `url(${projects[activeIndex].image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '8px',
                margin: '10px 0'
              }} />
              <p style={{ fontSize: '0.9rem', marginTop: '10px', color: 'white' }}>
                {projects[activeIndex].description}
              </p>
              <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '15px' }}>
                {projects[activeIndex].tags.map((tag, i) => (
                  <span key={i} style={{ 
                    fontSize: '0.7rem', 
                    backgroundColor: 'rgba(168, 85, 247, 0.3)',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    color: 'white'
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Html>
        </Float>
        
        <Environment preset="sunset" />
      </Canvas>
      
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
        <button 
          onClick={prevProject}
          className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-4 py-2 rounded-full"
        >
          ← Prev
        </button>
        <button 
          onClick={nextProject}
          className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-4 py-2 rounded-full"
        >
          Next →
        </button>
      </div>
    </div>
  );
}