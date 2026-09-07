import { ChevronLeft, ChevronRight } from 'lucide-react';

function HeroBanner() {
  return (
    <section className="relative bg-neutral-950 text-white overflow-hidden bg-[url('./images/banner.webp')] h-[890px]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24 grid md:grid-cols-2 items-center gap-8">
        {/* Text content */}
        <div className="space-y-5 text-center md:text-left order-2 md:order-1">
          <p className="text-amber-500 uppercase tracking-[0.3em] text-xs md:text-sm font-semibold">
            Fall In Love
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold leading-tight">
            Handsome
            <br />
            Watches
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            Unique Watches from Classic Collections
          </p>
          <button className="mt-4 bg-white text-black px-8 py-3 rounded-full uppercase text-xs tracking-widest font-bold hover:bg-amber-600 hover:text-white transition-colors">
            Shop Now
          </button>
        </div>

        
      </div>

      {/* Carousel arrows */}
      <button
        aria-label="Previous slide"
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 items-center justify-center rounded-full border border-white/30 hover:bg-white/10 transition-colors"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        aria-label="Next slide"
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 items-center justify-center rounded-full border border-white/30 hover:bg-white/10 transition-colors"
      >
        <ChevronRight size={18} />
      </button>
    </section>
  );
}

export default HeroBanner;
