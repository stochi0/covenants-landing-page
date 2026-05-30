import { Header } from '@/components/layout/header'
import { ProductSearch } from '@/components/product-search'

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(15,118,110,0.12),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.12),transparent_22%),linear-gradient(180deg,#f4fbfa_0%,#f8faf9_44%,#f3f8f7_100%)]" />
      <Header currentPage="products" />
      <div className="relative z-10 mx-auto max-w-[1440px] px-4 pb-10 pt-28 sm:px-6 sm:pt-32">
        <ProductSearch />
      </div>
    </main>
  )
}
