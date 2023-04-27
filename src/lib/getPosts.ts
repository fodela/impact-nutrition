import prisma from "./prisma";

const getPosts = async () => {
  const feed = await prisma.post.findMany();

  return feed;
};

export default getPosts;
