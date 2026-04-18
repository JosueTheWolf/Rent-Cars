/**
 * test/setup.ts — configuración GLOBAL de los tests.
 *
 * Vitest carga este archivo antes de cada test (configurado en
 * vitest.config.ts). Aquí:
 *
 *  1) Importamos `@testing-library/jest-dom` → habilita matchers extra
 *     como `expect(boton).toBeInTheDocument()` o `toHaveClass(...)`.
 *
 *  2) Mockeamos `window.matchMedia`. JSDOM (entorno simulado del navegador
 *     que usa Vitest) no lo trae por defecto, y nuestro hook useIsMobile
 *     lo necesita. Sin este mock, los tests fallarían con "matchMedia is
 *     not a function".
 */
import "@testing-library/jest-dom";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});
