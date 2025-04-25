import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export default function AboutPage() {
  // Team members data
  const teamMembers = [
    {
      name: "Amit Gupta",
      role: "CEO & Founder",
      image: "/placeholder.svg?height=400&width=400",
      bio: "Fashion industry veteran with over 15 years of experience.",
    },
    {
      name: "Balkishor Chobey",
      role: "Creative Director",
      image: "/placeholder.svg?height=400&width=400",
      bio: "Award-winning designer with a passion for sustainable fashion.",
    },
    {
      name: "Abdul",
      role: "Head of Operations",
      image: "/placeholder.svg?height=400&width=400",
      bio: "Supply chain expert ensuring quality and ethical production.",
    },
    {
      name: "James Wilson",
      role: "Marketing Director",
      image: "/placeholder.svg?height=400&width=400",
      bio: "Digital marketing specialist with a focus on brand storytelling.",
    },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-muted py-20 md:py-28">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-8">About StyleShop</h1>
            <p className="text-xl text-muted-foreground">
              We're on a mission to make fashion accessible, sustainable, and personal.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-8 md:py-12 px-6 bg-muted/30">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-8">Our Story</h2>
              <div className="space-y-6 text-muted-foreground">
                <p>
                  Founded in 2015, StyleShop began as a small boutique in San Francisco with a vision to create a
                  fashion brand that celebrates individuality and sustainability.
                </p>
                <p>
                  What started as a passion project quickly grew into a global brand as customers resonated with our
                  commitment to quality, ethical production, and unique designs.
                </p>
                <p>
                  Today, we're proud to serve customers worldwide, offering carefully curated collections that blend
                  timeless elegance with contemporary trends.
                </p>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <img src="/placeholder.svg?height=800&width=600" alt="Our store" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-8 md:py-12 px-6 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl font-bold mb-16 text-center">Our Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="bg-background p-10 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  <path d="m7 10 3 3 7-7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Quality First</h3>
              <p className="text-muted-foreground">
                We believe in creating products that stand the test of time, both in style and durability.
              </p>
            </div>
            <div className="bg-background p-10 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  <path d="M8 12h8" />
                  <path d="M12 8v8" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Sustainability</h3>
              <p className="text-muted-foreground">
                We're committed to reducing our environmental footprint through responsible sourcing and production.
              </p>
            </div>
            <div className="bg-background p-10 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Inclusivity</h3>
              <p className="text-muted-foreground">
                We design for everyone, celebrating diversity in all its forms through our products and community.
              </p>
            </div>
            <div className="bg-background p-10 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Customer Care</h3>
              <p className="text-muted-foreground">
                We're dedicated to providing exceptional service and building lasting relationships with our customers.
              </p>
            </div>
            <div className="bg-background p-10 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1-1.275 1.275L12 21l1.912-5.813a2 2 0 0 1-1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Innovation</h3>
              <p className="text-muted-foreground">
                We continuously explore new designs, materials, and technologies to stay at the forefront of fashion.
              </p>
            </div>
            <div className="bg-background p-10 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M2 12h20" />
                  <path d="M12 2v20" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Transparency</h3>
              <p className="text-muted-foreground">
                We believe in open communication about our products, pricing, and practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-8 md:py-12 px-6 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl font-bold mb-16 text-center">Meet Our Team</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {teamMembers.map((member) => (
              <div key={member.name} className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden">
                  <img src={member.image || "/placeholder.svg"} alt={member.name} className="object-cover" />
                </div>
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-primary mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 md:py-12 px-6 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Join Our Journey</h2>
            <p className="mb-8">
              We're always looking for passionate individuals to join our team and help us shape the future of fashion.
            </p>
            <Button variant="secondary" size="lg" asChild>
              <Link to="/careers">View Career Opportunities</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
