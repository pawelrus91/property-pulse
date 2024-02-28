import { Property } from "@/types";

const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

async function fetchProperties() {
  try {
    // Handle the case where the API domain is not available yet
    if (!apiDomain) {
      return [];
    }

    const response = await fetch(`${apiDomain}/properties`);

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    return response.json() as Promise<Property[]>;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export { fetchProperties };
