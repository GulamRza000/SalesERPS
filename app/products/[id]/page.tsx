import ProductDetail from '@/app/componants/ProductDetails'
import React from 'react'
import Link from 'next/link';

async function ProductDetailsPage({ params }: { params : Promise<{ id : string}>}) {

    const id = (await params).id;
  return <ProductDetail id={id} />
}

export default ProductDetailsPage