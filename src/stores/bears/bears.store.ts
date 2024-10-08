import { create } from "zustand";

interface BearState {
  blackBears: number;
  polarBears: number;
  pandaBears: number;

  increaseDrecreaseBlackBearsBy: (increaseBy: number) => void;
  increaseDrecreasePolarBearsBy: (increaseBy: number) => void;
  increaseDrecreasePandaBearsBy: (increaseBy: number) => void;
}

/* la documentación nos indica que el store viene a ser un hook, como se puede ver en su inicial de "use...." y también como se está usando TypeScript entonces se tiene que colocar create<T>()(.....) */
export const useBearStore = create<BearState>()((set) => ({
  /* el estado puede constar de dos partes, el estado como tal o el initial state y sus funciones/métodos para poder actualizar el state */
  blackBears: 10,
  polarBears: 5,
  pandaBears: 1,

  /* por ejemplo en Redux se esperaría hacer algo como -- ({...state, blackBears: state.blackBears + increaseBy }) -- pero aquí ya se encargar de hacer eso el set(....) y de repente se podría usar lo del ...state cuando se hagan objetos anidados */
  increaseDrecreaseBlackBearsBy: (increaseBy: number) =>
    set((state) => ({ blackBears: state.blackBears + increaseBy })),

  increaseDrecreasePolarBearsBy: (increaseBy: number) =>
    set((state) => ({ polarBears: state.polarBears + increaseBy })),

  increaseDrecreasePandaBearsBy: (increaseBy: number) =>
    set((state) => ({ pandaBears: state.pandaBears + increaseBy })),
}));
