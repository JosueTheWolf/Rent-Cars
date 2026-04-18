import { Star, PackageOpen } from "lucide-react";
import { motion } from "framer-motion";
import NavInferior from "@/componentes/NavInferior";
import TransicionPagina from "@/componentes/TransicionPagina";
import AvatarUsuario from "@/componentes/AvatarUsuario";
import { historialAlquileres } from "@/datos/vehiculos";
import { useReservas } from "@/contexto/ReservasContext";
import { useUsuario } from "@/contexto/UsuarioContext";
import { useMemo } from "react";

const listaVariantes = {
  oculto: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};
const tarjetaVariantes = {
  oculto: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

const Historial = () => {
  const { reservas } = useReservas();
  const { usuario } = useUsuario();

  /**
   * useMemo: combinamos las reservas REALES del usuario (del Context) con
   * el historial demo. Las reales aparecen primero. Solo recalcula cuando
   * cambia el array de reservas.
   */
  const elementos = useMemo(() => {
    const reales = reservas.map((reserva) => ({
      id: reserva.id,
      vehiculo: reserva.vehiculo,
      fecha: reserva.fechaCreacion,
      dias: 1,
      danios: "Ninguno",
      precioTotal: reserva.total,
      esReal: true,
    }));
    const demo = historialAlquileres.map((h) => ({ ...h, esReal: false }));
    return [...reales, ...demo];
  }, [reservas]);

  return (
    <TransicionPagina>
      <div className="flex min-h-screen flex-col bg-background pb-20">
        <motion.div
          className="flex items-center gap-3 px-6 pt-6 pb-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <AvatarUsuario nombre={usuario.nombre} tamanio="md" />
          <div>
            <h1 className="text-xl font-bold text-foreground">Historial de Alquiler</h1>
            <p className="text-xs text-muted-foreground">{usuario.nombre}</p>
          </div>
        </motion.div>

        <motion.div
          className="flex-1 space-y-4 px-6 pt-2"
          variants={listaVariantes}
          initial="oculto"
          animate="visible"
        >
          {elementos.length === 0 && (
            <div className="flex flex-col items-center gap-2 py-12 text-center text-muted-foreground">
              <PackageOpen size={40} />
              <p className="text-sm">Aún no tienes reservas</p>
            </div>
          )}
          {elementos.map((alquiler) => (
            <motion.div
              key={alquiler.id}
              variants={tarjetaVariantes}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className="flex items-center gap-4 rounded-xl border border-cyan bg-card p-4 transition-shadow hover:shadow-[0_0_20px_hsl(var(--cyan)/0.45)]"
            >
              <img
                src={alquiler.vehiculo.imagen}
                alt={alquiler.vehiculo.modelo}
                className="h-20 w-24 flex-shrink-0 object-contain"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-muted-foreground">{alquiler.fecha} - {alquiler.dias} días</span>
                  {alquiler.esReal && (
                    <span className="rounded bg-cyan/20 px-1.5 py-0.5 text-[9px] font-bold text-cyan">NUEVA</span>
                  )}
                </div>
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={10} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm font-bold text-foreground">
                  Modelo: {alquiler.vehiculo.marca} {alquiler.vehiculo.modelo}
                </p>
                {alquiler.vehiculo.viajes !== undefined && (
                  <p className="text-xs text-muted-foreground">Viajes: {alquiler.vehiculo.viajes}</p>
                )}
                <p className="text-xs text-muted-foreground">Daños: {alquiler.danios}</p>
                <p className="mt-1 text-sm font-bold text-price">
                  Precio: s/{alquiler.precioTotal.toFixed(2)}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <NavInferior />
      </div>
    </TransicionPagina>
  );
};

export default Historial;
