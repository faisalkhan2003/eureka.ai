import { useEffect, useRef, useState } from "react";
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";
import { IconUser } from "@tabler/icons-react";
import { AIMessage } from "./AiMessage";

export function ChatbotUI() {
  const placeholders = [
    "How to find good research papers?",
    "How to write a research paper?",
    "How to choose a research topic?",
    "How to cite references in research papers?",
    "How to publish a research paper?",
  ];

  const [inp, setInp] = useState("");
  const [messages, setMessages] = useState([]); // store chat history
  const [chatStarted, setChatStarted] = useState(false);

  const handleChange = (e) => {
    setInp(e.target.value);
  };
  const messagesEndRef = useRef(null);
  const onSubmit = (e) => {
    e.preventDefault();
    if (!inp.trim()) return;

    // Mark chat as started
    if (!chatStarted) setChatStarted(true);

    // Add user message
    const newMessages = [...messages, { role: "user", text: inp }];
    setMessages(newMessages);
    setInp("");

    // Call backend
    fetch("http://localhost:8000/api/ai/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: inp }),
    })
      .then((response) => response.json())
      .then((data) => {
        setMessages((prev) => [
          ...prev,
          { role: "ai", text: data.response || "Error: No response" },
        ]);
      })
      .catch((err) => {
        console.error("Error:", err);
        setMessages((prev) => [
          ...prev,
          { role: "ai", text: "Something went wrong!" },
        ]);
      });
  };
 useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  return (
    <div className="h-screen w-full px-15 pt-15 flex flex-col bg-white dark:bg-black">
      {/* Initial state (centered input + title) */}
      {!chatStarted ? (
        <div className="flex flex-col justify-center items-center px-4">
          <h2 className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl dark:text-white text-black">
            Eureka.ai
          </h2>
          <PlaceholdersAndVanishInput
            placeholders={placeholders}
            onChange={handleChange}
            onSubmit={onSubmit}
          />
        </div>
      ) : (
        // Chat interface (messages + bottom input)
        <>
          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto px-4 py-6 pb-8 space-y-4 scroll-auto">
            {messages.map((msg, i) => (
              <div className={`flex gap-4 ${msg.text.length > 300?"items-start":"items-center"}`}>
              {msg.role==="user"?<IconUser/>:<div
          className="size-6 rounded-full bg-gradient-to-br from-violet-500 to-pink-500" />}
              {msg.role === "user"?<div
                key={i}
                className={`w-full p-3 rounded-2xl ${
                  msg.role === "user"
                  ? "bg-violet-200"
                  : msg.text.length > 100?"pt-0 dark:text-white":"pt-3 dark:text-white"
                }`}
                >
                {msg.text}
              </div>:<div className={`w-full p-3 rounded-2xl ${
                  msg.text.length > 100
                  ?"pt-0 dark:text-white":"pt-3 dark:text-white"
                }`}><AIMessage text={msg.text}/></div>}
                </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat input at bottom */}
          <div className="border-t sticky bg-white bottom-0 border-gray-300 dark:border-gray-700 p-4">
            <PlaceholdersAndVanishInput
              placeholders={placeholders}
              onChange={handleChange}
              onSubmit={onSubmit}
              value={inp}
            />
          </div>
        </>
      )}
    </div>
  );
}
