import { VoiceStore } from "@/types/types";
import { create } from "zustand";
import * as voice from "@/utils/voice";

export const useStore = create<VoiceStore>((set, get) => ({
  tracks: [
    {
      id: 1,
      title: "Alice in Wonderland",
    },
    {
      id: 2,
      title: "The Time Machine",
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
    {
      id: 4,
      trackId: 2,
      title: "Chapter one",
    },
    {
      id: 5,
      trackId: 2,
      title: "Chapter two",
    },
    {
      id: 6,
      trackId: 2,
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
      url: "/audio/alice_in_wonderland/chapter_one/quote-1.mp3",
      createdAt: new Date(),
      quoteNumber: null,
    },
    {
      id: 2,
      quoteGroupId: 1,
      name: "Alice in Wonderland",
      text: "and of having nothing to do: once or twice she had peeped into the book her sister was reading,",
      url: "/audio/alice_in_wonderland/chapter_one/quote-2.mp3",
      createdAt: new Date(),
      quoteNumber: null,
    },
    {
      id: 3,
      quoteGroupId: 1,
      name: "Alice in Wonderland",
      text: "but it had no pictures or conversations in it, “and what is the use of a book,” thought Alice “without pictures or conversations?”",
      url: "/audio/alice_in_wonderland/chapter_one/quote-3.mp3",
      createdAt: new Date(),
      quoteNumber: null,
    },

    {
      id: 4,
      quoteGroupId: 2,
      name: "Alice in Wonderland",
      text: "“Curiouser and curiouser!” cried Alice (she was so much surprised, that for the moment she quite forgot how to speak good English)",
      url: "/audio/alice_in_wonderland/chapter_two/quote-4.mp3",
      createdAt: new Date(),
      quoteNumber: null,
    },
    {
      id: 5,
      quoteGroupId: 2,
      name: "Alice in Wonderland",
      text: "“now I’m opening out like the largest telescope that ever was! Good-bye, feet!”",
      url: "/audio/alice_in_wonderland/chapter_two/quote-5.mp3",
      createdAt: new Date(),
      quoteNumber: null,
    },
    {
      id: 6,
      quoteGroupId: 2,
      name: "Alice in Wonderland",
      text: "Oh, my poor little feet, I wonder who will put on your shoes and stockings for you now, dears?",
      url: "/audio/alice_in_wonderland/chapter_two/quote-6.mp3",
      createdAt: new Date(),
      quoteNumber: null,
    },
    {
      id: 7,
      quoteGroupId: 3,
      name: "Alice in Wonderland",
      text: "They were indeed a queer-looking party that assembled on the bank—the birds with draggled feathers,",
      url: "/audio/alice_in_wonderland/chapter_three/quote-7.mp3",
      createdAt: new Date(),
      quoteNumber: null,
    },
    {
      id: 8,
      quoteGroupId: 3,
      name: "Alice in Wonderland",
      text: "the animals with their fur clinging close to them,",
      url: "/audio/alice_in_wonderland/chapter_three/quote-8.mp3",
      createdAt: new Date(),
      quoteNumber: null,
    },
    {
      id: 9,
      quoteGroupId: 3,
      name: "Alice in Wonderland",
      text: "and all dripping wet, cross, and uncomfortable.",
      url: "/audio/alice_in_wonderland/chapter_three/quote-9.mp3",
      createdAt: new Date(),
      quoteNumber: null,
    },
    {
      id: 10,
      quoteGroupId: 4,
      name: "The time machine",
      text: "The Time Traveller (for so it will be convenient to speak of him) was expoundinga recondite matter to us.",
      url: "/audio/the_time_machine/chapter_one/quote-10.mp3",
      createdAt: new Date(),
      quoteNumber: null,
    },
    {
      id: 11,
      quoteGroupId: 4,
      name: "The time machine",
      text: "His grey eyes shone and twinkled, and his usually paleface was flushed and animated.",
      url: "/audio/the_time_machine/chapter_one/quote-11.mp3",
      createdAt: new Date(),
      quoteNumber: null,
    },
    {
      id: 12,
      quoteGroupId: 4,
      name: "The time machine",
      text: "The fire burned brightly, and the soft radiance ofthe incandescent lights in the lilies of silver caught the bubbles that flashed andpassed in our glasses",
      url: "/audio/the_time_machine/chapter_one/quote-12.mp3",
      createdAt: new Date(),
      quoteNumber: null,
    },
    {
      id: 13,
      quoteGroupId: 5,
      name: "The time machine",
      text: "I think that at that time none of us quite believed in the Time Machine.",
      url: "/audio/the_time_machine/chapter_two/quote-13.mp3",
      createdAt: new Date(),
      quoteNumber: null,
    },
    {
      id: 14,
      quoteGroupId: 5,
      name: "The time machine",
      text: "Thefact is, the Time Traveller was one of those men who are too clever to bebelieved:",
      url: "/audio/the_time_machine/chapter_two/quote-14.mp3",
      createdAt: new Date(),
      quoteNumber: null,
    },
    {
      id: 15,
      quoteGroupId: 5,
      name: "The time machine",
      text: "you never felt that you saw all round him; you always suspectedsome subtle reserve, some ingenuity in ambush, behind his lucid frankness",
      url: "/audio/the_time_machine/chapter_two/quote-15.mp3",
      createdAt: new Date(),
      quoteNumber: null,
    },
    {
      id: 16,
      quoteGroupId: 6,
      name: "The time machine",
      text: "‘I told some of you last Thursday of the principles of the Time Machine,",
      url: "/audio/the_time_machine/chapter_three/quote-16.mp3",
      createdAt: new Date(),
      quoteNumber: null,
    },
    {
      id: 17,
      quoteGroupId: 6,
      name: "The time machine",
      text: "and showed you the actual thing itself, incomplete in the workshop",
      url: "/audio/the_time_machine/chapter_three/quote-17.mp3",
      createdAt: new Date(),
      quoteNumber: null,
    },
    {
      id: 18,
      quoteGroupId: 6,
      name: "The time machine",
      text: "There it is now, a little travel-worn, truly; and one of the ivory bars is cracked, and a brass rail bent; but the rest of it’s sound enough.",
      url: "/audio/the_time_machine/chapter_three/quote-18.mp3",
      createdAt: new Date(),
      quoteNumber: null,
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
