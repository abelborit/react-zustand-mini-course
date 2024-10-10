import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Bear {
  id: number;
  name: string;
}

interface BearState {
  blackBears: number;
  polarBears: number;
  pandaBears: number;

  bears: Bear[];

  totalBears: () => number;

  increaseDrecreaseBlackBearsBy: (increaseBy: number) => void;
  increaseDrecreasePolarBearsBy: (increaseBy: number) => void;
  increaseDrecreasePandaBearsBy: (increaseBy: number) => void;

  doNothing: () => void;
  addBear: () => void;
  clearBears: () => void;
}

/* la documentación nos indica que el store viene a ser un hook, como se puede ver en su inicial de "use...." y también como se está usando TypeScript entonces se tiene que colocar create<T>()(.....) */
/* este get es propio de Zustand para poder obtener el estado */
/* una consideración a tener en cuenta si se quiere hacer uso de algún middleware y también uso de los getters como el -- get totalBears() -- no se va a llamar de la manera esperada, pareciera que sí está funcionando correctamente pero cuando se recargue el navegador y se cambién lo datos igual seguirá haciendo de lo que se guardó en el localStorage y no de los nuevos valores que se están actualizando porque seguirá usando el código anterior. Para solucionarlo es que en vez de hacer uso de las propiedades computadas lo cambiemos a un método/función normal */
export const useBearStore = create<BearState>()(
  persist(
    (set, get, store) => ({
      /* el estado puede constar de dos partes, el estado como tal o el initial state y sus funciones/métodos para poder actualizar el state */
      blackBears: 10,
      polarBears: 5,
      pandaBears: 1,

      bears: [
        { id: 1, name: "Oso #1" },
        { id: 2, name: "Oso #2" },
      ],

      /* se creará una propiedad computada tipo los getters para poder obtener una valor, y en este caso se hará directamente aquí o sino también se puede usar un slice */
      /* las propiedades computadas (computed properties) son funciones tratadas como una propiedad que calculan un valor basado en otras propiedades o datos, y su valor se actualiza automáticamente cuando cambian los datos de los que dependen. A diferencia de las propiedades normales, que solo almacenan un valor, las propiedades computadas permiten realizar operaciones o cálculos pero se comportan como si fueran propiedades por eso son funciones tratadas como una propiedad. Una ventaja por ejemplo es que se cachean (almacenan en memoria) hasta que los datos de los que dependen cambian, lo que las hace eficientes. A diferencia de las propiedades computadas, los métodos no cachean el resultado, por lo que se volvería a calcular el valor cada vez que se invoque el método, incluso si los datos no han cambiado. Otra ventaja es que al utilizar solo se llama como una propiedad y no como una función/método */

      /* aquí vamos a hacerlo con puro JavaScript usando un get (getter) y dentro usaremos el get() propio de Zustand para obtener el estado del store */
      totalBears: () => {
        console.log(store);

        return (
          get().blackBears +
          get().polarBears +
          get().pandaBears +
          get().bears.length
        );
      },

      /* por ejemplo en Redux se esperaría hacer algo como -- ({...state, blackBears: state.blackBears + increaseBy }) -- pero aquí ya se encargar de hacer eso el set(....) y de repente se podría usar lo del ...state cuando se hagan objetos anidados */
      increaseDrecreaseBlackBearsBy: (increaseBy: number) =>
        set((state) => ({ blackBears: state.blackBears + increaseBy })),

      increaseDrecreasePolarBearsBy: (increaseBy: number) =>
        set((state) => ({ polarBears: state.polarBears + increaseBy })),

      increaseDrecreasePandaBearsBy: (increaseBy: number) =>
        set((state) => ({ pandaBears: state.pandaBears + increaseBy })),

      /* al hacer el spread operator, es decir, [...state.bears] aquí se creará un nuevo objeto en memoria con el arreglo, es decir, creará un nuevo arreglo con los mismos valores que se tenían pero la diferencia es que apuntará a un nuevo espacio en memoria. Para Zustand si se deja así, significa que se hará un nuevo estado pero el nuevo estado es igual al anterior (por eso el método se llama doNothing porque no hará nada de especial) */
      doNothing: () =>
        set((state) => {
          console.log("doNothing button");

          return { bears: [...state.bears] };
        }),

      addBear: () =>
        set((state) => ({
          bears: [
            ...state.bears,
            {
              id: state.bears.length + 1,
              name: `Oso #${state.bears.length + 1}`,
            },
          ],
        })),

      clearBears: () => set({ bears: [] }), // como no se está usando el state entonces se puede mandar así
    }),
    {
      name: "bears-storage",
    }
  )
);
