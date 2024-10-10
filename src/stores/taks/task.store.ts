/* se coloca como -- type StateCreator -- porque solo usaremos el StateCreator como una interface y no queremos que cuando se cree la aplicación se importe nada ahí */
import { create, type StateCreator } from "zustand";
import { TaksInterface } from "../../interfaces";

interface TaskState {
  /* FORMA 1: forma común de decir que será un objeto donde la key será de tipo string y el value será de tipo TaksInterface */
  // tasks: { [key: string]: TaksInterface };

  /* FORMA 2: usando Record propio de TypeScript el cual es un genérico que dice que la key será de tipo string y el value será de tipo TaksInterface */
  tasks: Record<string, TaksInterface>;
}

/* al colocar middlewares una forma de mantener el orden puede ser colocar aparte nuestro objeto de configuración del store o sino también se puede colocar todo junto, ambas formas son válidas */
const storeAPI: StateCreator<TaskState> = (set) => ({
  tasks: {
    "ABC-1": { id: "ABC-1", title: "Task 1", status: "open" },
    "ABC-2": { id: "ABC-2", title: "Task 2", status: "in-progress" },
    "ABC-3": { id: "ABC-3", title: "Task 3", status: "open" },
    "ABC-4": { id: "ABC-4", title: "Task 4", status: "open" },
  },
});

/* lo que sí es importante al crear un store es que se coloca como un hook personalizado, es decir, con la palabra "use" y las reglas de React dicen que todos los hooks tienen que empezar con la palabra "use" */
export const useTaskStore = create<TaskState>()(storeAPI);
