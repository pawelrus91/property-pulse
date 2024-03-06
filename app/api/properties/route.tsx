import connectDB from "@/config/database";
import Property from "@/models/Property";
import { Property as TProperty } from "@/types";
import { type NextRequest } from "next/server";
import { getSessionUser } from "@/utils/getSessionUser";

/**
 * @route GET /api/properties
 */
export async function GET(request: NextRequest) {
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

type PropertyData = Required<
  Omit<TProperty, "_id" | "createdAt" | "updatedAt" | "is_featured">
>;

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("User IF is required", { status: 401 });
    }

    // @ts-ignore
    const { userId } = sessionUser;

    const formData = await request.formData();

    // Access all values from amenities and images
    const amenities = formData.getAll("amenities") as string[];
    const images = formData
      .getAll("images")
      .filter((image) => (image as File).name !== "") as string[];

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
      // images,
    };

    const newProperty: TProperty = await Property.create(propertyData);

    return Response.redirect(
      `${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`
    );
  } catch (error) {
    console.log(error);

    return new Response("Failed to add property", { status: 500 });
  }
}
