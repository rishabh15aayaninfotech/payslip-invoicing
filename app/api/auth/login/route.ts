import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/models/User";
import { seedDatabaseIfEmpty } from "../seed/route";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "payslip_pro_secret_key_2026";

function createAuthResponse(user: {
  id: string;
  name: string;
  email: string;
  role: string;
}) {
  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  const response = NextResponse.json({
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    message: "Signed in successfully",
  });

  response.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return response;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Please provide work email and password." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();
    await connectToDatabase();
    // Auto-seed if database is first time initialized
    await seedDatabaseIfEmpty();

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Invalid work email or password." },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, error: "Invalid work email or password." },
        { status: 401 }
      );
    }

    return createAuthResponse({
      id: String(user._id),
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
