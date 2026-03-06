import { motion } from "framer-motion";
import { Download, RotateCcw } from "lucide-react";

interface ResultPreviewProps {
  originalUrl: string;
  resultUrl: string;
  onReset: () => void;
}

const ResultPreview = ({ originalUrl, resultUrl, onReset }: ResultPreviewProps) => {
  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = "background-removed.png";
    a.click();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-3xl mx-auto px-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass-card p-4">
          <p className="text-muted-foreground text-sm font-mono mb-3">Original</p>
          <div className="rounded-xl overflow-hidden bg-secondary">
            <img src={originalUrl} alt="Original" className="w-full h-auto object-contain max-h-80" />
          </div>
        </div>
        <div className="glass-card p-4">
          <p className="text-muted-foreground text-sm font-mono mb-3">Background Removed</p>
          <div className="rounded-xl overflow-hidden checkerboard">
            <img src={resultUrl} alt="Result" className="w-full h-auto object-contain max-h-80" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-3 mt-6">
        <button onClick={handleDownload} className="neon-button inline-flex items-center gap-2">
          <Download className="w-4 h-4" />
          Download PNG
        </button>
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all duration-300 font-medium"
        >
          <RotateCcw className="w-4 h-4" />
          New Image
        </button>
      </div>
    </motion.div>
  );
};

export default ResultPreview;
