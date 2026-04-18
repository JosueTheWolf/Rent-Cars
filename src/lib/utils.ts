/**
 * lib/utils.ts — utilidad `cn()` usada en TODA la app para componer clases de Tailwind.
 *
 * ¿Para qué sirve? Permite combinar clases condicionales y resolver conflictos
 * de Tailwind automáticamente. Ejemplo:
 *
 *   cn("px-2 py-1", isActive && "bg-cyan", "px-4")
 *   → "py-1 bg-cyan px-4"   (px-4 gana sobre px-2 porque es más específico)
 *
 *  - clsx          → arma el string de clases ignorando valores falsos.
 *  - tailwind-merge → elimina clases de Tailwind duplicadas/conflictivas.
 */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
