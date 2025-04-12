import { VoiceStore } from "@/types/types";
import { create } from "zustand";
import * as voice from "@/utils/voice";

export const useStore = create<VoiceStore>((set) => ({
  voices: [],
  quotes: [
    {
      id: 1,
      name: "Alice in Wonderland 1/3",
      text: "Alice was beginning to get very tired of sitting by her sister on the bank,",
      url: "/audio/quote-1.mp3",
      createdAt: new Date(),
    },
    {
      id: 2,
      name: "Alice in Wonderland 2/3",
      text: "and of having nothing to do: once or twice she had peeped into the book her sister was reading,",
      url: "/audio/quote-2.mp3",
      createdAt: new Date(),
    },
    {
      id: 3,
      name: "Alice in Wonderland 3/3",
      text: "but it had no pictures or conversations in it, “and what is the use of a book,” thought Alice “without pictures or conversations?”",
      url: "/audio/quote-3.mp3",
      createdAt: new Date(),
    },
  ],

  currentQuoteId: 1,

  addVoice: (newVoice: Blob) =>
    set((state: VoiceStore) => ({
      voices: [...state.voices, voice.init(state.voices.length + 1, newVoice)],
    })),

  toggleAcceptance: (id: number) =>
    set((state: VoiceStore) => ({
      voices: state.voices.map((v) =>
        v.id === id ? { ...v, isAccepted: !v.isAccepted } : v
      ),
    })),

  nextQuote: () =>
    set((state: VoiceStore) => ({
      currentQuoteId:
        state.currentQuoteId < state.quotes.length
          ? state.currentQuoteId + 1
          : state.currentQuoteId,
    })),
  prevQuote: () =>
    set((state: VoiceStore) => ({
      currentQuoteId:
        state.currentQuoteId > 1
          ? state.currentQuoteId - 1
          : state.currentQuoteId,
    })),
}));
