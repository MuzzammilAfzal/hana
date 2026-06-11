import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import adminModel from "@/models/Admin";

export async function POST(req) {
  try {
    await connectDB();

    const { adminId, password } = await req.json();

    if (!adminId || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Admin ID and Password are required.",
        },
        { status: 400 }
      );
    }


    const admin = await adminModel.findOne({ adminId });

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid credentials.",
        },
        { status: 401 }
      );
    }

  
    if (admin.password !== password) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid credentials.",
        },
        { status: 401 }
      );
    }

    
    const token = jwt.sign(
      {
        id: admin._id,
        adminId: admin.adminId,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    
    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful",
      },
      { status: 200 }
    );

    
    response.cookies.set("token", token, { 
      path: "/",
    });

    return response;
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}