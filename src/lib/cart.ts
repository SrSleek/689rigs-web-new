import { shopifyClient } from './shopify'

/* ══════════════════════════════════════════════════════════════
   SHOPIFY CART API (Storefront API 2026-04)
   ══════════════════════════════════════════════════════════════ */

export interface CartLine {
  id: string
  quantity: number
  merchandise: {
    id: string
    title: string
    product: {
      title: string
      handle: string
      featuredImage: { url: string; altText: string | null } | null
    }
    price: { amount: string; currencyCode: string }
    selectedOptions: { name: string; value: string }[]
  }
}

export interface Cart {
  id: string
  checkoutUrl: string
  totalQuantity: number
  cost: {
    totalAmount: { amount: string; currencyCode: string }
    subtotalAmount: { amount: string; currencyCode: string }
  }
  lines: {
    nodes: CartLine[]
  }
}

const CART_FRAGMENT = `
  fragment CartFragment on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      totalAmount { amount currencyCode }
      subtotalAmount { amount currencyCode }
    }
    lines(first: 50) {
      nodes {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            id
            title
            product {
              title
              handle
              featuredImage { url altText }
            }
            price { amount currencyCode }
            selectedOptions { name value }
          }
        }
      }
    }
  }
`

export async function createCart(): Promise<Cart | null> {
  const query = `
    ${CART_FRAGMENT}
    mutation CartCreate {
      cartCreate {
        cart { ...CartFragment }
        userErrors { field message }
      }
    }
  `
  try {
    const { data, errors } = await shopifyClient.request(query)
    if (errors) { console.error('createCart error:', errors); return null }
    return data?.cartCreate?.cart ?? null
  } catch (e) {
    console.error('createCart exception:', e)
    return null
  }
}

export async function addToCart(cartId: string, variantId: string, quantity = 1): Promise<Cart | null> {
  const query = `
    ${CART_FRAGMENT}
    mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart { ...CartFragment }
        userErrors { field message }
      }
    }
  `
  try {
    const { data, errors } = await shopifyClient.request(query, {
      variables: {
        cartId,
        lines: [{ merchandiseId: variantId, quantity }],
      },
    })
    if (errors) { console.error('addToCart error:', errors); return null }
    return data?.cartLinesAdd?.cart ?? null
  } catch (e) {
    console.error('addToCart exception:', e)
    return null
  }
}

export async function updateCartLine(cartId: string, lineId: string, quantity: number): Promise<Cart | null> {
  const query = `
    ${CART_FRAGMENT}
    mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart { ...CartFragment }
        userErrors { field message }
      }
    }
  `
  try {
    const { data, errors } = await shopifyClient.request(query, {
      variables: {
        cartId,
        lines: [{ id: lineId, quantity }],
      },
    })
    if (errors) { console.error('updateCartLine error:', errors); return null }
    return data?.cartLinesUpdate?.cart ?? null
  } catch (e) {
    console.error('updateCartLine exception:', e)
    return null
  }
}

export async function removeCartLine(cartId: string, lineId: string): Promise<Cart | null> {
  const query = `
    ${CART_FRAGMENT}
    mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart { ...CartFragment }
        userErrors { field message }
      }
    }
  `
  try {
    const { data, errors } = await shopifyClient.request(query, {
      variables: { cartId, lineIds: [lineId] },
    })
    if (errors) { console.error('removeCartLine error:', errors); return null }
    return data?.cartLinesRemove?.cart ?? null
  } catch (e) {
    console.error('removeCartLine exception:', e)
    return null
  }
}

export async function getCart(cartId: string): Promise<Cart | null> {
  const query = `
    ${CART_FRAGMENT}
    query GetCart($cartId: ID!) {
      cart(id: $cartId) { ...CartFragment }
    }
  `
  try {
    const { data, errors } = await shopifyClient.request(query, {
      variables: { cartId },
    })
    if (errors) { console.error('getCart error:', errors); return null }
    return data?.cart ?? null
  } catch (e) {
    console.error('getCart exception:', e)
    return null
  }
}