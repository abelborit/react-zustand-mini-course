import { useShallow } from "zustand/shallow";
import { WhiteCard } from "../../components";
import { useBearStore } from "../../stores/bears/bears.store";

export const BearPage = () => {
  // /* se podría pensar en hacer desestructuración, es decir -- const { ...... } = useBearStore((state) => state); -- pero no es algo recomendable porque podrían traer algunos problemitas al hacerlo de esa forma, incluso en la documentación dice que no es recomendable aunque igual si uno quiere lo puede hacer */
  // const blackBears = useBearStore((state) => state.blackBears);
  // const increaseDrecreaseBlackBearsBy = useBearStore(
  //   (state) => state.increaseDrecreaseBlackBearsBy
  // );

  return (
    <>
      <h1>Contador de Osos</h1>
      <p>Manejo de estado simple de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {/* con solo hacer el cambio de pasar el código a un nuevo componente y que cada nuevo componente tenga su manejador de estado y no todo junto en un solo componente (lógica y manejador de estado), cuando se vaya cambiando/actualizando el estado ayudará a no crear re-renderizaciones de todo y solo se hará la re-renderización de ese componente porque obviamente se está cambiando su estado en específico, porque si se coloca todo este código junto con sus estados para cada uno, entonces al cambiar cualquier estado se re-renderizará todo porque un solo estado está afectado a los demás componentes en sus re-renderizaciones */}

        {/* <WhiteCard centered>
          <h2>Osos Negros</h2>

          <div className="flex flex-col md:flex-row">
            <button onClick={() => increaseDrecreaseBlackBearsBy(+1)}>
              +1
            </button>
            <span className="text-3xl mx-2 lg:mx-10">{blackBears}</span>
            <button onClick={() => increaseDrecreaseBlackBearsBy(-1)}>
              -1
            </button>
          </div>
        </WhiteCard>

        <WhiteCard centered>
          <h2>Osos Polares</h2>

          <div className="flex flex-col md:flex-row">
            <button>+1</button>
            <span className="text-3xl mx-2 lg:mx-10"> 0 </span>
            <button>-1</button>
          </div>
        </WhiteCard>

        <WhiteCard centered>
          <h2>Osos Pandas</h2>

          <div className="flex flex-col md:flex-row">
            <button>+1</button>
            <span className="text-3xl mx-2 lg:mx-10"> 0 </span>
            <button>-1</button>
          </div>
        </WhiteCard> */}

        <BlackBears />
        <PolarBears />
        <PandaBears />

        <BearsDisplay />
      </div>
    </>
  );
};

export const BlackBears = () => {
  const blackBears = useBearStore((state) => state.blackBears);
  const increaseDrecreaseBlackBearsBy = useBearStore(
    (state) => state.increaseDrecreaseBlackBearsBy
  );

  /* se podría pensar en hacer la desestructuración, es decir -- const { ...... } = useBearStore((state) => state); -- pero no es algo recomendable porque podrían traer algunos problemitas al hacerlo de esa forma, incluso en la documentación dice que no es recomendable aunque igual si uno quiere lo puede hacer. El problema de hacerlo así es que si se cambia solo el estado de este componente entonces todo bien y se re-renderiza solo este componente, pero si se actualiza el estado de otro componente entonces este componente también se re-renderiza ya que está pendiente de todo el state y es por eso que para cada estado o cambio de estado se hace por separado */
  // const { blackBears, increaseDrecreaseBlackBearsBy } = useBearStore(
  //   (state) => state
  // );

  return (
    <WhiteCard centered>
      <h2>Osos Negros</h2>
      {/* si se cambia el texto o algo, se reemplazará automáticamente en la página porque tiene el Hot Replaced Module pero darse cuenta que el estado se mantiene y no se pierde ya que se quedan como se dejó y eso es algo que también hace Zustand de la mano con Vite y el Hot Replaced Module */}
      {/* <h2>Osos Negros!!</h2> */}

      <div className="flex flex-col md:flex-row">
        <button onClick={() => increaseDrecreaseBlackBearsBy(+1)}>+1</button>
        <span className="text-3xl mx-2 lg:mx-10">{blackBears}</span>
        <button onClick={() => increaseDrecreaseBlackBearsBy(-1)}>-1</button>
      </div>
    </WhiteCard>
  );
};

