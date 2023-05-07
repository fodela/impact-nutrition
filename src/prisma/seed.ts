// prisma/seed.js
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      firstname: 'John',
      lastname: 'Doe',
      email: 'johndoe@example.com',
      username: "kelibst",
    },
  })
  console.log(`Created user with ID: ${user.id}`)
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
