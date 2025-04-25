import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  robots: {
    index: true,
    follow: true,
  },
};

const PrivacyPolicyPage = () => {
  return (
    <div className="mt-[6rem] mx-auto max-w-4xl px-4 mb-20">
      <h1 className="text-4xl font-bold manrope mb-8 text-center">
        Privacy Policy
      </h1>

      <div className="space-y-8">
        <Card className="border border-white/10">
          <CardHeader>
            <CardTitle className="text-2xl manrope">1. Introduction</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              At Forge Zone, we respect your privacy and are committed to
              protecting your personal data. This Privacy Policy explains how we
              collect, use, disclose, and safeguard your information when you
              use our platform.
            </p>
            <p>
              Please read this Privacy Policy carefully. By using Forge Zone,
              you consent to the practices described in this policy.
            </p>
          </CardContent>
        </Card>

        <Card className="border border-white/10">
          <CardHeader>
            <CardTitle className="text-2xl manrope">
              2. Information We Collect
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              We collect several types of information from and about users of
              our platform:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Personal Information:</strong> Name, email address,
                profile picture
              </li>
              <li>
                <strong>Profile Data:</strong> Username, bio, location, skills,
                work preferences
              </li>
              <li>
                <strong>Social Media Information:</strong> If you choose to link
                accounts, we collect profile data from GitHub, Discord, Twitter,
                etc.
              </li>
              <li>
                <strong>Content Data:</strong> Projects, builds, notes,
                messages, and other content you create
              </li>
              <li>
                <strong>Usage Data:</strong> Information about how you use our
                platform, including pages visited, features used, time spent
              </li>
              <li>
                <strong>Technical Data:</strong> IP address, browser type,
                device information, cookies
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border border-white/10">
          <CardHeader>
            <CardTitle className="text-2xl manrope">
              3. How We Collect Your Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>We collect information through:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Direct Interactions:</strong> Information you provide
                when creating an account, completing your profile, or submitting
                content
              </li>
              <li>
                <strong>Automated Technologies:</strong> Cookies, server logs,
                and similar technologies
              </li>
              <li>
                <strong>Third-Party Services:</strong> When you connect social
                media accounts or use OAuth authentication
              </li>
              <li>
                <strong>API Integrations:</strong> When you use our platform to
                connect with third-party services
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border border-white/10">
          <CardHeader>
            <CardTitle className="text-2xl manrope">
              4. How We Use Your Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>We use your information for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide and maintain our platform</li>
              <li>
                To personalize your experience and deliver relevant content
              </li>
              <li>To track your progress through builds and projects</li>
              <li>To issue certificates and recognize achievements</li>
              <li>
                To communicate with you about platform updates, features, and
                support
              </li>
              <li>To analyze usage patterns and improve our platform</li>
              <li>To protect the security and integrity of our platform</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border border-white/10">
          <CardHeader>
            <CardTitle className="text-2xl manrope">
              5. Information Sharing and Disclosure
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>We may share your information in the following situations:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>With Your Consent:</strong> When you explicitly choose
                to share your information
              </li>
              <li>
                <strong>Service Providers:</strong> Third-party vendors who
                perform services on our behalf (hosting, analytics, payment
                processing)
              </li>
              <li>
                <strong>Third-Party Integrations:</strong> When you connect with
                services like GitHub, Discord, or Twitter
              </li>
              <li>
                <strong>Legal Requirements:</strong> When required by law or to
                protect our rights
              </li>
              <li>
                <strong>Business Transfers:</strong> In connection with a
                merger, acquisition, or sale of assets
              </li>
            </ul>
            <p>We do not sell your personal information to third parties.</p>
          </CardContent>
        </Card>

        <Card className="border border-white/10">
          <CardHeader>
            <CardTitle className="text-2xl manrope">6. Data Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              We implement appropriate security measures to protect your
              personal information from unauthorized access, alteration,
              disclosure, or destruction. These measures include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Encryption of sensitive data</li>
              <li>Secure authentication practices</li>
              <li>Regular security assessments</li>
              <li>Limited access to personal information</li>
            </ul>
            <p>
              However, no method of transmission over the internet or electronic
              storage is 100% secure. We cannot guarantee absolute security of
              your data.
            </p>
          </CardContent>
        </Card>

        <Card className="border border-white/10">
          <CardHeader>
            <CardTitle className="text-2xl manrope">
              7. Your Data Rights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Depending on your location, you may have certain rights regarding
              your personal information:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access and view your personal information</li>
              <li>Correct inaccurate or incomplete information</li>
              <li>Delete your personal information</li>
              <li>Object to or restrict certain processing activities</li>
              <li>
                Data portability (receiving your data in a structured format)
              </li>
              <li>Withdraw consent for future processing</li>
            </ul>
            <p>
              To exercise these rights, please contact us using the information
              provided in the "Contact Us" section.
            </p>
          </CardContent>
        </Card>

        <Card className="border border-white/10">
          <CardHeader>
            <CardTitle className="text-2xl manrope">
              8. Cookies and Tracking Technologies
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Forge Zone uses cookies and similar tracking technologies to
              collect information about your browsing activities. These
              technologies help us:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Keep you logged in and remember your preferences</li>
              <li>Understand how you use our platform</li>
              <li>Improve our services and user experience</li>
              <li>Provide personalized content and recommendations</li>
            </ul>
            <p>
              You can control cookies through your browser settings. However,
              disabling certain cookies may limit your ability to use some
              features of our platform.
            </p>
          </CardContent>
        </Card>

        <Card className="border border-white/10">
          <CardHeader>
            <CardTitle className="text-2xl manrope">
              9. Children's Privacy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Forge Zone is not intended for children under 13 years of age. We
              do not knowingly collect personal information from children under
              13. If you believe we have collected information from a child
              under 13, please contact us immediately.
            </p>
          </CardContent>
        </Card>

        <Card className="border border-white/10">
          <CardHeader>
            <CardTitle className="text-2xl manrope">
              10. Changes to This Privacy Policy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              We may update this Privacy Policy from time to time. The updated
              version will be indicated by an updated "Last updated" date. We
              encourage you to review this Privacy Policy periodically to stay
              informed about how we are protecting your information.
            </p>
          </CardContent>
        </Card>

        <Card className="border border-white/10">
          <CardHeader>
            <CardTitle className="text-2xl manrope">11. Contact Us</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              If you have questions or concerns about this Privacy Policy or our
              data practices, please contact us:
            </p>
            <div className="flex flex-col gap-2">
              <p>
                <span className="font-medium">Discord:</span>{" "}
                <Link
                  href="https://discord.gg/e3RfmAVAXV"
                  className="text-blue-400 hover:underline"
                  target="_blank"
                >
                  Join our Discord
                </Link>
              </p>
              <p>
                <span className="font-medium">Email:</span> shrit1401@gmail.com
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-white/60 mt-10">
          <p>Last updated: April 23, 2025</p>
          <div className="mt-4">
            <Link href="/" className="text-blue-400 hover:underline">
              Return to Homepage
            </Link>
            {" | "}
            <Link href="/terms" className="text-blue-400 hover:underline">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
