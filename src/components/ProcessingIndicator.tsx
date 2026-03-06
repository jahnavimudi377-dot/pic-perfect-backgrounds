import { motion } from "framer-motion";

const ProcessingIndicator = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center gap-6 py-12"
    >
      <div className="relative w-20 h-20">
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-primary/20"
        />
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-2 rounded-full border-2 border-transparent border-b-neon-cyan"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{ boxShadow: [
            "0 0 20px hsl(199 89% 48% / 0.1)",
            "0 0 40px hsl(199 89% 48% / 0.3)",
            "0 0 20px hsl(199 89% 48% / 0.1)",
          ]}}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
      <div className="text-center">
        <p className="text-foreground font-medium">Removing background...</p>
        <p className="text-muted-foreground text-sm mt-1">This may take a moment</p>
      </div>
    </motion.div>
  );
};

export default ProcessingIndicator;
