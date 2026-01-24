# Covenants PharmaChem Website

A Next.js website for Covenants PharmaChem LLP featuring product search, catalog browsing, and RFQ (Request for Quote) functionality.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **Package Manager**: pnpm

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm installed (`npm install -g pnpm`)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.local.example .env.local
   ```

4. Configure Supabase:
   - Create a Supabase project at [supabase.com](https://supabase.com)
   - Run the migration SQL provided in the project (see migration file)
   - Get your project URL and anon key from Project Settings > API
   - Update `.env.local` with your Supabase credentials:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your-project-url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
     ```

5. Run the development server:
   ```bash
   pnpm dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Database Setup

The project uses Supabase (PostgreSQL) for product data. Run the provided migration SQL in your Supabase SQL editor to create the products table and set up indexes for fast search.

The migration includes:
- Products table with `product_name`, `cas_number`, and `category` fields
- Auto-generated product IDs (prod-0001, prod-0002, etc.)
- Full-text search indexes using pg_trgm extension
- Sample product data

## Project Structure

```
├── app/
│   ├── api/              # API routes
│   │   └── products/     # Product API endpoints
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/           # React components
│   ├── product-search.tsx # Product search dialog
│   ├── rfq-modal.tsx     # Request for Quote modal
│   └── ui/               # shadcn/ui components
├── lib/
│   ├── products-data.ts  # Product data API client
│   ├── supabase.ts       # Supabase client (client-side)
│   └── supabase-server.ts # Supabase client (server-side)
└── public/               # Static assets
```

## API Endpoints

- `GET /api/products` - Search products with pagination
  - Query params: `query`, `searchType` (name|cas), `categories`, `page`, `pageSize`
- `GET /api/products/[id]` - Get product by ID
- `POST /api/products/batch` - Get multiple products by IDs

## Features

- 🔍 Product search by name or CAS number
- 🏷️ Category filtering (API, Impurity, Intermediate, Chemical)
- 📄 Paginated results
- 🛒 Product selection for RFQ
- 📧 Request for Quote form
- ⚡ Fast search with PostgreSQL indexes

## Build

```bash
pnpm build
pnpm start
```

## License

Private - Covenants PharmaChem LLP
