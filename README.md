# React + TypeScript + Vite + Zustand + TailwindCSS + ReactRouterDom

Este es un cascarón de proyecto, siéntete libre de usarlo para tus proyectos.

<img src="https://github.com/Klerith/zustand-mini-curso/blob/main/public/screenshot.png?raw=true" alt="Dashboard Screenshot">

## Instalar

1. Instalar dependencias `npm install`
2. Correr en desarrollo `npm run dev`

---

## Parte I:

# Temas puntuales de la sección

### ¿Qué veremos en esta sección?

En esta sección tendremos las bases de Zustand.

- Puntualmente veremos:

  - Instalaciones
  - Configuraciones
  - Propiedades computadas
  - Objetos anidados
  - Actualizaciones de estado
  - Configuraciones con TypeScript
  - useShallow

### \* PASOS A REALIZAR:

1. ejemplo
2. ejemplo
3. ejemplo

### \* RECURSOS A USAR:

- Paquete `Zustand` usando `npm install zustand` desde `https://zustand.docs.pmnd.rs/getting-started/introduction`
- Paquete `nombre_paquete` usando `comando_paquete` desde `url_paquete`
- Paquete `nombre_paquete` usando `comando_paquete` desde `url_paquete`

### \* NOTAS:

- PREGUNTA:

  - ¿Si el store se torna algo grande, es recomendable crear varios stores, o manejarlo solo en uno?

- RESPUESTA:

  - Cuando un store de zustand se vuelve muy grande, es una buena idea dividirlo en múltiples stores más pequeños y enfocados. Esto no solo hace que el código sea más fácil de entender y mantener, sino que también mejora el rendimiento. Al dividir el store en varios más pequeños, cada uno puede enfocarse en una parte específica del estado global, lo que hace que el código sea más modular y fácil de entender.

  - Por ejemplo, si se está creando una aplicación de comercio electrónico, se podría tener un store para la autenticación del usuario, otro para la gestión de carritos de compras y otro para la gestión de pedidos. De esta manera, cada store maneja solo una parte del estado global, lo que hace que el código sea más fácil de mantener y más fácil de encontrar y corregir errores. Además, al dividir el store en múltiples partes, el rendimiento general de la aplicación puede mejorar, ya que solo se rastrearán las actualizaciones de estado que afecten a cada store individual.

  - RE-PREGUNTA:

    - Entonces es mejor crear nuevas instancias del store, es decir, no usar slices, ya que vendrían a ser del mismo store y podría incurrir en problemas de rendimiento, ¿Verdad?

  - RESPUESTA:

    - Sí, es cierto que en algunos casos, es mejor crear nuevas instancias del store, es decir, no usar slices. Una razón por la que esto podría ser beneficioso es que las actualizaciones de estado en una parte del almacén no afectarán a las otras partes del almacén y esto podría mejorar el rendimiento, especialmente en aplicaciones más grandes. Por otro lado, si no se tiene previsto que los datos en una parte del almacén sean actualizados o sean compartidos con otras partes del almacén, entonces se podría considerar usar slices.

- ejemplo
- ejemplo

---

## Parte II:

# Temas puntuales de la sección

### ¿Qué veremos en esta sección?

En esta sección vamos a trabajar con middlewares o funciones adicionales que expanden el comportamiento por defecto de Zustand.

- Puntualmente veremos:

  - Persist Middlewares (hacer persistente nuestro store, es decir, cuando se hace alguna modificación automáticamente lo guarda en el localStorage y cuando se recargue la aplicación automáticamente lo va obtener del localStorage)
  - createJSONStore
  - Guardar automáticamente en session storage
  - Guardar automáticamente en Firebase
  - Crear un storage personalizado
  - Diferentes interfaces de Zustand
  - Custom Middleware
  - Redux DevTools y acciones

### \* PASOS A REALIZAR:

1. ejemplo
2. ejemplo
3. ejemplo

### \* RECURSOS A USAR:

- Paquete `nombre_paquete` usando `comando_paquete` desde `url_paquete`
- Paquete `nombre_paquete` usando `comando_paquete` desde `url_paquete`
- Paquete `nombre_paquete` usando `comando_paquete` desde `url_paquete`

### \* NOTAS:

- ejemplo
- ejemplo
- ejemplo

---

## Parte III:

# Temas puntuales de la sección

### ¿Qué veremos en esta sección?

En esta sección aprenderemos a trabajar con objetos anidados dentro de nuestro store con el objetivo de apreciar claramente el beneficio de utilizar la función _produce_ o mejor aún, el _middleware immer_, para poder mutar el estado y generar uno nuevo basado en esa mutación. Esto quiere decir que, cuando trabajamos por ejemplo con Redux o el useReducer de React, estamos acostumbrados a hacer el spread operator para crear una nueva copia (por así decirlo) del estado porque si mutamos el estado anterior entonces React no se da cuenta que hubo un cambio y aquí es donde entra _immer_ en juego porque lo vamos a usar primero como una función para producir un nuevo estado y luego también usándolo como middleware (que así sería un poco más sencillo) y la idea de este middleware en base a immer es escribir código que muta el estado (lo cambia/actualiza) y que este middleware se encargue de emitir un nuevo estado y eso hará que nuestro código se reduzca bastante para que sea más facil de leer y mantener.

