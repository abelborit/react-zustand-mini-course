import { StateCreator, create } from "zustand";
/* el type para que lo tome solo como interfaces y no como objetos y que no se importenen más cosas de las que necesitamos porque solo necesitamos usarlas como interfaces */
import type { AuthStatus, UserInterface } from "../../interfaces";
import { AuthService } from "../../services/auth.service";
import { devtools, persist } from "zustand/middleware";

export interface AuthState {
  status: AuthStatus;
  token?: string; // en algún punto en el tiempo no se tendrá el "token" por eso se coloca como opcional
  user?: UserInterface; // en algún punto en el tiempo no se tendrá el "user" por eso se coloca como opcional

  loginUser: (email: string, password: string) => Promise<void>;
  checkAuthStatus: () => Promise<void>;
  logoutUser: () => void;
}

const storeApi: StateCreator<AuthState> = (set) => ({
  status: "pending",
  token: undefined,
  user: undefined,

  /* aquí se podrían colocar los métodos como normalmente lo hacemos y colocar toda la lógica correspondiente pero lo que haremos es crearla aparte y que el código sea reutilizable para otras aplicaciones (o lo más que se pueda reutilizar) */
  loginUser: async (email: string, password: string) => {
    try {
      const { token, ...user } = await AuthService.login(email, password);
      set({ status: "authorized", token, user });
    } catch (error) {
      set({ status: "unauthorized", token: undefined, user: undefined });
      throw "Unauthorized";
    }
  },

  checkAuthStatus: async () => {
    try {
      const { token, ...user } = await AuthService.checkStatus();
      set({ status: "authorized", token, user });
    } catch (error) {
      set({ status: "unauthorized", token: undefined, user: undefined });
    }
  },

  logoutUser: () => {
    set({ status: "unauthorized", token: undefined, user: undefined });
  },
});

export const useAuthStore = create<AuthState>()(
  devtools(persist(storeApi, { name: "auth-storage" }))
);
