"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

import { useEffect, useState } from "react";

const COLORS = [
  "#22c55e",
  "#eab308",
  "#ef4444",
];

export default function AdminPage() {

  const [analytics, setAnalytics] =
    useState<any>(null);

  const [departmentData, setDepartmentData] =
    useState<any[]>([]);

  const [goals, setGoals] =
    useState<any[]>([]);

  // FETCH ANALYTICS

  const fetchAnalytics = async () => {

    try {

      const res = await fetch(
        "/api/admin/analytics"
      );

      const data = await res.json();

      if (data.success) {

        setAnalytics(data.analytics);

        setDepartmentData(
          data.departmentData
        );

        setGoals(data.goals);

      }

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (!analytics) {

    return (
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">
          Loading Analytics...
        </h1>
      </main>
    );

  }

  const pieData = [

    {
      name: "Approved",
      value: analytics.approvedGoals,
    },

    {
      name: "Pending",
      value: analytics.pendingGoals,
    },

    {
      name: "Rejected",
      value: analytics.rejectedGoals,
    },

  ];

  return (

    <main className="min-h-screen bg-gray-100">

      {/* HEADER */}

      <div className="bg-white border-b shadow-sm">

        <div className="max-w-7xl mx-auto px-6 py-6">

          <h1 className="text-4xl font-bold text-gray-900">
            Analytics Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            Enterprise Goal Intelligence & Insights
          </p>

        </div>

      </div>

      {/* CONTENT */}

      <div className="max-w-7xl mx-auto p-6">

        {/* SUMMARY CARDS */}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">

          <div className="bg-white rounded-2xl shadow-md p-5 border">
            <p className="text-gray-500 text-sm">
              Total Goals
            </p>

            <h2 className="text-3xl font-bold text-blue-600 mt-2">
              {analytics.totalGoals}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5 border">
            <p className="text-gray-500 text-sm">
              Approved
            </p>

            <h2 className="text-3xl font-bold text-green-600 mt-2">
              {analytics.approvedGoals}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5 border">
            <p className="text-gray-500 text-sm">
              Pending
            </p>

            <h2 className="text-3xl font-bold text-yellow-600 mt-2">
              {analytics.pendingGoals}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5 border">
            <p className="text-gray-500 text-sm">
              Rejected
            </p>

            <h2 className="text-3xl font-bold text-red-600 mt-2">
              {analytics.rejectedGoals}
            </h2>
          </div>

        </div>

        {/* CHARTS */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

          {/* PIE CHART */}

          <div className="bg-white rounded-2xl shadow-md p-6 border">

            <h2 className="text-2xl font-bold mb-6">
              Goal Status Distribution
            </h2>

            <div className="h-[350px]">

              <ResponsiveContainer width="100%" height="100%">

                <PieChart>

                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={120}
                    label
                  >

                    {pieData.map((entry, index) => (

                      <Cell
                        key={index}
                        fill={COLORS[index]}
                      />

                    ))}

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

          </div>

          {/* BAR CHART */}

          <div className="bg-white rounded-2xl shadow-md p-6 border">

            <h2 className="text-2xl font-bold mb-6">
              Department Risk Analysis
            </h2>

            <div className="h-[350px]">

              <ResponsiveContainer width="100%" height="100%">

                <BarChart data={departmentData}>

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="department" />

                  <YAxis />

                  <Tooltip />

                  <Legend />

                  <Bar
                    dataKey="approved"
                    fill="#22c55e"
                  />

                  <Bar
                    dataKey="pending"
                    fill="#eab308"
                  />

                  <Bar
                    dataKey="rejected"
                    fill="#ef4444"
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          </div>

        </div>

      

          

                
        {/* Employee Performance Table */}

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mt-8">

        <div className="flex items-center justify-between mb-6">

         <div>

          <h2 className="text-2xl font-semibold text-gray-800">

           Employee Performance

          </h2>

             <p className="text-sm text-gray-500 mt-1">

             Goal approval insights across departments

            </p>

        </div>

       </div>

  <div className="overflow-x-auto">

    <table className="w-full border-separate border-spacing-y-3">

      <thead>

        <tr>

          <th className="text-left text-sm font-semibold text-gray-500 px-4">

            Employee

          </th>

          <th className="text-left text-sm font-semibold text-gray-500 px-4">

            Department

          </th>

          <th className="text-left text-sm font-semibold text-gray-500 px-4">

            Goal

          </th>

          <th className="text-left text-sm font-semibold text-gray-500 px-4">

            Status

          </th>

        </tr>

      </thead>

      <tbody>

      
        {goals.map((goal: any) => (

          <tr
            key={goal.id}
            className="
              bg-[#fafafa]
              hover:bg-[#f3f4f6]
              transition-all
              duration-200
            "
          >

            <td className="px-4 py-4 rounded-l-xl">

              <div className="font-medium text-gray-800">

                {goal.employee?.name}

              </div>

            </td>

            <td className="px-4 py-4 text-gray-600">

              {goal.employee?.department}

            </td>

            <td className="px-4 py-4 text-gray-700 max-w-[300px] truncate">

              {goal.title}

            </td>

            <td className="px-4 py-4 rounded-r-xl">

              <span
                className={`
                  px-3 py-1 rounded-full text-xs font-semibold

                  ${
                    goal.status === "APPROVED"
                      ? "bg-green-100 text-green-700"

                    : goal.status === "REJECTED"
                      ? "bg-red-100 text-red-700"

                    : goal.status === "DRAFT"
                      ? "bg-yellow-100 text-yellow-700"

                    : goal.status === "LOCKED"
                      ? "bg-gray-200 text-gray-700"

                    : "bg-blue-100 text-blue-700"
                  }
                `}
              >

                {goal.status}

              </span>

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>

</div>

      </div>

    </main>

  );

}