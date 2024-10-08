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
