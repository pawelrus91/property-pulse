import connectDB from "@/config/database";
import Property from "@/models/Property";
import mongoose from "mongoose";
import { Property as TProperty } from "@/types";
import { getSessionUser } from "@/utils/getSessionUser";
import cloudinary from "@/config/cloudinary";
import type { NextRequest } from "next/server";

type BaseParam = {
  params: { id: string };
};

type GetRequestParam = BaseParam;

type DeleteRequestParam = GetRequestParam;

type PutRequestParam = BaseParam;

/**
 * @route GET /api/properties/:id
 */
export async function GET(request: NextRequest, { params }: GetRequestParam) {
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
export async function DELETE(
  request: NextRequest,
  { params }: DeleteRequestParam
) {
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

type PropertyData = Required<
  Omit<TProperty, "_id" | "createdAt" | "updatedAt" | "is_featured">
>;

/**
 * @route PUT /api/properties/:id
 */
export async function PUT(request: NextRequest, { params }: PutRequestParam) {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("User IF is required", { status: 401 });
    }

    const { id } = params;
    // @ts-ignore
    const { userId } = sessionUser;

    const formData = await request.formData();

    // Access all values from amenities
    const amenities = formData.getAll("amenities") as string[];

    // Get the property to update
    const property = await Property.findById<TProperty>(id).orFail();

    // Verify ownership
    if (property.owner.toString() !== userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const propertyData: Omit<PropertyData, "images"> = {
      type: formData.get("type") as string,
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      location: {
        street: formData.get("location.street") as string,
        city: formData.get("location.city") as string,
        state: formData.get("location.state") as string,
        zipcode: formData.get("location.zipcode") as string,
      },
      beds: parseInt(formData.get("beds") as string),
      baths: parseInt(formData.get("baths") as string),
      square_feet: parseInt(formData.get("square_feet") as string),
      amenities,
      rates: {
        monthly: parseInt(formData.get("rates.monthly") as string),
        nightly: parseInt(formData.get("rates.nightly") as string),
        weekly: parseInt(formData.get("rates.weekly") as string),
      },
      seller_info: {
        name: formData.get("seller_info.name") as string,
        email: formData.get("seller_info.email") as string,
        phone: formData.get("seller_info.phone") as string,
      },
      owner: userId,
    };

    // Update property id database
    const updatedProperty: TProperty | null = await Property.findByIdAndUpdate(
      id,
      propertyData
    );

    return new Response(JSON.stringify(updatedProperty), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);

    if (error instanceof mongoose.Error.DocumentNotFoundError) {
      return new Response("Property not found", { status: 404 });
    }

    return new Response("Failed to add property", { status: 500 });
  }
}
