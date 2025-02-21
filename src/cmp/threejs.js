"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, OrbitControls, useGLTF } from "@react-three/drei"
import { useEffect, useRef } from "react"
import { MathUtils } from "three"

export const ThreeJS = () => {
  return (
    <Canvas>
      <OrbitControls />
      <Environment preset="city" />
      <ambientLight />
      <Hand />
    </Canvas>
  )
}

const Hand = () => {
  const { scene, nodes } = useGLTF("/hand.glb")

  useEffect(() => {
    console.log(nodes.thumb000.rotation)
  }, [nodes])

  useFrame(() => {
    Object.values(nodes).forEach((child) => {
      if (child.name.includes("thumb")) {
        if (child.name === "thumb000") {
          child.rotation.x = MathUtils.clamp(child.rotation.x + 0.01, 0.0, 0)
          child.rotation.y = MathUtils.clamp(child.rotation.y - 0.01, -0.7, 0)
          child.rotation.z = MathUtils.clamp(child.rotation.z - 0.01, 0.8, 0)
        }
        if (child.name.slice(-1) >= 1) child.rotation.x = MathUtils.clamp(child.rotation.x - 0.02, -Math.PI/2, 0)
      }
    
      if (child.name.includes("index")) {
        if (child.name.slice(-1) >= 1) child.rotation.x = MathUtils.clamp(child.rotation.x - 0.02, -Math.PI/2, 0)
      }

      if (child.name.includes("middle")) {
        if (child.name.slice(-1) >= 1) child.rotation.x = MathUtils.clamp(child.rotation.x - 0.02, -Math.PI/2, 0)
      }

      if (child.name.includes("ring")) {
        if (child.name.slice(-1) >= 1) child.rotation.x = MathUtils.clamp(child.rotation.x - 0.02, -Math.PI/2, 0)
      }

      if (child.name.includes("little")) {
        if ( child.name.slice(-1) >= 1) child.rotation.x = MathUtils.clamp(child.rotation.x - 0.02, -Math.PI/2, 0)
      }
      
    })
  })

  return <primitive object={scene} />
}
