import { useState, useEffect, useRef } from "react";
import axios from "axios";

// --- API Setup & Helpers (No changes from your original code) ---
const isNgrok = process.env.NEXT_PUBLIC_APP_ENV === "development" ? false : true;
const getApiUrl = () => {
    return process.env.NEXT_PUBLIC_APP_ENV === "development"
        ? process.env.NEXT_PUBLIC_API_LOCALHOST
        : process.env.NEXT_PUBLIC_HOST;
};
const api_url = getApiUrl();
const api = axios.create({
    baseURL: api_url,
    headers: {
        ...(isNgrok && { "ngrok-skip-browser-warning": "true" }),
    },
});

const formatServiceName = (key) => {
    return key
        .replace(/_/g, ' ')
        .replace(/services/g, '')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
        .trim();
};

const transformApiResponse = (apiData) => {
    if (apiData.error) {
        return [{ type: 'error', content: apiData.message || 'An unknown error occurred.' }];
    }

    if (!apiData.plan_details) {
        return [{ type: 'error', content: 'The plan data is incomplete. Please try again.' }];
    }

    const planItems = [];
    const { plan_details, suggested_services, estimated_budget } = apiData;

    planItems.push({ type: 'heading', content: plan_details.title });
    planItems.push({ type: 'paragraph', content: plan_details.introduction });
    planItems.push({ type: 'paragraph', content: plan_details.summary });

    if (estimated_budget) {
        planItems.push({ type: 'budget', content: estimated_budget });
    }

    if (suggested_services) {
        for (const serviceKey in suggested_services) {
            const vendors = suggested_services[serviceKey].map(vendor => ({
                name: vendor.name,
                url: vendor.detail_url,
                location: vendor.location,
                price: vendor.starting_price,
                about: vendor.about,
                capacity: vendor.capacity,
                price_per_plate: vendor.price_per_plate,
            }));

            if (vendors.length > 0) {
                planItems.push({
                    type: 'recommendation',
                    content: {
                        service_name: formatServiceName(serviceKey),
                        vendors: vendors
                    }
                });
            }
        }
    }
    
    planItems.push({ type: 'paragraph', content: plan_details.closing });

    return planItems;
};


// --- UI Components (No changes needed for Avatar, BudgetView etc.) ---

const AIAvatar = () => (
    <div className="shrink-0 size-10 rounded-full bg-blue-600 flex items-center justify-center">
        <svg className="size-6 text-white" width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="38" height="38" rx="6" fill="currentColor"/><path d="M10 28V18.64C10 13.8683 14.0294 10 19 10C23.9706 10 28 13.8683 28 18.64C28 23.4117 23.9706 27.28 19 27.28H18.25" stroke="white" strokeWidth="1.5"/><path d="M13 28V18.7552C13 15.5104 15.6863 12.88 19 12.88C22.3137 12.88 25 15.5104 25 18.7552C25 22 22.3137 24.6304 19 24.6304H18.25" stroke="white" strokeWidth="1.5"/><ellipse cx="19" cy="18.6554" rx="3.75" ry="3.6" fill="white"/></svg>
    </div>
);

const UserAvatar = () => (
  <div className="shrink-0 size-10 rounded-full bg-slate-500 flex items-center justify-center">
    <span className="text-lg font-medium text-white">U</span>
  </div>
);

const ThinkingIndicator = () => (
    <div className="bg-slate-200 dark:bg-neutral-800 rounded-2xl p-4 flex items-center space-x-2">
        <span className="sr-only">Loading...</span>
        <div className="h-2 w-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-2 w-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-2 w-2 bg-slate-400 rounded-full animate-bounce"></div>
    </div>
);

const BudgetView = ({ budget }) => {
    const formatCurrency = (amount) => {
        if (typeof amount !== 'number') return 'N/A';
        return `₹${amount.toLocaleString('en-IN')}`;
    };

    return (
        <div className="bg-slate-100 dark:bg-neutral-800/60 border border-slate-200 dark:border-neutral-700 rounded-lg p-4">
            <h3 className="font-bold text-lg mb-3">Estimated Budget 💰</h3>
            <div className="space-y-2 text-sm">
                {budget.line_items.map((item, i) => (
                    <div key={i} className="flex justify-between items-center">
                        <p className="text-slate-600 dark:text-neutral-300">{item.service}</p>
                        <p className="font-medium">{formatCurrency(item.estimated_cost)}</p>
                    </div>
                ))}
            </div>
            <hr className="my-3 border-slate-200 dark:border-neutral-700" />
            <div className="space-y-2">
                <div className="flex justify-between font-medium">
                    <p>Subtotal</p>
                    <p>{formatCurrency(budget.subtotal)}</p>
                </div>
                <div className="flex justify-between text-sm text-slate-600 dark:text-neutral-300">
                    <p>Contingency (~10%)</p>
                    <p>{formatCurrency(budget.contingency_fund)}</p>
                </div>
                <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t border-slate-200 dark:border-neutral-700">
                    <p>Grand Total</p>
                    <p>{formatCurrency(budget.grand_total)}</p>
                </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-neutral-400 mt-4 italic">{budget.disclaimer}</p>
        </div>
    );
};


