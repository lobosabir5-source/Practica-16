import { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useTexture } from '@react-three/drei'
import { BackSide } from 'three'
import type { Mesh } from 'three'

function Fondo() {
  const textura = useTexture('/fondo.jpg')
  return (
    <mesh>
      <sphereGeometry args={[50, 64, 64]} />
      <meshBasicMaterial map={textura} side={BackSide} />
    </mesh>
  )
}

function Piramide() {
  const piramide = useRef<Mesh>(null)
  const [encima, setEncima] = useState(false)

  useFrame((_state, delta) => {
    if (piramide.current) {
      piramide.current.rotation.y += delta
    }
  })

  return (
    <mesh
      ref={piramide}
      position={[-1.5, 0, 0]}
      scale={encima ? 1.3 : 1}
      onPointerOver={() => setEncima(true)}
      onPointerOut={() => setEncima(false)}
    >
      <coneGeometry args={[1, 1.6, 4]} />
      <meshStandardMaterial color={encima ? 'gold' : 'tomato'} />
    </mesh>
  )
}

function Cilindro() {
  const cilindro = useRef<Mesh>(null)
  const [activo, setActivo] = useState(false)

  useFrame((_state, delta) => {
    if (cilindro.current) {
      cilindro.current.rotation.x += delta
      cilindro.current.rotation.y += delta
    }
  })

  return (
    <mesh
      ref={cilindro}
      position={[1.5, 0, 0]}
      onClick={() => setActivo(!activo)}
    >
      <cylinderGeometry args={[0.6, 0.6, 1.4, 32]} />
      <meshStandardMaterial color={activo ? 'hotpink' : 'steelblue'} />
    </mesh>
  )
}

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 1, 6], fov: 60 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[3, 5, 2]} intensity={1.5} />
        <Suspense fallback={null}>
          <Fondo />
        </Suspense>
        <Piramide />
        <Cilindro />
        <OrbitControls />
      </Canvas>
    </div>
  )
}