import { memo } from "react";
import { Home, Clock, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const NavInferior = () => {
  const ubicacion = useLocation();

  const pestanias = [
    { ruta: "/inicio", etiqueta: "Inicio", icono: Home },
    { ruta: "/historial", etiqueta: "Historial", icono: Clock },
    { ruta: "/perfil", etiqueta: "Mi Perfil", icono: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t border-cyan/30 bg-card">
      {pestanias.map((pestania) => {
        const estaActiva = ubicacion.pathname === pestania.ruta || ubicacion.pathname.startsWith(pestania.ruta + "/");
        return (
          <Link
            key={pestania.ruta}
            to={pestania.ruta}
            className={`flex flex-1 flex-col items-center justify-center gap-1 py-2 text-xs tracking-wide transition-all ${
              estaActiva ? "text-cyan" : "text-muted-foreground"
            }`}
          >
            <pestania.icono size={20} strokeWidth={1.5} />
            <span className="text-[13px]">{pestania.etiqueta}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default memo(NavInferior);
