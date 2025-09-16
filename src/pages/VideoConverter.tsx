import { useState } from 'react';
import { Video, FileVideo, Zap, Settings, Monitor, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { VideoUploadZone } from '@/components/VideoConverter/VideoUploadZone';
import { VideoCard, VideoData } from '@/components/VideoConverter/VideoCard';
import { ConversionSettings } from '@/components/VideoConverter/ConversionSettings';
import { VideoBatchActions } from '@/components/VideoConverter/VideoBatchActions';

export const VideoConverter = () => {
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [outputFormat, setOutputFormat] = useState('mp4');
  const [quality, setQuality] = useState('80');
  const [resolution, setResolution] = useState('original');
  const [isConverting, setIsConverting] = useState(false);

  const handleFilesSelect = (newFiles: File[]) => {
    const videoData: VideoData[] = newFiles.map(file => ({
      id: `${file.name}-${Date.now()}-${Math.random()}`,
      file,
      originalSize: file.size,
      progress: 0,
      status: 'pending',
      duration: '00:00', // Simulated duration
      resolution: '1920x1080', // Simulated resolution
      outputFormat
    }));
    setVideos(prev => [...prev, ...videoData]);
  };

  const convertVideo = async (videoData: VideoData) => {
    return new Promise<void>((resolve) => {
      setVideos(prev => prev.map(v => 
        v.id === videoData.id 
          ? { ...v, status: 'converting', progress: 0 }
          : v
      ));

      const interval = setInterval(() => {
        setVideos(prev => prev.map(v => {
          if (v.id === videoData.id) {
            if (v.progress >= 100) {
              clearInterval(interval);
              // Simulate conversion based on quality and format
              const qualityNum = parseInt(quality);
              const formatMultiplier = outputFormat === 'webm' ? 0.8 : outputFormat === 'mp4' ? 0.9 : 1.0;
              const qualityMultiplier = qualityNum / 100;
              const convertedSize = Math.round(v.originalSize * formatMultiplier * qualityMultiplier);
              
              resolve();
              return {
                ...v,
                status: 'completed',
                progress: 100,
                convertedSize,
                outputFormat
              };
            }
            return { ...v, progress: v.progress + 8 };
          }
          return v;
        }));
      }, 200);
    });
  };

  const handleConvertAll = async () => {
    setIsConverting(true);
    const pendingVideos = videos.filter(v => v.status === 'pending');
    
    for (const video of pendingVideos) {
      await convertVideo(video);
    }
    
    setIsConverting(false);
  };

  const handleRemoveVideo = (id: string) => {
    setVideos(prev => prev.filter(v => v.id !== id));
  };

  const handleDownloadVideo = (id: string) => {
    console.log('Downloading video:', id);
  };

  const handleDownloadAll = () => {
    const completedVideos = videos.filter(v => v.status === 'completed');
    console.log('Downloading all completed videos:', completedVideos.length);
  };

  const handleClearAll = () => {
    setVideos([]);
  };

  const handleReset = () => {
    setVideos(prev => prev.map(v => ({ 
      ...v, 
      status: 'pending', 
      progress: 0, 
      convertedSize: undefined 
    })));
  };

  const totalVideos = videos.length;
  const mp4Videos = videos.filter(v => v.file.type === 'video/mp4').length;
  const largeVideos = videos.filter(v => v.file.size > 100 * 1024 * 1024).length; // >100MB

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-6 shadow-glow">
            <Video className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Multi-File Video Converter
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
            Convert multiple video files to different formats with customizable quality and resolution settings.
          </p>
          {totalVideos > 0 && (
            <div className="flex items-center justify-center gap-4 flex-wrap">
              {mp4Videos > 0 && (
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20">
                  <FileVideo className="w-4 h-4" />
                  <span className="text-sm font-medium">{mp4Videos} MP4 files</span>
                </div>
              )}
              {largeVideos > 0 && (
                <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-3 py-1 rounded-full border border-accent/20">
                  <Zap className="w-4 h-4" />
                  <span className="text-sm font-medium">{largeVideos} Large files (&gt;100MB)</span>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Batch Actions */}
          <VideoBatchActions
            videos={videos}
            onConvertAll={handleConvertAll}
            onDownloadAll={handleDownloadAll}
            onClearAll={handleClearAll}
            onReset={handleReset}
            isConverting={isConverting}
          />

          <div className="grid lg:grid-cols-4 gap-8 mt-8">
            {/* Upload & Videos Section */}
            <div className="lg:col-span-3 space-y-6">
              {/* Upload Zone */}
              {videos.length === 0 && (
                <Card className="shadow-custom-md">
                  <CardContent className="p-6">
                    <VideoUploadZone 
                      onFilesSelect={handleFilesSelect}
                      disabled={isConverting}
                    />
                  </CardContent>
                </Card>
              )}

              {/* Videos Grid */}
              {videos.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Videos to Convert</h3>
                    <div className="text-sm text-muted-foreground">
                      {totalVideos} files • Converting to {outputFormat.toUpperCase()}
                    </div>
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
                    {videos.map(video => (
                      <VideoCard
                        key={video.id}
                        videoData={video}
                        onRemove={handleRemoveVideo}
                        onDownload={handleDownloadVideo}
                        outputFormat={outputFormat}
                      />
                    ))}
                  </div>

                  {/* Add More Videos */}
                  <Card className="shadow-custom-sm border-dashed border-2 border-muted-foreground/20 hover:border-primary/50 transition-smooth">
                    <CardContent className="p-4">
                      <VideoUploadZone 
                        onFilesSelect={handleFilesSelect}
                        disabled={isConverting}
                      />
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>

            {/* Settings Panel */}
            <div className="space-y-6">
              <ConversionSettings
                outputFormat={outputFormat}
                setOutputFormat={setOutputFormat}
                quality={quality}
                setQuality={setQuality}
                resolution={resolution}
                setResolution={setResolution}
              />

              {/* Video Features */}
              <Card className="shadow-custom-sm bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Zap className="w-5 h-5 text-primary" />
                    Video Features
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-semibold">
                      <Video className="w-3 h-3" />
                    </div>
                    <div>
                      <h4 className="font-medium text-primary">Format Conversion</h4>
                      <p className="text-sm text-muted-foreground">
                        Convert between MP4, WebM, AVI, MOV, MKV
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-semibold">
                      <Monitor className="w-3 h-3" />
                    </div>
                    <div>
                      <h4 className="font-medium text-primary">Resolution Control</h4>
                      <p className="text-sm text-muted-foreground">
                        Resize videos from 360p to 1080p
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-semibold">
                      <Settings className="w-3 h-3" />
                    </div>
                    <div>
                      <h4 className="font-medium text-primary">Quality Settings</h4>
                      <p className="text-sm text-muted-foreground">
                        Adjust compression for size optimization
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
                      { format: 'MP4', desc: 'Universal compatibility', popular: true },
                      { format: 'WebM', desc: 'Web optimized format', popular: false },
                      { format: 'AVI', desc: 'Legacy Windows format', popular: false },
                      { format: 'MOV', desc: 'Apple QuickTime format', popular: false },
                      { format: 'MKV', desc: 'Matroska container', popular: false },
                    ].map(({ format, desc, popular }) => (
                      <div key={format} className={`flex items-center justify-between p-2 rounded ${
                        popular ? 'bg-primary/10 border border-primary/20' : 'bg-muted/50'
                      }`}>
                        <div className="flex items-center gap-2">
                          <FileVideo className={`w-4 h-4 ${popular ? 'text-primary' : 'text-muted-foreground'}`} />
                          <div>
                            <div className={`text-sm font-medium ${popular ? 'text-primary' : ''}`}>
                              {format}
                            </div>
                            <div className="text-xs text-muted-foreground">{desc}</div>
                          </div>
                        </div>
                        {popular && (
                          <Zap className="w-4 h-4 text-primary" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Image Converter Link */}
              <Card className="shadow-custom-sm bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <div className="w-12 h-12 mx-auto bg-accent/20 rounded-full flex items-center justify-center">
                      <FileVideo className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-accent mb-2">Need Image Conversion?</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Convert and compress images with our specialized image tools.
                      </p>
                      <Button asChild className="bg-accent hover:bg-accent/90 w-full">
                        <Link to="/tools/image-converter" className="flex items-center justify-center gap-2">
                          <Video className="w-4 h-4" />
                          Image Converter
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