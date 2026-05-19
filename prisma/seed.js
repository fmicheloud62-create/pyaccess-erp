const {
  PrismaClient,
} = require(
  "@prisma/client"
);

const bcrypt =
  require("bcryptjs");

const prisma =
  new PrismaClient();

async function main() {

  const company =
    await prisma.company.create({

      data: {
        name: "PyAccess",
      },
    });

  const hashedPassword =
    await bcrypt.hash(
      "admin123",
      10
    );

  await prisma.user.create({

    data: {

      username:
        "admin",

      password:
        hashedPassword,

      role: "admin",

      companyId:
        company.id,
    },
  });

  console.log(
    "Admin creado"
  );
}

main()
  .catch(console.error)
  .finally(async () => {

    await prisma.$disconnect();

  });