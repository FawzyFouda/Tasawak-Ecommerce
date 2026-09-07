import ProductCard from './ProductCard';

function BestSellers({ products, loading }) {
  console.log(products);

  const source =
    products && products.length > 0 ? products : [];

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-12">
      <h2 className="title_heading text-2xl md:text-3xl font-serif text-center uppercase tracking-widest mb-6">
        Our Best Seller
      </h2>

      {loading ? (
        <div className="text-center py-10 text-gray-500">
          Loading products...
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          {source.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}

export default BestSellers;

