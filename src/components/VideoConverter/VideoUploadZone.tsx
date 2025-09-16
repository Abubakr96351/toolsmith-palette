import { useState } from 'react';
import { Upload, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VideoUploadZoneProps {
  onFilesSelect: (files: File[]) => void;
  disabled?: boolean;
}

export const VideoUploadZone = ({ onFilesSelect, disabled }: VideoUploadZoneProps) => {
  const [dragOver, setDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (disabled) return;
    
    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('video/')
    );
    if (files.length > 0) {
      onFilesSelect(files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFilesSelect(Array.from(files));
    }
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 text-center transition-smooth ${
        dragOver
          ? 'border-primary bg-primary/5'
          : 'border-border hover:border-primary/50 hover:bg-primary/5'
      } ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="w-16 h-16 mx-auto mb-4 bg-secondary rounded-full flex items-center justify-center">
        <Video className="w-8 h-8 text-secondary-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2">Drop your videos here</h3>
      <p className="text-muted-foreground mb-4">
        Or click to browse (Multiple files supported: MP4, AVI, MOV, MKV, WebM)
      </p>
      <input
        type="file"
        accept="video/*"
        multiple
        onChange={handleFileSelect}
        className="hidden"
        id="video-upload"
        disabled={disabled}
      />
      <Button asChild variant="default">
        <label htmlFor="video-upload" className="cursor-pointer">
          <Upload className="w-4 h-4 mr-2" />
          Choose Videos
        </label>
      </Button>
    </div>
  );
};