const banners = [
  {
    eyebrow: 'New Collection',
    eyebrow2: 'For Woman',
    title: 'Classic Watch Collections',
    img: 'https://picsum.photos/seed/wattie-banner-woman/700/500',
  },
  {
    eyebrow: 'Spring 2024',
    eyebrow2: 'For Man',
    title: 'Classics And Modern',
    img: 'https://picsum.photos/seed/wattie-banner-man/700/500',
  },
];

function PromoBanners() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-6 grid md:grid-cols-2 gap-6">
      {banners.map((banner) => (
        <div
          key={banner.title}
          className="relative rounded-md overflow-hidden h-80 flex items-end"
        >
          <img
            src={banner.img}
            alt={banner.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/35" />
          <div className="relative p-8 text-white space-y-3">
            <p className="text-xs uppercase tracking-widest text-gray-200">
              {banner.eyebrow}
              <br />
              {banner.eyebrow2}
            </p>
            <h3 className="text-3xl font-serif font-semibold leading-snug">
              {banner.title}
            </h3>
            <button className="mt-2 bg-white text-black px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-amber-600 hover:text-white transition-colors">
              Explore All
            </button>
          </div>
        </div>
      ))}
    </section>
  );
}

export default PromoBanners;
