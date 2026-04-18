import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  titulo: string;
}

const CabeceraSecundaria = ({ titulo }: Props) => {
  const navegar = useNavigate();
  return (
    <div className="relative flex items-center justify-center px-6 pt-6 pb-4">
      <button
        onClick={() => navegar(-1)}
        className="absolute left-6 rounded-full p-1 text-foreground transition-colors hover:text-cyan"
        aria-label="Volver"
      >
        <ChevronLeft size={24} />
      </button>
      <h2 className="text-lg font-bold text-foreground">{titulo}</h2>
    </div>
  );
};

export default CabeceraSecundaria;
