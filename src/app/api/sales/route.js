import db from "../../../database/db";

export const dynamic = "force-dynamic";

export const runtime = "nodejs";

export async function GET() {

  return new Promise(
    (resolve) => {

      db.all(
        "SELECT * FROM sales",
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
        INSERT INTO sales
        (
          total,
          date
        )
        VALUES (?, ?)
      `,
        [
          body.total,
          body.date,
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