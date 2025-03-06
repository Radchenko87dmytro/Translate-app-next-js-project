"use client";

import { ReactMic } from "react-mic";
import { useState } from "react";
import { create, StoreApi, UseBoundStore } from "zustand";

interface vioseStore {
  voices: Blob[];
  addVoice: (newVoice: Blob) => void;
}
const useStore: UseBoundStore<StoreApi<vioseStore>> = create<vioseStore>(
  (set) => ({
    voices: [],
    addVoice: (newVoice: Blob) =>
      set((state) => ({ voices: [...state.voices, newVoice] })),
  })
);

function VoiceCounter() {
  const voices = useStore((state) => state.voices);
  return (
    <h1>
      {voices.length} voicesCount
      <div className="flex-col justify-center items-center">
        {voices.map((voice, index) => (
          <div key={index} className="mt-4 block justify-center items-center">
            <h3 className="text-md font-semibold">Playback: {index + 1}</h3>
            <audio
              className="block"
              controls
              src={URL.createObjectURL(voice)}
            />
          </div>
        ))}
      </div>
    </h1>
  );
}

const VoiceRecorder = () => {
  const { addVoice } = useStore();
  const [recording, setRecording] = useState<boolean>(false);
  // const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

  const startRecording = () => setRecording(true);
  const stopRecording = () => setRecording(false);

  const onStop = (recordedBlob: { blob: Blob }) => {
    console.log("Recorded Blob:", recordedBlob);
    // setAudioBlob(recordedBlob.blob);
    addVoice(recordedBlob.blob);
  };

  return (
    <div className="flex-col justify-center items-center p-4 border rounded-lg shadow-lg w-full text-center">
      <h2 className="text-lg font-bold mb-2">Voice Recorder</h2>
      <VoiceCounter />
      <div className="flex justify-center items-center w-full ">
        <ReactMic
          record={recording}
          onStop={onStop}
          mimeType="audio/wav"
          strokeColor="#FF0000"
          backgroundColor="#E0E0E0"
        />
      </div>

      <div className="mt-4">
        <button
          className="px-4 py-2 bg-green-500 text-white rounded mr-2"
          onClick={startRecording}
        >
          Start Recording
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded"
          onClick={stopRecording}
        >
          Stop Recording
        </button>
      </div>
      {/* {audioBlob && (
        <div className="mt-4">
          <h3 className="text-md font-semibold">Playback:</h3>
          <audio controls src={URL.createObjectURL(audioBlob)} />
        </div>
      )} */}
    </div>
  );
};

export default VoiceRecorder;
