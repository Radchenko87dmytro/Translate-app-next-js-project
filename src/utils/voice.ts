import { Voice } from "./../types/types";

export const init = (id: number,quoteId: number, blob: Blob): Voice => {
  return {
    id,
    quoteId,
    blob,
    createdAt: new Date(),
    isAccepted: false,
  };
};
