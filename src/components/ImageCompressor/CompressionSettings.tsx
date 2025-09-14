import { Settings2, Zap, Shield, Cpu } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

interface CompressionSettingsProps {
  compressionQuality: string;
  setCompressionQuality: (value: string) => void;
  outputFormat: string;
  setOutputFormat: (value: string) => void;
}

export const CompressionSettings = ({
  compressionQuality,
  setCompressionQuality,
  outputFormat,
  setOutputFormat
}: CompressionSettingsProps) => {
  const qualityOptions = [
    { value: '90', label: 'High Quality (90%)', icon: Shield, desc: 'Best quality, larger files' },
    { value: '80', label: 'Balanced (80%)', icon: Cpu, desc: 'Good balance of quality & size' },
    { value: '70', label: 'Medium (70%)', icon: Zap, desc: 'Good compression, decent quality' },
    { value: '60', label: 'High Compression (60%)', icon: Zap, desc: 'Smaller files, lower quality' },
    { value: '50', label: 'Maximum (50%)', icon: Zap, desc: 'Smallest files, basic quality' },
  ];

  const formatOptions = [
    { value: 'jpeg', label: 'JPEG', desc: 'Best for photos, smaller files' },
    { value: 'webp', label: 'WebP', desc: 'Modern format, excellent compression', badge: 'Recommended' },
    { value: 'png', label: 'PNG', desc: 'Lossless, preserves transparency', badge: 'Premium' },
  ];

  const getQualityOption = (value: string) => {
    return qualityOptions.find(option => option.value === value);
  };

  const getFormatOption = (value: string) => {
    return formatOptions.find(option => option.value === value);
  };

  return (
    <Card className="shadow-custom-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Settings2 className="w-5 h-5" />
          Compression Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label htmlFor="quality">Quality Level</Label>
          <Select value={compressionQuality} onValueChange={setCompressionQuality}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {qualityOptions.map(option => {
                const Icon = option.icon;
                return (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{option.label}</div>
                        <div className="text-xs text-muted-foreground">{option.desc}</div>
                      </div>
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          {getQualityOption(compressionQuality) && (
            <div className="text-xs text-muted-foreground bg-muted rounded p-2">
              {getQualityOption(compressionQuality)?.desc}
            </div>
          )}
        </div>

        <div className="space-y-3">
          <Label htmlFor="format">Output Format</Label>
          <Select value={outputFormat} onValueChange={setOutputFormat}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {formatOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  <div className="flex items-center justify-between w-full">
                    <div>
                      <div className="font-medium">{option.label}</div>
                      <div className="text-xs text-muted-foreground">{option.desc}</div>
                    </div>
                    {option.badge && (
                      <Badge 
                        variant="secondary" 
                        className={option.value === 'png' ? 'bg-accent/20 text-accent ml-2' : 'ml-2'}
                      >
                        {option.badge}
                      </Badge>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {getFormatOption(outputFormat) && (
            <div className="text-xs text-muted-foreground bg-muted rounded p-2">
              {getFormatOption(outputFormat)?.desc}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};