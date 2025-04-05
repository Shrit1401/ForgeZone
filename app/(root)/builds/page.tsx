import Btn from "@/components/Btn";
import BuildsCard from "@/components/builds/BuildsCard";
import React from "react";

const BuildsPage = () => {
  // Sample build data
  const builds = [
    {
      title: "Intro to Solidity: Ship an Ethereum dApp",
      description:
        "A 2-week project where you'll learn some Solidity, write a smart contract to the blockchain, and build a React frontend.",
      building: "59.5k building",
      image: "https://i.imgur.com/3C2zb5n.png",
      profiles: ["/avatar1.png", "/avatar2.png", "/avatar3.png"],
    },
    {
      title: "Build your own AI Avatar generator",
      description:
        "Seen those cool AI avatars on Twitter? This weekend build guides you to build a React app that allows anyone to generate their own AI avatar.",
      building: "6.6k building",
      image: "https://i.imgur.com/3C2zb5n.png",
      profiles: ["/avatar1.png", "/avatar2.png", "/avatar3.png"],
    },
    {
      title: "Build your own Ethereum NFT Collection",
      description:
        "If you're a developer curious about NFTs, this is perfect. Programmatically generate your own NFT collection, write & deploy a smart contract.",
      building: "32.8k building",
      image: "https://i.imgur.com/3C2zb5n.png",
      profiles: ["/avatar1.png", "/avatar2.png", "/avatar3.png"],
    },
    {
      title: "Create and Deploy your first Solana dApp",
      description:
        "This is a very nice and cool async weekend project for curious devs that want to hack around with Solana. You'll learn Anchor & Rust.",
      building: "21.7k building",
      image: "https://i.imgur.com/3C2zb5n.png",
      profiles: ["/avatar1.png", "/avatar2.png", "/avatar3.png"],
    },
    {
      title: "Build a DAO",
      description:
        "DAOs are taking over. Build one yourself for fun. Maybe it's a meme DAO for your friends. Maybe it's a DAO that aims to change the world.",
      building: "18.0k building",
      image: "https://i.imgur.com/3C2zb5n.png",
      profiles: ["/avatar1.png", "/avatar2.png", "/avatar3.png"],
    },
    {
      title: "Ship an NFT Collection on Solana",
      description:
        "This is a chill, weekend project for any curious dev that wants to hack together some NFTs on Solana alongside a React frontend.",
      building: "13.5k building",
      image: "https://i.imgur.com/3C2zb5n.png",
      profiles: ["/avatar1.png", "/avatar2.png", "/avatar3.png"],
    },
  ];

  return (
    <div className="mt-[6rem] mx-auto max-w-7xl px-4 mb-10 ">
      {/* my builds */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold manrope">My Builds</h2>
        <div className="flex flex-wrap mt-6">
          <BuildsCard
            title="Intro to Solidity: Ship an Ethereum dApp"
            description="A 2-week project where you'll learn some Solidity, write a smart contract to the blockchain, and build a React frontend."
            imageUrl="https://i.imgur.com/3C2zb5n.png"
            link={""}
            mode={"user"}
          />
        </div>
      </section>
      <section>
        <h2 className="text-3xl font-bold manrope">My Builds</h2>
        <div className="flex flex-wrap mt-6">
          {builds.map((build, index) => (
            <BuildsCard
              key={index}
              title={build.title}
              description={build.description}
              imageUrl={build.image}
              link="#"
              mode="unknown"
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default BuildsPage;
