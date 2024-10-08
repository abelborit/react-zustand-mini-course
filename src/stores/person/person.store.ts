import { create } from "zustand";

/* se puede tener todo junto o sino por separado en dos interfaces */
// interface PersonState {
//   firstName: string;
//   lastName: string;

//   setFirstName: (value: string) => void;
//   setLastName: (value: string) => void;
// }

interface PersonState {
  firstName: string;
  lastName: string;
}

interface ActionsState {
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
}

export const usePersonStore = create<PersonState & ActionsState>()((set) => ({
  firstName: "",
  lastName: "",

  /* FORMA 1: si no se usa el state igual se puede enviar o sino como función */
  // setFirstName: (value: string) => set(() => ({ firstName: value })),
  // setLastName: (value: string) => set((state) => ({ lastName: value })),

  /* FORMA 2: como no se usa el state entonces se puede mandar directo ya que si se coloca como una función sin algún parámetro entonces es lo que recibe es lo mismo que se envía y por eso se puede colocar así */
  setFirstName: (value: string) => set({ firstName: value }),
  setLastName: (value: string) => set({ lastName: value }),
}));
