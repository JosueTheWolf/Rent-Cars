/**
 * Registro.tsx — PANTALLA DE REGISTRO en 2 pasos (wizard).
 *
 * Conceptos demostrados:
 *  - useState para controlar el paso actual (1 o 2) y el objeto `formulario`.
 *  - Patrón "objeto único de estado": un solo setFormulario actualiza cualquier campo.
 *  - Componente reutilizable `CampoEntrada` → DRY (no repetir el mismo input 8 veces).
 *  - useContext (useUsuario) para guardar el usuario recién registrado.
 *  - useNavigate para mover al usuario a /inicio al terminar.
 */
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, User, Phone, Calendar, CreditCard } from "lucide-react";
import { useUsuario } from "@/contexto/UsuarioContext";
const fondoAuto = "/60fec9b2808152a899e107c20953f2c76dc8d726.jpg";

const Registro = () => {
  const navegar = useNavigate();
  const { actualizarUsuario } = useUsuario();
  const [paso, setPaso] = useState(1); // wizard: 1 = credenciales, 2 = datos personales
  const [formulario, setFormulario] = useState({
    correo: "", contrasenia: "", nombre: "", apellidoPaterno: "",
    apellidoMaterno: "", licencia: "", fechaNacimiento: "", telefono: "", sexo: "",
  });

  // Updater genérico: una sola función actualiza cualquier campo del formulario
  const actualizar = (clave: string, valor: string) => setFormulario((anterior) => ({ ...anterior, [clave]: valor }));

  const manejarEnvio = (e: React.FormEvent) => {
    e.preventDefault();
    if (paso === 1) {
      setPaso(2);
    } else {
      // Guardamos el usuario registrado en el Context global
      const nombreCompleto = [formulario.nombre, formulario.apellidoPaterno]
        .filter(Boolean)
        .join(" ")
        .trim() || formulario.correo.split("@")[0];
      actualizarUsuario({
        nombre: nombreCompleto,
        email: formulario.correo,
      });
      navegar("/inicio");
    }
  };

  return (
    <div
      className="flex min-h-screen flex-col items-center bg-cover bg-center px-8 pt-12"
      style={{ backgroundImage: `url(${fondoAuto})` }}
    >
      <img
        src="/Logo.webp"
        alt="Logo"
        className="mx-auto mb-8 h-32 w-auto"
      />
      <h1 className="mb-2 text-3xl font-bold tracking-wide text-foreground">Registro</h1>
      <p className="mb-8 text-base text-muted-foreground">Completa los campos</p>

      {/* Indicador de pasos */}
      <div className="mb-8 flex items-center">
        <button type="button" onClick={() => setPaso(1)} className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-base font-bold transition-colors ${paso >= 1 ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"}`}>1</button>
        <div className={`h-0.5 w-14 transition-colors -mx-[2px] ${paso >= 2 ? "bg-accent" : "bg-muted"}`} />
        <button type="button" onClick={() => { if (formulario.correo && formulario.contrasenia) setPaso(2); }} className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-base font-bold transition-colors ${paso >= 2 ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"}`}>2</button>
      </div>

      <form onSubmit={manejarEnvio} className="w-full max-w-md space-y-5">
        {paso === 1 ? (
          <>
            <CampoEntrada icono={<Mail size={24} />} placeholder="Correo" valor={formulario.correo} alCambiar={(v) => actualizar("correo", v)} tipo="email" />
            <CampoEntrada icono={<Lock size={24} />} placeholder="Contraseña" valor={formulario.contrasenia} alCambiar={(v) => actualizar("contrasenia", v)} tipo="password" />
          </>
        ) : (
          <>
            <CampoEntrada icono={<User size={24} />} placeholder="Nombre" valor={formulario.nombre} alCambiar={(v) => actualizar("nombre", v)} />
            <CampoEntrada icono={<User size={24} />} placeholder="Apellido Paterno" valor={formulario.apellidoPaterno} alCambiar={(v) => actualizar("apellidoPaterno", v)} />
            <CampoEntrada icono={<User size={24} />} placeholder="Apellido Materno" valor={formulario.apellidoMaterno} alCambiar={(v) => actualizar("apellidoMaterno", v)} />
            <CampoEntrada icono={<CreditCard size={24} />} placeholder="Licencia" valor={formulario.licencia} alCambiar={(v) => actualizar("licencia", v)} />
            <CampoEntrada icono={<Calendar size={24} />} placeholder="Fecha de Nacimiento" valor={formulario.fechaNacimiento} alCambiar={(v) => actualizar("fechaNacimiento", v)} tipo="date" />
            <CampoEntrada icono={<Phone size={24} />} placeholder="Teléfono" valor={formulario.telefono} alCambiar={(v) => actualizar("telefono", v)} tipo="tel" />
            <div>
              <p className="mb-2 text-sm font-semibold text-foreground">Sexo</p>
              <div className="flex gap-6">
                <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
                  <input type="radio" name="sexo" value="M" checked={formulario.sexo === "M"} onChange={() => actualizar("sexo", "M")} className="h-4 w-4 accent-accent" />
                  Masculino
                </label>
                <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
                  <input type="radio" name="sexo" value="F" checked={formulario.sexo === "F"} onChange={() => actualizar("sexo", "F")} className="h-4 w-4 accent-accent" />
                  Femenino
                </label>
              </div>
            </div>
          </>
        )}

        <div className="flex gap-3 pt-2">
          {paso === 2 && (
            <button type="button" onClick={() => setPaso(1)} className="flex-1 rounded-xl bg-[#0F97D5] py-4 text-lg font-semibold text-white shadow-lg transition-colors hover:bg-[#0d85bd]">
              Volver
            </button>
          )}
          <button type="submit" className="flex-1 rounded-xl bg-accent py-4 text-lg font-semibold text-accent-foreground shadow-lg transition-colors hover:bg-accent-hover">
            {paso === 1 ? "Siguiente →" : "Regístrate"}
          </button>
        </div>
      </form>

      <p className="mt-3 text-base text-muted-foreground">
        ¿Ya tienes una cuenta?{" "}
        <Link to="/iniciar-sesion" className="font-semibold text-accent underline">Inicia Sesión</Link>
      </p>
    </div>
  );
};

// Componente reutilizable para campos de entrada
const CampoEntrada = ({ icono, placeholder, valor, alCambiar, tipo = "text" }: {
  icono: React.ReactNode; placeholder: string; valor: string; alCambiar: (v: string) => void; tipo?: string;
}) => (
  <div className="flex items-center gap-3 rounded-xl border border-cyan bg-card px-5 py-4">
    <span className="text-cyan">{icono}</span>
    <input
      type={tipo}
      placeholder={placeholder}
      value={valor}
      onChange={(e) => alCambiar(e.target.value)}
      className="flex-1 bg-transparent text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
    />
  </div>
);

export default Registro;
