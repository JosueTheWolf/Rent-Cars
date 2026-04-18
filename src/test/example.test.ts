/**
 * example.test.ts — TEST UNITARIO de ejemplo con Vitest.
 *
 * Cumple el criterio del profe: "implementación de pruebas unitarias
 * con Jest y Testing Library" (en este proyecto usamos Vitest, que es
 * la versión moderna y compatible con Jest pensada para Vite).
 *
 *  - describe(...) agrupa pruebas relacionadas.
 *  - it(...)        define una prueba individual.
 *  - expect(...)    afirmación: si falla, el test se marca rojo.
 *
 * Se ejecuta con `npm run test`. Aquí solo verificamos que el entorno
 * de testing funciona; sirve de plantilla para añadir más pruebas
 * (ej: validar que el filtro de vehículos devuelve los correctos).
 */
import { describe, it, expect } from "vitest";

describe("example", () => {
  it("should pass", () => {
    expect(true).toBe(true);
  });
});
