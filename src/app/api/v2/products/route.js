import { prisma }
from "../../../../lib/prisma";

export const dynamic = "force-dynamic";

export const runtime = "nodejs";

export async function GET() {

  const products =
    await prisma.product.findMany();

  return Response.json(
    products
  );
}

export async function POST(
  request
) {

  const body =
    await request.json();

  const product =
    await prisma.product.create({

      data: {

        name:
          body.name,

        sku:
          body.sku,

        category:
          body.category,

        stock:
          Number(body.stock),

        cost:
          Number(body.cost),

        margin:
          Number(body.margin),

        price:
          Number(body.price),

        companyId: 1,
      },
    });

  return Response.json(
    product
  );
}