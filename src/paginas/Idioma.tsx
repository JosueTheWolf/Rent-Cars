/**
 * Idioma.tsx — selector de idioma (UI demo, sin i18n real conectado todavía).
 *
 * Demuestra:
 *  - useState para mantener cuál idioma está seleccionado.
 *  - Patrón "lista + selección activa": comparar `seleccionado === codigo`
 *    para mostrar el ícono Check al lado del idioma elegido.
 */
import { useState } from "react";
import { Check } from "lucide-react";
import TransicionPagina from "@/componentes/TransicionPagina";
import NavInferior from "@/componentes/NavInferior";
import CabeceraSecundaria from "@/componentes/CabeceraSecundaria";

const idiomas = [
  { codigo: "es", nombre: "Español", bandera: "🇪🇸" },
  { codigo: "en", nombre: "English", bandera: "🇺🇸" },
  { codigo: "pt", nombre: "Português", bandera: "🇧🇷" },
  { codigo: "fr", nombre: "Français", bandera: "🇫🇷" },
];

const Idioma = () => {
  const [seleccionado, setSeleccionado] = useState("es");
  return (
    <TransicionPagina>
      <div className="flex min-h-screen flex-col bg-background pb-20">
        <CabeceraSecundaria titulo="Idioma" />
        <div className="flex flex-1 flex-col gap-3 px-6">
          {idiomas.map((i) => (
            <button
              key={i.codigo}
              onClick={() => setSeleccionado(i.codigo)}
              className="flex items-center gap-4 rounded-2xl border border-cyan px-5 py-4 text-left shadow-md"
              style={{ background: "linear-gradient(90deg, #000000 23%, #0B1F3A 83%)" }}
            >
              <span className="text-2xl">{i.bandera}</span>
              <span className="flex-1 text-base text-foreground">{i.nombre}</span>
              {seleccionado === i.codigo && <Check size={20} className="text-cyan" />}
            </button>
          ))}
        </div>
        <NavInferior />
      </div>
    </TransicionPagina>
  );
};

export default Idioma;
