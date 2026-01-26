'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ControlledCheckbox } from '@/components/ui/checkbox'
import {
  Search,
  FlaskConical,
  Beaker,
  TestTubes,
  Layers,
  X,
  ShoppingCart,
  FileText,
  Check,
  Sparkles,
  Filter,
  Package,
  ArrowRight,
  Loader2,
  Hash,
  Type,
  ChevronDown,
  AlertCircle,
} from 'lucide-react'
import { searchProductsPaginated, categoryInfo, type Product, type SearchType } from '@/lib/products-data'
import { RFQModal } from './rfq-modal'

type Category = 'api' | 'impurity' | 'intermediate' | 'chemical'

const categoryIcons: Record<Category, React.ReactNode> = {
  api: <FlaskConical className="w-4 h-4" />,
  impurity: <TestTubes className="w-4 h-4" />,
  intermediate: <Beaker className="w-4 h-4" />,
  chemical: <Layers className="w-4 h-4" />,
}

const PAGE_SIZE = 20

interface ProductSearchProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProductSearch({ open, onOpenChange }: ProductSearchProps) {
  // Search state
  const [searchQuery, setSearchQuery] = useState('')
  const [searchType, setSearchType] = useState<SearchType>('name')
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([])
  
  // Results state
  const [products, setProducts] = useState<Product[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [hasMore, setHasMore] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  
  // Selection state
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([])
  const [rfqOpen, setRfqOpen] = useState(false)
  
  // Refs
  const searchInputRef = useRef<HTMLInputElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const debounceRef = useRef<NodeJS.Timeout | null>(null)

  // Reset when dialog opens
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        searchInputRef.current?.focus()
      }, 100)
    } else {
      // Reset state when closing
      setSearchQuery('')
      setProducts([])
      setTotalCount(0)
      setHasMore(false)
      setCurrentPage(1)
      setHasSearched(false)
    }
  }, [open])

  // Perform search
  const performSearch = useCallback(async (query: string, type: SearchType, categories: Category[], page: number, append: boolean = false) => {
    // Don't search if no query and no category filter
    if (!query.trim() && categories.length === 0) {
      setProducts([])
      setTotalCount(0)
      setHasMore(false)
      setHasSearched(false)
      return
    }

    if (append) {
      setIsLoadingMore(true)
    } else {
      setIsLoading(true)
    }

    try {
      const response = await searchProductsPaginated({
        query,
        searchType: type,
        categories,
        page,
        pageSize: PAGE_SIZE,
      })

      if (append) {
        setProducts(prev => [...prev, ...response.products])
      } else {
        setProducts(response.products)
      }
      
      setTotalCount(response.total)
      setHasMore(response.hasMore)
      setCurrentPage(page)
      setHasSearched(true)
    } catch (error) {
      console.error('Search failed:', error)
    } finally {
      setIsLoading(false)
      setIsLoadingMore(false)
    }
  }, [])

  // Debounced search on query change
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    debounceRef.current = setTimeout(() => {
      performSearch(searchQuery, searchType, selectedCategories, 1, false)
    }, 300)

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }
  }, [searchQuery, searchType, selectedCategories, performSearch])

  // Load more handler
  const handleLoadMore = useCallback(() => {
    if (!isLoadingMore && hasMore) {
      performSearch(searchQuery, searchType, selectedCategories, currentPage + 1, true)
    }
  }, [isLoadingMore, hasMore, searchQuery, searchType, selectedCategories, currentPage, performSearch])

  // Toggle category filter
  const toggleCategory = useCallback((category: Category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    )
  }, [])

  // Toggle product selection
  const toggleProductSelection = useCallback((product: Product) => {
    setSelectedProducts((prev) =>
      prev.some((p) => p.id === product.id)
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product]
    )
  }, [])

  // Check if product is selected
  const isProductSelected = useCallback(
    (product: Product) => selectedProducts.some((p) => p.id === product.id),
    [selectedProducts]
  )

  // Clear all selections
  const clearSelections = useCallback(() => {
    setSelectedProducts([])
  }, [])

  // Open RFQ modal
  const handleRequestQuote = useCallback(() => {
    if (selectedProducts.length > 0) {
      setRfqOpen(true)
    }
  }, [selectedProducts])

  // Handle successful RFQ submission
  const handleRfqSuccess = useCallback(() => {
    setSelectedProducts([])
    setRfqOpen(false)
    onOpenChange(false)
  }, [onOpenChange])

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-5xl p-0 gap-0 overflow-hidden">
          {/* Header */}
          <div className="px-6 pt-6 pb-4 border-b border-border bg-gradient-to-b from-primary/5 to-transparent">
            <DialogHeader>
              <div className="flex items-center gap-3 mb-1">
                <div className="p-2 rounded-xl bg-primary/10">
                  <Package className="w-5 h-5 text-primary" />
                </div>
                <DialogTitle className="text-xl">Product Catalog</DialogTitle>
              </div>
              <DialogDescription className="text-muted-foreground">
                Search by CAS number or product name to find exactly what you need.
              </DialogDescription>
            </DialogHeader>

            {/* Search Type Tabs */}
            <div className="mt-4 flex items-center gap-2 p-1 bg-muted/50 rounded-lg w-fit">
              <button
                onClick={() => setSearchType('name')}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all
                  ${searchType === 'name' 
                    ? 'bg-background text-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground'
                  }
                `}
              >
                <Type className="w-4 h-4" />
                Product Name
              </button>
              <button
                onClick={() => setSearchType('cas')}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all
                  ${searchType === 'cas' 
                    ? 'bg-background text-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground'
                  }
                `}
              >
                <Hash className="w-4 h-4" />
                CAS Number
              </button>
            </div>

            {/* Search Bar */}
            <div className="mt-3 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                ref={searchInputRef}
                placeholder={searchType === 'cas' 
                  ? "Enter CAS number (e.g., 1115-70-4)..." 
                  : "Search by product name or synonym..."
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 bg-background/80 border-border/50 focus:border-primary/50 font-mono"
                style={{ fontFamily: searchType === 'cas' ? 'var(--font-jetbrains), monospace' : 'inherit' }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted transition-colors"
                >
                  <X className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              )}
            </div>

            {/* Category Filters */}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground mr-2">
                <Filter className="w-3.5 h-3.5" />
                <span>Filter:</span>
              </div>
              {(['api', 'intermediate', 'chemical', 'impurity'] as Category[]).map((category) => {
                const info = categoryInfo[category]
                const isActive = selectedCategories.includes(category)
                return (
                  <button
                    key={category}
                    onClick={() => toggleCategory(category)}
                    className={`
                      inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200
                      ${
                        isActive
                          ? 'bg-primary text-primary-foreground shadow-sm'
                          : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
                      }
                    `}
                  >
                    {categoryIcons[category]}
                    {info.label}
                    {isActive && <Check className="w-3 h-3" />}
                  </button>
                )
              })}
              {selectedCategories.length > 0 && (
                <button
                  onClick={() => setSelectedCategories([])}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors ml-1"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>

          {/* Results */}
          <div className="flex flex-col md:flex-row h-[50vh] min-h-[400px]">
            {/* Product List */}
            <div className="flex-1 border-r border-border overflow-hidden flex flex-col">
              <div className="px-4 py-2 bg-muted/30 border-b border-border flex items-center justify-between shrink-0">
                <span className="text-xs text-muted-foreground">
                  {hasSearched ? (
                    <>
                      {totalCount} result{totalCount !== 1 ? 's' : ''} found
                      {products.length < totalCount && ` • Showing ${products.length}`}
                    </>
                  ) : (
                    'Enter a search term or select a category'
                  )}
                </span>
                {products.length > 0 && (
                  <button
                    onClick={() => {
                      const allSelected = products.every((p) =>
                        selectedProducts.some((sp) => sp.id === p.id)
                      )
                      if (allSelected) {
                        setSelectedProducts((prev) =>
                          prev.filter((p) => !products.some((fp) => fp.id === p.id))
                        )
                      } else {
                        setSelectedProducts((prev) => {
                          const newProducts = products.filter(
                            (fp) => !prev.some((p) => p.id === fp.id)
                          )
                          return [...prev, ...newProducts]
                        })
                      }
                    }}
                    className="text-xs text-primary hover:text-primary/80 transition-colors font-medium"
                  >
                    {products.every((p) =>
                      selectedProducts.some((sp) => sp.id === p.id)
                    )
                      ? 'Deselect visible'
                      : 'Select visible'}
                  </button>
                )}
              </div>

              <ScrollArea className="flex-1" ref={scrollAreaRef}>
                <div className="p-3 space-y-2">
                  {/* Loading state */}
                  {isLoading && (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />
                      <p className="text-muted-foreground font-medium">Searching products...</p>
                    </div>
                  )}

                  {/* Empty state - No search */}
                  {!isLoading && !hasSearched && (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="p-4 rounded-full bg-muted/50 mb-4">
                        <Search className="w-8 h-8 text-muted-foreground/50" />
                      </div>
                      <p className="text-muted-foreground font-medium">Start your search</p>
                      <p className="text-sm text-muted-foreground/70 mt-1 max-w-xs">
                        Enter a {searchType === 'cas' ? 'CAS number' : 'product name'} or select a category to browse products
                      </p>
                    </div>
                  )}

                  {/* Empty state - No results */}
                  {!isLoading && hasSearched && products.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="p-4 rounded-full bg-muted/50 mb-4">
                        <AlertCircle className="w-8 h-8 text-muted-foreground/50" />
                      </div>
                      <p className="text-muted-foreground font-medium">No products found</p>
                      <p className="text-sm text-muted-foreground/70 mt-1">
                        Try adjusting your search or filters
                      </p>
                    </div>
                  )}

                  {/* Product list */}
                  {!isLoading && products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isSelected={isProductSelected(product)}
                      onToggle={() => toggleProductSelection(product)}
                      searchType={searchType}
                      searchQuery={searchQuery}
                    />
                  ))}

                  {/* Load more button */}
                  {!isLoading && hasMore && (
                    <div className="pt-2 pb-4">
                      <Button
                        variant="outline"
                        onClick={handleLoadMore}
                        disabled={isLoadingMore}
                        className="w-full"
                      >
                        {isLoadingMore ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Loading more...
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-4 h-4" />
                            Load more ({totalCount - products.length} remaining)
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>

            {/* Selected Products Panel */}
            <div className="w-full md:w-72 bg-muted/20 flex flex-col">
              <div className="px-4 py-3 bg-muted/30 border-b border-border shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4 text-primary" />
                    <span className="font-medium text-sm">Selected</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {selectedProducts.length}
                  </Badge>
                </div>
              </div>

              <ScrollArea className="flex-1">
                {selectedProducts.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                    <div className="p-3 rounded-full bg-muted/50 mb-3">
                      <Sparkles className="w-6 h-6 text-muted-foreground/50" />
                    </div>
                    <p className="text-sm text-muted-foreground">No products selected</p>
                    <p className="text-xs text-muted-foreground/70 mt-1">
                      Select products to request a quote
                    </p>
                  </div>
                ) : (
                  <div className="p-3 space-y-2">
                    {selectedProducts.map((product) => (
                      <div
                        key={product.id}
                        className="group relative flex items-start gap-2 p-2.5 rounded-lg bg-background border border-border/50 hover:border-primary/30 transition-all"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground break-words">
                            {product.name}
                          </p>
                          <p className="text-xs text-muted-foreground font-mono">
                            {product.casNumber}
                          </p>
                        </div>
                        <button
                          onClick={() => toggleProductSelection(product)}
                          className="p-1 rounded-full opacity-0 group-hover:opacity-100 hover:bg-destructive/10 transition-all"
                        >
                          <X className="w-3 h-3 text-destructive" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>

              {/* Action Buttons */}
              <div className="p-4 border-t border-border bg-background/50 space-y-2 shrink-0">
                {selectedProducts.length > 0 && (
                  <button
                    onClick={clearSelections}
                    className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors text-center py-1"
                  >
                    Clear all selections
                  </button>
                )}
                <Button
                  onClick={handleRequestQuote}
                  disabled={selectedProducts.length === 0}
                  className="w-full group"
                >
                  <FileText className="w-4 h-4" />
                  Request Quote
                  {selectedProducts.length > 0 && (
                    <span className="ml-1 opacity-70">({selectedProducts.length})</span>
                  )}
                  <ArrowRight className="w-4 h-4 ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* RFQ Modal */}
      <RFQModal
        open={rfqOpen}
        onOpenChange={setRfqOpen}
        selectedProducts={selectedProducts}
        onSuccess={handleRfqSuccess}
      />
    </>
  )
}

// Individual Product Card Component
interface ProductCardProps {
  product: Product
  isSelected: boolean
  onToggle: () => void
  searchType: SearchType
  searchQuery: string
}

function ProductCard({ product, isSelected, onToggle, searchType, searchQuery }: ProductCardProps) {
  const info = categoryInfo[product.category]

  // Highlight matching text
  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
    const parts = text.split(regex)
    return parts.map((part, i) => 
      regex.test(part) ? (
        <mark key={i} className="bg-accent/30 text-accent-foreground rounded px-0.5">
          {part}
        </mark>
      ) : part
    )
  }

  return (
    <div
      onClick={onToggle}
      className={`
        group relative flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-200
        ${
          isSelected
            ? 'bg-primary/5 border-primary/40 shadow-sm'
            : 'bg-card border-border/50 hover:border-primary/20 hover:bg-muted/30'
        }
      `}
    >
      {/* Checkbox */}
      <div className="pt-0.5" onClick={(e) => e.stopPropagation()}>
        <ControlledCheckbox
          checked={isSelected}
          onCheckedChange={onToggle}
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-medium text-sm text-foreground leading-tight group-hover:text-primary transition-colors">
            {searchType === 'name' ? highlightMatch(product.name, searchQuery) : product.name}
          </h3>
          <Badge variant={product.category as 'api' | 'impurity' | 'intermediate' | 'chemical'} className="shrink-0">
            {categoryIcons[product.category]}
            <span className="ml-1">{info.label}</span>
          </Badge>
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <span className={`font-mono bg-muted/50 px-1.5 py-0.5 rounded ${searchType === 'cas' ? 'ring-1 ring-primary/30' : ''}`}>
            CAS: {searchType === 'cas' ? highlightMatch(product.casNumber, searchQuery) : product.casNumber}
          </span>
        </div>
      </div>
    </div>
  )
}
