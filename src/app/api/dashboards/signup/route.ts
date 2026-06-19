import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { readDb } from "@/lib/db"; // Adjust path to your db.ts file location
import { AppDb } from "@/lib/types"; // Adjust path to your types file location

// Configure Nodemailer Transport
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// A simple in-memory cache to hold pending registrations temporarily until OTP verification
// In production, use a temporary DB collection or Redis
const otpCache = new Map<string, { userData: any; otp: string; expires: number }>();

export async function POST(req: Request) {
  try {
    const { firstName, lastName, type, companyName, email, password, token, otp, isVerifying } = await req.json();

    // ----------------------------------------------------
    // PHASE 2: VERIFY SUBMITTED OTP AND SAVE USER
    // ----------------------------------------------------
    if (isVerifying) {
      if (!email || !otp) {
        return NextResponse.json({ message: "Email and OTP are required." }, { status: 400 });
      }

      const cachedData = otpCache.get(email.toLowerCase());

      if (!cachedData) {
        return NextResponse.json({ message: "OTP expired or session not found. Please sign up again." }, { status: 400 });
      }

      if (Date.now() > cachedData.expires) {
        otpCache.delete(email.toLowerCase());
        return NextResponse.json({ message: "OTP has expired. Please try again." }, { status: 400 });
      }

      if (cachedData.otp !== otp) {
        return NextResponse.json({ message: "Invalid OTP code entered." }, { status: 400 });
      }

      // OTP matches! Let's commit the user to app-db.json
      const db: AppDb = await readDb();
      
      // Ensure the users array layout safely exists
      if (!db.users) {
        db.users = [];
      }

      // Build the final user record object
      const newUser = {
        id: `usr_${Date.now()}`,
        email: email.toLowerCase(),
        password: cachedData.userData.password, // Ideally hashed with bcrypt
        username: `${cachedData.userData.firstName} ${cachedData.userData.lastName}`,
        role: "USER" as const,
        companyName: cachedData.userData.companyName || "",
        clientType: cachedData.userData.type
      };

      db.users.push(newUser);
      
      // Write to app-db.json using your writeDb helper
      const { writeDb } = await import("@/lib/db");
      await writeDb(db);

      // Clean cache session
      otpCache.delete(email.toLowerCase());

      return NextResponse.json({ message: "Account verified and created successfully!" }, { status: 201 });
    }

    // ----------------------------------------------------
    // PHASE 1: INITIAL REGISTRATION SUBMISSION & SEND OTP
    // ----------------------------------------------------
    if (!firstName || !lastName || !email || !password || !token) {
      return NextResponse.json({ message: "Required fields or reCAPTCHA validation missing." }, { status: 400 });
    }

    // Check Google reCAPTCHA
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;
    const googleRes = await fetch(verificationUrl, { method: "POST" });
    const googleData = await googleRes.json();

    if (!googleData.success) {
      return NextResponse.json({ message: "reCAPTCHA verification failed." }, { status: 401 });
    }

    // Check if user email address already exists in database
    const db: AppDb = await readDb();
    const existingUser = db.users?.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      return NextResponse.json({ message: "An account with this email already exists." }, { status: 400 });
    }

    // Generate a secure 6-digit string OTP numeric code
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store user signup payload values in memory for 10 minutes
    otpCache.set(email.toLowerCase(), {
      userData: { firstName, lastName, type, companyName, password },
      otp: generatedOtp,
      expires: Date.now() + 10 * 60 * 1000, // 10 minutes expiration window
    });

    // Send the verification OTP via Email layout
    const mailOptions = {
      from: `"Saampark CRM" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Verify your Saampark Account - OTP Code",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2>Welcome to Saampark Group!</h2>
          <p>Thank you for registering. Please verify your email using the 6-digit One-Time Password (OTP) code below:</p>
          <div style="font-size: 28px; font-weight: bold; padding: 15px; background-color: #f3f4f6; display: inline-block; letter-spacing: 4px; color: #2563eb; margin: 15px 0; border-radius: 6px;">
            ${generatedOtp}
          </div>
          <p>This verification code is active and valid for <strong>10 minutes</strong>. If you did not make this request, please ignore this email safely.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "OTP sent to email cleanly.", step: "OTP_VERIFICATION" }, { status: 200 });

  } catch (error) {
    console.error("Signup Route Fatal Error:", error);
    return NextResponse.json({ message: "Internal server error processing registration." }, { status: 500 });
  }
}