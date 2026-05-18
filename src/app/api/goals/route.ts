import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const { goals } = body;

    // FIND FIRST EMPLOYEE USER

    const employeeUser = await prisma.user.findFirst({

      where: {
        role: "EMPLOYEE",
      },

    });

    // IF NO USER EXISTS

    if (!employeeUser) {

      return NextResponse.json(

        {
          success: false,
          message: "No employee user found",
        },

        {
          status: 400,
        }

      );

    }

    // CREATE GOALS

    const createdGoals = await Promise.all(

      goals.map((goal: any) =>

        prisma.goal.create({

          data: {

            title: goal.title,

            description: goal.description,

            target: Number(goal.target),

            weightage: Number(goal.weightage),

            uomType: goal.uom,

            status: "DRAFT",

            employee: {

              connect: {

                id: employeeUser.id,

              },

            },

          },

        })

      )

    );

    return NextResponse.json({

      success: true,

      goals: createdGoals,

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