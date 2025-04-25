import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
};

const TermsOfServicePage = () => {
  return (
    <div className="mt-[6rem] mx-auto max-w-4xl px-4 mb-20">
      <h1 className="text-4xl font-bold manrope mb-8 text-center">
        Terms of Service
      </h1>

      <div className="space-y-8">
        <Card className="border border-white/10">
          <CardHeader>
            <CardTitle className="text-2xl manrope">1. Introduction</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Welcome to Forge Zone. These Terms of Service govern your use of
              our website, applications, and services. By accessing or using
              Forge Zone, you agree to be bound by these Terms.
            </p>
            <p>
              Our platform is designed to help developers build cutting-edge
              products in various domains including web3, machine learning,
              artificial intelligence, and more.
            </p>
          </CardContent>
        </Card>

        <Card className="border border-white/10">
          <CardHeader>
            <CardTitle className="text-2xl manrope">
              2. Data Collection & Usage
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              We collect and process the following data when you use Forge Zone:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Account information (username, email address)</li>
              <li>
                Profile information (name, profile picture, bio, location)
              </li>
              <li>Social media links (LinkedIn, GitHub, Twitter)</li>
              <li>Project progress and completion data</li>
              <li>Build submissions and messages</li>
              <li>Discord and Twitter integration data</li>
            </ul>
            <p>
              This data is used to provide our services, personalize your
              experience, and track your progress through builds and projects.
            </p>
          </CardContent>
        </Card>

        <Card className="border border-white/10">
          <CardHeader>
            <CardTitle className="text-2xl manrope">3. User Accounts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              You are responsible for maintaining the security of your account
              and password. Forge Zone cannot and will not be liable for any
              loss or damage from your failure to comply with this security
              obligation.
            </p>
            <p>
              You are responsible for all content posted and activity that
              occurs under your account.
            </p>
          </CardContent>
        </Card>

        <Card className="border border-white/10">
          <CardHeader>
            <CardTitle className="text-2xl manrope">
              4. User Content & Projects
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              You retain ownership of any intellectual property rights that you
              hold in content you submit, post, or display on or through Forge
              Zone.
            </p>
            <p>
              By submitting, posting, or displaying content on Forge Zone, you
              grant us a worldwide, non-exclusive, royalty-free license to use,
              reproduce, adapt, publish, translate, and distribute your content
              in any and all media.
            </p>
            <p>
              This license enables Forge Zone to showcase your progress and
              achievements, provide feedback, and improve our services.
            </p>
          </CardContent>
        </Card>

        <Card className="border border-white/10">
          <CardHeader>
            <CardTitle className="text-2xl manrope">
              5. Third-Party Services
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Forge Zone integrates with various third-party services, including
              but not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Discord for community communication and role assignments</li>
              <li>Twitter for sharing your journey and progress</li>
              <li>GitHub for code repositories and collaboration</li>
              <li>Supabase for authentication and data storage</li>
            </ul>
            <p>
              Your use of these third-party services is subject to their
              respective terms of service and privacy policies. Forge Zone is
              not responsible for the practices of these third-party services.
            </p>
          </CardContent>
        </Card>

        <Card className="border border-white/10">
          <CardHeader>
            <CardTitle className="text-2xl manrope">
              6. Certificates & Achievements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Upon completion of builds and projects, Forge Zone may issue
              certificates and other forms of recognition. These certificates:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Acknowledge your completion of specific builds</li>
              <li>May display your username and profile picture</li>
              <li>Can be downloaded and shared by you</li>
            </ul>
            <p>
              Forge Zone reserves the right to revoke certificates if we
              determine that a user has violated these Terms of Service or
              engaged in fraudulent activity.
            </p>
          </CardContent>
        </Card>

        <Card className="border border-white/10">
          <CardHeader>
            <CardTitle className="text-2xl manrope">
              7. Modifications to the Service
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Forge Zone reserves the right at any time to modify or
              discontinue, temporarily or permanently, the Service (or any part
              thereof) with or without notice.
            </p>
            <p>
              We shall not be liable to you or to any third party for any
              modification, suspension, or discontinuance of the Service.
            </p>
          </CardContent>
        </Card>

        <Card className="border border-white/10">
          <CardHeader>
            <CardTitle className="text-2xl manrope">8. Termination</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Forge Zone may terminate your access to all or any part of the
              Service at any time, with or without cause, with or without
              notice, effective immediately.
            </p>
            <p>
              If you wish to terminate your account, you may simply discontinue
              using the Service, or contact us for account deletion.
            </p>
          </CardContent>
        </Card>

        <Card className="border border-white/10">
          <CardHeader>
            <CardTitle className="text-2xl manrope">
              9. Changes to Terms
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Forge Zone reserves the right to update and change these Terms of
              Service from time to time without notice. Continued use of the
              Service after any such changes shall constitute your consent to
              such changes.
            </p>
          </CardContent>
        </Card>

        <Card className="border border-white/10">
          <CardHeader>
            <CardTitle className="text-2xl manrope">
              10. Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              If you have any questions about these Terms of Service, please
              contact us:
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
            <Link href="/privacy" className="text-blue-400 hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
