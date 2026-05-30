import { NextRequest, NextResponse } from 'next/server'
import { getProductsByIds } from '@/lib/products-server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const ids = Array.isArray(body?.ids)
      ? body.ids.filter((id: unknown): id is string => typeof id === 'string' && id.length > 0)
      : []

    if (ids.length === 0) {
      return NextResponse.json(
        { error: 'Invalid request. Expected an array of product IDs.' },
        { status: 400 }
      )
    }

    return NextResponse.json({ products: await getProductsByIds(ids) })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
