import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET() {
  try {
    // 1. Wipe the slate clean to upgrade to the 40-item layout
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

    // 2. Inject all 40 items perfectly mapped to your local image files
    await sql`
      INSERT INTO products (name, category, material, price, bg_color, image_url)
      VALUES 
        -- MEN'S COLLECTION (Images 1-20)
        ('Atlas Chain', 'Men', 'Sterling Silver', 5800.00, '#2D2A25', '/Images/Men/1.jpg'),
        ('Obsidian Ring', 'Men', '18k Gold', 6200.00, '#3E3A33', '/Images/Men/2.jpg'),
        ('Forge Bracelet', 'Men', 'Sterling Silver', 4500.00, '#1E1C1A', '/Images/Men/3.jpg'),
        ('Summit Cuff', 'Men', '18k Gold', 7800.00, '#2A2620', '/Images/Men/4.jpg'),
        ('Ridge Pendant', 'Men', 'Sterling Silver', 3200.00, '#343028', '/Images/Men/5.jpg'),
        ('Dusk Signet', 'Men', 'Gold & Silver', 8400.00, '#241F18', '/Images/Men/6.jpg'),
        ('Iron Cross Ring', 'Men', 'Sterling Silver', 4100.00, '#2E2B26', '/Images/Men/7.jpg'),
        ('Onyx Bracelet', 'Men', '18k Gold', 6900.00, '#383430', '/Images/Men/8.jpg'),
        ('Midnight Chain', 'Men', 'Sterling Silver', 5200.00, '#1A1814', '/Images/Men/9.jpg'),
        ('Titan Cuff', 'Men', 'Gold & Silver', 9100.00, '#302C24', '/Images/Men/10.jpg'),
        ('Valor Dog Tag', 'Men', 'Sterling Silver', 3600.00, '#2D2A25', '/Images/Men/11.jpg'),
        ('Stealth Ring', 'Men', 'Matte Black Steel', 2900.00, '#1E1C1A', '/Images/Men/12.jpg'),
        ('Apex Link Bracelet', 'Men', '18k Gold', 8200.00, '#3E3A33', '/Images/Men/13.jpg'),
        ('Horizon Pendant', 'Men', 'Sterling Silver', 4100.00, '#2A2620', '/Images/Men/14.jpg'),
        ('Monolith Signet', 'Men', 'Gold & Silver', 7500.00, '#343028', '/Images/Men/15.jpg'),
        ('Vanguard Cuff', 'Men', '18k Gold', 9500.00, '#241F18', '/Images/Men/16.jpg'),
        ('Crucible Ring', 'Men', 'Sterling Silver', 3300.00, '#2E2B26', '/Images/Men/17.jpg'),
        ('Aegis Bracelet', 'Men', 'Matte Black Steel', 4800.00, '#383430', '/Images/Men/18.jpg'),
        ('Zenith Chain', 'Men', '18k Gold', 11200.00, '#1A1814', '/Images/Men/19.jpg'),
        ('Echo Pendant', 'Men', 'Sterling Silver', 3900.00, '#302C24', '/Images/Men/20.jpg'),

        -- WOMEN'S COLLECTION (Images 1-20)
        ('Luna Ring', 'Women', '18k Gold', 4200.00, '#E8DDD0', '/Images/Woman/1.jpg'),
        ('Celeste Necklace', 'Women', 'Sterling Silver', 3100.00, '#D8D0C8', '/Images/Woman/2.jpg'),
        ('Aurora Earrings', 'Women', '18k Gold', 2800.00, '#E2D8CC', '/Images/Woman/3.jpg'),
        ('Soleil Bracelet', 'Women', 'Gold & Silver', 5600.00, '#D0C8BC', '/Images/Woman/4.jpg'),
        ('Iris Cuff', 'Women', 'Sterling Silver', 3900.00, '#DDD8D0', '/Images/Woman/5.jpg'),
        ('Nova Pendant', 'Women', '18k Gold', 4800.00, '#E8E0D4', '/Images/Woman/6.jpg'),
        ('Dune Earrings', 'Women', 'Sterling Silver', 2200.00, '#D4CEC4', '/Images/Woman/7.jpg'),
        ('Ember Ring', 'Women', '18k Gold', 5100.00, '#EAE0D2', '/Images/Woman/8.jpg'),
        ('Pearl Drop Necklace', 'Women', 'Gold & Pearl', 6400.00, '#E0D8CE', '/Images/Woman/9.jpg'),
        ('Sable Bangle', 'Women', 'Sterling Silver', 3300.00, '#D8D2C8', '/Images/Woman/10.jpg'),
        ('Aria Choker', 'Women', '18k Gold', 7200.00, '#E8DDD0', '/Images/Woman/11.jpg'),
        ('Lotus Studs', 'Women', 'Sterling Silver', 1900.00, '#D8D0C8', '/Images/Woman/12.jpg'),
        ('Seraph Ring', 'Women', 'Rose Gold', 5500.00, '#E2D8CC', '/Images/Woman/13.jpg'),
        ('Stella Bracelet', 'Women', 'Sterling Silver', 4100.00, '#D0C8BC', '/Images/Woman/14.jpg'),
        ('Halo Pendant', 'Women', '18k Gold', 8900.00, '#DDD8D0', '/Images/Woman/15.jpg'),
        ('Isla Drop Earrings', 'Women', 'Gold & Pearl', 3800.00, '#E8E0D4', '/Images/Woman/16.jpg'),
        ('Vesper Ring', 'Women', 'Sterling Silver', 2600.00, '#D4CEC4', '/Images/Woman/17.jpg'),
        ('Lyra Chain', 'Women', '18k Gold', 6100.00, '#EAE0D2', '/Images/Woman/18.jpg'),
        ('Eden Bangle', 'Women', 'Rose Gold', 4900.00, '#E0D8CE', '/Images/Woman/19.jpg'),
        ('Clara Studs', 'Women', 'Diamond & Silver', 9200.00, '#D8D2C8', '/Images/Woman/20.jpg');
    `;

    return NextResponse.json({ message: "Aurea database successfully stocked with 40 items!" });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Failed to initialize database" }, { status: 500 });
  }
}