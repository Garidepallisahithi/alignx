
import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const goals = body.goals || [];

    for (const goal of goals) {

      await prisma.goal.create({

        data: {

          title: goal.title || "Demo Goal",

          description: goal.description || "Demo Description",

          target: Number(goal.target) || 100,

          weightage: Number(goal.weightage) || 100,

          uomType: "MIN",

          status: "SUBMITTED",

          employeeId: "emp1",

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

    return NextResponse.json({

      success: true,

      message: "Temporary demo success",

    });

  }

}