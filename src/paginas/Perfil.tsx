import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User, CreditCard, MapPin, HelpCircle, Globe, FileText, LogOut, ChevronRight, Pencil, Check, X,
} from "lucide-react";
import { motion } from "framer-motion";
import NavInferior from "@/componentes/NavInferior";
import TransicionPagina from "@/componentes/TransicionPagina";
import AvatarUsuario from "@/componentes/AvatarUsuario";
import { useUsuario } from "@/contexto/UsuarioContext";
const fondoAuto = "/60fec9b2808152a899e107c20953f2c76dc8d726.jpg";

const menuVariantes = {
  oculto: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.25 } },
};
const itemVariantes = {
  oculto: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

const Perfil = () => {
  const navegar = useNavigate();
  const { usuario, actualizarUsuario, cerrarSesion } = useUsuario();
  const [editando, setEditando] = useState(false);
  const [borrador, setBorrador] = useState(usuario.nombre);

  const guardar = () => {
    const limpio = borrador.trim();
    if (limpio) actualizarUsuario({ nombre: limpio });
    setEditando(false);
  };

  const cancelar = () => {
    setBorrador(usuario.nombre);
    setEditando(false);
  };

  const cerrarYNavegar = () => {
    cerrarSesion();
    navegar("/iniciar-sesion");
  };

  const elementosMenu = [
    { icono: User, etiqueta: "Editar Perfil", ruta: "/perfil/editar" },
    { icono: CreditCard, etiqueta: "Metodo de pago", ruta: "/perfil/pago" },
    { icono: MapPin, etiqueta: "Direccion", ruta: "/perfil/direccion" },
    { icono: Globe, etiqueta: "Idioma", ruta: "/perfil/idioma" },
    { icono: FileText, etiqueta: "Términos y condiciones", ruta: "/perfil/terminos" },
    { icono: HelpCircle, etiqueta: "Ayuda", ruta: "/perfil/ayuda" },
  ];

  return (
    <TransicionPagina>
      <div className="flex min-h-screen flex-col bg-background pb-20">
        <div className="flex items-center justify-between px-6 pt-6">
          <span />
          <h2 className="text-lg font-bold text-foreground">Mi Perfil</h2>
          <span />
        </div>
        <motion.div
          className="flex flex-col items-center px-6 pt-4 pb-6"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <motion.div
            whileHover={{ scale: 1.05, rotate: 3 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <AvatarUsuario nombre={usuario.nombre} tamanio="xl" />
          </motion.div>

          {editando ? (
            <div className="mt-3 flex items-center gap-2">
              <input
                autoFocus
                value={borrador}
                onChange={(e) => setBorrador(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") guardar();
                  if (e.key === "Escape") cancelar();
                }}
                className="rounded-lg border border-cyan bg-card px-3 py-1 text-center text-lg font-bold text-foreground focus:outline-none focus:ring-1 focus:ring-cyan"
              />
              <button onClick={guardar} className="rounded-full bg-cyan/20 p-1.5 text-cyan hover:bg-cyan/30">
                <Check size={16} />
              </button>
              <button onClick={cancelar} className="rounded-full bg-destructive/20 p-1.5 text-destructive hover:bg-destructive/30">
                <X size={16} />
              </button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mt-3 flex items-center gap-2"
            >
              <h1 className="text-lg font-bold text-foreground">{usuario.nombre}</h1>
              <button
                onClick={() => { setBorrador(usuario.nombre); setEditando(true); }}
                className="rounded-full p-1 text-muted-foreground transition-colors hover:text-cyan"
                aria-label="Editar nombre"
              >
                <Pencil size={14} />
              </button>
            </motion.div>
          )}

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm text-muted-foreground"
          >
            {usuario.email}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mt-1 text-xs text-cyan"
          >
            {usuario.pais}
          </motion.p>
        </motion.div>
        <div className="flex-1 px-6 pb-4">
          <motion.div
            className="space-y-2"
            variants={menuVariantes}
            initial="oculto"
            animate="visible"
          >
            {elementosMenu.map((elemento) => (
              <motion.button
                key={elemento.etiqueta}
                variants={itemVariantes}
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navegar(elemento.ruta)}
                className="flex w-full items-center gap-4 rounded-2xl border border-cyan px-5 py-4 text-left shadow-md"
                style={{ background: "linear-gradient(90deg, #000000 23%, #0B1F3A 83%)" }}
              >
                <elemento.icono size={22} className="text-foreground" strokeWidth={1.5} />
                <span className="flex-1 text-base text-foreground">{elemento.etiqueta}</span>
                <ChevronRight size={20} className="text-foreground" />
              </motion.button>
            ))}

            <motion.button
              variants={itemVariantes}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={cerrarYNavegar}
              className="flex w-full items-center gap-4 rounded-2xl border border-destructive px-5 py-4 text-left text-destructive shadow-md"
              style={{ background: "linear-gradient(90deg, #000000 23%, #0B1F3A 83%)" }}
            >
              <LogOut size={22} strokeWidth={1.5} />
              <span className="flex-1 text-base font-medium">Cerrar sesión</span>
              <ChevronRight size={20} />
            </motion.button>
          </motion.div>
        </div>

        <NavInferior />
      </div>
    </TransicionPagina>
  );
};

export default Perfil;
