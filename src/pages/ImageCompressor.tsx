import { useState } from 'react';
import { Upload, Download, Settings2, ArrowRight, CheckCircle, Shrink, Image as ImageIcon, FileImage } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

export const ImageCompressor = () => {
  const [dragOver, setDragOver] = useState(false);
  const [compressing, setCompressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [compressionQuality, setCompressionQuality] = useState('80');
  const [outputFormat, setOutputFormat] = useState('jpeg');
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);

  const qualityOptions = [
    { value: '90', label: 'High Quality (90%)' },
    { value: '80', label: 'Good Quality (80%)' },
    { value: '70', label: 'Medium Quality (70%)' },
    { value: '60', label: 'Low Quality (60%)' },
    { value: '50', label: 'Very Low Quality (50%)' },
  ];

  const formatOptions = [
    { value: 'jpeg', label: 'JPEG' },
    { value: 'webp', label: 'WebP' },
    { value: 'png', label: 'PNG' },
  ];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const processFile = (file: File) => {
    setOriginalSize(file.size);
    setCompressing(true);
    setProgress(0);
    
    // Simulate compression process
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setCompressing(false);
          setCompleted(true);
          // Simulate compression ratio based on quality
          const qualityNum = parseInt(compressionQuality);
          const compressionRatio = (100 - qualityNum) / 100 * 0.7 + 0.3;
          setCompressedSize(Math.round(file.size * compressionRatio));
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getSavingsPercentage = () => {
    if (originalSize === 0) return 0;
    return Math.round(((originalSize - compressedSize) / originalSize) * 100);
  };

  const resetState = () => {
    setCompressing(false);
    setProgress(0);
    setCompleted(false);
    setOriginalSize(0);
    setCompressedSize(0);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-6">
            <Shrink className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Image Compressor
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Reduce image file sizes without losing quality. Perfect for web optimization and faster loading times.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Upload Section */}
            <div className="lg:col-span-2">
              <Card className="shadow-custom-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="w-5 h-5" />
                    Upload & Compress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {!compressing && !completed && (
                    <div
                      className={`border-2 border-dashed rounded-lg p-8 text-center transition-smooth ${
                        dragOver
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50 hover:bg-primary/5'
                      }`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      <div className="w-16 h-16 mx-auto mb-4 bg-secondary rounded-full flex items-center justify-center">
                        <ImageIcon className="w-8 h-8 text-secondary-foreground" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Drop your image here</h3>
                      <p className="text-muted-foreground mb-4">
                        Or click to browse (JPG, PNG, WebP supported)
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                        id="file-upload"
                      />
                      <Button asChild>
                        <label htmlFor="file-upload" className="cursor-pointer">
                          Choose Image
                        </label>
                      </Button>
                    </div>
                  )}

                  {compressing && (
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                        <Shrink className="w-8 h-8 text-primary animate-pulse" />
                      </div>
                      <h3 className="text-lg font-semibold">Compressing Image...</h3>
                      <Progress value={progress} className="w-full" />
                      <p className="text-sm text-muted-foreground">
                        {progress}% complete
                      </p>
                    </div>
                  )}

                  {completed && (
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 mx-auto bg-accent/10 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-8 h-8 text-accent" />
                      </div>
                      <h3 className="text-lg font-semibold text-accent">
                        Compression Complete!
                      </h3>
                      
                      <div className="bg-muted rounded-lg p-4 space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Original Size:</span>
                          <span className="font-medium">{formatFileSize(originalSize)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Compressed Size:</span>
                          <span className="font-medium">{formatFileSize(compressedSize)}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Size Reduction:</span>
                          <span className="font-bold text-accent">{getSavingsPercentage()}% smaller</span>
                        </div>
                      </div>

                      <div className="flex gap-3 justify-center">
                        <Button>
                          <Download className="w-4 h-4 mr-2" />
                          Download Compressed
                        </Button>
                        <Button variant="outline" onClick={resetState}>
                          Compress Another
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Settings Panel */}
            <div className="space-y-6">
              <Card className="shadow-custom-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Settings2 className="w-5 h-5" />
                    Compression Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="quality">Quality Level</Label>
                    <Select value={compressionQuality} onValueChange={setCompressionQuality}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {qualityOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="format">Output Format</Label>
                    <Select value={outputFormat} onValueChange={setOutputFormat}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {formatOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* How It Works */}
              <Card className="shadow-custom-sm">
                <CardHeader>
                  <CardTitle className="text-lg">How It Works</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-semibold">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium">Upload Image</h4>
                      <p className="text-sm text-muted-foreground">
                        Choose or drag your image file
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-semibold">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium">Set Quality</h4>
                      <p className="text-sm text-muted-foreground">
                        Adjust compression settings
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-semibold">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium">Download</h4>
                      <p className="text-sm text-muted-foreground">
                        Get your optimized image
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Supported Formats */}
              <Card className="shadow-custom-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Supported Formats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {['JPEG', 'PNG', 'WebP', 'GIF'].map(format => (
                      <div key={format} className="flex items-center gap-2 text-sm">
                        <FileImage className="w-4 h-4 text-muted-foreground" />
                        {format}
                      </div>
                    ))}
                  </div>
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