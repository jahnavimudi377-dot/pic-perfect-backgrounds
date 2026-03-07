import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Download, RotateCcw } from "lucide-react";
import BackgroundPicker from "./BackgroundPicker";

interface ResultPreviewProps {
  originalUrl: string;
  resultUrl: string;
  onReset: () => void;
}

const ResultPreview = ({ originalUrl, resultUrl, onReset }: ResultPreviewProps) => {
  const [customBg, setCustomBg] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getCompositeUrl = useCallback((): Promise<string> => {
    return new Promise((resolve) => {
      if (!customBg) {
        resolve(resultUrl);
        return;
      }

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw background
        if (customBg.startsWith("blob:") || customBg.startsWith("data:")) {
          const bgImg = new Image();
          bgImg.crossOrigin = "anonymous";
          bgImg.onload = () => {
            ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
            resolve(canvas.toDataURL("image/png"));
          };
          bgImg.src = customBg;
        } else {
          ctx.fillStyle = customBg;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
          resolve(canvas.toDataURL("image/png"));
        }
      };
      img.src = resultUrl;
    });
  }, [customBg, resultUrl]);

  const handleDownload = async () => {
    const url = await getCompositeUrl();
    const a = document.createElement("a");
    a.href = url;
    a.download = "background-removed.png";
    a.click();
  };

  const resultBgStyle: React.CSSProperties = customBg
    ? customBg.startsWith("blob:") || customBg.startsWith("data:")
      ? { backgroundImage: `url(${customBg})`, backgroundSize: "cover", backgroundPosition: "center" }
      : { backgroundColor: customBg }
    : {};

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
          <p className="text-muted-foreground text-sm font-mono mb-3">Result</p>
          <div
            className={`rounded-xl overflow-hidden ${!customBg ? "checkerboard" : ""}`}
            style={resultBgStyle}
          >
            <img src={resultUrl} alt="Result" className="w-full h-auto object-contain max-h-80" />
          </div>
        </div>
      </div>

      <div className="mt-4">
        <BackgroundPicker onBackgroundChange={setCustomBg} currentBg={customBg} />
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
      <canvas ref={canvasRef} className="hidden" />
    </motion.div>
  );
};

export default ResultPreview;