// --- FIXED COMPONENT ---
const PlanRenderer = ({ planItems }) => {
  if (!planItems || !Array.isArray(planItems)) {
    return <p className="text-red-500">Sorry, the plan could not be displayed.</p>;
  }

  return (
    <div className="space-y-4">
      {planItems.map((item, index) => {
        switch (item.type) {
          case 'heading':
            return <h2 key={index} className="text-xl font-semibold">{item.content}</h2>;
          case 'paragraph':
            return <p key={index} className="leading-relaxed">{item.content}</p>;
          case 'budget':
            // ✅ FIX: Use the BudgetView component instead of showing raw JSON
            return <BudgetView key={index} budget={item.content} />;
          case 'recommendation':
            return (
              <div key={index}>
                <h3 className="font-bold text-lg mb-2 mt-4">{item.content.service_name}</h3>
                <div className="grid grid-cols-1 gap-3">
                  {item.content.vendors.map((vendor, i) => (
                    <a href={vendor.url} target="_blank" rel="noopener noreferrer" key={i} className="block bg-slate-100 dark:bg-neutral-800/60 border border-slate-200 dark:border-neutral-700 rounded-lg p-3 hover:border-blue-500 dark:hover:border-blue-500 transition-colors">
                      <div className="font-semibold text-blue-600 dark:text-blue-400">{vendor.name}</div>
                      <p className="text-sm text-slate-600 dark:text-neutral-300 mt-1">{vendor.location}</p>
                      <div
                        className="text-xs text-slate-500 dark:text-neutral-400 mt-2 line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: vendor.about }}
                      />
                      <div className="text-right text-sm font-medium mt-2">
                        Starts at ₹{typeof vendor.price === 'number' ? vendor.price.toLocaleString('en-IN') : 'N/A'}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            );
          case 'error':
              return <p key={index} className="text-red-500 font-medium">{item.content}</p>;
          default:
            return null;
        }
      })}
    </div>
  );
};


// --- FIXED MAIN PAGE COMPONENT ---
export default function AIChatPage() {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      type: 'plan',
      data: {
        "plan_items": [
          { "type": "heading", "content": "Welcome to your AI Event Planner! 🎉" },
          { "type": "paragraph", "content": "I can help you find vendors, estimate budgets, and create a plan for your special day. Just tell me what you need, for example: 'Find me a venue and caterer in Puducherry for 150 guests.'" },
        ]
      }
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const endOfMessagesRef = useRef(null);
  const textareaRef = useRef(null); // ✅ FIX: Ref for textarea

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // ✅ FIX: Auto-resize textarea height based on content
  useEffect(() => {
    if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'; // Reset height
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { sender: 'user', type: 'text', data: input };
    const thinkingMessage = { sender: 'ai', type: 'thinking' };

    setMessages((prev) => [...prev, userMessage, thinkingMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await api.post("/api/v1/get-event-plan/", {
        question: input,
      });

      const planItems = transformApiResponse(response.data);
      const aiResponse = { sender: 'ai', type: 'plan', data: { plan_items: planItems } };
      
      setMessages((prev) => [...prev.filter(m => m.type !== 'thinking'), aiResponse]);

    } catch (error) {
      console.error("Failed to get event plan:", error);
      const errorData = error.response?.data || { error: "Client Error", message: "Sorry, something went wrong on our end. Please try again." };
      const errorItems = transformApiResponse(errorData);
      const errorMessage = { sender: 'ai', type: 'plan', data: { plan_items: errorItems } };
      
      setMessages((prev) => [...prev.filter(m => m.type !== 'thinking'), errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="relative h-screen bg-slate-100 dark:bg-neutral-900 flex flex-col">
        <div className="flex-grow overflow-y-auto pb-36 pt-10">
         <div className="max-w-3xl mx-auto px-4">
              <ul className="space-y-8">
                  {messages.map((message, index) => (
                  <li key={index} className="flex items-start gap-x-4 animate-fade-in-up">
                      {message.sender === 'ai' && <AIAvatar />}
                      
                      {/* ✅ FIX: Simplified and cleaner message bubble rendering logic */}
                      <div className={`w-full ${message.sender === 'user' ? 'flex justify-end' : ''}`}>
                          {message.type === 'thinking' && <ThinkingIndicator />}
                          
                          {message.type === 'plan' && (
                            <div className="max-w-lg p-4 bg-white dark:bg-neutral-800 rounded-2xl shadow-sm">
                                <PlanRenderer planItems={message.data.plan_items} />
                            </div>
                          )}

                          {message.type === 'text' && (
                            <div className="max-w-lg bg-blue-600 text-white p-4 rounded-2xl shadow-sm">
                                <p className="whitespace-pre-wrap">{message.data}</p>
                            </div>
                          )}
                      </div>
                      
                      {message.sender === 'user' && <UserAvatar />}
                  </li>
                  ))}
                  <div ref={endOfMessagesRef} />
              </ul>
         </div>
        </div>

      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-slate-100 dark:from-neutral-900 to-transparent p-4">
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <textarea
              ref={textareaRef} // ✅ FIX: Attach ref
              className="p-4 pr-20 block w-full border-slate-300 dark:border-neutral-700 rounded-xl text-md focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:text-neutral-200 dark:placeholder-neutral-400 resize-none overflow-hidden"
              placeholder="Tell me about your event..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              rows="1" // Starts as 1 row, but will grow
              disabled={isLoading}
            />
            <div className="absolute top-1/2 right-2.5 -translate-y-1/2">
              <button
                type="button"
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="inline-flex shrink-0 justify-center items-center size-9 rounded-lg text-white bg-blue-600 hover:bg-blue-500 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-400 disabled:dark:bg-neutral-700"
              >
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}