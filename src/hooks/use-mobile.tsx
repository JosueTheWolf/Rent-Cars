/**
 * use-mobile.tsx — HOOK PERSONALIZADO `useIsMobile()`.
 *
 * Demuestra el criterio del profe: "creación de hooks personalizados".
 * Encapsula la lógica de "¿estoy en pantalla móvil?" para que cualquier
 * componente la consuma con una sola línea: `const esMovil = useIsMobile();`
 *
 * Internamente usa:
 *  - useState   → guarda el booleano (true/false).
 *  - useEffect  → se suscribe a `matchMedia` (API del navegador) y
 *                 actualiza el estado cuando el ancho cambia.
 *  - cleanup    → al desmontar, quita el listener para evitar memory leaks.
 *
 * Breakpoint = 768px (mismo que Tailwind usa para "md").
 */
import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}
