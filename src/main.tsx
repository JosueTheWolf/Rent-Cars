/**
 * main.tsx — PUNTO DE ENTRADA de la aplicación React.
 *
 * Aquí React 18 monta el componente raíz <App /> dentro del <div id="root">
 * que está en index.html. `createRoot` es la API moderna de React 18 que
 * habilita el "concurrent rendering" (mejor rendimiento en pantallas grandes).
 *
 * El "!" después de getElementById le dice a TypeScript: "confía, ese div existe".
 *
 * Importamos index.css una sola vez aquí: contiene Tailwind + nuestros tokens
 * de diseño (variables CSS) que se aplican a TODA la app.
 */
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
