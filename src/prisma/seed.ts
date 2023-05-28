const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const { hash } = require("bcrypt")

// prisma/seed.js


async function main() {
  const password = await hash('password123', 12)
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'kelibst@example.com',
      username: 'kelibst111',
      password
    },
  })

  const createPost = async (title: string, content: string, slug: string, imageUrl: string) => {


    await prisma.post.create({
      data: {
        title,
        content,
        slug,
        imageUrl,
        authorId: user.id,
      },
    })
  }

  const createEvent = async (title: string, details: string, location: string, organizers: string, image: string) => {


    await prisma.event.create({
      data: {
        title,
        details,
        location,
        organizers,
        image,
        userId: user.id,
      },
    })
  }

  await createPost('Post 1',
    "<p>Some new Contnet&nbsp;&nbsp;&nbsp;&nbsp;</p><p><strong>Awesome title and contnet1</strong><br>\n</p><p><br>\n</p><p> Green text</p>", 'post-1', 'https://images.unsplash.com/photo-1577896850715-ed0b7e3ece57?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80')
  await createPost('Post 2',
    "<p>Some new Contnet&nbsp;&nbsp;&nbsp;&nbsp;</p><p><strong>Awesome title and contnet2</strong><br>\n</p><p><br>\n</p><p> Green text</p>", 'post-2', 'https://images.unsplash.com/photo-1577896850715-ed0b7e3ece57?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80')
  await createPost('Post 3',
    "<p>Some new Contnet&nbsp;&nbsp;&nbsp;&nbsp;</p><p><strong>Awesome title and contnet3</strong><br>\n</p><p><br>\n</p><p> Green text</p>", 'post-3', 'https://images.unsplash.com/photo-1577896850715-ed0b7e3ece57?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80')

  await createEvent('Event 1',
    "<p>Some new Contnet&nbsp;&nbsp;&nbsp;&nbsp;</p><p><strong>Awesome title and detail 1</strong><br>\n</p><p><br>\n</p><p> Green text</p>", 'Location 1', 'Organizers 1', 'https://images.unsplash.com/photo-1577896850715-ed0b7e3ece57?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80')
  await createEvent('Event 2',
    "<p>Some new Contnet&nbsp;&nbsp;&nbsp;&nbsp;</p><p><strong>Awesome title and detail 2</strong><br>\n</p><p><br>\n</p><p> Green text</p>", 'Location 2', 'Organizers 2', 'https://images.unsplash.com/photo-1577896850715-ed0b7e3ece57?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80')
  await createEvent('Event 3',
    "<p>Some new Contnet&nbsp;&nbsp;&nbsp;&nbsp;</p><p><strong>Awesome title and detail 3</strong><br>\n</p><p><br>\n</p><p> Green text</p>", 'Location 3', 'Organizers 3', 'https://images.unsplash.com/photo-1577896850715-ed0b7e3ece57?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80')
}

// Rest of the code remains the same


main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
