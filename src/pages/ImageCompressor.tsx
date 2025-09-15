import { useState } from 'react';
import { Shrink, FileImage, Sparkles, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileUploadZone } from '@/components/ImageCompressor/FileUploadZone';
import { FileCard, FileData } from '@/components/ImageCompressor/FileCard';
import { CompressionSettings } from '@/components/ImageCompressor/CompressionSettings';
import { BatchActions } from '@/components/ImageCompressor/BatchActions';

export const ImageCompressor = () => {
  const [files, setFiles] = useState<FileData[]>([]);
  const [compressionQuality, setCompressionQuality] = useState('80');
  const [outputFormat, setOutputFormat] = useState('webp');
  const [isCompressing, setIsCompressing] = useState(false);

  const handleFilesSelect = (newFiles: File[]) => {
    const fileData: FileData[] = newFiles.map(file => ({
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
              // Simulate compression ratio based on quality
              const qualityNum = parseInt(compressionQuality);
              const compressionRatio = (100 - qualityNum) / 100 * 0.7 + 0.3;
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
            return { ...f, progress: f.progress + 10 };
          }
          return f;
        }));
      }, 150);
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
    // Simulate download - in real app would download the compressed file
    console.log('Downloading file:', id);
  };

  const handleDownloadAll = () => {
    const completedFiles = files.filter(f => f.status === 'completed');
    console.log('Downloading all completed files:', completedFiles.length);
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

  const pngFiles = files.filter(f => f.file.type === 'image/png').length;
  const totalFiles = files.length;

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-6 shadow-glow">
            <Shrink className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Multi-File Image Compressor
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
            Compress multiple images at once with intelligent optimization. Special PNG processing for premium quality.
          </p>
          {pngFiles > 0 && (
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full border border-accent/20">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">{pngFiles} PNG files detected - Premium quality compression</span>
            </div>
          )}
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
                <Card className="shadow-custom-md">
                  <CardContent className="p-6">
                    <FileUploadZone 
                      onFilesSelect={handleFilesSelect}
                      disabled={isCompressing}
                    />
                  </CardContent>
                </Card>
              )}

              {/* Files Grid */}
              {files.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Files to Compress</h3>
                    <div className="text-sm text-muted-foreground">
                      {totalFiles} files • {pngFiles > 0 && `${pngFiles} PNG files with premium processing`}
                    </div>
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                    {files.map(file => (
                      <FileCard
                        key={file.id}
                        fileData={file}
                        onRemove={handleRemoveFile}
                        onDownload={handleDownloadFile}
                        compressionQuality={compressionQuality}
                      />
                    ))}
                  </div>

                  {/* Add More Files */}
                  <Card className="shadow-custom-sm border-dashed border-2 border-muted-foreground/20 hover:border-primary/50 transition-smooth">
                    <CardContent className="p-4">
                      <FileUploadZone 
                        onFilesSelect={handleFilesSelect}
                        disabled={isCompressing}
                      />
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>

            {/* Settings Panel */}
            <div className="space-y-6">
              <CompressionSettings
                compressionQuality={compressionQuality}
                setCompressionQuality={setCompressionQuality}
                outputFormat={outputFormat}
                setOutputFormat={setOutputFormat}
              />

              {/* PNG Special Features */}
              <Card className="shadow-custom-sm bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-accent" />
                    PNG Premium Features
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center font-semibold">
                      <Zap className="w-3 h-3" />
                    </div>
                    <div>
                      <h4 className="font-medium text-accent">Lossless Compression</h4>
                      <p className="text-sm text-muted-foreground">
                        Preserve transparency and image quality
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center font-semibold">
                      <Sparkles className="w-3 h-3" />
                    </div>
                    <div>
                      <h4 className="font-medium text-accent">Smart Optimization</h4>
                      <p className="text-sm text-muted-foreground">
                        Advanced algorithms for PNG files
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center font-semibold">
                      <FileImage className="w-3 h-3" />
                    </div>
                    <div>
                      <h4 className="font-medium text-accent">Batch Processing</h4>
                      <p className="text-sm text-muted-foreground">
                        Process multiple PNG files efficiently
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
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      { format: 'PNG', desc: 'Premium quality compression', premium: true },
                      { format: 'JPEG', desc: 'Excellent for photos', premium: false },
                      { format: 'WebP', desc: 'Modern web format', premium: false },
                      { format: 'GIF', desc: 'Animated image support', premium: false },
                    ].map(({ format, desc, premium }) => (
                      <div key={format} className={`flex items-center justify-between p-2 rounded ${
                        premium ? 'bg-accent/10 border border-accent/20' : 'bg-muted/50'
                      }`}>
                        <div className="flex items-center gap-2">
                          <FileImage className={`w-4 h-4 ${premium ? 'text-accent' : 'text-muted-foreground'}`} />
                          <div>
                            <div className={`text-sm font-medium ${premium ? 'text-accent' : ''}`}>
                              {format}
                            </div>
                            <div className="text-xs text-muted-foreground">{desc}</div>
                          </div>
                        </div>
                        {premium && (
                          <Sparkles className="w-4 h-4 text-accent" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* PNG Compressor Button */}
              <Card className="shadow-custom-sm bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <div className="w-12 h-12 mx-auto bg-accent/20 rounded-full flex items-center justify-center">
                      <FileImage className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-accent mb-2">Need PNG-Only Compression?</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Use our specialized PNG compressor for lossless compression with transparency preservation.
                      </p>
                      <Button asChild className="bg-accent hover:bg-accent/90 w-full">
                        <Link to="/tools/png-compressor" className="flex items-center justify-center gap-2">
                          <Sparkles className="w-4 h-4" />
                          PNG Compressor
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
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