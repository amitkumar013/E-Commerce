import * as React from "react";
import { cn } from "@/lib/utils";

const images = [
  {
    url: "https://img.freepik.com/premium-vector/online-shopping-background-digital-market-website-mobile-app_269039-163.jpg?semt=ais_hybrid",
    alt: "Slide 1",
  },
  {
    url: "https://img.freepik.com/free-psd/horizontal-banner-template-big-sale-with-woman-shopping-bags_23-2148786755.jpg",
    alt: "Slide 2",
  },
  {
    url: "https://s.tmimgcdn.com/scr/1200x627/375400/big-sale-on-store-and-online-sale-banner-design-template_375459-original.jpg",
    alt: "Slide 3",
  },
  {
    url: "https://t3.ftcdn.net/jpg/04/38/59/88/360_F_438598896_D9pyLmbMZ02CrxURfHxU4nG5UlzXv6Dy.jpg",
    alt: "Slide 4",
  },
];

export function AutoCarousel() {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = React.useState(true);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % images.length);
      }, 4500); // Change slide every 5 seconds
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div
      className="relative w-full max-w-4xl mx-auto px-4 py-7"
      onMouseEnter={() => setIsAutoPlaying(true)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="relative aspect-[2/1] overflow-hidden">
        {images.map((image, index) => (
          <div
            key={index}
            className={cn(
              "absolute w-full h-full transition-transform duration-500 ease-out",
              index === currentSlide ? "translate-x-0" : "translate-x-full"
            )}
            style={{
              transform: `translateX(${(index - currentSlide) * 100}%)`,
              zIndex: index === currentSlide ? 10 : 0,
            }}
          >
            <img
              src={image?.url || "/placeholder.svg"}
              alt={image?.alt || "Image"}
              className="object-cover w-full h-auto"
              loading={index === 0 ? "eager" : "lazy"}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-8 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 p-2 rounded-full shadow-lg z-20 hidden md:block"
        aria-label="Previous slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-8 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 p-2 rounded-full shadow-lg z-20 hidden md:block"
        aria-label="Next slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "w-2.5 h-2.5 rounded-full transition-all duration-300",
              index === currentSlide
                ? "bg-white scale-110"
                : "bg-white/50 hover:bg-white/75"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
