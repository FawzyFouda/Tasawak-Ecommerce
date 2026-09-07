const images = [1, 2, 3, 4, 5].map((n) => `https://picsum.photos/seed/wattie-insta-${n}/300/300`);

function InstagramFeed() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-14 text-center">
      <h2 className="text-2xl font-serif uppercase tracking-widest mb-2">
        Wattie On Instagram
      </h2>
      <p className="text-amber-700 text-sm font-medium mb-8">#wattie</p>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {images.map((src, i) => (
          <a
            key={i}
            href="#"
            className="block aspect-square overflow-hidden rounded-md group"
          >
            <img
              src={src}
              alt={`Instagram post ${i + 1}`}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            />
          </a>
        ))}
      </div>
    </section>
  );
}

export default InstagramFeed;
