"use client";

import { useState, useEffect } from "react";
import Map, { Marker } from "react-map-gl";
import { setDefaults, fromAddress, OutputFormat } from "react-geocode";
import Image from "next/image";
import Spinner from "@/components/Spinner";
import pin from "@/assets/images/pin.svg";
import "mapbox-gl/dist/mapbox-gl.css";

import type { Property, Location } from "@/types";

type PropertyMapProps = {
  property: Property;
};

export default function PropertyMap({ property }: PropertyMapProps) {
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 12,
    width: "100%",
    height: "500px",
  });
  const [loading, setLoading] = useState(true);
  const [geocodeError, setGeocodeError] = useState(false);

  setDefaults({
    key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY as string,
    language: "en",
    region: "us",
    outputFormat: OutputFormat.JSON,
  });

  useEffect(() => {
    const fetchCoords = async () => {
      const address = `${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`;
      try {
        const response = await fromAddress(address);

        // Check for results
        if (response.results.length === 0) {
          // No result found
          setGeocodeError(true);
          setLoading(false);
          return;
        }

        const { lat, lng } = response.results[0].geometry.location;
        setLat(lat);
        setLng(lng);
        setViewport((prev) => ({ ...prev, latitude: lat, longitude: lng }));
      } catch (error) {
        console.error("Error fetching coordinates: " + error);
        setGeocodeError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCoords();
  }, [
    property.location.street,
    property.location.city,
    property.location.state,
    property.location.zipcode,
  ]);

  if (loading) {
    return <Spinner loading={loading} />;
  }

  // Handle case when geocoding failed
  if (geocodeError) {
    return <div className="text-xl">No location data found</div>;
  }

  return (
    !loading && (
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        mapLib={import("mapbox-gl")}
        initialViewState={{
          latitude: lat as number,
          longitude: lng as number,
          zoom: 15,
        }}
        style={{ width: "100%", height: 500 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Marker
          latitude={lat as number}
          longitude={lng as number}
          anchor="bottom"
        >
          <Image src={pin} alt="Location" width={40} height={40} />
        </Marker>
      </Map>
    )
  );
}
