import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, User, Clock, ArrowLeft, Share2, BookOpen } from 'lucide-react';

// Mock blog data (in real app, this would come from API/database)
const blogPosts = {
  "1": {
    id: 1,
    title: "Best Practices for Image Compression",
    excerpt: "Learn how to optimize your images for web without losing quality. Discover the latest techniques and tools for efficient image compression.",
    content: `
      <h2>Introduction to Image Compression</h2>
      <p>Image compression is a crucial aspect of web development and digital media management. With the increasing demand for fast-loading websites and efficient storage solutions, understanding how to properly compress images without sacrificing quality has become more important than ever.</p>
      
      <h2>Understanding Different Compression Types</h2>
      <p>There are two main types of image compression:</p>
      <ul>
        <li><strong>Lossy Compression:</strong> Reduces file size by permanently removing some image data. Examples include JPEG and WebP.</li>
        <li><strong>Lossless Compression:</strong> Reduces file size without losing any image data. Examples include PNG and GIF.</li>
      </ul>
      
      <h2>Modern Image Formats</h2>
      <p>Modern web browsers support several advanced image formats that offer better compression than traditional formats:</p>
      <ul>
        <li><strong>WebP:</strong> Developed by Google, offers 25-35% better compression than JPEG</li>
        <li><strong>AVIF:</strong> Next-generation format with excellent compression and quality</li>
        <li><strong>HEIF:</strong> High efficiency format used by Apple devices</li>
      </ul>
      
      <h2>Best Practices</h2>
      <p>Follow these guidelines for optimal image compression:</p>
      <ol>
        <li>Choose the right format for your content type</li>
        <li>Optimize images for different screen sizes</li>
        <li>Use progressive JPEG for large images</li>
        <li>Implement lazy loading for better performance</li>
        <li>Consider using a CDN for image delivery</li>
      </ol>
      
      <h2>Tools and Techniques</h2>
      <p>There are various tools available for image compression, from online services to desktop applications and command-line tools. Our image compression tool provides an easy-to-use interface for optimizing your images with various quality settings and format options.</p>
      
      <h2>Conclusion</h2>
      <p>Proper image compression is essential for creating fast, efficient websites. By understanding the different compression types, formats, and tools available, you can significantly improve your website's performance while maintaining visual quality.</p>
    `,
    category: "Image Tools",
    author: "Tech Team",
    date: "2024-01-15",
    readTime: "5 min read",
    image: "/placeholder.svg",
    tags: ["compression", "optimization", "web-performance", "images"]
  }
};

const relatedPosts = [
  {
    id: 2,
    title: "Video Conversion: Formats and Quality Guide",
    category: "Video Tools",
    readTime: "8 min read",
    image: "/placeholder.svg"
  },
  {
    id: 3,
    title: "Color Theory for Digital Design",
    category: "Design Tools", 
    readTime: "6 min read",
    image: "/placeholder.svg"
  },
  {
    id: 4,
    title: "Background Removal Techniques",
    category: "Image Tools",
    readTime: "7 min read", 
    image: "/placeholder.svg"
  }
];

export const BlogPost = () => {
  const { id } = useParams();
  const post = blogPosts[id as keyof typeof blogPosts];

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/blog">Back to Blog</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button variant="ghost" className="mb-6" asChild>
          <Link to="/blog">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
        </Button>

        {/* Article Header */}
        <article className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Badge variant="secondary" className="mb-4">
              {post.category}
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
              {post.title}
            </h1>
            
            <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
              {post.excerpt}
            </p>
            
            {/* Author & Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>

            {/* Share Button */}
            <div className="flex gap-2 pb-8 border-b border-border">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          {/* Featured Image */}
          <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-8">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Content */}
          <div 
            className="prose prose-lg prose-zinc dark:prose-invert max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Article Footer */}
          <div className="border-t border-border pt-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BookOpen className="h-4 w-4" />
                <span>Was this article helpful?</span>
              </div>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share Article
              </Button>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        <section className="max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-bold text-foreground mb-8">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <Card key={relatedPost.id} className="group cursor-pointer hover:shadow-glow transition-smooth">
                <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                  <img
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                  />
                </div>
                <CardContent className="p-4">
                  <Badge variant="secondary" className="text-xs mb-2">
                    {relatedPost.category}
                  </Badge>
                  <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-smooth line-clamp-2">
                    {relatedPost.title}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{relatedPost.readTime}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};