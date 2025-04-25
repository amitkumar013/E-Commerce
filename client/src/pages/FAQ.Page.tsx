import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search } from "lucide-react"
import { Link } from "react-router-dom"

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // FAQ categories and questions
  const faqCategories = [
    {
      id: "orders",
      label: "Orders & Shipping",
      questions: [
        {
          question: "How can I track my order?",
          answer:
            "You can track your order by logging into your account and navigating to the 'Order History' section. Alternatively, you can use the tracking number provided in your shipping confirmation email.",
        },
        {
          question: "What shipping methods do you offer?",
          answer:
            "We offer standard shipping (3-5 business days), express shipping (1-2 business days), and international shipping (7-14 business days). Shipping costs vary based on location and selected method.",
        },
        {
          question: "Do you ship internationally?",
          answer:
            "Yes, we ship to most countries worldwide. International shipping typically takes 7-14 business days, and customs fees may apply depending on your country's regulations.",
        },
        {
          question: "How long will it take to receive my order?",
          answer:
            "Domestic orders typically arrive within 3-5 business days with standard shipping, and 1-2 business days with express shipping. International orders may take 7-14 business days. Processing time (1-2 business days) should be added to these estimates.",
        },
        {
          question: "Can I change or cancel my order after it's been placed?",
          answer:
            "You can request changes or cancellations within 1 hour of placing your order by contacting our customer service team. After this window, we may not be able to modify orders as they enter our fulfillment process quickly.",
        },
      ],
    },
    {
      id: "returns",
      label: "Returns & Refunds",
      questions: [
        {
          question: "What is your return policy?",
          answer:
            "We offer a 30-day return policy for most items in new, unworn condition with original tags and packaging. Some items like intimates, swimwear, and final sale items cannot be returned for hygiene and other reasons.",
        },
        {
          question: "How do I initiate a return?",
          answer:
            "To initiate a return, log into your account, go to 'Order History', select the order containing the item(s) you wish to return, and follow the return instructions. You can also contact our customer service team for assistance.",
        },
        {
          question: "How long does it take to process a refund?",
          answer:
            "Once we receive your return, it typically takes 3-5 business days to inspect and process. After approval, refunds are issued to your original payment method and may take an additional 5-10 business days to appear on your statement, depending on your financial institution.",
        },
        {
          question: "Can I exchange an item instead of returning it?",
          answer:
            "Yes, you can request an exchange for a different size or color of the same item during the return process. If the item you want is in stock, we'll ship it once we receive your return. If it's out of stock, we'll issue a refund.",
        },
        {
          question: "Do I have to pay for return shipping?",
          answer:
            "For standard returns, customers are responsible for return shipping costs. However, for defective or incorrectly shipped items, we provide a prepaid return label at no cost to you.",
        },
      ],
    },
    {
      id: "products",
      label: "Products & Sizing",
      questions: [
        {
          question: "How do I find the right size?",
          answer:
            "We provide detailed size guides on each product page. You can also check the 'Fit & Sizing' tab for specific measurements. If you're between sizes, we typically recommend sizing up for a more comfortable fit.",
        },
        {
          question: "Are your products sustainable?",
          answer:
            "We're committed to increasing our sustainable offerings. Products made with eco-friendly materials are labeled with our 'Sustainable Choice' tag. We're working toward using more recycled and organic materials across our entire collection.",
        },
        {
          question: "How should I care for my purchases?",
          answer:
            "Care instructions are provided on the product tags and product pages. Generally, we recommend washing in cold water, avoiding bleach, and air drying when possible to extend the life of your garments.",
        },
        {
          question: "Do you offer plus sizes?",
          answer:
            "Yes, we offer an inclusive range of sizes from XS to 3XL in most of our styles. We're continuously expanding our size range to ensure everyone can find their perfect fit.",
        },
        {
          question: "Are your products true to size?",
          answer:
            "Our products generally run true to size, but fit can vary slightly between different styles and fabrics. We recommend checking the specific product reviews and size guide for each item.",
        },
      ],
    },
    {
      id: "account",
      label: "Account & Payment",
      questions: [
        {
          question: "How do I create an account?",
          answer:
            "You can create an account by clicking the 'Account' icon in the top right corner of our website and selecting 'Create Account'. You'll need to provide your email address and create a password. You can also create an account during checkout.",
        },
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, Google Pay, and Shop Pay. We also offer installment payment options through Affirm and Klarna in select regions.",
        },
        {
          question: "Is my payment information secure?",
          answer:
            "Yes, we use industry-standard encryption and security measures to protect your payment information. We are PCI compliant and never store your full credit card details on our servers.",
        },
        {
          question: "How do I reset my password?",
          answer:
            "To reset your password, click the 'Account' icon, select 'Sign In', then click 'Forgot Password'. Enter your email address, and we'll send you instructions to create a new password.",
        },
        {
          question: "Can I save my shipping and payment information for future purchases?",
          answer:
            "Yes, when you create an account, you can save multiple shipping addresses and payment methods for faster checkout in the future. Your payment information is securely stored in accordance with industry standards.",
        },
      ],
    },
    {
      id: "other",
      label: "Other Questions",
      questions: [
        {
          question: "Do you have physical stores?",
          answer:
            "Yes, we currently have flagship stores in New York, Los Angeles, Chicago, and Miami. You can find store hours, locations, and contact information on our 'Store Locator' page.",
        },
        {
          question: "Do you offer gift cards?",
          answer:
            "Yes, we offer digital and physical gift cards in various denominations. Digital gift cards are delivered via email, while physical gift cards can be shipped to your preferred address.",
        },
        {
          question: "How can I contact customer service?",
          answer:
            "You can reach our customer service team through email at support@styleshop.com, by phone at 1-800-STYLE-SHOP (Monday-Friday, 9am-6pm EST), or through the live chat feature on our website.",
        },
        {
          question: "Do you have a loyalty program?",
          answer:
            "Yes, our StyleRewards program allows you to earn points on purchases that can be redeemed for discounts on future orders. You also get exclusive access to special promotions and early access to new collections.",
        },
        {
          question: "Are there any promo codes currently available?",
          answer:
            "We regularly offer promotional codes through our newsletter, social media channels, and website. You can find current promotions on our 'Deals' page or by subscribing to our newsletter for exclusive offers.",
        },
      ],
    },
  ]

  // Filter questions based on search query
  const filteredQuestions = searchQuery
    ? faqCategories.flatMap((category) =>
        category.questions
          .filter(
            (q) =>
              q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
              q.answer.toLowerCase().includes(searchQuery.toLowerCase()),
          )
          .map((q) => ({ ...q, category: category.label })),
      )
    : []

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-muted py-20 md:py-28">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Find answers to common questions about our products, orders, shipping, and more.
            </p>
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search for answers..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-8 md:py-12 px-6">
        <div className="container">
          {searchQuery ? (
            // Search Results
            <div>
              <h2 className="text-2xl font-bold mb-6">Search Results for "{searchQuery}"</h2>
              {filteredQuestions.length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                  {filteredQuestions.map((q, index) => (
                    <AccordionItem key={index} value={`search-${index}`}>
                      <AccordionTrigger className="text-left">
                        <div>
                          <span>{q.question}</span>
                          <Badge className="ml-2">{q.category}</Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">{q.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">
                    No results found for "{searchQuery}". Please try a different search term or browse our FAQ
                    categories below.
                  </p>
                  <Button variant="outline" onClick={() => setSearchQuery("")}>
                    Clear Search
                  </Button>
                </div>
              )}
            </div>
          ) : (
            // Categorized FAQs
            <Tabs defaultValue="orders">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
                {faqCategories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id}>
                    {category.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              {faqCategories.map((category) => (
                <TabsContent key={category.id} value={category.id}>
                  <h2 className="text-2xl font-bold mb-6">{category.label}</h2>
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((q, index) => (
                      <AccordionItem key={index} value={`${category.id}-${index}`}>
                        <AccordionTrigger className="text-left">{q.question}</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">{q.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </TabsContent>
              ))}
            </Tabs>
          )}
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-8 md:py-12 px-6 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-muted-foreground mb-8">
              Our customer support team is here to help. Reach out to us through any of the following channels.
            </p>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="bg-background p-6 rounded-lg">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
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
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Call Us</h3>
                <p className="text-muted-foreground mb-4">
                  1-800-STYLE-SHOP
                  <br />
                  Monday-Friday, 9am-6pm EST
                </p>
              </div>
              <div className="bg-background p-6 rounded-lg">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
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
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Email Us</h3>
                <p className="text-muted-foreground mb-4">
                  support@styleshop.com
                  <br />
                  We respond within 24 hours
                </p>
              </div>
              <div className="bg-background p-6 rounded-lg">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
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
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Live Chat</h3>
                <p className="text-muted-foreground mb-4">
                  Available on our website
                  <br />7 days a week, 9am-9pm EST
                </p>
              </div>
            </div>
            <Button className="mt-8" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

// Badge Component (since it was used but not imported)
function Badge({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 ${className}`}
    >
      {children}
    </span>
  )
}
