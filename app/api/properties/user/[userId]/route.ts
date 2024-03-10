import connectDB from "@/config/database";
import Property from "@/models/Property";
import { Property as TProperty } from "@/types";
import { type NextRequest } from "next/server";

type GetRequestParam = {
  params: {
    userId: string;
  };
};

/**
 * @route GET /api/properties/user/:userId
 */
export async function GET(request: NextRequest, { params }: GetRequestParam) {
  try {
    await connectDB();

    const userId = params.userId;

    if (!userId) {
      return new Response("User ID is required", { status: 400 });
    }

    const properties = await Property.find<TProperty>({ owner: userId }).sort({
      createdAt: "desc",
    });

    return new Response(JSON.stringify(properties), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
}
