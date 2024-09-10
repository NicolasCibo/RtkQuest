# RTK Quest - Proyecto de Estudio de Kanjis

Este proyecto está diseñado para ayudar en el aprendizaje y la revisión de los caracteres kanji utilizando el método descrito en el libro "Remembering the Kanji". Ofrece dos funcionalidades principales: **Quest** y **Búsqueda de Kanji**, ambas orientadas a reforzar la memorización efectiva de los caracteres y sus palabras clave asociadas.

## Tecnologías Utilizadas

- **React**: Librería de JavaScript para la construcción de interfaces de usuario.
- **TypeScript**: Superconjunto de JavaScript que añade tipado estático, mejorando el desarrollo.
- **TailwindCSS**: Framework de CSS para el diseño y estilización de componentes de forma rápida.
- **Custom Hook**: Hooks personalizados para manejar la lógica específica del proyecto.
- **Context API**: Gestión del estado global de la aplicación sin necesidad de Redux.
- **Reducer**: Lógica centralizada para la manipulación del estado mediante acciones.
- **React Router DOM**: Navegación entre páginas y rutas dentro de la aplicación.

## Funcionalidades Principales

### Quest de Kanji

En esta modalidad, los usuarios pueden realizar una **"Quest"** donde se les presentan tarjetas de kanjis aleatorios. El objetivo es reforzar la relación entre la palabra clave y el kanji. Durante la quest, el usuario debe identificar el kanji correcto basado en su palabra clave. Al completar la quest, los resultados se almacenan y son accesibles para futuras revisiones.

### Búsqueda de Kanjis

La aplicación incluye una herramienta de búsqueda que permite a los usuarios encontrar rápidamente información sobre un kanji en particular. Pueden buscar por el número de trazos, lección, palabra clave o el propio carácter kanji. La información adicional sobre cada kanji también se muestra en un formato estructurado, incluyendo trazos y lección.

## Estado actual del Proyecto

Este proyecto aún está en desarrollo. Las funcionalidades estan completas y la base de datos de los kanjis se actualizará gradualmente hasta incluir los 2042 kanjis del libro "Remembering the Kanji".

## Despliegue

El proyecto está desplegado en Netlify. Puedes verlo en acción en el siguiente enlace:

**[RTK QUEST - Netlify](https://rtk-quest.netlify.app/)**

## Instalación y uso

1. Clona el repositorio:
   git clone https://github.com/NicolasCibo/RtkQuest.git

2. Navega al directorio del proyecto:
   cd nombre-del-directorio

3. Instala las dependencias:
   npm install

4. Inicia la aplicación:
   npm run dev

5. Abre tu navegador y ve a `http://localhost:[puerto]` para ver el generador en acción.
