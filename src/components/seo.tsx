import { useEffect } from 'react'
import { useLocation } from '@tanstack/react-router'
import { updateSEO, type SEOConfig } from '@/lib/seo'

export function SEO(props: SEOConfig) {
  const location = useLocation()
  
  useEffect(() => {
    updateSEO(props)
  }, [location.pathname, props.title, props.description])
  
  return null
} 