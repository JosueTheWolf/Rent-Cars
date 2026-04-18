/**
 * NoEncontrado.tsx — pantalla 404.
 *
 * Se muestra cuando el usuario navega a una URL que no existe (ruta "*"
 * en App.tsx). Demuestra el uso de:
 *  - useLocation() → obtener la ruta actual desde el router.
 *  - useEffect()   → ejecutar un efecto secundario (loggear el 404 en
 *                    consola para debug) cuando cambia la ruta.
 */
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NoEncontrado = () => {
  const ubicacion = useLocation();

  useEffect(() => {
    console.error("Error 404: El usuario intentó acceder a una ruta inexistente:", ubicacion.pathname);
  }, [ubicacion.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">¡Oops! Página no encontrada</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Volver al inicio
        </a>
      </div>
    </div>
  );
};

export default NoEncontrado;
