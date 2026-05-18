"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {

    // EMPLOYEE LOGIN
    if (
      email === "employee@alignx.com" &&
      password === "employee123"
    ) {

      localStorage.setItem(
        "user",
        JSON.stringify({
          id: "1",
          role: "EMPLOYEE",
          email: "employee@alignx.com",
        })
      );

      router.push("/employee");
    }

    // MANAGER LOGIN
    else if (
      email === "manager@alignx.com" &&
      password === "manager123"
    ) {

      localStorage.setItem(
        "user",
        JSON.stringify({
          id: "2",
          role: "MANAGER",
          email: "manager@alignx.com",
        })
      );

      router.push("/manager");
    }

    // ADMIN LOGIN
    else if (
      email === "admin@alignx.com" &&
      password === "admin123"
    ) {

      localStorage.setItem(
        "user",
        JSON.stringify({
          id: "3",
          role: "ADMIN",
          email: "admin@alignx.com",
        })
      );

      router.push("/admin");
    }

    else {
      alert("Invalid credentials");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-6">

      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            AlignX
          </h1>

          <p className="text-gray-500 mt-2">
            Intelligent Performance Management Platform
          </p>
        </div>

        <div className="space-y-5">

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-black text-white p-3 rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300"
          >
            Login
          </button>
        </div>

        <div className="mt-8 bg-gray-50 border border-gray-200 rounded-2xl p-4 text-sm text-gray-700">

          <p className="font-bold mb-3 text-gray-900">
            Demo Accounts
          </p>

          <div className="space-y-2">

            <div>
              <span className="font-semibold">
                Employee:
              </span>
              <br />
              employee@alignx.com / employee123
            </div>

            <div>
              <span className="font-semibold">
                Manager:
              </span>
              <br />
              manager@alignx.com / manager123
            </div>

            <div>
              <span className="font-semibold">
                Admin:
              </span>
              <br />
              admin@alignx.com / admin123
            </div>

          </div>
        </div>

      </div>

    </main>
  );
}