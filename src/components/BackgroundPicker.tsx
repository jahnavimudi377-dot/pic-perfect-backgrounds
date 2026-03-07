import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Palette, ImageIcon, Ban } from "lucide-react";

interface BackgroundPickerProps {
  onBackgroundChange: (bg: string | null) => void;
  currentBg: string | null;
}

const PRESET_COLORS = [
  "hsl(0, 0%, 100%)",
  "hsl(0, 0%, 0%)",
  "hsl(199, 89%, 48%)",
  "hsl(142, 71%, 45%)",
  "hsl(348, 83%, 47%)",
  "hsl(45, 93%, 47%)",
  "hsl(262, 83%, 58%)",
  "hsl(24, 95%, 53%)",
];

const BackgroundPicker = ({ onBackgroundChange, currentBg }: BackgroundPickerProps) => {
  const [customColor, setCustomColor] = useState("#ffffff");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    onBackgroundChange(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-4 w-full"
    >
      <p className="text-muted-foreground text-sm font-mono mb-3 flex items-center gap-2">
        <Palette className="w-4 h-4" />
        Custom Background
      </p>

      <div className="flex flex-wrap items-center gap-2">
        {/* Transparent / None */}
        <button
          onClick={() => onBackgroundChange(null)}
          className={`w-8 h-8 rounded-lg border-2 transition-all duration-200 checkerboard ${
            currentBg === null ? "border-primary ring-2 ring-primary/30" : "border-border hover:border-primary/50"
          }`}
          title="Transparent"
        >
          <Ban className="w-4 h-4 text-muted-foreground m-auto" />
        </button>

        {/* Preset colors */}
        {PRESET_COLORS.map((color) => (
          <button
            key={color}
            onClick={() => onBackgroundChange(color)}
            className={`w-8 h-8 rounded-lg border-2 transition-all duration-200 ${
              currentBg === color ? "border-primary ring-2 ring-primary/30 scale-110" : "border-border hover:border-primary/50"
            }`}
            style={{ backgroundColor: color }}
            title={color}
          />
        ))}

        {/* Custom color picker */}
        <div className="relative">
          <input
            type="color"
            value={customColor}
            onChange={(e) => {
              setCustomColor(e.target.value);
              onBackgroundChange(e.target.value);
            }}
            className="absolute inset-0 w-8 h-8 opacity-0 cursor-pointer"
          />
          <div
            className={`w-8 h-8 rounded-lg border-2 border-border hover:border-primary/50 transition-all duration-200 flex items-center justify-center`}
            style={{
              background: `conic-gradient(red, yellow, lime, aqua, blue, magenta, red)`,
            }}
            title="Custom color"
          />
        </div>

        {/* Image upload */}
        <button
          onClick={() => fileRef.current?.click()}
          className={`w-8 h-8 rounded-lg border-2 border-border hover:border-primary/50 transition-all duration-200 flex items-center justify-center bg-secondary ${
            currentBg && (currentBg.startsWith("blob:") || currentBg.startsWith("data:"))
              ? "border-primary ring-2 ring-primary/30"
              : ""
          }`}
          title="Upload background image"
        >
          <ImageIcon className="w-4 h-4 text-muted-foreground" />
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
        />
      </div>
    </motion.div>
  );
};

export default BackgroundPicker;
