import { createStorefrontApiClient } from '@shopify/storefront-api-client';

export const shopifyClient = createStorefrontApiClient({
  storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!,
  apiVersion: '2024-01',
  publicAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!,
});

// ── Tipos base ──────────────────────────────────────────────
export interface ShopifyImage {
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

export interface ShopifyPrice {
  amount: string;
  currencyCode: string;
}

export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  vendor: string;
  tags: string[];
  featuredImage: ShopifyImage | null;
  priceRange: {
    minVariantPrice: ShopifyPrice;
    maxVariantPrice: ShopifyPrice;
  };
  compareAtPriceRange: {
    minVariantPrice: ShopifyPrice;
  };
}

export interface ShopifyCollection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: ShopifyImage | null;
  products: {
    nodes: ShopifyProduct[];
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string;
    };
  };
}

// ── Queries ──────────────────────────────────────────────────

const PRODUCT_FRAGMENT = `
  fragment ProductFragment on Product {
    id
    handle
    title
    vendor
    tags
    featuredImage { url altText width height }
    priceRange {
      minVariantPrice { amount currencyCode }
      maxVariantPrice { amount currencyCode }
    }
    compareAtPriceRange {
      minVariantPrice { amount currencyCode }
    }
  }
`;

export async function getCollection(
  handle: string,
  first = 24,
  after?: string
): Promise<ShopifyCollection | null> {
  const query = `
    ${PRODUCT_FRAGMENT}
    query GetCollection($handle: String!, $first: Int!, $after: String) {
      collection(handle: $handle) {
        id handle title description
        image { url altText width height }
        products(first: $first, after: $after) {
          nodes { ...ProductFragment }
          pageInfo { hasNextPage endCursor }
        }
      }
    }
  `;

  const { data, errors } = await shopifyClient.request(query, {
    variables: { handle, first, after },
  });

  if (errors) {
    console.error('Shopify getCollection error:', errors);
    return null;
  }

  return data?.collection ?? null;
}

export async function getProduct(handle: string) {
  const query = `
    query GetProduct($handle: String!) {
      product(handle: $handle) {
        id handle title vendor tags description descriptionHtml
        featuredImage { url altText width height }
        images(first: 8) {
          nodes { url altText width height }
        }
        priceRange {
          minVariantPrice { amount currencyCode }
          maxVariantPrice { amount currencyCode }
        }
        compareAtPriceRange {
          minVariantPrice { amount currencyCode }
        }
        variants(first: 20) {
          nodes {
            id title availableForSale
            price { amount currencyCode }
            compareAtPrice { amount currencyCode }
            selectedOptions { name value }
          }
        }
        options { name values }
      }
    }
  `;

  const { data, errors } = await shopifyClient.request(query, {
    variables: { handle },
  });

  if (errors) {
    console.error('Shopify getProduct error:', errors);
    return null;
  }

  return data?.product ?? null;
}

export async function getFeaturedProducts(first = 8) {
  const query = `
    ${PRODUCT_FRAGMENT}
    query GetFeaturedProducts($first: Int!) {
      products(first: $first, sortKey: BEST_SELLING) {
        nodes { ...ProductFragment }
      }
    }
  `;

  const { data, errors } = await shopifyClient.request(query, {
    variables: { first },
  });

  if (errors) {
    console.error('Shopify getFeaturedProducts error:', errors);
    return [];
  }

  return data?.products?.nodes ?? [];
}

// ── Helpers ──────────────────────────────────────────────────
export function formatPrice(amount: string, currencyCode = 'USD'): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(parseFloat(amount));
}

export function isOnSale(product: ShopifyProduct): boolean {
  const compare = parseFloat(
    product.compareAtPriceRange.minVariantPrice.amount
  );
  const price = parseFloat(product.priceRange.minVariantPrice.amount);
  return compare > 0 && compare > price;
}

export function hasTag(product: ShopifyProduct, tag: string): boolean {
  return product.tags.some(t => t.toLowerCase() === tag.toLowerCase());
}