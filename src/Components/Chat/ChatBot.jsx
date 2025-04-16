import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const toggleChatbot = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom(); // scroll when messages update
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom(); // scroll when chatbot is opened
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = { text: input, sender: "user" };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");

    // Show loader
    setMessages((prev) => [...prev, { sender: "bot", loading: true }]);

    try {
      const response = await fetch("http://127.0.0.1:5000/process_data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: input,
          history: messages.map((msg) => msg.text).join("\n"),
        }),
      });

      const data = await response.json();

      setMessages((prev) => {
        const filtered = prev.filter((msg) => !msg.loading);
        return [...filtered, { text: data, sender: "bot" }];
      });
    } catch (error) {
      setMessages((prev) => {
        const filtered = prev.filter((msg) => !msg.loading);
        return [
          ...filtered,
          { text: "Error: " + error.message, sender: "bot" },
        ];
      });
    }
  };

  // Loader component
  const Loader = () => (
    <div className="inline-block space-x-1">
      <span className="inline-block w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.1s]" />
      <span className="inline-block w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
      <span className="inline-block w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.3s]" />
    </div>
  );

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <div onClick={toggleChatbot} className="bg-white p-2 rounded-full shadow-lg">
        <button className="p-2 bg-green-500 text-white rounded-full shadow-lg relative transition transform hover:scale-110 hover:shadow-xl">
          <MessageCircle size={28} />
        </button>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-16 right-0 w-80 bg-white shadow-2xl rounded-lg overflow-hidden"
        >
          <div className="flex justify-between items-center bg-green-600 p-4 text-white">
            <h3 className="text-lg font-semibold">PolyConnectHub</h3>
            <button onClick={toggleChatbot}>
              <X size={20} />
            </button>
          </div>
          <div className="p-4 h-64 overflow-y-auto">
            {messages.length === 0 ? (
              <p className="text-gray-500">Start the conversation...</p>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}
                >
                  <span
                    className={`inline-block px-3 py-2 rounded-lg ${
                      msg.sender === "user"
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-black"
                    }`}
                  >
                    {msg.loading ? <Loader /> : msg.text}
                  </span>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="flex p-2 border-t">
            <input
              type="text"
              className="flex-1 p-2 border rounded-l-lg focus:outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-green-600 text-white px-4 py-2 rounded-r-lg hover:bg-green-700"
            >
              Send
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
