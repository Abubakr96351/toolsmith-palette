import { useState } from 'react';
import { Upload, Download, Settings, ArrowRight, CheckCircle } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export const ImageConverter = () => {
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);

  const supportedFormats = ['JPG', 'PNG', 'WEBP', 'SVG', 'GIF', 'BMP', 'TIFF'];

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
    // Simulate upload process
    setUploading(true);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          setCompleted(true);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleFileSelect = () => {
    // Simulate file selection and upload
    setUploading(true);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          setCompleted(true);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
          <a href="/" className="hover:text-primary transition-smooth">Home</a>
          <ArrowRight className="h-4 w-4" />
          <a href="/tools" className="hover:text-primary transition-smooth">Tools</a>
          <ArrowRight className="h-4 w-4" />
          <span className="text-foreground">Image Converter</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Image Format Converter
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Convert your images between popular formats like JPG, PNG, WEBP, and more. 
            High quality conversion with no file size limits.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Upload Area */}
          <div className="lg:col-span-2">
            <Card className="border-border">
              <CardContent className="p-8">
                {!uploading && !completed && (
                  <div
                    className={`border-2 border-dashed rounded-xl p-12 text-center transition-smooth ${
                      dragOver 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <Upload className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Drag & Drop Your Images
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Or click to browse and select your files
                    </p>
                    <Button onClick={handleFileSelect} className="gradient-primary">
                      Select Files
                    </Button>
                    <p className="text-sm text-muted-foreground mt-4">
                      Supports: {supportedFormats.join(', ')}
                    </p>
                  </div>
                )}

                {uploading && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                      <Upload className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      Converting Your Images
                    </h3>
                    <div className="max-w-md mx-auto mb-4">
                      <Progress value={progress} className="h-2" />
                    </div>
                    <p className="text-muted-foreground">
                      {progress}% Complete - Please wait...
                    </p>
                  </div>
                )}

                {completed && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      Conversion Complete!
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Your images have been successfully converted
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button className="gradient-primary">
                        <Download className="mr-2 h-4 w-4" />
                        Download All
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setCompleted(false);
                          setProgress(0);
                        }}
                      >
                        Convert More
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Settings */}
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Settings className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Conversion Settings</h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Output Format
                    </label>
                    <select className="w-full p-2 border border-border rounded-md bg-background text-foreground">
                      <option>PNG</option>
                      <option>JPG</option>
                      <option>WEBP</option>
                      <option>SVG</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Quality (JPG/WEBP)
                    </label>
                    <select className="w-full p-2 border border-border rounded-md bg-background text-foreground">
                      <option>High (90%)</option>
                      <option>Medium (75%)</option>
                      <option>Low (60%)</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card className="border-border">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-4">Features</h3>
                <div className="space-y-3">
                  {[
                    'Batch conversion',
                    'High quality output',
                    'No file size limits',
                    'Privacy protected',
                    'Fast processing',
                    'Multiple formats'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-accent" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* How it Works */}
        <section className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground">
              Simple 3-step process to convert your images
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Upload Images',
                description: 'Drag and drop or select your image files from your device'
              },
              {
                step: '2',
                title: 'Choose Format',
                description: 'Select your desired output format and quality settings'
              },
              {
                step: '3',
                title: 'Download',
                description: 'Download your converted images instantly'
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">{item.step}</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};