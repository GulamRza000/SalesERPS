"use client";
import ProductForm from '@/app/componants/ProductForm'
import { useSearchParams } from 'next/navigation';
import React from 'react'
import { Suspense } from 'react';

function ProductUpdatePage() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id');

  return (
    <div>
        {id != undefined ? <ProductForm productId={id} /> : <ProductForm  />}
    </div>

  )
}

// was not able to use useSearchParams without suspense
function page(){
  return (
    <Suspense>
      <ProductUpdatePage />
    </Suspense>
  )
}


export default page