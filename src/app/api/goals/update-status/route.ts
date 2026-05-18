import { prisma } from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const updatedGoal = await prisma.goal.update({

      where: {
        id: body.goalId,
      },

      data: {
        status: body.status,
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
        message: "Failed to update goal status",
      },
      {
        status: 500,
      }
    );

  }

}