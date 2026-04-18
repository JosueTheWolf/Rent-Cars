import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Fuel, Users, Car, Cog } from "lucide-react";
import { motion } from "framer-motion";
import NavInferior from "@/componentes/NavInferior";
import TransicionPagina from "@/componentes/TransicionPagina";
import { vehiculos } from "@/datos/vehiculos";

// Variantes para el stagger de las especificaciones
const grillaVariantes = {
  oculto: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
};
const itemVariantes = {
  oculto: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const DetalleVehiculo = () => {
  const { id } = useParams();
  const navegar = useNavigate();
  const vehiculo = vehiculos.find((v) => v.id === id);

  if (!vehiculo) return <div className="p-8 text-center text-foreground">Vehículo no encontrado</div>;

  return (
    <TransicionPagina>
      <div className="flex min-h-screen flex-col bg-background pb-20">
        {/* Imagen de encabezado */}
        <div className="relative h-72 bg-black overflow-hidden">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navegar(-1)}
            className="absolute left-4 top-4 z-10 rounded-full bg-card/80 p-2 backdrop-blur-sm text-foreground"
          >
            <ArrowLeft size={20} />
          </motion.button>
          <div className="pointer-events-none absolute inset-0 flex items-end justify-center pb-4">
            <motion.img
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              src={vehiculo.imagen}
              alt={vehiculo.modelo}
              className="max-h-64 w-full object-contain drop-shadow-xl scale-125"
            />
          </div>
        </div>

        {/* Contenido */}
        <div className="flex-1 px-6 pt-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <p className="text-xs text-muted-foreground">{vehiculo.marca} - {vehiculo.anio}</p>
            <h1 className="text-xl font-bold text-foreground">
              {vehiculo.marca} {vehiculo.modelo}
            </h1>
          </motion.div>

          {/* Grilla de especificaciones con stagger */}
          <motion.div
            className="mt-5 grid grid-cols-2 gap-3"
            variants={grillaVariantes}
            initial="oculto"
            animate="visible"
          >
            <motion.div variants={itemVariantes}>
              <ItemEspecificacion icono={<Users size={18} />} etiqueta="Asientos" valor={`${vehiculo.asientos}`} />
            </motion.div>
            <motion.div variants={itemVariantes}>
              <ItemEspecificacion icono={<Cog size={18} />} etiqueta="Transmisión" valor={vehiculo.transmision} />
            </motion.div>
            <motion.div variants={itemVariantes}>
              <ItemEspecificacion icono={<Fuel size={18} />} etiqueta="Combustible" valor={vehiculo.combustible} />
            </motion.div>
            <motion.div variants={itemVariantes}>
              <ItemEspecificacion icono={<Car size={18} />} etiqueta="Tipo" valor={vehiculo.tipo} />
            </motion.div>
          </motion.div>

          {/* Campos de ubicación */}
          <motion.div
            className="mt-6 space-y-3"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.45 }}
          >
            <h3 className="text-sm font-bold text-foreground">Lugar de Retiro</h3>
            <div className="flex items-center gap-2 rounded-lg border border-cyan bg-card px-3 py-3">
              <MapPin size={16} className="text-cyan" />
              <input
                placeholder="Buscar ubicación"
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
            </div>

            <h3 className="text-sm font-bold text-foreground">Lugar de devolución</h3>
            <div className="flex items-center gap-2 rounded-lg border border-cyan bg-card px-3 py-3">
              <MapPin size={16} className="text-cyan" />
              <input
                placeholder="Buscar ubicación"
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
            </div>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            onClick={() => navegar(`/vehiculos/${id}/reservar`)}
            className="mt-6 w-full rounded-xl bg-accent py-3.5 text-base font-semibold tracking-wide text-accent-foreground shadow-lg transition-colors hover:bg-accent-hover"
          >
            Siguiente
          </motion.button>
        </div>

        <NavInferior />
      </div>
    </TransicionPagina>
  );
};

// Componente para mostrar cada especificación
const ItemEspecificacion = ({ icono, etiqueta, valor }: { icono: React.ReactNode; etiqueta: string; valor: string }) => (
  <div className="flex items-center gap-2 rounded-lg border border-cyan/40 bg-card px-3 py-3">
    <span className="text-cyan">{icono}</span>
    <div>
      <p className="text-[10px] text-muted-foreground">{etiqueta}</p>
      <p className="text-xs font-semibold text-foreground">{valor}</p>
    </div>
  </div>
);

export default DetalleVehiculo;
