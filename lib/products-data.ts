// Product Database Schema
export interface Product {
  id: string
  name: string
  casNumber: string
  category: 'api' | 'impurity' | 'intermediate' | 'chemical'
  molecularFormula: string
  molecularWeight: number
  purity?: string
  grade?: string
  therapeuticArea?: string
  description: string
  synonyms: string[]
  inStock: boolean
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

// Base product templates for generating large dataset
const baseProducts: Product[] = [
  // APIs
  {
    id: 'api-001',
    name: 'Metformin Hydrochloride',
    casNumber: '1115-70-4',
    category: 'api',
    molecularFormula: 'C4H12ClN5',
    molecularWeight: 165.62,
    purity: '≥99.0%',
    grade: 'USP/EP',
    therapeuticArea: 'Antidiabetic',
    description: 'First-line medication for type 2 diabetes management',
    synonyms: ['Glucophage', 'Dimethylbiguanide HCl'],
    inStock: true,
  },
  {
    id: 'api-002',
    name: 'Atorvastatin Calcium',
    casNumber: '134523-03-8',
    category: 'api',
    molecularFormula: 'C66H68CaF2N4O10',
    molecularWeight: 1155.34,
    purity: '≥98.5%',
    grade: 'USP/EP',
    therapeuticArea: 'Cardiovascular',
    description: 'Statin medication for lowering cholesterol levels',
    synonyms: ['Lipitor', 'CI-981'],
    inStock: true,
  },
  {
    id: 'api-003',
    name: 'Omeprazole',
    casNumber: '73590-58-6',
    category: 'api',
    molecularFormula: 'C17H19N3O3S',
    molecularWeight: 345.42,
    purity: '≥99.0%',
    grade: 'USP/EP',
    therapeuticArea: 'Gastrointestinal',
    description: 'Proton pump inhibitor for acid reflux and ulcers',
    synonyms: ['Prilosec', 'Losec'],
    inStock: true,
  },
  {
    id: 'api-004',
    name: 'Amlodipine Besylate',
    casNumber: '111470-99-6',
    category: 'api',
    molecularFormula: 'C26H31ClN2O8S',
    molecularWeight: 567.05,
    purity: '≥99.0%',
    grade: 'USP/EP',
    therapeuticArea: 'Cardiovascular',
    description: 'Calcium channel blocker for hypertension',
    synonyms: ['Norvasc', 'Istin'],
    inStock: true,
  },
  {
    id: 'api-005',
    name: 'Lisinopril Dihydrate',
    casNumber: '83915-83-7',
    category: 'api',
    molecularFormula: 'C21H31N3O5·2H2O',
    molecularWeight: 441.52,
    purity: '≥98.5%',
    grade: 'USP',
    therapeuticArea: 'Cardiovascular',
    description: 'ACE inhibitor for high blood pressure and heart failure',
    synonyms: ['Zestril', 'Prinivil'],
    inStock: true,
  },
  {
    id: 'api-006',
    name: 'Losartan Potassium',
    casNumber: '124750-99-8',
    category: 'api',
    molecularFormula: 'C22H22ClKN6O',
    molecularWeight: 461.00,
    purity: '≥99.0%',
    grade: 'USP/EP',
    therapeuticArea: 'Cardiovascular',
    description: 'Angiotensin II receptor antagonist for hypertension',
    synonyms: ['Cozaar', 'DuP-753'],
    inStock: false,
  },
  {
    id: 'api-007',
    name: 'Pantoprazole Sodium',
    casNumber: '138786-67-1',
    category: 'api',
    molecularFormula: 'C16H14F2N3NaO4S',
    molecularWeight: 405.36,
    purity: '≥99.0%',
    grade: 'USP/EP',
    therapeuticArea: 'Gastrointestinal',
    description: 'Proton pump inhibitor for GERD treatment',
    synonyms: ['Protonix', 'Pantoloc'],
    inStock: true,
  },
  {
    id: 'api-008',
    name: 'Rosuvastatin Calcium',
    casNumber: '147098-20-2',
    category: 'api',
    molecularFormula: 'C44H54CaF2N6O12S2',
    molecularWeight: 1001.14,
    purity: '≥99.0%',
    grade: 'USP',
    therapeuticArea: 'Cardiovascular',
    description: 'HMG-CoA reductase inhibitor for cholesterol management',
    synonyms: ['Crestor', 'ZD4522'],
    inStock: true,
  },
  {
    id: 'api-009',
    name: 'Simvastatin',
    casNumber: '79902-63-9',
    category: 'api',
    molecularFormula: 'C25H38O5',
    molecularWeight: 418.57,
    purity: '≥98.0%',
    grade: 'USP/EP',
    therapeuticArea: 'Cardiovascular',
    description: 'HMG-CoA reductase inhibitor for cholesterol',
    synonyms: ['Zocor', 'Synvinolin'],
    inStock: true,
  },
  {
    id: 'api-010',
    name: 'Gabapentin',
    casNumber: '60142-96-3',
    category: 'api',
    molecularFormula: 'C9H17NO2',
    molecularWeight: 171.24,
    purity: '≥99.0%',
    grade: 'USP',
    therapeuticArea: 'Neurological',
    description: 'Anticonvulsant for epilepsy and neuropathic pain',
    synonyms: ['Neurontin', 'Gralise'],
    inStock: true,
  },
]

// Additional API names for generation
const apiNames = [
  'Acetaminophen', 'Ibuprofen', 'Aspirin', 'Naproxen', 'Diclofenac',
  'Celecoxib', 'Meloxicam', 'Piroxicam', 'Indomethacin', 'Ketorolac',
  'Tramadol', 'Codeine', 'Morphine', 'Oxycodone', 'Hydrocodone',
  'Fentanyl', 'Buprenorphine', 'Naloxone', 'Naltrexone', 'Methadone',
  'Alprazolam', 'Lorazepam', 'Diazepam', 'Clonazepam', 'Midazolam',
  'Zolpidem', 'Eszopiclone', 'Ramelteon', 'Suvorexant', 'Lemborexant',
  'Sertraline', 'Fluoxetine', 'Paroxetine', 'Citalopram', 'Escitalopram',
  'Venlafaxine', 'Duloxetine', 'Bupropion', 'Mirtazapine', 'Trazodone',
  'Quetiapine', 'Risperidone', 'Olanzapine', 'Aripiprazole', 'Ziprasidone',
  'Haloperidol', 'Chlorpromazine', 'Clozapine', 'Paliperidone', 'Lurasidone',
  'Levothyroxine', 'Liothyronine', 'Methimazole', 'Propylthiouracil', 'Carbimazole',
  'Prednisone', 'Prednisolone', 'Dexamethasone', 'Hydrocortisone', 'Methylprednisolone',
  'Insulin Glargine', 'Insulin Lispro', 'Insulin Aspart', 'Glipizide', 'Glyburide',
  'Pioglitazone', 'Rosiglitazone', 'Sitagliptin', 'Saxagliptin', 'Linagliptin',
  'Canagliflozin', 'Dapagliflozin', 'Empagliflozin', 'Liraglutide', 'Semaglutide',
]

// Intermediate names for generation
const intermediateNames = [
  '4-Aminophenol', '2-Chlorobenzoic Acid', '3-Nitroaniline', 'Benzyl Chloride',
  'Ethyl Acetoacetate', 'Diethyl Malonate', 'Phenylacetic Acid', 'Mandelic Acid',
  '4-Hydroxybenzaldehyde', 'Vanillin', 'Guaiacol', 'Catechol', 'Resorcinol',
  'Hydroquinone', 'Pyrogallol', '4-Chloroacetophenone', '2-Bromobenzoic Acid',
  '3-Chloropropionic Acid', 'Glycine Ethyl Ester', 'Alanine Methyl Ester',
  'Piperidine', 'Pyrrolidine', 'Morpholine', 'Piperazine', 'Thiomorpholine',
  'Benzimidazole', 'Indole', 'Quinoline', 'Isoquinoline', 'Pyridine',
  'Imidazole', 'Triazole', 'Tetrazole', 'Pyrazole', 'Oxazole',
  'Thiazole', 'Furan', 'Thiophene', 'Pyrrole', 'Indazole',
  'Benzofuran', 'Benzothiophene', 'Carbazole', 'Acridine', 'Phenazine',
]

// Impurity names for generation  
const impurityNames = [
  'N-Oxide', 'Sulfoxide', 'Sulfone', 'Lactone', 'Lactam',
  'Dimer', 'Trimer', 'Epoxide', 'Hydroxy', 'Dehydro',
  'Nor', 'Desmethyl', 'Didesmethyl', 'Carboxy', 'Glucuronide',
  'Sulfate', 'N-Acetyl', 'O-Acetyl', 'Methyl Ester', 'Ethyl Ester',
  'Ring-opened', 'Cyclized', 'Rearranged', 'Isomer', 'Enantiomer',
  'Related Compound A', 'Related Compound B', 'Related Compound C', 'Related Compound D', 'Related Compound E',
  'Process Impurity 1', 'Process Impurity 2', 'Degradant A', 'Degradant B', 'Degradant C',
]

// Chemical/Excipient names for generation
const chemicalNames = [
  'Lactose Monohydrate', 'Mannitol', 'Sorbitol', 'Xylitol', 'Maltitol',
  'Starch', 'Pregelatinized Starch', 'Corn Starch', 'Potato Starch', 'Rice Starch',
  'Cellulose', 'Methylcellulose', 'Ethylcellulose', 'Carboxymethylcellulose', 'Hydroxyethylcellulose',
  'Gelatin', 'Collagen', 'Albumin', 'Casein', 'Zein',
  'Polyvinyl Alcohol', 'Polyvinyl Acetate', 'Polylactic Acid', 'Polyglycolic Acid', 'PLGA',
  'Silica', 'Talc', 'Kaolin', 'Bentonite', 'Montmorillonite',
  'Calcium Carbonate', 'Calcium Phosphate', 'Calcium Sulfate', 'Sodium Bicarbonate', 'Potassium Chloride',
  'Citric Acid', 'Tartaric Acid', 'Malic Acid', 'Fumaric Acid', 'Succinic Acid',
  'Sodium Stearate', 'Calcium Stearate', 'Zinc Stearate', 'Glyceryl Monostearate', 'Glyceryl Behenate',
  'Tween 20', 'Tween 80', 'Span 20', 'Span 80', 'Poloxamer 188',
]

// Therapeutic areas
const therapeuticAreas = [
  'Cardiovascular', 'Antidiabetic', 'Gastrointestinal', 'Neurological', 'Respiratory',
  'Oncology', 'Immunology', 'Infectious Disease', 'Dermatology', 'Ophthalmology',
  'Hematology', 'Endocrinology', 'Rheumatology', 'Nephrology', 'Psychiatry',
]

// Generate CAS number
function generateCAS(seed: number): string {
  const part1 = 1000 + (seed * 17) % 89999
  const part2 = 10 + (seed * 13) % 90
  const part3 = (seed * 7) % 10
  return `${part1}-${part2}-${part3}`
}

// Generate molecular formula
function generateFormula(seed: number): string {
  const c = 5 + (seed % 30)
  const h = 4 + (seed % 40)
  const n = seed % 5
  const o = seed % 8
  const s = seed % 2
  
  let formula = `C${c}H${h}`
  if (n > 0) formula += `N${n}`
  if (o > 0) formula += `O${o}`
  if (s > 0) formula += `S`
  return formula
}

// Generate large product database (simulating 500 products)
function generateProducts(): Product[] {
  const allProducts: Product[] = [...baseProducts]
  let productId = 100
  
  // Generate APIs
  apiNames.forEach((name, idx) => {
    allProducts.push({
      id: `api-${productId++}`,
      name: name,
      casNumber: generateCAS(productId * 3 + idx),
      category: 'api',
      molecularFormula: generateFormula(productId + idx),
      molecularWeight: 150 + (productId * 7) % 800,
      purity: ['≥98.0%', '≥99.0%', '≥99.5%', '≥97.0%'][idx % 4],
      grade: ['USP', 'EP', 'USP/EP', 'BP', 'JP'][idx % 5],
      therapeuticArea: therapeuticAreas[idx % therapeuticAreas.length],
      description: `Active pharmaceutical ingredient for ${therapeuticAreas[idx % therapeuticAreas.length].toLowerCase()} applications`,
      synonyms: [`${name} Base`, `${name} Salt`],
      inStock: idx % 4 !== 0,
    })
  })
  
  // Generate Intermediates
  intermediateNames.forEach((name, idx) => {
    allProducts.push({
      id: `int-${productId++}`,
      name: name,
      casNumber: generateCAS(productId * 5 + idx * 2),
      category: 'intermediate',
      molecularFormula: generateFormula(productId + idx * 2),
      molecularWeight: 80 + (productId * 3) % 400,
      purity: ['≥95.0%', '≥98.0%', '≥99.0%', '≥97.0%'][idx % 4],
      description: `Pharmaceutical intermediate for synthesis`,
      synonyms: [name.replace(/\s/g, '')],
      inStock: idx % 3 !== 0,
    })
  })
  
  // Generate Impurities (linked to APIs)
  const apiList = allProducts.filter(p => p.category === 'api')
  impurityNames.forEach((suffix, idx) => {
    const parentApi = apiList[idx % apiList.length]
    allProducts.push({
      id: `imp-${productId++}`,
      name: `${parentApi.name} ${suffix}`,
      casNumber: generateCAS(productId * 7 + idx * 3),
      category: 'impurity',
      molecularFormula: generateFormula(productId + idx * 3),
      molecularWeight: parentApi.molecularWeight + (idx % 100) - 50,
      purity: '≥95.0%',
      grade: 'Reference Standard',
      description: `Impurity/metabolite of ${parentApi.name}`,
      synonyms: [`${parentApi.name} Impurity ${String.fromCharCode(65 + idx % 26)}`],
      inStock: idx % 5 !== 0,
    })
  })
  
  // Generate Chemicals/Excipients
  chemicalNames.forEach((name, idx) => {
    allProducts.push({
      id: `chem-${productId++}`,
      name: name,
      casNumber: generateCAS(productId * 11 + idx * 4),
      category: 'chemical',
      molecularFormula: generateFormula(productId + idx * 4),
      molecularWeight: 50 + (productId * 2) % 500,
      purity: ['NF', 'EP', 'USP/NF', 'BP'][idx % 4],
      description: `Pharmaceutical excipient for formulation`,
      synonyms: [name.split(' ')[0]],
      inStock: idx % 4 !== 0,
    })
  })
  
  // Generate more variants to reach ~500 products
  for (let i = 0; i < 150; i++) {
    const categories: Array<'api' | 'intermediate' | 'impurity' | 'chemical'> = ['api', 'intermediate', 'impurity', 'chemical']
    const category = categories[i % 4]
    const baseNameList = category === 'api' ? apiNames : category === 'intermediate' ? intermediateNames : category === 'impurity' ? impurityNames : chemicalNames
    const baseName = baseNameList[i % baseNameList.length]
    
    allProducts.push({
      id: `${category.slice(0, 3)}-${productId++}`,
      name: `${baseName} ${['Sodium', 'Potassium', 'Calcium', 'Hydrochloride', 'Sulfate', 'Mesylate', 'Besylate', 'Tartrate'][i % 8]}`,
      casNumber: generateCAS(productId * 13 + i * 5),
      category: category,
      molecularFormula: generateFormula(productId + i * 5),
      molecularWeight: 100 + (productId * 4) % 900,
      purity: ['≥95.0%', '≥98.0%', '≥99.0%', '≥99.5%'][i % 4],
      grade: category === 'impurity' ? 'Reference Standard' : ['USP', 'EP', 'BP', 'JP', 'NF'][i % 5],
      therapeuticArea: category === 'api' ? therapeuticAreas[i % therapeuticAreas.length] : undefined,
      description: `${category === 'api' ? 'Active pharmaceutical ingredient' : category === 'intermediate' ? 'Pharmaceutical intermediate' : category === 'impurity' ? 'Reference standard/impurity' : 'Pharmaceutical excipient'}`,
      synonyms: [`${baseName}-${i}`],
      inStock: i % 3 !== 0,
    })
  }
  
  return allProducts
}

// Generated products database
export const products: Product[] = generateProducts()

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
      return product.casNumber.includes(searchTerm)
    } else {
      // Name search - search by name and synonyms
      if (product.name.toLowerCase().includes(searchTerm)) {
        return true
      }
      if (product.synonyms.some((s) => s.toLowerCase().includes(searchTerm))) {
        return true
      }
      return false
    }
  })
  
  // Sort results - exact matches first, then alphabetically
  const sorted = filtered.sort((a, b) => {
    if (searchType === 'cas') {
      // Exact CAS match comes first
      const aExact = a.casNumber === searchTerm
      const bExact = b.casNumber === searchTerm
      if (aExact && !bExact) return -1
      if (!aExact && bExact) return 1
      // Then by CAS number starts with
      const aStarts = a.casNumber.startsWith(searchTerm)
      const bStarts = b.casNumber.startsWith(searchTerm)
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

// Legacy search function (for backwards compatibility - don't use for large datasets)
export function searchProducts(
  query: string,
  categories: string[]
): Product[] {
  const searchTerm = query.toLowerCase().trim()
  
  return products.filter((product) => {
    if (categories.length > 0 && !categories.includes(product.category)) {
      return false
    }
    
    if (!searchTerm) {
      return categories.length > 0
    }
    
    if (product.name.toLowerCase().includes(searchTerm)) {
      return true
    }
    
    if (product.casNumber.includes(searchTerm)) {
      return true
    }
    
    if (product.synonyms.some((s) => s.toLowerCase().includes(searchTerm))) {
      return true
    }
    
    return false
  }).slice(0, 50) // Limit to 50 for safety
}
