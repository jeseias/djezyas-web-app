import { _env } from "@/core/config/_env"
import { Constants } from "@/core/config/constants"
import axios from "axios"
import Cookies from "js-cookie"


export const api = axios.create({
  baseURL: _env.VITE_API_URL,
  withCredentials: true
})

api.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get(Constants.ACCESS_TOKEN_KEY)
    if (accessToken) {
      try {
        if (accessToken) {
          config.headers['x-access-token'] = accessToken
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
      response.data.errors.some((err: { message?: string }) => err.message === 'Unauthorized' || err.message === 'Authentication required')
    ) {
      console.log('Unauthorized error detected in response data, dispatching force-logout event')
      window.dispatchEvent(new Event('force-logout'))
    }
    
    return response
  },
  (error) => {
    if (import.meta.env.DEV) {
      console.log('Response error interceptor:', error.config?.url, error.response?.status, error.response?.data)
    }
    
    if (error.response?.status === 401) {
      console.log('401 error detected, dispatching force-logout event')
      window.dispatchEvent(new Event('force-logout'))
    }
    
    return Promise.reject(error)
  }
)