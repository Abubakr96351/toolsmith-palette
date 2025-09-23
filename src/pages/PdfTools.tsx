import { 
  FileText, 
  Merge, 
  Split, 
  Download, 
  RefreshCw,
  Lock,
  Unlock,
  Edit3,
  Eye
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ToolCard } from '@/components/ToolCard';

export const PdfTools = () => {
  const pdfTools = [
    {
      title: 'Merge PDF',
      description: 'Combine multiple PDF files into a single document with customizable page order.',
      icon: Merge,
      category: 'PDF',
      features: ['Drag & drop order', 'Page range selection', 'Bookmark preservation'],
      href: '/tools/pdf-merge'
    },
    {
      title: 'Split PDF',
      description: 'Extract specific pages or split PDF into multiple documents.',
      icon: Split,
      category: 'PDF',
      features: ['Page range split', 'Single page extract', 'Bulk extraction'],
      href: '/tools/pdf-split'
    },
    {
      title: 'Compress PDF',
      description: 'Reduce PDF file size while maintaining quality and readability.',
      icon: Download,
      category: 'PDF',
      features: ['Smart compression', 'Quality control', 'Up to 70% reduction'],
      href: '/tools/pdf-compress'
    },
    {
      title: 'PDF Converter',
      description: 'Convert PDF to Word, Excel, PowerPoint, JPG, PNG and other formats.',
      icon: RefreshCw,
      category: 'PDF',
      features: ['Multiple formats', 'Layout preservation', 'Batch conversion'],
      href: '/tools/pdf-converter'
    },
    {
      title: 'Protect PDF',
      description: 'Add password protection and encryption to secure your PDF documents.',
      icon: Lock,
      category: 'PDF',
      features: ['Password protection', 'Encryption', 'Permission control'],
      href: '/tools/pdf-protect'
    },
    {
      title: 'Unlock PDF',
      description: 'Remove password protection from PDF files you own.',
      icon: Unlock,
      category: 'PDF',
      features: ['Password removal', 'Restriction removal', 'Secure processing'],
      href: '/tools/pdf-unlock'
    },
    {
      title: 'Edit PDF',
      description: 'Add text, images, signatures and annotations to PDF documents.',
      icon: Edit3,
      category: 'PDF',
      features: ['Text editing', 'Image insertion', 'Digital signatures'],
      href: '/tools/pdf-edit'
    },
    {
      title: 'PDF Viewer',
      description: 'View and navigate PDF documents with zoom, search and annotation tools.',
      icon: Eye,
      category: 'PDF',
      features: ['Zoom controls', 'Text search', 'Annotation tools'],
      href: '/tools/pdf-viewer'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-6">
              <FileText className="w-8 h-8" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Professional PDF Tools
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Complete PDF toolkit for merging, splitting, compressing, converting, 
              and editing your documents with professional results.
            </p>
          </div>
        </section>

        {/* Tools Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {pdfTools.map((tool, index) => (
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
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Why Choose Our PDF Tools?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Professional-grade PDF processing with security, speed, and reliability
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mb-4">
                  <Lock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Secure Processing</h3>
                <p className="text-muted-foreground">
                  All files processed securely in your browser. No uploads to external servers.
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mb-4">
                  <RefreshCw className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Fast & Reliable</h3>
                <p className="text-muted-foreground">
                  Lightning-fast processing with professional-quality results every time.
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mb-4">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Format Preservation</h3>
                <p className="text-muted-foreground">
                  Maintain document formatting, fonts, and layout integrity.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};