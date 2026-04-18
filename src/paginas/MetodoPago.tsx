import { CreditCard, Plus } from "lucide-react";
import TransicionPagina from "@/componentes/TransicionPagina";
import NavInferior from "@/componentes/NavInferior";
import CabeceraSecundaria from "@/componentes/CabeceraSecundaria";
const tarjetas = [
  { tipo: "Visa", numero: "**** **** **** 4521", titular: "Valeria Gusman", vence: "08/27" },
  { tipo: "Mastercard", numero: "**** **** **** 8890", titular: "Valeria Gusman", vence: "11/26" },
];

const MetodoPago = () => (
  <TransicionPagina>
    <div className="flex min-h-screen flex-col bg-background pb-20">
      <CabeceraSecundaria titulo="Método de pago" />
      <div className="flex flex-1 flex-col gap-4 px-6">
        {tarjetas.map((t) => (
          <div
            key={t.numero}
            className="rounded-2xl border border-cyan p-5 shadow-md"
            style={{ background: "linear-gradient(135deg, #0B1F3A 0%, #000000 100%)" }}
          >
            <div className="flex items-center justify-between">
              <CreditCard size={28} className="text-cyan" />
              <span className="text-sm font-semibold text-foreground">{t.tipo}</span>
            </div>
            <p className="mt-6 text-lg tracking-widest text-foreground">{t.numero}</p>
            <div className="mt-4 flex justify-between text-xs text-muted-foreground">
              <div>
                <p>Titular</p>
                <p className="text-foreground">{t.titular}</p>
              </div>
              <div className="text-right">
                <p>Vence</p>
                <p className="text-foreground">{t.vence}</p>
              </div>
            </div>
          </div>
        ))}

        <button
          className="flex items-center justify-center gap-2 rounded-2xl border border-dashed border-cyan py-4 text-cyan transition-colors hover:bg-cyan/10"
        >
          <Plus size={20} />
          <span>Agregar nuevo método</span>
        </button>
      </div>
      <NavInferior />
    </div>
  </TransicionPagina>
);

export default MetodoPago;
