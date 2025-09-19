import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Download, Loader2, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { removeBackground, loadImage } from '@/lib/backgroundRemover';

interface ProcessedImage {
  original: File;
  processed: Blob;
  previewUrl: string;
}

export const BackgroundRemover = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [processedImage, setProcessedImage] = useState<ProcessedImage | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const { toast } = useToast();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setProcessedImage(null);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      toast({
        title: "Invalid file",
        description: "Please select a valid image file.",
        variant: "destructive",
      });
    }
  };

  const handleRemoveBackground = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    try {
      const imageElement = await loadImage(selectedFile);
      const processedBlob = await removeBackground(imageElement);
      const processedUrl = URL.createObjectURL(processedBlob);
      
      setProcessedImage({
        original: selectedFile,
        processed: processedBlob,
        previewUrl: processedUrl
      });

      toast({
        title: "Success!",
        description: "Background removed successfully.",
      });
    } catch (error) {
      console.error('Background removal failed:', error);
      toast({
        title: "Processing failed",
        description: "Failed to remove background. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!processedImage) return;
    
    const link = document.createElement('a');
    link.href = processedImage.previewUrl;
    link.download = `${processedImage.original.name.split('.')[0]}_no_bg.png`;
    link.click();
  };

  const handleReset = () => {
    setSelectedFile(null);
    setProcessedImage(null);
    setPreviewUrl('');
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    if (processedImage) URL.revokeObjectURL(processedImage.previewUrl);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Button
              variant="ghost"
              size="sm"
              className="mr-4"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
              AI Background Remover
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Remove backgrounds from images instantly using AI technology
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {!selectedFile ? (
            /* Upload Zone */
            <Card className="border-2 border-dashed border-border hover:border-primary/50 transition-smooth">
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-secondary rounded-full flex items-center justify-center">
                  <Upload className="w-8 h-8 text-secondary-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Upload your image</h3>
                <p className="text-muted-foreground mb-4">
                  Drop your image here or click to browse (JPG, PNG, WEBP supported)
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="image-upload"
                />
                <Button asChild variant="default">
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Upload className="w-4 h-4 mr-2" />
                    Choose Image
                  </label>
                </Button>
              </CardContent>
            </Card>
          ) : (
            /* Processing Interface */
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Original Image */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Original Image</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                    <img
                      src={previewUrl}
                      alt="Original"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Processed Image */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Processed Image</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-square bg-muted rounded-lg overflow-hidden relative">
                    {processedImage ? (
                      <img
                        src={processedImage.previewUrl}
                        alt="Processed"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        {isProcessing ? (
                          <div className="text-center">
                            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-primary" />
                            <p className="text-sm text-muted-foreground">Processing...</p>
                          </div>
                        ) : (
                          <p className="text-muted-foreground">Processed image will appear here</p>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Action Buttons */}
          {selectedFile && (
            <div className="flex justify-center gap-4 mt-6">
              <Button
                variant="outline"
                onClick={handleReset}
                disabled={isProcessing}
              >
                Reset
              </Button>
              {!processedImage && (
                <Button
                  onClick={handleRemoveBackground}
                  disabled={isProcessing}
                  className="gradient-primary"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Remove Background'
                  )}
                </Button>
              )}
              {processedImage && (
                <Button
                  onClick={handleDownload}
                  className="gradient-primary"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PNG
                </Button>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};