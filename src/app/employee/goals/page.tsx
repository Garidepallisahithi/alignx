"use client";

import { useState } from "react";

export default function GoalPage() {

  const [goals, setGoals] = useState([
    {
      title: "",
      description: "",
      target: "",
      weightage: "",
      uom: "MIN",
    },
  ]);

  const addGoal = () => {

    if (goals.length >= 8) {
      alert("Maximum 8 goals allowed");
      return;
    }

    setGoals([
      ...goals,
      {
        title: "",
        description: "",
        target: "",
        weightage: "",
        uom: "MIN",
      },
    ]);
  };

  const updateGoal = (
    index: number,
    field: string,
    value: string
  ) => {

    const updatedGoals = [...goals];

    updatedGoals[index] = {
      ...updatedGoals[index],
      [field]: value,
    };

    setGoals(updatedGoals);
  };

  const totalWeightage = goals.reduce(

    (total, goal) => {

      return total + parseInt(goal.weightage || 0);

    },

    0

  );

  const isWeightValid =
    totalWeightage === 100;

  const hasInvalidGoal = goals.some(
    (goal) =>
      !goal.title ||
      !goal.description ||
      !goal.target ||
      !goal.weightage ||
      Number(goal.weightage) < 10
  );

  const canSubmit =
    isWeightValid &&
    !hasInvalidGoal;

  
  const handleSubmit = async () => {

  if (!isWeightValid) {
    alert("Total weightage must equal 100%");
    return;
  }

  const invalidGoal = goals.find(
    (goal) =>
      Number(goal.weightage) < 10
  );

  if (invalidGoal) {
    alert("Each goal must have minimum 10% weightage");
    return;
  }

  // GET CURRENT LOGGED-IN USER
  const storedUser = localStorage.getItem("user");

  if (!storedUser) {
    alert("User session not found. Please login again.");
    return;
  }

  const user = JSON.parse(storedUser);

  try {

    const response = await fetch(
      "/api/goals",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          goals,
          userId: user.id,
        }),
      }
    );

    const data = await response.json();

    if (data.success) {

      alert("Goals submitted successfully!");

      setGoals([
        {
          title: "",
          description: "",
          target: "",
          weightage: "",
          uom: "MIN",
        },
      ]);

    }

    else {

      alert("Failed to submit goals");

    }

  } catch (error) {

    console.log(error);

    alert("Something went wrong");

  }

};

  return (

    <main className="min-h-screen bg-[#f5f7fb] py-12 px-6">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}

        <div className="mb-10">

          <h1 className="text-5xl font-bold text-gray-900">
            Employee Goal Sheet
          </h1>

          <p className="text-gray-500 mt-3 text-lg">
            Create, manage and track your quarterly performance goals
          </p>

        </div>

        {/* WEIGHT CARD */}

        <div className="bg-white rounded-3xl shadow-md p-6 mb-10 border border-gray-100">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-lg font-semibold text-gray-700">
                Total Weightage
              </p>

              <p className="text-sm text-gray-500 mt-1">
                Combined goal weight must equal 100%
              </p>

              {!isWeightValid && (
                <p className="text-red-500 mt-3 font-medium">
                  Total weightage must equal exactly 100%
                </p>
              )}

            </div>

            <div
              className={`text-3xl font-bold ${
                totalWeightage === 100
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {totalWeightage}/100
            </div>

          </div>

        </div>

        {/* GOALS */}

        <div className="space-y-8">

          {goals.map((goal, index) => (

            <div
              key={index}
              className="bg-white rounded-3xl shadow-md border border-gray-100 p-8"
            >

              <div className="flex items-center justify-between mb-8">

                <h2 className="text-2xl font-bold text-gray-800">
                  Goal {index + 1}
                </h2>

                <div
                  className="inline-flex items-center justify-center bg-black text-white px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap"
                >
                  Performance Goal
                </div>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* TITLE */}

                <div>

                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Goal Title
                  </label>

                  <input
                    type="text"
                    placeholder="Increase quarterly sales by 20%"
                    className="w-full border border-gray-300 bg-gray-50 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-black"
                    value={goal.title}
                    onChange={(e) =>
                      updateGoal(index, "title", e.target.value)
                    }
                  />

                </div>

                {/* DESCRIPTION */}

                <div>

                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Description
                  </label>

                  <input
                    type="text"
                    placeholder="Describe goal objective"
                    className="w-full border border-gray-300 bg-gray-50 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-black"
                    value={goal.description}
                    onChange={(e) =>
                      updateGoal(index, "description", e.target.value)
                    }
                  />

                </div>

                {/* TARGET */}

                <div>

                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Target
                  </label>

                  <input
                    type="number"
                    placeholder="Enter target"
                    className="w-full border border-gray-300 bg-gray-50 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-black"
                    value={goal.target}
                    onChange={(e) =>
                      updateGoal(index, "target", e.target.value)
                    }
                  />

                </div>

                {/* WEIGHTAGE */}

                <div>

                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Weightage %
                  </label>

                  <input
                    type="number"
                    placeholder="Enter weightage"
                    className="w-full border border-gray-300 bg-gray-50 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-black"
                    value={goal.weightage}
                    onChange={(e) => {
                      const updatedGoals = [...goals];
                      updatedGoals[index].weightage =
                        parseInt(e.target.value) || 0;
                      setGoals(updatedGoals);
                    }}
                  />

                  {goal.weightage &&
                    Number(goal.weightage) < 10 && (
                      <p className="text-red-500 text-sm mt-2">
                        Minimum 10% required
                      </p>
                    )}

                </div>

                {/* UOM */}

                <div>

                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Unit of Measurement
                  </label>

                  <select
                    className="w-full border border-gray-300 bg-gray-50 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-black"
                    value={goal.uom}
                    onChange={(e) =>
                      updateGoal(index, "uom", e.target.value)
                    }
                  >

                    <option value="MIN">MIN</option>
                    <option value="MAX">MAX</option>
                    <option value="TIMELINE">
                      TIMELINE
                    </option>
                    <option value="ZERO">ZERO</option>

                  </select>

                </div>

              </div>

            </div>

          ))}

        </div>

        {/* BUTTONS */}

        <div className="flex flex-wrap gap-5 mt-10">

          <button
            onClick={addGoal}
            className="inline-flex items-center justify-center whitespace-nowrap bg-black hover:bg-gray-800 transition text-white min-w-[180px] h-14 px-6 rounded-2xl font-semibold shadow-md text-lg"
          >
            + Add Goal
          </button>

          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={`inline-flex items-center justify-center whitespace-nowrap min-w-[180px] h-14 px-6 rounded-2xl font-semibold shadow-md text-lg transition ${
              canSubmit
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Submit Goals
          </button>

        </div>

      </div>

    </main>

  );
}