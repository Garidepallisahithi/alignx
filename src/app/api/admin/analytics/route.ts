import { prisma } from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {

  try {

    const goals = await prisma.goal.findMany({

      include: {

        employee: true,

      },

      orderBy: {

        createdAt: "desc",

      },

    });

    const approved = goals.filter(

      (g) => g.status === "APPROVED"

    ).length;

    const pending = goals.filter(

      (g) => g.status === "SUBMITTED"

    ).length;

    const rejected = goals.filter(

      (g) => g.status === "REJECTED"

    ).length;

    return NextResponse.json({

      success: true,

      goals,

      stats: {

        total: goals.length,

        approved,

        pending,

        rejected,

      },

    });

  }

  catch (error) {

    console.log("ADMIN ANALYTICS ERROR:", error);

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