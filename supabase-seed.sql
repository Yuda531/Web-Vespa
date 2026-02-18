-- ============================================
-- VESPA ABAS — Seed Data
-- Run this in Supabase SQL Editor AFTER the schema
-- ============================================

-- =====================
-- 1. CATEGORIES
-- =====================
INSERT INTO categories (id, name, slug, description) VALUES
  ('a1000000-0000-0000-0000-000000000001', 'Sprint', 'sprint', 'Vespa Sprint series — model klasik yang sporty dan gesit.'),
  ('a1000000-0000-0000-0000-000000000002', 'PX', 'px', 'Vespa PX series — legenda sejati, kokoh dan bertenaga.'),
  ('a1000000-0000-0000-0000-000000000003', 'Primavera', 'primavera', 'Vespa Primavera — elegan, ringan, dan timeless.'),
  ('a1000000-0000-0000-0000-000000000004', 'Super', 'super', 'Vespa Super — desain ikonik tahun 60-70an.'),
  ('a1000000-0000-0000-0000-000000000005', 'VBB', 'vbb', 'Vespa VBB — body besar yang gagah dan nyaman.'),
  ('a1000000-0000-0000-0000-000000000006', 'Special', 'special', 'Vespa Special — compact dan lincah di jalanan kota.');

-- =====================
-- 2. PRODUCTS
-- =====================
INSERT INTO products (id, title, slug, description, price, year, condition, status, category_id, featured, seo_title, seo_description) VALUES
  (
    'b1000000-0000-0000-0000-000000000001',
    'Vespa Sprint 150 Tahun 1975',
    'vespa-sprint-150-1975',
    '<p>Vespa Sprint 150 tahun 1975 dalam kondisi fully restored. Mesin sudah overhaul total, body repaint dengan warna hijau olive original. Kelistrikan sudah diperbarui semua.</p><ul><li>Mesin 150cc — overhaul penuh</li><li>Body repaint hijau olive</li><li>Ban baru Mizzle</li><li>Jok kulit baru</li><li>Surat lengkap BPKB + STNK aktif</li></ul>',
    32000000, 1975, 'Restored', 'available',
    'a1000000-0000-0000-0000-000000000001',
    true,
    'Jual Vespa Sprint 150 1975 Restored | Vespa Abas',
    'Vespa Sprint 150 tahun 1975 kondisi fully restored. Mesin overhaul, body repaint original. Surat lengkap.'
  ),
  (
    'b1000000-0000-0000-0000-000000000002',
    'Vespa PX 150 Tahun 1982',
    'vespa-px-150-1982',
    '<p>Vespa PX 150 tahun 1982 kondisi original. Cat masih orisinil warna biru metalik. Mesin sehat, siap pakai harian. Koleksi langka!</p><ul><li>Mesin 150cc — sehat, siap pakai</li><li>Cat original biru metalik</li><li>Interior original</li><li>Kilometer rendah</li><li>BPKB + STNK hidup</li></ul>',
    45000000, 1982, 'Original', 'available',
    'a1000000-0000-0000-0000-000000000002',
    true,
    'Jual Vespa PX 150 1982 Original | Vespa Abas',
    'Vespa PX 150 tahun 1982 kondisi original, cat orisinil biru metalik. Mesin sehat, surat lengkap.'
  ),
  (
    'b1000000-0000-0000-0000-000000000003',
    'Vespa Primavera 125 Tahun 1974',
    'vespa-primavera-125-1974',
    '<p>Vespa Primavera 125 tahun 1974, restorasi total dengan standar tinggi. Warna cream classic yang elegan. Cocok untuk koleksi maupun daily ride.</p><ul><li>Mesin 125cc — rebuild total</li><li>Body perfect, cat cream classic</li><li>Speedometer original berfungsi</li><li>Aksesoris original</li><li>Surat lengkap</li></ul>',
    38000000, 1974, 'Restored', 'available',
    'a1000000-0000-0000-0000-000000000003',
    true,
    'Jual Vespa Primavera 125 1974 Restored | Vespa Abas',
    'Vespa Primavera 125 tahun 1974 restorasi total. Warna cream classic, mesin rebuild, surat lengkap.'
  ),
  (
    'b1000000-0000-0000-0000-000000000004',
    'Vespa Super 150 Tahun 1968',
    'vespa-super-150-1968',
    '<p>Vespa Super 150 tahun 1968 — salah satu model paling dicari kolektor. Kondisi project, cocok untuk yang ingin restorasi sendiri dengan budget terjangkau.</p><ul><li>Mesin 150cc — butuh overhaul</li><li>Body lengkap, ada karat ringan</li><li>Frame solid, tidak keropos</li><li>Suku cadang original masih ada</li><li>BPKB ada, STNK mati</li></ul>',
    18000000, 1968, 'Project', 'available',
    'a1000000-0000-0000-0000-000000000004',
    false,
    'Jual Vespa Super 150 1968 Project | Vespa Abas',
    'Vespa Super 150 tahun 1968 kondisi project. Body lengkap, frame solid. Cocok untuk restorasi.'
  ),
  (
    'b1000000-0000-0000-0000-000000000005',
    'Vespa PX 200 Tahun 1984',
    'vespa-px-200-1984',
    '<p>Vespa PX 200 tahun 1984 — mesin besar, tenaga luar biasa. Sudah direstorasi dengan warna merah racing yang mencolok. Performa mantap untuk touring.</p><ul><li>Mesin 200cc — bertenaga, sudah tune-up</li><li>Repaint merah racing</li><li>Knalpot racing</li><li>Suspensi baru</li><li>Surat lengkap aktif</li></ul>',
    52000000, 1984, 'Restored', 'available',
    'a1000000-0000-0000-0000-000000000002',
    true,
    'Jual Vespa PX 200 1984 Restored | Vespa Abas',
    'Vespa PX 200 tahun 1984 restorasi merah racing. Mesin 200cc bertenaga, cocok touring.'
  ),
  (
    'b1000000-0000-0000-0000-000000000006',
    'Vespa VBB 150 Tahun 1964',
    'vespa-vbb-150-1964',
    '<p>Vespa VBB 150 tahun 1964 — body besar yang gagah dan nyaman dikendarai. Sudah direstorasi dengan finishing premium.</p><ul><li>Mesin 150cc — overhaul lengkap</li><li>Body repair dan repaint putih susu</li><li>Chrome parts di-recoating</li><li>Jok custom kulit asli</li><li>Surat lengkap</li></ul>',
    42000000, 1964, 'Restored', 'sold',
    'a1000000-0000-0000-0000-000000000005',
    false,
    'Vespa VBB 150 1964 Restored | Vespa Abas',
    'Vespa VBB 150 tahun 1964 restorasi premium. Body besar, mesin overhaul, chrome recoating.'
  ),
  (
    'b1000000-0000-0000-0000-000000000007',
    'Vespa Special 50 Tahun 1972',
    'vespa-special-50-1972',
    '<p>Vespa Special 50 tahun 1972 — model compact yang sangat langka di Indonesia. Kondisi original, baru datang dari Italia.</p><ul><li>Mesin 50cc original</li><li>Cat original patina cantik</li><li>All parts original</li><li>Import langsung dari Italia</li><li>Surat impor lengkap</li></ul>',
    55000000, 1972, 'Original', 'reserved',
    'a1000000-0000-0000-0000-000000000006',
    true,
    'Vespa Special 50 1972 Original Import Italia | Vespa Abas',
    'Vespa Special 50 tahun 1972 original import Italia. Model langka, kondisi patina cantik.'
  ),
  (
    'b1000000-0000-0000-0000-000000000008',
    'Vespa Sprint Veloce 150 Tahun 1969',
    'vespa-sprint-veloce-150-1969',
    '<p>Vespa Sprint Veloce 150 tahun 1969 — varian paling sporty dari seri Sprint. Restorasi dengan warna kuning vintage yang cerah.</p><ul><li>Mesin 150cc Veloce — performa tinggi</li><li>Repaint kuning vintage</li><li>Stoplamp model Veloce original</li><li>Handgrip dan mirror original</li><li>BPKB + STNK aktif</li></ul>',
    48000000, 1969, 'Restored', 'available',
    'a1000000-0000-0000-0000-000000000001',
    true,
    'Vespa Sprint Veloce 150 1969 Restored | Vespa Abas',
    'Vespa Sprint Veloce 150 tahun 1969 restorasi kuning vintage. Model sporty langka.'
  );

