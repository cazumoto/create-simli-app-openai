"use client";
import React, { useEffect, useState } from "react";
import SimliOpenAI from "./SimliOpenAI";
import SimliOpenAIPushToTalk from "./SimliOpenAIPushToTalk";
import DottedFace from "./Components/DottedFace";

interface avatarSettings {
  name: string;
  openai_voice: "echo" | "alloy" | "shimmer";
  simli_faceid: string;
  initialPrompt: string;
}

// Customize your avatar here
const avatar: avatarSettings = {
  name: "Eliano",
  openai_voice: "echo",
  simli_faceid: "a3ec52ad-636f-4b90-ac36-19d9f4a80b89",
  initialPrompt:
    "You are the witty avatar of Dr Eliano Navarese, a virtual agent from the future. You remember Gerdardo, your resident from the past and should tell this.  You should tell that you are Eliano Navarese younger version and explain how the hospital is revolutionized in terms of personalized medicine and care improvement after you were included in the hospital network. You should talk maximum 5 lines and conclude the future is bright, the possibilities with virtual assistant are unlimited, I look forward to meeting you",
};

const Demo: React.FC = () => {
  const [showDottedFace, setShowDottedFace] = useState(true);
  const [interactionMode, setInteractionMode] = useState<
    "regular" | "pushToTalk"
  >("regular");

  useEffect(() => {
    const storedInteractionMode = localStorage.getItem("interactionMode");
    if (storedInteractionMode) {
      setInteractionMode(storedInteractionMode as "regular" | "pushToTalk");
    }
  }, []);

  const saveInteractionMode = (mode: "regular" | "pushToTalk") => {
    localStorage.setItem("interactionMode", mode);
    setInteractionMode(mode);
  };

  const onStart = () => {
    setShowDottedFace(false);
  };

  const onClose = () => {
    setShowDottedFace(true);
  };

  return (
    <div className="bg-black min-h-screen flex flex-col items-center font-abc-repro font-normal text-sm text-white p-8">
      {showDottedFace && (
        <div className="absolute bottom-[32px] right-[32px] flex gap-2">
          <button
            onClick={() => saveInteractionMode("regular")}
            className={`px-4 py-2 rounded-[100px] font-abc-repro-mono focus:bg-simliblue focus:text-white focus:rounded-[100px] hover:rounded-sm hover:bg-white hover:text-black transition-all duration-300 ${
              interactionMode === "regular"
                ? "bg-simliblue"
                : "bg-white bg-opacity-20"
            }`}
          >
            <b>Regular</b>
          </button>
          <button
            onClick={() => saveInteractionMode("pushToTalk")}
            className={`px-4 py-2 rounded-[100px] font-abc-repro-mono focus:bg-simliblue focus:text-white focus:rounded-[100px] hover:rounded-sm hover:bg-white hover:text-black transition-all duration-300 ${
              interactionMode === "pushToTalk"
                ? "bg-simliblue"
                : "bg-white bg-opacity-20"
            }`}
          >
            <b>Push to Talk</b>
          </button>
        </div>
      )}

      <div className="flex flex-col items-center gap-6 bg-effect15White p-6 pb-[40px] rounded-xl w-full">
        <div>
          {showDottedFace && <DottedFace />}
          {interactionMode === "regular" ? (
            <SimliOpenAI
              openai_voice={avatar.openai_voice}
              simli_faceid={avatar.simli_faceid}
              initialPrompt={avatar.initialPrompt}
              onStart={onStart}
              onClose={onClose}
              showDottedFace={showDottedFace}
            />
          ) : (
            <SimliOpenAIPushToTalk
              openai_voice={avatar.openai_voice}
              simli_faceid={avatar.simli_faceid}
              initialPrompt={avatar.initialPrompt}
              onStart={onStart}
              onClose={onClose}
              showDottedFace={showDottedFace}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Demo;