export const PolarBears = () => {
  const polarBears = useBearStore((state) => state.polarBears);
  const increaseDrecreasePolarBearsBy = useBearStore(
    (state) => state.increaseDrecreasePolarBearsBy
  );

  return (
    <WhiteCard centered>
      <h2>Osos Polares</h2>

      <div className="flex flex-col md:flex-row">
        <button onClick={() => increaseDrecreasePolarBearsBy(+1)}>+1</button>
        <span className="text-3xl mx-2 lg:mx-10">{polarBears}</span>
        <button onClick={() => increaseDrecreasePolarBearsBy(-1)}>-1</button>
      </div>
    </WhiteCard>
  );
};

export const PandaBears = () => {
  const pandaBears = useBearStore((state) => state.pandaBears);
  const increaseDrecreasePandaBearsBy = useBearStore(
    (state) => state.increaseDrecreasePandaBearsBy
  );

  return (
    <WhiteCard centered>
      <h2>Osos Pandas</h2>

      <div className="flex flex-col md:flex-row">
        <button onClick={() => increaseDrecreasePandaBearsBy(+1)}>+1</button>
        <span className="text-3xl mx-2 lg:mx-10">{pandaBears}</span>
        <button onClick={() => increaseDrecreasePandaBearsBy(-1)}>-1</button>
      </div>
    </WhiteCard>
  );
};

export const BearsDisplay = () => {
  /* para evitar lo de abajo y las re-renderizaciones al usar objetos anidados, es decir, tener un estado en nuestro store -- bears: [ { id: 1, name: "Oso #1" }, { id: 2, name: "Oso #2" } ], -- y vamos a regresar un nuevo estado en nuetro store -- (state) => ({ bears: [...state.bears] }) -- podemos usar el useShallow(....) */

  // const bears = useBearStore((state) => state.bears); // renderizará el componente así sus propiedades no hayan cambiado
  const bears = useBearStore(useShallow((state) => state.bears)); // se encargará de analizar las propiedades de este objeto y confirmar si realmente cambiaron y si cambiaron entonces lo va a volver a re-renderizar porque obviamente cambió su estado y si no cambiaron entonces no se re-renderizará el componente

  /* al presionar el botón vemos que se renderiza de nuevo el componente y eso no es gran problema y es casi imperceptible para todo el mundo y para una aplicación como esta es imperceptible pero puede ser que esto sí cause algún tipo de problema a futuro porque al estar cambiando el estado, porque se tiene un estado ya existente en el store pero con el spread operator se está regresando un nuevo estado porque se crea un nuevo objeto en memoria, hace que se re-renderiza el componente otra vez entonces se puede lanzar algún código o useEffect de forma innecesaria pero esto se puede solucionar usando el useShallow(....) */
  const doNothing = useBearStore((state) => state.doNothing);

  const addBear = useBearStore((state) => state.addBear);
  const clearBears = useBearStore((state) => state.clearBears);

  return (
    <WhiteCard>
      <h1>Osos</h1>

      <button onClick={doNothing}>Do Nothing</button>
      <button className="mt-2" onClick={addBear}>
        Add Bear
      </button>
      <button className="mt-2" onClick={clearBears}>
        Clear Bears
      </button>

      {/* una forma rápida de visualizar objetos en JavaScript es usar el tag <pre>{.....}</pre> junto con JSON.stringify(......) */}
      <pre>{JSON.stringify(bears, null, 2)}</pre>

      {/* <br />
      {JSON.stringify(bears, null, 2)} */}
    </WhiteCard>
  );
};
