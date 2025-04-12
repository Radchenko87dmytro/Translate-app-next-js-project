"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useStore } from "@/store/store";
import { Quote, VoiceStore } from "@/types/types";

// Dynamically import ReactMic (avoids SSR)
const ReactMic = dynamic(
  () => import("react-mic").then((mod) => mod.ReactMic),
  {
    ssr: false,
  }
);

function VoiceCounter() {
  const voices = useStore((state: VoiceStore) => state.voices);
  const toggleAcceptance = useStore(
    (state: VoiceStore) => state.toggleAcceptance
  );

  return (
    <div>
      <h1 className="text-center text-lg font-semibold mb-4">
        {voices.length} Voice{voices.length !== 1 ? "s" : ""} Recorded
      </h1>

      <div className="flex flex-col gap-4">
        {voices.map((v) => {
          return (
            <div
              key={v.id}
              className="flex flex-col md:flex-row items-center bg-white shadow p-4 rounded-lg"
            >
              <div className="flex-1 w-full">
                <h3 className="text-md font-semibold mb-2">Playback #{v.id}</h3>
                <audio
                  controls
                  src={URL.createObjectURL(v.blob)}
                  className="w-full"
                />
              </div>
              <div className="mt-4 md:mt-0 md:ml-4 w-full md:w-auto text-center">
                <button
                  className={`w-full md:w-auto px-4 py-2 rounded ${
                    v.isAccepted ? "bg-green-500" : "bg-red-500"
                  } text-white`}
                  onClick={() => toggleAcceptance(v.id)}
                >
                  {v.isAccepted ? "Accepted" : "Not Accepted"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const ShowQuote = ({ currentQuote }: { currentQuote: Quote | undefined }) => {
  {
    console.log(currentQuote?.url);
  }
  return (
    <>
      {currentQuote ? (
        <div className="flex-row sm:flex-row justify-center items-center gap-4 mt-4">
          <h2 className="text-xl font-bold">{currentQuote.name}</h2>
          <blockquote className="border-2 border-gray-500 rounded-lg m-2 p-2 max-w-full sm:max-w-2xl lg:max-w-4xl">
            {currentQuote.text}
            <audio controls>
              <source src={currentQuote.url} type="audio/mp3" />
              Your browser does not support the audio tag.
            </audio>
          </blockquote>
        </div>
      ) : (
        <p>Loading quote...</p>
      )}
    </>
  );
};

const VoiceRecorder = () => {
  const { addVoice, quotes, currentQuoteId, nextQuote, prevQuote } = useStore();
  const [recording, setRecording] = useState<boolean>(false);
  const [currentQuote, setCurrentQuote] = useState<Quote | undefined>(
    undefined
  );

  useEffect(() => {
    setCurrentQuote(() => quotes.find((q) => q.id == currentQuoteId));
  }, [currentQuoteId, quotes]);

  const startRecording = () => setRecording(true);
  const stopRecording = () => setRecording(false);
  const onStop = (recordedBlob: { blob: Blob }) => addVoice(recordedBlob.blob);

  return (
    <div className="w-full max-w-xl mx-auto mt-20 p-4 bg-slate-100 border rounded-lg shadow-lg text-center">
      <h2 className="text-xl font-bold mb-4">Voice Recorder</h2>

      <VoiceCounter />

      <ReactMic
        className="w-full m-2 p-2 rounded-lg bg-gray-200"
        record={recording}
        onStop={onStop}
        mimeType="audio/wav"
        strokeColor="#FF0000"
        backgroundColor="#E0E0E0"
      />

      <ShowQuote currentQuote={currentQuote} />

      <div className="flex justify-center gap-4 mt-4">
        <button
          className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          onClick={prevQuote}
          disabled={currentQuoteId === 1}
        >
          Previous Quote
        </button>

        <button
          className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          onClick={nextQuote}
          disabled={currentQuoteId === quotes.length}
        >
          Next Quote
        </button>
      </div>
      <div>
        <button
          className="w-full sm:w-auto px-6 py-3 m-3 bg-green-500 text-white rounded hover:bg-green-600 transition"
          onClick={startRecording}
        >
          Start Recording
        </button>
        <button
          className="w-full sm:w-auto px-6 py-3 m-3 bg-red-500 text-white rounded hover:bg-red-600 transition"
          onClick={stopRecording}
        >
          Stop Recording
        </button>
      </div>
    </div>
  );
};

export default VoiceRecorder;
