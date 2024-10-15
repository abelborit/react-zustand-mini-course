import axios from "axios";
import { useAuthStore } from "../stores/bears/auth.store";

const tesloApi = axios.create({
  baseURL: "http://localhost:3000/api",
});

/* para los "interceptors" de axios (interceptar cada petición que se haga al backend) vamos a tener que leer y usar el store de Zustand y como se colocó el persist middleware entonces eso hará que esté en el localStorage y también en el store de Zustand en el "auth.store.ts" y es común leerlo de las cookies o del localStorage o del sessionStorage pero ahora usaremos el store de Zustand */
tesloApi.interceptors.request.use((config) => {
  /* aquí estamos usando Zustand fuera del contexto de React, es decir, fuera de algún componente clásico de React usando Zustand como si fuera Vanilla JavaScript lo cual hace poderoso y útil a Zustand pero hay que ver que no se está usando como un hook y colocando algo como -- const loginUser = useAuthStore((state) => state.loginUser); -- sino que se está haciendo uso del -- .getState()...... -- */
  const token = useAuthStore.getState().token;
  // console.log({ token });

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

export { tesloApi };
