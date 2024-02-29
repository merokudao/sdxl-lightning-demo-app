"use client";
import React from "react";
import { ThemeProvider } from "./theme-provider";
import { WalletProvider } from "./wallet-provider";

export const Providers = ({ children }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <WalletProvider>{children}</WalletProvider>
    </ThemeProvider>
  );
};
