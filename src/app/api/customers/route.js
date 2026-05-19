import db from "../../../database/db";

export async function GET() {

  return new Promise(
    (resolve) => {

      db.all(
        "SELECT * FROM customers",
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
        INSERT INTO customers
        (
          name,
          phone,
          address
        )
        VALUES (?, ?, ?)
      `,
        [
          body.name,
          body.phone,
          body.address,
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
