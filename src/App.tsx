import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import { ImageConverter } from "./pages/ImageConverter";
import { ImageCompressor } from "./pages/ImageCompressor";
import { PngCompressor } from "./pages/PngCompressor";
import { VideoConverter } from "./pages/VideoConverter";
import { BackgroundRemover } from "./pages/BackgroundRemover";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tools/image-converter" element={<ImageConverter />} />
          <Route path="/tools/image-compressor" element={<ImageCompressor />} />
          <Route path="/tools/png-compressor" element={<PngCompressor />} />
          <Route path="/tools/video-converter" element={<VideoConverter />} />
          <Route path="/tools/background-remover" element={<BackgroundRemover />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
