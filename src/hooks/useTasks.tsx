import { DragEvent, useState } from "react";
import Swal from "sweetalert2";
import { useTaskStore } from "../stores/taks/task.store";
import { TaskStatus } from "../interfaces";

interface PropsInterface {
  status: TaskStatus;
}

export const useTasks = ({ status }: PropsInterface) => {
  const isDraggingTask = useTaskStore((state) => !!state.draggingTaskId); // se coloca la doble negación para transformarlo a un valor boolean para manejar solo las casuísticas de true o false cuando se esté haciendo o no se esté haciendo el dragging del elemento, también se podría manejar de forma normal -- const draggingTaskId = useTaskStore((state) => state.draggingTaskId); -- y hacer alguna validación
  const [isDragOver, setIsDragOver] = useState(false);
  const setOnTaskDrop = useTaskStore((state) => state.setOnTaskDrop);
  const setAddTask = useTaskStore((state) => state.setAddTask);

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(true);
    // console.log("onDragOver");
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
    // console.log("onDragLeave");
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
    setOnTaskDrop(status);
    // console.log("onDrop", status);
  };

  const handleAddTask = async () => {
    const { isConfirmed, value } = await Swal.fire({
      title: "Add a new task",
      input: "text",
      inputLabel: "Task name",
      inputPlaceholder: "Enter the name of the task",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "You must enter a name for the task";
        }
      },
    });

    if (!isConfirmed) return;

    setAddTask(value, status);
  };

  return {
    /* Properties */
    isDraggingTask,
    isDragOver,

    /* Methods */
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleAddTask,
  };
};
