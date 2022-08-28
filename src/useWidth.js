import React, { useState, useEffect } from 'react'

export const useWidth = () => {
  const [width, setWidth] = useState(window.innerWidth)
  const handleWindowResize = () => {
    setWidth(window.innerWidth)
  }
  useEffect(() => {
    window.addEventListener('resize', handleWindowResize)
    return () => window.removeEventListener('resize', handleWindowResize)
  }, [])

  return width
}
