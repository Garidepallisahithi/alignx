import { prisma } from "../../../../lib/prisma";
import { NextResponse } from "next/server";

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
        message: "Failed to fetch manager goals",
      },
      {
        status: 500,
      }
    );
  }
}
