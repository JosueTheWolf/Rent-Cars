import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Check, Calendar, Clock, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import TransicionPagina from "@/componentes/TransicionPagina";
import { vehiculos } from "@/datos/vehiculos";

const ReservaExitosa = () => {
  const navegar = useNavigate();
  const { state } = useLocation();
  const { id } = useParams();
  const vehiculo =
    state?.vehiculo ?? vehiculos.find((v) => v.id === id) ?? vehiculos[0];
  const total = state?.total ?? vehiculo.precioPorDia;

  return (
    <TransicionPagina>
      <div className="flex min-h-screen flex-col items-center justify-start bg-background px-8 py-8 overflow-y-auto">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
          className="relative mb-6"
        >
          <motion.div
            animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            className="absolute inset-0 rounded-full bg-green-400/40 blur-xl"
          />
          <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-4 border-green-400 bg-green-400/10 shadow-[0_0_30px_rgba(74,222,128,0.5)]">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
            >
              <Check size={72} strokeWidth={3.5} className="text-green-400" />
            </motion.div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-6 text-2xl font-bold text-foreground"
        >
          ¡Reserva Exitosa!
        </motion.h1>

        {vehiculo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.4 }}
            className="mb-8 w-full max-w-xs rounded-xl border border-cyan bg-card p-5 text-center"
          >
            <img src={vehiculo.imagen} alt={vehiculo.modelo} className="mx-auto mb-3 h-24 object-contain" />
            <p className="text-base font-bold text-cyan">{vehiculo.marca} {vehiculo.modelo}</p>
            <div className="mt-2 space-y-1.5">
              <p className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Calendar size={14} className="text-accent shrink-0" />
                <span>Retiro: {state?.fechaRetiro || "12/4/2026"} {state?.horaRetiro || "10:00"}</span>
              </p>
              <p className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Clock size={14} className="text-accent shrink-0" />
                <span>Devolución: {state?.fechaDevolucion || "12/4/2026"} {state?.horaDevolucion || "10:00"}</span>
              </p>
              <p className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <MapPin size={14} className="text-accent shrink-0" />
                <span>Miraflores - Lima</span>
              </p>
            </div>
            <div className="mt-3 border-t border-cyan/30 pt-3">
              <span className="text-sm text-muted-foreground">Total</span>
              <p className="text-2xl font-extrabold text-orange-500 drop-shadow-[0_0_8px_rgba(249,115,22,0.5)]">s/{total}</p>
            </div>
          </motion.div>
        )}

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navegar("/inicio")}
          className="w-full max-w-xs rounded-xl bg-accent py-3.5 text-base font-semibold text-accent-foreground shadow-lg transition-colors hover:bg-accent-hover"
        >
          Ir al inicio
        </motion.button>
      </div>
    </TransicionPagina>
  );
};

export default ReservaExitosa;
