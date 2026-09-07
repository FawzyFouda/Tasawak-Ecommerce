import { useEffect, useState } from 'react';
import axios from 'axios';
import HeroBanner from '../components/HeroBanner';
import BrandStrip from '../components/BrandStrip';
import BestSellers from '../components/BestSellers';
import PromoBanners from '../components/PromoBanners';
import ProductColumns from '../components/ProductColumns';
import Newsletter from '../components/Newsletter';
import InstagramFeed from '../components/InstagramFeed';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
    
    axios
      .get(`${baseUrl}/products`)
      .then((response) => {
        if (response.data.success) {
          setProducts(response.data.products);
          console.log(products)
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);
  

  return (
    <>
      <HeroBanner />
      <BrandStrip />
      <BestSellers products={products} loading={loading} />
      <PromoBanners />
      <ProductColumns />
      <Newsletter />
      <InstagramFeed />
    </>
  );
}

export default Home;