import User from "@/models/User";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "@/lib/db";

export async function POST(req) {
    try {
        await db.connect()
        const {email,password:pass} = await req.json()
        // console.log({email,pass})

        const {password, ...user} = await User.findOne({ email })
        if (!user) throw new Error("User does not exist")
        console.log("user exists");


        //check if pass is correct
        const validpass = await bcryptjs.compare(pass, password)
        if (!validpass) throw new Error("Invalid pass!")
        // console.log(user);

        //create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        //create token
        const token = jwt.sign(tokenData, process.env.SECRET, { expiresIn: '1d' });

        const response = NextResponse.json({
            message: "Login successful",
            user,
            success: true,
        })
        response.cookies.set("token", token, {
            // httpOnly: true,
        })
        return response;
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 })
    }
}