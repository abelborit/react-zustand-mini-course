/* https://zustand.docs.pmnd.rs/guides/slices-pattern */
/* https://zustand.docs.pmnd.rs/guides/typescript#slices-pattern */
import { create } from "zustand";
import { createPersonSlice, PersonSlice } from "./person.slice";
import { devtools /*, persist */ } from "zustand/middleware";
import { createGuestSlice, GuestSlice } from "./guest.slice";
import { createDateSlice, DateSlice } from "./date.slice";

type WeddingBoundStoreType = PersonSlice & GuestSlice & DateSlice;

export const useWeddingBoundStore = create<WeddingBoundStoreType>()(
  // persist(
  devtools(
    /* aquí en este -- ...a -- es el spread operator para unir el set, get, store en un solo arreglo para poderlo esparcir facilmente. Es decir, tenemos el set, get, store y al unirlo todo como "a" (o cualquier otro nombre) juntamos todo en una sola variable y luego hacemos su spread operator y se formaría un arreglo con cada una de esas propiedades que tiene */
    // (...a) => {
    //   console.log(a);

    //   return {
    //     ...createPersonSlice(...a),
    //   };
    // }

    (...a) => ({
      ...createPersonSlice(...a),
      ...createGuestSlice(...a),
      ...createDateSlice(...a),
    })
  )
  // { name: "wedding-store" })
);
