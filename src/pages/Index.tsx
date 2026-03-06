import { useState, useCallback } from "react";
import { removeBackground } from "@imgly/background-removal";
import HeroSection from "@/components/HeroSection";
import ImageUploader from "@/components/ImageUploader";
import ProcessingIndicator from "@/components/ProcessingIndicator";
import ResultPreview from "@/components/ResultPreview";
import Footer from "@/components/Footer";

type AppState = "idle" | "processing" | "done" | "error";

const Index = () => {
  const [state, setState] = useState<AppState>("idle");
  const [originalUrl, setOriginalUrl] = useState<string>("");
  const [resultUrl, setResultUrl] = useState<string>("");

  const handleImageSelect = useCallback(async (file: File) => {
    const url = URL.createObjectURL(file);
    setOriginalUrl(url);
    setState("processing");

    try {
      const blob = await removeBackground(url);
      const resultObjectUrl = URL.createObjectURL(blob);
      setResultUrl(resultObjectUrl);
      setState("done");
    } catch (err) {
      console.error("Background removal failed:", err);
      setState("error");
    }
  }, []);

  const handleReset = useCallback(() => {
    if (originalUrl) URL.revokeObjectURL(originalUrl);
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setOriginalUrl("");
    setResultUrl("");
    setState("idle");
  }, [originalUrl, resultUrl]);

  return (
    <div className="min-h-screen flex flex-col">
      <HeroSection />

      <main className="flex-1 flex flex-col items-center justify-start py-8">
        {state === "idle" && (
          <ImageUploader onImageSelect={handleImageSelect} />
        )}

        {state === "processing" && <ProcessingIndicator />}

        {state === "done" && (
          <ResultPreview
            originalUrl={originalUrl}
            resultUrl={resultUrl}
            onReset={handleReset}
          />
        )}

        {state === "error" && (
          <div className="text-center px-4">
            <p className="text-destructive mb-4">Something went wrong. Please try again.</p>
            <button onClick={handleReset} className="neon-button">
              Try Again
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Index;
