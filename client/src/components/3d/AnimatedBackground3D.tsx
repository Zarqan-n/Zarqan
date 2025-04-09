import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Generate random points in a 3D space
function generatePoints(count: number, radius: number) {
  const points = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    
    // Create points in a sphere
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = Math.random() * radius;
    
    points[i3] = r * Math.sin(phi) * Math.cos(theta);
    points[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    points[i3 + 2] = r * Math.cos(phi);
    
    // Add some color variation
    const color = new THREE.Color();
    
    // Randomly choose between purple and blue hues
    if (Math.random() > 0.5) {
      // Purple hues
      color.setHSL(0.75, Math.random() * 0.4 + 0.6, 0.6);
    } else {
      // Blue hues
      color.setHSL(0.6, Math.random() * 0.4 + 0.6, 0.7);
    }
    
    colors[i3] = color.r;
    colors[i3 + 1] = color.g;
    colors[i3 + 2] = color.b;
  }
  
  return { positions: points, colors };
}

interface AnimatedPointsProps {
  count?: number;
  radius?: number;
  speed?: number;
}

function AnimatedPoints({ count = 2000, radius = 10, speed = 0.2 }: AnimatedPointsProps) {
  const pointsRef = useRef<THREE.Points>(null!);
  
  // Generate the points once
  const { positions, colors } = useMemo(() => generatePoints(count, radius), [count, radius]);
  
  // Simplified animation loop that just rotates the points
  useFrame((state) => {
    const time = state.clock.getElapsedTime() * speed;
    
    if (pointsRef.current) {
      // Rotate the points for a simpler but still effective animation
      pointsRef.current.rotation.x = Math.sin(time / 4) * 0.3;
      pointsRef.current.rotation.y = time * 0.1;
      pointsRef.current.rotation.z = Math.sin(time / 6) * 0.1;
    }
  });
  
  return (
    <Points ref={pointsRef} limit={count}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position" 
          array={positions} 
          count={count} 
          itemSize={3} 
        />
        <bufferAttribute 
          attach="attributes-color" 
          array={colors} 
          count={count} 
          itemSize={3} 
        />
      </bufferGeometry>
      <PointMaterial 
        size={0.05} 
        vertexColors 
        transparent 
        sizeAttenuation 
        depthWrite={false} 
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

interface AnimatedBackground3DProps {
  className?: string;
  pointCount?: number;
  radius?: number;
  speed?: number;
}

export default function AnimatedBackground3D({ 
  className = "fixed top-0 left-0 w-full h-full -z-10",
  pointCount = 3000,
  radius = 15,
  speed = 0.2
}: AnimatedBackground3DProps) {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 12], fov: 75 }}>
        <AnimatedPoints count={pointCount} radius={radius} speed={speed} />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></div>
    </div>
  );
}

// A version that can be used in specific sections rather than full-screen
export function SectionBackground3D({ className = "", ...props }: AnimatedBackground3DProps) {
  return (
    <AnimatedBackground3D 
      className={`absolute top-0 left-0 w-full h-full -z-10 ${className}`}
      pointCount={1500}
      radius={10}
      {...props}
    />
  );
}