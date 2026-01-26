import { z } from 'zod'

// Contact Form Schema
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .trim()
    .min(2, 'Name must be at least 2 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  country: z
    .string()
    .min(1, 'Country is required')
    .trim()
    .min(2, 'Country must be at least 2 characters'),
  company: z
    .string()
    .min(1, 'Company is required')
    .trim()
    .min(2, 'Company must be at least 2 characters'),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(
      /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/,
      'Please enter a valid phone number'
    ),
  lookingFor: z.string().optional(),
  message: z.string().optional(),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

// RFQ Product Schema
export const rfqProductSchema = z.object({
  id: z.string().min(1, 'Product ID is required'),
  name: z.string().min(1, 'Product name is required'),
  casNumber: z.string().min(1, 'CAS number is required'),
  category: z.enum(['api', 'impurity', 'intermediate', 'chemical']),
  quantity: z
    .string()
    .min(1, 'Quantity is required')
    .refine(
      (val) => {
        const num = parseFloat(val)
        return !isNaN(num) && num > 0
      },
      { message: 'Quantity must be a positive number' }
    ),
  unit: z.enum(['mg', 'g', 'kg', 'mt']),
})

// RFQ Contact Form Schema (for frontend validation, without products)
export const rfqContactFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .trim()
    .min(2, 'Name must be at least 2 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  company: z
    .string()
    .min(1, 'Company is required')
    .trim()
    .min(2, 'Company must be at least 2 characters'),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(
      /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/,
      'Please enter a valid phone number'
    ),
  country: z
    .string()
    .min(1, 'Country is required')
    .trim()
    .min(2, 'Country must be at least 2 characters'),
  countryCode: z.string().optional(),
  city: z
    .string()
    .min(1, 'City is required')
    .trim()
    .min(2, 'City must be at least 2 characters'),
  message: z.string().optional(),
})

// RFQ Form Schema (for API validation, with products)
export const rfqFormSchema = rfqContactFormSchema.extend({
  products: z
    .array(rfqProductSchema)
    .min(1, 'Please select at least one product'),
})

export type RFQFormData = z.infer<typeof rfqFormSchema>
export type RFQProduct = z.infer<typeof rfqProductSchema>

// Quantity validation schema (for individual product quantities in the modal)
export const quantitySchema = z
  .string()
  .min(1, 'Quantity is required')
  .refine(
    (val) => {
      const num = parseFloat(val)
      return !isNaN(num) && num > 0
    },
    { message: 'Quantity must be a positive number' }
  )
