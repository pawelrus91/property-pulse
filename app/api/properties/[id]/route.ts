import connectDB from "@/config/database";
import Property from "@/models/Property";
import mongoose from "mongoose";
import { Property as TProperty } from "@/types";
import { getSessionUser } from "@/utils/getSessionUser";

type BaseParam = {
  params: { id: string };
};

type GetRequestParam = BaseParam;

type DeleteRequestParam = GetRequestParam;

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

/**
 * @route DELETE /api/properties/:id
 */
export async function DELETE(request: Request, { params }: DeleteRequestParam) {
  try {
    const propertyId = params.id;

    const sessionUser = await getSessionUser();

    // Check for session user
    if (!sessionUser || !sessionUser.userId) {
      return new Response("User ID is required", { status: 401 });
    }

    const { userId } = sessionUser;

    await connectDB();

    const property = await Property.findById<TProperty>(propertyId).orFail();

    // Verify ownership
    if (property.owner.toString() !== userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    //@ts-ignore
    property.deleteOne();

    return new Response("Property Deleted", {
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
