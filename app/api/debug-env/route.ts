import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const envCheck = {
      hasResendApiKey: !!process.env.RESEND_API_KEY,
      resendApiKeyLength: process.env.RESEND_API_KEY?.length || 0,
      hasNextUrl: !!process.env.NEXT_PUBLIC_NEXT_URL,
      nextUrl: process.env.NEXT_PUBLIC_NEXT_URL,
      nodeEnv: process.env.NODE_ENV,
      // Don't expose the actual API key for security
    };

    console.log("Environment check:", envCheck);

    return NextResponse.json({
      message: "Environment variables check",
      data: envCheck,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error in debug env route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
