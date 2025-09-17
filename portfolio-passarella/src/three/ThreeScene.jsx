import * as THREE from 'three'
import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'

// Infinite Passerella inspired loop: a set of items moving toward camera
export default function ThreeScene() {
  const groupRef = useRef()

  const items = useMemo(() => {
    const arr = []
    const count = 16
    for (let i = 0; i < count; i++) {
      const z = -i * 2.5
      const x = ((i % 4) - 1.5) * 1.2
      const y = (i % 2 === 0) ? 0.2 : -0.2
      arr.push({ position: [x, y, z], color: new THREE.Color(`hsl(${(i * 30) % 360},70%,60%)`) })
    }
    return arr
  }, [])

  useFrame((state, delta) => {
    const g = groupRef.current
    if (!g) return
    g.children.forEach((mesh) => {
      mesh.position.z += 1.5 * delta
      if (mesh.position.z > 2) {
        mesh.position.z -= 2.5 * 16
      }
      mesh.rotation.y += 0.3 * delta
    })
  })

  return (
    <group ref={groupRef}>
      {/* ground */}
      <mesh rotation-x={-Math.PI/2} position={[0,-0.6,0]}>
        <planeGeometry args={[30, 120]} />
        <meshStandardMaterial color="#111" metalness={0.3} roughness={0.2} envMapIntensity={0.5} />
      </mesh>
      {items.map((it, idx) => (
        <mesh key={idx} position={it.position} castShadow receiveShadow>
          <boxGeometry args={[0.6, 0.6, 0.6]} />
          <meshStandardMaterial color={it.color} emissive={it.color.clone().multiplyScalar(0.15)} metalness={0.2} roughness={0.4} />
        </mesh>
      ))}
    </group>
  )
}


