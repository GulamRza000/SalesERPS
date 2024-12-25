
import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma'; 


export async function GET() {
  try {
    const salesOrders = await prisma.salesOrder.findMany({
      include: {
        orderItems: true, // Include order items in the response
      },
    });

    return new NextResponse(JSON.stringify(salesOrders), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ msg: 'Error fetching sales orders' }), { status: 500 });
  }
}


export async function POST(request: Request) {
  try {
    const { order_date, customer_name, total_amount, status, items } = await request.json();

    if (!order_date || !customer_name || !total_amount || !status || !items || items.length === 0) {
      return new NextResponse(JSON.stringify({ msg: 'Invalid input data' }), { status: 400 });
    }

    const newSalesOrder = await prisma.salesOrder.create({
      data: {
        order_date: new Date(order_date),
        customer_name,
        total_amount,
        status,
        orderItems: {
          create: items.map((item: any) => ({
            product_id: item.product_id,
            quantity: item.quantity,
            unit_price: item.unit_price,
            total_price: item.total_price,
          })),
        },
      },
    });

    return new NextResponse(JSON.stringify(newSalesOrder), { status: 201 });
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ msg: 'Error creating sales order' }), { status: 500 });
  }
}