- Puntualmente veremos:

  - Drag & Drop (sin dependencias)
  - Uso de Store con objetos anidados
  - Middlewares
  - Funciones adicionales
  - UUID
  - Mutaciones vs Clonaciones
  - Tipado en TypeScript

### \* PASOS A REALIZAR:

1. ejemplo
2. ejemplo
3. ejemplo

### \* RECURSOS A USAR:

- Paquete `classnames` usando `npm i classnames` desde `https://www.npmjs.com/package/classnames`

- Paquete `uuid` usando `npm i uuid` desde `https://www.npmjs.com/package/uuid`

  - Para los types usando `npm i --save-dev @types/uuid`

- Paquete `SweetAlert2` usando `npm install sweetalert2` desde `https://sweetalert2.github.io/`

- Paquete `Immer` usando `npm install immer` desde `https://immerjs.github.io/immer/`

- Paquete `nombre_paquete` usando `comando_paquete` desde `url_paquete`

### \* NOTAS:

- ejemplo
- ejemplo
- ejemplo

---

## Parte IV:

# Temas puntuales de la sección

### ¿Qué veremos en esta sección?

Esta sección tiene por objetivo que aprendamos el patrón "Slices" de Zustand para poder cortar un Store en pequeñas partes fácilmente mantenibles. El ejercicio consiste en crear pequeños tajadas (slices) para que realicen una tarea en especifico y así poder separar las responsabilidades. Luego uniremos los slices en un único boundStore que permite aplicar los middlewares.

También veremos el problema que surge cuando se utiliza el middleware "persist" porque al guardarse algo en el localStorage se pierde su prototipo, por ejemplo, si tenemos un arreglo con instancias de clases entonces se perderán esas instancias porque se va a serializar como string, otro ejemplo sería cuando guardamos una fecha (tiene tipo date) también se perderá su prototipo porque vamos a serializarlo como un string y cuando queramos recuperar esa fecha (tomar el valor del localStorage) vendrá como un string y no como un date, entre otros ejemplos. Veremos algunas consideraciones y ver también el por qué sucede eso.

### \* PASOS A REALIZAR:

1. ejemplo
2. ejemplo
3. ejemplo

### \* RECURSOS A USAR:

- Paquete `nombre_paquete` usando `comando_paquete` desde `url_paquete`
- Paquete `nombre_paquete` usando `comando_paquete` desde `url_paquete`
- Paquete `nombre_paquete` usando `comando_paquete` desde `url_paquete`

### \* NOTAS:

- ejemplo
- ejemplo
- ejemplo

---

## Parte V:

# Temas puntuales de la sección

### ¿Qué veremos en esta sección?

El objetivo principal de la sección es poder utilizar Zustand para manejar el estado de nuestra autenticación basada en JWTs.

También vamos a utilizar Zustand fuera del contexto de React (fuera de los componentes de React), que eso sería uno de los puntos fuertes que tiene sobre otros gestores de estado para React.

### \* PASOS A REALIZAR:

1. ejemplo
2. ejemplo
3. ejemplo

### \* RECURSOS A USAR:

- Paquete `axios` usando `npm i axios` desde `https://www.npmjs.com/package/axios`
- Paquete `nombre_paquete` usando `comando_paquete` desde `url_paquete`
- Paquete `nombre_paquete` usando `comando_paquete` desde `url_paquete`

### \* NOTAS:

- Se está usando este backend `https://hub.docker.com/r/klerith/teslo-shop-cors`
- ejemplo
- ejemplo

---

## Parte VI:

# Temas puntuales de la sección

### ¿Qué veremos en esta sección?

Esta es una sección extendida de otro curso para aprender a manejar el estado global de las aplicaciones usando React Query para controlar el estado que viene desde el servidor de forma asíncrona y también usando en conjunto con Zustand, otra biblioteca de Javascript para React para manejar el estado local de las aplicaciones. React Query no trabaja con una biblioteca para solicitar datos específicamente, para eso podemos usar axios o fetch de JavaScript.

### \* PASOS A REALIZAR:

1. ejemplo
2. ejemplo
3. ejemplo

### \* RECURSOS A USAR:

- Paquete `react-query` usando `npm i @tanstack/react-query` desde `https://tanstack.com/query/latest/docs/framework/react/installation`

  - NOTA: en esta sección se estará usando la última versión 4 de react-query con `npm i @tanstack/react-query@4`

- Paquete `nombre_paquete` usando `comando_paquete` desde `url_paquete`

- Paquete `nombre_paquete` usando `comando_paquete` desde `url_paquete`

### \* NOTAS:

- ejemplo
- ejemplo
- ejemplo

---
