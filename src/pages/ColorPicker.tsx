import React, { useState, useCallback, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Copy, Palette, Eye, History } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ColorFormats {
  hex: string;
  rgb: string;
  hsl: string;
  hsv: string;
}

export const ColorPicker = () => {
  const [hue, setHue] = useState([200]);
  const [saturation, setSaturation] = useState([50]);
  const [lightness, setLightness] = useState([50]);
  const [colorHistory, setColorHistory] = useState<string[]>([]);
  const { toast } = useToast();

  const hslToHex = (h: number, s: number, l: number): string => {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };

  const hslToRgb = (h: number, s: number, l: number): { r: number; g: number; b: number } => {
    s /= 100;
    l /= 100;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color);
    };
    return { r: f(0), g: f(8), b: f(4) };
  };

  const hslToHsv = (h: number, s: number, l: number): { h: number; s: number; v: number } => {
    s /= 100;
    l /= 100;
    const v = l + s * Math.min(l, 1 - l);
    const sNew = v === 0 ? 0 : 2 * (1 - l / v);
    return {
      h: Math.round(h),
      s: Math.round(sNew * 100),
      v: Math.round(v * 100)
    };
  };

  const getColorFormats = useCallback((): ColorFormats => {
    const h = hue[0];
    const s = saturation[0];
    const l = lightness[0];
    
    const hex = hslToHex(h, s, l);
    const rgb = hslToRgb(h, s, l);
    const hsv = hslToHsv(h, s, l);
    
    return {
      hex,
      rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
      hsl: `hsl(${h}, ${s}%, ${l}%)`,
      hsv: `hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`
    };
  }, [hue, saturation, lightness]);

  const colorFormats = getColorFormats();
  const currentColor = `hsl(${hue[0]}, ${saturation[0]}%, ${lightness[0]}%)`;

  const copyToClipboard = async (text: string, format: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied to clipboard",
        description: `${format} color value copied: ${text}`,
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Unable to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const saveColor = () => {
    const hex = colorFormats.hex;
    if (!colorHistory.includes(hex)) {
      setColorHistory(prev => [hex, ...prev].slice(0, 12));
      toast({
        title: "Color saved",
        description: `Added ${hex} to color history`,
      });
    }
  };

  const loadColor = (hex: string) => {
    // Convert hex to HSL
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const diff = max - min;
    const sum = max + min;
    
    const l = sum / 2;
    let s = 0;
    let h = 0;

    if (diff !== 0) {
      s = l > 0.5 ? diff / (2 - sum) : diff / sum;
      
      switch (max) {
        case r:
          h = ((g - b) / diff + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / diff + 2) / 6;
          break;
        case b:
          h = ((r - g) / diff + 4) / 6;
          break;
      }
    }

    setHue([Math.round(h * 360)]);
    setSaturation([Math.round(s * 100)]);
    setLightness([Math.round(l * 100)]);
  };

  const predefinedColors = [
    '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF',
    '#FFA500', '#800080', '#FFC0CB', '#A52A2A', '#808080', '#000000'
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Color Picker
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Pick, adjust, and get color values in multiple formats. Perfect for designers and developers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Color Picker */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Color Picker
              </CardTitle>
              <CardDescription>
                Adjust the sliders to pick your perfect color
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Color Preview */}
              <div className="relative">
                <div 
                  className="w-full h-32 rounded-lg border-2 border-border shadow-inner"
                  style={{ backgroundColor: currentColor }}
                />
                <div className="absolute top-2 right-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={saveColor}
                    className="bg-background/80 backdrop-blur-sm"
                  >
                    <History className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Hue Slider */}
              <div className="space-y-2">
                <Label>Hue: {hue[0]}°</Label>
                <Slider
                  value={hue}
                  onValueChange={setHue}
                  max={360}
                  step={1}
                  className="w-full"
                  style={{
                    background: `linear-gradient(to right, 
                      hsl(0, ${saturation[0]}%, ${lightness[0]}%), 
                      hsl(60, ${saturation[0]}%, ${lightness[0]}%), 
                      hsl(120, ${saturation[0]}%, ${lightness[0]}%), 
                      hsl(180, ${saturation[0]}%, ${lightness[0]}%), 
                      hsl(240, ${saturation[0]}%, ${lightness[0]}%), 
                      hsl(300, ${saturation[0]}%, ${lightness[0]}%), 
                      hsl(360, ${saturation[0]}%, ${lightness[0]}%))`
                  }}
                />
              </div>

              {/* Saturation Slider */}
              <div className="space-y-2">
                <Label>Saturation: {saturation[0]}%</Label>
                <Slider
                  value={saturation}
                  onValueChange={setSaturation}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Lightness Slider */}
              <div className="space-y-2">
                <Label>Lightness: {lightness[0]}%</Label>
                <Slider
                  value={lightness}
                  onValueChange={setLightness}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Predefined Colors */}
              <div className="space-y-2">
                <Label>Quick Colors</Label>
                <div className="grid grid-cols-6 gap-2">
                  {predefinedColors.map((color) => (
                    <button
                      key={color}
                      className="w-8 h-8 rounded border-2 border-border hover:scale-110 transition-transform"
                      style={{ backgroundColor: color }}
                      onClick={() => loadColor(color)}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Color Values */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Color Values
              </CardTitle>
              <CardDescription>
                Copy color values in different formats
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* HEX */}
              <div className="space-y-2">
                <Label>HEX</Label>
                <div className="flex gap-2">
                  <Input value={colorFormats.hex} readOnly />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(colorFormats.hex, 'HEX')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* RGB */}
              <div className="space-y-2">
                <Label>RGB</Label>
                <div className="flex gap-2">
                  <Input value={colorFormats.rgb} readOnly />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(colorFormats.rgb, 'RGB')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* HSL */}
              <div className="space-y-2">
                <Label>HSL</Label>
                <div className="flex gap-2">
                  <Input value={colorFormats.hsl} readOnly />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(colorFormats.hsl, 'HSL')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* HSV */}
              <div className="space-y-2">
                <Label>HSV</Label>
                <div className="flex gap-2">
                  <Input value={colorFormats.hsv} readOnly />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(colorFormats.hsv, 'HSV')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Color History */}
              {colorHistory.length > 0 && (
                <div className="space-y-2">
                  <Label>Color History</Label>
                  <div className="grid grid-cols-6 gap-2">
                    {colorHistory.map((color, index) => (
                      <button
                        key={index}
                        className="w-8 h-8 rounded border-2 border-border hover:scale-110 transition-transform"
                        style={{ backgroundColor: color }}
                        onClick={() => loadColor(color)}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* How It Works */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>How to Use the Color Picker</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-foreground font-bold">1</span>
                </div>
                <h3 className="font-semibold mb-2">Adjust Sliders</h3>
                <p className="text-muted-foreground">
                  Use the hue, saturation, and lightness sliders to create your perfect color.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-foreground font-bold">2</span>
                </div>
                <h3 className="font-semibold mb-2">Copy Values</h3>
                <p className="text-muted-foreground">
                  Get your color in HEX, RGB, HSL, or HSV format and copy to clipboard.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-foreground font-bold">3</span>
                </div>
                <h3 className="font-semibold mb-2">Save & Reuse</h3>
                <p className="text-muted-foreground">
                  Save colors to your history and easily access them later.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};