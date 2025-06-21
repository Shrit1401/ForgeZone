import { NextRequest, NextResponse } from "next/server";
import { sendWelcomeEmail } from "@/lib/email/email.service";

export async function POST(request: NextRequest) {
  try {
    const { email, firstName } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const result = await sendWelcomeEmail({
      userEmail: email,
      userFirstName: firstName,
    });

    if (result.success) {
      return NextResponse.json(
        { message: "Welcome email sent successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "Failed to send welcome email", details: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error in test email route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
