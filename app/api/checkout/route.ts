import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { currentUser } from '@clerk/nextjs/server';
import { sql } from '@/lib/db'; // ✦ NEW: Import the database

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { cart, subtotal } = await req.json();
    const user = await currentUser();
    const customerEmail = user?.emailAddresses[0]?.emailAddress;

    if (!customerEmail) {
      return NextResponse.json({ error: "You must be logged in to checkout." }, { status: 401 });
    }

    // ✦ NEW: Deduct the purchased quantity from the database ✦
    for (const item of cart) {
      await sql`UPDATE products SET stock_quantity = stock_quantity - ${item.qty} WHERE id = ${item.id}`;
    }

    const itemsHtml = cart.map((item: any) => 
      `<li style="margin-bottom: 10px; border-bottom: 1px solid #eee; padding-bottom: 10px;">
        <strong>${item.qty}x ${item.name}</strong><br/>
        <span style="color: #666;">${item.material}</span><br/>
        <span>EGP ${(item.price * item.qty).toLocaleString()}</span>
      </li>`
    ).join('');

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev', 
      to: customerEmail, 
      subject: 'Your Auréa Jewelry Order Confirmation',
      html: `
        <div style="font-family: 'Helvetica Neue', sans-serif; max-width: 600px; margin: 0 auto; color: #1f1d1a;">
          <h1 style="font-style: italic; font-weight: 300; color: #1f1d1a;">Thank you for your purchase.</h1>
          <ul style="list-style: none; padding: 0; margin: 30px 0;">${itemsHtml}</ul>
          <div style="border-top: 2px solid #C9A84C; padding-top: 20px; margin-top: 20px;">
            <h3>Total: EGP ${subtotal.toLocaleString()}</h3>
          </div>
        </div>
      `
    });

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Critical Server Error" }, { status: 500 });
  }
}