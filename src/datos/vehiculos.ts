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
  viajes?: number;
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
