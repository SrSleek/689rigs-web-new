'use client'

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import { createCart, addToCart, updateCartLine, removeCartLine, getCart, type Cart } from '@/lib/cart'

interface CartContextType {
  cart: Cart | null
  isOpen: boolean
  isLoading: boolean
  openCart: () => void
  closeCart: () => void
  addItem: (variantId: string, quantity?: number) => Promise<void>
  updateItem: (lineId: string, quantity: number) => Promise<void>
  removeItem: (lineId: string) => Promise<void>
  totalQuantity: number
}

const CartContext = createContext<CartContextType>({
  cart: null,
  isOpen: false,
  isLoading: false,
  openCart: () => {},
  closeCart: () => {},
  addItem: async () => {},
  updateItem: async () => {},
  removeItem: async () => {},
  totalQuantity: 0,
})

export function useCart() {
  return useContext(CartContext)
}

const CART_ID_KEY = '689rigs_cart_id'

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function initCart() {
      const savedCartId = localStorage.getItem(CART_ID_KEY)
      if (savedCartId) {
        const existingCart = await getCart(savedCartId)
        if (existingCart) {
          setCart(existingCart)
          return
        }
      }
      const newCart = await createCart()
      if (newCart) {
        setCart(newCart)
        localStorage.setItem(CART_ID_KEY, newCart.id)
      }
    }
    initCart()
  }, [])

  const addItem = useCallback(async (variantId: string, quantity = 1) => {
    if (!cart) return
    setIsLoading(true)
    const updatedCart = await addToCart(cart.id, variantId, quantity)
    if (updatedCart) {
      setCart(updatedCart)
      setIsOpen(true)
    }
    setIsLoading(false)
  }, [cart])

  const updateItem = useCallback(async (lineId: string, quantity: number) => {
    if (!cart) return
    setIsLoading(true)
    if (quantity <= 0) {
      const updatedCart = await removeCartLine(cart.id, lineId)
      if (updatedCart) setCart(updatedCart)
    } else {
      const updatedCart = await updateCartLine(cart.id, lineId, quantity)
      if (updatedCart) setCart(updatedCart)
    }
    setIsLoading(false)
  }, [cart])

  const removeItem = useCallback(async (lineId: string) => {
    if (!cart) return
    setIsLoading(true)
    const updatedCart = await removeCartLine(cart.id, lineId)
    if (updatedCart) setCart(updatedCart)
    setIsLoading(false)
  }, [cart])

  return (
    <CartContext.Provider value={{
      cart,
      isOpen,
      isLoading,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem,
      updateItem,
      removeItem,
      totalQuantity: cart?.totalQuantity ?? 0,
    }}>
      {children}
    </CartContext.Provider>
  )
}
