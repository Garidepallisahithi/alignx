"use client";

import { useRouter } from "next/navigation";

export default function LoginPage() {

  const router = useRouter();

  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md">

        <h1 className="text-4xl font-bold text-center text-gray-900">
          ALIGNX
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Enterprise Goal Management System
        </p>

        <div className="space-y-4">

          {/* Employee Login */}

          <button

            onClick={() => {

              localStorage.setItem(

                "user",

                JSON.stringify({

                  id: "demo-user",

                  role: "EMPLOYEE",

                  name: "Demo Employee",

                })

              );

              router.push("/employee");

            }}

            className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition"

          >

            Employee Login

          </button>

          {/* Manager Login */}

          <button

            onClick={() => {

              localStorage.setItem(

                "user",

                JSON.stringify({

                  id: "demo-manager",

                  role: "MANAGER",

                  name: "Demo Manager",

                })

              );

              router.push("/manager");

            }}

            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"

          >

            Manager Login

          </button>

          {/* Admin Login */}

          <button

            onClick={() => {

              localStorage.setItem(

                "user",

                JSON.stringify({

                  id: "demo-admin",

                  role: "ADMIN",

                  name: "Demo Admin",

                })

              );

              router.push("/admin");

            }}

            className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition"

          >

            Admin Login

          </button>

        </div>

      </div>

    </div>

  );

}