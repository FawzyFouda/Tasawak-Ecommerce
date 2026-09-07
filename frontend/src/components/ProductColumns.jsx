const columns = [
  {
    title: 'Featured Products',
    items: [
      { name: 'Gunmetal Sandstone', price: '$120.00', img: 'https://picsum.photos/seed/wattie-f1/120/120', swatches: 2 },
      { name: 'Gunmetal Sandstone', price: '$80.00', img: 'https://picsum.photos/seed/wattie-f2/120/120', swatches: 0 },
      { name: 'Daniel Wellington', price: 'From $320.00', img: 'https://picsum.photos/seed/wattie-f3/120/120', swatches: 2 },
    ],
  },
  {
    title: 'Top Rated Products',
    items: [
      { name: 'Daniel Wellington', price: 'From $320.00', img: 'https://picsum.photos/seed/wattie-t1/120/120', swatches: 2 },
      { name: 'Daniel Wellington Affiliate', price: '$200.00', img: 'https://picsum.photos/seed/wattie-t2/120/120', swatches: 4 },
      { name: 'Daniel Wellington', price: '$200.00', oldPrice: '$300.00', img: 'https://picsum.photos/seed/wattie-t3/120/120', swatches: 0 },
    ],
  },
  {
    title: 'Top Sale Products',
    items: [
      { name: 'Gunmetal Sandstone', price: '$70.00', img: 'https://picsum.photos/seed/wattie-s1/120/120', swatches: 0 },
      { name: 'Gunmetal Variabale', price: 'From $150.00', img: 'https://picsum.photos/seed/wattie-s2/120/120', swatches: 3 },
      { name: 'Daniel Wellington Video', price: 'From $400.00', img: 'https://picsum.photos/seed/wattie-s3/120/120', swatches: 3 },
    ],
  },
];

function SwatchDots({ count }) {
  if (!count) return null;
  return (
    <div className="flex gap-1.5 mt-1.5">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="w-3.5 h-3.5 rounded-sm border border-gray-300 bg-gray-100"
        />
      ))}
    </div>
  );
}

function ProductColumns() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-14 grid md:grid-cols-3 gap-10">
      {columns.map((col) => (
        <div key={col.title}>
          <h3 className="text-sm font-bold uppercase tracking-widest mb-5 pb-2 border-b border-gray-200">
            {col.title}
          </h3>
          <div className="space-y-5">
            {col.items.map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">{item.name}</p>
                  <p className="text-sm mt-0.5">
                    {item.oldPrice && (
                      <span className="line-through text-gray-400 mr-2">{item.oldPrice}</span>
                    )}
                    <span className="text-amber-700 font-semibold">{item.price}</span>
                  </p>
                  <SwatchDots count={item.swatches} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

export default ProductColumns;
