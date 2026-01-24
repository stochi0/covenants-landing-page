// Product Database Schema
export interface Product {
  id: string
  name: string
  casNumber: string
  category: 'api' | 'impurity' | 'intermediate' | 'chemical'
}

// Search types
export type SearchType = 'name' | 'cas'

// Paginated response
export interface PaginatedResponse {
  products: Product[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}

// Search params
export interface SearchParams {
  query: string
  searchType: SearchType
  categories: string[]
  page: number
  pageSize: number
}

// Products database
export const products: Product[] = [
  {
    id: 'api-001',
    name: 'Metformin Hydrochloride',
    casNumber: '1115-70-4',
    category: 'api',
  },
  {
    id: 'api-002',
    name: 'Atorvastatin Calcium',
    casNumber: '134523-03-8',
    category: 'api',
  },
  {
    id: 'api-003',
    name: 'Omeprazole',
    casNumber: '73590-58-6',
    category: 'api',
  },
  {
    id: 'api-004',
    name: 'Amlodipine Besylate',
    casNumber: '111470-99-6',
    category: 'api',
  },
  {
    id: 'api-005',
    name: 'Lisinopril Dihydrate',
    casNumber: '83915-83-7',
    category: 'api',
  },
  {
    id: 'api-006',
    name: 'Losartan Potassium',
    casNumber: '124750-99-8',
    category: 'api',
  },
  {
    id: 'api-007',
    name: 'Pantoprazole Sodium',
    casNumber: '138786-67-1',
    category: 'api',
  },
  {
    id: 'api-008',
    name: 'Rosuvastatin Calcium',
    casNumber: '147098-20-2',
    category: 'api',
  },
  {
    id: 'api-009',
    name: 'Simvastatin',
    casNumber: '79902-63-9',
    category: 'api',
  },
  {
    id: 'api-010',
    name: 'Gabapentin',
    casNumber: '60142-96-3',
    category: 'api',
  },
]

// Category display info
export const categoryInfo = {
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

// Simulated API delay
const simulateDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Paginated search function (simulates API call)
export async function searchProductsPaginated(params: SearchParams): Promise<PaginatedResponse> {
  const { query, searchType, categories, page, pageSize } = params
  const searchTerm = query.toLowerCase().trim()
  
  // Simulate network delay (200-500ms)
  await simulateDelay(200 + Math.random() * 300)
  
  // Filter products
  const filtered = products.filter((product) => {
    // Category filter
    if (categories.length > 0 && !categories.includes(product.category)) {
      return false
    }
    
    // Empty search with no category filter - require at least something
    if (!searchTerm && categories.length === 0) {
      return false
    }
    
    // Empty search with category filter - show all in category
    if (!searchTerm) {
      return true
    }
    
    // Search based on type
    if (searchType === 'cas') {
      // CAS number search - exact or partial match
      return product.casNumber.toLowerCase().includes(searchTerm)
    } else {
      // Name search
      return product.name.toLowerCase().includes(searchTerm)
    }
  })
  
  // Sort results - exact matches first, then alphabetically
  const sorted = filtered.sort((a, b) => {
    if (searchType === 'cas') {
      // Exact CAS match comes first
      const aExact = a.casNumber.toLowerCase() === searchTerm
      const bExact = b.casNumber.toLowerCase() === searchTerm
      if (aExact && !bExact) return -1
      if (!aExact && bExact) return 1
      // Then by CAS number starts with
      const aStarts = a.casNumber.toLowerCase().startsWith(searchTerm)
      const bStarts = b.casNumber.toLowerCase().startsWith(searchTerm)
      if (aStarts && !bStarts) return -1
      if (!aStarts && bStarts) return 1
    } else {
      // Exact name match comes first
      const aExact = a.name.toLowerCase() === searchTerm
      const bExact = b.name.toLowerCase() === searchTerm
      if (aExact && !bExact) return -1
      if (!aExact && bExact) return 1
      // Then by name starts with
      const aStarts = a.name.toLowerCase().startsWith(searchTerm)
      const bStarts = b.name.toLowerCase().startsWith(searchTerm)
      if (aStarts && !bStarts) return -1
      if (!aStarts && bStarts) return 1
    }
    // Finally alphabetically by name
    return a.name.localeCompare(b.name)
  })
  
  // Paginate
  const total = sorted.length
  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedProducts = sorted.slice(startIndex, endIndex)
  
  return {
    products: paginatedProducts,
    total,
    page,
    pageSize,
    hasMore: endIndex < total,
  }
}

// Get product by ID (for quick lookup)
export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id)
}

// Get products by IDs (for RFQ)
export function getProductsByIds(ids: string[]): Product[] {
  return products.filter(p => ids.includes(p.id))
}
