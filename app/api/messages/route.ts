import { NextRequest } from "next/server";
import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) {
      return new Response(JSON.stringify("User ID is required"), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { userId } = sessionUser;

    const messages = await Message.find({
      recipient: userId,
    })
      .populate("sender", "username")
      .populate("property", "name");

    return new Response(JSON.stringify(messages), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);

    return new Response("Something went wrong", {
      status: 500,
    });
  }
}

/**
 * @route POST /api/messages
 */
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { name, email, phone, body, property, recipient } =
      await request.json();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) {
      return new Response(
        JSON.stringify({ message: "You mast be logged in to send a message" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const { user } = sessionUser;

    // Can not send message to self
    // @ts-expect-error
    if (user.id === recipient) {
      return new Response(
        JSON.stringify({ message: "Can not send a message to yourself" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const newMessage = new Message({
      // @ts-ignore
      sender: user.id,
      recipient,
      property,
      email,
      phone,
      body,
      name,
    });

    await newMessage.save();

    return new Response(JSON.stringify({ message: " Message send" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);

    return new Response("Something went wrong", {
      status: 500,
    });
  }
}
