import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

export const Footer = () => {
  const quickLinks = [
    { name: 'Image Converter', href: '/tools/image-converter' },
    { name: 'Video Converter', href: '/tools/video-converter' },
    { name: 'Image Compressor', href: '/tools/image-compressor' },
    { name: 'Background Remover', href: '/tools/background-remover' },
    { name: 'Image Resizer', href: '/tools/image-resizer' },
  ];

  const company = [
    { name: 'About Us', href: '/about' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Contact', href: '/contact' },
  ];

  const socialLinks = [
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'GitHub', href: '#', icon: Github },
    { name: 'LinkedIn', href: '#', icon: Linkedin },
    { name: 'Email', href: 'mailto:contact@filetools.pro', icon: Mail },
  ];

  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">FT</span>
              </div>
              <span className="text-xl font-bold text-foreground">FileTools Pro</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Professional file conversion and editing tools. Fast, secure, and always free.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-smooth"
                    aria-label={link.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Popular Tools</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-smooth text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-2">
              {company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-smooth text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Get in Touch</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Email: contact@filetools.pro</p>
              <p>Support: support@filetools.pro</p>
              <p>Business: business@filetools.pro</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2024 FileTools Pro. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground mt-2 md:mt-0">
            Made with ❤️ for creators and professionals
          </p>
        </div>
      </div>
    </footer>
  );
};