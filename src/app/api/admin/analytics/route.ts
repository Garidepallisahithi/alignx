import { prisma } from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {

  try {

    // TOTAL GOALS

    const totalGoals = await prisma.goal.count();

    // APPROVED GOALS

    const approvedGoals = await prisma.goal.count({
      where: {
        status: "APPROVED",
      },
    });

    // REJECTED GOALS

    const rejectedGoals = await prisma.goal.count({
      where: {
        status: "REJECTED",
      },
    });

    // PENDING GOALS

    const pendingGoals = await prisma.goal.count({
      where: {
        status: "DRAFT",
      },
    });

    // FETCH ALL GOALS

    const goals = await prisma.goal.findMany({

      include: {
        employee: true,
      },

    });

    // DEPARTMENT ANALYTICS

    const departmentMap: any = {};

    goals.forEach((goal) => {

      const dept =
        goal.employee?.department || "Unknown";

      if (!departmentMap[dept]) {

        departmentMap[dept] = {

          department: dept,

          approved: 0,

          pending: 0,

          rejected: 0,

        };

      }

      if (goal.status === "APPROVED") {

        departmentMap[dept].approved += 1;

      }

      else if (goal.status === "REJECTED") {

        departmentMap[dept].rejected += 1;

      }

      else {

        departmentMap[dept].pending += 1;

      }

    });

    const departmentData =
      Object.values(departmentMap);

    return NextResponse.json({

      success: true,

      analytics: {

        totalGoals,

        approvedGoals,

        rejectedGoals,

        pendingGoals,

      },

      departmentData,

      goals,

    });

  }

  catch (error) {

    console.log(error);

    return NextResponse.json(

      {

        success: false,

        message: "Failed to fetch analytics",

      },

      {

        status: 500,

      }

    );

  }

}