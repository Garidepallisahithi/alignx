import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";

// GET ALL GOALS

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

    return NextResponse.json({

      success: true,

      goals,

    });

  }

  catch (error) {

    console.log(error);

    return NextResponse.json(

      {

        success: false,

        message: "Failed to fetch goals",

      },

      {

        status: 500,

      }

    );

  }

}