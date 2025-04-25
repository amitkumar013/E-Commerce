import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Link } from "react-router-dom"

export default function CareersPage() {
  // Sample job openings
  const jobOpenings = [
    {
      id: 1,
      title: "Senior Fashion Designer",
      department: "Design",
      location: "San Francisco, CA",
      type: "Full-time",
      description:
        "We're looking for an experienced fashion designer to join our creative team and help shape our upcoming collections.",
    },
    {
      id: 2,
      title: "E-commerce Manager",
      department: "Digital",
      location: "Remote",
      type: "Full-time",
      description: "Lead our online retail strategy and optimize the customer journey across our digital platforms.",
    },
    {
      id: 3,
      title: "Marketing Coordinator",
      department: "Marketing",
      location: "New York, NY",
      type: "Full-time",
      description: "Support our marketing team in creating and executing campaigns across various channels.",
    },
    {
      id: 4,
      title: "Supply Chain Analyst",
      department: "Operations",
      location: "San Francisco, CA",
      type: "Full-time",
      description: "Help optimize our supply chain processes and ensure efficient product delivery.",
    },
    {
      id: 5,
      title: "Customer Service Representative",
      department: "Customer Support",
      location: "Remote",
      type: "Part-time",
      description: "Provide exceptional support to our customers through various communication channels.",
    },
  ]

  // Sample benefits
  const benefits = [
    {
      title: "Health & Wellness",
      items: [
        "Comprehensive health, dental, and vision insurance",
        "Mental health support and resources",
        "Wellness stipend for gym memberships or fitness classes",
        "Healthy snacks and meals in office locations",
      ],
    },
    {
      title: "Work-Life Balance",
      items: [
        "Flexible working hours",
        "Remote work options",
        "Generous paid time off",
        "Paid parental leave",
        "Sabbatical program for long-term employees",
      ],
    },
    {
      title: "Growth & Development",
      items: [
        "Learning and development budget",
        "Career mentorship program",
        "Industry conferences and events",
        "Internal mobility opportunities",
      ],
    },
    {
      title: "Perks & Discounts",
      items: [
        "Employee discount on all products",
        "Referral bonuses",
        "Company retreats and team-building events",
        "401(k) matching program",
      ],
    },
  ]

  // Sample values
  const values = [
    {
      title: "Creativity",
      description: "We encourage innovative thinking and bold ideas in everything we do.",
      icon: (
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
          <path d="M12 2v8" />
          <path d="m4.93 10.93 1.41 1.41" />
          <path d="M2 18h2" />
          <path d="M20 18h2" />
          <path d="m19.07 10.93-1.41 1.41" />
          <path d="M22 22H2" />
          <path d="m16 6-4 4-4-4" />
          <path d="M16 18a4 4 0 0 0-8 0" />
        </svg>
      ),
    },
    {
      title: "Collaboration",
      description: "We believe great things happen when diverse minds work together.",
      icon: (
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
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      title: "Excellence",
      description: "We strive for the highest quality in our products and our work.",
      icon: (
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
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ),
    },
    {
      title: "Inclusivity",
      description: "We celebrate diversity and create an environment where everyone belongs.",
      icon: (
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
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="10" r="3" />
          <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
        </svg>
      ),
    },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-muted py-20 md:py-28">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Join Our Team</h1>
            <p className="text-xl text-muted-foreground">
              Build your career at StyleShop and help shape the future of fashion.
            </p>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-8 md:py-12 px-6">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Why Join StyleShop?</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  At StyleShop, we're more than just a fashion brand. We're a community of passionate individuals
                  dedicated to creating exceptional experiences for our customers.
                </p>
                <p>
                  We believe in fostering a culture of creativity, collaboration, and growth. Our team members are
                  encouraged to bring their unique perspectives and ideas to the table.
                </p>
                <p>
                  Whether you're just starting your career or looking for your next challenge, StyleShop offers
                  opportunities to learn, grow, and make an impact in the fashion industry.
                </p>
              </div>
              <div className="mt-8">
                <Button size="lg" asChild>
                  <a href="#openings">View Open Positions</a>
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <img
                src="/placeholder.svg?height=800&width=600"
                alt="Team working together"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-8 md:py-12 px-6 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <Card key={value.title} className="bg-background">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-8 md:py-12 px-6">
        <div className="container">
          <h2 className="text-3xl font-bold mb-12 text-center">Benefits & Perks</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit) => (
              <Card key={benefit.title}>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">{benefit.title}</h3>
                  <ul className="space-y-2">
                    {benefit.items.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
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
                          className="h-5 w-5 text-primary shrink-0 mt-0.5"
                        >
                          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                          <path d="m9 12 2 2 4-4" />
                        </svg>
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section id="openings" className="py-8 md:py-12 px-6 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl font-bold mb-12 text-center">Open Positions</h2>
          <div className="grid gap-6">
            {jobOpenings.map((job) => (
              <Card key={job.id} className="group hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">{job.title}</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge variant="outline">{job.department}</Badge>
                        <Badge variant="outline">{job.location}</Badge>
                        <Badge variant="outline">{job.type}</Badge>
                      </div>
                      <p className="text-muted-foreground mt-3">{job.description}</p>
                    </div>
                    <Button className="shrink-0" asChild>
                      <Link to={`/careers/${job.id}`}>Apply Now</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">Don't see a position that matches your skills?</p>
            <Button variant="outline" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-8 md:py-12 px-6">
        <div className="container">
          <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What is the application process like?</AccordionTrigger>
                <AccordionContent>
                  Our application process typically includes an initial application review, a phone screening, one or
                  two interviews (which may include a skills assessment depending on the role), and a final decision.
                  The entire process usually takes 2-3 weeks.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Do you offer internship opportunities?</AccordionTrigger>
                <AccordionContent>
                  Yes, we offer internship programs throughout the year in various departments. These are posted on our
                  careers page when available. We also have special summer internship programs for students.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>What is your remote work policy?</AccordionTrigger>
                <AccordionContent>
                  We offer flexible work arrangements for many positions, including hybrid and fully remote options
                  depending on the role. This is discussed during the interview process for each specific position.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>How would you describe your company culture?</AccordionTrigger>
                <AccordionContent>
                  Our culture is collaborative, creative, and inclusive. We value innovation, authenticity, and a
                  healthy work-life balance. We celebrate diverse perspectives and encourage everyone to bring their
                  whole selves to work.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>What growth opportunities are available?</AccordionTrigger>
                <AccordionContent>
                  We're committed to helping our employees grow both personally and professionally. We offer mentorship
                  programs, learning stipends, and clear career progression paths. We also prioritize internal mobility
                  and promotion when possible.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 md:py-12 px-6 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Join Our Team?</h2>
            <p className="mb-6">Explore our open positions and take the next step in your career journey.</p>
            <Button variant="secondary" size="lg" asChild>
              <a href="#openings">View Open Positions</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
