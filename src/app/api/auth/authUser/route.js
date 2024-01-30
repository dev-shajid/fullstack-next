import verifyToken from "@/lib/verifyToken";
import { NextResponse } from "next/server";

export async function GET(req) {
    let token = req?.cookies?.get('token')?.value || ''

    let decode = token ? await verifyToken(token) : null
    try {
        if (!decode) throw new Error("Unauthorized user! sigin again")
        return NextResponse.json({ message:"Authorized Succesfully!", user: decode, success: true, }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 })
    }
}