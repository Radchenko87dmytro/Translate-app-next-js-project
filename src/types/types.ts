export interface VoiceStore {
  tracks: Track[];
  quoteGroups: QuoteGroup[];
  voices: Voice[];
  quotes: Quote[];
  currentQuoteId: number;
  addVoice: (newVoice: Blob) => void;
  toggleAcceptance: (id: number) => void;
  deleteHandle: (id: number) => void;
  nextQuote: () => void;
  prevQuote: () => void;

  setCurrentQuoteId: (id: number) => void;

  isNextDisabled: () => boolean | undefined;
}

export interface Track {
  id: number;
  title: string;
}

export interface QuoteGroup {
  id: number;
  trackId: number;
  title: string;
}

export interface Voice {
  id: number;
  quoteId: number;
  blob: Blob;
  createdAt: Date;
  isAccepted: boolean;
}

export interface Quote {
  id: number;
  quoteGroupId: number;
  name: string;
  text: string;
  url: string;
  createdAt: Date;
}

export type GroupedQuoteGroup = QuoteGroup & {
  quotes: Quote[];
};

export type GroupedTrack = Track & {
  groups: GroupedQuoteGroup[];
};
