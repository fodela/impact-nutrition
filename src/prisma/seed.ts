const { hash } = require("bcrypt")

// prisma/seed.js
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

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
    const editorJSContent = JSON.stringify({
      blocks: [
        {
          type: 'paragraph',
          data: {
            text: content,
          },
        },
      ],
    })

    await prisma.post.create({
      data: {
        title,
        content: editorJSContent,
        slug,
        imageUrl,
        authorId: user.id,
      },
    })
  }

  const createEvent = async (title: String, details: String, location: String, organizers: String, image: String) => {
    const editorJSDetails = JSON.stringify({
      blocks: [
        {
          type: 'paragraph',
          data: {
            text: details,
          },
        },
      ],
    })

    await prisma.event.create({
      data: {
        title,
        details: editorJSDetails,
        location,
        organizers,
        image,
        userId: user.id,
      },
    })
  }

  await createPost('Post 1', 'Content for post 1', 'post-1', 'https://images.unsplash.com/photo-1577896850715-ed0b7e3ece57?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80')
  await createPost('Post 2', 'Content for post 2', 'post-2', 'https://images.unsplash.com/photo-1577896850715-ed0b7e3ece57?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80')
  await createPost('Post 3', 'Content for post 3', 'post-3', 'https://images.unsplash.com/photo-1577896850715-ed0b7e3ece57?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80')

  await createEvent('Event 1', 'Details for event 1', 'Location 1', 'Organizers 1', 'https://images.unsplash.com/photo-1577896850715-ed0b7e3ece57?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80')
  await createEvent('Event 2', 'Details for event 2', 'Location 2', 'Organizers 2', 'https://images.unsplash.com/photo-1577896850715-ed0b7e3ece57?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80')
  await createEvent('Event 3', 'Details for event 3', 'Location 3', 'Organizers 3', 'https://images.unsplash.com/photo-1577896850715-ed0b7e3ece57?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80')
}

// Rest of the code remains the same


main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
