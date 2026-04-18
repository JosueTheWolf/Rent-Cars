import { createContext, useContext, useState, useCallback, ReactNode, useMemo } from "react";
import type { Vehiculo } from "@/datos/vehiculos";

/**
 * ReservasContext — gestión GLOBAL de las reservas hechas por el usuario.
 *
 * Antes: Historial mostraba reservas falsas hardcodeadas.
 * Después: cuando el usuario completa una reserva en /reservar, la guardamos
 * en este context y aparece automáticamente en /historial.
 */

export interface Reserva {
  id: string;
  vehiculo: Vehiculo;
  fechaRetiro: string;
  fechaDevolucion: string;
  total: number;
  fechaCreacion: string; // dd/mm/yyyy
}

interface ContextoReservas {
  reservas: Reserva[];
  agregarReserva: (reserva: Omit<Reserva, "id" | "fechaCreacion">) => void;
}

const ReservasContext = createContext<ContextoReservas | undefined>(undefined);

export const ProveedorReservas = ({ children }: { children: ReactNode }) => {
  const [reservas, setReservas] = useState<Reserva[]>([]);

  const agregarReserva = useCallback((datos: Omit<Reserva, "id" | "fechaCreacion">) => {
    const nueva: Reserva = {
      ...datos,
      id: `r-${Date.now()}`,
      fechaCreacion: new Date().toLocaleDateString("es-PE"),
    };
    setReservas((anteriores) => [nueva, ...anteriores]);
  }, []);

  const valor = useMemo(() => ({ reservas, agregarReserva }), [reservas, agregarReserva]);

  return <ReservasContext.Provider value={valor}>{children}</ReservasContext.Provider>;
};

export const useReservas = () => {
  const contexto = useContext(ReservasContext);
  if (!contexto) throw new Error("useReservas debe usarse dentro de <ProveedorReservas>");
  return contexto;
};
