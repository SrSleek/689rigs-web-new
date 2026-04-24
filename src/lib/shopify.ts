// src/lib/shopify.ts
// Shopify Storefront API Client - 689 Rigs

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const storefrontToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!;
const apiVersion = '2026-04';

const endpoint = `https://${domain}/api/${apiVersion}/graphql.json`;

export async function shopifyFetch(query: string, variables: Record<string, any> = {}) {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': storefrontToken,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Shopify API error: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();

  if (json.errors) {
    console.error('Shopify GraphQL errors:', json.errors);
    throw new Error(json.errors[0]?.message || 'GraphQL error');
  }

  return json.data;
}

// Client object for cart.ts compatibility
export const shopifyClient = {
  async request(query: string, options?: Record<string, any> | { variables?: Record<string, any> }) {
    const variables = options?.variables ?? options ?? {};
    try {
      const data = await shopifyFetch(query, variables);
      return { data, errors: null };
    } catch (error: any) {
      return { data: null, errors: [{ message: error.message }] };
    }
  },
};

const PRODUCT_FRAGMENT = `
  fragment ProductFields on Product {
    id
    title
    handle
    description
    descriptionHtml
    vendor
    productType
    tags
    availableForSale
    featuredImage {
      url
      altText
      width
      height
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    compareAtPriceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 10) {
      edges {
        node {
          url
          altText
          width
          height
        }
      }
    }
    variants(first: 50) {
      edges {
        node {
          id
          title
          availableForSale
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
          selectedOptions {
            name
            value
          }
          image {
            url
            altText
            width
            height
          }
        }
      }
    }
    options {
      id
      name
      values
    }
  }
`;

export async function getCollection(handle: string, count: number = 20) {
  const query = `
    ${PRODUCT_FRAGMENT}
    query GetCollection($handle: String!, $count: Int!) {
      collection(handle: $handle) {
        id
        title
        description
        handle
        image {
          url
          altText
          width
          height
        }
        products(first: $count, sortKey: MANUAL) {
          edges {
            node {
              ...ProductFields
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch(query, { handle, count });

  if (!data?.collection) {
    return null;
  }

  const collection = data.collection;
  return {
    ...collection,
    products: {
      nodes: collection.products.edges.map((edge: any) => edge.node),
    },
  };
}

export async function getCollectionWithMeta(handle: string, count: number = 50) {
  const query = `
    ${PRODUCT_FRAGMENT}
    query GetCollectionMeta($handle: String!, $count: Int!) {
      collection(handle: $handle) {
        id
        title
        description
        handle
        image {
          url
          altText
          width
          height
        }
        products(first: $count, sortKey: MANUAL) {
          edges {
            node {
              ...ProductFields
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch(query, { handle, count });
  return data?.collection || null;
}

export async function getProduct(handle: string) {
  const query = `
    ${PRODUCT_FRAGMENT}
    query GetProduct($handle: String!) {
      product(handle: $handle) {
        ...ProductFields
      }
    }
  `;

  const data = await shopifyFetch(query, { handle });
  const product = data?.product;
  if (!product) return null;

  return {
    ...product,
    images: {
      nodes: product.images.edges.map((e: any) => e.node),
    },
    variants: {
      nodes: product.variants.edges.map((e: any) => e.node),
    },
  };
}

export async function getFeaturedProducts(count: number = 8) {
  const query = `
    ${PRODUCT_FRAGMENT}
    query GetFeaturedProducts($count: Int!) {
      products(first: $count, sortKey: CREATED_AT, reverse: true) {
        edges {
          node {
            ...ProductFields
          }
        }
      }
    }
  `;

  const data = await shopifyFetch(query, { count });
  return data?.products?.edges?.map((edge: any) => edge.node) || [];
}

export async function getAllCollections() {
  const query = `
    query GetAllCollections {
      collections(first: 100, sortKey: TITLE) {
        edges {
          node {
            id
            title
            handle
            description
            image {
              url
              altText
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch(query);
  return data?.collections?.edges?.map((edge: any) => edge.node) || [];
}

export async function getCollectionImages(handles: string[]): Promise<Record<string, string | null>> {
  try {
    const allCollections = await getAllCollections();
    const imageMap: Record<string, string | null> = {};

    for (const handle of handles) {
      const col = allCollections.find((c: any) => c.handle === handle);
      imageMap[handle] = col?.image?.url ?? null;
    }

    return imageMap;
  } catch (error) {
    console.error('Error fetching collection images:', error);
    return {};
  }
}

/**
 * Fetch product images from multiple collections.
 * Returns a map of { handle: [imageUrl1, imageUrl2, ...] }
 * Used to rotate thumbnails in the red collection strip.
 */
export async function getCollectionProductImages(
  handles: string[],
  imagesPerCollection: number = 6
): Promise<Record<string, string[]>> {
  const query = `
    query GetProductImages($handle: String!, $count: Int!) {
      collection(handle: $handle) {
        products(first: $count) {
          edges {
            node {
              featuredImage {
                url
              }
            }
          }
        }
      }
    }
  `;

  const result: Record<string, string[]> = {};

  // Fetch all collections in parallel
  await Promise.all(
    handles.map(async (handle) => {
      try {
        const data = await shopifyFetch(query, { handle, count: imagesPerCollection });
        const products = data?.collection?.products?.edges ?? [];
        const images = products
          .map((edge: any) => edge.node?.featuredImage?.url)
          .filter((url: string | null | undefined): url is string => !!url);
        result[handle] = images;
      } catch (error) {
        result[handle] = [];
      }
    })
  );

  return result;
}

export function formatPrice(amount: string | number, currencyCode: string = 'MXN'): string {
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;

  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(numericAmount);
}

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  vendor: string;
  productType: string;
  tags: string[];
  availableForSale: boolean;
  featuredImage: {
    url: string;
    altText: string | null;
    width: number;
    height: number;
  } | null;
  priceRange: {
    minVariantPrice: { amount: string; currencyCode: string };
    maxVariantPrice: { amount: string; currencyCode: string };
  };
  compareAtPriceRange?: {
    minVariantPrice: { amount: string; currencyCode: string };
  };
  images: {
    edges?: any[];
    nodes?: any[];
  };
  variants: {
    edges?: any[];
    nodes?: any[];
  };
  options: {
    id: string;
    name: string;
    values: string[];
  }[];
}