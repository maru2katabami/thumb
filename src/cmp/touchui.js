"use client"

import { useEffect, useRef } from "react"

export const TouchUI = () => {

  const firstRef = useRef(null)

  const r = () => Math.floor(Math.random() * 30) + 20 + "px"

  const handleStart = event => {    
    if (event.touches.length === 1) {
      firstRef.current.style.top = `${event.touches[0].clientY}px`
      firstRef.current.style.left = `${event.touches[0].clientX}px`
      firstRef.current.style.display = "block"
      setTimeout(() => {
        firstRef.current.style.borderRadius = "50px"
      }, 50)
    }
  }
  
  const handleMove = event => {
    const dx = event.touches[0].clientX - parseFloat(firstRef.current.style.left)
    const dy = event.touches[0].clientY - parseFloat(firstRef.current.style.top)
    const distance = Math.sqrt(dx * dx + dy * dy)
    const angle = Math.atan2(dy, dx)
    const angleDeg = angle * (180 / Math.PI)
    firstRef.current.style.width = `${Math.max(Math.min(distance + 40, 500), 100)}px`
    firstRef.current.style.transform = `translate(-50px,-50px) rotate(${angleDeg}deg)`
  }
  
  const handleEnd = event => {
    if (event.touches.length === 0) {
      firstRef.current.style.width = "100px"
      firstRef.current.style.transition = "width 500ms, border-radius 500ms"
      setTimeout(() => {
        firstRef.current.style.transform = `translate(-50px,-50px) rotate(${Math.random() * 360}deg)`
        firstRef.current.style.borderRadius = `${[r(), r(), r(), r()].join(" ")} / ${[r(), r(), r(), r()].join(" ")}`
        firstRef.current.style.transition = "border-radius 500ms"
        firstRef.current.style.display = "none"
      }, 500)
    }
  }

  useEffect(() => {
    window.addEventListener("touchstart", handleStart)
    window.addEventListener("touchmove", handleMove)
    window.addEventListener("touchend", handleEnd)
    return () => {
      window.removeEventListener("touchstart", handleStart)
      window.removeEventListener("touchmove", handleMove)
      window.removeEventListener("touchend", handleEnd)
    }
  }, [])

  return (
    <div
      ref={firstRef}
      style={{
        position: "absolute",
        transform: "translate(-50px,-50px)",
        transformOrigin: "50px 50px", 
        width: "100px",
        height: "100px",
        border: "solid 1px #00ffff",
        borderRadius: "20px",
        boxShadow: "inset 0 0 15px #00000011",
        transition: "border-radius 500ms",
        display: "none"
      }}/>
  )
}