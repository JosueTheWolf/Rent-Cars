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
const clienteConsultas = new QueryClient();
const RutasAnimadas = () => {
  const ubicacion = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={ubicacion} key={ubicacion.pathname}>
        <Route path="/" element={<Navigate to="/iniciar-sesion" replace />} />
        <Route path="/iniciar-sesion" element={<InicioSesion />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/inicio" element={<Bienvenida />} />
        <Route path="/vehiculos" element={<ListaVehiculos />} />
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
