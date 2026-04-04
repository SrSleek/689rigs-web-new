// src/lib/currency.ts
// ═══════════════════════════════════════════
// Currency conversion utility — 689 Rigs
// ═══════════════════════════════════════════

export interface ExchangeRates {
  USD: number
  MXN: number
  EUR: number
  COP: number
  BRL: number
  CLP: number
  ARS: number
  PEN: number
  [key: string]: number
}

export interface CurrencyInfo {
  code: string
  symbol: string
  name: string
  flag: string
  locale: string
}

export const CURRENCIES: CurrencyInfo[] = [
  { code: 'MXN', symbol: '$', name: 'Peso Mexicano', flag: '🇲🇽', locale: 'es-MX' },
  { code: 'USD', symbol: '$', name: 'Dólar USA', flag: '🇺🇸', locale: 'en-US' },
  { code: 'EUR', symbol: '€', name: 'Euro', flag: '🇪🇺', locale: 'de-DE' },
  { code: 'COP', symbol: '$', name: 'Peso Colombiano', flag: '🇨🇴', locale: 'es-CO' },
  { code: 'BRL', symbol: 'R$', name: 'Real Brasileño', flag: '🇧🇷', locale: 'pt-BR' },
  { code: 'CLP', symbol: '$', name: 'Peso Chileno', flag: '🇨🇱', locale: 'es-CL' },
  { code: 'ARS', symbol: '$', name: 'Peso Argentino', flag: '🇦🇷', locale: 'es-AR' },
  { code: 'PEN', symbol: 'S/', name: 'Sol Peruano', flag: '🇵🇪', locale: 'es-PE' },
]

// Country → currency mapping for auto-detection
const COUNTRY_CURRENCY: Record<string, string> = {
  MX: 'MXN',
  US: 'USD',
  ES: 'EUR',
  DE: 'EUR',
  FR: 'EUR',
  IT: 'EUR',
  CO: 'COP',
  BR: 'BRL',
  CL: 'CLP',
  AR: 'ARS',
  PE: 'PEN',
  // Default to MXN for unlisted countries
}

export function getCurrencyForCountry(countryCode: string): string {
  return COUNTRY_CURRENCY[countryCode.toUpperCase()] ?? 'MXN'
}

export function getCurrencyInfo(code: string): CurrencyInfo {
  return CURRENCIES.find(c => c.code === code) ?? CURRENCIES[0]
}

/**
 * Fetch exchange rates from free API (base: USD)
 * Uses exchangerate-api.com free tier — no key needed
 * Caches for 1 hour in the browser
 */
const CACHE_KEY = 'exchange_rates'
const CACHE_DURATION = 60 * 60 * 1000 // 1 hour

export async function getExchangeRates(): Promise<ExchangeRates> {
  // Check cache first
  if (typeof window !== 'undefined') {
    try {
      const cached = sessionStorage.getItem(CACHE_KEY)
      if (cached) {
        const { rates, timestamp } = JSON.parse(cached)
        if (Date.now() - timestamp < CACHE_DURATION) {
          return rates
        }
      }
    } catch {}
  }

  try {
    // Free API — no key needed, 1500 requests/month
    const res = await fetch('https://open.er-api.com/v6/latest/USD')
    if (!res.ok) throw new Error('API error')
    const data = await res.json()

    const rates: ExchangeRates = {
      USD: 1,
      MXN: data.rates?.MXN ?? 17.5,
      EUR: data.rates?.EUR ?? 0.92,
      COP: data.rates?.COP ?? 4200,
      BRL: data.rates?.BRL ?? 5.1,
      CLP: data.rates?.CLP ?? 950,
      ARS: data.rates?.ARS ?? 900,
      PEN: data.rates?.PEN ?? 3.7,
    }

    // Cache it
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify({
          rates,
          timestamp: Date.now(),
        }))
      } catch {}
    }

    return rates
  } catch {
    // Fallback rates if API fails
    return {
      USD: 1,
      MXN: 17.5,
      EUR: 0.92,
      COP: 4200,
      BRL: 5.1,
      CLP: 950,
      ARS: 900,
      PEN: 3.7,
    }
  }
}

/**
 * Detect user's country via free geolocation API
 */
export async function detectCountry(): Promise<string> {
  try {
    const res = await fetch('https://ipapi.co/json/')
    if (!res.ok) throw new Error()
    const data = await res.json()
    return data.country_code ?? 'MX'
  } catch {
    return 'MX' // Default to Mexico
  }
}

/**
 * Convert price from source currency to target currency
 */
export function convertPrice(
  amount: number,
  fromCurrency: string,
  toCurrency: string,
  rates: ExchangeRates
): number {
  if (fromCurrency === toCurrency) return amount

  // Convert to USD first, then to target
  const inUSD = fromCurrency === 'USD' ? amount : amount / (rates[fromCurrency] || 1)
  const converted = toCurrency === 'USD' ? inUSD : inUSD * (rates[toCurrency] || 1)

  return converted
}

/**
 * Format a converted price with proper locale and currency symbol
 */
export function formatConvertedPrice(
  amount: number,
  currencyCode: string
): string {
  const info = getCurrencyInfo(currencyCode)

  return new Intl.NumberFormat(info.locale, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: currencyCode === 'CLP' || currencyCode === 'COP' || currencyCode === 'ARS' ? 0 : 2,
  }).format(amount)
}