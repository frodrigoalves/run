'use server';

// This file is intentionally left blank to disable the API route
// and allow deployment on the Firebase Spark plan.

export async function GET() {
    return new Response(JSON.stringify([]), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}

export async function POST(req: Request) {
     return new Response(JSON.stringify({ message: 'Submission temporarily disabled' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}
