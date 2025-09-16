import { useState } from 'react';
import { Play, Download, Trash2, FileVideo, Clock, HardDrive } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

export interface VideoData {
  id: string;
  file: File;
  originalSize: number;
  progress: number;
  status: 'pending' | 'converting' | 'completed' | 'error';
  convertedSize?: number;
  duration?: string;
  resolution?: string;
  outputFormat?: string;
  convertedBlob?: Blob;
}

interface VideoCardProps {
  videoData: VideoData;
  onRemove: (id: string) => void;
  onDownload: (id: string) => void;
  outputFormat: string;
}

export const VideoCard = ({ videoData, onRemove, onDownload, outputFormat }: VideoCardProps) => {
  const [showPreview, setShowPreview] = useState(false);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusColor = () => {
    switch (videoData.status) {
      case 'completed': return 'bg-accent text-accent-foreground';
      case 'converting': return 'bg-primary text-primary-foreground';
      case 'error': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getFileExtension = (filename: string) => {
    return filename.split('.').pop()?.toUpperCase() || '';
  };

  return (
    <Card className="shadow-custom-sm hover:shadow-custom-md transition-smooth">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {/* Video Icon */}
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <FileVideo className="w-6 h-6 text-primary" />
          </div>

          {/* Video Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h4 className="font-medium text-sm truncate" title={videoData.file.name}>
                {videoData.file.name}
              </h4>
              <Badge variant="outline" className="text-xs">
                {getFileExtension(videoData.file.name)}
              </Badge>
            </div>
            
            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
              <div className="flex items-center gap-1">
                <HardDrive className="w-3 h-3" />
                {formatFileSize(videoData.originalSize)}
              </div>
              {videoData.duration && (
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {videoData.duration}
                </div>
              )}
              {videoData.resolution && (
                <div className="text-xs">
                  {videoData.resolution}
                </div>
              )}
            </div>

            {/* Status Badge */}
            <div className="flex items-center gap-2 mb-3">
              <Badge className={`text-xs ${getStatusColor()}`}>
                {videoData.status.charAt(0).toUpperCase() + videoData.status.slice(1)}
              </Badge>
              {videoData.status === 'completed' && videoData.convertedSize && (
                <span className="text-xs text-muted-foreground">
                  → {formatFileSize(videoData.convertedSize)}
                </span>
              )}
            </div>

            {/* Progress Bar */}
            {videoData.status === 'converting' && (
              <div className="mb-3">
                <Progress value={videoData.progress} className="h-2" />
                <div className="text-xs text-muted-foreground mt-1">
                  Converting to {outputFormat.toUpperCase()}... {videoData.progress}%
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              {videoData.status === 'completed' ? (
                <Button
                  size="sm"
                  onClick={() => onDownload(videoData.id)}
                  className="h-8 text-xs"
                >
                  <Download className="w-3 h-3 mr-1" />
                  Download
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowPreview(!showPreview)}
                  className="h-8 text-xs"
                >
                  <Play className="w-3 h-3 mr-1" />
                  Preview
                </Button>
              )}
              
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onRemove(videoData.id)}
                className="h-8 text-xs text-destructive hover:text-destructive"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};