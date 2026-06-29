// Plain JS seed — runs inside the app container using pg directly
import { Pool } from '/app/node_modules/pg/lib/index.js';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const products = [
  { id: 'seed-p1', slug: 'paket-camilan-bawang-kemasan-box-200g', nameId: 'Paket Camilan Bawang Kemasan Box 200g', nameEn: 'Onion Snack Package Box 200g', descriptionId: 'Paket camilan bawang goreng premium dalam kemasan box eksklusif 200g.', descriptionEn: 'Premium fried onion snack package in exclusive 200g box packaging.', price: 30000, weight: 250, category: 'bawang-merah', imageUrl: '/products/camilan-bawang-merah-box.jpg', isActive: true, sortOrder: 1, whatsappText: null, keywords: 'fried shallots, fried shallot snack, crispy shallots, Indonesian fried shallots, bawang goreng merah, fried onion box, premium shallots Indonesia, bawang merah goreng, hunay' },
  { id: 'seed-p2', slug: 'camilan-bawang-kemasan-pouch-125gr', nameId: 'Camilan Bawang Kemasan Pouch 125gr', nameEn: 'Onion Snack Pouch 125gr', descriptionId: 'Bawang goreng renyah dalam kemasan pouch praktis 125gr.', descriptionEn: 'Crispy fried onion in a convenient 125gr pouch packaging.', price: 25000, weight: 150, category: 'bawang-merah', imageUrl: '/products/camilan-bawang-merah-pouch.jpg', isActive: true, sortOrder: 2, whatsappText: null, keywords: 'fried shallots pouch, crispy fried shallots, fried onion snack, Indonesian shallots, bawang goreng merah, bawang merah goreng, premium fried onion, hunay, halal' },
  { id: 'seed-p3', slug: 'bawang-putih-goreng-toples-150gr', nameId: 'Bawang Putih Goreng Toples 150gr', nameEn: 'Fried Garlic Jar 150gr', descriptionId: 'Bawang putih goreng premium dalam toples kaca 150gr, renyah dan tahan lama.', descriptionEn: 'Premium fried garlic in a 150gr glass jar, crispy and long-lasting.', price: 35000, weight: 300, category: 'bawang-putih', imageUrl: '/products/bawang-putih-goreng-toples-150.jpg', isActive: true, sortOrder: 3, whatsappText: null, keywords: 'fried garlic, crispy fried garlic, Indonesian fried garlic, garlic flakes, bawang putih goreng, bawang goreng putih, premium garlic Indonesia, garlic jar, hunay, halal' },
  { id: 'seed-p4', slug: 'bawang-merah-goreng-toples-150gr', nameId: 'Bawang Merah Goreng Toples 150gr', nameEn: 'Fried Shallot Jar 150gr', descriptionId: 'Bawang merah goreng premium dalam toples kaca 150gr, gurih dan harum.', descriptionEn: 'Premium fried shallot in a 150gr glass jar, savory and aromatic.', price: 35000, weight: 300, category: 'bawang-merah', imageUrl: '/products/bawang-merah-goreng-toples-150.jpg', isActive: true, sortOrder: 4, whatsappText: null, keywords: 'fried shallots jar, fried shallots, crispy shallots, Indonesian fried shallots, bawang merah goreng, bawang goreng merah, premium shallots Indonesia, shallot flakes, hunay, halal' },
  { id: 'seed-p5', slug: 'bawang-putih-goreng-pouch-100gr', nameId: 'Bawang Putih Goreng Pouch 100gr', nameEn: 'Fried Garlic Pouch 100gr', descriptionId: 'Bawang putih goreng dalam kemasan pouch 100gr, praktis untuk dibawa.', descriptionEn: 'Fried garlic in a 100gr pouch, convenient to carry.', price: 25000, weight: 120, category: 'bawang-putih', imageUrl: '/products/bawang-putih-goreng-pouch.jpg', isActive: true, sortOrder: 5, whatsappText: null, keywords: 'fried garlic pouch, crispy garlic, Indonesian fried garlic, garlic flakes, bawang putih goreng, bawang goreng putih, premium garlic Indonesia, hunay, halal' },
  { id: 'seed-p6', slug: 'aneka-sambal-hunay', nameId: 'Aneka Sambal Hunay', nameEn: 'Hunay Sambal Varieties', descriptionId: 'Koleksi sambal autentik Hunay dengan berbagai pilihan rasa pedas.', descriptionEn: "Hunay's authentic sambal collection with various spicy flavor options.", price: 25000, weight: 200, category: 'sambal', imageUrl: '/products/sambel-geprek-pedas.jpg', isActive: true, sortOrder: 6, whatsappText: null, keywords: 'sambal Indonesia, Indonesian chili sauce, spicy sambal, authentic sambal, hunay sambal, Indonesian condiment, sambal goreng, halal' },
  { id: 'seed-p7', slug: 'bawang-putih-botol-75gr', nameId: 'Bawang Putih Botol 75gr', nameEn: 'Garlic Bottle 75gr', descriptionId: 'Bawang putih goreng dalam kemasan botol 75gr, cocok untuk oleh-oleh.', descriptionEn: 'Fried garlic in a 75gr bottle, perfect as a souvenir.', price: 20000, weight: 200, category: 'bawang-putih', imageUrl: '/products/bawang-putih-goreng-botol.jpg', isActive: true, sortOrder: 7, whatsappText: null, keywords: 'fried garlic bottle, garlic souvenir, crispy garlic, Indonesian fried garlic, bawang putih goreng, garlic flakes, premium garlic, hunay, halal, oleh-oleh' },
  { id: 'seed-p8', slug: 'bawang-merah-goreng-pouch-100gr', nameId: 'Bawang Merah Goreng Pouch 100gr', nameEn: 'Fried Shallot Pouch 100gr', descriptionId: 'Bawang merah goreng dalam kemasan pouch 100gr, renyah dan gurih.', descriptionEn: 'Fried shallot in a 100gr pouch, crispy and savory.', price: 25000, weight: 120, category: 'bawang-merah', imageUrl: '/products/bawang-merah-goreng-pouch.jpg', isActive: true, sortOrder: 8, whatsappText: null, keywords: 'fried shallots, fried shallots pouch, crispy shallots, Indonesian fried shallots, bawang merah goreng, bawang goreng merah, shallot flakes, premium fried onion, hunay, halal' },
];

