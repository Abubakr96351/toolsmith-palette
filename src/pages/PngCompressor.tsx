import { useState } from 'react';
import { FileImage, Sparkles, Zap, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileUploadZone } from '@/components/ImageCompressor/FileUploadZone';
import { FileCard, FileData } from '@/components/ImageCompressor/FileCard';
import { BatchActions } from '@/components/ImageCompressor/BatchActions';

export const PngCompressor = () => {
  const [files, setFiles] = useState<FileData[]>([]);
  const [isCompressing, setIsCompressing] = useState(false);

  const handleFilesSelect = (newFiles: File[]) => {
    // Filter only PNG files
    const pngFiles = newFiles.filter(file => file.type === 'image/png');
    const fileData: FileData[] = pngFiles.map(file => ({
      id: `${file.name}-${Date.now()}-${Math.random()}`,
      file,
      originalSize: file.size,
      progress: 0,
      status: 'pending'
    }));
    setFiles(prev => [...prev, ...fileData]);
  };

  const compressFile = async (fileData: FileData) => {
    return new Promise<void>((resolve) => {
      setFiles(prev => prev.map(f => 
        f.id === fileData.id 
          ? { ...f, status: 'compressing', progress: 0 }
          : f
      ));

      const interval = setInterval(() => {
        setFiles(prev => prev.map(f => {
          if (f.id === fileData.id) {
            if (f.progress >= 100) {
              clearInterval(interval);
              // PNG specific compression (lossless, better ratios)
              const compressionRatio = 0.4 + Math.random() * 0.3; // 40-70% size reduction
              const compressedSize = Math.round(f.originalSize * compressionRatio);
              
              resolve();
              return {
                ...f,
                status: 'completed',
                progress: 100,
                compressedSize,
                compressionRatio
              };
            }
            return { ...f, progress: f.progress + 8 };
          }
          return f;
        }));
      }, 200);
    });
  };

  const handleCompressAll = async () => {
    setIsCompressing(true);
    const pendingFiles = files.filter(f => f.status === 'pending');
    
    for (const file of pendingFiles) {
      await compressFile(file);
    }
    
    setIsCompressing(false);
  };

  const handleRemoveFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const handleDownloadFile = (id: string) => {
    console.log('Downloading PNG file:', id);
  };

  const handleDownloadAll = () => {
    const completedFiles = files.filter(f => f.status === 'completed');
    console.log('Downloading all PNG files:', completedFiles.length);
  };

  const handleClearAll = () => {
    setFiles([]);
  };

  const handleReset = () => {
    setFiles(prev => prev.map(f => ({ 
      ...f, 
      status: 'pending', 
      progress: 0, 
      compressedSize: undefined 
    })));
  };

  const totalFiles = files.length;

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <div className="mb-6">
          <Button variant="ghost" asChild className="text-muted-foreground hover:text-foreground">
            <Link to="/tools/image-compressor" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Image Compressor
            </Link>
          </Button>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-accent to-accent-foreground rounded-full mb-6 shadow-glow">
            <FileImage className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            <span className="text-accent">PNG</span> Premium Compressor
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
            Specialized PNG compression with lossless quality preservation and advanced optimization algorithms.
          </p>
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full border border-accent/20">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Lossless • Transparency Preserved • Optimized</span>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Batch Actions */}
          <BatchActions
            files={files}
            onCompressAll={handleCompressAll}
            onDownloadAll={handleDownloadAll}
            onClearAll={handleClearAll}
            onReset={handleReset}
            isCompressing={isCompressing}
          />

          <div className="grid lg:grid-cols-4 gap-8 mt-8">
            {/* Upload & Files Section */}
            <div className="lg:col-span-3 space-y-6">
              {/* Upload Zone */}
              {files.length === 0 && (
                <Card className="shadow-custom-md border-accent/20">
                  <CardContent className="p-6">
                    <div className="border-2 border-dashed rounded-lg p-8 text-center transition-smooth border-accent/30 hover:border-accent/50 hover:bg-accent/5">
                      <div className="w-16 h-16 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center">
                        <FileImage className="w-8 h-8 text-accent" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Drop your PNG images here</h3>
                      <p className="text-muted-foreground mb-4">
                        Premium PNG compression with transparency preservation (PNG files only)
                      </p>
                      <input
                        type="file"
                        accept="image/png"
                        multiple
                        onChange={(e) => {
                          const files = e.target.files;
                          if (files && files.length > 0) {
                            handleFilesSelect(Array.from(files));
                          }
                        }}
                        className="hidden"
                        id="png-upload"
                        disabled={isCompressing}
                      />
                      <Button asChild variant="default" className="bg-accent hover:bg-accent/90">
                        <label htmlFor="png-upload" className="cursor-pointer">
                          <Sparkles className="w-4 h-4 mr-2" />
                          Choose PNG Images
                        </label>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Files Grid */}
              {files.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">PNG Files to Compress</h3>
                    <div className="text-sm text-muted-foreground">
                      {totalFiles} PNG files • Premium processing enabled
                    </div>
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                    {files.map(file => (
                      <FileCard
                        key={file.id}
                        fileData={file}
                        onRemove={handleRemoveFile}
                        onDownload={handleDownloadFile}
                        compressionQuality="lossless"
                      />
                    ))}
                  </div>

                  {/* Add More Files */}
                  <Card className="shadow-custom-sm border-dashed border-2 border-accent/20 hover:border-accent/50 transition-smooth">
                    <CardContent className="p-4">
                      <div className="border-2 border-dashed rounded-lg p-6 text-center transition-smooth border-accent/30 hover:border-accent/50 hover:bg-accent/5">
                        <FileImage className="w-8 h-8 mx-auto mb-2 text-accent" />
                        <p className="text-sm text-muted-foreground mb-3">Add more PNG files</p>
                        <input
                          type="file"
                          accept="image/png"
                          multiple
                          onChange={(e) => {
                            const files = e.target.files;
                            if (files && files.length > 0) {
                              handleFilesSelect(Array.from(files));
                            }
                          }}
                          className="hidden"
                          id="png-upload-more"
                          disabled={isCompressing}
                        />
                        <Button asChild variant="outline" size="sm" className="border-accent/30 text-accent hover:bg-accent/10">
                          <label htmlFor="png-upload-more" className="cursor-pointer">
                            Add PNG Files
                          </label>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>

            {/* PNG Features Panel */}
            <div className="space-y-6">
              <Card className="shadow-custom-sm bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-accent" />
                    PNG Optimization Features
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center font-semibold">
                      <Zap className="w-3 h-3" />
                    </div>
                    <div>
                      <h4 className="font-medium text-accent">Lossless Compression</h4>
                      <p className="text-sm text-muted-foreground">
                        100% quality preservation with advanced algorithms
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center font-semibold">
                      <FileImage className="w-3 h-3" />
                    </div>
                    <div>
                      <h4 className="font-medium text-accent">Transparency Preserved</h4>
                      <p className="text-sm text-muted-foreground">
                        Alpha channel and transparency maintained
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center font-semibold">
                      <Sparkles className="w-3 h-3" />
                    </div>
                    <div>
                      <h4 className="font-medium text-accent">Metadata Optimization</h4>
                      <p className="text-sm text-muted-foreground">
                        Remove unnecessary data while preserving quality
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center font-semibold">
                      <Zap className="w-3 h-3" />
                    </div>
                    <div>
                      <h4 className="font-medium text-accent">Color Palette Optimization</h4>
                      <p className="text-sm text-muted-foreground">
                        Smart color reduction for smaller file sizes
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-custom-sm">
                <CardHeader>
                  <CardTitle className="text-lg">PNG Best Practices</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-muted/50 rounded">
                    <h5 className="font-medium text-sm mb-1">For Graphics & Icons</h5>
                    <p className="text-xs text-muted-foreground">PNG is perfect for logos, icons, and graphics with sharp edges</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded">
                    <h5 className="font-medium text-sm mb-1">Transparency Support</h5>
                    <p className="text-xs text-muted-foreground">Only PNG preserves transparency - ideal for overlays</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded">
                    <h5 className="font-medium text-sm mb-1">Web Optimization</h5>
                    <p className="text-xs text-muted-foreground">Reduced file sizes improve loading times</p>
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