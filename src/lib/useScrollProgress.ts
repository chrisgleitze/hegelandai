import { useEffect, useState } from 'react'

function clamp(value: number) {
  return Math.min(1, Math.max(0, value))
}

export function useScrollProgress(start = 24, end = 220) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let animationFrame = 0

    function updateProgress() {
      animationFrame = 0

      const nextProgress = clamp((window.scrollY - start) / (end - start))

      setProgress((currentProgress) =>
        Math.abs(currentProgress - nextProgress) < 0.005
          ? currentProgress
          : nextProgress,
      )
    }

    function scheduleUpdate() {
      if (animationFrame === 0) {
        animationFrame = window.requestAnimationFrame(updateProgress)
      }
    }

    updateProgress()

    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)

    return () => {
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)

      if (animationFrame !== 0) {
        window.cancelAnimationFrame(animationFrame)
      }
    }
  }, [end, start])

  return progress
}
