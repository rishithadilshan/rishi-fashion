import { defineStore } from 'pinia'
import type { CartLine, Product } from '@/types/product'

const STORAGE_KEY = 'rishi-fashion-cart'

interface CartState {
  lines: CartLine[]
}

function loadFromStorage(): CartLine[] {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return []
  try {
    return JSON.parse(raw) as CartLine[]
  } catch {
    return []
  }
}

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    lines: loadFromStorage(),
  }),

  getters: {
    itemCount: (state): number =>
      state.lines.reduce((sum, line) => sum + line.quantity, 0),

    subtotal: (state): number =>
      state.lines.reduce(
        (sum, line) => sum + line.product.price * line.quantity,
        0,
      ),

    shippingCharge: (): number => 600,

    total(): number {
      return this.lines.length ? this.subtotal + this.shippingCharge : 0
    },
  },

  actions: {
    persist(): void {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.lines))
    },

    addToCart(product: Product, quantity = 1): void {
      const existing = this.lines.find((l) => l.product.id === product.id)
      if (existing) {
        existing.quantity += quantity
      } else {
        this.lines.push({ product, quantity })
      }
      this.persist()
    },

    updateQuantity(productId: number, quantity: number): void {
      const line = this.lines.find((l) => l.product.id === productId)
      if (!line) return
      if (quantity <= 0) {
        this.removeFromCart(productId)
        return
      }
      line.quantity = quantity
      this.persist()
    },

    removeFromCart(productId: number): void {
      this.lines = this.lines.filter((l) => l.product.id !== productId)
      this.persist()
    },

    clearCart(): void {
      this.lines = []
      this.persist()
    },
  },
})
