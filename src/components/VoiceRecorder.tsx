import { ReactMic } from "react-mic";
import { useEffect, useState } from "react";
import { create, StoreApi, UseBoundStore } from "zustand";
import * as voice from "@/utils/voice";

export interface VoiceStore {
  voices: Voice[];
  addVoice: (newVoice: Blob) => void;
  toggleAcceptance: (id: number) => void;
}

export interface Voice {
  id: number;
  blob: Blob;
  createdAt: Date;
  isAccepted: boolean;
}

const useStore: UseBoundStore<StoreApi<VoiceStore>> = create<VoiceStore>(
  (set) => ({
    voices: [],
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
        {voices.map((v) => (
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
        ))}
      </div>
    </div>
  );
}

const VoiceRecorder = () => {
  const { addVoice } = useStore();
  const [recording, setRecording] = useState<boolean>(false);
  const [quote, setQuote] = useState("");

  // Fetch random quote
  const fetchQuote = async () => {
    const res = await fetch("https://api.quotable.io/random");
    const data = await res.json();
    console.log(res);
    console.log(data);
    setQuote(data.content);
    alert(data.content);
  };

  console.log(quote);

  useEffect(() => {
    fetchQuote();
  }, []);

  const startRecording = () => setRecording(true);
  const stopRecording = () => setRecording(false);

  const onStop = (recordedBlob: { blob: Blob }) => {
    console.log("Recorded Blob:", recordedBlob);
    addVoice(recordedBlob.blob);
  };

  return (
    <div className="w-full max-w-xl mx-auto mt-20 p-4 bg-slate-100 border rounded-lg shadow-lg text-center">
      <h2 className="text-xl font-bold mb-4">Voice Recorder</h2>

      <VoiceCounter />

      <div className="mt-6">
        <div className="p-3 rounded-lg bg-gray-200">
          <ReactMic
            className="w-full"
            record={recording}
            onStop={onStop}
            mimeType="audio/wav"
            strokeColor="#FF0000"
            backgroundColor="#E0E0E0"
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-4">
          <button
            className="w-full sm:w-auto px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600 transition"
            // onClick={}
          >
            Take a quote
          </button>
          <button
            className="w-full sm:w-auto px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600 transition"
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
    </div>
  );
};

export default VoiceRecorder;
