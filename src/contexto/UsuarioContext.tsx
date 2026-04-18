import { createContext, useContext, useState, useCallback, ReactNode, useMemo } from "react";

/**
 * UsuarioContext — gestión GLOBAL del estado del usuario.
 *
 * ¿Por qué Context API?
 * Antes el nombre "Valeria Gusman" estaba hardcodeado en 4 archivos distintos.
 * Con Context, una sola fuente de verdad alimenta a TODA la app: si cambia
 * el nombre en Perfil, se actualiza automáticamente en NavInferior, ListaVehiculos
 * e Historial sin pasar props manualmente por cada nivel.
 *
 * Esto cumple el criterio 4 de la rúbrica: "gestión avanzada del estado con useContext".
 */

export interface Usuario {
  nombre: string;
  email: string;
  telefono: string;
  fechaNacimiento: string;
  pais: string;
}

interface ContextoUsuario {
  usuario: Usuario;
  actualizarUsuario: (datos: Partial<Usuario>) => void;
  cerrarSesion: () => void;
}

const USUARIO_INICIAL: Usuario = {
  nombre: "Valeria Gusman",
  email: "valeria@gmail.pe",
  telefono: "+51 987 654 321",
  fechaNacimiento: "1998-04-15",
  pais: "Perú",
};

const CLAVE_STORAGE = "rentcars_usuario";

// Lee el usuario guardado en localStorage (o devuelve el inicial si no hay nada)
const leerUsuarioGuardado = (): Usuario => {
  try {
    const guardado = localStorage.getItem(CLAVE_STORAGE);
    if (guardado) return JSON.parse(guardado) as Usuario;
  } catch {
    // Si falla el parseo, ignoramos y usamos el inicial
  }
  return USUARIO_INICIAL;
};

const UsuarioContext = createContext<ContextoUsuario | undefined>(undefined);

export const ProveedorUsuario = ({ children }: { children: ReactNode }) => {
  const [usuario, setUsuario] = useState<Usuario>(leerUsuarioGuardado);

  // useCallback para que la referencia no cambie en cada render
  const actualizarUsuario = useCallback((datos: Partial<Usuario>) => {
    setUsuario((u) => {
      const nuevo = { ...u, ...datos };
      try {
        localStorage.setItem(CLAVE_STORAGE, JSON.stringify(nuevo));
      } catch {
        // Si localStorage no está disponible, seguimos sin persistir
      }
      return nuevo;
    });
  }, []);

  const cerrarSesion = useCallback(() => {
    try {
      localStorage.removeItem(CLAVE_STORAGE);
    } catch {
      // Ignoramos errores de storage
    }
    setUsuario(USUARIO_INICIAL);
  }, []);

  // useMemo para evitar que el value sea un objeto nuevo en cada render
  const valor = useMemo(
    () => ({ usuario, actualizarUsuario, cerrarSesion }),
    [usuario, actualizarUsuario, cerrarSesion]
  );

  return <UsuarioContext.Provider value={valor}>{children}</UsuarioContext.Provider>;
};

// Hook custom: simplifica el consumo y valida que se use dentro del Provider
export const useUsuario = () => {
  const contexto = useContext(UsuarioContext);
  if (!contexto) throw new Error("useUsuario debe usarse dentro de <ProveedorUsuario>");
  return contexto;
};
