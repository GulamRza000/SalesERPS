import React from 'react'
import Link from 'next/link'

function Header() {
  return (
    <header className='flex justify-between p-6 bg-gray-300'>
      <h1 className='text-4xl'><Link href={'/'}>ERPS</Link></h1>
      <div>
        <ul className='flex gap-4 items-center h-full'>
          <li><Link href={'/products'} >Products</Link></li>
          <li><Link href={'/sales-orders'} >Orders</Link></li>
          <li><Link href={'/sales-summary'} >Sales Summary</Link></li>
          <li><Link href={'/sales-orders/new'} >Place Order</Link></li>
        </ul>
      </div>
    </header>
  )
}

export default Header