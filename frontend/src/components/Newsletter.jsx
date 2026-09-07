import { Send } from 'lucide-react';

function Newsletter() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-6">
      <div className="relative rounded-md overflow-hidden">
        <img
          src="https://picsum.photos/seed/wattie-newsletter/1400/500"
          alt="Newsletter background"
          className="w-full h-80 md:h-96 object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute inset-0 flex items-center justify-center md:justify-end px-6 md:px-16">
          <div className="bg-white/95 backdrop-blur-sm p-8 md:p-10 max-w-sm w-full text-center border border-amber-700/30">
            <h3 className="text-2xl font-serif font-semibold uppercase tracking-wide mb-2">
              Get Update
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Subscribe our newsletter and get discount 30% off
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center bg-gray-100 rounded-full overflow-hidden pl-4"
            >
              <input
                type="email"
                placeholder="Your email address..."
                className="flex-1 bg-transparent py-3 text-sm outline-none min-w-0"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="bg-amber-700 hover:bg-amber-800 transition-colors text-white p-3 rounded-full m-1 flex-shrink-0"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;
