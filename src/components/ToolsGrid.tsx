import { 
  Image, 
  Video, 
  Scissors, 
  Eraser, 
  Maximize2, 
  FileImage, 
  Download, 
  Crop,
  Palette,
  FileVideo,
  Music,
  FileText
} from 'lucide-react';
import { ToolCard } from './ToolCard';

export const ToolsGrid = () => {
  const tools = [
    {
      title: 'Image Converter',
      description: 'Convert images between popular formats like JPG, PNG, WEBP, SVG, and more with high quality output.',
      icon: Image,
      category: 'Image',
      features: ['Batch conversion', 'Quality control', '20+ formats'],
      href: '/tools/image-converter'
    },
    {
      title: 'Video Converter',
      description: 'Transform video files between MP4, AVI, MOV, WEBM and other formats while maintaining excellent quality.',
      icon: Video,
      category: 'Video',
      features: ['HD quality', 'Fast processing', 'Multiple formats'],
      href: '/tools/video-converter'
    },
    {
      title: 'Image Compressor',
      description: 'Reduce image file sizes without losing quality using advanced compression algorithms.',
      icon: Download,
      category: 'Image',
      features: ['Lossless & lossy', 'Up to 80% reduction', 'Bulk compression'],
      href: '/tools/image-compressor'
    },
    {
      title: 'Background Remover',
      description: 'Remove backgrounds from images automatically using AI-powered technology.',
      icon: Eraser,
      category: 'Image',
      features: ['AI-powered', 'Instant results', 'High precision'],
      href: '/tools/background-remover'
    },
    {
      title: 'Image Resizer',
      description: 'Resize images and change aspect ratios while maintaining quality and proportions.',
      icon: Maximize2,
      category: 'Image',
      features: ['Custom dimensions', 'Aspect ratio lock', 'Batch resize'],
      href: '/tools/image-resizer'
    },
    {
      title: 'Image Cropper',
      description: 'Crop images to specific dimensions or aspect ratios with precision controls.',
      icon: Crop,
      category: 'Image',
      features: ['Precise cropping', 'Preset ratios', 'Custom selection'],
      href: '/tools/image-cropper'
    },
    {
      title: 'Color Picker',
      description: 'Extract colors from images and get hex, RGB, HSL values instantly.',
      icon: Palette,
      category: 'Image',
      features: ['Multiple formats', 'Color history', 'Palette export'],
      href: '/tools/color-picker'
    },
    {
      title: 'Audio Converter',
      description: 'Convert audio files between MP3, WAV, FLAC, AAC and other popular formats.',
      icon: Music,
      category: 'Audio',
      features: ['High fidelity', 'Bitrate control', 'Metadata preservation'],
      href: '/tools/audio-converter'
    },
    {
      title: 'PDF Tools',
      description: 'Merge, split, compress and convert PDF files with professional results.',
      icon: FileText,
      category: 'Document',
      features: ['Merge & split', 'Compression', 'Format conversion'],
      href: '/tools/pdf-tools'
    }
  ];

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Professional Tools for Every Need
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Powerful file conversion and editing tools designed for creators, 
            professionals, and everyone in between.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <ToolCard
              key={index}
              title={tool.title}
              description={tool.description}
              icon={tool.icon}
              category={tool.category}
              features={tool.features}
              href={tool.href}
            />
          ))}
        </div>

        {/* View All Tools CTA */}
        <div className="text-center mt-12">
          <a
            href="/tools"
            className="inline-flex items-center space-x-2 text-primary hover:text-primary-glow transition-smooth font-medium"
          >
            <span>View All Tools</span>
            <span className="text-lg">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};