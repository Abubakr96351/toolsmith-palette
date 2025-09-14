import { Play, Download, Trash2, RotateCcw, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileData } from './FileCard';

interface BatchActionsProps {
  files: FileData[];
  onCompressAll: () => void;
  onDownloadAll: () => void;
  onClearAll: () => void;
  onReset: () => void;
  isCompressing: boolean;
}

export const BatchActions = ({
  files,
  onCompressAll,
  onDownloadAll,
  onClearAll,
  onReset,
  isCompressing
}: BatchActionsProps) => {
  const pendingFiles = files.filter(f => f.status === 'pending').length;
  const completedFiles = files.filter(f => f.status === 'completed').length;
  const pngFiles = files.filter(f => f.file.type === 'image/png').length;
  
  const totalOriginalSize = files.reduce((sum, file) => sum + file.originalSize, 0);
  const totalCompressedSize = files
    .filter(f => f.compressedSize)
    .reduce((sum, file) => sum + (file.compressedSize || 0), 0);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getTotalSavings = () => {
    if (totalOriginalSize === 0 || totalCompressedSize === 0) return 0;
    return Math.round(((totalOriginalSize - totalCompressedSize) / totalOriginalSize) * 100);
  };

  if (files.length === 0) return null;

  return (
    <Card className="shadow-custom-sm bg-gradient-to-r from-primary/5 to-accent/5 border-primary/10">
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Stats */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="bg-background/50">
                {files.length} files
              </Badge>
              {pngFiles > 0 && (
                <Badge variant="secondary" className="bg-accent/20 text-accent border-accent/30">
                  <Sparkles className="w-3 h-3 mr-1" />
                  {pngFiles} PNG
                </Badge>
              )}
              {completedFiles > 0 && (
                <Badge variant="secondary" className="bg-accent/10 text-accent">
                  {getTotalSavings()}% saved
                </Badge>
              )}
            </div>
            
            {completedFiles > 0 && (
              <div className="text-sm text-muted-foreground">
                {formatFileSize(totalOriginalSize)} → {formatFileSize(totalCompressedSize)}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 flex-wrap">
            {pendingFiles > 0 && (
              <Button 
                onClick={onCompressAll}
                disabled={isCompressing}
                className="bg-primary hover:bg-primary/90"
              >
                <Play className="w-4 h-4 mr-2" />
                Compress All ({pendingFiles})
              </Button>
            )}
            
            {completedFiles > 0 && (
              <Button 
                onClick={onDownloadAll}
                variant="secondary"
                className="bg-accent/10 text-accent hover:bg-accent/20"
              >
                <Download className="w-4 h-4 mr-2" />
                Download All ({completedFiles})
              </Button>
            )}
            
            <Button 
              onClick={onReset}
              variant="outline"
              size="sm"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            
            <Button 
              onClick={onClearAll}
              variant="ghost"
              size="sm"
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};