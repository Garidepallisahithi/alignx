"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EmployeePage() {

  const router = useRouter();

  useEffect(() => {

    router.push("/employee/goals");

  }, [router]);

  return (

    <div className="flex items-center justify-center h-screen text-2xl font-semibold">

      Redirecting...

    </div>

  );

}