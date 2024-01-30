import { NextResponse } from "next/server";
import verifyToken from "./lib/verifyToken";

export default async function middleware(req) {
    let path = req.nextUrl.pathname
    let token = req?.cookies?.get('token')?.value || ''

    let decode = token ? await verifyToken(token) : null
    // console.log({decode, path})

    if (path?.startsWith('/signin') || path?.startsWith('/signup')) {
        if (decode) {
            return NextResponse.redirect(new URL('/', req.url))
        }
        return NextResponse.next()
    }
    else {
        if (!decode) {
            return NextResponse.redirect(new URL(`/signin?callback=${req.nextUrl.pathname}`, req.url))
        }
        return NextResponse.next()
    }
}

export const config = {
    matcher: [
        '/profile',
        '/signin', '/signup',
    ]
}