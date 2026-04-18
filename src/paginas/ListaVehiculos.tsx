import { useState, useMemo, useCallback } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import NavInferior from "@/componentes/NavInferior";
import TarjetaVehiculo from "@/componentes/TarjetaVehiculo";
import TransicionPagina from "@/componentes/TransicionPagina";
import AvatarUsuario from "@/componentes/AvatarUsuario";
import { vehiculos } from "@/datos/vehiculos";
import { useUsuario } from "@/contexto/UsuarioContext";
const contenedorVariantes = {
  oculto: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const ListaVehiculos = () => {
  const [busqueda, setBusqueda] = useState("");
  const { usuario } = useUsuario();
  const filtrados = useMemo(() => {
    const termino = busqueda.toLowerCase();
    return vehiculos.filter(
      (v) =>
        v.marca.toLowerCase().includes(termino) ||
        v.modelo.toLowerCase().includes(termino)
    );
  }, [busqueda]);
  const manejarCambioBusqueda = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setBusqueda(e.target.value),
    []
  );

  return (
    <TransicionPagina>
      <div className="flex min-h-screen flex-col bg-background pb-20">
        <div className="bg-black px-6 pt-6 pb-4">
          <div className="flex items-center gap-2">
            <AvatarUsuario nombre={usuario.nombre} tamanio="sm" />
            <h1 className="text-base font-bold text-foreground tracking-wide">
              Hola, {usuario.nombre} 👋
            </h1>
          </div>
          <p className="text-sm text-muted-foreground tracking-wide">
            ¿Qué Vehículo deseas alquilar hoy?
          </p>
          <div className="mt-3 flex items-center rounded-lg border border-cyan bg-card px-4 py-3">
            <Search size={18} className="text-cyan" />
            <input
              type="text"
              placeholder="Buscar...."
              value={busqueda}
              onChange={manejarCambioBusqueda}
              className="ml-2 flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          </div>
        </div>
        <div className="flex-1 px-6 py-2">
          <motion.div
            className="grid grid-cols-2 gap-4"
            variants={contenedorVariantes}
            initial="oculto"
            animate="visible"
            key={busqueda} 
          >
            {filtrados.map((v) => (
              <TarjetaVehiculo key={v.id} vehiculo={v} />
            ))}
          </motion.div>
        </div>

        <NavInferior />
      </div>
    </TransicionPagina>
  );
};

export default ListaVehiculos;
