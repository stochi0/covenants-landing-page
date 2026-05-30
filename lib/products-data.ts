export interface Company {
  id: string
  name: string
  website: string | null
  contactEmail: string | null
}

export interface Region {
  id: string
  name: string
  isoCode: string | null
  country: string | null
}

export interface Facility {
  id: string
  name: string
  address: string | null
  capacityKl: number | null
  latitude: number | null
  longitude: number | null
  company: Company | null
  region: Region | null
}

export interface ProductSupplierMatch {
  facilityProductId: string
  isPrimary: boolean
  facility: Facility
}

export interface Product {
  id: string
  name: string
  casNumber: string
  category: string | null
  supplierMatches: ProductSupplierMatch[]
  supplierCount: number
  facilityCount: number
}

export interface ProductCategoryFacet {
  value: string
  count: number
}

export type SearchType = 'name' | 'cas'

export interface PaginatedResponse {
  products: Product[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}

export interface SearchParams {
  query: string
  searchType: SearchType
  categories: string[]
  page: number
  pageSize: number
}

export const categoryInfo: Record<string, { label: string; fullName: string; color: string; icon: string }> = {
  api: {
    label: 'API',
    fullName: 'Active Pharmaceutical Ingredient',
    color: 'primary',
    icon: 'FlaskConical',
  },
  impurity: {
    label: 'Impurity',
    fullName: 'Reference Standard / Impurity',
    color: 'accent',
    icon: 'TestTubes',
  },
  intermediate: {
    label: 'Intermediate',
    fullName: 'Pharmaceutical Intermediate',
    color: 'primary',
    icon: 'Beaker',
  },
  chemical: {
    label: 'Chemical',
    fullName: 'Specialty Chemical / Excipient',
    color: 'accent',
    icon: 'Layers',
  },
}

let productCategoryFacetCache: ProductCategoryFacet[] | null = null

async function apiJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  })
  const data = await response.json().catch(() => null) as unknown

  if (!response.ok) {
    const message = data && typeof data === 'object' && 'details' in data
      ? String((data as { details: unknown }).details)
      : data && typeof data === 'object' && 'error' in data
        ? String((data as { error: unknown }).error)
        : `Request failed: ${response.status}`
    throw new Error(message)
  }

  return data as T
}

export function formatProductCategoryLabel(category: string | null | undefined) {
  if (!category) return 'Uncategorized'
  const known = categoryInfo[category]
  if (known) return known.label

  return category
    .split(/[_-\s]+/)
    .filter(Boolean)
    .map((part) => (part.toLowerCase() === 'api' ? 'API' : `${part[0]?.toUpperCase() ?? ''}${part.slice(1).toLowerCase()}`))
    .join(' ')
}

export async function fetchProductCategories(): Promise<ProductCategoryFacet[]> {
  if (productCategoryFacetCache) return productCategoryFacetCache

  try {
    productCategoryFacetCache = await apiJson<ProductCategoryFacet[]>('/api/product-categories')
    return productCategoryFacetCache
  } catch (err) {
    console.error('Error fetching product categories:', err)
    return []
  }
}

export async function searchProductsPaginated(params: SearchParams): Promise<PaginatedResponse> {
  const searchParams = new URLSearchParams({
    query: params.query.trim(),
    searchType: params.searchType,
    page: params.page.toString(),
    pageSize: params.pageSize.toString(),
  })

  if (params.categories.length > 0) {
    searchParams.set('categories', params.categories.join(','))
  }

  return apiJson<PaginatedResponse>(`/api/products?${searchParams.toString()}`)
}

export async function getProductById(id: string): Promise<Product | undefined> {
  try {
    return await apiJson<Product>(`/api/products/${encodeURIComponent(id)}`)
  } catch (error) {
    console.error('Error fetching product:', error)
    return undefined
  }
}

export async function getProductsByIds(ids: string[]): Promise<Product[]> {
  if (ids.length === 0) return []

  try {
    const data = await apiJson<{ products: Product[] }>('/api/products/batch', {
      method: 'POST',
      body: JSON.stringify({ ids }),
    })
    return data.products || []
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}
