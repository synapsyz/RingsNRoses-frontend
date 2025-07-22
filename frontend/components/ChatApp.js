import React, { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase URL or Anon Key is missing. Check your .env.local file.");
}
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const ChatApp = ({
  chatId,
  customerId,
  vendorId,
  onClose,
  customerName,
  vendorName,
}) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!chatId || !customerId) return;

    setLoading(true);

    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("chat_id", chatId)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching messages:", error);
      } else {
        setMessages(data);
      }
      setLoading(false);
    };

    fetchMessages();

    // Set up real-time listener
    const channel = supabase
      .channel(`chat_${chatId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          const newMsg = payload.new;
          if (newMsg.chat_id === chatId) {
            setMessages((prev) => {
              if (!prev.some((msg) => msg.id === newMsg.id)) {
                return [...prev, newMsg];
              }
              return prev;
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [chatId, customerId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    setLoading(true);

    const tempId = `temp-${Math.random().toString(36).substr(2, 9)}`;
    const now = new Date().toISOString();

    const optimisticMessage = {
      id: tempId,
      chat_id: chatId,
      sender_id: customerId,
      text: newMessage,
      created_at: now,
    };

    setMessages((prev) => [...prev, optimisticMessage]);
    setNewMessage("");

    const { data, error } = await supabase.from("messages").insert([
      {
        chat_id: chatId,
        sender_id: customerId,
        text: newMessage,
      },
    ]);

    if (error) {
      console.error("Error sending message:", error);
      setMessages((prev) =>
        prev.filter((msg) => msg.id !== optimisticMessage.id)
      );
      alert("Failed to send message: " + error.message);
    }

    await supabase
      .from("chats")
      .update({
        last_message_text: newMessage,
        last_message_at: new Date().toISOString(),
      })
      .eq("id", chatId);

    setLoading(false);
  };

  if (!chatId || !customerId) {
    return null;
  }

  return (
    <div className="bg-white shadow-xl rounded-lg flex flex-col w-full max-w-md h-[80vh] md:w-96 md:h-96 mx-auto">
      <div className="flex justify-between items-center bg-blue-600 text-white p-4 rounded-t-lg">
        <h3 className="text-lg font-semibold truncate">
          Chat with {vendorName || "Vendor"}
        </h3>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-200 focus:outline-none"
          aria-label="Close Chat"
        >
          &times;
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2 text-sm bg-gray-50" style={{ WebkitOverflowScrolling: "touch" }}>
        {loading && messages.length === 0 && (
          <p className="text-center text-gray-500">Loading messages...</p>
        )}
        {!loading && messages.length === 0 && (
          <p className="text-center text-gray-500">No messages yet. Start the conversation!</p>
        )}

        {messages.map((msg) => {
          const isCustomer = msg.sender_id === customerId;

          return (
            <div key={msg.id} className={`flex ${isCustomer ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[70%] p-2 rounded-lg break-words ${
                  isCustomer
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <p className="font-medium truncate">
                  {isCustomer ? customerName : vendorName}:
                </p>
                <p>{msg.text}</p>
                <span className="text-xs text-gray-500 block text-right mt-1">
                  {new Date(msg.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          );
        })}

        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSendMessage}
        className="p-4 border-t bg-white flex gap-2"
      >
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message..."
          disabled={loading}
          autoComplete="off"
        />
        <button
          type="submit"
          className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
          disabled={loading || newMessage.trim() === ""}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatApp;
