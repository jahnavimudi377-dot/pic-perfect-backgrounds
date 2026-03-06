import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="pt-20 pb-8 px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground font-mono">Powered by AI</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
          <span className="text-foreground">AI Background</span>
          <br />
          <span className="neon-text">Remover</span>
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto">
          Upload any image and watch the background disappear instantly.
          No signup required. 100% free & private.
        </p>
      </motion.div>
    </section>
  );
};

export default HeroSection;
