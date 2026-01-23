'use client'

import { useState, useMemo, useCallback } from 'react'
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
import { Card, CardContent } from '@/components/ui/card'
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
  Atom,
  ArrowRight,
} from 'lucide-react'
import { products, searchProducts, categoryInfo, type Product } from '@/lib/products-data'
import { RFQModal } from './rfq-modal'

type Category = 'api' | 'impurity' | 'intermediate' | 'chemical'

const categoryIcons: Record<Category, React.ReactNode> = {
  api: <FlaskConical className="w-4 h-4" />,
  impurity: <TestTubes className="w-4 h-4" />,
  intermediate: <Beaker className="w-4 h-4" />,
  chemical: <Layers className="w-4 h-4" />,
}

interface ProductSearchProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProductSearch({ open, onOpenChange }: ProductSearchProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([])
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([])
  const [rfqOpen, setRfqOpen] = useState(false)

  // Filter and search products
  const filteredProducts = useMemo(() => {
    return searchProducts(searchQuery, selectedCategories)
  }, [searchQuery, selectedCategories])

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
                Search our extensive catalog of APIs, intermediates, specialty chemicals, and impurities.
              </DialogDescription>
            </DialogHeader>

            {/* Search Bar */}
            <div className="mt-4 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by product name, CAS number, or synonym..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 bg-background/80 border-border/50 focus:border-primary/50"
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
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground mr-2">
                <Filter className="w-3.5 h-3.5" />
                <span>Filter:</span>
              </div>
              {(['api', 'impurity', 'intermediate', 'chemical'] as Category[]).map((category) => {
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
            <div className="flex-1 border-r border-border overflow-hidden">
              <div className="px-4 py-2 bg-muted/30 border-b border-border flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
                </span>
                {filteredProducts.length > 0 && (
                  <button
                    onClick={() => {
                      const allSelected = filteredProducts.every((p) =>
                        selectedProducts.some((sp) => sp.id === p.id)
                      )
                      if (allSelected) {
                        setSelectedProducts((prev) =>
                          prev.filter((p) => !filteredProducts.some((fp) => fp.id === p.id))
                        )
                      } else {
                        setSelectedProducts((prev) => {
                          const newProducts = filteredProducts.filter(
                            (fp) => !prev.some((p) => p.id === fp.id)
                          )
                          return [...prev, ...newProducts]
                        })
                      }
                    }}
                    className="text-xs text-primary hover:text-primary/80 transition-colors font-medium"
                  >
                    {filteredProducts.every((p) =>
                      selectedProducts.some((sp) => sp.id === p.id)
                    )
                      ? 'Deselect all'
                      : 'Select all'}
                  </button>
                )}
              </div>

              <ScrollArea className="h-[calc(100%-36px)]">
                <div className="p-3 space-y-2">
                  {filteredProducts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="p-4 rounded-full bg-muted/50 mb-4">
                        <Search className="w-8 h-8 text-muted-foreground/50" />
                      </div>
                      <p className="text-muted-foreground font-medium">No products found</p>
                      <p className="text-sm text-muted-foreground/70 mt-1">
                        Try adjusting your search or filters
                      </p>
                    </div>
                  ) : (
                    filteredProducts.map((product, index) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        isSelected={isProductSelected(product)}
                        onToggle={() => toggleProductSelection(product)}
                        delay={index * 30}
                      />
                    ))
                  )}
                </div>
              </ScrollArea>
            </div>

            {/* Selected Products Panel */}
            <div className="w-full md:w-72 bg-muted/20 flex flex-col">
              <div className="px-4 py-3 bg-muted/30 border-b border-border">
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
                          <p className="text-sm font-medium text-foreground truncate">
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
              <div className="p-4 border-t border-border bg-background/50 space-y-2">
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
  delay?: number
}

function ProductCard({ product, isSelected, onToggle, delay = 0 }: ProductCardProps) {
  const info = categoryInfo[product.category]

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
      style={{
        animationDelay: `${delay}ms`,
      }}
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
            {product.name}
          </h3>
          <Badge variant={product.category as 'api' | 'impurity' | 'intermediate' | 'chemical'} className="shrink-0">
            {categoryIcons[product.category]}
            <span className="ml-1">{info.label}</span>
          </Badge>
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <span className="font-mono bg-muted/50 px-1.5 py-0.5 rounded">
            CAS: {product.casNumber}
          </span>
          {product.purity && (
            <span className="flex items-center gap-1">
              <Atom className="w-3 h-3" />
              {product.purity}
            </span>
          )}
          {product.therapeuticArea && (
            <span className="text-accent">{product.therapeuticArea}</span>
          )}
        </div>

        {/* Molecular info on hover/selection */}
        <div
          className={`
            overflow-hidden transition-all duration-200
            ${isSelected ? 'max-h-20 mt-2 opacity-100' : 'max-h-0 opacity-0'}
          `}
        >
          <div className="text-xs text-muted-foreground pt-2 border-t border-border/50 space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground/70">Formula:</span>
              <span className="font-mono">{product.molecularFormula}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground/70">MW:</span>
              <span>{product.molecularWeight.toFixed(2)} g/mol</span>
            </div>
            {!product.inStock && (
              <span className="inline-flex items-center text-amber-600 text-xs">
                Made to order
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

