import React from "react";
import { ArrowRightIcon } from "@heroicons/react/16/solid";
import Btn from "@/components/Btn";
import Link from "next/link";
// 0HAyc3J
const Home = () => {
  return (
    <div>
      {/* TODO  https://i.imgur.com/Kw9TRZI.png or https://i.imgur.com/owFuEkI.png */}

      <section className="h-screen w-full sm:bg-[url('https://i.imgur.com/JDm2v1s.png')] bg-[url('https://i.imgur.com/0OpDE09.png')] flex flex-col items-center justify-center grayscale-100 bg-cover bg-center bg-no-repeat relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_70%,rgba(0,0,0,1)_140%)] z-0 bg-fixed" />
        <Link
          href="/notes/raise"
          className="border border-white/[0.08] backdrop-blur bg-gradient-to-r from-white/10 to-white/5 text-white manrope font-bold px-4 py-2 rounded-full z-10 hover:opacity-55 transition-all duration-300 cursor-pointer"
        >
          Forge Zone raises $10M{" "}
          <ArrowRightIcon className="h-4 w-4 inline-block" />
        </Link>
        <h1 className="text-5xl sm:text-7xl manrope font-[800] text-white text-center z-10 relative">
          Dare to dream. <br />
          Dare to build.
        </h1>
        <p className="text-xl manrope font-normal  text-white/90 text-center z-10 relative mt-4 w-[80%] sm:w-[50%]">
          We're building a new path for the world's best builders to come
          together, explore promising domains and ship meaningful
        </p>
        <Btn title="Explore" className="mt-8" link="#" size="large" />
      </section>
      <section className="h-screen w-full bg-fixed bg-[url('https://i.imgur.com/kxz4d31.png')] flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat relative">
        {/* https://i.imgur.com/QlAPkeP.jpeg */}
        <h1 className="text-5xl sm:text-7xl manrope font-[800] text-white text-center z-10 relative">
          Build cutting edge <br /> products in various <br /> domains.
        </h1>
        <p className="text-xl manrope font-normal text-white/90 text-center z-10 relative mt-4 w-[80%] sm:w-[50%]">
          web3, machine learning, artificial intelligence and other promising
          domains like robotics, no-code and music coming seon.
        </p>
        <Btn
          title="Explore"
          type="outline"
          className="mt-8"
          link="#"
          size="large"
        />
      </section>
      <section className="h-screen w-full bg-fixed bg-[url('https://i.imgur.com/UgJsxGo.jpeg')] flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat relative">
        <h1 className="text-5xl sm:text-7xl manrope font-[800] text-white text-center z-10 relative">
          See how far you can get <br /> in just one weekend.
        </h1>
        <p className="text-xl manrope font-normal text-white/90 text-center z-10 relative mt-4 w-[80%] sm:w-[50%]">
          A weekend is all it takes to activate yourself. All projects are
          specifically designed to be finished over a weekend with your besties.
        </p>
        <Btn
          title="See How Far You Can Get"
          className="mt-8"
          link="#"
          type="outline"
          size="large"
        />
      </section>
      <section className="h-screen w-full bg-fixed bg-[url('https://i.imgur.com/dPDjmlV.png')] flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat relative">
        <h1 className="text-5xl sm:text-7xl manrope font-[800] text-white text-center z-10 relative">
          Take it to the next level.
        </h1>
        <p className="text-xl manrope font-normal text-white/90 text-center z-10 relative mt-4 w-[80%] sm:w-[50%]">
          Join a select group of builders that are working on their dreams on
          nights & weekends. Learn from those that have done it. Build with
          those that don't give up.
        </p>
        <Btn
          title="Request To Join"
          className="mt-8"
          link="#"
          type="outline"
          size="large"
        />
      </section>
      <section className="h-screen w-full bg-fixed bg-[url('https://i.imgur.com/L5sZTTr.jpeg')] flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat relative">
        <h1 className="text-5xl sm:text-7xl manrope font-[800] text-white text-center z-10 relative">
          Build online. Build IRL.
        </h1>
        <p className="text-xl manrope font-normal text-white/90 text-center z-10 relative mt-4 w-[80%] sm:w-[50%]">
          Join 124,000+ builders around the world hacking on cool shit. Make
          friends. Set ambitious goals and climb your inner mountain. You got
          this!
        </p>
        <Btn
          title="'Sup on the cord"
          className="mt-8"
          link="#"
          type="outline"
          size="large"
        />
      </section>
    </div>
  );
};

export default Home;
