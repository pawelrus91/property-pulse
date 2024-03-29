import connectDB from "@/config/database";
import Property from "@/models/Property";
import { Property as TProperty } from "@/types";
import { type NextRequest } from "next/server";

/**
 * @route GET /api/properties/featured
 */
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const properties = await Property.find<TProperty>({
      is_featured: true,
    }).sort({
      createdAt: "desc",
    });

    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
}
