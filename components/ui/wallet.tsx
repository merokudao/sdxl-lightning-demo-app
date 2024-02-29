/* eslint-disable @next/next/no-img-element */
"use client";
import { ChevronDown } from "lucide-react";
import { useWallet } from "../wallet-provider";
import Image from "next/image";

const Wallet = () => {
  const { balance, address, currency } = useWallet();

  return (
    <div className="flex items-center text-lg font-semibold gap-2 bg-black text-white dark:bg-white dark:text-black py-1 px-4 rounded-lg cursor-pointer">
      <span className=""></span>
      {balance} {currency}
      <img
        height={36}
        width={36}
        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Simba&flip=true&backgroundColor=ffd5dc,d1d4f9,c0aede"
        alt="avatar"
        className="rounded-full"
      />
      {address}
      <ChevronDown />
    </div>
  );
};

export { Wallet };
