import { createJSONStorage, StateStorage } from "zustand/middleware";

/* al colocar la url correcta y válida dada por Firebase, se podría ir a Postman y colocar -- https://zustand-storage-default-rtdb.firebaseio.com/zustand/...... -- para poder visualizar el usuario que le estamos colocando. Se está añadiendo a la url por defecto de Firebase el -- /zustand/...... -- para indicar que esa parte pertenece a zustand o si no se puede colocar directo (puede ser user, person, zustand, etc....) */
const firebaseUrl =
  "https://zustand-storage-default-rtdb.firebaseio.com/zustand";

/* se puede presionar ctrl + . para agregar las propiedades o métodos que faltan al colocarle el tipo StateStorage */
const firebaseStorageApi: StateStorage = {
  getItem: async function (name: string): Promise<string | null> {
    // console.log("getItem", { name });

    /* se coloca este comando de eslint porque nos aparecía algo como -- Unnecessary try/catch wrapper. -- pero como se está realizando una petición fetch al api de firebase entonces sí es necesario */
    // eslint-disable-next-line no-useless-catch
    try {
      /* aquí sería -- https://zustand-storage-default-rtdb.firebaseio.com/zustand/person-storage.json -- para poder visualizar el usuario que le estamos colocando. Es importante que en postman esté el .json para poder visualizar el objeto que le estamos enviando */
      const data = await fetch(`${firebaseUrl}/${name}.json`).then((response) =>
        response.json()
      );

      // console.log(data);

      return JSON.stringify(data); // aquí lo serializamos a un string, porque se espera recibir una promesa que resuelve un string o null y no un objeto entonces en el setItem hay que aplicar -- body: value, -- porque ahí lo estamos guardando como un objeto
      // return data; // otra forma es regresarlo directamente pero guardarlo como string en el setItem entonces hay que aplicar -- body: JSON.stringify(value), -- para guardar la data como string
    } catch (error) {
      console.log(error);

      throw error;
    }
  },

  /* una consideración a tener en cuenta cuando se hacen múltiples solicitudes a un backend como en este caso para grabar en Firebase los cambios de nuestro store, pero aquí se está dando un race condition o una condición de carrera, es decir, esta condición de setItem se va a llamar mucho, en este caso como Firebase es muy rápido, no se verá mucho problema, pero por ejemplo si estamos escribiendo algo como "Nombre" la primera vez que se llame (cuando se dispare la N) se realiza normal pero puede ser que haya mucha latencia o estábamos sin señal y entonces la petición estaría como en espera, es decir, tratando de llegar al destino de guardarlo, y cuando nosotros terminamos de escribir la última letra "e" y tuvimos señal y la latencia fue menor entonces esa petición se logró realizar antes que la primera llegara al servidor y se guarde y eso es la condición de carrera y no tendríamos todo el "Nombre" sino de repente solo la "N". Una manera de mitigar esto (aunque no lo resuelve) es hacer un "debounceTime" aunque no evita la condición de carrera. La condición de carrera se evita cuando se cancela la petición anterior, por ejemplo usando axios y se haga la petición HTTP se puede usar el "AbortController" y su signal y eso hará entonces que conforme se vaya escribiendo y se lance las peticiones solo irá tomando la última petición porque esa última es la que tiene la información actualizada y eso nos ayudará a evitar la condición de carrera */
  setItem: async function (name: string, value: string): Promise<unknown> {
    /* el value ya viene como un string y es más cómodo y facil que ya venga así porque se puede almacenar más facil sin hacer mucha lógica adicional */
    // console.log("setItem", { name, value });

    await fetch(`${firebaseUrl}/${name}.json`, {
      method: "PUT",
      body: value, // aquí lo estamos guardando directamente como objeto entonces en el getItem hay que aplicar el -- return JSON.stringify(data); -- para serializarlo a string y poder usarlo
      // body: JSON.stringify(value), // aquí lo estamos guardando serializado a un string entonces en el getItem hay que aplicar el -- return data; -- para poder hacer uso directamente como string
    }).then((res) => res.json());

    // console.count('setItem');

    return;
  },

  removeItem: function (name: string): unknown | Promise<unknown> {
    console.log("removeItem", { name });
    return null;
  },
};

export const customFirebaseStorage = createJSONStorage(
  () => firebaseStorageApi
);
