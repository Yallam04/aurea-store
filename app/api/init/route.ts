import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET() {
  try {
    // 1. Drop the old table and create a new one that supports your custom fields!
    await sql`DROP TABLE IF EXISTS products;`;
    
    await sql`
      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        material VARCHAR(100) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        bg_color VARCHAR(20) NOT NULL,
        image_url TEXT NOT NULL
      );
    `;

    // 2. Insert all 20 of your items 
    await sql`
      INSERT INTO products (name, category, material, price, bg_color, image_url)
      VALUES 
        -- MEN'S COLLECTION
        ('Atlas Chain', 'Men', 'Sterling Silver', 5800.00, '#2D2A25', 'https://images.unsplash.com/photo-1599643478524-fb66f7fa3115?auto=format&fit=crop&q=80&w=800'),
        ('Obsidian Ring', 'Men', '18k Gold', 6200.00, '#3E3A33', 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&q=80&w=800'),
        ('Forge Bracelet', 'Men', 'Sterling Silver', 4500.00, '#1E1C1A', 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800'),
        ('Summit Cuff', 'Men', '18k Gold', 7800.00, '#2A2620', 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800'),
        ('Ridge Pendant', 'Men', 'Sterling Silver', 3200.00, '#343028', 'https://images.unsplash.com/photo-1599643478524-fb66f7fa3115?auto=format&fit=crop&q=80&w=800'),
        ('Dusk Signet', 'Men', 'Gold & Silver', 8400.00, '#241F18', 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&q=80&w=800'),
        ('Iron Cross Ring', 'Men', 'Sterling Silver', 4100.00, '#2E2B26', 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&q=80&w=800'),
        ('Onyx Bracelet', 'Men', '18k Gold', 6900.00, '#383430', 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800'),
        ('Midnight Chain', 'Men', 'Sterling Silver', 5200.00, '#1A1814', 'https://images.unsplash.com/photo-1599643478524-fb66f7fa3115?auto=format&fit=crop&q=80&w=800'),
        ('Titan Cuff', 'Men', 'Gold & Silver', 9100.00, '#302C24', 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800'),
        
        -- WOMEN'S COLLECTION
        ('Luna Ring', 'Women', '18k Gold', 4200.00, '#E8DDD0', 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&q=80&w=800'),
        ('Celeste Necklace', 'Women', 'Sterling Silver', 3100.00, '#D8D0C8', 'https://images.unsplash.com/photo-1599643478524-fb66f7fa3115?auto=format&fit=crop&q=80&w=800'),
        ('Aurora Earrings', 'Women', '18k Gold', 2800.00, '#E2D8CC', 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800'),
        ('Soleil Bracelet', 'Women', 'Gold & Silver', 5600.00, '#D0C8BC', 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800'),
        ('Iris Cuff', 'Women', 'Sterling Silver', 3900.00, '#DDD8D0', 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800'),
        ('Nova Pendant', 'Women', '18k Gold', 4800.00, '#E8E0D4', 'https://images.unsplash.com/photo-1599643478524-fb66f7fa3115?auto=format&fit=crop&q=80&w=800'),
        ('Dune Earrings', 'Women', 'Sterling Silver', 2200.00, '#D4CEC4', 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800'),
        ('Ember Ring', 'Women', '18k Gold', 5100.00, '#EAE0D2', 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&q=80&w=800'),
        ('Pearl Drop Necklace', 'Women', 'Gold & Pearl', 6400.00, '#E0D8CE', 'https://images.unsplash.com/photo-1599643478524-fb66f7fa3115?auto=format&fit=crop&q=80&w=800'),
        ('Sable Bangle', 'Women', 'Sterling Silver', 3300.00, '#D8D2C8', 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800');
    `;

    return NextResponse.json({ message: "Aurea database upgraded and stocked with 20 new items!" });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Failed to initialize database" }, { status: 500 });
  }
}