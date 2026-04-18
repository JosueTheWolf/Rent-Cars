/**
 * Direccion.tsx — pantalla de direcciones guardadas (Casa, Trabajo).
 *
 * Demuestra:
 *  - Render dinámico de íconos pasados como propiedad del objeto (`d.icono`).
 *  - Badge "Principal" condicional con renderizado JSX `{cond && <span/>}`.
 *  - Componente puro stateless → fácil de testear.
 */
import { MapPin, Plus, Home, Briefcase } from "lucide-react";
import TransicionPagina from "@/componentes/TransicionPagina";
import NavInferior from "@/componentes/NavInferior";
import CabeceraSecundaria from "@/componentes/CabeceraSecundaria";

// Datos demo: en producción vendrían del usuario logueado en el backend
const direcciones = [
  { icono: Home, etiqueta: "Casa", direccion: "Av. Arequipa 1234, Miraflores, Lima, Perú", principal: true },
  { icono: Briefcase, etiqueta: "Trabajo", direccion: "Av. Javier Prado 567, San Isidro, Lima, Perú", principal: false },
];

const Direccion = () => (
  <TransicionPagina>
    <div className="flex min-h-screen flex-col bg-background pb-20">
      <CabeceraSecundaria titulo="Dirección" />
      <div className="flex flex-1 flex-col gap-3 px-6">
        {direcciones.map((d) => (
          <div
            key={d.etiqueta}
            className="flex items-start gap-4 rounded-2xl border border-cyan px-5 py-4 shadow-md"
            style={{ background: "linear-gradient(90deg, #000000 23%, #0B1F3A 83%)" }}
          >
            <d.icono size={22} className="text-cyan" strokeWidth={1.5} />
            <div className="flex flex-1 flex-col">
              <div className="flex items-center gap-2">
                <span className="text-base font-semibold text-foreground">{d.etiqueta}</span>
                {d.principal && (
                  <span className="rounded-full bg-cyan/20 px-2 py-0.5 text-xs text-cyan">
                    Principal
                  </span>
                )}
              </div>
              <span className="text-sm text-muted-foreground">{d.direccion}</span>
            </div>
            <MapPin size={18} className="text-muted-foreground" />
          </div>
        ))}
        <button className="flex items-center justify-center gap-2 rounded-2xl border border-dashed border-cyan py-4 text-cyan transition-colors hover:bg-cyan/10">
          <Plus size={20} />
          <span>Agregar dirección</span>
        </button>
      </div>
      <NavInferior />
    </div>
  </TransicionPagina>
);

export default Direccion;
