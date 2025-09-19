import { useState } from 'react';
import { Maximize2, Download, Loader2, ArrowLeft, Upload, RotateCcw } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

interface ResizedImage {
  original: File;
  resized: Blob;
  previewUrl: string;
  width: number;
  height: number;
}

const PRESET_SIZES = [
  { name: 'Instagram Square', width: 1080, height: 1080 },
  { name: 'Instagram Story', width: 1080, height: 1920 },
  { name: 'Facebook Post', width: 1200, height: 630 },
  { name: 'Twitter Header', width: 1500, height: 500 },
  { name: 'YouTube Thumbnail', width: 1280, height: 720 },
  { name: 'LinkedIn Banner', width: 1584, height: 396 },
];

export const ImageResizer = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [resizedImage, setResizedImage] = useState<ResizedImage | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Resize settings
  const [width, setWidth] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [quality, setQuality] = useState('80');
  const [outputFormat, setOutputFormat] = useState('jpeg');
  
  // Original dimensions
  const [originalWidth, setOriginalWidth] = useState(0);
  const [originalHeight, setOriginalHeight] = useState(0);
  const [aspectRatio, setAspectRatio] = useState(1);
  
  const { toast } = useToast();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setResizedImage(null);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      
      // Get original dimensions
      const img = new Image();
      img.onload = () => {
        setOriginalWidth(img.width);
        setOriginalHeight(img.height);
        setWidth(img.width.toString());
        setHeight(img.height.toString());
        setAspectRatio(img.width / img.height);
      };
      img.src = url;
    } else {
      toast({
        title: "Invalid file",
        description: "Please select a valid image file.",
        variant: "destructive",
      });
    }
  };

  const handleWidthChange = (value: string) => {
    setWidth(value);
    if (maintainAspectRatio && value) {
      const newHeight = Math.round(parseInt(value) / aspectRatio);
      setHeight(newHeight.toString());
    }
  };

  const handleHeightChange = (value: string) => {
    setHeight(value);
    if (maintainAspectRatio && value) {
      const newWidth = Math.round(parseInt(value) * aspectRatio);
      setWidth(newWidth.toString());
    }
  };

  const handlePresetSelect = (preset: typeof PRESET_SIZES[0]) => {
    setWidth(preset.width.toString());
    setHeight(preset.height.toString());
    setMaintainAspectRatio(false);
  };

  const resizeImage = async (): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      if (!selectedFile) {
        reject(new Error('No file selected'));
        return;
      }

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        const targetWidth = parseInt(width);
        const targetHeight = parseInt(height);
        
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        
        if (ctx) {
          // Clear canvas with white background for JPEG
          if (outputFormat === 'jpeg') {
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, targetWidth, targetHeight);
          }
          
          ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
          
          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve(blob);
              } else {
                reject(new Error('Failed to create blob'));
              }
            },
            `image/${outputFormat}`,
            parseInt(quality) / 100
          );
        } else {
          reject(new Error('Could not get canvas context'));
        }
      };

      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = previewUrl;
    });
  };

  const handleResize = async () => {
    if (!selectedFile || !width || !height) return;

    setIsProcessing(true);
    try {
      const resizedBlob = await resizeImage();
      const resizedUrl = URL.createObjectURL(resizedBlob);
      
      setResizedImage({
        original: selectedFile,
        resized: resizedBlob,
        previewUrl: resizedUrl,
        width: parseInt(width),
        height: parseInt(height)
      });

      toast({
        title: "Success!",
        description: "Image resized successfully.",
      });
    } catch (error) {
      console.error('Resize failed:', error);
      toast({
        title: "Resize failed",
        description: "Failed to resize image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!resizedImage) return;
    
    const link = document.createElement('a');
    link.href = resizedImage.previewUrl;
    link.download = `${selectedFile?.name.split('.')[0]}_${resizedImage.width}x${resizedImage.height}.${outputFormat}`;
    link.click();
  };

  const handleReset = () => {
    setSelectedFile(null);
    setResizedImage(null);
    setPreviewUrl('');
    setWidth('');
    setHeight('');
    setOriginalWidth(0);
    setOriginalHeight(0);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    if (resizedImage) URL.revokeObjectURL(resizedImage.previewUrl);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-6 shadow-glow">
            <Maximize2 className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Image Resizer
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Resize your images to any dimension with high quality. Perfect for social media, web, and print.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Upload & Preview Section */}
            <div className="lg:col-span-2 space-y-6">
              {!selectedFile ? (
                <Card className="shadow-custom-md">
                  <CardContent className="p-8">
                    <div className="border-2 border-dashed rounded-lg p-8 text-center transition-smooth border-border hover:border-primary/50 hover:bg-primary/5">
                      <div className="w-16 h-16 mx-auto mb-4 bg-secondary rounded-full flex items-center justify-center">
                        <Upload className="w-8 h-8 text-secondary-foreground" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Upload your image</h3>
                      <p className="text-muted-foreground mb-4">
                        Drop your image here or click to browse (JPG, PNG, WebP supported)
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
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Original Image */}
                  <Card className="shadow-custom-md">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center justify-between">
                        Original Image
                        <span className="text-sm font-normal text-muted-foreground">
                          {originalWidth} × {originalHeight}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                        <img
                          src={previewUrl}
                          alt="Original"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="mt-4 text-sm text-muted-foreground">
                        <p>Size: {formatFileSize(selectedFile.size)}</p>
                        <p>Format: {selectedFile.type.split('/')[1].toUpperCase()}</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Resized Image */}
                  <Card className="shadow-custom-md">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center justify-between">
                        Resized Image
                        {resizedImage && (
                          <span className="text-sm font-normal text-muted-foreground">
                            {resizedImage.width} × {resizedImage.height}
                          </span>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-square bg-muted rounded-lg overflow-hidden relative">
                        {resizedImage ? (
                          <img
                            src={resizedImage.previewUrl}
                            alt="Resized"
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            {isProcessing ? (
                              <div className="text-center">
                                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-primary" />
                                <p className="text-sm text-muted-foreground">Resizing...</p>
                              </div>
                            ) : (
                              <p className="text-muted-foreground">Resized image will appear here</p>
                            )}
                          </div>
                        )}
                      </div>
                      {resizedImage && (
                        <div className="mt-4 text-sm text-muted-foreground">
                          <p>Size: {formatFileSize(resizedImage.resized.size)}</p>
                          <p>Format: {outputFormat.toUpperCase()}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Action Buttons */}
              {selectedFile && (
                <div className="flex justify-center gap-4">
                  <Button
                    variant="outline"
                    onClick={handleReset}
                    disabled={isProcessing}
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                  {!resizedImage && (
                    <Button
                      onClick={handleResize}
                      disabled={isProcessing || !width || !height}
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Resizing...
                        </>
                      ) : (
                        <>
                          <Maximize2 className="w-4 h-4 mr-2" />
                          Resize Image
                        </>
                      )}
                    </Button>
                  )}
                  {resizedImage && (
                    <Button onClick={handleDownload}>
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  )}
                </div>
              )}
            </div>

            {/* Settings Panel */}
            <div className="space-y-6">
              {/* Resize Settings */}
              <Card className="shadow-custom-md">
                <CardHeader>
                  <CardTitle>Resize Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="width">Width (px)</Label>
                      <Input
                        id="width"
                        type="number"
                        value={width}
                        onChange={(e) => handleWidthChange(e.target.value)}
                        placeholder="Width"
                        min="1"
                        max="5000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="height">Height (px)</Label>
                      <Input
                        id="height"
                        type="number"
                        value={height}
                        onChange={(e) => handleHeightChange(e.target.value)}
                        placeholder="Height"
                        min="1"
                        max="5000"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="aspect-ratio"
                      checked={maintainAspectRatio}
                      onCheckedChange={(checked) => setMaintainAspectRatio(checked as boolean)}
                    />
                    <Label htmlFor="aspect-ratio" className="text-sm">
                      Maintain aspect ratio
                    </Label>
                  </div>
                </CardContent>
              </Card>

              {/* Preset Sizes */}
              <Card className="shadow-custom-md">
                <CardHeader>
                  <CardTitle>Preset Sizes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    {PRESET_SIZES.map((preset) => (
                      <Button
                        key={preset.name}
                        variant="outline"
                        size="sm"
                        onClick={() => handlePresetSelect(preset)}
                        className="justify-between"
                      >
                        <span className="text-sm">{preset.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {preset.width} × {preset.height}
                        </span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Output Settings */}
              <Card className="shadow-custom-md">
                <CardHeader>
                  <CardTitle>Output Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="format">Output Format</Label>
                    <Select value={outputFormat} onValueChange={setOutputFormat}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="jpeg">JPEG</SelectItem>
                        <SelectItem value="png">PNG</SelectItem>
                        <SelectItem value="webp">WebP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {outputFormat !== 'png' && (
                    <div>
                      <Label htmlFor="quality">Quality: {quality}%</Label>
                      <Input
                        id="quality"
                        type="range"
                        min="10"
                        max="100"
                        step="10"
                        value={quality}
                        onChange={(e) => setQuality(e.target.value)}
                        className="mt-2"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};