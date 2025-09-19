import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const response = await fetch('https://v0-api-endpoint-request.vercel.app/api/more-products', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        return NextResponse.json(data, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
        });
    } catch (error) {
        console.error('Error fetching more products:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch more products',
                products: []
            },
            { status: 500 }
        );
    }
}
