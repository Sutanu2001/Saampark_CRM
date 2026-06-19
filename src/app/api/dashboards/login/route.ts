import { NextResponse } from "next/server";
import { readDb } from "@/lib/db"; // Adjust path if needed
import { AppDb } from "@/lib/types"; // Adjust path if needed

export async function POST(req: Request) {
  try {
    const { email, password, captchaToken } = await req.json();

    if (!email || !password || !captchaToken) {
      return NextResponse.json({ message: "All fields are required." }, { status: 400 });
    }

    // 1. reCAPTCHA Verification
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captchaToken}`;
    
    const googleRes = await fetch(verificationUrl, { method: "POST" });
    const googleData = await googleRes.json();

    if (!googleData.success) {
      return NextResponse.json({ message: "reCAPTCHA verification failed." }, { status: 401 });
    }

    // 2. Read from your app-db.json
    const db: AppDb = await readDb();

    // 3. Look for the user in the database array if it exists
    const user = db.users?.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (user) {
      if (user.password === password) {
        return NextResponse.json({
          message: "Login successful!",
          token: "mock-jwt-session-token",
          user: { username: user.username, role: user.role }
        }, { status: 200 });
      } else {
        return NextResponse.json({ message: "Invalid email or password." }, { status: 401 });
      }
    }

    // 4. Fallback Demo Account (runs if db.users doesn't exist or is empty)
    if (email.toLowerCase() === "admin@demo.com" && password === "admin123") {
      return NextResponse.json({ 
        message: "Login successful!", 
        token: "mock-jwt-session-token", 
        user: { username: "Admin User", role: "ADMIN" }
      }, { status: 200 });
    }

    return NextResponse.json({ message: "Invalid email or password." }, { status: 401 });

  } catch (error) {
    console.error("Auth System Error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}