import { useEffect, useRef, useState } from "react";
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";
import { IconUser } from "@tabler/icons-react";
import { AIMessage } from "./AiMessage";

export function ResearchGuideUI() {
  const placeholders = [
    "How to find good research papers?",
    "How to write a research paper?",
    "How to choose a research topic?",
    "How to cite references in research papers?",
    "How to publish a research paper?",
  ];

  const [inp, setInp] = useState("");
  const [res, setRes] = useState("Responding...")
  const [chatStarted, setChatStarted] = useState(false)
  const handleChange = (e) => {
    setInp(e.target.value);
  };
  const messagesEndRef = useRef(null);
  const onSubmit = (e) => {
    e.preventDefault();
    setChatStarted(true)
    if (!inp.trim()) return;
    fetch("http://localhost:8000/api/ai/guide", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: inp }),
    })
      .then((response) => response.json())
      .then((data) => {
        setRes(data.response)
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  };
  return (
    <div className="h-screen w-full px-15 pt-15 flex flex-col bg-white dark:bg-black">
      {/* Initial state (centered input + title) */}
      {!chatStarted ? (
        <div className="flex flex-1 flex-col justify-center items-center px-4">
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
          <div className="flex-1 overflow-y-auto px-4 py-6 pb-16 space-y-4 scroll-auto">
              <div className={`flex flex-col gap-4 items-start`}>
              <div className="flex items-center gap-4"><IconUser/>{inp}</div>
            <div className={`flex ${ res.length > 100
                ?"items-start":"items-center"}`}>
            <div className="size-6 rounded-full bg-gradient-to-br from-violet-500 to-pink-500" />
            <div className={`w-full p-3 rounded-2xl ${ res.length > 100
                ?"pt-0 dark:text-white":"pt-3 dark:text-white"
            }`}><AIMessage text={res}/>
            </div>
            </div>
            </div>
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