const sql = `
  INSERT INTO products (id, slug, name_id, name_en, description_id, description_en, price, weight, category, image_url, is_active, sort_order, whatsapp_text, keywords, created_at, updated_at)
  VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,NOW(),NOW())
  ON CONFLICT (id) DO UPDATE SET
    slug=EXCLUDED.slug, name_id=EXCLUDED.name_id, name_en=EXCLUDED.name_en,
    description_id=EXCLUDED.description_id, description_en=EXCLUDED.description_en,
    price=EXCLUDED.price, weight=EXCLUDED.weight, category=EXCLUDED.category,
    image_url=EXCLUDED.image_url, is_active=EXCLUDED.is_active,
    sort_order=EXCLUDED.sort_order, whatsapp_text=EXCLUDED.whatsapp_text,
    keywords=EXCLUDED.keywords, updated_at=NOW()
`;

async function main() {
  const client = await pool.connect();
  try {
    console.log('Seeding products...');
    for (const p of products) {
      await client.query(sql, [p.id, p.slug, p.nameId, p.nameEn, p.descriptionId, p.descriptionEn, p.price, p.weight, p.category, p.imageUrl, p.isActive, p.sortOrder, p.whatsappText, p.keywords]);
      console.log(`  ✓ ${p.nameId}`);
    }
    console.log(`\nDone! ${products.length} produk berhasil di-seed.`);
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch(e => { console.error(e); process.exit(1); });
