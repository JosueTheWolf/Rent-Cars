/**
 * App.tsx — COMPONENTE RAÍZ de la aplicación.
 *
 * Aquí ocurren 4 cosas clave que el profesor puede preguntar:
 *
 *  1) ENRUTAMIENTO con React Router (BrowserRouter + Routes + Route).
 *     Cada URL del navegador se mapea a una página distinta sin recargar.
 *
 *  2) PROVIDERS GLOBALES envolviendo toda la app:
 *     - QueryClientProvider → habilita React Query (caché de datos del servidor)
 *     - TooltipProvider     → habilita los tooltips de shadcn/ui en cualquier parte
 *     - ProveedorUsuario    → useContext: estado global del usuario logueado
 *     - ProveedorReservas   → useContext: estado global de las reservas hechas
 *
 *  3) ANIMACIONES DE TRANSICIÓN entre rutas con AnimatePresence (framer-motion):
 *     al cambiar de página, la anterior hace "fade out" y la nueva "fade in".
 *
 *  4) NOTIFICACIONES (toasts) con dos sistemas: Sonner y el toaster custom de shadcn.
 */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster as Sonner } from "@/componentes/ui/sonner";
import { Toaster } from "@/componentes/ui/notificador";
import { TooltipProvider } from "@/componentes/ui/descripcion-emergente";
import InicioSesion from "./paginas/InicioSesion";
import Registro from "./paginas/Registro";
import Bienvenida from "./paginas/Bienvenida";
import ListaVehiculos from "./paginas/ListaVehiculos";
import DetalleVehiculo from "./paginas/DetalleVehiculo";
import Reserva from "./paginas/Reserva";
import ReservaExitosa from "./paginas/ReservaExitosa";
import Historial from "./paginas/Historial";
import Perfil from "./paginas/Perfil";
import EditarPerfil from "./paginas/EditarPerfil";
import MetodoPago from "./paginas/MetodoPago";
import Direccion from "./paginas/Direccion";
import Idioma from "./paginas/Idioma";
import Terminos from "./paginas/Terminos";
import Ayuda from "./paginas/Ayuda";
import NoEncontrado from "./paginas/NoEncontrado";
import { ProveedorUsuario } from "./contexto/UsuarioContext";
import { ProveedorReservas } from "./contexto/ReservasContext";

// Instancia única de React Query: maneja caché, reintentos y revalidación de datos remotos.
const clienteConsultas = new QueryClient();

/**
 * RutasAnimadas — separa el árbol de rutas para poder usar `useLocation()`.
 * `useLocation()` solo funciona DENTRO de <BrowserRouter>, por eso este
 * componente está separado de <App />.
 *
 * `mode="wait"` hace que AnimatePresence espere a que termine la animación
 * de salida antes de montar la siguiente página → transiciones limpias.
 *
 * `key={ubicacion.pathname}` es el truco que permite a AnimatePresence
 * detectar que cambió la ruta y disparar las animaciones exit/enter.
 */
const RutasAnimadas = () => {
  const ubicacion = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={ubicacion} key={ubicacion.pathname}>
        {/* Ruta raíz: redirige automáticamente al login (la app exige iniciar sesión) */}
        <Route path="/" element={<Navigate to="/iniciar-sesion" replace />} />
        <Route path="/iniciar-sesion" element={<InicioSesion />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/inicio" element={<Bienvenida />} />
        <Route path="/vehiculos" element={<ListaVehiculos />} />
        {/* Rutas con parámetro dinámico ":id" → leído con useParams() en cada página */}
        <Route path="/vehiculos/:id" element={<DetalleVehiculo />} />
        <Route path="/vehiculos/:id/reservar" element={<Reserva />} />
        <Route path="/vehiculos/:id/exito" element={<ReservaExitosa />} />
        <Route path="/historial" element={<Historial />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/perfil/editar" element={<EditarPerfil />} />
        <Route path="/perfil/pago" element={<MetodoPago />} />
        <Route path="/perfil/direccion" element={<Direccion />} />
        <Route path="/perfil/idioma" element={<Idioma />} />
        <Route path="/perfil/terminos" element={<Terminos />} />
        <Route path="/perfil/ayuda" element={<Ayuda />} />
        {/* Comodín "*": cualquier URL no definida arriba cae en la página 404 */}
        <Route path="*" element={<NoEncontrado />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={clienteConsultas}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {/* Providers globales: el orden importa solo si un context depende de otro */}
      <ProveedorUsuario>
        <ProveedorReservas>
          <BrowserRouter>
            <RutasAnimadas />
          </BrowserRouter>
        </ProveedorReservas>
      </ProveedorUsuario>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
