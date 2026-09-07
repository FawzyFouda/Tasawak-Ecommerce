import { useState } from 'react';

function CookieBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-neutral-900 text-white text-center py-4 px-4">
      <p className="text-xs md:text-sm">
        This website uses cookies to ensure you get the best experience on our website.
        <br className="hidden sm:block" />
        <a href="#" className="underline hover:text-amber-500">
          Privacy &amp; Policy
        </a>
      </p>
      <button
        onClick={() => setVisible(false)}
        className="mt-3 bg-white text-black text-xs font-bold uppercase tracking-widest px-6 py-2 rounded-full hover:bg-amber-600 hover:text-white transition-colors"
      >
        Got It!
      </button>
    </div>
  );
}

export default CookieBar;
