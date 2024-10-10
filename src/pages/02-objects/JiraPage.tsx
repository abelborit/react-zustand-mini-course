import { JiraTasks } from "../../components";
import { useTaskStore } from "../../stores/taks/task.store";

export const JiraPage = () => {
  /* hacerlo de esta forma dará un error de exceso de re-renderizaciones similar a esto -- "Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops." -- entonces el error que se está experimentando ocurre cuando React detecta que un componente está realizando actualizaciones infinitas, provocando un ciclo de renderizado sin fin. Esto puede suceder si algún setState o un efecto de un hook como useEffect se está llamando constantemente sin condiciones que lo detengan. En este código no se ve inmediatamente una condición de ciclo infinito evidente, pero podría haber un problema relacionado con cómo Zustand y React están manejando las suscripciones al store */
  /* en este componente JiraPage se está llamando a useTaskStore tres veces para obtener el estado de las tareas con diferentes filtros (open, in-progress, y done). Es posible que React esté re-renderizando más de lo necesario. Cada llamada a useTaskStore crea una nueva suscripción al estado global de Zustand y tener múltiples suscripciones que dependen de una misma parte del estado puede causar actualizaciones innecesarias y, en algunos casos, ciclos infinitos */
  // const pendingTasks = useTaskStore((state) => state.getTaskByStatus("open"));
  // const inProgressTasks = useTaskStore((state) => state.getTaskByStatus("in-progress"));
  // const doneTasks = useTaskStore((state) => state.getTaskByStatus("done"));

  /* ************************************************************************************************************** */

  /* para evitar lo de arriba se puede consolidar esas tres llamadas a una sola suscripción al store y después filtrar las tareas en el propio componente. Esto reducirá la cantidad de suscripciones y podría evitar el problema de renderizados infinitos */
  // const tasks = useTaskStore((state) => state.tasks);

  // const pendingTasks = Object.values(tasks).filter((task) => task.status === "open");
  // const inProgressTasks = Object.values(tasks).filter((task) => task.status === "in-progress");
  // const doneTasks = Object.values(tasks).filter((task) => task.status === "done");

  /* ************************************************************************************************************** */

  /* otra forma es consolidar esas tres llamadas a una sola suscripción al store usando su método getTaskByStatus para filtrar las tareas según el estado */
  /* algunas consideraciones en cuanto al rendimiento: Si la lista de tareas es grande o la función getTaskByStatus es computacionalmente costosa, se podría optimizar con useMemo para evitar recalcular las listas de tareas en cada render usando -- const pendingTasks = useMemo(() => getTaskByStatus("open"), [getTaskByStatus]); -- y esto garantizará que las tareas solo se recalculen cuando getTaskByStatus cambie
   */
  const getTaskByStatus = useTaskStore((state) => state.getTaskByStatus);

  /* const pendingTasks = useMemo(() => getTaskByStatus("open"), [getTaskByStatus]); */
  const pendingTasks = getTaskByStatus("open");
  const inProgressTasks = getTaskByStatus("in-progress");
  const doneTasks = getTaskByStatus("done");

  console.log({ pendingTasks, inProgressTasks, doneTasks });

  return (
    <>
      <h1>Tareas</h1>
      <p>Manejo de estado con objectos de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <JiraTasks title="Pendientes" value="pending" />

        <JiraTasks title="Avanzando" value="in-progress" />

        <JiraTasks title="Terminadas" value="done" />
      </div>
    </>
  );
};
