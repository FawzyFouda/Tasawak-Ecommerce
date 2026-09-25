const brands = [
  { name: 'Daniel Wellington', img: './images/collectionV1-img1.avif' },
  { name: 'Fossil', img: './images/collectionV1-img2.avif' },
  { name: 'Maserati', img: './images/collectionV1-img3.avif' },
  { name: 'Half Dannal', img: './images/collectionV1-img4.avif' },
  { name: 'Tag Heuer', img: './images/collectionV1-img5.avif' },
  { name: 'Tommy Hilfiger', img: './images/collectionV1-img6.avif' },
];

function BrandStrip() {
  return (
    <section className="our_collection max-w-7xl mx-auto px-4 md:px-6 py-12 z-10 relative top-[-50px] bg-[#FFF]">
      <h2 className="title_heading">Our Collection</h2>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-6">
        {brands.map((brand) => (
          <div key={brand.name} className="flex flex-col items-center gap-3 text-center">
            <div className="w-40 h-40 rounded-full bg-gray-50 border border-gray-100 overflow-hidden flex items-center justify-center">
              <img src={brand.img} alt={brand.name} className="w-full h-full object-cover" />
            </div>
            <span className="text-[11px] font-semibold tracking-wider uppercase text-gray-700">
              {brand.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default BrandStrip;
