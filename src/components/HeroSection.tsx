import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-illustration.jpg';

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-hero opacity-50"></div>
      
      <div className="relative container mx-auto px-4 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                <span className="text-gradient">All-in-One</span>
                <br />
                <span className="text-foreground">File & Media Tools</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                Convert, compress, and edit your files with professional-grade tools. 
                Fast, secure, and completely free to use.
              </p>
            </div>

            {/* Features list */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 gradient-primary rounded-full"></div>
                <span className="text-muted-foreground">No file size limits</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 gradient-accent rounded-full"></div>
                <span className="text-muted-foreground">Privacy focused</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 gradient-primary rounded-full"></div>
                <span className="text-muted-foreground">Lightning fast</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 gradient-accent rounded-full"></div>
                <span className="text-muted-foreground">Always free</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="gradient-primary hover:shadow-glow transition-smooth group">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-smooth" />
              </Button>
              <Button variant="outline" size="lg" className="border-border hover:border-primary transition-smooth">
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">2M+</div>
                <div className="text-sm text-muted-foreground">Files Processed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">15+</div>
                <div className="text-sm text-muted-foreground">Tools Available</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-custom-lg">
              <img
                src={heroImage}
                alt="File conversion tools illustration"
                className="w-full h-auto object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20"></div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 gradient-accent rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-8 -left-4 w-16 h-16 gradient-primary rounded-full opacity-30 animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>
    </section>
  );
};