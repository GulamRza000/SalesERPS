import prisma from '@/app/lib/prisma'; 

export async function GET(request: Request): Promise<Response> {
  try {

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

    // Extract product IDs from the result
    const productIds = topSellingProductsByQuantity.map((item) => item.product_id);

    // Fetch detailed product information for the top-selling products
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
      include: {
        orderItems: {
          select: {
            quantity: true,
          },
        },
      },
    });


    return new Response(JSON.stringify(products), {
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
