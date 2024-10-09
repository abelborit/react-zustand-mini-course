/* se coloca como -- type StateCreator -- porque solo usaremos el StateCreator como una interface y no queremos que cuando se cree la aplicación se importe nada ahí */
import { create, type StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import { customSessionStorage } from "../storages/customSessionStorage.storage";
// import { customFirebaseStorage } from "../storages/customFirebaseStorage.storage";

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

/* al colocar middlewares una forma de mantener el orden puede ser colocar aparte nuestro objeto de configuración del store o sino también se puede colocar todo junto, ambas formas son válidas */
const storeAPI: StateCreator<PersonState & ActionsState> = (set) => ({
  firstName: "",
  lastName: "",

  /* FORMA 1: si no se usa el state igual se puede enviar o sino como función */
  // setFirstName: (value: string) => set(() => ({ firstName: value })),
  // setLastName: (value: string) => set((state) => ({ lastName: value })),

  /* FORMA 2: como no se usa el state entonces se puede mandar directo ya que si se coloca como una función sin algún parámetro entonces es lo que recibe es lo mismo que se envía y por eso se puede colocar así */
  setFirstName: (value: string) => set({ firstName: value }),
  setLastName: (value: string) => set({ lastName: value }),
});

export const usePersonStore = create<PersonState & ActionsState>()(
  /* los middlewares son funciones que envuelven nuestro objeto de configuración del store, es decir, el -- (set => ({.....})) -- */
  /* este middleware persist nos servirá para grabar nuestro estado o state de forma persistente en el localStorage */
  persist(storeAPI, {
    /* este objeto adicional es para pasarle una configuración la cual llevará, por ejemplo, el name que será el nombre que se le dará al storage con el que quiero que se guarde en el localStorage */
    name: "person-storage",
    /* también podemos personalizar un poco más nuestro middleware y que en vez de que se grabe en el localStorage se guarde en el sessionStorage por ejemplo */
    storage: customSessionStorage, // el storage espera algo de tipo createJSONStorage por eso se coloca createJSONStorage(.....) y tiene un callback para que se ejecute en ese momento. Eso ya está en el archivo -- customSessionStorage.storage.ts --
    // storage: customFirebaseStorage,
  })
);
