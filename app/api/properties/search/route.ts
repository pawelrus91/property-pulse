import connectDB from "@/config/database";
import Property from "@/models/Property";
import { NextRequest } from "next/server";

/**
 * @route GET /api/properties/search
 */
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const location = searchParams.get("location");
    const propertyType = searchParams.get("propertyType");

    const locationPattern = new RegExp(location || "", "i");

    // Match location pattern against database fields
    let query = {
      $or: [
        { name: locationPattern },
        { description: locationPattern },
        { "location.street": locationPattern },
        { "location.city": locationPattern },
        { "location.state": locationPattern },
        { "location.zipcode": locationPattern },
      ],
    };

    // Only check for property type if it's not "All"
    if (propertyType && propertyType !== "All") {
      const typePattern = new RegExp(propertyType, "i");

      // @ts-expect-error
      query.type = typePattern;
    }

    const properties = await Property.find(query);

    return new Response(JSON.stringify(properties), {
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
