import { NextRequest } from "next/server";
import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

/**
 * @route GET /api/messages/unread-count
 */
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) {
      return new Response("User ID is required", {
        status: 401,
      });
    }

    const { userId } = sessionUser;

    const count = await Message.countDocuments({
      recipient: userId,
      read: false,
    });

    return new Response(JSON.stringify(count), {
      status: 200,
    });
  } catch (error) {
    console.error(error);

    return new Response("Something went wrong", {
      status: 500,
    });
  }
}
