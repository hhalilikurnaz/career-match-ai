'use client'

import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Sphere, Box, Cylinder } from '@react-three/drei'
import * as THREE from 'three'

function ProfessorAvatar() {
  const meshRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const [speaking, setSpeaking] = useState(false) // This prop will be passed from parent

  // Set speaking state based on prop
  useEffect(() => {
    // This effect will be triggered by the parent component passing the 'speaking' prop
    // For now, we'll simulate it or expect it from props
  }, [speaking])

  useFrame((state) => {
    if (meshRef.current) {
      // Subtle idle breathing/floating animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.05

      // Gentle head rotation
      const head = meshRef.current.children[0] // Assuming head is the first child
      if (head) {
        head.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05
        head.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.02
      }

      // Speaking animation - subtle mouth/jaw movement (simulated by head movement)
      if (speaking) {
        if (head) {
          head.position.y = 2 + Math.sin(state.clock.elapsedTime * 10) * 0.02 // Small up/down for speaking
        }
      } else {
        if (head) {
          head.position.y = 2 // Reset to idle position
        }
      }
    }
  })

  return (
    <group ref={meshRef}>
      {/* Head (Sphere) */}
      <Sphere
        args={[0.8, 32, 32]}
        position={[0, 2, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial
          color={hovered ? "#F59E0B" : "#FBBF24"} // Professor Gold
          roughness={0.3}
          metalness={0.1}
        />
      </Sphere>

      {/* Neck (Cylinder) */}
      <Cylinder args={[0.2, 0.2, 0.4, 16]} position={[0, 1.5, 0]}>
        <meshStandardMaterial color="#6B7280" /> {/* Professor Gray-500 */}
      </Cylinder>

      {/* Body (Box - more rectangular for a formal look) */}
      <Box args={[1.5, 1.8, 0.8]} position={[0, 0.5, 0]}>
        <meshStandardMaterial
          color="#1E3A8A" // Professor Blue-800
          roughness={0.4}
          metalness={0.2}
        />
      </Box>

      {/* Arms (Boxes) */}
      <Box args={[0.3, 1.2, 0.3]} position={[-0.9, 0.5, 0]}>
        <meshStandardMaterial color="#172554" /> {/* Professor Blue-900 */}
      </Box>
      <Box args={[0.3, 1.2, 0.3]} position={[0.9, 0.5, 0]}>
        <meshStandardMaterial color="#172554" /> {/* Professor Blue-900 */}
      </Box>

      {/* Legs (Boxes) */}
      <Box args={[0.5, 1.5, 0.5]} position={[-0.4, -1.2, 0]}>
        <meshStandardMaterial color="#111827" /> {/* Professor Gray-900 */}
      </Box>
      <Box args={[0.5, 1.5, 0.5]} position={[0.4, -1.2, 0]}>
        <meshStandardMaterial color="#111827" /> {/* Professor Gray-900 */}
      </Box>

      {/* Glasses (simple Box frames) */}
      <group position={[0, 2.1, 0.8]}>
        <Box args={[0.7, 0.1, 0.1]} position={[-0.4, 0, 0]}>
          <meshStandardMaterial color="#1F2937" /> {/* Dark Gray */}
        </Box>
        <Box args={[0.7, 0.1, 0.1]} position={[0.4, 0, 0]}>
          <meshStandardMaterial color="#1F2937" /> {/* Dark Gray */}
        </Box>
        <Box args={[0.1, 0.1, 0.2]} position={[-0.0, 0, 0.05]}>
          <meshStandardMaterial color="#1F2937" /> {/* Bridge */}
        </Box>
      </group>

      {/* Floating particles around the assistant */}
      {Array.from({ length: 10 }).map((_, i) => (
        <Sphere
          key={i}
          args={[0.03, 8, 8]}
          position={[
            Math.cos(i * Math.PI / 5) * 1.5 + Math.random() * 0.5 - 0.25,
            Math.sin(i * Math.PI / 5) * 1.5 + 1.5 + Math.random() * 0.5 - 0.25,
            Math.sin(i * Math.PI / 5) * 0.5 + Math.random() * 0.5 - 0.25
          ]}
        >
          <meshStandardMaterial
            color="#FCD34D" // Professor Gold-300
            emissive="#FCD34D"
            emissiveIntensity={0.5}
          />
        </Sphere>
      ))}
    </group>
  )
}

interface Assistant3DProps {
  speaking?: boolean
  className?: string
}

export function Assistant3D({ speaking = false, className = "" }: Assistant3DProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas camera={{ position: [0, 2, 5], fov: 60 }}>
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#1E40AF" /> {/* Professor Blue-700 */}

        <ProfessorAvatar />

        <Environment preset="city" /> {/* Use a more professional environment */}

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  )
}
