import { useRef } from "react";
import { WhiteCard } from "../../components";
import { useWeddingBoundStore } from "../../stores/wedding";

export const WeddingInvitationPage = () => {
  const firstName = useWeddingBoundStore((state) => state.firstName);
  const lastName = useWeddingBoundStore((state) => state.lastName);
  const setFirstName = useWeddingBoundStore((state) => state.setFirstName);
  const setLastName = useWeddingBoundStore((state) => state.setLastName);

  const guestCount = useWeddingBoundStore((state) => state.guestCount);
  const setGuestCount = useWeddingBoundStore((state) => state.setGuestCount);

  /* para borrar el "0" al escribir directamente en el input que aparece en el formulario de la cantidad de invitados. Al slice no le afecta porque al momento de hacer onChange se formatea a número y automáticamente se quita ese 0 al principio. Pero en el html sigue estando presente por eso el uso de userRef */
  const inputRef = useRef<HTMLInputElement | null>(null);
  if (inputRef.current) {
    // console.log(inputRef.current.value.toString().split(""));
    let countSplitted = inputRef.current.value.toString().split("");

    if (countSplitted.length > 1 && countSplitted[0] === "0") {
      countSplitted = countSplitted.slice(1);
      inputRef.current.value = countSplitted.join("");
    }
  }

  const eventYYYYMMDD = useWeddingBoundStore((state) => state.eventYYYYMMDD());
  const eventHHMM = useWeddingBoundStore((state) => state.eventHHMM());
  const setEventDate = useWeddingBoundStore((state) => state.setEventDate);
  const setEventTime = useWeddingBoundStore((state) => state.setEventTime);

  /* ahorita como está de tipo Date nos dará un objeto pero sería mejor que nos de tipo number para no perder el tipado original porque es más facil pasar de string que viene del localStorage a number para reconstruir la fecha */
  // const eventDate = useWeddingBoundStore((state) => state.eventDate);
  // console.log(typeof eventDate, eventDate);

  return (
    <>
      <h1>Invitación de Boda</h1>
      <p>Zustand segmentado en slices</p>
      <hr />

      <WhiteCard className="flex items-center justify-center p-12">
        <div className="mx-auto w-full max-w-[550px]">
          <form>
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">
                    Primer Nombre
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="Primer Nombre"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                  />
                </div>
              </div>

              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">
                    Apellido
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Apellido"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-[#07074D]">
                ¿Cuántos invitados traerá?
              </label>
              <input
                ref={inputRef}
                type="number"
                name="guestNumber"
                id="guestNumber"
                placeholder="5"
                min="0"
                className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                value={guestCount}
                /* todos los input, independientemente de qué type sea, regresan un string */
                // onChange={(event) => setGuestCount(Number(event.target.value))} // FORMA 1 para pasar de string a number
                onChange={(event) => setGuestCount(+event.target.value)} // FORMA 2 para pasar de string a number
              />
            </div>

            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">
                    Fecha de evento
                  </label>
                  <input
                    type="date"
                    name="eventDate"
                    id="eventDate"
                    value={eventYYYYMMDD}
                    onChange={(e) => setEventDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">
                    Hora del evento
                  </label>
                  <input
                    type="time"
                    name="eventTime"
                    id="eventTime"
                    value={eventHHMM}
                    onChange={(e) => setEventTime(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-[#07074D]">
                ¿Tu también vendrás?
              </label>
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="isComing"
                    id="radioButton1"
                    className="h-5 w-5"
                  />
                  <label className="pl-3 text-base font-medium text-[#07074D]">
                    Si
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="isComing"
                    id="radioButton2"
                    className="h-5 w-5"
                  />
                  <label className="pl-3 text-base font-medium text-[#07074D]">
                    No
                  </label>
                </div>
              </div>
            </div>

            <div>
              <button>Enviar</button>
            </div>
          </form>
        </div>
      </WhiteCard>
    </>
  );
};
