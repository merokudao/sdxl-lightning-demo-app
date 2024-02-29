"use client";
import React, { useReducer, createContext, useContext } from "react";

const TRANSACTION_COST = (process.env.NEXT_PUBLIC_TRANSACTION_COST ??
  0.001) as number;
const CURRENCY_TYPE = process.env.NEXT_PUBLIC_WALLET_CURRENCY;
const WALLET_ADDRESS = process.env.NEXT_PUBLIC_WALLET_ADDRESS;

interface WalletContextValue {
  balance: number;
  currency: string;
  transactionCost: number;
  address: string;
  executeOperation: () => void;
}

const WalletContext = createContext<WalletContextValue | {}>({});

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "DEDUCT":
      return { ...state, balance: state.balance - TRANSACTION_COST };
    default:
      return state;
  }
};

const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context as WalletContextValue;
};

function WalletProvider({ children, ...props }) {
  const [state, dispatch] = useReducer(reducer, {
    balance: process.env.NEXT_PUBLIC_WALLET_BALANCE,
  });

  const executeOperation = () => {
    if (state.balance > TRANSACTION_COST) {
      dispatch({ type: "DEDUCT" });
    } else {
      alert("Insufficient funds");
    }
  };

  const value = {
    balance: state.balance,
    currency: CURRENCY_TYPE,
    transactionCost: TRANSACTION_COST,
    address: WALLET_ADDRESS,
    executeOperation,
  };

  return (
    <WalletContext.Provider {...props} value={value}>
      {children}
    </WalletContext.Provider>
  );
}

export { WalletProvider, useWallet };