-- =====================
-- 3. PRODUCT IMAGES (using placeholder images)
-- =====================
INSERT INTO product_images (product_id, cloudinary_public_id, url, alt_text, sort_order, is_primary) VALUES
  -- Sprint 150 1975
  ('b1000000-0000-0000-0000-000000000001', 'vespa-abas/products/sprint-150-1975-1', 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80', 'Vespa Sprint 150 1975 hijau olive tampak samping', 0, true),
  ('b1000000-0000-0000-0000-000000000001', 'vespa-abas/products/sprint-150-1975-2', 'https://images.unsplash.com/photo-1597075561367-7b5bfae2f8b6?w=800&q=80', 'Vespa Sprint 150 1975 detail mesin', 1, false),

  -- PX 150 1982
  ('b1000000-0000-0000-0000-000000000002', 'vespa-abas/products/px-150-1982-1', 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&q=80', 'Vespa PX 150 1982 biru metalik', 0, true),
  ('b1000000-0000-0000-0000-000000000002', 'vespa-abas/products/px-150-1982-2', 'https://images.unsplash.com/photo-1571078554926-da1c61716397?w=800&q=80', 'Vespa PX 150 1982 tampak belakang', 1, false),

  -- Primavera 125 1974
  ('b1000000-0000-0000-0000-000000000003', 'vespa-abas/products/primavera-125-1974-1', 'https://images.unsplash.com/photo-1600705722908-bab1e61c0529?w=800&q=80', 'Vespa Primavera 125 1974 cream classic', 0, true),

  -- Super 150 1968
  ('b1000000-0000-0000-0000-000000000004', 'vespa-abas/products/super-150-1968-1', 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&q=80', 'Vespa Super 150 1968 project', 0, true),

  -- PX 200 1984
  ('b1000000-0000-0000-0000-000000000005', 'vespa-abas/products/px-200-1984-1', 'https://images.unsplash.com/photo-1622185135505-2d795003994a?w=800&q=80', 'Vespa PX 200 1984 merah racing', 0, true),

  -- VBB 150 1964
  ('b1000000-0000-0000-0000-000000000006', 'vespa-abas/products/vbb-150-1964-1', 'https://images.unsplash.com/photo-1594950195003-1a249d977f28?w=800&q=80', 'Vespa VBB 150 1964 putih susu', 0, true),

  -- Special 50 1972
  ('b1000000-0000-0000-0000-000000000007', 'vespa-abas/products/special-50-1972-1', 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&q=80', 'Vespa Special 50 1972 original patina', 0, true),

  -- Sprint Veloce 1969
  ('b1000000-0000-0000-0000-000000000008', 'vespa-abas/products/sprint-veloce-1969-1', 'https://images.unsplash.com/photo-1599819177626-b50f9dd21c9b?w=800&q=80', 'Vespa Sprint Veloce 150 1969 kuning vintage', 0, true);

-- =====================
-- 4. SERVICES
-- =====================
INSERT INTO services (id, title, slug, description, short_description, icon, price_range, featured, sort_order, seo_title, seo_description) VALUES
  (
    'c1000000-0000-0000-0000-000000000001',
    'Restorasi Penuh',
    'restorasi-penuh',
    '<p>Layanan restorasi penuh dari kondisi apapun menjadi Vespa yang tampil seperti baru. Proses mencakup:</p><ul><li>Bongkar total seluruh komponen</li><li>Overhaul mesin lengkap</li><li>Body repair — ketok, dempul, cat</li><li>Chrome parts recoating / replating</li><li>Kelistrikan baru</li><li>Jok baru (custom atau original)</li><li>Ban dan velg baru</li><li>Aksesoris sesuai era</li></ul><p>Waktu pengerjaan: 2-4 bulan tergantung kondisi awal.</p>',
    'Restorasi total dari kondisi apapun menjadi Vespa yang tampil seperti baru.',
    'wrench',
    'Rp 15.000.000 – Rp 35.000.000',
    true, 1,
    'Layanan Restorasi Penuh Vespa Klasik | Vespa Abas',
    'Restorasi penuh Vespa klasik dari kondisi apapun. Overhaul mesin, body repair, cat, chrome, kelistrikan. Harga mulai Rp 15 juta.'
  ),
  (
    'c1000000-0000-0000-0000-000000000002',
    'Overhaul Mesin',
    'overhaul-mesin',
    '<p>Overhaul mesin Vespa 2-tak secara menyeluruh. Semua komponen dibongkar, dibersihkan, diukur, dan diganti jika aus.</p><ul><li>Bongkar mesin total</li><li>Ganti piston, ring, bearing</li><li>Rebore silinder jika perlu</li><li>Seal dan gasket baru</li><li>Karburator tuning</li><li>Setting timing dan celah klep</li><li>Test ride dan fine tuning</li></ul>',
    'Overhaul mesin Vespa 2-tak secara menyeluruh oleh mekanik berpengalaman.',
    'cog',
    'Rp 3.000.000 – Rp 8.000.000',
    true, 2,
    'Overhaul Mesin Vespa Klasik | Vespa Abas',
    'Layanan overhaul mesin Vespa 2-tak. Bongkar total, ganti komponen aus, tuning karburator. Mulai Rp 3 juta.'
  ),
  (
    'c1000000-0000-0000-0000-000000000003',
    'Body Repair & Cat',
    'body-repair-cat',
    '<p>Perbaikan body Vespa dari penyok ringan hingga penggantian panel. Proses pengecatan menggunakan cat berkualitas tinggi dengan pilihan warna sesuai keinginan.</p><ul><li>Ketok body dan panel</li><li>Las dan patri jika perlu</li><li>Dempul dan penghalusan</li><li>Epoxy primer</li><li>Cat 2 lapis + clear coat</li><li>Pilihan warna custom atau original</li></ul>',
    'Perbaikan body dan pengecatan ulang dengan standar tinggi.',
    'paintbrush',
    'Rp 5.000.000 – Rp 12.000.000',
    true, 3,
    'Body Repair & Cat Vespa Klasik | Vespa Abas',
    'Body repair dan cat ulang Vespa klasik. Ketok, dempul, cat 2 lapis + clear coat. Warna custom atau original.'
  ),
  (
    'c1000000-0000-0000-0000-000000000004',
    'Servis Berkala',
    'servis-berkala',
    '<p>Perawatan rutin agar Vespa Anda tetap dalam kondisi prima. Direkomendasikan setiap 3.000 km atau 3 bulan.</p><ul><li>Ganti oli transmisi</li><li>Bersih & setting karburator</li><li>Cek kelistrikan</li><li>Cek rem dan kabel</li><li>Grease bearing roda</li><li>Cek ban dan tekanan angin</li><li>General check-up</li></ul>',
    'Perawatan rutin agar Vespa Anda tetap prima. Setiap 3.000 km atau 3 bulan.',
    'clipboard-check',
    'Rp 300.000 – Rp 800.000',
    false, 4,
    'Servis Berkala Vespa Klasik | Vespa Abas',
    'Servis berkala Vespa klasik. Ganti oli, setting karburator, cek kelistrikan, rem, dan general check-up.'
  ),
  (
    'c1000000-0000-0000-0000-000000000005',
    'Kelistrikan & Wiring',
    'kelistrikan-wiring',
    '<p>Perbaikan dan penggantian sistem kelistrikan Vespa. Dari perbaikan ringan hingga rewiring total.</p><ul><li>Diagnosa masalah kelistrikan</li><li>Rewiring harness baru</li><li>Ganti stator dan regulator</li><li>Perbaikan/ganti CDI/coil</li><li>Instalasi lampu LED (opsional)</li><li>Klakson dan sein</li></ul>',
    'Perbaikan dan penggantian sistem kelistrikan Vespa dari ringan hingga rewiring total.',
    'zap',
    'Rp 500.000 – Rp 3.000.000',
    false, 5,
    'Kelistrikan & Wiring Vespa Klasik | Vespa Abas',
    'Perbaikan kelistrikan Vespa klasik. Rewiring, stator, CDI, lampu. Diagnosa akurat oleh ahli.'
  ),
  (
    'c1000000-0000-0000-0000-000000000006',
    'Chrome Replating',
    'chrome-replating',
    '<p>Layanan chrome replating untuk mengembalikan kilau komponen Vespa Anda. Proses dilakukan oleh partner chrome terpercaya.</p><ul><li>Bumper depan & belakang</li><li>Rack / carrier</li><li>Side stand & center stand</li><li>Handle bar</li><li>Mirror</li><li>Aksesoris chrome lainnya</li></ul><p>Waktu pengerjaan: 2-3 minggu per batch.</p>',
    'Chrome replating untuk mengembalikan kilau komponen Vespa Anda.',
    'sparkles',
    'Rp 1.000.000 – Rp 5.000.000',
    false, 6,
    'Chrome Replating Vespa Klasik | Vespa Abas',
    'Layanan chrome replating komponen Vespa. Bumper, rack, handle bar, mirror. Hasil berkilau seperti baru.'
  );

-- =====================
-- 5. TESTIMONIALS
-- =====================
INSERT INTO testimonials (customer_name, content, rating, is_visible) VALUES
  (
    'Ahmad Rizky',
    'Vespa Sprint saya direstorasi di sini, hasilnya luar biasa! Mesinnya halus, catnya mulus, dan detailnya sangat diperhatikan. Harga juga reasonable dibanding bengkel lain. Highly recommended!',
    5, true
  ),
  (
    'Budi Santoso',
    'Beli Vespa PX dari Vespa Abas, kondisinya sesuai deskripsi. Owner-nya ramah dan jujur soal kondisi unit. Proses transaksi juga mudah dan aman.',
    5, true
  ),
  (
    'Dewi Kartika',
    'Suami saya sangat senang dengan Vespa Primavera yang kami beli sebagai hadiah ulang tahun. Kualitas restorasinya premium banget. Terima kasih Vespa Abas!',
    5, true
  ),
  (
    'Fikri Haikal',
    'Servis berkala di sini sudah 3 kali, mekaniknya paham banget soal Vespa klasik. Beda sama bengkel umum yang asal-asalan. Vespa saya jadi makin enak dikendarai.',
    4, true
  ),
  (
    'Galih Pratama',
    'Overhaul mesin PX 200 saya di sini. Hasilnya tarikan jadi enteng, suara mesin halus. Mekaniknya teliti dan mau jelasin apa aja yang dikerjain. Top!',
    5, true
  ),
  (
    'Hendra Wijaya',
    'Chrome replating bumper dan rack Vespa saya hasilnya kinclong banget. Memang agak lama prosesnya tapi worth the wait. Vespa jadi makin ganteng.',
    4, true
  ),
  (
    'Indra Permana',
    'Saya beli Vespa project dari sini, dan minta direstorasi juga di sini. Transparansi harga bagus, selalu dikasih update progress lewat WhatsApp. Puas banget sama hasilnya.',
    5, true
  ),
  (
    'Joni Setiawan',
    'Body repair dan cat ulang Vespa Super saya. Warna custom yang saya mau bisa diwujudkan persis seperti referensi. Catnya tebal dan mengkilap. Mantap!',
    5, true
  );

-- =====================
-- 6. SITE SETTINGS
-- =====================
INSERT INTO site_settings (key, value) VALUES
  ('site_title', 'Vespa Abas'),
  ('site_description', 'Jual beli dan restorasi Vespa klasik berkualitas. Temukan Vespa impian Anda.'),
  ('whatsapp_number', '6281380625291'),
  ('address', 'Indonesia');
