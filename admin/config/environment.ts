export interface AppConfig {
  apiBaseUrl: string
  isDevelopment: boolean
  isProduction: boolean
}

const getEnvironment = (): AppConfig => {
  const mode = import.meta.env.MODE
  const isDevelopment = mode === 'development'
  const isProduction = mode === 'production'

  let apiBaseUrl = import.meta.env.VITE_API_BASE_URL || ''

  if (!apiBaseUrl) {
    if (isDevelopment) {
      apiBaseUrl = 'http://localhost:3001'
    } else if (typeof window !== 'undefined') {
      const origin = window.location.origin
      if (origin.includes('zeabur.app')) {
        const hostname = window.location.hostname
        if (hostname.includes('ziwei001-web')) {
          apiBaseUrl = 'https://ziwei001-api.zeabur.app'
        } else if (hostname.includes('ziwei001-admin')) {
          apiBaseUrl = 'https://ziwei001-api.zeabur.app'
        } else {
          apiBaseUrl = 'https://ziwei001-api.zeabur.app'
        }
      } else {
        apiBaseUrl = `${origin}/api`
      }
    } else {
      apiBaseUrl = 'https://ziwei001-api.zeabur.app'
    }
  }

  return { apiBaseUrl, isDevelopment, isProduction }
}

export const config = getEnvironment()
