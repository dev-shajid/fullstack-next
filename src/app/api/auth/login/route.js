import User from "@/models/User";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "@/lib/db";

export async function POST(req) {
    try {
        await db.connect()
        const {email,password} = await req.json()
        // console.log({email,password})

        const user = await User.findOne({ email })
        if (!user) throw new Error("User does not exist")
        console.log("user exists");


        //check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password)
        if (!validPassword) throw new Error("Invalid Password!")
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