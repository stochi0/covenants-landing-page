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

// Mock Product Data - Realistic pharmaceutical products
export const products: Product[] = [
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
  
  // Intermediates
  {
    id: 'int-001',
    name: 'Ethyl 3-Oxo-4-phenylbutanoate',
    casNumber: '5413-05-8',
    category: 'intermediate',
    molecularFormula: 'C12H14O3',
    molecularWeight: 206.24,
    purity: '≥98.0%',
    description: 'Key intermediate in pharmaceutical synthesis',
    synonyms: ['BMK Glycidate', 'Ethyl phenylacetylacetate'],
    inStock: true,
  },
  {
    id: 'int-002',
    name: '2-Chloro-5-nitrobenzoic acid',
    casNumber: '2516-96-3',
    category: 'intermediate',
    molecularFormula: 'C7H4ClNO4',
    molecularWeight: 201.56,
    purity: '≥99.0%',
    description: 'Intermediate for anti-inflammatory drugs synthesis',
    synonyms: ['CNBA'],
    inStock: true,
  },
  {
    id: 'int-003',
    name: '4-Amino-3,5-dichlorophenol',
    casNumber: '5765-72-0',
    category: 'intermediate',
    molecularFormula: 'C6H5Cl2NO',
    molecularWeight: 178.02,
    purity: '≥98.0%',
    description: 'Building block for agrochemicals and pharmaceuticals',
    synonyms: ['ADCP'],
    inStock: true,
  },
  {
    id: 'int-004',
    name: 'N-Methyl-4-piperidone',
    casNumber: '1445-73-4',
    category: 'intermediate',
    molecularFormula: 'C6H11NO',
    molecularWeight: 113.16,
    purity: '≥99.0%',
    description: 'Versatile intermediate for opioid synthesis',
    synonyms: ['NMP', '1-Methyl-4-piperidone'],
    inStock: false,
  },
  {
    id: 'int-005',
    name: '3,4-Dihydroxybenzaldehyde',
    casNumber: '139-85-5',
    category: 'intermediate',
    molecularFormula: 'C7H6O3',
    molecularWeight: 138.12,
    purity: '≥98.0%',
    description: 'Key intermediate for L-DOPA and catecholamine synthesis',
    synonyms: ['Protocatechualdehyde', '3,4-DHBA'],
    inStock: true,
  },
  {
    id: 'int-006',
    name: '2-Amino-5-chlorobenzophenone',
    casNumber: '719-59-5',
    category: 'intermediate',
    molecularFormula: 'C13H10ClNO',
    molecularWeight: 231.68,
    purity: '≥98.5%',
    description: 'Intermediate for benzodiazepine synthesis',
    synonyms: ['ACBP'],
    inStock: true,
  },
  
  // Impurities
  {
    id: 'imp-001',
    name: 'Atorvastatin Lactone',
    casNumber: '125971-95-1',
    category: 'impurity',
    molecularFormula: 'C33H35FN2O4',
    molecularWeight: 542.64,
    purity: '≥95.0%',
    grade: 'Reference Standard',
    description: 'Process-related impurity of Atorvastatin',
    synonyms: ['Atorvastatin Impurity A', 'ATL'],
    inStock: true,
  },
  {
    id: 'imp-002',
    name: 'Omeprazole Sulfone',
    casNumber: '88546-55-8',
    category: 'impurity',
    molecularFormula: 'C17H19N3O4S',
    molecularWeight: 361.42,
    purity: '≥98.0%',
    grade: 'Reference Standard',
    description: 'Metabolite and impurity of Omeprazole',
    synonyms: ['Omeprazole Impurity B'],
    inStock: true,
  },
  {
    id: 'imp-003',
    name: 'N-Nitroso Dimethylamine',
    casNumber: '62-75-9',
    category: 'impurity',
    molecularFormula: 'C2H6N2O',
    molecularWeight: 74.08,
    purity: '≥99.0%',
    grade: 'Reference Standard',
    description: 'Nitrosamine impurity marker compound',
    synonyms: ['NDMA', 'DMN'],
    inStock: true,
  },
  {
    id: 'imp-004',
    name: 'Metformin Related Compound A',
    casNumber: '1115-70-4',
    category: 'impurity',
    molecularFormula: 'C4H11N5',
    molecularWeight: 129.17,
    purity: '≥95.0%',
    grade: 'Reference Standard',
    description: 'Degradation impurity of Metformin',
    synonyms: ['Metformin Impurity A', 'Cyanoguanidine'],
    inStock: true,
  },
  {
    id: 'imp-005',
    name: 'Amlodipine Impurity D',
    casNumber: '88150-47-4',
    category: 'impurity',
    molecularFormula: 'C20H25ClN2O5',
    molecularWeight: 408.88,
    purity: '≥95.0%',
    grade: 'Reference Standard',
    description: 'Synthesis-related impurity of Amlodipine',
    synonyms: ['Dehydro Amlodipine'],
    inStock: false,
  },
  {
    id: 'imp-006',
    name: 'Losartan N2-Glucuronide',
    casNumber: '114798-26-4',
    category: 'impurity',
    molecularFormula: 'C28H32ClN6O8',
    molecularWeight: 618.04,
    purity: '≥95.0%',
    grade: 'Reference Standard',
    description: 'Major metabolite of Losartan',
    synonyms: ['Losartan Metabolite I'],
    inStock: true,
  },
  
  // Specialty Chemicals
  {
    id: 'chem-001',
    name: 'Polyethylene Glycol 400',
    casNumber: '25322-68-3',
    category: 'chemical',
    molecularFormula: 'H(OCH2CH2)nOH',
    molecularWeight: 400,
    purity: 'NF',
    description: 'Excipient and solubilizer for pharmaceutical formulations',
    synonyms: ['PEG 400', 'Macrogol 400'],
    inStock: true,
  },
  {
    id: 'chem-002',
    name: 'Hydroxypropyl Methylcellulose',
    casNumber: '9004-65-3',
    category: 'chemical',
    molecularFormula: 'Variable',
    molecularWeight: 10000,
    purity: 'USP/NF',
    description: 'Film-forming agent and controlled-release matrix',
    synonyms: ['HPMC', 'Hypromellose'],
    inStock: true,
  },
  {
    id: 'chem-003',
    name: 'Magnesium Stearate',
    casNumber: '557-04-0',
    category: 'chemical',
    molecularFormula: 'C36H70MgO4',
    molecularWeight: 591.27,
    purity: 'NF/EP',
    description: 'Lubricant for tablet and capsule manufacturing',
    synonyms: ['Magnesium Octadecanoate'],
    inStock: true,
  },
  {
    id: 'chem-004',
    name: 'Microcrystalline Cellulose',
    casNumber: '9004-34-6',
    category: 'chemical',
    molecularFormula: '(C6H10O5)n',
    molecularWeight: 36000,
    purity: 'NF/EP',
    description: 'Binder and diluent in solid dosage forms',
    synonyms: ['MCC', 'Avicel'],
    inStock: true,
  },
  {
    id: 'chem-005',
    name: 'Croscarmellose Sodium',
    casNumber: '74811-65-7',
    category: 'chemical',
    molecularFormula: 'Variable',
    molecularWeight: 90000,
    purity: 'NF',
    description: 'Super-disintegrant for tablets and capsules',
    synonyms: ['Ac-Di-Sol', 'Modified Cellulose Gum'],
    inStock: true,
  },
  {
    id: 'chem-006',
    name: 'Silicon Dioxide Colloidal',
    casNumber: '7631-86-9',
    category: 'chemical',
    molecularFormula: 'SiO2',
    molecularWeight: 60.08,
    purity: 'NF/EP',
    description: 'Glidant and anticaking agent',
    synonyms: ['Aerosil', 'Cab-O-Sil', 'Fumed Silica'],
    inStock: true,
  },
  {
    id: 'chem-007',
    name: 'Povidone K30',
    casNumber: '9003-39-8',
    category: 'chemical',
    molecularFormula: '(C6H9NO)n',
    molecularWeight: 40000,
    purity: 'USP/NF',
    description: 'Binder and solubilizer for pharmaceutical use',
    synonyms: ['PVP K30', 'Polyvinylpyrrolidone'],
    inStock: false,
  },
  {
    id: 'chem-008',
    name: 'Sodium Lauryl Sulfate',
    casNumber: '151-21-3',
    category: 'chemical',
    molecularFormula: 'C12H25NaO4S',
    molecularWeight: 288.38,
    purity: 'NF',
    description: 'Surfactant and emulsifier',
    synonyms: ['SLS', 'Sodium Dodecyl Sulfate'],
    inStock: true,
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

// Search function
export function searchProducts(
  query: string,
  categories: string[]
): Product[] {
  const searchTerm = query.toLowerCase().trim()
  
  return products.filter((product) => {
    // Category filter
    if (categories.length > 0 && !categories.includes(product.category)) {
      return false
    }
    
    // Empty search returns all (filtered by category)
    if (!searchTerm) {
      return true
    }
    
    // Search by name
    if (product.name.toLowerCase().includes(searchTerm)) {
      return true
    }
    
    // Search by CAS number
    if (product.casNumber.includes(searchTerm)) {
      return true
    }
    
    // Search by synonyms
    if (product.synonyms.some((s) => s.toLowerCase().includes(searchTerm))) {
      return true
    }
    
    // Search by therapeutic area
    if (product.therapeuticArea?.toLowerCase().includes(searchTerm)) {
      return true
    }
    
    return false
  })
}

