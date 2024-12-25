// components/ProductList.tsx

"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-4">
      <h1 className="text-3xl font-bold mb-4">Product List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p>{product.description}</p>
            <p className="text-lg font-bold">${product.price}</p>
            <p>Quantity: {product.quantity}</p>
            <Link href={`/products/${product.id}`} className="text-blue-500 hover:underline">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
