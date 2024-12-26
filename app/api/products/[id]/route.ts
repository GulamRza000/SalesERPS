import prisma from '@/app/lib/prisma';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    if (typeof id !== 'string') {
        return new Response(JSON.stringify({ msg: 'invalid inputs', id, url: '/api/products' }), { status: 400 })
    }

    try {
        const product = await prisma.product.findUnique({
            where: { id },
        });

        if (!product)
            return new Response(JSON.stringify({ msg: "failed", url: '/api/products' }), { status: 500 })
        return new Response(JSON.stringify({ product, url: '/api/products' }), { status: 200 })

    } catch (error) {
        return new Response(JSON.stringify({ msg: "failed", url: '/api/products' }), { status: 500 })
    }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    if (typeof id !== 'string') {
        return new Response(
            JSON.stringify({ msg: 'Invalid product ID', id, url: '/api/products' }),
            { status: 400 }
        );
    }

    try {
        const body = await request.json();
        const { name, description, price, quantity } = body;

        // Make sure required fields are provided
        if (!name || price == null || quantity == null) {
            return new Response(
                JSON.stringify({ msg: 'Missing required fields', url: '/api/products' }),
                { status: 400 }
            );
        }

        const updatedProduct = await prisma.product.update({
            where: { id },
            data: {
                name,
                description: description || null,
                price: parseFloat(price),
                quantity: parseInt(quantity, 10),
            },
        });

        return new Response(
            JSON.stringify({ updatedProduct, url: '/api/products' }),
            { status: 200 }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ msg: 'Failed to update product', url: '/api/products' }),
            { status: 500 }
        );
    }
}


export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    if (typeof id !== 'string') {
        return new Response(
            JSON.stringify({ msg: 'Invalid product ID', id, url: '/api/products' }),
            { status: 400 }
        );
    }

    try {
        await prisma.product.delete({
            where: { id },
        });

        return new Response(
            JSON.stringify({ msg: 'Product deleted successfully', url: '/api/products' }),
            { status: 204 } // No Content
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ msg: 'Failed to delete product', url: '/api/products' }),
            { status: 500 }
        );
    }
}
