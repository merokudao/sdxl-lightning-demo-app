"use client";
import React, { useReducer, createContext, useContext } from "react";
import { toast } from "react-toastify";

const TRANSACTION_COST = (Number(process.env.NEXT_PUBLIC_TRANSACTION_COST) ??
  0.001) as number;
const CURRENCY_TYPE = process.env.NEXT_PUBLIC_WALLET_CURRENCY ?? "USD";
const WALLET_ADDRESS = process.env.NEXT_PUBLIC_WALLET_ADDRESS ?? "0x00000000";
const PRECISION = Number(process.env.NEXT_PUBLIC_PRECISION ?? 4);

interface WalletContextValue {
  balance: number;
  currency: string;
  transactionCost: number;
  address: string;
  executeOperation: () => void;
  canExecuteOperation: () => boolean;
}

const WalletContext = createContext<WalletContextValue>({
  balance: Number(process.env.NEXT_PUBLIC_WALLET_BALANCE) ?? 0,
  currency: CURRENCY_TYPE,
  transactionCost: TRANSACTION_COST,
  address: WALLET_ADDRESS,
  executeOperation: () => {},
  canExecuteOperation: () => false,
});

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "DEDUCT":
      return {
        ...state,
        balance: Number(
          Number(state.balance) - Number(TRANSACTION_COST)
        ).toFixed(PRECISION),
      };
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
    balance: Number(process.env.NEXT_PUBLIC_WALLET_BALANCE) ?? 0,
  });

  const insufficientFundToast = () =>
    toast.error(" Insufficient Balance", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const executeOperation = () => {
    if (state.balance > TRANSACTION_COST) {
      dispatch({ type: "DEDUCT" });
    } else {
      insufficientFundToast();
    }
  };

  const canExecuteOperation = () => {
    const canExecute = state.balance > TRANSACTION_COST;

    if (!canExecute) {
      insufficientFundToast();
    }

    return canExecute;
  };

  const value = {
    balance: state.balance,
    currency: CURRENCY_TYPE,
    transactionCost: TRANSACTION_COST,
    address: WALLET_ADDRESS,
    executeOperation,
    canExecuteOperation,
  };

  return (
    <WalletContext.Provider {...props} value={value}>
      {children}
    </WalletContext.Provider>
  );
}

export { WalletProvider, useWallet };
