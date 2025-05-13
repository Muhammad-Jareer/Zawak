import React, { useState } from "react";
import EasypaisaForm from "../components/EasypaisaForm";
import JazzCashForm from "../components/JazzCashForm";
import BankAccountForm from "../components/BankAccountForm";
import { useSearchParams } from "react-router-dom";

const PayOnlineMain = () => {
  const [tab, setTab] = useState("easypaisa");
  
  const searchParams = useSearchParams();
  const orderId = searchParams[0].get("orderId");

  return (
    <section className="container md:px-4 mt-16 flex flex-col gap-12">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-primary-700">Pay Online</h1>
        <p className="mt-2 text-lg text-gray-600">
          Upload your payment proof and fill in the details to proceed.
        </p>
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={() => setTab("easypaisa")}
          className={`px-4 py-2 rounded ${tab === "easypaisa" ? "bg-primary-600 text-white" : "bg-gray-200"}`}
        >
          EasyPaisa
        </button>
        <button
          onClick={() => setTab("jazzcash")}
          className={`px-4 py-2 rounded ${tab === "jazzcash" ? "bg-primary-600 text-white" : "bg-gray-200"}`}
        >
          JazzCash
        </button>
        <button
          onClick={() => setTab("bankaccount")}
          className={`px-4 py-2 rounded ${tab === "bankaccount" ? "bg-primary-600 text-white" : "bg-gray-200"}`}
        >
          Bank Account
        </button>
      </div>

      {tab === "easypaisa" ? <EasypaisaForm orderId={orderId} /> : (tab === "jazzcash") ? <JazzCashForm orderId={orderId} /> : <BankAccountForm orderId={orderId} /> }
    </section>
  );
};

export default PayOnlineMain;
