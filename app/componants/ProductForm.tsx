// components/ProductForm.tsx

"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface ProductFormProps {
  productId?: string;
}

const ProductForm = ({ productId }: ProductFormProps) => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: 0,
    quantity: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    console.log(productId)
    if (productId) {
      const fetchProduct = async () => {
        try {
          const response = await fetch(`/api/products/${productId}`);
          const data = await response.json();
          if (data.product) {
            setProduct({
              name: data.product.name,
              description: data.product.description,
              price: data.product.price,
              quantity: data.product.quantity,
            });
          }
        } catch (error) {
          console.error('Error fetching product for edit:', error);
        }
      };

      fetchProduct();
    }
  }, [productId]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const method = productId ? 'PUT' : 'POST';
    const url = productId ? `/api/products/${productId}` : '/api/products';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        router.push('/products');
      } else {
        console.error('Failed to save product');
      }
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-4">
      <h1 className="text-3xl font-bold mb-4">{productId ? 'Edit Product' : 'Create Product'}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            required
            className="mt-1 block w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={product.description}
            onChange={(e) => setProduct({ ...product, description: e.target.value })}
            className="mt-1 block w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            id="price"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value || '0') })}
            required
            className="mt-1 block w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            value={product.quantity}
            onChange={(e) => setProduct({ ...product, quantity: parseInt(e.target.value || '0', 10) })}
            required
            className="mt-1 block w-full px-4 py-2 border rounded-md"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          {loading ? 'Saving...' : productId ? 'Update Product' : `Create Product`}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
