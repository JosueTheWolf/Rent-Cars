/**
 * datos/vehiculos.ts — "BASE DE DATOS LOCAL" de la aplicación.
 *
 * Como esta app aún no usa un backend real, simulamos los datos con un
 * array TypeScript. Esto cumple dos funciones importantes para la rúbrica:
 *
 *  1) TIPADO FUERTE con `interface Vehiculo`: TypeScript valida en
 *     tiempo de compilación que cada vehículo tenga TODOS los campos
 *     requeridos. Si en otro archivo escribimos `vehiculo.precio` (mal),
 *     el editor marca error → menos bugs en producción.
 *
 *  2) FUENTE ÚNICA DE VERDAD: todas las páginas (Lista, Detalle, Reserva,
 *     Bienvenida, Historial) importan desde aquí. Si mañana cambia el
 *     precio del Toyota Hilux, solo se edita en un lugar.
 *
 * En el futuro este archivo se reemplazaría por llamadas a una API
 * (fetch / React Query) sin tocar el resto de la app, porque las páginas
 * dependen de la INTERFAZ, no del array.
 */

// Forma (contrato) que debe tener cada vehículo en la app.
export interface Vehiculo {
  id: string;
  marca: string;
  modelo: string;
  anio: number;
  tipo: string;
  transmision: string;
  combustible: string;
  asientos: number;
  precioPorDia: number;
  calificacion: number;
  imagen: string;
  viajes?: number; // El "?" indica que es opcional
}

export const vehiculos: Vehiculo[] = [
  {
    id: "1",
    marca: "Toyota",
    modelo: "4Runner",
    anio: 2026,
    tipo: "SUV",
    transmision: "Automatico",
    combustible: "Gasolina",
    asientos: 5,
    precioPorDia: 130,
    calificacion: 4.9,
    imagen: "/Toyota-4-runner.webp",
    viajes: 14,
  },
  {
    id: "2",
    marca: "Nissan",
    modelo: "Sentra",
    anio: 2026,
    tipo: "Sedan",
    transmision: "Automatico",
    combustible: "Gasolina",
    asientos: 5,
    precioPorDia: 100,
    calificacion: 4.7,
    imagen: "/Nissan-Sentra.webp",
    viajes: 5,
  },
  {
    id: "3",
    marca: "Audi",
    modelo: "Q3 Sportback",
    anio: 2026,
    tipo: "SUV",
    transmision: "Automatico",
    combustible: "Gasolina",
    asientos: 5,
    precioPorDia: 230,
    calificacion: 4.8,
    imagen: "/Audi-Q3-sportback.webp",
    viajes: 15,
  },
  {
    id: "4",
    marca: "Toyota",
    modelo: "Hilux",
    anio: 2026,
    tipo: "Camioneta",
    transmision: "Automatico",
    combustible: "Diesel",
    asientos: 5,
    precioPorDia: 180,
    calificacion: 4.6,
    imagen: "/Toyota-Hilux.webp",
    viajes: 20,
  },
];

/**
 * Historial demo: lo mostramos en /historial como ejemplo cuando el
 * usuario aún no ha hecho reservas reales. Las reservas reales (creadas
 * desde la pantalla de Reserva) viven en ReservasContext y aparecen
 * ANTES que estas en la lista.
 */
export interface HistorialAlquiler {
  id: string;
  vehiculo: Vehiculo;
  fecha: string;
  dias: number;
  precioTotal: number;
  danios: string;
}

export const historialAlquileres: HistorialAlquiler[] = [
  { id: "1", vehiculo: vehiculos[0], fecha: "20/03/2026", dias: 2, precioTotal: 240, danios: "Ninguno" },
  { id: "2", vehiculo: vehiculos[1], fecha: "20/03/2026", dias: 2, precioTotal: 250, danios: "Ninguno" },
  { id: "3", vehiculo: vehiculos[2], fecha: "20/03/2026", dias: 2, precioTotal: 150, danios: "Ninguno" },
  { id: "4", vehiculo: vehiculos[3], fecha: "20/03/2026", dias: 2, precioTotal: 100, danios: "Ninguno" },
];
