/**
 * Simple cookie helpers. Use for small, persistent data (e.g. game stats, last score).
 * Cookies are limited to ~4KB per cookie and are sent with requests; keep payloads small.
 */

const DEFAULT_MAX_AGE_DAYS = 365

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  return match ? decodeURIComponent(match[2]) : null
}

function setCookie(
  name: string,
  value: string,
  options: { maxAgeDays?: number; path?: string } = {}
): void {
  if (typeof document === 'undefined') return
  const { maxAgeDays = DEFAULT_MAX_AGE_DAYS, path = '/' } = options
  const maxAge = maxAgeDays * 24 * 60 * 60
  document.cookie = `${name}=${encodeURIComponent(value)}; path=${path}; max-age=${maxAge}; SameSite=Lax`
}

function deleteCookie(name: string, path: string = '/'): void {
  if (typeof document === 'undefined') return
  document.cookie = `${name}=; path=${path}; max-age=0`
}

export { getCookie, setCookie, deleteCookie }
