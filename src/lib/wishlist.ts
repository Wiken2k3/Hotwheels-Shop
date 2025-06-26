// 📁 src/lib/wishlist.ts

const WISHLIST_KEY = 'wishlist'

export const getWishlist = (): string[] => {
  if (typeof window === 'undefined') return []
  try {
    const data = localStorage.getItem(WISHLIST_KEY)
    if (!data) return []
    return JSON.parse(data) as string[]
  } catch {
    return []
  }
}

export const setWishlist = (ids: string[]): void => {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(ids))
  } catch {
    // ignore error
  }
}

export const toggleWishlist = (id: string): string[] => {
  const current = getWishlist()
  const updated = current.includes(id)
    ? current.filter(itemId => itemId !== id)
    : [...current, id]

  setWishlist(updated)
  return updated
}
