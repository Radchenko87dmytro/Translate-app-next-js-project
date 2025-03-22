import { Voice } from "@/components/VoiceRecorder";

export const init = (id: number, blob: Blob): Voice => {
  return {
    id,
    blob,
    createdAt: new Date(),
    isAccepted: false,
  };
};
