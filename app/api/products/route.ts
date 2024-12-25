import prisma from '@/app/lib/prisma';


export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return new Response(JSON.stringify({ products, msg: "success" }), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ msg: "failed", url:'/api/products' }), { status: 500 })
  }
}



export async function POST(request : Request){
  try {
    const { name, description, price, quantity } = await request.json();

    if (!name || price == null || quantity == null) {
      return new Response(JSON.stringify({ msg: 'invalid inputs', url:'/api/products' }), { status: 400 })
    }

    const products = await prisma.product.create({
      data: {
        name,
        description: description || null,
        price: parseFloat(price),
        quantity: parseInt(quantity, 10),
      },
    });

    return new Response(JSON.stringify({ products , url:'/api/products' }), { status: 201 })
  } catch (error) {
    return new Response(JSON.stringify({ msg: "failed", url:'/api/products' }), { status: 500 })
  }

}
