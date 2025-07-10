import { useAuth } from '@/core/modules/user/infra/context/auth-context'
import { useOrganization } from '@/core/modules/organization/context/organization-context'

const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null
  return null
}

const testCookie = () => {
  const testValue = JSON.stringify({ test: 'data', timestamp: Date.now() })
  document.cookie = `test-cookie=${testValue}; path=/; max-age=3600`
  const retrieved = getCookie('test-cookie')
  console.log('Cookie test:', { set: testValue, retrieved })
  alert(`Cookie test: ${retrieved ? 'SUCCESS' : 'FAILED'}`)
}

export const DebugAuthState = () => {
  const auth = useAuth()
  const org = useOrganization()

  if (!import.meta.env.DEV) return null

  const userCookie = getCookie('user')
  const tokensCookie = getCookie('tokens')
  const sessionCookie = getCookie('session')

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs font-mono max-w-sm z-50">
      <div className="mb-2 font-bold">Debug Info</div>
      
      <div className="space-y-1">
        <div>Auth Loading: {auth.isLoading ? '🔄' : '✅'}</div>
        <div>Authenticated: {auth.isAuthenticated ? '✅' : '❌'}</div>
        <div>User: {auth.user?.email || 'None'}</div>
        <div>Token: {auth.tokens?.accessToken ? '✅' : '❌'}</div>
        <div>Org Loading: {org.isLoading ? '🔄' : '✅'}</div>
        <div>Has Orgs: {org.hasOrganizations ? '✅' : '❌'}</div>
        <div>Org Count: {org.allMyOrganizations.length}</div>
        <div>Selected Org: {org.organization?.name || 'None'}</div>
        
        <div className="border-t border-gray-600 pt-1 mt-2">
          <div className="font-bold">Cookies:</div>
          <div>User Cookie: {userCookie ? '✅' : '❌'}</div>
          <div>Tokens Cookie: {tokensCookie ? '✅' : '❌'}</div>
          <div>Session Cookie: {sessionCookie ? '✅' : '❌'}</div>
          <div>All Cookies: {document.cookie ? '✅' : '❌'}</div>
          <button 
            onClick={testCookie}
            className="mt-1 px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
          >
            Test Cookie
          </button>
        </div>
      </div>
    </div>
  )
} 