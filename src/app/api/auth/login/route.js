import { PrismaClient } from "@prisma/client";

import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const SECRET = "PYACCESS_SECRET";

export const dynamic = "force-dynamic";

export const runtime = "nodejs";

export async function GET() {

}

export async function POST(request) {

  try {

    const body =
      await request.json();

    const user =
      await prisma.user.findUnique({

        where: {
          username:
            body.username,
        },
      });

    if (!user) {

      return Response.json(
        {
          error:
            "Usuario no encontrado",
        },
        {
          status: 401,
        }
      );
    }

    const valid =
      await bcrypt.compare(
        body.password,
        user.password
      );

    if (!valid) {

      return Response.json(
        {
          error:
            "Contraseña incorrecta",
        },
        {
          status: 401,
        }
      );
    }

    const token =
      jwt.sign(
        {
          id: user.id,
          role: user.role,
        },
        SECRET,
        {
          expiresIn: "7d",
        }
      );

    return Response.json({

      token,

      user: {
        id: user.id,
        username:
          user.username,
        role: user.role,
      },
    });

  } catch (error) {

    console.log(error);

    return Response.json(
      {
        error:
          "Error interno",
      },
      {
        status: 500,
      }
    );
  }
}