import React from "react";
import { ArrowRightIcon } from "@heroicons/react/16/solid";
import Btn from "@/components/Btn";
import Link from "next/link";
// 0HAyc3J
const Home = () => {
  return (
    <div>
      {/* Landing Section */}
      <section className="h-screen w-full sm:bg-[url('https://i.imgur.com/JDm2v1s.png')] bg-[url('https://i.imgur.com/0OpDE09.png')] flex flex-col items-center justify-center grayscale-100 bg-cover bg-center bg-no-repeat relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_70%,rgba(0,0,0,1)_140%)] z-0 bg-fixed" />
        <div className="border border-white/[0.08] backdrop-blur bg-gradient-to-r from-white/10 to-white/5 text-white manrope font-bold px-4 py-2 rounded-full z-10 hover:opacity-55 transition-all duration-300 cursor-pointer">
          100% Free. For dreamers who build.
        </div>
        <h1 className="text-5xl sm:text-7xl manrope font-[800] text-white text-center z-10 relative">
          Dare to dream. <br />
          Dare to build.
        </h1>
        <p className="text-xl manrope font-normal text-white/90 text-center z-10 relative mt-4 w-[80%] sm:w-[50%]">
          A playground for developers to build real projects, explore AI and web
          dev, and grow by doing—not just watching.
        </p>
        <Btn title="Explore" className="mt-8" link="/builds" size="large" />
      </section>

      {/* Section: Build in Emerging Domains */}
      <section className="h-screen w-full bg-fixed bg-[url('https://i.imgur.com/kxz4d31.png')] flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat relative">
        <h1 className="text-5xl sm:text-7xl manrope font-[800] text-white text-center z-10 relative">
          Build in trending <br /> tech domains.
        </h1>
        <p className="text-xl manrope font-normal text-white/90 text-center z-10 relative mt-4 w-[80%] sm:w-[50%]">
          From AI to web3, ML to APIs—we design projects that get you working
          with what’s hot and in-demand right now.
        </p>
        <Btn
          title="Explore"
          type="outline"
          className="mt-8"
          link="/builds"
          size="large"
        />
      </section>

      {/* Section: Weekend Builders */}
      <section className="h-screen w-full bg-fixed bg-[url('https://i.imgur.com/UgJsxGo.jpeg')] flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat relative">
        <h1 className="text-5xl sm:text-7xl manrope font-[800] text-white text-center z-10 relative">
          Ship a project <br /> in one weekend.
        </h1>
        <p className="text-xl manrope font-normal text-white/90 text-center z-10 relative mt-4 w-[80%] sm:w-[50%]">
          Our builds are made to be completed in a weekend. Grab your besties,
          pick a track, and start building.
        </p>
        <Btn
          title="See Weekend Builds"
          className="mt-8"
          link="/builds"
          type="outline"
          size="large"
        />
      </section>

      {/* Section: Advanced Builds */}
      <section className="h-screen w-full bg-fixed bg-[url('https://i.imgur.com/dPDjmlV.png')] flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat relative">
        <h1 className="text-5xl sm:text-7xl manrope font-[800] text-white text-center z-10 relative">
          Take it to <br /> the next level.
        </h1>
        <p className="text-xl manrope font-normal text-white/90 text-center z-10 relative mt-4 w-[80%] sm:w-[50%]">
          Ready to go deeper? Join our private group of skilled builders working
          on ambitious, advanced projects.
        </p>
        <Btn
          title="Request to Join"
          className="mt-8"
          link="https://tally.so/r/w2VNgV"
          type="outline"
          size="large"
          target="_blank"
        />
      </section>

      {/* Section: Global Builder Community */}
      <section className="h-screen w-full bg-fixed bg-[url('https://i.imgur.com/L5sZTTr.jpeg')] flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat relative">
        <h1 className="text-5xl sm:text-7xl manrope font-[800] text-white text-center z-10 relative">
          Build online. <br /> Build IRL.
        </h1>
        <p className="text-xl manrope font-normal text-white/90 text-center z-10 relative mt-4 w-[80%] sm:w-[50%]">
          Join a global crew of builders. Hack on cool stuff, grow your network,
          and push your limits with every build.
        </p>
        <Btn
          title="Hop on Discord"
          className="mt-8"
          link="https://discord.gg/e3RfmAVAXV"
          type="outline"
          target="_blank"
          size="large"
        />
      </section>
    </div>
  );
};

export default Home;
