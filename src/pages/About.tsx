import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Users, Target, Zap, Shield } from 'lucide-react';

export const About = () => {
  const values = [
    {
      icon: Users,
      title: 'User-Focused',
      description: 'We build tools that solve real problems for creators and professionals worldwide.'
    },
    {
      icon: Target,
      title: 'Quality First',
      description: 'Every tool is crafted with precision to deliver the best results possible.'
    },
    {
      icon: Zap,
      title: 'Speed & Efficiency',
      description: 'Fast processing without compromising quality or security.'
    },
    {
      icon: Shield,
      title: 'Privacy Protected',
      description: 'Your files are processed locally in your browser. We never store your data.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-muted/30 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                About FileTools Pro
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We're on a mission to provide professional-grade file conversion and editing tools 
                that are accessible to everyone. Our suite of online tools helps creators, designers, 
                and professionals work more efficiently.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
                Our Mission
              </h2>
              <p className="text-muted-foreground leading-relaxed text-center mb-12">
                At FileTools Pro, we believe powerful file conversion tools shouldn't require expensive 
                software or complicated installations. That's why we've created a comprehensive suite 
                of browser-based tools that work instantly, securely, and completely free.
              </p>

              {/* Values Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                {values.map((value) => {
                  const Icon = value.icon;
                  return (
                    <div 
                      key={value.title}
                      className="p-6 rounded-lg border border-border bg-card hover:shadow-lg transition-smooth"
                    >
                      <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {value.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  FileTools Pro was born from a simple observation: people needed quick, reliable 
                  file conversion tools without the hassle of downloads, installations, or subscriptions.
                </p>
                <p>
                  We started with a handful of essential tools and have grown into a comprehensive 
                  platform serving thousands of users daily. Each tool is designed with care, focusing 
                  on speed, quality, and user privacy.
                </p>
                <p>
                  Today, we continue to expand our toolkit based on user feedback and emerging needs, 
                  always keeping our core values of accessibility and quality at the forefront.
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

export default About;
