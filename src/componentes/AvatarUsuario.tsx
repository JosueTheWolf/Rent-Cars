import { memo } from "react";

/**
 * AvatarUsuario — círculo con la inicial del nombre del usuario.
 * Estilo cyan con borde brillante (glow), consistente con el resto del diseño.
 *
 * Optimizado con React.memo: solo se re-renderiza si cambian nombre o tamaño.
 */

interface PropsAvatar {
  nombre: string;
  tamanio?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const TAMANIOS = {
  sm: "h-7 w-7 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-16 w-16 text-2xl",
  xl: "h-24 w-24 text-4xl",
};

const AvatarUsuario = ({ nombre, tamanio = "md", className = "" }: PropsAvatar) => {
  const inicial = (nombre?.trim()?.[0] ?? "?").toUpperCase();

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-full bg-cyan/20 border-2 border-cyan font-bold text-cyan shadow-[0_0_15px_hsl(var(--cyan)/0.6)] ${TAMANIOS[tamanio]} ${className}`}
      aria-label={`Avatar de ${nombre}`}
    >
      {/* Halo de brillo sutil */}
      <span className="absolute inset-0 rounded-full bg-cyan/10 blur-md -z-10" />
      <span>{inicial}</span>
    </div>
  );
};

export default memo(AvatarUsuario);
