import { useState, useMemo, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Minus } from "lucide-react";
import { motion } from "framer-motion";
import TransicionPagina from "@/componentes/TransicionPagina";
import { vehiculos } from "@/datos/vehiculos";
import { useReservas } from "@/contexto/ReservasContext";
import { useUsuario } from "@/contexto/UsuarioContext";
const contenedorVariantes = {
  oculto: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
};
const campoVariantes = {
  oculto: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const PRECIO_SILLA = 20;

const Reserva = () => {
  const { id } = useParams();
  const navegar = useNavigate();
  const { agregarReserva } = useReservas();
  const { usuario } = useUsuario();
  const vehiculo = useMemo(
    () => vehiculos.find((v) => v.id === id),
    [id]
  );

  const [fechaRetiro, setFechaRetiro] = useState("");
  const [horaRetiro, setHoraRetiro] = useState("");
  const [fechaDevolucion, setFechaDevolucion] = useState("");
  const [horaDevolucion, setHoraDevolucion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState(usuario.email);
  const [sillasNinio, setSillasNinio] = useState(0);
  const precioSillas = useMemo(() => sillasNinio * PRECIO_SILLA, [sillasNinio]);
  const total = useMemo(
    () => (vehiculo?.precioPorDia ?? 0) + precioSillas,
    [vehiculo, precioSillas]
  );
  const incrementarSillas = useCallback(() => setSillasNinio((s) => s + 1), []);
  const decrementarSillas = useCallback(
    () => setSillasNinio((s) => Math.max(0, s - 1)),
    []
  );

  const manejarReserva = useCallback(() => {
    if (vehiculo) {
      agregarReserva({
        vehiculo,
        fechaRetiro: fechaRetiro || new Date().toLocaleDateString("es-PE"),
        fechaDevolucion: fechaDevolucion || new Date().toLocaleDateString("es-PE"),
        total,
      });
    }
    navegar(`/vehiculos/${id}/exito`, {
      state: { vehiculo, fechaRetiro, horaRetiro, fechaDevolucion, horaDevolucion, total },
    });
  }, [navegar, id, vehiculo, fechaRetiro, horaRetiro, fechaDevolucion, horaDevolucion, total, agregarReserva]);

  if (!vehiculo) return <div className="p-8 text-center text-foreground">Vehículo no encontrado</div>;


  return (
    <TransicionPagina>
      <div className="flex min-h-screen flex-col bg-background">
        <div className="mx-auto w-full max-w-md">
          <div className="flex items-center gap-3 px-4 py-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navegar(-1)}
              className="rounded-full bg-card border border-cyan/40 p-2 text-foreground"
            >
              <ArrowLeft size={18} />
            </motion.button>
            <h1 className="text-lg font-bold text-cyan">Reservar Vehiculo</h1>
          </div>

          <motion.div
            className="flex-1 space-y-4 px-4 pb-10"
            variants={contenedorVariantes}
            initial="oculto"
            animate="visible"
          >
            <motion.div variants={campoVariantes} className="space-y-2 rounded-xl border border-cyan/40 bg-card p-4">
              <label className="text-sm font-bold text-foreground">Fecha de Retiro</label>
              <input type="date" value={fechaRetiro} onChange={(e) => setFechaRetiro(e.target.value)}
                className="w-full rounded-md border border-cyan/60 bg-background/40 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-cyan" />
              <div className="flex items-center gap-2 pt-1">
                <span className="text-xs font-semibold text-foreground">Hora:</span>
                <input type="time" value={horaRetiro} onChange={(e) => setHoraRetiro(e.target.value)}
                  className="rounded-md border border-cyan/60 bg-background/40 px-2 py-1 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-cyan" />
              </div>
            </motion.div>
            <motion.div variants={campoVariantes} className="space-y-2 rounded-xl border border-cyan/40 bg-card p-4">
              <label className="text-sm font-bold text-foreground">Fecha de Devolución</label>
              <input type="date" value={fechaDevolucion} onChange={(e) => setFechaDevolucion(e.target.value)}
                className="w-full rounded-md border border-cyan/60 bg-background/40 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-cyan" />
              <div className="flex items-center gap-2 pt-1">
                <span className="text-xs font-semibold text-foreground">Hora:</span>
                <input type="time" value={horaDevolucion} onChange={(e) => setHoraDevolucion(e.target.value)}
                  className="rounded-md border border-cyan/60 bg-background/40 px-2 py-1 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-cyan" />
              </div>
            </motion.div>
            <div className="grid grid-cols-2 gap-3">
              <motion.div variants={campoVariantes} className="space-y-2 rounded-xl border border-cyan/40 bg-card p-3">
                <label className="text-xs font-bold uppercase text-foreground">Teléfono</label>
                <input type="tel" placeholder="ej. 900000000" value={telefono} onChange={(e) => setTelefono(e.target.value)}
                  className="w-full rounded-md border border-cyan/60 bg-background/40 px-2 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-cyan" />
              </motion.div>
              <motion.div variants={campoVariantes} className="space-y-3 rounded-xl border border-cyan/40 bg-card p-4">
                <span className="block text-xs font-bold text-foreground">👶 Silla para niños</span>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <motion.button whileTap={{ scale: 0.85 }} onClick={decrementarSillas}
                      className="rounded-md bg-card border border-cyan/40 p-1.5 text-foreground">
                      <Minus size={14} />
                    </motion.button>
                    <motion.span key={sillasNinio} initial={{ scale: 1.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.2 }} className="w-5 text-center text-sm font-bold text-foreground">
                      {sillasNinio}
                    </motion.span>
                    <motion.button whileTap={{ scale: 0.85 }} onClick={incrementarSillas}
                      className="rounded-md bg-accent p-1.5 text-accent-foreground transition-colors hover:bg-accent-hover">
                      <Plus size={14} />
                    </motion.button>
                  </div>
                  <span className="text-xs text-muted-foreground">s/{precioSillas.toFixed(2)}</span>
                </div>
              </motion.div>
            </div>
            <motion.div variants={campoVariantes} className="space-y-2 rounded-xl border border-cyan/40 bg-card p-4">
              <label className="text-sm font-bold text-foreground">Gmail</label>
              <input type="email" placeholder="ej: florcards@gmail.com" value={correo} onChange={(e) => setCorreo(e.target.value)}
                className="w-full rounded-md border border-cyan/60 bg-background/40 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-cyan" />
            </motion.div>
            <motion.div variants={campoVariantes} className="space-y-2 rounded-xl border border-cyan/40 bg-card p-4">
              <div className="flex justify-between text-sm">
                <span className="font-bold text-foreground">Precio x dia</span>
                <span className="font-semibold text-muted-foreground">s/{vehiculo.precioPorDia.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-bold text-foreground">Precio de S. Niño</span>
                <span className="font-semibold text-muted-foreground">s/{precioSillas.toFixed(2)}</span>
              </div>
              <div className="border-t border-cyan/30 pt-2">
                <div className="flex justify-between text-base font-bold">
                  <span className="text-foreground">Total</span>
                  <motion.span key={total} initial={{ scale: 1.15 }} animate={{ scale: 1 }}
                    transition={{ duration: 0.25 }} className="text-price">
                    s/{total.toFixed(2)}
                  </motion.span>
                </div>
              </div>
            </motion.div>
            <div className="flex justify-center pt-2">
              <motion.button
                variants={campoVariantes}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={manejarReserva}
                className="rounded-xl bg-accent px-12 py-3 text-base font-bold text-accent-foreground shadow-lg transition-colors hover:bg-accent-hover"
              >
                Reservar
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </TransicionPagina>
  );
};

export default Reserva;
