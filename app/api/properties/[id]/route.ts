import connectDB from "@/config/database";
import Property from "@/models/Property";
import mongoose from "mongoose";
import { Property as TProperty } from "@/types";

type GetRequestParam = {
  params: { id: string };
};

/**
 * @route GET /api/properties/:id
 */
export async function GET(request: Request, { params }: GetRequestParam) {
  try {
    await connectDB();

    const property = await Property.findById<TProperty>(params.id).orFail();

    return new Response(JSON.stringify(property), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    if (error instanceof mongoose.Error.DocumentNotFoundError) {
      return new Response("Property not found", { status: 404 });
    }

    console.log("@@@ error", error);
    return new Response("Something went wrong", { status: 500 });
  }
}
