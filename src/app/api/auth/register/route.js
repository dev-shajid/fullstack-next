import User from "@/models/User";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "@/lib/db";

export async function POST(req) {
    try {
        await db.connect()
        const { name, email, password: pass } = await req.json()
        // console.log({name,email,pass})

        const user = await User.findOne({ email })
        if (user) throw new Error("User already exist!")

        //hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(pass, salt)

        const { password, ...newUser } = await User.create({ name, email, password: hashedPassword })

        const response = NextResponse.json({
            message: "User created successfully!",
            success: true,
            user:newUser
        })

        // console.log(newUser)

        //create token
        const token = jwt.sign(newUser, process.env.SECRET, { expiresIn: "1d" })
        response.cookies.set("token", token, {
            httpOnly: true,
        })
        return response;
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 })
    }
}