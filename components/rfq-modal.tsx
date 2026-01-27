'use client'

import { useState } from 'react'
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
import { Card, CardContent } from '@/components/ui/card'
import {
  FileText,
  Send,
  CheckCircle,
  Building2,
  User,
  Mail,
  Phone,
  MapPin,
  Package,
  ArrowRight,
  Sparkles,
  FlaskConical,
  Beaker,
  TestTubes,
  Layers,
  Loader2,
  AlertCircle,
} from 'lucide-react'
import type { Product } from '@/lib/products-data'
import { categoryInfo } from '@/lib/products-data'
import { quantitySchema, rfqContactFormSchema } from '@/lib/validation'
import { countries } from '@/lib/countries'

type Category = 'api' | 'impurity' | 'intermediate' | 'chemical'

const categoryIcons: Record<Category, React.ReactNode> = {
  api: <FlaskConical className="w-3 h-3" />,
  impurity: <TestTubes className="w-3 h-3" />,
  intermediate: <Beaker className="w-3 h-3" />,
  chemical: <Layers className="w-3 h-3" />,
}

interface RFQModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedProducts: Product[]
  onSuccess: () => void
}

interface ProductQuantity {
  productId: string
  quantity: string
  unit: string
}

export function RFQModal({ open, onOpenChange, selectedProducts, onSuccess }: RFQModalProps) {
  const [step, setStep] = useState<'products' | 'contact' | 'success'>('products')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [quantities, setQuantities] = useState<ProductQuantity[]>(
    selectedProducts.map((p) => ({ productId: p.id, quantity: '', unit: 'kg' }))
  )
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    country: '',
    countryCode: '',
    city: '',
    message: '',
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [quantityErrors, setQuantityErrors] = useState<Record<string, string>>({})

  // Update quantities when products change
  if (quantities.length !== selectedProducts.length) {
    setQuantities(selectedProducts.map((p) => ({ productId: p.id, quantity: '', unit: 'kg' })))
  }

  const updateQuantity = (productId: string, field: 'quantity' | 'unit', value: string) => {
    setQuantities((prev) =>
      prev.map((q) => (q.productId === productId ? { ...q, [field]: value } : q))
    )
    
    // Clear error for this quantity when user starts typing
    if (field === 'quantity' && quantityErrors[productId]) {
      setQuantityErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[productId]
        return newErrors
      })
    }
  }
  
  const validateQuantities = (): boolean => {
    const errors: Record<string, string> = {}
    
    selectedProducts.forEach((product) => {
      const qty = quantities.find((q) => q.productId === product.id)
      if (!qty || !qty.quantity) {
        errors[product.id] = 'Quantity is required for this product'
      } else {
        const result = quantitySchema.safeParse(qty.quantity)
        if (!result.success) {
          errors[product.id] = result.error.issues[0]?.message || 'Invalid quantity'
        }
      }
    })
    
    setQuantityErrors(errors)
    return Object.keys(errors).length === 0
  }
  
  const validateContactForm = (): boolean => {
    const result = rfqContactFormSchema.safeParse(formData)
    
    if (!result.success) {
      const errors: Record<string, string> = {}
      result.error.issues.forEach((err) => {
        if (err.path.length > 0) {
          const field = err.path[0] as string
          errors[field] = err.message
        }
      })
      setFormErrors(errors)
      return false
    }
    
    setFormErrors({})
    return true
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountry = countries.find((c) => c.name === e.target.value)
    setFormData((prev) => ({
      ...prev,
      country: e.target.value,
      countryCode: selectedCountry?.code || '',
    }))
    
    // Clear error for country when user selects
    if (formErrors.country) {
      setFormErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors.country
        return newErrors
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate contact form before submission
    if (!validateContactForm()) {
      return
    }
    
    setIsSubmitting(true)

    try {
      // Prepare products with quantities
      const productsWithQuantities = selectedProducts.map((p) => {
        const qty = quantities.find((q) => q.productId === p.id)
        return {
          ...p,
          quantity: qty?.quantity || '',
          unit: qty?.unit || '',
        }
      })

      // Call RFQ API
      const response = await fetch('/api/rfq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          products: productsWithQuantities,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        // If there are validation errors from server, try to map them to form fields
        if (data.details && typeof data.details === 'string') {
          // Check if it's about missing fields
          if (data.details.includes('required')) {
            const fieldMap: Record<string, string> = {}
            const missingFields = data.details.match(/name|email|company|phone|country/g)
            if (missingFields) {
              missingFields.forEach((field: string) => {
                fieldMap[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`
              })
              setFormErrors(fieldMap)
            }
          }
        }
        throw new Error(data.error || data.details || 'Failed to submit RFQ')
      }

      // Success
      setStep('success')
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Failed to submit RFQ. Please try again later.'
      alert(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetAndClose = () => {
    setStep('products')
    setFormData({
      name: '',
      email: '',
      company: '',
      phone: '',
      country: '',
      countryCode: '',
      city: '',
      message: '',
    })
    setFormErrors({})
    setQuantityErrors({})
    onOpenChange(false)
  }

  const handleSuccessClose = () => {
    resetAndClose()
    onSuccess()
  }

  return (
    <Dialog open={open} onOpenChange={resetAndClose}>
      <DialogContent className="sm:max-w-2xl p-0 gap-0 overflow-hidden h-full sm:h-auto max-h-[100vh] sm:max-h-[90vh] w-full sm:w-auto rounded-none sm:rounded-2xl flex flex-col">
        {/* Header */}
        <div className="px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4 border-b border-border bg-gradient-to-b from-accent/5 to-transparent shrink-0">
          <DialogHeader>
            <div className="flex items-center gap-2 sm:gap-3 mb-1">
              <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-accent/10 shrink-0">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
              </div>
              <DialogTitle className="text-lg sm:text-xl">Request for Quote</DialogTitle>
            </div>
            <DialogDescription className="text-muted-foreground text-xs sm:text-sm">
              {step === 'products' && 'Specify quantities for each product you need.'}
              {step === 'contact' && 'Provide your contact details to receive the quote.'}
              {step === 'success' && 'Your request has been submitted successfully!'}
            </DialogDescription>
          </DialogHeader>

          {/* Progress Steps */}
          {step !== 'success' && (
            <div className="flex items-center gap-1.5 sm:gap-2 mt-3 sm:mt-4">
              <div
                className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-medium transition-all touch-manipulation ${
                  step === 'products'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-primary/10 text-primary'
                }`}
              >
                <Package className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                Products
              </div>
              <div className="w-6 sm:w-8 h-px bg-border" />
              <div
                className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-medium transition-all touch-manipulation ${
                  step === 'contact'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                <User className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                Contact
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        {step === 'products' && (
          <div className="flex flex-col flex-1 min-h-0">
            <ScrollArea className="flex-1">
              <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
                {selectedProducts.map((product) => {
                  const quantity = quantities.find((q) => q.productId === product.id)
                  const info = categoryInfo[product.category]
                  return (
                    <Card key={product.id} className="border-border/50 bg-card overflow-hidden">
                      <CardContent className="p-3 sm:p-4">
                        <div className="flex flex-col gap-3">
                          {/* Product Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start gap-2 mb-1.5">
                              <h4 className="font-medium text-sm text-foreground break-words flex-1 min-w-0 pr-2">
                                {product.name}
                              </h4>
                              <Badge
                                variant={product.category as 'api' | 'impurity' | 'intermediate' | 'chemical'}
                                className="shrink-0 text-[10px] mt-0.5"
                              >
                                {categoryIcons[product.category]}
                                <span className="ml-1 hidden sm:inline">{info.label}</span>
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground font-mono">
                              CAS: {product.casNumber}
                            </p>
                          </div>

                          {/* Quantity Input */}
                          <div className="flex flex-col gap-1.5">
                            <div className="flex items-center gap-2">
                              <div className="relative flex-1">
                                <label className="text-xs text-muted-foreground mb-1 block">Quantity</label>
                                <Input
                                  type="number"
                                  min="0"
                                  step="0.1"
                                  placeholder="Enter quantity"
                                  value={quantity?.quantity || ''}
                                  onChange={(e) =>
                                    updateQuantity(product.id, 'quantity', e.target.value)
                                  }
                                  className={`w-full h-11 text-sm touch-manipulation ${quantityErrors[product.id] ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                                />
                              </div>
                              <div className="relative shrink-0">
                                <label className="text-xs text-muted-foreground mb-1 block">Unit</label>
                                <select
                                  value={quantity?.unit || 'kg'}
                                  onChange={(e) => updateQuantity(product.id, 'unit', e.target.value)}
                                  className="h-11 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring touch-manipulation min-w-[80px]"
                                >
                                  <option value="mg">mg</option>
                                  <option value="g">g</option>
                                  <option value="kg">kg</option>
                                  <option value="mt">MT</option>
                                </select>
                              </div>
                            </div>
                            {quantityErrors[product.id] && (
                              <p className="text-xs text-destructive flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                {quantityErrors[product.id]}
                              </p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </ScrollArea>

            {/* Footer - Sticky on mobile */}
            <div className="p-3 sm:p-4 border-t border-border bg-background/95 backdrop-blur-sm md:bg-muted/30 flex items-center justify-between shrink-0 sticky bottom-0 md:relative z-10 shadow-lg md:shadow-none">
              <p className="text-xs sm:text-sm text-muted-foreground">
                {selectedProducts.length} product{selectedProducts.length !== 1 ? 's' : ''}
              </p>
              <Button 
                onClick={() => {
                  if (validateQuantities()) {
                    setStep('contact')
                  }
                }} 
                className="group min-h-[44px] touch-manipulation"
                size="lg"
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </div>
          </div>
        )}

        {step === 'contact' && (
          <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
            <ScrollArea className="flex-1">
              <div className="p-4 sm:p-6 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="rfq-name" className="text-sm font-medium text-foreground flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-muted-foreground" />
                      Full Name*
                    </label>
                    <Input
                      id="rfq-name"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      placeholder="Your name"
                      required
                      className={`h-11 touch-manipulation ${formErrors.name ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                    />
                    {formErrors.name && (
                      <p className="text-xs text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {formErrors.name}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="rfq-email" className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                      Work Email*
                    </label>
                    <Input
                      id="rfq-email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      placeholder="you@company.com"
                      required
                      className={`h-11 touch-manipulation ${formErrors.email ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                    />
                    {formErrors.email && (
                      <p className="text-xs text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {formErrors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="rfq-company" className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Building2 className="w-3.5 h-3.5 text-muted-foreground" />
                      Company Name*
                    </label>
                    <Input
                      id="rfq-company"
                      name="company"
                      value={formData.company}
                      onChange={handleFormChange}
                      placeholder="Company name"
                      required
                      className={`h-11 touch-manipulation ${formErrors.company ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                    />
                    {formErrors.company && (
                      <p className="text-xs text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {formErrors.company}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="rfq-country" className="text-sm font-medium text-foreground flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                      Country*
                    </label>
                    <select
                      id="rfq-country"
                      name="country"
                      value={formData.country}
                      onChange={handleCountryChange}
                      required
                      className={`flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 touch-manipulation ${
                        formErrors.country ? 'border-destructive focus-visible:ring-destructive' : ''
                      }`}
                    >
                      <option value="">Select a country</option>
                      {countries.map((country) => (
                        <option key={country.name} value={country.name}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                    {formErrors.country && (
                      <p className="text-xs text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {formErrors.country}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="rfq-phone" className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-muted-foreground" />
                      Phone Number*
                    </label>
                    <div className="flex items-center gap-2">
                      {formData.countryCode && (
                        <div className="flex items-center h-11 px-3 rounded-md border border-input bg-muted text-sm text-muted-foreground shrink-0">
                          {formData.countryCode}
                        </div>
                      )}
                      <Input
                        id="rfq-phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleFormChange}
                        placeholder={formData.countryCode ? "1234567890" : "Select country first"}
                        required
                        disabled={!formData.countryCode}
                        className={`flex-1 h-11 touch-manipulation ${formErrors.phone ? 'border-destructive focus-visible:ring-destructive' : ''} ${!formData.countryCode ? 'cursor-not-allowed opacity-60' : ''}`}
                      />
                    </div>
                    {!formData.countryCode && !formErrors.phone && (
                      <p className="text-xs text-muted-foreground">
                        Please select a country above to enter your phone number
                      </p>
                    )}
                    {formErrors.phone && (
                      <p className="text-xs text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {formErrors.phone}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="rfq-city" className="text-sm font-medium text-foreground flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                      City*
                    </label>
                    <Input
                      id="rfq-city"
                      name="city"
                      value={formData.city}
                      onChange={handleFormChange}
                      placeholder="City"
                      required
                      className={`h-11 touch-manipulation ${formErrors.city ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                    />
                    {formErrors.city && (
                      <p className="text-xs text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {formErrors.city}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="rfq-message" className="text-sm font-medium text-foreground">
                    Additional Requirements
                  </label>
                  <textarea
                    id="rfq-message"
                    name="message"
                    value={formData.message}
                    onChange={handleFormChange}
                    rows={4}
                    placeholder="Any specific requirements, delivery timeline, quality specifications..."
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none touch-manipulation min-h-[100px]"
                  />
                </div>

                {/* Summary */}
                <Card className="border-border/50 bg-muted/30">
                  <CardContent className="p-3 sm:p-4">
                    <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                      <Package className="w-4 h-4 text-primary" />
                      RFQ Summary
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProducts.map((product) => {
                        const qty = quantities.find((q) => q.productId === product.id)
                        return (
                          <Badge key={product.id} variant="outline" className="text-xs break-words">
                            <span className="line-clamp-1">{product.name}</span>
                            {qty?.quantity && (
                              <span className="ml-1 opacity-70 whitespace-nowrap">
                                ({qty.quantity} {qty.unit})
                              </span>
                            )}
                          </Badge>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ScrollArea>

            {/* Footer - Sticky on mobile */}
            <div className="p-3 sm:p-4 border-t border-border bg-background/95 backdrop-blur-sm md:bg-muted/30 flex items-center justify-between shrink-0 sticky bottom-0 md:relative z-10 shadow-lg md:shadow-none">
              <Button 
                type="button" 
                variant="ghost" 
                onClick={() => setStep('products')}
                className="touch-manipulation min-h-[44px]"
              >
                Back
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting} 
                className="group min-w-32 min-h-[44px] touch-manipulation"
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit RFQ
                  </>
                )}
              </Button>
            </div>
          </form>
        )}

        {step === 'success' && (
          <div className="p-6 sm:p-8 flex flex-col items-center justify-center text-center min-h-[300px]">
            {/* Success Animation */}
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-accent/20 rounded-full animate-ping" />
              <div className="relative p-5 rounded-full bg-gradient-to-br from-accent/20 to-primary/20">
                <CheckCircle className="w-12 h-12 text-accent" />
              </div>
            </div>

            <h3 className="text-xl font-semibold text-foreground mb-2">
              Quote Request Submitted!
            </h3>
            <p className="text-muted-foreground max-w-sm mb-6">
              Thank you for your interest. Our team will review your request and get back to you
              within 24-48 hours.
            </p>

            {/* Submitted Products Summary */}
            <Card className="w-full max-w-md border-border/50 bg-muted/30 mb-6">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-foreground">Products Requested</span>
                  <Badge variant="secondary">{selectedProducts.length}</Badge>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProducts.slice(0, 5).map((product) => (
                    <Badge key={product.id} variant="outline" className="text-xs">
                      {product.name}
                    </Badge>
                  ))}
                  {selectedProducts.length > 5 && (
                    <Badge variant="outline" className="text-xs">
                      +{selectedProducts.length - 5} more
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              <Button 
                variant="outline" 
                onClick={handleSuccessClose}
                className="w-full sm:w-auto min-h-[44px] touch-manipulation"
              >
                Close
              </Button>
              <Button 
                onClick={handleSuccessClose}
                className="w-full sm:w-auto min-h-[44px] touch-manipulation"
              >
                <Sparkles className="w-4 h-4" />
                Continue Browsing
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

