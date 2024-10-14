import { StateCreator } from "zustand";

export interface DateSlice {
  /* idealmente se preferiría manejar las fechas como number, string o primitivo porque cuando se guarda en el localStorage se serializa como string, usando el persist middleware en este caso, se prefiere manejarlo como un number o string. Aquí lo haremos de tipo Date que ya viene en JavaScript para ver qué problemas nos ocurren porque al guardar algo de tipo Date se pierde ese prototype porque se serializa a string en el localStorage y es por eso que sería mejor trabajarlo con tipo number */
  // eventDate: number;
  eventDate: Date;

  eventYYYYMMDD: () => string; // para la fecha
  eventHHMM: () => string; // para la hora

  /* se coloca como "eventDate" porque solo se pasará una parte de todo lo que viene del objeto Date */
  setEventDate: (eventDate: string) => void; // para la fecha
  setEventTime: (eventTime: string) => void; // para la hora
}

export const createDateSlice: StateCreator<DateSlice> = (set, get) => ({
  // eventDate: new Date().getTime(), // sería mejor trabajarlo con type number y usando el .getTime() lo que nos daría un número similar a 1564789654987 lo que al final si queremos reconstruir ese número bastaría hacerlo con -- new Date(1564789654987) --
  eventDate: new Date(), // por ejemplo: '2024-10-14TXX:XX:XX.XXXX'

  eventYYYYMMDD: () => {
    /* aquí se quitará lo que venga después de la "T" para solo conservar "2024-10-14" */
    return get().eventDate.toISOString().split("T")[0];
  },

  eventHHMM: () => {
    /* usando el ".toString().padStart(2, "0");" para colocar el 00 o 01 o 02 o 03 si fuera alguna hora de la mañana. El padStart(.....) es para poder rellenar según cómo le mandemos, en este caso, que siempre tenga dos dígitos y que si tiene un dígito entonces lo rellene con 0 */
    const hours = get().eventDate.getHours().toString().padStart(2, "0"); // por ejemplo: 1 -> 01 //// 8 -> 08
    const minutes = get().eventDate.getMinutes().toString().padStart(2, "0"); // por ejemplo: 1 -> 01 //// 8 -> 08

    return `${hours}:${minutes}`;
  },

  setEventDate: (eventDate: string) =>
    set((state) => {
      const date = new Date(eventDate); // aquí para que lo que venga de "eventDate" se convierta a un objeto date
      /* aquí se podrían hacer las validaciones respectivas a "date" */

      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate() + 1; // el +1 es porque el .getDate() está en base a 0
      // console.log({ eventDate, year, month, day });

      /* se hace de esta forma de nuevo con un new Date(.....) porque se está queriendo crear un nuevo objeto Date con la fecha actualizada porque si se coloca de frente solo se está mutando pero no lanzaría ningún cambio en el re-renderizado */
      const newDate = new Date(state.eventDate);
      newDate.setFullYear(year, month, day);
      // console.log({ newDate });

      return { eventDate: newDate };
    }),

  setEventTime: (eventTime: string) =>
    set((state) => {
      // HH:MM
      const hours = parseInt(eventTime.split(":")[0]);
      const minutes = parseInt(eventTime.split(":")[1]);

      const newDate = new Date(state.eventDate);
      newDate.setHours(hours, minutes);
      // console.log({ newDate });

      return { eventDate: newDate };
    }),
});
