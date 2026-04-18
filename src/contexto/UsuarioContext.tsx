import { createContext, useContext, useState, useCallback, ReactNode, useMemo } from "react";

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

const leerUsuarioGuardado = (): Usuario => {
  try {
    const guardado = localStorage.getItem(CLAVE_STORAGE);
    if (guardado) return JSON.parse(guardado) as Usuario;
  } catch {
  }
  return USUARIO_INICIAL;
};

const UsuarioContext = createContext<ContextoUsuario | undefined>(undefined);

export const ProveedorUsuario = ({ children }: { children: ReactNode }) => {
  const [usuario, setUsuario] = useState<Usuario>(leerUsuarioGuardado);

  const actualizarUsuario = useCallback((datos: Partial<Usuario>) => {
    setUsuario((u) => {
      const nuevo = { ...u, ...datos };
      try {
        localStorage.setItem(CLAVE_STORAGE, JSON.stringify(nuevo));
      } catch {
      }
      return nuevo;
    });
  }, []);

  const cerrarSesion = useCallback(() => {
    try {
      localStorage.removeItem(CLAVE_STORAGE);
    } catch {
    }
    setUsuario(USUARIO_INICIAL);
  }, []);

  const valor = useMemo(
    () => ({ usuario, actualizarUsuario, cerrarSesion }),
    [usuario, actualizarUsuario, cerrarSesion]
  );

  return <UsuarioContext.Provider value={valor}>{children}</UsuarioContext.Provider>;
};

export const useUsuario = () => {
  const contexto = useContext(UsuarioContext);
  if (!contexto) throw new Error("useUsuario debe usarse dentro de <ProveedorUsuario>");
  return contexto;
};
