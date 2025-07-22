// components/VendorChatList.js
import React, { useState, useEffect, useRef } from "react"; // Added useRef for potential future use, not strictly needed for this fix.
import { createClient } from "@supabase/supabase-js";
import ChatApp from "@/components/ChatApp";

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
  const [customerNamesMap, setCustomerNamesMap] = useState({});

  // Use a ref to keep track of fetched customer IDs to avoid re-fetching existing ones.
  // This is helpful for the real-time update logic.
  const fetchedCustomerIds = useRef(new Set());

  useEffect(() => {
    if (!vendorId) {
      setError("Vendor ID is missing.");
      setLoading(false);
      return;
    }

    const fetchChatsAndCustomers = async () => {
      setLoading(true);
      setError(null);

      // 1. Fetch chats first
      const { data: chatsData, error: chatsError } = await supabase
        .from("chats")
        .select(`id, created_at, last_message_text, last_message_at, customer_id, vendor_id`)
        .eq("vendor_id", vendorId)
        .order("last_message_at", { ascending: false, nullsFirst: false });

      if (chatsError) {
        console.error("Error fetching chats:", chatsError);
        setError("Failed to load chats: " + chatsError.message);
        setLoading(false);
        return;
      }

      setChats(chatsData);

      // 2. Extract unique customer IDs that haven't been fetched yet
      const newCustomerIdsToFetch = chatsData
        .map(chat => chat.customer_id)
        .filter(id => id && !fetchedCustomerIds.current.has(id)); // Filter out null/undefined and already fetched

      if (newCustomerIdsToFetch.length > 0) {
        // 3. Fetch customer details for *new* IDs
        const { data: customersData, error: customersError } = await supabase
          .from("customers")
          .select("id, name")
          .in("id", newCustomerIdsToFetch);

        if (customersError) {
          console.error("Error fetching customers:", customersError);
          setError("Failed to load customer details: " + customersError.message);
        } else if (customersData) {
          setCustomerNamesMap(prevMap => {
            const updatedMap = { ...prevMap };
            customersData.forEach(customer => {
              updatedMap[customer.id] = customer.name;
              fetchedCustomerIds.current.add(customer.id); // Add to ref Set
            });
            return updatedMap;
          });
        }
      }

      setLoading(false);
    };

    fetchChatsAndCustomers();

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
        async (payload) => {
          console.log("Chat update received (realtime):", payload.eventType, payload.new);
          if (payload.eventType === "INSERT") {
            setChats((prevChats) => [payload.new, ...prevChats]);
            // If new chat, also fetch the new customer's name if not already known
            if (payload.new.customer_id && !fetchedCustomerIds.current.has(payload.new.customer_id)) {
                const { data: customerData, error: customerError } = await supabase
                  .from("customers")
                  .select("id, name")
                  .eq("id", payload.new.customer_id)
                  .single();

                if (!customerError && customerData) {
                  setCustomerNamesMap(prevMap => ({ ...prevMap, [customerData.id]: customerData.name }));
                  fetchedCustomerIds.current.add(customerData.id); // Add to ref Set
                } else {
                  console.error("Error fetching customer for new chat:", customerError);
                }
            }
          } else if (payload.eventType === "UPDATE") {
            // Optimistically update, but consider re-fetching for comprehensive update if needed
            setChats((prevChats) =>
              prevChats.map((chat) =>
                chat.id === payload.new.id ? { ...chat, ...payload.new } : chat
              ).sort((a, b) => new Date(b.last_message_at || 0) - new Date(a.last_message_at || 0))
            );
          }
        }
      )
      .subscribe();

    return () => {
      console.log(`Unsubscribing from vendor_chats_${vendorId}`);
      supabase.removeChannel(chatSubscription);
    };
  }, [vendorId]); // Removed customerNamesMap from dependencies here.

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
                  {customerNamesMap[chat.customer_id] || "Unknown Customer"}
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
      >
        {selectedChat ? (
          <ChatApp
            chatId={selectedChat.id}
            customerId={selectedChat.customer_id}
            vendorId={vendorId}
            onClose={handleCloseChat}
            customerName={customerNamesMap[selectedChat.customer_id] || "Customer"}
            vendorName={vendorName}
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