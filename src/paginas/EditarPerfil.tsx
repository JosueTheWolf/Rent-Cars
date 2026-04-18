/**
 * EditarPerfil.tsx — FORMULARIO de edición de los datos del usuario.
 *
 * Conceptos clave:
 *  - useState con un OBJETO completo (`form`) inicializado a partir del contexto.
 *    El form local es un "borrador" → no toca el contexto global hasta hacer click
 *    en Guardar. Esto permite cancelar sin perder los datos originales.
 *  - Componente reutilizable `CampoEditable` con render-prop de ícono → DRY.
 *  - Validación simple antes de guardar (nombre y email obligatorios).
 *  - `toast()` (sistema de notificaciones con useReducer) para feedback al usuario.
 *  - useContext (useUsuario.actualizarUsuario) → propaga el cambio a TODA la app.
 */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, Calendar, Save, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import TransicionPagina from "@/componentes/TransicionPagina";
import NavInferior from "@/componentes/NavInferior";
import CabeceraSecundaria from "@/componentes/CabeceraSecundaria";
import AvatarUsuario from "@/componentes/AvatarUsuario";
import { useUsuario } from "@/contexto/UsuarioContext";
import { toast } from "@/hooks/usar-notificacion";

interface CampoProps {
  icono: any;
  etiqueta: string;
  valor: string;
  tipo?: string;
  onChange: (v: string) => void;
}

const CampoEditable = ({ icono: Icono, etiqueta, valor, tipo = "text", onChange }: CampoProps) => (
  <div
    className="flex items-center gap-4 rounded-2xl border border-cyan px-5 py-3 shadow-md"
    style={{ background: "linear-gradient(90deg, #000000 23%, #0B1F3A 83%)" }}
  >
    <Icono size={22} className="text-cyan" strokeWidth={1.5} />
    <div className="flex flex-1 flex-col">
      <label className="text-xs text-muted-foreground">{etiqueta}</label>
      <input
        type={tipo}
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent text-base text-foreground focus:outline-none"
      />
    </div>
  </div>
);

const EditarPerfil = () => {
  const { usuario, actualizarUsuario } = useUsuario();
  const navegar = useNavigate();

  // Estado local del formulario (no toca el contexto hasta guardar)
  const [form, setForm] = useState(usuario);

  const cambio = (campo: keyof typeof form) => (valor: string) =>
    setForm((f) => ({ ...f, [campo]: valor }));

  const guardar = () => {
    if (!form.nombre.trim() || !form.email.trim()) {
      toast({ title: "Datos incompletos", description: "Nombre y correo son obligatorios." });
      return;
    }
    actualizarUsuario(form);
    toast({ title: "Perfil actualizado", description: "Tus datos se guardaron correctamente." });
    navegar("/perfil");
  };

  return (
    <TransicionPagina>
      <div className="flex min-h-screen flex-col bg-background pb-24">
        <CabeceraSecundaria titulo="Editar Perfil" />
        <div className="flex flex-col items-center px-6 pb-6">
          <AvatarUsuario nombre={form.nombre || "?"} tamanio="xl" />
          <button className="mt-2 text-sm text-cyan hover:underline">Cambiar foto</button>
        </div>
        <div className="flex flex-1 flex-col gap-3 px-6">
          <CampoEditable icono={User} etiqueta="Nombre completo" valor={form.nombre} onChange={cambio("nombre")} />
          <CampoEditable icono={Mail} etiqueta="Correo electrónico" valor={form.email} tipo="email" onChange={cambio("email")} />
          <CampoEditable icono={Phone} etiqueta="Teléfono" valor={form.telefono} tipo="tel" onChange={cambio("telefono")} />
          <CampoEditable icono={Calendar} etiqueta="Fecha de nacimiento" valor={form.fechaNacimiento} tipo="date" onChange={cambio("fechaNacimiento")} />
          <CampoEditable icono={MapPin} etiqueta="País" valor={form.pais} onChange={cambio("pais")} />

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={guardar}
            className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-accent py-3.5 text-base font-semibold text-accent-foreground shadow-lg transition-colors hover:bg-accent-hover"
          >
            <Save size={20} />
            Guardar cambios
          </motion.button>
        </div>
        <NavInferior />
      </div>
    </TransicionPagina>
  );
};

export default EditarPerfil;
