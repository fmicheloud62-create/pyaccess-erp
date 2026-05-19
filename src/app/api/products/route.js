import db from "../../../database/db";

export const dynamic = "force-dynamic";

export const runtime = "nodejs";

export async function GET() {

  return new Promise(
    (resolve) => {

      db.all(
        "SELECT * FROM products",
        [],
        (err, rows) => {

          resolve(
            Response.json(rows)
          );
        }
      );
    }
  );
}

export async function POST(
  request
) {

  const body =
    await request.json();

  return new Promise(
    (resolve) => {

      db.run(
        `
        INSERT INTO products
        (
          name,
          sku,
          category,
          stock,
          cost,
          margin,
          price
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
        [
          body.name,
          body.sku,
          body.category,
          body.stock,
          body.cost,
          body.margin,
          body.price,
        ],
        function () {

          resolve(
            Response.json({
              success: true,
              id: this.lastID,
            })
          );
        }
      );
    }
  );
}