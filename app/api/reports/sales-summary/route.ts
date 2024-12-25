import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/app/lib/prisma';

export async function GET(request: Request): Promise<Response> {
  try {
    // 1. Total number of orders
    const totalOrders = await prisma.salesOrder.count();

    // 2. Total sales amount
    const totalSalesAmount = await prisma.salesOrder.aggregate({
      _sum: {
        total_amount: true,
      },
    });

    // 3. Top 5 selling products by quantity
    const topSellingProductsByQuantity = await prisma.salesOrderItem.groupBy({
      by: ['product_id'],
      _sum: {
        quantity: true,
      },
      orderBy: {
        _sum: {
          quantity: 'desc',
        },
      },
      take: 5,
    });

    const topSellingProductsByQuantityDetailed = await Promise.all(
      topSellingProductsByQuantity.map(async (item) => {
        const product = await prisma.product.findUnique({
          where: { id: item.product_id },
        });
        return {
          productId: product?.id,
          name: product?.name,
          quantitySold: item._sum.quantity,
        };
      })
    );

    // 4. Top 5 selling products by revenue
    const topSellingProductsByRevenue = await prisma.salesOrderItem.groupBy({
      by: ['product_id'],
      _sum: {
        total_price: true,
      },
      orderBy: {
        _sum: {
          total_price: 'desc',
        },
      },
      take: 5,
    });

    const topSellingProductsByRevenueDetailed = await Promise.all(
      topSellingProductsByRevenue.map(async (item) => {
        const product = await prisma.product.findUnique({
          where: { id: item.product_id },
        });
        return {
          productId: product?.id,
          name: product?.name,
          revenueGenerated: item._sum.total_price,
        };
      })
    );

    // 5. Sales by status (pending, completed, cancelled)
    const salesByStatus = await prisma.salesOrder.groupBy({
      by: ['status'],
      _count: {
        id: true,
      },
    });

    const statusCount = salesByStatus.reduce(
      (acc: any, item: any) => {
        acc[item.status] = item._count.id;
        return acc;
      },
      { pending: 0, completed: 0, cancelled: 0 }
    );

    // Create the summary response
    const salesSummary = {
      totalOrders,
      totalSalesAmount: totalSalesAmount._sum.total_amount || 0,
      topSellingProductsByQuantity: topSellingProductsByQuantityDetailed,
      topSellingProductsByRevenue: topSellingProductsByRevenueDetailed,
      salesByStatus: statusCount,
    };

    // Return the summary as a JSON response
    return new Response(JSON.stringify(salesSummary), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error generating sales summary:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate sales summary' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
