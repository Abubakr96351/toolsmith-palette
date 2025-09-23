import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, User, Clock, ArrowRight } from 'lucide-react';

// Mock blog data
const blogPosts = [
  {
    id: 1,
    title: "Best Practices for Image Compression",
    excerpt: "Learn how to optimize your images for web without losing quality. Discover the latest techniques and tools for efficient image compression.",
    category: "Image Tools",
    author: "Tech Team",
    date: "2024-01-15",
    readTime: "5 min read",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    title: "Video Conversion: Formats and Quality Guide",
    excerpt: "Understanding different video formats and how to choose the right one for your needs. Complete guide to video conversion best practices.",
    category: "Video Tools",
    author: "Media Expert",
    date: "2024-01-12",
    readTime: "8 min read",
    image: "/placeholder.svg"
  },
  {
    id: 3,
    title: "Color Theory for Digital Design",
    excerpt: "Master the art of color selection with our comprehensive guide to color theory and practical tips for digital designers.",
    category: "Design Tools",
    author: "Design Team",
    date: "2024-01-10",
    readTime: "6 min read",
    image: "/placeholder.svg"
  },
  {
    id: 4,
    title: "Background Removal Techniques",
    excerpt: "Explore different methods for removing backgrounds from images, from AI-powered tools to manual editing techniques.",
    category: "Image Tools",
    author: "AI Specialist",
    date: "2024-01-08",
    readTime: "7 min read",
    image: "/placeholder.svg"
  },
  {
    id: 5,
    title: "Optimizing Images for Web Performance",
    excerpt: "Boost your website's loading speed with proper image optimization. Learn about modern formats and compression techniques.",
    category: "Web Performance",
    author: "Performance Expert",
    date: "2024-01-05",
    readTime: "4 min read",
    image: "/placeholder.svg"
  },
  {
    id: 6,
    title: "Future of Digital Media Tools",
    excerpt: "Discover upcoming trends in digital media processing and how AI is revolutionizing the way we work with images and videos.",
    category: "Technology",
    author: "Tech Analyst",
    date: "2024-01-03",
    readTime: "9 min read",
    image: "/placeholder.svg"
  }
];

const categories = ["All", "Image Tools", "Video Tools", "Design Tools", "Web Performance", "Technology"];

export const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Digital Tools <span className="gradient-text">Blog</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest tips, tutorials, and insights about digital media tools and techniques.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === "All" ? "default" : "outline"}
              size="sm"
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="group cursor-pointer hover:shadow-glow transition-smooth">
              <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="text-xs">
                    {post.category}
                  </Badge>
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-smooth">
                  {post.title}
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                
                <Button variant="ghost" className="group/btn p-0 h-auto hover:bg-transparent">
                  <span className="text-primary group-hover/btn:text-primary-foreground transition-smooth">
                    Read More
                  </span>
                  <ArrowRight className="h-4 w-4 ml-2 text-primary group-hover/btn:translate-x-1 transition-smooth" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button className="gradient-primary hover:shadow-glow transition-smooth">
            Load More Articles
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};