import { useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, User, Lock, Eye, EyeOff } from "lucide-react";
import { z } from "zod"; // Librería para validar datos con esquemas tipados
import { useUsuario } from "@/contexto/UsuarioContext";
const fondoAuto = "/60fec9b2808152a899e107c20953f2c76dc8d726.jpg";
const esquemaCorreo = z
  .string()
  .trim()
  .email({ message: "Correo no válido" })
  .max(255, { message: "Demasiado largo" });

const esquemaUsuario = z
  .string()
  .trim()
  .min(3, { message: "Mínimo 3 caracteres" })
  .max(30, { message: "Máximo 30 caracteres" })
  .regex(/^[a-zA-Z0-9._-]+$/, {
    message: "Solo letras, números, . _ -",
  });

const esquemaContrasenia = z
  .string()
  .min(6, { message: "Mínimo 6 caracteres" })
  .max(100, { message: "Demasiado larga" });
const formatearNombre = (texto: string) =>
  texto
    .replace(/[._-]+/g, " ")
    .trim()
    .replace(/\b\w/g, (letra) => letra.toUpperCase());

const InicioSesion = () => {
  const navegar = useNavigate();
  const { actualizarUsuario } = useUsuario();
  const [identidad, setIdentidad] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [mostrarContrasenia, setMostrarContrasenia] = useState(false);
  const [errores, setErrores] = useState<{ identidad?: string; contrasenia?: string }>({});
  const pareceCorreo = useMemo(() => identidad.includes("@"), [identidad]);

  const manejarEnvio = (e: React.FormEvent) => {
    e.preventDefault();
    const nuevosErrores: typeof errores = {};

    const validacionIdentidad = pareceCorreo
      ? esquemaCorreo.safeParse(identidad)
      : esquemaUsuario.safeParse(identidad);
    if (!validacionIdentidad.success) {
      nuevosErrores.identidad = validacionIdentidad.error.issues[0].message;
    }

    const validacionContrasenia = esquemaContrasenia.safeParse(contrasenia);
    if (!validacionContrasenia.success) {
      nuevosErrores.contrasenia = validacionContrasenia.error.issues[0].message;
    }

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }
    if (pareceCorreo) {
      const prefijo = identidad.split("@")[0];
      actualizarUsuario({ nombre: formatearNombre(prefijo), email: identidad.trim() });
    } else {
      actualizarUsuario({ nombre: formatearNombre(identidad), email: "" });
    }

    navegar("/inicio");
  };

  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-center bg-cover bg-center px-8"
      style={{ backgroundImage: `url(${fondoAuto})` }}
    >
      <img
        src="/Logo.webp"
        alt="Logo"
        className="mx-auto mb-8 h-56 w-auto"
      />
      <h1 className="mb-2 text-3xl font-bold tracking-wide text-foreground">Inicio de Sesión</h1>
      <p className="mb-10 text-base text-muted-foreground">Ingresa tus datos</p>

      <form onSubmit={manejarEnvio} className="w-full max-w-md space-y-5" noValidate>
        <div>
          <div className={`flex items-center gap-3 rounded-xl border bg-card px-5 py-4 transition-colors ${errores.identidad ? "border-destructive" : "border-cyan"}`}>
            {pareceCorreo ? (
              <Mail size={24} className="text-cyan" />
            ) : (
              <User size={24} className="text-cyan" />
            )}
            <input
              type="text"
              autoComplete="username"
              placeholder="Correo o usuario"
              value={identidad}
              onChange={(e) => {
                setIdentidad(e.target.value);
                if (errores.identidad) setErrores((er) => ({ ...er, identidad: undefined }));
              }}
              maxLength={255}
              className="flex-1 bg-transparent text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          </div>
          {errores.identidad && (
            <p className="mt-1 px-2 text-xs text-destructive">{errores.identidad}</p>
          )}
        </div>
        <div>
          <div className={`flex items-center gap-3 rounded-xl border bg-card px-5 py-4 transition-colors ${errores.contrasenia ? "border-destructive" : "border-cyan"}`}>
            <Lock size={26} strokeWidth={2} className="shrink-0 text-cyan" />
            <input
              type={mostrarContrasenia ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Contraseña"
              value={contrasenia}
              onChange={(e) => {
                setContrasenia(e.target.value);
                if (errores.contrasenia) setErrores((er) => ({ ...er, contrasenia: undefined }));
              }}
              maxLength={100}
              className="flex-1 bg-transparent text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <button type="button" onClick={() => setMostrarContrasenia(!mostrarContrasenia)} aria-label="Mostrar contraseña">
              {mostrarContrasenia ? <EyeOff size={22} className="text-muted-foreground" /> : <Eye size={22} className="text-muted-foreground" />}
            </button>
          </div>
          {errores.contrasenia && (
            <p className="mt-1 px-2 text-xs text-destructive">{errores.contrasenia}</p>
          )}
        </div>

        <button type="submit" className="w-full rounded-xl bg-accent py-4 text-lg font-semibold tracking-wide text-accent-foreground shadow-lg transition-colors hover:bg-accent-hover">
          Iniciar Sesión
        </button>

        <div className="text-center">
          <a href="#" className="text-sm text-accent">¿Olvidaste tu contraseña?</a>
        </div>
      </form>

      <p className="mt-3 text-base text-muted-foreground">
        ¿No tienes una cuenta?{" "}
        <Link to="/registro" className="font-semibold text-accent underline">Regístrate</Link>
      </p>
    </div>
  );
};

export default InicioSesion;
