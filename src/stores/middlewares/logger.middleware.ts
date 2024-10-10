// /* esta sería la estructura básica de un middleware para nosotros poder crear uno custom o personalizado. NOTA: aquí se le está colocando el tipado de any solo para saltarnos esa parte del tipado */
// const loggerImplementation: any =
//   (f: any, name: any) => (set: any, get: any, store: any) => {
//     const loggedSet: typeof set = (...a: any[]) => {
//       set(...(a as Parameters<typeof set>));
//       console.log(...(name ? [`${name}:`] : []), get());
//     };

//     const setState = store.setState;

//     store.setState = (...a) => {
//       setState(...(a as Parameters<typeof setState>));

//       console.log(get()); // si solo queremos información del store

//       // console.log(...(name ? [`${name}:`] : []), store.getState())
//     };

//     /* esta función sería lo mismo que se le manda y ejecuta en -- ((set, get) => ({.....})) -- donde viene el set para cambiar/establecer el nuevo valor del estado, el get para obtener información sobre el estado y el store que es información sobre todo el store */
//     return f(loggedSet, get, store);
//   };

// export const logger = loggerImplementation as unknown as any;

/* **************************************************************************************************** */
/* se sacó de esta ruta: https://zustand.docs.pmnd.rs/guides/typescript#common-recipes */
import { StateCreator, StoreMutatorIdentifier } from "zustand";

type Logger = <
  T,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = []
>(
  f: StateCreator<T, Mps, Mcs>,
  name?: string
) => StateCreator<T, Mps, Mcs>;

type LoggerImpl = <T>(
  f: StateCreator<T, [], []>,
  name?: string
) => StateCreator<T, [], []>;

const loggerImpl: LoggerImpl = (f, name) => (set, get, store) => {
  const loggedSet: typeof set = (...a) => {
    set(...(a as Parameters<typeof set>));
    console.log(...(name ? [`${name}:`] : []), get());
  };
  const setState = store.setState;
  store.setState = (...a) => {
    setState(...(a as Parameters<typeof setState>));
    console.log(...(name ? [`${name}:`] : []), store.getState());
  };

  return f(loggedSet, get, store);
};

export const logger = loggerImpl as unknown as Logger;
