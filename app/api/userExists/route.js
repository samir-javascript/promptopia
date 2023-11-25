
import User from "@/models/user.model";
import { connectToDatabase } from "@/utils/database";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToDatabase()
    const { email } = await req.json();
    const user = await User.findOne({ email }).select("_id");

   

    console.log("user: ", user);
    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
