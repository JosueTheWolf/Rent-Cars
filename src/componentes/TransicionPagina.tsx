import { motion } from "framer-motion";
import { ReactNode } from "react";

/**
 * Envoltorio que aplica una transición suave (fade + slide) a cualquier página.
 * Se usa como wrapper en cada página para que la entrada sea consistente.
 */
const TransicionPagina = ({ children }: { children: ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -12 }}
    transition={{ duration: 0.35, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

export default TransicionPagina;
