import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  category: string;
  features: string[];
  href: string;
}

export const ToolCard = ({ title, description, icon: Icon, category, features, href }: ToolCardProps) => {
  return (
    <Card className="tool-card bg-card border-border group cursor-pointer h-full">
      <CardContent className="p-6 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center group-hover:shadow-glow transition-smooth">
              <Icon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-smooth">
                {title}
              </h3>
              <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                {category}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-grow">
          {description}
        </p>

        {/* Features */}
        <div className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 gradient-accent rounded-full"></div>
              <span className="text-xs text-muted-foreground">{feature}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <Button 
          className="w-full gradient-primary hover:shadow-glow transition-smooth group-hover:scale-105"
          asChild
        >
          <a href={href}>
            Use Tool
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};