"use client";
import { useState, useEffect } from "react";
import type { SessionContextValue } from "next-auth/react";
import { useGlobalContext } from "@/context/GlobalContext";

type UnreadMessageCountProps = {
  session: SessionContextValue["data"];
};

export default function UnreadMessageCount({
  session,
}: UnreadMessageCountProps) {
  const { unreadCount, setUnreadCount } = useGlobalContext();

  useEffect(() => {
    if (!session) {
      return;
    }

    const fetchUnreadMessages = async () => {
      try {
        const request = await fetch("/api/messages/unread-count");

        if (request.status === 200) {
          const data = await request.json();
          setUnreadCount(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUnreadMessages();
  }, [session, setUnreadCount]);

  return (
    unreadCount > 0 && (
      <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
        {unreadCount}
      </span>
    )
  );
}
