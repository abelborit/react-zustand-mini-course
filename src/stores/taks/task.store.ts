/* se coloca como -- type StateCreator -- y -- type { TaskInterface, TaskStatus } -- porque solo usaremos el "StateCreator" y "TaskInterface, TaskStatus" como una interface y no queremos que cuando se cree la aplicación se importen algún archivo físico de las interfaces */
import { create, type StateCreator } from "zustand";
import type { TaskInterface, TaskStatus } from "../../interfaces";

interface TaskState {
  /* FORMA 1: forma común de decir que será un objeto donde la key será de tipo string y el value será de tipo TaskInterface */
  // tasks: { [key: string]: TaskInterface };

  /* FORMA 2: usando Record propio de TypeScript el cual es un genérico que dice que la key será de tipo string y el value será de tipo TaskInterface */
  tasks: Record<string, TaskInterface>;

  getTaskByStatus: (status: TaskStatus) => TaskInterface[];
}

/* al colocar middlewares una forma de mantener el orden puede ser colocar aparte nuestro objeto de configuración del store o sino también se puede colocar todo junto, ambas formas son válidas */
const storeAPI: StateCreator<TaskState> = (set, get) => ({
  /* en este caso por ejemplo se está haciendo mediante un objeto y no mediante un arreglo porque cada forma tiene su punto fuerte y débil, en este caso mediante los objetos es un poco más dificil obtener los datos pero a la hora de actualizar una propiedad es más sencillo porque si se conoce la key entonces se va directamente a esa key y verificar si existe y entonces se actualiza el valor de la propiedad que queremos, en un arreglo es más facil barrerlo de frente pero a la hora de querer cambiar algún dato tenemos precisamente que barrer todo el arreglo y luego filtrar y encontrar el dato correspondiente y recién cambiar la propiedad que queremos */
  tasks: {
    "ABC-1": { id: "ABC-1", title: "Task 1", status: "open" },
    "ABC-2": { id: "ABC-2", title: "Task 2", status: "in-progress" },
    "ABC-3": { id: "ABC-3", title: "Task 3", status: "open" },
    "ABC-4": { id: "ABC-4", title: "Task 4", status: "open" },
  },

  getTaskByStatus: (status: TaskStatus) => {
    const tasks = get().tasks;

    /* Object.values(tasks) para barrer todos los objetos por sus values y eso me retorna un arreglo y ahí recién puedo hacer uso de los métodos de los arreglos como el map, some, filter, etc */
    return Object.values(tasks).filter((task) => task.status === status);
  },
});

/* lo que sí es importante al crear un store es que se coloca como un hook personalizado, es decir, con la palabra "use" y las reglas de React dicen que todos los hooks tienen que empezar con la palabra "use" */
export const useTaskStore = create<TaskState>()(storeAPI);
