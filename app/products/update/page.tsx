"use client";
import ProductForm from '@/app/componants/ProductForm'
import { useSearchParams } from 'next/navigation';
import React from 'react'

function ProductUpdatePage() {
  const id = useSearchParams().get('id');

  return (
    <div>
        {id != undefined ? <ProductForm productId={id} /> : <ProductForm  />}
    </div>

  )
}

export default ProductUpdatePage