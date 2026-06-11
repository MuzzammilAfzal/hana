import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const newOrder = await Order.create(body);

    return NextResponse.json(
      {
        success: true,
        data: newOrder,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);

  const completed = searchParams.get("completed");

  let query = {};

  if (completed !== null) {
    query.completed = completed === "true";
  }

  const orders = await Order.find(query).sort({
    createdAt: -1,
  });

  return Response.json({
    success: true,
    orders,
  });
}