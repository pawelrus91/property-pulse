import connectDB from "@/config/database";
import Property from "@/models/Property";
import { Property as TProperty } from "@/types";

/**
 * @route GET /api/properties
 */
export async function GET(request: Request) {
  try {
    await connectDB();

    const properties = await Property.find<TProperty>({}).sort({
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
