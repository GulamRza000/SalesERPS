import ProductList from '@/app/componants/ProductList'
import React from 'react'
import Link from 'next/link'

function ProductsPage() {
  return (
    <div>
        <ProductList />

        <div className='px-12'>
          <Link href='/sales-orders/new' className='default-button'>Place Order</Link>
          <Link href='/products/update' className='default-button'>Add Product</Link>
        </div>
    </div>
  )
}

export default ProductsPage