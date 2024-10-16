import { IoAddOutline, IoCheckmarkCircleOutline } from "react-icons/io5";
import { TaskInterface, TaskStatus } from "../../interfaces";
import { SingleTask } from "./SingleTask";
import classNames from "classnames";
import { useTasks } from "../../hooks/useTasks";

interface Props {
  title: string;
  status: TaskStatus;
  tasks: TaskInterface[];
}

export const JiraTasks = ({ title, status, tasks }: Props) => {
  const {
    /* Properties */
    isDraggingTask,
    isDragOver,

    /* Methods */
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleAddTask,
  } = useTasks({ status });

  return (
    <div
      // onDragOver={() => console.log("onDragOver")}
      // onDragLeave={() => console.log("onDragLeave")} // se visualizará cuando salga de la posición en la que estuvo
      // onDrop={() => console.log("onDrop")} // este no se podrá visualizar si primero no prevenimos algunos eventos por defecto como en el caso del onDragOver (también lo podemos poner en los demás pero bastaría hacerlo en el onDragOver) NOTA: el onDrop se visualizará solo cuando se deje caer dentro de los contenedores que corresponda (está limitado a los contenedores que tengan el Drag & Drop y no a todo)
      // onDragOver={(event)=>handleDragOver(event)}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      /* aquí se está usando el package classNames para unir clases, lo cual se puede hacer sin algún package de terceros pero de esta forma también es un poco más facil ya que nos permite hacer algunas validaciones más simples */
      className={classNames(
        "!text-black border-4 relative flex flex-col rounded-[20px]  bg-white bg-clip-border shadow-3xl shadow-shadow-500  w-full !p-4 3xl:p-![18px]",
        {
          "border-blue-500 border-dotted": isDraggingTask,
          "border-green-500 border-dotted": isDraggingTask && isDragOver,
        }
      )}
    >
      {/* Task Header */}
      <div className="relative flex flex-row justify-between">
        <div className="flex items-center justify-center">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100">
            <span className="flex justify-center items-center h-6 w-6 text-brand-500">
              <IoCheckmarkCircleOutline style={{ fontSize: "50px" }} />
            </span>
          </div>

          <h4 className="ml-4 text-xl font-bold text-navy-700">{title}</h4>
        </div>

        <button onClick={handleAddTask}>
          <IoAddOutline />
        </button>
      </div>

      {/* Task Items */}
      <div className="h-full w-full">
        {tasks.map((taskElement) => (
          <SingleTask key={taskElement.id} task={taskElement} />
        ))}
      </div>
    </div>
  );
};
