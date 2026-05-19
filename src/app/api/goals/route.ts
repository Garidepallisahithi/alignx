
import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const { goals, userId } = body;

    if (!userId) {

      return NextResponse.json(

        {

          success: false,

          message: "User session missing",

        },

        {

          status: 400,

        }

      );

    }

    for (const goal of goals) {

      await prisma.goal.create({

        data: {

          title: goal.title,

          description: goal.description,

          target: Number(goal.target),

          weightage: Number(goal.weightage),

          uomType: goal.uom,

          status: "SUBMITTED",

          employeeId: userId,

        },

      });

    }

    return NextResponse.json({

      success: true,

      message: "Goals saved successfully",

    });

  }

  catch (error) {

    console.log(error);

    return NextResponse.json(

      {

        success: false,

        message: "Failed to save goals",

      },

      {

        status: 500,

      }

    );

  }

}