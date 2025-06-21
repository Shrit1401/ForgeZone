import { Resend } from "resend";
import { render } from "@react-email/render";
import WelcomeEmail from "@/components/emails/WelcomeEmail";

const resendApiKey = process.env.RESEND_API_KEY;

const resend = resendApiKey ? new Resend(resendApiKey) : null;

if (!resend) {
  console.warn("RESEND_API_KEY is not set. Email sending will be disabled.");
}

export interface SendWelcomeEmailParams {
  userEmail: string;
  userFirstName?: string;
}

export interface CreateContactParams {
  email: string;
  firstName?: string;
  lastName?: string;
  unsubscribed?: boolean;
  audienceId: string;
}

export async function sendWelcomeEmail({
  userEmail,
  userFirstName,
}: SendWelcomeEmailParams) {
  if (!resend) {
    console.error("Resend is not initialized. Please set RESEND_API_KEY.");
    return {
      success: false,
      error: "Email service is not configured.",
    };
  }
  try {
    // Extract first name from email if not provided
    const firstName = userFirstName || userEmail.split("@")[0];

    // Render the email template
    const emailHtml = await render(
      WelcomeEmail({
        userFirstName: firstName,
      })
    );

    // Send the email
    const { data, error } = await resend.emails.send({
      from: "ForgeZone <shrit@forgezone.dev>", // You'll need to update this with your verified domain
      to: [userEmail],
      subject: "Welcome to Builder! 🚀",
      html: emailHtml,
    });

    if (error) {
      console.error("Error sending welcome email:", error);
      return { success: false, error };
    }

    console.log("Welcome email sent successfully:", data);
    return { success: true, data };
  } catch (error) {
    console.error("Unexpected error sending welcome email:", error);
    return { success: false, error };
  }
}

export async function createContact({
  email,
  firstName,
  lastName,
  unsubscribed = false,
  audienceId,
}: CreateContactParams) {
  if (!resend) {
    console.error("Resend is not initialized. Please set RESEND_API_KEY.");
    return {
      success: false,
      error: "Email service is not configured.",
    };
  }
  try {
    const { data, error } = await resend.contacts.create({
      email,
      firstName,
      lastName,
      unsubscribed,
      audienceId,
    });

    if (error) {
      console.error("Error creating contact:", error);
      return { success: false, error };
    }

    console.log("Contact created successfully:", data);
    return { success: true, data };
  } catch (error) {
    console.error("Unexpected error creating contact:", error);
    return { success: false, error };
  }
}
