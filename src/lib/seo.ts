import { useEffect } from 'react'

export interface SEOConfig {
  title: string
  description?: string
}

export const DEFAULT_SEO: SEOConfig = {
  title: 'DJEZYAS | Business Management Platform',
  description: 'Streamline your business operations with DJEZYAS. Manage products, organizations, and teams with our comprehensive business management platform.'
}

export function updateSEO(config: SEOConfig) {
  document.title = config.title
  
  const metaDescription = document.querySelector('meta[name="description"]')
  if (metaDescription && config.description) {
    metaDescription.setAttribute('content', config.description)
  }
}

export function useSEO(config: SEOConfig) {
  useEffect(() => {
    updateSEO(config)
  }, [config.title, config.description])
} 