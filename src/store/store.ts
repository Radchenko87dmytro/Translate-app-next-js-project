import { VoiceStore } from "@/types/types";
import { create } from "zustand";
import * as voice from "@/utils/voice";

export const useStore = create<VoiceStore>((set, get) => ({
  tracks: [
    {
      id: 1,
      title: "Alice in Wanderland",
    },
    {
      id: 2,
      title: "Another book 1",
    },
    {
      id: 3,
      title: "Another book 2",
    },
  ],
  quoteGroups: [
    {
      id: 1,
      trackId: 1,
      title: "Chapter one",
    },
    {
      id: 2,
      trackId: 1,
      title: "Chapter two",
    },
    {
      id: 3,
      trackId: 1,
      title: "Chapter thre",
    },
  ],
  voices: [],
  quotes: [
    {
      id: 1,
      quoteGroupId: 1,
      name: "Alice in Wonderland",
      text: "Alice was beginning to get very tired of sitting by her sister on the bank,",
      url: "/audio/quote-1.mp3",
      createdAt: new Date(),
    },
    {
      id: 2,
      quoteGroupId: 1,
      name: "Alice in Wonderland",
      text: "and of having nothing to do: once or twice she had peeped into the book her sister was reading,",
      url: "/audio/quote-2.mp3",
      createdAt: new Date(),
    },
    {
      id: 3,
      quoteGroupId: 1,
      name: "Alice in Wonderland",
      text: "but it had no pictures or conversations in it, “and what is the use of a book,” thought Alice “without pictures or conversations?”",
      url: "/audio/quote-3.mp3",
      createdAt: new Date(),
    },

    {
      id: 4,
      quoteGroupId: 2,
      name: "Alice in Wonderland",
      text: "“Curiouser and curiouser!” cried Alice (she was so much surprised, that for the moment she quite forgot how to speak good English)",
      url: "/audio/quote-4.mp3",
      createdAt: new Date(),
    },
    {
      id: 5,
      quoteGroupId: 2,
      name: "Alice in Wonderland",
      text: "“now I’m opening out like the largest telescope that ever was! Good-bye, feet!”",
      url: "/audio/quote-5.mp3",
      createdAt: new Date(),
    },
    {
      id: 6,
      quoteGroupId: 2,
      name: "Alice in Wonderland",
      text: "Oh, my poor little feet, I wonder who will put on your shoes and stockings for you now, dears?",
      url: "/audio/quote-6.mp3",
      createdAt: new Date(),
    },
  ],

  currentQuoteId: 1,

  addVoice: (newVoice: Blob) =>
    set((state: VoiceStore) => ({
      voices: [
        ...state.voices,
        voice.init(state.voices.length + 1, state.currentQuoteId, newVoice),
      ],
    })),

  toggleAcceptance: (id: number) =>
    set((state: VoiceStore) => ({
      voices: state.voices.map((v) =>
        v.id === id ? { ...v, isAccepted: !v.isAccepted } : v
      ),
    })),

  deleteHandle: (id: number) =>
    set((state: VoiceStore) => ({
      voices: state.voices.filter((v) => v.id !== id),
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

  setCurrentQuoteId: (id: number) => set(() => ({ currentQuoteId: id })),

  isNextDisabled: () => {
    const { voices, currentQuoteId, quotes } = get();
    const voicesForCurrentQuote = voices.filter(
      (v) => v.quoteId === currentQuoteId
    );
    const isAtLeastOneAccepted = voicesForCurrentQuote.some(
      (v) => v.isAccepted
    );
    return !isAtLeastOneAccepted || currentQuoteId === quotes.length;
  },
}));
