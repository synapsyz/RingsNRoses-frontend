// components/VendorChatList.js
import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import ChatApp from "@/components/ChatApp"; // Assuming ChatApp is in the same 'components' folder

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase URL or Anon Key is missing. Check your .env.local file.");
}
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const VendorChatList = ({ vendorId, vendorName }) => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!vendorId) {
      setError("Vendor ID is missing.");
      setLoading(false);
      return;
    }

    const fetchChats = async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from("chats")
        .select(`
          id,
          created_at,
          last_message_text,
          last_message_at,
          customer_id,
          vendor_id,
          customers (
            id,
            name // Assuming customers table has an 'id' and 'name' column
          )
        `)
        .eq("vendor_id", vendorId)
        .order("last_message_at", { ascending: false, nullsFirst: false }); // Order by last message date

      if (error) {
        console.error("Error fetching chats:", error);
        setError("Failed to load chats: " + error.message);
      } else {
        setChats(data);
      }
      setLoading(false);
    };

    fetchChats();

    // Set up real-time subscription for chat updates (e.g., new last message)
    const chatSubscription = supabase
      .channel(`vendor_chats_${vendorId}`)
      .on(
        "postgres_changes",
        {
          event: "*", // Listen for INSERT, UPDATE, DELETE on chats table
          schema: "public",
          table: "chats",
          filter: `vendor_id=eq.${vendorId}`,
        },
        (payload) => {
          console.log("Chat update received (realtime):", payload.eventType, payload.new);
          if (payload.eventType === "INSERT") {
            // Add new chat
            setChats((prevChats) => [payload.new, ...prevChats]);
          } else if (payload.eventType === "UPDATE") {
            // Update existing chat (e.g., last message changed)
            // Ensure payload.new contains the `customers` object if it's being relied upon for display
            // For a robust update, you might re-fetch the specific chat or ensure payload.new is complete.
            setChats((prevChats) =>
              prevChats.map((chat) => {
                if (chat.id === payload.new.id) {
                  // Merge new data, preserving nested objects if not fully present in payload.new
                  return { ...chat, ...payload.new, customers: chat.customers || payload.new.customers };
                }
                return chat;
              }).sort((a, b) => new Date(b.last_message_at || 0) - new Date(a.last_message_at || 0)) // Re-sort after update
            );
          }
          // No specific handling for DELETE here, but you could add it
        }
      )
      .subscribe();

    return () => {
      console.log(`Unsubscribing from vendor_chats_${vendorId}`);
      supabase.removeChannel(chatSubscription);
    };
  }, [vendorId]);

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
  };

  const handleCloseChat = () => {
    setSelectedChat(null);
  };

  if (!vendorId) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-red-600 font-semibold">Error: Vendor ID not provided.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-gray-600">Loading chats...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Chat List Sidebar */}
      <div
        className={`w-full md:w-1/3 bg-white shadow-lg p-4 flex flex-col ${selectedChat ? "hidden md:flex" : "flex"}`}
        // Hide list on mobile if chat is open
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Chats</h2>
        {chats.length === 0 ? (
          <p className="text-gray-500">No active chats found.</p>
        ) : (
          <ul className="flex-1 overflow-y-auto space-y-2">
            {chats.map((chat) => (
              <li
                key={chat.id}
                className={`p-3 rounded-lg cursor-pointer transition-colors duration-200
                  ${selectedChat?.id === chat.id ? "bg-blue-100 border-l-4 border-blue-500" : "bg-gray-50 hover:bg-gray-100"}`}
                onClick={() => handleSelectChat(chat)}
              >
                <div className="font-semibold text-gray-800">
                  {chat.customers ? chat.customers.name : "Unknown Customer"}
                </div>
                <div className="text-sm text-gray-600 truncate">
                  {chat.last_message_text || "No messages yet."}
                </div>
                {chat.last_message_at && (
                  <div className="text-xs text-gray-400 text-right mt-1">
                    {new Date(chat.last_message_at).toLocaleString()}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Chat App Section */}
      <div
        className={`w-full md:w-2/3 flex flex-col ${selectedChat ? "flex" : "hidden md:flex"}`}
        // Show chat on mobile if chat is open
      >
        {selectedChat ? (
          <ChatApp
            chatId={selectedChat.id}
            customerId={selectedChat.customer_id}
            vendorId={vendorId} // Pass the vendorId to ChatApp
            onClose={handleCloseChat}
            customerName={selectedChat.customers ? selectedChat.customers.name : "Customer"}
            vendorName={vendorName} // Pass vendorName
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 bg-white shadow-lg rounded-lg m-4">
            Select a chat from the left to start messaging.
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorChatList;