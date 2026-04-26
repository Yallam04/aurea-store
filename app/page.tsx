import { sql } from '@/lib/db';

export default async function Storefront() {
  // 1. Securely fetch your inventory directly from the Neon database!
  const inventory = await sql`SELECT * FROM products ORDER BY id ASC`;

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-neutral-900 p-8 md:p-16 font-sans">
      
      {/* Premium Header */}
      <header className="mb-20 text-center">
        <h1 className="text-5xl md:text-6xl font-light tracking-[0.2em] text-amber-600 mb-4">
          AUREA
        </h1>
        <p className="text-neutral-500 tracking-[0.3em] uppercase text-xs">
          Fine Jewelry Collection
        </p>
      </header>

      {/* The Inventory Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {inventory.map((item) => (
          <div key={item.id} className="group cursor-pointer flex flex-col">
            
            {/* Product Image */}
            <div className="relative h-[400px] w-full mb-6 overflow-hidden rounded-sm bg-neutral-200">
              {/* Note: Using standard <img> to bypass Next.js external image domain blocks for now */}
              <img
                src={item.image_url}
                alt={item.name}
                className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-110"
              />
            </div>
            
            {/* Product Details */}
            <div className="flex flex-col flex-grow justify-between">
              <div>
                <p className="text-xs text-neutral-400 uppercase tracking-widest mb-1">
                  {item.category}
                </p>
                <h2 className="text-lg font-medium text-neutral-800 leading-snug mb-2">
                  {item.name}
                </h2>
              </div>
              <p className="text-lg text-amber-700 font-semibold mt-4">
                EGP {item.price}
              </p>
            </div>
            
            {/* Add to Cart Button (Hover effect) */}
            <button className="w-full mt-6 py-3 border border-neutral-900 text-neutral-900 uppercase tracking-widest text-xs font-semibold hover:bg-neutral-900 hover:text-white transition-colors duration-300 opacity-0 group-hover:opacity-100">
              Add to Cart
            </button>
            
          </div>
        ))}
      </div>
    </main>
  );
}