/**
 * Ayuda.tsx — sección de FAQ + canales de contacto.
 *
 * Demuestra:
 *  - Uso de un componente de la librería shadcn/ui: <Accordion> (basado en Radix UI).
 *    Radix garantiza accesibilidad: navegación por teclado, ARIA, focus management.
 *  - `type="single" collapsible` → solo se abre una pregunta a la vez.
 *  - Render dinámico de listas (faqs y contactos) con .map().
 */
import { Mail, Phone, MessageCircle, HelpCircle } from "lucide-react";
import TransicionPagina from "@/componentes/TransicionPagina";
import NavInferior from "@/componentes/NavInferior";
import CabeceraSecundaria from "@/componentes/CabeceraSecundaria";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/componentes/ui/acordeon";

const faqs = [
  {
    p: "¿Cómo reservo un vehículo?",
    r: "Selecciona el vehículo desde la lista, escoge las fechas y confirma la reserva.",
  },
  {
    p: "¿Puedo cancelar mi reserva?",
    r: "Sí, puedes cancelar desde tu historial. Aplican condiciones según el tiempo de antelación.",
  },
  {
    p: "¿Qué métodos de pago aceptan?",
    r: "Aceptamos tarjetas de crédito y débito Visa y Mastercard.",
  },
  {
    p: "¿Cómo cambio mi contraseña?",
    r: "Por ahora puedes contactarnos por correo y nuestro equipo te ayudará con el proceso.",
  },
];

const contactos = [
  { icono: Mail, etiqueta: "Correo", valor: "ayuda@rentcars.pe" },
  { icono: Phone, etiqueta: "Teléfono", valor: "+51 987 654 321" },
  { icono: MessageCircle, etiqueta: "WhatsApp", valor: "Chatear ahora" },
];

const Ayuda = () => (
  <TransicionPagina>
    <div className="flex min-h-screen flex-col bg-background pb-20">
      <CabeceraSecundaria titulo="Ayuda" />
      <div className="flex flex-1 flex-col gap-6 px-6">
        <div>
          <div className="mb-3 flex items-center gap-2 text-foreground">
            <HelpCircle size={18} className="text-cyan" />
            <h3 className="text-base font-semibold">Preguntas frecuentes</h3>
          </div>
          <div
            className="rounded-2xl border border-cyan px-5 py-2 shadow-md"
            style={{ background: "linear-gradient(90deg, #000000 23%, #0B1F3A 83%)" }}
          >
            <Accordion type="single" collapsible>
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-cyan/20">
                  <AccordionTrigger className="text-left text-sm text-foreground hover:no-underline">
                    {f.p}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    {f.r}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-base font-semibold text-foreground">Contáctanos</h3>
          <div className="flex flex-col gap-3">
            {contactos.map((c) => (
              <div
                key={c.etiqueta}
                className="flex items-center gap-4 rounded-2xl border border-cyan px-5 py-4 shadow-md"
                style={{ background: "linear-gradient(90deg, #000000 23%, #0B1F3A 83%)" }}
              >
                <c.icono size={22} className="text-cyan" strokeWidth={1.5} />
                <div className="flex flex-1 flex-col">
                  <span className="text-xs text-muted-foreground">{c.etiqueta}</span>
                  <span className="text-base text-foreground">{c.valor}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <NavInferior />
    </div>
  </TransicionPagina>
);

export default Ayuda;
