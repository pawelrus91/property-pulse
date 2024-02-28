"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchProperty } from "@/utils/requests";
import { Property } from "@/types";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";

export default function PropertyPage() {
  const { id } = useParams<{ id: string }>();

  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!id) return;
      try {
        const property = await fetchProperty(id);
        setProperty(property);
      } catch (error) {
        console.error("Error fetching property: " + error);
      } finally {
        setLoading(false);
      }
    };

    if (property === null) {
      fetchPropertyData();
    }
  }, [id, property]);

  if (!property && !loading) {
    return (
      <h1 className="text-center text-2xl font-bold">Property Not Found </h1>
    );
  }

  return (
    <>
      {!loading && property && (
        <>
          <PropertyHeaderImage image={property.images[0]} />
        </>
      )}
    </>
  );
}
