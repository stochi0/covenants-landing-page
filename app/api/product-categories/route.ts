import { NextResponse } from 'next/server'
import { fetchProductCategoryFacets } from '@/lib/products-server'

export async function GET() {
  try {
    return NextResponse.json(await fetchProductCategoryFacets())
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
