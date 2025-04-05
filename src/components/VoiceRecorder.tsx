"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { create, StoreApi, UseBoundStore } from "zustand";
import * as voice from "@/utils/voice";

// Dynamically import ReactMic (avoids SSR)
const ReactMic = dynamic(
  () => import("react-mic").then((mod) => mod.ReactMic),
  {
    ssr: false,
  }
);

export interface VoiceStore {
  voices: Voice[];
  quotes: Quote[];
  currentQuoteId: number;
  addVoice: (newVoice: Blob) => void;
  toggleAcceptance: (id: number) => void;
  nextQuote: () => void;
  prevQuote: () => void;
}

export interface Voice {
  id: number;
  blob: Blob;
  createdAt: Date;
  isAccepted: boolean;
}
export interface Quote {
  id: number;
  name: string;
  url: string;
  createdAt: Date;
}

const useStore: UseBoundStore<StoreApi<VoiceStore>> = create<VoiceStore>(
  (set) => ({
    voices: [],
    quotes: [
      // fictional quote (fake/init)
      {
        id: 1,
        name: "Alice in Wonderland",
        // url: "https://ia904602.us.archive.org/29/items/alicesadventure_abridged_pc_librivox/alicesadventuresinwonderlandabridged_01_carroll_64kb.mp3",
        url: "/audio/quote-1.mp3",
        createdAt: new Date(),
      },
      {
        id: 2,
        name: "Alice in Wonderland",
        // url: "https://ia904602.us.archive.org/29/items/alicesadventure_abridged_pc_librivox/alicesadventuresinwonderlandabridged_01_carroll_64kb.mp3",
        url: "/audio/quote-2.mp3",
        createdAt: new Date(),
      },
      {
        id: 3,
        name: "Alice in Wonderland",
        // url: "https://ia904602.us.archive.org/29/items/alicesadventure_abridged_pc_librivox/alicesadventuresinwonderlandabridged_01_carroll_64kb.mp3",
        url: "/audio/quote-3.mp3",
        createdAt: new Date(),
      },
    ],

    currentQuoteId: 1,

    addVoice: (newVoice: Blob) =>
      set((state) => ({
        voices: [
          ...state.voices,
          voice.init(state.voices.length + 1, newVoice),
        ],
      })),

    toggleAcceptance: (id: number) =>
      set((state) => ({
        voices: state.voices.map((v) =>
          v.id === id ? { ...v, isAccepted: !v.isAccepted } : v
        ),
      })),

    nextQuote: () =>
      set((state) => ({
        currentQuoteId:
          state.currentQuoteId < state.quotes.length
            ? state.currentQuoteId + 1
            : state.currentQuoteId,
      })),
    prevQuote: () =>
      set((state) => ({
        currentQuoteId:
          state.currentQuoteId > 1
            ? state.currentQuoteId - 1
            : state.currentQuoteId,
      })),
  })
);

function VoiceCounter() {
  const voices = useStore((state) => state.voices);
  const toggleAcceptance = useStore((state) => state.toggleAcceptance);

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

const VoiceRecorder = () => {
  const { addVoice, quotes, currentQuoteId, nextQuote, prevQuote } = useStore();
  const [recording, setRecording] = useState<boolean>(false);
  // const [quote, setQuote] = useState<string | undefined>(undefined);

  const chosenQuote = quotes.find((q) => q.id == currentQuoteId);

  // const fetchQuote = async () => {
  //   try {

  //     if (chosenQuote) {
  //       const res = await fetch(chosenQuote.url);

  //       if (!res.ok) {
  //         throw new Error(`HTTP error! Status: ${res.status}`);
  //       }

  //       const blob = await res.blob();
  //       const audioURL = URL.createObjectURL(blob);

  //       setQuote(audioURL); // Store URL if needed
  //       // Play the audio or save it for later use
  //       console.log("Audio loaded:", audioURL);

  //       console.log(res);
  //       console.log(blob);
  //       // setQuote(blob);
  //       // alert(blob);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching quote:", error);
  //   }
  // };

  // console.log(quote);

  useEffect(() => {
    // fetchQuote();
  }, []);
  const startRecording = () => setRecording(true);
  const stopRecording = () => setRecording(false);

  const onStop = (recordedBlob: { blob: Blob }) => {
    addVoice(recordedBlob.blob);
  };

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

      <div className="flex-row sm:flex-row justify-center items-center gap-4 mt-4">
        <blockquote
          className={`${
            chosenQuote?.id == 1 ? "border-2 border-gray-500 rounded-lg" : ""
          } m-2 p-2 max-w-full sm:max-w-2xl lg:max-w-4xl`}
        >
          Alice was beginning to get very tired of sitting by her sister on the
          bank,
          {chosenQuote?.id == 1 && (
            <audio controls>
              <source src={chosenQuote.url} type="audio/mp3" />
              Your browser does not support the audio tag.
            </audio>
          )}
        </blockquote>

        <blockquote
          className={`${
            chosenQuote?.id == 2 ? "border-2 border-gray-500 rounded-lg" : ""
          } m-2 p-2 max-w-full sm:max-w-2xl lg:max-w-4xl`}
        >
          and of having nothing to do: once or twice she had peeped into the
          book her sister was reading,
          {chosenQuote?.id == 2 && (
            <audio controls>
              <source src={chosenQuote.url} type="audio/mp3" />
              Your browser does not support the audio tag.
            </audio>
          )}
        </blockquote>

        <blockquote
          className={`${
            chosenQuote?.id == 3 ? "border-2 border-gray-500 rounded-lg" : ""
          } m-2 p-2 max-w-full sm:max-w-2xl lg:max-w-4xl`}
        >
          but it had no pictures or conversations in it, “and what is the use of
          a book,” thought Alice “without pictures or conversations?”
          {chosenQuote?.id == 3 && (
            <audio controls>
              <source src={chosenQuote.url} type="audio/mp3" />
              Your browser does not support the audio tag.
            </audio>
          )}
        </blockquote>
        {/* {chosenQuote && (
          <audio controls>
            <source src={chosenQuote.url} type="audio/mp3" />
            Your browser does not support the audio tag.
          </audio>
        )} */}

        <div className="flex justify-center gap-4 mt-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            onClick={prevQuote}
            disabled={currentQuoteId === 1}
          >
            Previous Quote
          </button>

          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            onClick={nextQuote}
            disabled={currentQuoteId === quotes.length}
          >
            Next Quote
          </button>
        </div>

        <button
          className="w-full sm:w-auto px-6 py-3 mx-6 bg-green-500 text-white rounded hover:bg-green-600 transition"
          onClick={startRecording}
        >
          Start Recording
        </button>
        <button
          className="w-full sm:w-auto px-6 py-3 bg-red-500 text-white rounded hover:bg-red-600 transition"
          onClick={stopRecording}
        >
          Stop Recording
        </button>
      </div>
    </div>
  );
};

export default VoiceRecorder;
