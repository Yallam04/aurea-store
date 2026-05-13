import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { currentUser } from '@clerk/nextjs/server';

const ADMIN_EMAIL = "yallam04@gmail.com";

async function verifyAdmin() {
  const user = await currentUser();
  return user?.emailAddresses[0]?.emailAddress === ADMIN_EMAIL;
}

export async function GET() {
  if (!(await verifyAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const products = await sql`SELECT * FROM products ORDER BY id DESC`;
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  if (!(await verifyAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
  const { action, payload } = await req.json();

  try {
    if (action === "ADD") {
      await sql`INSERT INTO products (name, category, material, price, image_url, bg_color, stock_quantity) 
                VALUES (${payload.name}, ${payload.category}, ${payload.material}, ${payload.price}, ${payload.image_url}, ${payload.bg_color}, ${payload.stock_quantity})`;
    } 
    else if (action === "UPDATE_PRICE") {
      await sql`UPDATE products SET price = ${payload.price} WHERE id = ${payload.id}`;
    } 
    else if (action === "UPDATE_STOCK") {
      await sql`UPDATE products SET stock_quantity = ${payload.stock_quantity} WHERE id = ${payload.id}`;
    } 
    else if (action === "DELETE") {
      await sql`DELETE FROM products WHERE id = ${payload.id}`;
    }
    // ✦ NEW: Edit now updates the material too! ✦
    else if (action === "EDIT_ITEM") {
      await sql`UPDATE products SET name = ${payload.name}, price = ${payload.price}, image_url = ${payload.image_url}, stock_quantity = ${payload.stock_quantity}, material = ${payload.material} WHERE id = ${payload.id}`;
    }
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}