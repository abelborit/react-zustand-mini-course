import { createJSONStorage, StateStorage } from "zustand/middleware";

/* se puede presionar ctrl + . para agregar las propiedades o métodos que faltan al colocarle el tipo StateStorage */
/* se cambia el nombre a sessionStorageApi porque puede ser que se haga una dependencia cíclica y que como el nombre la función es igual al sessionStorage del navegador, puede ser que adentro de la función en vez de que llame correctamente al sessionStorage del navegador esté llamando a la función como tal lo cual nos dará errores */
const sessionStorageApi: StateStorage = {
  getItem: function (name: string): string | null | Promise<string | null> {
    // console.log("getItem", { name });
    const data = sessionStorage.getItem(name);
    return data;
  },

  setItem: function (name: string, value: string): unknown | Promise<unknown> {
    /* el value ya viene como un string y es más cómodo y facil que ya venga así porque se puede almacenar más facil sin hacer mucha lógica adicional */
    // console.log("setItem", { name, value });
    sessionStorage.setItem(name, value);
    return null;
  },

  removeItem: function (name: string): unknown | Promise<unknown> {
    console.log("removeItem", { name });
    return null;
  },
};

export const customSessionStorage = createJSONStorage(() => sessionStorageApi);
