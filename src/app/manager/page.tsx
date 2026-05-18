"use client";

import { useEffect, useState } from "react";

import {
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaSearch,
  FaDownload,
  FaLightbulb,
  FaChartLine,
  FaExclamationTriangle,
  FaCircle,
} from "react-icons/fa";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

export default function ManagerPage() {

  const [goals, setGoals] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("ALL");
  const [loading, setLoading] = useState(true);

  // FETCH GOALS

  const fetchGoals = async () => {

    try {

      const res = await fetch("/api/goals/list");

      const data = await res.json();

      if (data.success) {

        setGoals(data.goals);

      }

      setLoading(false);

    }

    catch (error) {

      console.log(error);

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchGoals();

  }, []);

  // NORMALIZE TITLE CASE

  const toTitleCase = (text: string) => {

    if (!text) return "";

    return text
      .toLowerCase()
      .split(" ")
      .map(
        (word) =>
          word.charAt(0).toUpperCase() +
          word.slice(1)
      )
      .join(" ");

  };

  // UPDATE STATUS

  const updateStatus = async (
    goalId: string,
    status: string
  ) => {

    const confirmAction = window.confirm(
      `Are you sure you want to ${status.toLowerCase()} this goal?`
    );

    if (!confirmAction) return;

    try {

      const res = await fetch(
        "/api/goals/update-status",
        {

          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            goalId,
            status,
          }),

        }
      );

      const data = await res.json();

      if (data.success) {

        fetchGoals();

      }

    }

    catch (error) {

      console.log(error);

    }

  };

  // EXPORT PDF

  const exportPDF = () => {

    const doc = new jsPDF();

    doc.setFontSize(20);

    doc.text(
      "AlignX Manager Goals Report",
      14,
      20
    );

    const tableData = goals.map((goal) => [

      goal.title,
      goal.employee?.name,
      goal.employee?.department,
      goal.status,
      goal.target,
      `${goal.weightage}%`,

    ]);

    autoTable(doc, {

      head: [[
        "Goal",
        "Employee",
        "Department",
        "Status",
        "Target",
        "Weightage",
      ]],

      body: tableData,

      startY: 30,

    });

    doc.save("alignx-report.pdf");

  };

  // EXPORT EXCEL

  const exportExcel = () => {

    const exportData = goals.map((goal) => ({

      Goal: goal.title,
      Employee: goal.employee?.name,
      Department: goal.employee?.department,
      Status: goal.status,
      Target: goal.target,
      Weightage: `${goal.weightage}%`,

    }));

    const worksheet =
      XLSX.utils.json_to_sheet(exportData);

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Goals"
    );

    XLSX.writeFile(
      workbook,
      "alignx-report.xlsx"
    );

  };

  // FILTER

  const filteredGoals = goals.filter((goal) => {

    const matchesSearch =
      goal.employee?.name
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL"
        ? true
        : goal.status === statusFilter;

    return matchesSearch && matchesStatus;

  });

  // COUNTS

  const approvedCount = goals.filter(
    (g) => g.status === "APPROVED"
  ).length;

  const pendingCount = goals.filter(
    (g) =>
      g.status === "DRAFT" ||
      g.status === "SUBMITTED"
  ).length;

  const rejectedCount = goals.filter(
    (g) => g.status === "REJECTED"
  ).length;

  // STATUS COLORS

  const getStatusStyle = (status: string) => {

    switch (status) {

      case "APPROVED":

        return "bg-green-100 text-green-700 border border-green-200";

      case "REJECTED":

        return "bg-red-100 text-red-700 border border-red-200";

      case "SUBMITTED":

        return "bg-blue-100 text-blue-700 border border-blue-200";

      case "LOCKED":

        return "bg-gray-200 text-gray-700 border border-gray-300";

      default:

        return "bg-yellow-100 text-yellow-700 border border-yellow-200";

    }

  };

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-[#f6f7fb]">

        <div className="bg-white border border-gray-200 rounded-2xl px-8 py-6 shadow-sm">

          <p className="text-gray-700 text-lg font-medium">

            Loading dashboard...

          </p>

        </div>

      </div>

    );

  }

  return (

    <main className="min-h-screen bg-[#f6f7fb] font-sans pb-10">

      {/* HEADER */}

      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-gray-200">

        <div className="max-w-7xl mx-auto px-6 py-6">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">

            <div className="flex-1 text-center">

              <h1 className="text-5xl font-bold text-gray-900">

                Manager Dashboard

              </h1>

              <p className="text-gray-500 mt-2 text-lg">

                Enterprise Goal Approval & Performance System

              </p>

            </div>

            {/* EXPORT */}

            <div className="flex gap-3">

              <button
                onClick={exportPDF}
                className="
                  border
                  border-gray-300
                  bg-white
                  hover:bg-gray-100
                  text-gray-700
                  px-5
                  h-11
                  rounded-xl
                  flex
                  items-center
                  gap-2
                  transition-all
                "
              >

                <FaDownload />

                Export PDF

              </button>

              <button
                onClick={exportExcel}
                className="
                  border
                  border-gray-300
                  bg-white
                  hover:bg-gray-100
                  text-gray-700
                  px-5
                  h-11
                  rounded-xl
                  flex
                  items-center
                  gap-2
                  transition-all
                "
              >

                <FaDownload />

                Export Excel

              </button>

            </div>

          </div>

        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 mt-8">

        {/* STATS */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">

          {/* APPROVED */}

          <div className="
            bg-white
            border
            border-gray-200
            rounded-2xl
            p-6
            flex
            items-center
            justify-between
          ">

            <div>

              <p className="text-sm text-gray-500">

                Approved goals

              </p>

              <h2 className="text-4xl font-semibold text-gray-900 mt-1">

                {approvedCount}

              </h2>

            </div>

            <FaCheckCircle className="text-4xl text-green-500" />

          </div>

          {/* PENDING */}

          <div className="
            bg-white
            border
            border-gray-200
            rounded-2xl
            p-6
            flex
            items-center
            justify-between
          ">

            <div>

              <p className="text-sm text-gray-500">

                Pending goals

              </p>

              <h2 className="text-4xl font-semibold text-gray-900 mt-1">

                {pendingCount}

              </h2>

            </div>

            <FaClock className="text-4xl text-yellow-500" />

          </div>

          {/* REJECTED */}

          <div className="
            bg-white
            border
            border-gray-200
            rounded-2xl
            p-6
            flex
            items-center
            justify-between
          ">

            <div>

              <p className="text-sm text-gray-500">

                Rejected goals

              </p>

              <h2 className="text-4xl font-semibold text-gray-900 mt-1">

                {rejectedCount}

              </h2>

            </div>

            <FaTimesCircle className="text-4xl text-red-500" />

          </div>

        </div>

        {/* SEARCH */}

        <div className="
          bg-white
          border
          border-gray-200
          rounded-2xl
          p-5
           mb-12
          flex
          flex-col
          md:flex-row
          gap-3
          justify-between
          items-center
        ">

          <div className="relative w-full md:w-1/2">

            <FaSearch className="absolute left-4 top-3.5 text-gray-400 text-sm" />

            <input
              type="text"
              placeholder="Search employee..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="
                w-full
                h-11
                pl-11
                pr-4
                rounded-lg
                border
                border-gray-300
                bg-white
                text-gray-900
                placeholder-gray-400
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                focus:border-transparent
                transition-all
                duration-200
              "
            />

          </div>

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="
              h-11
              px-4
              rounded-lg
              border
              border-gray-300
              bg-white
              text-gray-700
              font-medium
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              focus:border-transparent
              cursor-pointer
              transition-all
              duration-200
            "
          >

            <option value="ALL">All status</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
            <option value="DRAFT">Draft</option>
            <option value="SUBMITTED">Submitted</option>
            <option value="LOCKED">Locked</option>

          </select>

        </div>

        {/* AI INSIGHTS */}

        <div className="
          relative
          bg-gradient-to-r
          from-blue-50
          to-indigo-50
          border
          border-blue-100
          rounded-2xl
          p-6
           mb-12
        ">

          <div className="
            absolute
            top-4
            right-5
            flex
            items-center
            gap-2
            text-green-600
            text-sm
            font-medium
            animate-pulse
          ">

            <FaCircle className="text-[9px]" />

            Live AI

          </div>

          <div className="flex items-center gap-3 mb-5">

            <FaLightbulb className="text-yellow-500 text-2xl" />

            <h2 className="text-2xl font-semibold text-gray-900">

              AI insights engine

            </h2>

          </div>

          <div className="space-y-3">

            <div className="
              bg-white
              border
              border-gray-100
              rounded-xl
              p-4
              flex
              items-center
              gap-3
            ">

              <FaExclamationTriangle className="text-yellow-500" />

              <p className="text-gray-700 text-sm">

                SALES department has high pending approvals requiring immediate review.

              </p>

            </div>

            <div className="
              bg-white
              border
              border-gray-100
              rounded-xl
              p-4
              flex
              items-center
              gap-3
            ">

              <FaCheckCircle className="text-green-500" />

              <p className="text-gray-700 text-sm">

                Priya consistently exceeds target completion across multiple quarters.

              </p>

            </div>

            <div className="
              bg-white
              border
              border-gray-100
              rounded-xl
              p-4
              flex
              items-center
              gap-3
            ">

              <FaChartLine className="text-blue-500" />

              <p className="text-gray-700 text-sm">

                TECH department approval performance improving month-over-month.

              </p>

            </div>

          </div>

        </div>

        {/* GOAL CARDS */}

        <div className="space-y-4">

          {filteredGoals.length === 0 ? (

            <div className="
              bg-white
              border
              border-gray-200
              rounded-2xl
              p-10
              text-center
              shadow-sm
            ">

              <h2 className="text-2xl font-semibold text-gray-700">

                No goals found

              </h2>

              <p className="text-gray-400 mt-2">

                Try changing search or filters.

              </p>

            </div>

          ) : (

            filteredGoals.map((goal) => (

            <div
              key={goal.id}
              className="
                bg-white
                border
                border-gray-200
                rounded-xl
                p-5
                mb-3
                shadow-sm
                hover:shadow-md
                transition-all
              "
            >

              {/* TOP */}

              <div className="flex flex-col lg:flex-row justify-between gap-4">

                <div className="flex-1">

                  <h2 className="
                    text-[20px]
                    font-medium
                    text-gray-900
                    leading-snug
                  ">

                    {toTitleCase(goal.title)}

                  </h2>

                  <p className="
                    text-gray-500
                    mt-2
                    text-sm
                    leading-relaxed
                    line-clamp-2
                  ">

                    {goal.description}

                  </p>

                </div>

                {/* STATUS */}

                <div>

                  <span
                    className={`
                      px-4
                      py-2
                      rounded-full
                      text-xs
                      font-medium
                      ${getStatusStyle(goal.status)}
                    `}
                  >

                    {goal.status}

                  </span>

                </div>

              </div>

              {/* GRID */}

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">

                <div className="
                  bg-gray-50
                  border
                  border-gray-100
                  rounded-xl
                  p-4
                ">

                  <p className="
                    text-xs
                    text-gray-400
                    font-medium
                  ">

                    Employee

                  </p>

                  <h3 className="
                    text-lg
                    font-medium
                    text-gray-900
                    mt-1
                  ">

                    {toTitleCase(goal.employee?.name)}

                  </h3>

                </div>

                <div className="
                  bg-gray-50
                  border
                  border-gray-100
                  rounded-xl
                  p-4
                ">

                  <p className="
                    text-xs
                    text-gray-400
                    font-medium
                  ">

                    Department

                  </p>

                  <h3 className="
                    text-lg
                    font-medium
                    text-gray-900
                    mt-1
                  ">

                    {toTitleCase(goal.employee?.department)}

                  </h3>

                </div>

                <div className="
                  bg-gray-50
                  border
                  border-gray-100
                  rounded-xl
                  p-4
                ">

                  <p className="
                    text-xs
                    text-gray-400
                    font-medium
                  ">

                    Target

                  </p>

                  <h3 className="
                    text-lg
                    font-medium
                    text-gray-900
                    mt-1
                  ">

                    {goal.target}

                  </h3>

                </div>

                <div className="
                  bg-gray-50
                  border
                  border-gray-100
                  rounded-xl
                  p-4
                ">

                  <p className="
                    text-xs
                    text-gray-400
                    font-medium
                  ">

                    Weightage

                  </p>

                  <h3 className="
                    text-lg
                    font-medium
                    text-gray-900
                    mt-1
                  ">

                    {goal.weightage}%

                  </h3>

                </div>

              </div>

              {/* ACTIONS */}

              <div className="flex flex-wrap gap-3 mt-5">

                <button
                  onClick={() =>
                    updateStatus(goal.id, "APPROVED")
                  }
                  className="
                    h-10
                    px-4
                    bg-[#e8f5ee]
                    hover:bg-[#dff1e7]
                    text-[#1f7a4d]
                    border
                    border-[#cfe7d8]
                    rounded-lg
                    text-sm
                    font-medium
                    flex
                    items-center
                    gap-2
                    transition-all
                    duration-200
                  "
                >

                  <FaCheckCircle />

                  Approve

                </button>

                <button
                  onClick={() =>
                    updateStatus(goal.id, "REJECTED")
                  }
                  className="
                    h-10
                    px-4
                    bg-[#fdeeee]
                    hover:bg-[#fbe4e4]
                    text-[#b54747]
                    border
                    border-[#f3d2d2]
                    rounded-lg
                    text-sm
                    font-medium
                    flex
                    items-center
                    gap-2
                    transition-all
                    duration-200
                  "
                >

                  <FaTimesCircle />

                  Reject

                </button>

              </div>

              {/* DATE */}

              <div className="
                mt-5
                text-xs
                text-gray-400
              ">

                Submitted on{" "}
                {new Date(
                  goal.createdAt
                ).toLocaleDateString()}

              </div>

            </div>

          ))
          )}

        </div>

      </div>

    </main>

  );

}