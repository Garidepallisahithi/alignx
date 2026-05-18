import { prisma } from "../../../../lib/prisma";
import { NextResponse } from "next/server";

// GET ALL GOALS

export async function GET() {

  try {
    const goals = await prisma.goal.findMany({

        include: {
         employee: {
          select: {
            id: true,
            name: true,
            email: true,
            department: true,
          },
       },
     },

       orderBy: {
         createdAt: "desc",
     },

   });

    return NextResponse.json({
      success: true,
      goals,
    });

  } catch (error) {

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

// UPDATE GOAL STATUS

export async function PATCH(req: Request) {

  try {

    const body = await req.json();

    const { goalId, status } = body;

    const updatedGoal = await prisma.goal.update({

      where: {
        id: goalId,
      },

      data: {
        status,
      },

    });

    return NextResponse.json({
      success: true,
      goal: updatedGoal,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update goal",
      },
      {
        status: 500,
      }
    );

  }

}