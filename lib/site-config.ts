/**
 * Configuración centralizada de URLs y constantes SEO
 */

export const siteConfig = {
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://kevin-martinez-portfolio-alpha.vercel.app',
  profileImagePath: '/images/profile.jpg',
} as const

export const getProfileImageUrl = (customPath?: string) => {
  const path = customPath || siteConfig.profileImagePath
  return `${siteConfig.baseUrl}${path}`
}
