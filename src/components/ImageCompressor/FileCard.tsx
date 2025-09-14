import { useState, useEffect } from 'react';
import { X, Download, Shrink, CheckCircle, FileImage, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

export interface FileData {
  id: string;
  file: File;
  originalSize: number;
  compressedSize?: number;
  progress: number;
  status: 'pending' | 'compressing' | 'completed' | 'error';
  compressionRatio?: number;
}

interface FileCardProps {
  fileData: FileData;
  onRemove: (id: string) => void;
  onDownload: (id: string) => void;
  compressionQuality: string;
}

export const FileCard = ({ fileData, onRemove, onDownload, compressionQuality }: FileCardProps) => {
  const [imagePreview, setImagePreview] = useState<string>('');

  useEffect(() => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(fileData.file);
  }, [fileData.file]);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getSavingsPercentage = () => {
    if (!fileData.compressedSize || fileData.originalSize === 0) return 0;
    return Math.round(((fileData.originalSize - fileData.compressedSize) / fileData.originalSize) * 100);
  };

  const isPNG = fileData.file.type === 'image/png';

  return (
    <Card className={`shadow-custom-sm transition-smooth hover:shadow-custom-md ${
      isPNG ? 'ring-2 ring-accent/20 bg-gradient-to-br from-accent/5 to-accent/10' : ''
    }`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {/* Image Preview */}
          <div className="relative">
            <div className={`w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0 ${
              isPNG ? 'ring-2 ring-accent/30' : ''
            }`}>
              {imagePreview ? (
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <FileImage className="w-6 h-6 text-muted-foreground" />
                </div>
              )}
            </div>
            {isPNG && (
              <div className="absolute -top-1 -right-1">
                <Badge variant="secondary" className="bg-accent/20 text-accent border-accent/30 px-1 py-0">
                  <Sparkles className="w-3 h-3 mr-1" />
                  PNG
                </Badge>
              </div>
            )}
          </div>

          {/* File Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="font-medium truncate text-sm">{fileData.file.name}</h4>
                <p className="text-xs text-muted-foreground">
                  {formatFileSize(fileData.originalSize)} • {fileData.file.type.split('/')[1].toUpperCase()}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemove(fileData.id)}
                className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Status Display */}
            {fileData.status === 'pending' && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="w-2 h-2 bg-muted-foreground/50 rounded-full" />
                Ready to compress
              </div>
            )}

            {fileData.status === 'compressing' && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs">
                  <Shrink className="w-3 h-3 text-primary animate-pulse" />
                  <span className="text-primary">Compressing...</span>
                </div>
                <Progress value={fileData.progress} className="h-1" />
              </div>
            )}

            {fileData.status === 'completed' && fileData.compressedSize && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs">
                  <CheckCircle className="w-3 h-3 text-accent" />
                  <span className="text-accent font-medium">Complete!</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">
                    Compressed: {formatFileSize(fileData.compressedSize)}
                  </span>
                  <Badge variant="secondary" className={isPNG ? 'bg-accent/20 text-accent' : ''}>
                    {getSavingsPercentage()}% smaller
                  </Badge>
                </div>
                <Button 
                  size="sm" 
                  onClick={() => onDownload(fileData.id)}
                  className={`w-full h-7 text-xs ${
                    isPNG ? 'bg-accent hover:bg-accent/90' : ''
                  }`}
                >
                  <Download className="w-3 h-3 mr-1" />
                  Download
                </Button>
              </div>
            )}

            {fileData.status === 'error' && (
              <div className="flex items-center gap-2 text-xs text-destructive">
                <div className="w-2 h-2 bg-destructive rounded-full" />
                Compression failed
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};