import { _env } from "@/core/config/_env"
import axios from "axios"

const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null
  return null
}

export const api = axios.create({
  baseURL: _env.VITE_API_URL,
})

api.interceptors.request.use(
  (config) => {
    const tokensCookie = getCookie('tokens')
    
    if (tokensCookie) {
      try {
        const tokens = JSON.parse(tokensCookie)
        if (tokens.accessToken) {
          config.headers.Authorization = `Bearer ${tokens.accessToken}`
          config.headers['x-access-token'] = tokens.accessToken
          
          if (import.meta.env.DEV) {
            console.log('Token added to request:', {
              url: config.url,
              method: config.method,
              hasToken: !!tokens.accessToken,
              tokenLength: tokens.accessToken?.length
            })
          }
        } else {
          console.warn('Access token not found in tokens cookie')
        }
      } catch (error) {
        console.error('Error parsing tokens from cookie:', error)
      }
    } else {
      if (import.meta.env.DEV) {
        console.warn('No tokens cookie found for request:', config.url)
      }
    }
    
    return config
  },
  (error) => {
    console.error('Request interceptor error:', error)
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => {
    if (
      response.data &&
      Array.isArray(response.data.errors) &&
      response.data.errors.some((err: { message?: string }) => err.message === 'Unauthorized')
    ) {
      window.dispatchEvent(new Event('force-logout'))
    }
    return response
  },
  (error) => {
    // Handle 401 errors globally
    if (error.response?.status === 401) {
      console.log('401 Unauthorized - triggering force logout')
      window.dispatchEvent(new Event('force-logout'))
    }
    return Promise.reject(error)
  }
)