/* se coloca como -- type StateCreator -- y -- type { TaskInterface, TaskStatus } -- porque solo usaremos el "StateCreator" y "TaskInterface, TaskStatus" como una interface y no queremos que cuando se cree la aplicación se importen algún archivo físico de las interfaces */
import { create, type StateCreator } from "zustand";
import type { TaskInterface, TaskStatus } from "../../interfaces";
import { devtools } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import { produce } from "immer";

interface TaskState {
  /* FORMA 1: forma común de decir que será un objeto donde la key será de tipo string y el value será de tipo TaskInterface */
  // tasks: { [key: string]: TaskInterface };

  /* FORMA 2: usando Record propio de TypeScript el cual es un genérico que dice que la key será de tipo string y el value será de tipo TaskInterface */
  tasks: Record<string, TaskInterface>;
  draggingTaskId?: string; // será opcional porque en un momento tendré undefined y luego en otro momento tendré el valor el cual será el id de la tarea que quiero mover

  getTaskByStatus: (status: TaskStatus) => TaskInterface[];
  setAddTask: (title: string, status: TaskStatus) => void;

  setDraggingTaskId: (taskId: string) => void; // cuando se quiere hacer el dragging de la tarea
  removeDraggingTaskId: () => void; //  cuando se suelta la tarea el estado final tiene que ser como cuando empezó "undefined" porque ya se completó el movimiento de la tarea ya sea en el mismo lugar o a otro lado
  changeTaskStatus: (taskId: string, status: TaskStatus) => void;
  setOnTaskDrop: (status: TaskStatus) => void; // aquí será un método combinando varios métodos del estado para simplificar el uso en otros componentes que lo necesiten
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
  draggingTaskId: undefined, // no es necesario colocarlo explícitamente porque es opcional y si no está entonces es undefined por defecto, pero se coloca para saber que ahí tenemos esas propiedad y que quede un poco más explícito el código

  getTaskByStatus: (status: TaskStatus) => {
    const tasks = get().tasks;

    /* Object.values(tasks) para barrer todos los objetos por sus values y eso me retorna un arreglo y ahí recién puedo hacer uso de los métodos de los arreglos como el map, some, filter, etc */
    return Object.values(tasks).filter((task) => task.status === status);
  },

  setAddTask: (title: string, status: TaskStatus) => {
    const newTask = { id: uuidv4(), title, status };

    /* esta forma es como se usaría por ejemplo en Redux, Redux Toolkit, Reducers de React con el operador spread para mantener el estado anterior y cambiar los nuevos valores, es decir -- ...state.tasks, -- y está bien pero hay otra forma también para poder trabajarlo y escribir un código más sencillo, mutar el estado y al hacer la mutación generar un nuevo state y para eso lo podemos hacer con el package immer ya sea instalando el paquete y usar su función "produce" o usando el middleware de immer que ya viene instalado en zustand */
    // set((state) => ({
    //   tasks: {
    //     ...state.tasks,
    //     [newTask.id]: newTask, // para hacer la propiedad key según el valor que viene en el newTask.id y que sea una propiedad computada y luego enviar el newTask que es la nueva tarea
    //   },
    // }));

    /* la función "produce" del paquete immer se usaría solo donde se está haciendo uso del spread operator para mutar el estado. Darse cuenta que no se está usando el return implícito, sino que es una función común y corriente, es decir, está como -- (state: TaskState) => {......} -- y NO como -- (state: TaskState) => ({......}) -- y solo se va y coloca lo que se quiere hacer/actualizar, en este caso, se va a mutar el objeto del state añadiendo una nueva tarea */
    set(
      produce((state: TaskState) => {
        state.tasks[newTask.id] = newTask; // este es un código mutante, se está mutando el state, cosa que por ejemplo, si lo hacemos como en Redux Toolkit pero sin el spread operator, lo que haría sería sobreescribir todo por este nuevo valor, pero aquí se está mutando y al mismo tiempo creará un nuevo state con lo que ya se tenía y con el valor nuevo. Para hacer la prueba en el código comentado de arriba se puede descomentar todo y comentar solo el -- ...state.tasks, -- y veremos que todo el state se sobreescribe con solo el nuevo valor
      })
    );
  },

  setDraggingTaskId: (taskId: string) => {
    set({ draggingTaskId: taskId });
  },

  removeDraggingTaskId: () => {
    set({ draggingTaskId: undefined });
  },

  changeTaskStatus: (taskId: string, status: TaskStatus) => {
    const task = get().tasks[taskId]; // para obtener la tarea en base al taskId
    task.status = status; // cambiar el status que tiene por el nuevo status que viene como parámetro

    set((state) => ({
      tasks: {
        ...state.tasks,
        [taskId]: task, // para hacer la propiedad key según el valor que viene en el taskId y luego enviar la task con el valor status cambiado
      },
    }));
  },

  setOnTaskDrop: (status: TaskStatus) => {
    const taskId = get().draggingTaskId;
    if (!taskId) return;

    get().changeTaskStatus(taskId, status);
    get().removeDraggingTaskId();
  },
});

/* lo que sí es importante al crear un store es que se coloca como un hook personalizado, es decir, con la palabra "use" y las reglas de React dicen que todos los hooks tienen que empezar con la palabra "use" */
export const useTaskStore = create<TaskState>()(devtools(storeAPI));
