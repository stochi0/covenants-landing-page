import { NextRequest, NextResponse } from 'next/server'
import { searchProducts } from '@/lib/products-server'
import type { SearchType } from '@/lib/products-data'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('query') || ''
    const searchType = (searchParams.get('searchType') === 'cas' ? 'cas' : 'name') satisfies SearchType
    const categories = searchParams.get('categories')?.split(',').filter(Boolean) || []
    const page = parseInt(searchParams.get('page') || '1', 10)
    const pageSize = parseInt(searchParams.get('pageSize') || '24', 10)

    return NextResponse.json(await searchProducts({
      query,
      searchType,
      categories,
      page,
      pageSize,
    }))
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
