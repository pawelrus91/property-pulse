"use client";

import { useState, useEffect } from "react";
import Spinner from "@/components/Spinner";
import type { Message as TMessage } from "@/types";
import Message from "./Message";

export default function Messages() {
  const [messages, setMessages] = useState<TMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("/api/messages");

        if (response.status === 200) {
          const data = await response.json();
          setMessages(data);
        }
      } catch (error) {
        console.log("Error fetching messages: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <section className="bg-blue-50">
      <div className="container m-auto py-24 max-w-6xl">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Messages</h1>
          <div className="space-y-4">
            {messages.length === 0 ? (
              <p>You have no message</p>
            ) : (
              messages.map((message) => (
                // @ts-ignore
                <Message key={message._id} message={message} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
