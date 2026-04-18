import { memo } from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import type { Vehiculo } from "@/datos/vehiculos";

interface PropsTarjeta {
  vehiculo: Vehiculo;
}

const variantes = {
  oculto: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3 } },
};

const TarjetaVehiculo = ({ vehiculo }: PropsTarjeta) => {
  return (
    <motion.div variants={variantes}>
      <Link
        to={`/vehiculos/${vehiculo.id}`}
        className="block overflow-hidden rounded-lg border border-cyan bg-card shadow-md transition-all hover:scale-[1.03] hover:shadow-[0_0_20px_hsl(var(--cyan)/0.45)] active:scale-95"
      >
        <div className="relative p-3">
          <div className="absolute left-2 top-2 flex items-center gap-0.5 rounded bg-secondary px-1.5 py-0.5 text-[10px]">
            <Star size={10} className="fill-amber-400 text-amber-400" />
            <span className="font-semibold text-foreground">{vehiculo.calificacion}</span>
          </div>
          <img src={vehiculo.imagen} alt={vehiculo.modelo} className="mx-auto h-[70px] object-contain" />
        </div>
        <div className="border-t border-cyan/30 px-2.5 pb-3 pt-2">
          <p className="text-[10px] text-muted-foreground">
            {vehiculo.marca} - {vehiculo.anio}
          </p>
          <p className="text-xs font-bold text-foreground">
            {vehiculo.marca} {vehiculo.modelo}
          </p>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-sm font-bold text-price">S/{vehiculo.precioPorDia}</span>
            <span className="text-[8px] font-semibold text-muted-foreground">X día</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default memo(TarjetaVehiculo);
