import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Enquiry from "@/models/Enquiry";

export async function POST(req) {
  try {
    await connectDB();

    const { name, phone, message } = await req.json();

    if (!name || !phone || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required.",
        },
        { status: 400 }
      );
    }

    const enquiry = await Enquiry.create({
      name,
      phone,
      message,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Enquiry submitted successfully.",
        data: enquiry,
      },
      { status: 201 }
    );
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

export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);

  const checked = searchParams.get("checked");

  let query = {};

  if (checked !== null) {
    query.checked = checked === "true";
  }

  const enquiries = await Enquiry.find(query).sort({
    createdAt: -1,
  });

  return Response.json({
    success: true,
    enquiries,
  });
}