/* aquí no se creará un store como tal, sino un slice porque para crear un store se necesita el -- create(.....) -- de Zustand pero al final sería una función que recibirá el "set" y esa función al colocarla en el store entonces este se va a encargar de enviar ese "set" */
/* luego se creará un "BoundStore" que será la combinación de nuestros slices */
import { StateCreator } from "zustand";

export interface PersonSlice {
  firstName: string;
  lastName: string;

  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
}

export const createPersonSlice: StateCreator<PersonSlice> = (set) => ({
  firstName: "",
  lastName: "",

  setFirstName: (firstName: string) => set({ firstName }),
  setLastName: (lastName: string) => set({ lastName }),
});
