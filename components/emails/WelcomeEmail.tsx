import {
  Body,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Text,
} from "@react-email/components";
import * as React from "react";

interface WelcomeEmailProps {
  userFirstName?: string;
}

export const WelcomeEmail = ({
  userFirstName = "there",
}: WelcomeEmailProps) => {
  const previewText = `Welcome to Forge Zone — glad to have you on board!`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body>
        <Text>Hey {userFirstName},</Text>

        <Img
          src={`https://i.postimg.cc/GhWTd7CT/image.png`}
          alt="Welcome to Forge Zone"
          style={{
            objectFit: "cover",
          }}
        />

        <Text>Welcome to Forge Zone — glad to have you on board!</Text>

        <Text>
          Check out our latest build:{" "}
          <strong>Create your own Spotify AI Rewind.</strong> It's live now.
        </Text>

        <Text>
          And remember: it's easier to quit than to build — but growth only
          happens when you keep going.
        </Text>

        <Text>
          <em>
            "The people who are crazy enough to think they can change the world
            are the ones who do."
          </em>{" "}
          — Steve Jobs
        </Text>

        <Text>— Shrit</Text>

        <Text>
          <Link
            href={`${
              process.env.NEXT_PUBLIC_NEXT_URL || "http://localhost:3000"
            }/builds`}
          >
            Start Building
          </Link>
        </Text>
      </Body>
    </Html>
  );
};

export default WelcomeEmail;
