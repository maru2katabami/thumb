"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, OrbitControls, useGLTF } from "@react-three/drei"
import { useEffect, useRef, useState } from "react"
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
  const [isPressed, setIsPressed] = useState(false)
  const origin = useRef({})

  // 初回レンダリング時に各ノードの初期回転を保存
  useEffect(() => {
    Object.values(nodes).forEach(child => {
      origin.current[child.name] = child.rotation.clone()
    })
  }, [nodes])

  // マウスの押下・離上イベントを useEffect 内で設定
  useEffect(() => {
    const handleMouseDown = () => {
      setIsPressed(true)
    }
    const handleMouseUp = () => {
      setIsPressed(false)
    }
    window.addEventListener("touchstart", handleMouseDown)
    window.addEventListener("touchend", handleMouseUp)
    return () => {
      window.removeEventListener("touchstart", handleMouseDown)
      window.removeEventListener("touchend", handleMouseUp)
    }
  }, [])

  // フレーム毎のアニメーション処理
  useFrame(() => {
    Object.values(nodes).forEach(child => {
      if (isPressed) {
        // マウスが押されている間のアニメーション処理
        if (child.name.includes("thumb")) {
          if (child.name.slice(-1) >= 1) child.rotation.x = MathUtils.clamp(child.rotation.x - 0.2, -Math.PI / 2, 0)
        }
        if (child.name.includes("index")) {
          if (child.name.slice(-1) >= 1) child.rotation.x = MathUtils.clamp(child.rotation.x - 0.2, -Math.PI / 2, 0)
        }
        if (child.name.includes("middle")) {
          if (child.name.slice(-1) >= 1) child.rotation.x = MathUtils.clamp(child.rotation.x - 0.2, -Math.PI / 2, 0)
        }
        if (child.name.includes("ring")) {
          if (child.name.slice(-1) >= 1) child.rotation.x = MathUtils.clamp(child.rotation.x - 0.2, -Math.PI / 2, 0)
        }
        if (child.name.includes("little")) {
          if (child.name.slice(-1) >= 1) child.rotation.x = MathUtils.clamp(child.rotation.x - 0.2, -Math.PI / 2, 0)
        }
      } else {
        // マウスが離された場合、初期回転に向けて滑らかに補間
        const orig = origin.current[child.name]
        if (orig) {
          child.rotation.x = MathUtils.lerp(child.rotation.x, orig.x, 0.1)
          child.rotation.y = MathUtils.lerp(child.rotation.y, orig.y, 0.1)
          child.rotation.z = MathUtils.lerp(child.rotation.z, orig.z, 0.1)
        }
      }
    })
  })

  return <primitive object={scene} />
}
