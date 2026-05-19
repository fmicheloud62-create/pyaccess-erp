import db from "../../../database/db";

export async function GET() {

  return new Promise(
    (resolve) => {

      db.all(
        "SELECT * FROM cashflow",
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
        INSERT INTO cashflow
        (
          type,
          description,
          amount,
          date
        )
        VALUES (?, ?, ?, ?)
      `,
        [
          body.type,
          body.description,
          body.amount,
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