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
  const [showSelectedMobile, setShowSelectedMobile] = useState(false)
  
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
      setShowSelectedMobile(false)
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
    setShowSelectedMobile(false)
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
        <DialogContent className="sm:max-w-5xl p-0 gap-0 overflow-hidden h-full sm:h-auto max-h-[100vh] sm:max-h-[90vh] w-full sm:w-auto rounded-none sm:rounded-2xl flex flex-col">
          {/* Header */}
          <div className="px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4 border-b border-border bg-gradient-to-b from-primary/5 to-transparent shrink-0">
            <DialogHeader>
              <div className="flex items-center gap-2 sm:gap-3 mb-1">
                <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-primary/10 shrink-0">
                  <Package className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <DialogTitle className="text-lg sm:text-xl">Product Catalog</DialogTitle>
              </div>
              <DialogDescription className="text-muted-foreground text-xs sm:text-sm">
                Search by CAS number or product name to find exactly what you need.
              </DialogDescription>
            </DialogHeader>

            {/* Search Type Tabs */}
            <div className="mt-3 sm:mt-4 flex items-center gap-1.5 sm:gap-2 p-1 bg-muted/50 rounded-lg w-full sm:w-fit">
              <button
                onClick={() => setSearchType('name')}
                className={`
                  flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-all flex-1 sm:flex-initial min-h-[44px] touch-manipulation
                  ${searchType === 'name' 
                    ? 'bg-background text-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground'
                  }
                `}
              >
                <Type className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden xs:inline">Product Name</span>
                <span className="xs:hidden">Name</span>
              </button>
              <button
                onClick={() => setSearchType('cas')}
                className={`
                  flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-all flex-1 sm:flex-initial min-h-[44px] touch-manipulation
                  ${searchType === 'cas' 
                    ? 'bg-background text-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground'
                  }
                `}
              >
                <Hash className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden xs:inline">CAS Number</span>
                <span className="xs:hidden">CAS</span>
              </button>
            </div>

            {/* Search Bar */}
            <div className="mt-2 sm:mt-3 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                ref={searchInputRef}
                placeholder={searchType === 'cas' 
                  ? "Enter CAS number..." 
                  : "Search by product name..."
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10 h-11 sm:h-11 bg-background/80 border-border/50 focus:border-primary/50 font-mono text-sm sm:text-base"
                style={{ fontFamily: searchType === 'cas' ? 'var(--font-jetbrains), monospace' : 'inherit' }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-muted transition-colors touch-manipulation min-w-[32px] min-h-[32px] flex items-center justify-center"
                >
                  <X className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              )}
            </div>

            {/* Category Filters */}
            <div className="mt-2 sm:mt-3">
              <div className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground mb-2">
                <Filter className="w-3.5 h-3.5" />
                <span>Filter:</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {(['api', 'intermediate', 'chemical', 'impurity'] as Category[]).map((category) => {
                  const info = categoryInfo[category]
                  const isActive = selectedCategories.includes(category)
                  return (
                    <button
                      key={category}
                      onClick={() => toggleCategory(category)}
                      className={`
                        inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium transition-all duration-200 touch-manipulation min-h-[40px]
                        ${
                          isActive
                            ? 'bg-primary text-primary-foreground shadow-sm'
                            : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
                        }
                      `}
                    >
                      {categoryIcons[category]}
                      <span>{info.label}</span>
                      {isActive && <Check className="w-3 h-3" />}
                    </button>
                  )
                })}
                {selectedCategories.length > 0 && (
                  <button
                    onClick={() => setSelectedCategories([])}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-2 touch-manipulation min-h-[40px]"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="flex flex-col md:flex-row h-[calc(100vh-200px)] sm:h-[50vh] min-h-[300px] sm:min-h-[400px] relative">
            {/* Product List */}
            <div className="flex-1 border-r-0 md:border-r border-border overflow-hidden flex flex-col pb-24 md:pb-0">
              <div className="px-3 sm:px-4 py-2 bg-muted/30 border-b border-border flex items-center justify-between shrink-0 gap-2">
                <span className="text-xs text-muted-foreground flex-shrink-0">
                  {hasSearched ? (
                    <>
                      {totalCount} result{totalCount !== 1 ? 's' : ''}
                      {products.length < totalCount && ` • ${products.length}`}
                    </>
                  ) : (
                    <span className="hidden sm:inline">Enter a search term or select a category</span>
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
                    className="text-xs text-primary hover:text-primary/80 transition-colors font-medium touch-manipulation px-2 py-1 whitespace-nowrap"
                  >
                    {products.every((p) =>
                      selectedProducts.some((sp) => sp.id === p.id)
                    )
                      ? 'Deselect'
                      : 'Select all'}
                  </button>
                )}
              </div>

              <ScrollArea className="flex-1" ref={scrollAreaRef}>
                <div className="p-2 sm:p-3 space-y-2">
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

            {/* Selected Products Panel - Mobile: Sticky Bottom Bar, Desktop: Sidebar */}
            <div className="md:w-72 bg-muted/20 flex flex-col border-t md:border-t-0 md:border-l border-border md:relative">
              {/* Mobile: Sticky bottom bar with button always visible */}
              <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border shadow-2xl z-10 safe-area-inset-bottom">
                {/* Mobile Selected Products Drawer */}
                {showSelectedMobile && selectedProducts.length > 0 && (
                  <div className="max-h-[40vh] overflow-y-auto border-b border-border bg-muted/30">
                    <div className="px-4 py-3 flex items-center justify-between sticky top-0 bg-muted/30 backdrop-blur-sm z-10">
                      <div className="flex items-center gap-2">
                        <ShoppingCart className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">
                          {selectedProducts.length} selected
                        </span>
                      </div>
                      <button
                        onClick={() => setShowSelectedMobile(false)}
                        className="p-1 rounded-full hover:bg-muted transition-colors touch-manipulation"
                      >
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </div>
                    <div className="p-3 space-y-2">
                      {selectedProducts.map((product) => (
                        <div
                          key={product.id}
                          className="flex items-center gap-2 p-2.5 rounded-lg bg-background border border-border/50"
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
                            className="p-1.5 rounded-full hover:bg-destructive/10 transition-all touch-manipulation min-w-[36px] min-h-[36px] flex items-center justify-center shrink-0"
                          >
                            <X className="w-4 h-4 text-destructive" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Mobile Action Bar */}
                <div className="px-4 py-3 bg-background">
                  {selectedProducts.length > 0 && !showSelectedMobile && (
                    <div className="mb-2 flex items-center justify-between">
                      <button
                        onClick={() => setShowSelectedMobile(true)}
                        className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors touch-manipulation"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span>{selectedProducts.length} selected</span>
                        <ChevronDown className="w-4 h-4 rotate-180" />
                      </button>
                      <button
                        onClick={clearSelections}
                        className="text-xs text-muted-foreground hover:text-foreground transition-colors touch-manipulation px-2 py-1"
                      >
                        Clear
                      </button>
                    </div>
                  )}
                  <Button
                    onClick={handleRequestQuote}
                    disabled={selectedProducts.length === 0}
                    className="w-full min-h-[52px] touch-manipulation text-base font-semibold shadow-lg"
                    size="lg"
                  >
                    <FileText className="w-5 h-5" />
                    Request Quote
                    {selectedProducts.length > 0 && (
                      <Badge variant="secondary" className="ml-2 text-xs">
                        {selectedProducts.length}
                      </Badge>
                    )}
                    <ArrowRight className="w-5 h-5 ml-auto" />
                  </Button>
                </div>
              </div>

              {/* Desktop: Full sidebar */}
              <div className="hidden md:flex flex-col h-full">
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
                            className="p-1 rounded-full opacity-0 group-hover:opacity-100 hover:bg-destructive/10 transition-all touch-manipulation"
                          >
                            <X className="w-3 h-3 text-destructive" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>

                {/* Desktop Action Buttons */}
                <div className="p-4 border-t border-border bg-background/50 space-y-2 shrink-0">
                  {selectedProducts.length > 0 && (
                    <button
                      onClick={clearSelections}
                      className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors text-center py-1.5 touch-manipulation"
                    >
                      Clear all selections
                    </button>
                  )}
                  <Button
                    onClick={handleRequestQuote}
                    disabled={selectedProducts.length === 0}
                    className="w-full group min-h-[44px] touch-manipulation"
                    size="sm"
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
        group relative flex items-start gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg sm:rounded-xl border cursor-pointer transition-all duration-200 touch-manipulation
        ${
          isSelected
            ? 'bg-primary/5 border-primary/40 shadow-sm'
            : 'bg-card border-border/50 hover:border-primary/20 hover:bg-muted/30'
        }
      `}
    >
      {/* Checkbox */}
      <div className="pt-0.5 shrink-0" onClick={(e) => e.stopPropagation()}>
        <ControlledCheckbox
          checked={isSelected}
          onCheckedChange={onToggle}
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-medium text-sm text-foreground leading-tight group-hover:text-primary transition-colors break-words pr-2">
            {searchType === 'name' ? highlightMatch(product.name, searchQuery) : product.name}
          </h3>
          <Badge variant={product.category as 'api' | 'impurity' | 'intermediate' | 'chemical'} className="shrink-0 text-xs">
            {categoryIcons[product.category]}
            <span className="ml-1 hidden sm:inline">{info.label}</span>
          </Badge>
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground mt-1">
          <span className={`font-mono bg-muted/50 px-1.5 py-0.5 rounded ${searchType === 'cas' ? 'ring-1 ring-primary/30' : ''}`}>
            CAS: {searchType === 'cas' ? highlightMatch(product.casNumber, searchQuery) : product.casNumber}
          </span>
        </div>
      </div>
    </div>
  )
}
