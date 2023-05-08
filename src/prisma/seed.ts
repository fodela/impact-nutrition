const { hash } = require("bcrypt") 

// prisma/seed.js
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  const password = await hash('password123', 12)
  const user = await prisma.user.create({
    data: {
      firstname: 'John',
      lastname: 'Doe',
      email: 'johndoe@example.com',
      username: "kelibst",
      password
    },
  })
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
