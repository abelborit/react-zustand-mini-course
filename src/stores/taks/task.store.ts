/* se coloca como -- type StateCreator -- y -- type { TaskInterface, TaskStatus } -- porque solo usaremos el "StateCreator" y "TaskInterface, TaskStatus" como una interface y no queremos que cuando se cree la aplicación se importen algún archivo físico de las interfaces */
import { create, type StateCreator } from "zustand";
import type { TaskInterface, TaskStatus } from "../../interfaces";
import { devtools, persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
// import { produce } from "immer";
import { immer } from "zustand/middleware/immer";

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
/* se está añadiendo al tipado el -- [["zustand/devtools", never], ["zustand/immer", never]] -- para que no nos de error al usar el middleware immer y también para aumentar su funcionalidad, así como para aumentar su funcionalidad al usar el middleware devtools y en Redux Devtools tener el nombre a las actions como se hizo en person.store.ts y otra forma de evitar colocar el tipado aquí es volver a colocar todo esta configuración del store, es decir, el -- ((set, get) => ({.....})) -- junto y no en una variable separada */
const storeAPI: StateCreator<
  TaskState,
  [
    ["zustand/devtools", never],
    ["zustand/persist", unknown],
    ["zustand/immer", never]
  ]
> = (set, get) => ({
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
    // set(
    //   produce((state: TaskState) => {
    //     state.tasks[newTask.id] = newTask; // este es un código mutante, se está mutando el state, cosa que por ejemplo, si lo hacemos como en Redux Toolkit pero sin el spread operator, lo que haría sería sobreescribir todo por este nuevo valor, pero aquí se está mutando y al mismo tiempo creará un nuevo state con lo que ya se tenía y con el valor nuevo. Para hacer la prueba en el código comentado de arriba se puede descomentar todo y comentar solo el -- ...state.tasks, -- y veremos que todo el state se sobreescribe con solo el nuevo valor
    //   })
    // );

    /* ahora usaremos el middleware immer que viene instalado en zustand */
    set(
      (state) => {
        state.tasks[newTask.id] = newTask;
      },
      false,
      "setAddTask"
    );
  },

  setDraggingTaskId: (taskId: string) => {
    set({ draggingTaskId: taskId }, false, "setDraggingTaskId");
  },

  removeDraggingTaskId: () => {
    set({ draggingTaskId: undefined }, false, "removeDraggingTaskId");
  },

  changeTaskStatus: (taskId: string, status: TaskStatus) => {
    /* FORMA 1 (pero ahora nos daría un error de "Cannot assign to read only property .......") y para eso se pueden usar las formas 3 - 4 - 5 */
    // const task = get().tasks[taskId]; // para obtener la tarea en base al taskId
    // task.status = status; // cambiar el status que tiene por el nuevo status que viene como parámetro

    // set((state) => ({
    //   tasks: {
    //     ...state.tasks,
    //     [taskId]: task, // para hacer la propiedad key según el valor que viene en el taskId y luego enviar la task con el valor status cambiado
    //   },
    // }));

    /* FORMA 2 (pero nos daría un error de "Cannot assign to read only property .......") y para eso se pueden usar las formas 3 - 4 - 5 */
    /* usando el middleware immer que viene instalado en zustand pero aquí en este caso sucede algo un poco dificil de explicar (al mover una segunda vez la tarea) porque sale un error similar a "Cannot assign to read only property 'status' of object '#<Object>'" que quiere decir que "no se puede asignar una propiedad read only de 'status' a un objeto" y esto es porque por defecto son inmutables y para solucionar eso se podría envolver con el "produce" de nuevo pero este error es algo dificil de explicar porque se estaría haciendo algo similar a modificar un objeto anidado de un objeto anidado y ese puede ser el problema que ocurre */
    // const task = get().tasks[taskId]; // para obtener la tarea en base al taskId
    // task.status = status; // cambiar el status que tiene por el nuevo status que viene como parámetro

    // set((state) => {
    //   state.tasks[taskId] = task;
    // });

    /* FORMA 3 */
    /* para solucionar lo anterior se puede hacer de esta forma */
    set(
      (state) => {
        state.tasks[taskId] = {
          ...state.tasks[taskId], // mantener el estado que se tenía anteriormente para solo actualizar lo que se necesita
          status,
        };
      },
      false,
      "changeTaskStatus"
    );

    /* FORMA 4 */
    /* otra forma también podría ser */
    // const task = { ...get().tasks[taskId] }; // para obtener la tarea en base al taskId y también se hace el spread operator para crear un nuevo objeto con las propiedades que vienen porque si no se hace el spread operator entonces ya sería inmutable y sucederá el mismo error de arriba del "Cannot assign to read only property ......" pero con el spread operator aquí entonces ya puedo manipular el objeto como se está haciendo abajo -- task.status = status; --
    // task.status = status; // cambiar el status que tiene por el nuevo status que viene como parámetro

    // set((state) => {
    //   state.tasks[taskId] = {
    //     ...task,
    //   };
    // });

    /* FORMA 5 */
    /* otra forma también podría ser (se vió en uno de los comentarios dado por un alumno en el video de este curso) */
    // set((state) => {
    //   state.tasks[taskId].status = status;
    // });
  },

  setOnTaskDrop: (status: TaskStatus) => {
    const taskId = get().draggingTaskId;
    if (!taskId) return;

    get().changeTaskStatus(taskId, status);
    get().removeDraggingTaskId();
  },
});

/* lo que sí es importante al crear un store es que se coloca como un hook personalizado, es decir, con la palabra "use" y las reglas de React dicen que todos los hooks tienen que empezar con la palabra "use" */
/* NOTA: según el orden como se coloquen los middlewares puede ser que afecte al tipado que tenemos arriba en el "storeAPI" y cambiar un poco el orden también de este tipado */
export const useTaskStore = create<TaskState>()(
  devtools(persist(immer(storeAPI), { name: "task-store" }))
);
