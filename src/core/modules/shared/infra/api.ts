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
          config.headers['x-access-token'] = tokens.accessToken
        }
      } catch (error) {
        console.error('Error parsing tokens from cookie:', error)
      }
    }
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)