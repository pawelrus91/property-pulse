"use client";

import { useState, useEffect } from "react";
import PropertyCard from "@/components/PropertyCard";
import Spinner from "@/components/Spinner";
import { toast } from "react-toastify";
import { Property } from "@/types";

export default function SavedPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSavedProperties() {
      try {
        const response = await fetch("/api/bookmarks");

        if (response.status !== 200) {
          console.info(response.statusText);
          toast.error("Failed to fetch saved properties");
        }

        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch saved properties");
      } finally {
        setLoading(false);
      }
    }

    fetchSavedProperties();
  }, []);

  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <section className="px-4 py-6">
      <h1 className="text-2xl mb-4">Saved Properties</h1>
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (
          <p>No saved properties</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
