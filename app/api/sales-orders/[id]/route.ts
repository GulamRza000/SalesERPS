import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function GET({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const salesOrder = await prisma.salesOrder.findUnique({
      where: { id },
      include: {
        orderItems: true, // Include related items in the response
      },
    });

    if (!salesOrder) {
      return new NextResponse(JSON.stringify({ msg: 'Sales order not found' }), { status: 404 });
    }

    return new NextResponse(JSON.stringify(salesOrder), { status: 200 });
  } catch (error) {
    // console.error(error);
    return new NextResponse(JSON.stringify({ msg: 'Error fetching sales order' }), { status: 500 });
  }
}



export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const { status } = await request.json();
  
    if (!status) {
      return new NextResponse(JSON.stringify({ msg: 'Status is required' }), { status: 400 });
    }
  
    try {
      const updatedSalesOrder = await prisma.salesOrder.update({
        where: { id },
        data: { status },
      });
  
      return new NextResponse(JSON.stringify(updatedSalesOrder), { status: 200 });
    } catch (error) {
      console.error(error);
      return new NextResponse(JSON.stringify({ msg: 'Error updating sales order status' }), { status: 500 });
    }
  }
  