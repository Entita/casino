import React from 'react'
import { FireworksClass } from './Fireworks'

export default function FireworksCanvas({ numberOfStars }) {
  const [fireworks, setFireworks] = React.useState(null)
  const fireworksRef = React.useRef()

  React.useEffect(() => {
    const fireworksCanvas = fireworksRef.current
    if (!fireworksCanvas) return

    const newClass = new FireworksClass(fireworksCanvas, numberOfStars)
    setFireworks(newClass)

    return () => cancelAnimationFrame(newClass.frame)
  }, [fireworksRef, numberOfStars])

  React.useEffect(() => {
    if (!fireworks) return

    const resize = () => fireworks.changeSize(fireworks.canvas)

    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [fireworks])


  return <canvas style={{ position: 'absolute', zIndex: -1 }} ref={fireworksRef} />
}
