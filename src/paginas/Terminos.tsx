/**
 * Terminos.tsx — pantalla estática de Términos y Condiciones legales.
 *
 * Es un componente PURO sin estado: solo renderiza JSX. No usa hooks porque
 * no hay nada que cambie en el tiempo. Es el componente más simple de la app.
 */
import TransicionPagina from "@/componentes/TransicionPagina";
import NavInferior from "@/componentes/NavInferior";
import CabeceraSecundaria from "@/componentes/CabeceraSecundaria";

const Terminos = () => (
  <TransicionPagina>
    <div className="flex min-h-screen flex-col bg-background pb-20">
      <CabeceraSecundaria titulo="Términos y condiciones" />
      <div className="flex-1 px-6">
        <div
          className="space-y-4 rounded-2xl border border-cyan p-5 text-sm leading-relaxed text-muted-foreground shadow-md"
          style={{ background: "linear-gradient(90deg, #000000 23%, #0B1F3A 83%)" }}
        >
          <h3 className="text-base font-semibold text-foreground">1. Aceptación</h3>
          <p>
            Al utilizar RentCars aceptas los presentes términos y condiciones. Si no estás de acuerdo,
            por favor no uses la aplicación.
          </p>
          <h3 className="text-base font-semibold text-foreground">2. Uso del servicio</h3>
          <p>
            El servicio de alquiler está sujeto a disponibilidad. El usuario se compromete a devolver
            el vehículo en las condiciones acordadas y dentro del plazo establecido.
          </p>
          <h3 className="text-base font-semibold text-foreground">3. Pagos</h3>
          <p>
            Los pagos se procesan de forma segura. Cualquier cargo adicional será notificado antes
            de su cobro.
          </p>
          <h3 className="text-base font-semibold text-foreground">4. Cancelaciones</h3>
          <p>
            Las cancelaciones realizadas con más de 24 horas de antelación no tienen costo. Después de
            ese plazo se aplicará un cargo del 20%.
          </p>
          <h3 className="text-base font-semibold text-foreground">5. Privacidad</h3>
          <p>
            Tus datos personales son tratados conforme a nuestra política de privacidad y nunca serán
            compartidos con terceros sin tu consentimiento.
          </p>
        </div>
      </div>
      <NavInferior />
    </div>
  </TransicionPagina>
);

export default Terminos;
