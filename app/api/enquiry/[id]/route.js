import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Enquiry from "@/models/Enquiry";

export async function PATCH(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const enquiry = await Enquiry.findById(id);

    if (!enquiry) {
      return NextResponse.json(
        {
          success: false,
          message: "Enquiry not found",
        },
        { status: 404 }
      );
    }

    // Toggle checked status
    enquiry.checked = !enquiry.checked;

    await enquiry.save();

    return NextResponse.json(
      {
        success: true,
        message: "Enquiry updated successfully",
        enquiry,
      },
      { status: 200 }
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