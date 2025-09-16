import { PlayCircle, Download, RotateCcw, Trash2, FileVideo } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { VideoData } from './VideoCard';

interface VideoBatchActionsProps {
  videos: VideoData[];
  onConvertAll: () => void;
  onDownloadAll: () => void;
  onClearAll: () => void;
  onReset: () => void;
  isConverting: boolean;
}

export const VideoBatchActions = ({
  videos,
  onConvertAll,
  onDownloadAll,
  onClearAll,
  onReset,
  isConverting
}: VideoBatchActionsProps) => {
  const pendingCount = videos.filter(v => v.status === 'pending').length;
  const completedCount = videos.filter(v => v.status === 'completed').length;
  const convertingCount = videos.filter(v => v.status === 'converting').length;

  if (videos.length === 0) return null;

  return (
    <Card className="shadow-custom-sm bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-4">
          {/* Stats */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <FileVideo className="w-5 h-5 text-primary" />
              <span className="font-semibold">{videos.length} Videos</span>
            </div>
            <div className="flex items-center gap-2">
              {pendingCount > 0 && (
                <Badge variant="outline" className="text-xs">
                  {pendingCount} Pending
                </Badge>
              )}
              {convertingCount > 0 && (
                <Badge className="text-xs bg-primary text-primary-foreground">
                  {convertingCount} Converting
                </Badge>
              )}
              {completedCount > 0 && (
                <Badge className="text-xs bg-accent text-accent-foreground">
                  {completedCount} Completed
                </Badge>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {pendingCount > 0 && (
              <Button
                onClick={onConvertAll}
                disabled={isConverting}
                className="gap-2"
              >
                <PlayCircle className="w-4 h-4" />
                Convert All ({pendingCount})
              </Button>
            )}
            
            {completedCount > 0 && (
              <Button
                onClick={onDownloadAll}
                variant="outline"
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                Download All ({completedCount})
              </Button>
            )}

            {completedCount > 0 && (
              <Button
                onClick={onReset}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </Button>
            )}

            <Button
              onClick={onClearAll}
              variant="ghost"
              size="sm"
              className="gap-2 text-destructive hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};