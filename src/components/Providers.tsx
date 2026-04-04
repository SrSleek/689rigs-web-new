'use client'

import { CartProvider } from '@/components/cart/CartContext'
import { CurrencyProvider } from '@/components/CurrencyContext'
import CartDrawer from '@/components/cart/CartDrawer'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CurrencyProvider>
      <CartProvider>
        {children}
        <CartDrawer />
      </CartProvider>
    </CurrencyProvider>
  )
}
