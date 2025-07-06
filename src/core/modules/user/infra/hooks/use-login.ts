import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { login, type Login } from '@/core/modules/user/infra/api'
import { ErrorCode } from '@/core/modules/shared/errors'
import { useAuth } from '../context/auth-context'

const getBrowserInfo = () => {
  const userAgent = navigator.userAgent
  if (userAgent.includes('Chrome')) return 'Chrome'
  if (userAgent.includes('Firefox')) return 'Firefox'
  if (userAgent.includes('Safari')) return 'Safari'
  if (userAgent.includes('Edge')) return 'Edge'
  return 'Unknown'
}

const getOSInfo = () => {
  const userAgent = navigator.userAgent
  if (userAgent.includes('Windows')) return 'Windows'
  if (userAgent.includes('Mac')) return 'macOS'
  if (userAgent.includes('Linux')) return 'Linux'
  if (userAgent.includes('Android')) return 'Android'
  if (userAgent.includes('iOS')) return 'iOS'
  return 'Unknown'
}

const getDeviceType = (): 'mobile' | 'desktop' | 'tablet' => {
  const userAgent = navigator.userAgent
  if (/Tablet|iPad/i.test(userAgent)) return 'tablet'
  if (/Mobi|Android/i.test(userAgent)) return 'mobile'
  return 'desktop'
}

export const useLogin = () => {
  const navigate = useNavigate()
  const { signIn } = useAuth()

  return useMutation({
    mutationFn: (params: Omit<Login.Params, 'deviceInfo'>) => {
      const deviceInfo = {
        userAgent: navigator.userAgent,
        deviceType: getDeviceType() as 'mobile' | 'desktop' | 'tablet',
        browser: getBrowserInfo(),
        os: getOSInfo(),
      }

      return login({
        ...params,
        deviceInfo,
      })
    },
    onSuccess: (data) => {
      const { user, session, tokens } = data.data.login
      console.log('Login successful:', data.data.login)
      
      signIn(user, session, tokens)
      
      navigate({ to: '/app' })
    },
    onError: (error: any) => {
      console.error('Login failed:', error)
      
      if (error?.extensions?.code === ErrorCode.EMAIL_NOT_VERIFIED) {
        navigate({ 
          to: '/verify-email',
          search: { email: error.variables?.email || '' }
        })
      }
    }
  })
} 