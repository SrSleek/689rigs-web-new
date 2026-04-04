'use client'

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import {
  type ExchangeRates,
  type CurrencyInfo,
  CURRENCIES,
  getExchangeRates,
  detectCountry,
  getCurrencyForCountry,
  getCurrencyInfo,
  convertPrice,
  formatConvertedPrice,
} from '@/lib/currency'

interface CurrencyContextType {
  currency: CurrencyInfo
  currencies: CurrencyInfo[]
  rates: ExchangeRates | null
  isLoading: boolean
  setCurrency: (code: string) => void
  /** Convert and format a price from its original currency to the selected one */
  displayPrice: (amount: string | number, fromCurrency?: string) => string
  /** Convert a price (raw number) from its original currency */
  convert: (amount: number, fromCurrency?: string) => number
}

const CurrencyContext = createContext<CurrencyContextType | null>(null)

const STORAGE_KEY = '689rigs_currency'

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currencyCode, setCurrencyCode] = useState<string>('MXN')
  const [rates, setRates] = useState<ExchangeRates | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Initialize: detect country + fetch rates
  useEffect(() => {
    async function init() {
      setIsLoading(true)

      // Check if user previously selected a currency
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved && CURRENCIES.some(c => c.code === saved)) {
        setCurrencyCode(saved)
      } else {
        // Auto-detect country
        const country = await detectCountry()
        const detectedCurrency = getCurrencyForCountry(country)
        setCurrencyCode(detectedCurrency)
      }

      // Fetch exchange rates
      const exchangeRates = await getExchangeRates()
      setRates(exchangeRates)
      setIsLoading(false)
    }

    init()
  }, [])

  const setCurrency = useCallback((code: string) => {
    setCurrencyCode(code)
    localStorage.setItem(STORAGE_KEY, code)
  }, [])

  const convert = useCallback(
    (amount: number, fromCurrency: string = 'USD') => {
      if (!rates) return amount
      return convertPrice(amount, fromCurrency, currencyCode, rates)
    },
    [rates, currencyCode]
  )

  const displayPrice = useCallback(
    (amount: string | number, fromCurrency: string = 'USD') => {
      const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount
      if (isNaN(numAmount)) return '$0'

      if (!rates) {
        // Fallback while loading
        return formatConvertedPrice(numAmount, fromCurrency)
      }

      const converted = convertPrice(numAmount, fromCurrency, currencyCode, rates)
      return formatConvertedPrice(converted, currencyCode)
    },
    [rates, currencyCode]
  )

  const currency = getCurrencyInfo(currencyCode)

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        currencies: CURRENCIES,
        rates,
        isLoading,
        setCurrency,
        displayPrice,
        convert,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext)
  if (!ctx) throw new Error('useCurrency must be used within CurrencyProvider')
  return ctx
}
