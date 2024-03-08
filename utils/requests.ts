import { Property } from "@/types";

const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

async function fetchProperties() {
  try {
    // Handle the case where the API domain is not available yet
    if (!apiDomain) {
      return [];
    }

    const response = await fetch(`${apiDomain}/properties`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    return response.json() as Promise<Property[]>;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function fetchProperty(id: Property["_id"]) {
  try {
    // Handle the case where the API domain is not available yet
    if (!apiDomain) {
      null;
    }

    const response = await fetch(`${apiDomain}/properties/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    return response.json() as Promise<Property>;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export { fetchProperties, fetchProperty };
