import axios from "axios";


const getPosts = async () => {
  let headersList = {
    "Accept": "*/*",
  }

  let reqOptions = {
    url: "http://localhost:3000/api/blog",
    method: "GET",
    headers: headersList,
  }

  let response = await axios.request(reqOptions);
  return response.data;
};




export const validateRole = async (session: Session, authorId: String, requiredRole: string) => {
  if (!session) {
    throw new Error("You are not logged In")
  }
  //@ts-ignore
  if (verifyUserRole(session.user.role, requiredRole)) throw new Error("You are not authorized to create a new Post")
  //@ts-ignore
  const currentUserRole = session?.user.id;
  if (currentUserRole !== authorId && !verifyUserRole(currentUserRole, 'ADMINISTRATOR')) {
    throw new Error("You are not authorized!")
  }
}

export default getPosts;

