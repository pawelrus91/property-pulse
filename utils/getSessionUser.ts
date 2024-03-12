import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";

export const getSessionUser = async () => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return null;
    }

    return {
      user: session.user,
      // @ts-ignore
      userId: session.user.id as string | undefined | null,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};
