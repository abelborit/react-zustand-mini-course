import { create } from "zustand";

interface Bear {
  id: number;
  name: string;
}

interface BearState {
  blackBears: number;
  polarBears: number;
  pandaBears: number;

  bears: Bear[];

  increaseDrecreaseBlackBearsBy: (increaseBy: number) => void;
  increaseDrecreasePolarBearsBy: (increaseBy: number) => void;
  increaseDrecreasePandaBearsBy: (increaseBy: number) => void;

  doNothing: () => void;
}

/* la documentación nos indica que el store viene a ser un hook, como se puede ver en su inicial de "use...." y también como se está usando TypeScript entonces se tiene que colocar create<T>()(.....) */
export const useBearStore = create<BearState>()((set) => ({
  /* el estado puede constar de dos partes, el estado como tal o el initial state y sus funciones/métodos para poder actualizar el state */
  blackBears: 10,
  polarBears: 5,
  pandaBears: 1,

  bears: [
    { id: 1, name: "Oso #1" },
    { id: 2, name: "Oso #2" },
  ],

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
}));
