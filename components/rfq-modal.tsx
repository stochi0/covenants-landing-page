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
  X,
  Loader2,
} from 'lucide-react'
import type { Product } from '@/lib/products-data'
import { categoryInfo } from '@/lib/products-data'

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
    message: '',
  })

  // Update quantities when products change
  if (quantities.length !== selectedProducts.length) {
    setQuantities(selectedProducts.map((p) => ({ productId: p.id, quantity: '', unit: 'kg' })))
  }

  const updateQuantity = (productId: string, field: 'quantity' | 'unit', value: string) => {
    setQuantities((prev) =>
      prev.map((q) => (q.productId === productId ? { ...q, [field]: value } : q))
    )
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log('RFQ Submitted:', {
      products: selectedProducts.map((p) => ({
        ...p,
        ...quantities.find((q) => q.productId === p.id),
      })),
      contact: formData,
    })

    setIsSubmitting(false)
    setStep('success')
  }

  const resetAndClose = () => {
    setStep('products')
    setFormData({
      name: '',
      email: '',
      company: '',
      phone: '',
      country: '',
      message: '',
    })
    onOpenChange(false)
  }

  const handleSuccessClose = () => {
    resetAndClose()
    onSuccess()
  }

  return (
    <Dialog open={open} onOpenChange={resetAndClose}>
      <DialogContent className="sm:max-w-2xl p-0 gap-0 overflow-hidden">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-border bg-gradient-to-b from-accent/5 to-transparent">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-1">
              <div className="p-2 rounded-xl bg-accent/10">
                <FileText className="w-5 h-5 text-accent" />
              </div>
              <DialogTitle className="text-xl">Request for Quote</DialogTitle>
            </div>
            <DialogDescription className="text-muted-foreground">
              {step === 'products' && 'Specify quantities for each product you need.'}
              {step === 'contact' && 'Provide your contact details to receive the quote.'}
              {step === 'success' && 'Your request has been submitted successfully!'}
            </DialogDescription>
          </DialogHeader>

          {/* Progress Steps */}
          {step !== 'success' && (
            <div className="flex items-center gap-2 mt-4">
              <div
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  step === 'products'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-primary/10 text-primary'
                }`}
              >
                <Package className="w-3.5 h-3.5" />
                Products
              </div>
              <div className="w-8 h-px bg-border" />
              <div
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  step === 'contact'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                Contact
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        {step === 'products' && (
          <div className="flex flex-col">
            <ScrollArea className="h-[300px]">
              <div className="p-4 space-y-3">
                {selectedProducts.map((product) => {
                  const quantity = quantities.find((q) => q.productId === product.id)
                  const info = categoryInfo[product.category]
                  return (
                    <Card key={product.id} className="border-border/50 bg-card overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                          {/* Product Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium text-sm text-foreground truncate">
                                {product.name}
                              </h4>
                              <Badge
                                variant={product.category as 'api' | 'impurity' | 'intermediate' | 'chemical'}
                                className="shrink-0 text-[10px]"
                              >
                                {categoryIcons[product.category]}
                                <span className="ml-1">{info.label}</span>
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground font-mono">
                              CAS: {product.casNumber}
                            </p>
                          </div>

                          {/* Quantity Input */}
                          <div className="flex items-center gap-2 shrink-0">
                            <div className="relative">
                              <Input
                                type="number"
                                min="0"
                                step="0.1"
                                placeholder="Qty"
                                value={quantity?.quantity || ''}
                                onChange={(e) =>
                                  updateQuantity(product.id, 'quantity', e.target.value)
                                }
                                className="w-24 h-9 text-sm pr-2"
                              />
                            </div>
                            <select
                              value={quantity?.unit || 'kg'}
                              onChange={(e) => updateQuantity(product.id, 'unit', e.target.value)}
                              className="h-9 px-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                            >
                              <option value="mg">mg</option>
                              <option value="g">g</option>
                              <option value="kg">kg</option>
                              <option value="mt">MT</option>
                            </select>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </ScrollArea>

            {/* Footer */}
            <div className="p-4 border-t border-border bg-muted/30 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {selectedProducts.length} product{selectedProducts.length !== 1 ? 's' : ''} selected
              </p>
              <Button onClick={() => setStep('contact')} className="group">
                Continue
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </div>
          </div>
        )}

        {step === 'contact' && (
          <form onSubmit={handleSubmit} className="flex flex-col">
            <ScrollArea className="h-[350px]">
              <div className="p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
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
                    />
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
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
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
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="rfq-phone" className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-muted-foreground" />
                      Phone Number*
                    </label>
                    <Input
                      id="rfq-phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleFormChange}
                      placeholder="+1 (555) 000-0000"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="rfq-country" className="text-sm font-medium text-foreground flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                    Country*
                  </label>
                  <Input
                    id="rfq-country"
                    name="country"
                    value={formData.country}
                    onChange={handleFormChange}
                    placeholder="Your country"
                    required
                  />
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
                    rows={3}
                    placeholder="Any specific requirements, delivery timeline, quality specifications..."
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
                  />
                </div>

                {/* Summary */}
                <Card className="border-border/50 bg-muted/30">
                  <CardContent className="p-4">
                    <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                      <Package className="w-4 h-4 text-primary" />
                      Quote Summary
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProducts.map((product) => {
                        const qty = quantities.find((q) => q.productId === product.id)
                        return (
                          <Badge key={product.id} variant="outline" className="text-xs">
                            {product.name}
                            {qty?.quantity && (
                              <span className="ml-1 opacity-70">
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

            {/* Footer */}
            <div className="p-4 border-t border-border bg-muted/30 flex items-center justify-between">
              <Button type="button" variant="ghost" onClick={() => setStep('products')}>
                Back
              </Button>
              <Button type="submit" disabled={isSubmitting} className="group min-w-32">
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
          <div className="p-8 flex flex-col items-center justify-center text-center min-h-[300px]">
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

            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={handleSuccessClose}>
                Close
              </Button>
              <Button onClick={handleSuccessClose}>
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

