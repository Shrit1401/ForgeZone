import React from "react";
import logo from "@/public/logo.png";
import Image from "next/image";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-black text-white p-6 z-[999]">
      <div className="container mx-auto h-[30vh] flex flex-col md:flex-row justify-between items-start md:items-start">
        <div className="flex items-start space-x-3">
          <Image src={logo} alt="Logo" width={150} height={75} />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-4 md:mt-0">
          <div>
            <h4 className="text-lg font-semibold">Weekend Builds</h4>
            <ul className="text-white/60  space-y-2">
              <li>
                <Link href="./builds/ai-avatar" className="hover:text-gray-300">
                  AI Avatar Generator
                </Link>
              </li>
              <li>
                <Link href="./builds/ai-writer" className="hover:text-gray-300">
                  AI Writer w/ GPT-3
                </Link>
              </li>
              <li>
                <Link
                  href="./builds/ethereum-nft"
                  className="hover:text-gray-300"
                >
                  Ethereum NFT
                </Link>
              </li>
              <li>
                <Link
                  href="./builds/solana-web3-app"
                  className="hover:text-gray-300"
                >
                  Solana Web3 App
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold">Level Up</h4>
            <ul className="text-white/60 space-y-2">
              <li>
                <Link href="./solana-core" className="hover:text-gray-300">
                  Solana Core
                </Link>
              </li>
              <li>
                <Link
                  href="./nights-and-weekends"
                  className="hover:text-gray-300"
                >
                  Nights & Weekends
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold">About</h4>
            <ul className="text-white/60  space-y-2">
              <li>
                <Link href="./join" className="hover:text-gray-300">
                  Join us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-6 flex flex-col md:flex-row justify-between items-center text-white/60  text-sm">
        <p>© {new Date().getFullYear()} Forge Zone.</p>
        <div className="flex space-x-4">
          <Link href="./privacy" className="hover:text-gray-300">
            Privacy Policy
          </Link>
          <Link href="./tos" className="hover:text-gray-300">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
