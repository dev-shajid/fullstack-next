import db from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        await db.connect()
        const response = NextResponse.json({
            message: 'Logout Successful!',
            success: true,
        })
        response.cookies.set('token', '')
        return response
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 })
    }
}