import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const config = {
  matcher: [
    '/:admin/dashboard',
    '/:admin/colaboradores/:path',
    '/:admin/franqueados/:path',
    '/:admin/veiculos/:path',
    '/:admin/opcionais',
    // '/:slug/users/:path*',
  ]
}

export async function middleware(req: NextRequest) {
  const token = req?.cookies.get('token')

  if (!token) {
    return NextResponse.redirect(new URL('/admin', req.url))
  }
}
