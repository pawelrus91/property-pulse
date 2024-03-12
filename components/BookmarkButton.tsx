"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { FaBookmark } from "react-icons/fa";
import { toast } from "react-toastify";
import clsx from "clsx";
import type { Property } from "@/types";

type BookmarkButtonProps = {
  property: Property;
};

export default function BookmarkButton({ property }: BookmarkButtonProps) {
  const { data: session } = useSession();
  // @ts-expect-error
  const userId = session?.user?.id;

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const checkBookmarkStatus = async () => {
      try {
        const response = await fetch("/api/bookmarks/check", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ propertyId: property._id }),
        });

        if (response.status === 200) {
          const data = await response.json();
          setIsBookmarked(data.isBookmarked);
        }
      } catch (error) {
        console.error("Error bookmarking property: ", error);
      } finally {
        setLoading(false);
      }
    };

    checkBookmarkStatus();
  }, [property._id, userId]);

  const handleClick = async () => {
    if (!userId) {
      toast.error("You need to sign in to bookmark a property");
      return;
    }

    try {
      const response = await fetch("/api/bookmarks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ propertyId: property._id }),
      });

      if (response.status === 200) {
        const data = await response.json();
        toast.success(data.message);
        setIsBookmarked(data.isBookmarked);
      }
    } catch (error) {
      console.error("Error bookmarking property: ", error);
      toast.error("Something went wrong");
    }
  };

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <button
      onClick={handleClick}
      className={clsx(
        "  text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center",
        isBookmarked
          ? "bg-red-500 hover:bg-red-600"
          : "bg-blue-500 hover:bg-blue-600"
      )}
    >
      <FaBookmark className="mr-2" />{" "}
      {isBookmarked ? "Remove Bookmark" : "Bookmark Property"}
    </button>
  );
}
