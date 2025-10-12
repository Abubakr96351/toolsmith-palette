import { Header } from '@/components/Header';
import { ToolsGrid } from '@/components/ToolsGrid';
import { Footer } from '@/components/Footer';

const Tools = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              All Tools
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive suite of professional tools for image, video, audio, and document processing
            </p>
          </div>
        </div>
        <ToolsGrid showViewAllButton={false} />
      </main>
      <Footer />
    </div>
  );
};

export default Tools;
