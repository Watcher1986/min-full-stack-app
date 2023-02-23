import { getServerSession } from "next-auth/next";
import { authOptions } from "../../pages/api/auth/[...nextauth]";

const getSessionData = async () => await getServerSession(authOptions);

export default getSessionData;
