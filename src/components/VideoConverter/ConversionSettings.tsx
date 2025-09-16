import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Settings, Video, Zap } from 'lucide-react';

interface ConversionSettingsProps {
  outputFormat: string;
  setOutputFormat: (format: string) => void;
  quality: string;
  setQuality: (quality: string) => void;
  resolution: string;
  setResolution: (resolution: string) => void;
}

export const ConversionSettings = ({
  outputFormat,
  setOutputFormat,
  quality,
  setQuality,
  resolution,
  setResolution
}: ConversionSettingsProps) => {
  const qualityValue = parseInt(quality);

  return (
    <Card className="shadow-custom-sm">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Conversion Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Output Format */}
        <div className="space-y-2">
          <Label htmlFor="output-format" className="text-sm font-medium">
            Output Format
          </Label>
          <Select value={outputFormat} onValueChange={setOutputFormat}>
            <SelectTrigger>
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mp4">
                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4" />
                  MP4 (H.264)
                </div>
              </SelectItem>
              <SelectItem value="webm">
                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4" />
                  WebM (VP9)
                </div>
              </SelectItem>
              <SelectItem value="avi">
                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4" />
                  AVI
                </div>
              </SelectItem>
              <SelectItem value="mov">
                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4" />
                  MOV
                </div>
              </SelectItem>
              <SelectItem value="mkv">
                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4" />
                  MKV
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Resolution */}
        <div className="space-y-2">
          <Label htmlFor="resolution" className="text-sm font-medium">
            Resolution
          </Label>
          <Select value={resolution} onValueChange={setResolution}>
            <SelectTrigger>
              <SelectValue placeholder="Select resolution" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="original">Original</SelectItem>
              <SelectItem value="1080p">1080p (1920x1080)</SelectItem>
              <SelectItem value="720p">720p (1280x720)</SelectItem>
              <SelectItem value="480p">480p (854x480)</SelectItem>
              <SelectItem value="360p">360p (640x360)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Quality */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="quality" className="text-sm font-medium">
              Quality
            </Label>
            <div className="flex items-center gap-1">
              <Zap className="w-3 h-3 text-primary" />
              <span className="text-sm font-medium">{quality}%</span>
            </div>
          </div>
          <Slider
            value={[qualityValue]}
            onValueChange={(value) => setQuality(value[0].toString())}
            max={100}
            min={10}
            step={10}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Low Quality</span>
            <span>High Quality</span>
          </div>
        </div>

        {/* Quality Info */}
        <div className="bg-muted/50 rounded-lg p-3">
          <div className="text-sm">
            <div className="font-medium mb-1">Quality Settings:</div>
            <div className="text-muted-foreground space-y-1">
              {qualityValue >= 80 && <div>• High quality, larger file size</div>}
              {qualityValue >= 50 && qualityValue < 80 && <div>• Balanced quality and size</div>}
              {qualityValue < 50 && <div>• Smaller size, lower quality</div>}
              <div>• Output: {outputFormat.toUpperCase()} format</div>
              <div>• Resolution: {resolution === 'original' ? 'Keep original' : resolution}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};