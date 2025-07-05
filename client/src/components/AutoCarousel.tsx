import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const SLIDE_DURATION = 4000;

const images = [
  {
    url: "https://imgs.search.brave.com/7PNenLqSBS8UCnokgL82_L5GJHLV-7aWCg4jIqSP4M4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzMzLzVj/LzdhLzMzNWM3YTMw/M2I4ODM5ZTZlNDkx/ZGY0NTU4MWEyMWM5/LmpwZw",
    alt: "Sneakers",
    title: "Sneakers",
  },
  {
    url: "https://imgs.search.brave.com/QyLWPqmMNNV_mYks21SNFJrO9sU9ZkNtCH_56EqamlQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1wc2Qv/aG9yaXpvbnRhbC13/ZWJzaXRlLWJhbm5l/XzQ1MTE4OS0xMTIu/anBnP3NlbXQ9YWlz/X2l0ZW1zX2Jvb3N0/ZWQmdz03NDA",
    alt: "Smart Phone",
    title: "Smart Phone",
  },
  {
    url: "https://imgs.search.brave.com/idwlNeM-OQusCI-dx3jo0FxMqtL4hS3REu91LBIMd2o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzM2L2Zj/Lzc0LzM2ZmM3NDk0/ZDhiODJlN2Y0ZmUw/MTEzNDZjZDU5MDUy/LmpwZw",
    alt: "Jeans",
    title: "Stylish Jeans",
  },
  {
    url: "https://imgs.search.brave.com/MXL9wDRaEx8KgaLwupa9kmi8ocPsTicWNEq6F1gRKHE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/b3RvZml4dGVjaC51/cy9jZG4vc2hvcC9w/cm9kdWN0cy9vdG9m/aXgtd2F0Y2gtd2h0/LTFfODAweC5qcGc_/dj0xNjUyMjA2NTA3",
    alt: "Smart Watch",
    title: "Smart Watch",
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
      <div className="relative h-[30vh] md:h-[70vh] w-full">
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
              <p className="text-xs md:text-sm uppercase tracking-wider mb-1 md:mb-2">
                Featured Product
              </p>
              <h2 className="text-lg md:text-3xl font-medium">{image.title}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm opacity-50 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white hover:bg-blue-400"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm opacity-50 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white hover:bg-blue-400"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-2">
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
