import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const SLIDE_DURATION = 4000;

const images = [
  {
    url: "https://images.unsplash.com/photo-1541560052-5e137f229371?q=80&w=2940&auto=format&fit=crop",
    alt: "Premium Headphones",
    title: "Premium Audio Experience",
  },
  {
    url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2899&auto=format&fit=crop",
    alt: "Smart Watch",
    title: "Next-Gen Wearable",
  },
  {
    url: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=2864&auto=format&fit=crop",
    alt: "Laptop",
    title: "Professional Workstation",
  },
  {
    url: "https://images.unsplash.com/photo-1491933382434-500287f9b54b?q=80&w=2864&auto=format&fit=crop",
    alt: "Earbuds",
    title: "Wireless Freedom",
  },
  {
    url: "https://images.unsplash.com/photo-1507764923504-cd90bf7da772?q=80&w=2947&auto=format&fit=crop",
    alt: "Smartphone",
    title: "Connected Living",
  },
];

export const AutoCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const nextSlide = useCallback(() => {
    setDirection("right");
    setCurrentSlide((prev) => (prev + 1) % images.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection("left");
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  }, []);

  useEffect(() => {
    if (isHovered) return;

    const timer = setInterval(nextSlide, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [nextSlide, isHovered]);

  return (
    <div
      className="relative w-full overflow-hidden group"
      onMouseEnter={() => setIsHovered(false)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-[30vh] md:h-[60vh] w-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 transform transition-all duration-700 ease-in-out",
              currentSlide === index
                ? "opacity-100 translate-x-0"
                : direction === "right"
                ? `opacity-0 ${
                    index < currentSlide
                      ? "translate-x-[-100%]"
                      : "translate-x-[100%]"
                  }`
                : `opacity-0 ${
                    index < currentSlide
                      ? "translate-x-[100%]"
                      : "translate-x-[-100%]"
                  }`
            )}
          >
            <img
              src={image.url}
              alt={image.alt}
              className="object-cover w-full h-full"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <p className="text-xs md:text-sm uppercase tracking-wider mb-1 md:mb-2">
                Featured Product
              </p>
              <h2 className="text-xl md:text-3xl font-medium">{image.title}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm opacity-50 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white hover:bg-white/20"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm opacity-50 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white hover:bg-white/20"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentSlide ? "right" : "left");
              setCurrentSlide(index);
            }}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              currentSlide === index
                ? "bg-white w-6"
                : "bg-white/50 hover:bg-white/75"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
