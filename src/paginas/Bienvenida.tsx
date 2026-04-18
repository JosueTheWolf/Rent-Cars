import { Link } from "react-router-dom";
import { Bell, Star } from "lucide-react";
import { motion } from "framer-motion";
import NavInferior from "@/componentes/NavInferior";
import CarruselVideos from "@/componentes/CarruselVideos";
import TransicionPagina from "@/componentes/TransicionPagina";
import AvatarUsuario from "@/componentes/AvatarUsuario";
import { vehiculos } from "@/datos/vehiculos";
import { useUsuario } from "@/contexto/UsuarioContext";
// Imágenes servidas desde la carpeta public/
const videosCarrusel = [
  "/medios/4runner.mp4",
  "/medios/sentra.mp4",
  "/medios/audi-q3.mp4",
  "/medios/hilux.mp4",
];

const Bienvenida = () => {
  const { usuario } = useUsuario();
  const vehiculosPopulares = vehiculos.slice(0, 2);

  return (
    <TransicionPagina>
      <div className="flex min-h-screen flex-col bg-background pb-20">
        {/* Encabezado */}
        <motion.div
          className="px-6 pt-6 pb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AvatarUsuario nombre={usuario.nombre} tamanio="lg" />
              <div>
                <p className="text-sm text-muted-foreground">Bienvenida</p>
                <p className="text-lg font-bold text-foreground">{usuario.nombre}</p>
              </div>
            </div>
            <Bell size={22} className="text-muted-foreground" />
          </div>
        </motion.div>

        {/* Banner principal - Carrusel de videos */}
        <motion.div
          className="mx-6 mb-6"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <CarruselVideos videos={videosCarrusel} />
        </motion.div>

        {/* Banner promocional */}
        <motion.div
          className="mx-6 mb-6 overflow-hidden rounded-2xl border border-cyan bg-card p-5"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <div className="flex items-start gap-3">
            <span className="text-3xl">🎁</span>
            <div>
              <h3 className="text-lg font-bold text-foreground">¡20% de descuento</h3>
              <h3 className="text-lg font-bold text-foreground">en tu proxima reserva!</h3>
              <p className="mt-1 text-xs text-muted-foreground">Aprovecha antes del 30 de abril</p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                <Link
                  to="/vehiculos"
                  className="mt-3 inline-block rounded-lg bg-accent px-5 py-2 text-sm font-semibold text-accent-foreground shadow transition-all hover:bg-accent-hover hover:shadow-[0_0_20px_hsl(var(--cyan)/0.45)]"
                >
                  Reservar Ahora &gt;
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Vehículos populares con stagger */}
        <div className="px-6 pb-4">
          <h2 className="mb-3 text-lg font-bold text-foreground">Vehiculos Populares</h2>
          <motion.div
            className="space-y-3"
            initial="oculto"
            animate="visible"
            variants={{
              oculto: {},
              visible: { transition: { staggerChildren: 0.12, delayChildren: 0.4 } },
            }}
          >
            {vehiculosPopulares.map((v) => (
              <motion.div
                key={v.id}
                variants={{
                  oculto: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
                }}
                whileHover={{ scale: 1.02 }}
              >
                <Link
                  to={`/vehiculos/${v.id}`}
                  className="flex items-center gap-4 rounded-xl border border-cyan bg-card p-4 transition-shadow hover:shadow-[0_0_20px_hsl(var(--cyan)/0.45)]"
                >
                  <img src={v.imagen} alt={v.modelo} className="h-16 w-20 object-contain" />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-foreground">{v.marca} {v.modelo}</p>
                    <div className="my-1 flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => {
                        const filled = i < Math.round(v.calificacion);
                        return (
                          <Star
                            key={i}
                            size={14}
                            className={filled ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}
                          />
                        );
                      })}
                    </div>
                    <p className="text-xs text-muted-foreground">{v.tipo} {v.transmision}</p>
                    <p className="text-sm font-bold text-price">Precio: s/{v.precioPorDia.toFixed(2)}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <NavInferior />
      </div>
    </TransicionPagina>
  );
};

export default Bienvenida;
