export interface VoiceStore {
  voices: Voice[];
  quotes: Quote[];
  currentQuoteId: number;
  addVoice: (newVoice: Blob) => void;
  toggleAcceptance: (id: number) => void;
  deleteHandle: (id: number) => void;
  nextQuote: () => void;
  prevQuote: () => void;
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
  name: string;
  text: string;
  url: string;
  createdAt: Date;
}
