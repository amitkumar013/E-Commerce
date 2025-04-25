import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Search } from "lucide-react"
import { Link } from "react-router-dom"

export default function BlogPage() {
  // Sample blog posts
  const featuredPost = {
    id: 1,
    title: "Summer Fashion Trends for 2025",
    excerpt: "Discover the hottest styles and must-have pieces for the upcoming summer season.",
    image: "/placeholder.svg?height=600&width=1200",
    date: "April 15, 2025",
    author: "Sarah Johnson",
    authorImage: "/placeholder.svg?height=100&width=100",
    category: "Fashion Trends",
    readTime: "5 min read",
  }

  const blogPosts = [
    {
      id: 2,
      title: "Sustainable Fashion: Making Ethical Choices",
      excerpt: "Learn how to build a wardrobe that's both stylish and environmentally conscious.",
      image: "/placeholder.svg?height=400&width=600",
      date: "April 10, 2025",
      author: "Michael Chen",
      category: "Sustainability",
      readTime: "8 min read",
    },
    {
      id: 3,
      title: "The Art of Accessorizing: Elevate Your Outfit",
      excerpt: "Simple tips to take your everyday looks from basic to brilliant with the right accessories.",
      image: "/placeholder.svg?height=400&width=600",
      date: "April 5, 2025",
      author: "Priya Patel",
      category: "Style Tips",
      readTime: "6 min read",
    },
    {
      id: 4,
      title: "Behind the Scenes: Our Spring Photoshoot",
      excerpt: "Get an exclusive look at how we created our latest campaign in the heart of Paris.",
      image: "/placeholder.svg?height=400&width=600",
      date: "March 28, 2025",
      author: "James Wilson",
      category: "Behind the Scenes",
      readTime: "4 min read",
    },
    {
      id: 5,
      title: "The History of Denim: From Workwear to High Fashion",
      excerpt: "Explore the fascinating journey of how jeans became a global fashion staple.",
      image: "/placeholder.svg?height=400&width=600",
      date: "March 20, 2025",
      author: "Sarah Johnson",
      category: "Fashion History",
      readTime: "10 min read",
    },
    {
      id: 6,
      title: "How to Care for Your Luxury Items",
      excerpt: "Expert tips on maintaining and preserving your investment pieces for years to come.",
      image: "/placeholder.svg?height=400&width=600",
      date: "March 15, 2025",
      author: "Michael Chen",
      category: "Care Guide",
      readTime: "7 min read",
    },
  ]

  // Categories
  const categories = [
    "Fashion Trends",
    "Style Tips",
    "Sustainability",
    "Behind the Scenes",
    "Fashion History",
    "Care Guide",
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-muted py-20 md:py-28">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Blog</h1>
            <p className="text-xl text-muted-foreground">
              Fashion insights, style tips, and behind-the-scenes stories.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Categories */}
      <section className="py-8 md:py-12 px-6 border-b">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Search articles..." className="pl-10" />
            </div>
            <div className="flex flex-wrap gap-2 justify-center md:justify-end">
              {categories.map((category) => (
                <Badge key={category} variant="outline" className="cursor-pointer hover:bg-muted">
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-8 md:py-12 px-6">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">Featured Article</h2>
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
              <img
                src={featuredPost.image || "/placeholder.svg"}
                alt={featuredPost.title}
                className="object-cover"
              />
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge>{featuredPost.category}</Badge>
                <span className="text-sm text-muted-foreground">{featuredPost.readTime}</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold">{featuredPost.title}</h3>
              <p className="text-muted-foreground">{featuredPost.excerpt}</p>
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  <img
                    src={featuredPost.authorImage || "/placeholder.svg"}
                    alt={featuredPost.author}
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{featuredPost.author}</p>
                  <p className="text-sm text-muted-foreground">{featuredPost.date}</p>
                </div>
              </div>
              <Button asChild>
                <Link to={`/blog/${featuredPost.id}`}>Read Article</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-8 md:py-12 px-6 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">Latest Articles</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <div className="relative h-48 w-full">
                  <img src={post.image || "/placeholder.svg"} alt={post.title} className="object-cover" />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline">{post.category}</Badge>
                    <span className="text-xs text-muted-foreground">{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                  <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <span className="font-medium">{post.author}</span>
                      <span className="text-muted-foreground"> · {post.date}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0 pb-6 px-6">
                  <Button variant="outline" className="w-full" asChild>
                    <Link to={`/blog/${post.id}`}>Read More</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="flex justify-center mt-12">
            <Button variant="outline" size="lg">
              Load More Articles
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-8 md:py-12 px-6 bg-muted/20">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-muted-foreground mb-6">
              Get the latest fashion insights and style tips delivered straight to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <Input type="email" placeholder="Your email address" className="flex-1" />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
