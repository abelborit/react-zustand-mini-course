import { StateCreator, create } from "zustand";
/* el type para que lo tome solo como interfaces y no como objetos y que no se importenen más cosas de las que necesitamos porque solo necesitamos usarlas como interfaces */
import type { AuthStatus, UserInterface } from "../../interfaces";

export interface AuthState {
  status: AuthStatus;
  token?: string; // en algún punto en el tiempo no se tendrá el "token" por eso se coloca como opcional
  user?: UserInterface; // en algún punto en el tiempo no se tendrá el "user" por eso se coloca como opcional
}

const storeApi: StateCreator<AuthState> = (set) => ({
  status: "pending",
  token: undefined,
  user: undefined,
});

export const useAuthStore = create<AuthState>()(storeApi);
