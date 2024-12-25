// components/ProductDetail.tsx

"use client";
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

const ProductDetail = ({ id } : { id : string}) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await fetch(`/api/products/${id}`);
          const data = await response.json();
          setProduct(data.product);
        } catch (error) {
          console.error('Error fetching product:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto py-4">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <p className="text-lg">{product.description}</p>
      <p className="text-xl font-bold mt-4">Price: ${product.price}</p>
      <p>Quantity: {product.quantity}</p>
      <div className='mt-6'>
        <Link href={`/products/update?id=${id}`} className='default-button'>Edit Product</Link>

      </div>

    </div>
  );
};

export default ProductDetail;
