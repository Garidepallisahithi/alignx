import { prisma } from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {

  try {

    const goals = await prisma.goal.findMany({

      include: {

        employee: true,

      },

    });

    return NextResponse.json({

      success: true,

      goals,

      stats: {

        total: goals.length,

        approved: goals.filter(g => g.status === "APPROVED").length,

        pending: goals.filter(g => g.status === "SUBMITTED").length,

        rejected: goals.filter(g => g.status === "REJECTED").length,

      },

    });

  }

  catch (error) {

    console.log(error);

    return NextResponse.json({

      success: true,

      goals: [],

      stats: {

        total: 0,

        approved: 0,

        pending: 0,

        rejected: 0,

      },

    });

  }

}