import { Voice } from "./../types/types";

export const init = (id: number, blob: Blob): Voice => {
  return {
    id,
    quoteId: 1,
    blob,
    createdAt: new Date(),
    isAccepted: false,
  };
};
