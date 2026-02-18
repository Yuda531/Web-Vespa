-- ============================================
-- VESPA ABAS — Database Schema
-- Run this in Supabase SQL Editor BEFORE the seed data
-- ============================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================
-- 1. CATEGORIES
-- =====================
CREATE TABLE categories (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name       TEXT NOT NULL,
  slug       TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_categories_slug ON categories (slug);

-- =====================
-- 2. PRODUCTS
-- =====================
CREATE TABLE products (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title             TEXT NOT NULL,
  slug              TEXT NOT NULL UNIQUE,
  description       TEXT,
  price             BIGINT,
  year              INT,
  condition         TEXT CHECK (condition IN ('Restored', 'Original', 'Project')),
  status            TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'sold', 'reserved')),
  category_id       UUID REFERENCES categories(id) ON DELETE SET NULL,
  whatsapp_message  TEXT,
  seo_title         TEXT,
  seo_description   TEXT,
  featured          BOOLEAN NOT NULL DEFAULT false,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_products_slug ON products (slug);
CREATE INDEX idx_products_status ON products (status);
CREATE INDEX idx_products_featured ON products (featured) WHERE featured = true;
CREATE INDEX idx_products_category_id ON products (category_id);
CREATE INDEX idx_products_created_at ON products (created_at DESC);

-- =====================
-- 3. PRODUCT IMAGES
-- =====================
CREATE TABLE product_images (
  id                   UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id           UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  cloudinary_public_id TEXT NOT NULL,
  url                  TEXT NOT NULL,
  alt_text             TEXT,
  sort_order           INT NOT NULL DEFAULT 0,
  is_primary           BOOLEAN NOT NULL DEFAULT false
);

CREATE INDEX idx_product_images_product_id ON product_images (product_id);
CREATE INDEX idx_product_images_primary ON product_images (product_id) WHERE is_primary = true;

-- =====================
-- 4. SERVICES
-- =====================
CREATE TABLE services (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title             TEXT NOT NULL,
  slug              TEXT NOT NULL UNIQUE,
  description       TEXT,
  short_description TEXT,
  icon              TEXT,
  price_range       TEXT,
  whatsapp_message  TEXT,
  seo_title         TEXT,
  seo_description   TEXT,
  featured          BOOLEAN NOT NULL DEFAULT false,
  sort_order        INT NOT NULL DEFAULT 0,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_services_slug ON services (slug);
CREATE INDEX idx_services_featured ON services (featured) WHERE featured = true;
CREATE INDEX idx_services_sort_order ON services (sort_order);

-- =====================
-- 5. SERVICE IMAGES
-- =====================
CREATE TABLE service_images (
  id                   UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_id           UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  cloudinary_public_id TEXT NOT NULL,
  url                  TEXT NOT NULL,
  alt_text             TEXT,
  sort_order           INT NOT NULL DEFAULT 0,
  is_primary           BOOLEAN NOT NULL DEFAULT false
);

CREATE INDEX idx_service_images_service_id ON service_images (service_id);

-- =====================
-- 6. TESTIMONIALS
-- =====================
CREATE TABLE testimonials (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_name TEXT NOT NULL,
  content       TEXT NOT NULL,
  rating        INT NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  avatar_url    TEXT,
  is_visible    BOOLEAN NOT NULL DEFAULT true,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_testimonials_visible ON testimonials (is_visible, created_at DESC) WHERE is_visible = true;

-- =====================
-- 7. SITE SETTINGS (key-value store)
-- =====================
CREATE TABLE site_settings (
  key        TEXT PRIMARY KEY,
  value      TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =====================
-- TRIGGERS
-- =====================

-- Auto-update updated_at on products
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Auto-update updated_at on site_settings
CREATE TRIGGER trg_site_settings_updated_at
  BEFORE UPDATE ON site_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Ensure only one primary image per product
CREATE OR REPLACE FUNCTION ensure_single_primary_product_image()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_primary = true THEN
    UPDATE product_images
    SET is_primary = false
    WHERE product_id = NEW.product_id AND id != NEW.id AND is_primary = true;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_product_images_single_primary
  BEFORE INSERT OR UPDATE ON product_images
  FOR EACH ROW
  WHEN (NEW.is_primary = true)
  EXECUTE FUNCTION ensure_single_primary_product_image();

-- Ensure only one primary image per service
CREATE OR REPLACE FUNCTION ensure_single_primary_service_image()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_primary = true THEN
    UPDATE service_images
    SET is_primary = false
    WHERE service_id = NEW.service_id AND id != NEW.id AND is_primary = true;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_service_images_single_primary
  BEFORE INSERT OR UPDATE ON service_images
  FOR EACH ROW
  WHEN (NEW.is_primary = true)
  EXECUTE FUNCTION ensure_single_primary_service_image();


-- =====================
-- ROW LEVEL SECURITY (RLS)
-- =====================

-- Enable RLS on all tables
ALTER TABLE categories     ENABLE ROW LEVEL SECURITY;
ALTER TABLE products       ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE services       ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials   ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings  ENABLE ROW LEVEL SECURITY;

-- -------------------------------------------
-- PUBLIC READ policies (for anon + authenticated)
-- Anyone can read all public data
-- -------------------------------------------
CREATE POLICY "categories_read" ON categories
  FOR SELECT USING (true);

CREATE POLICY "products_read" ON products
  FOR SELECT USING (true);

CREATE POLICY "product_images_read" ON product_images
  FOR SELECT USING (true);

CREATE POLICY "services_read" ON services
  FOR SELECT USING (true);

CREATE POLICY "service_images_read" ON service_images
  FOR SELECT USING (true);

CREATE POLICY "testimonials_read" ON testimonials
  FOR SELECT USING (true);

CREATE POLICY "site_settings_read" ON site_settings
  FOR SELECT USING (true);

-- -------------------------------------------
-- AUTHENTICATED WRITE policies (admin only)
-- Only authenticated users (admin) can insert/update/delete
-- -------------------------------------------

-- Categories
CREATE POLICY "categories_insert" ON categories
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "categories_update" ON categories
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "categories_delete" ON categories
  FOR DELETE TO authenticated USING (true);

-- Products
CREATE POLICY "products_insert" ON products
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "products_update" ON products
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "products_delete" ON products
  FOR DELETE TO authenticated USING (true);

-- Product Images
CREATE POLICY "product_images_insert" ON product_images
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "product_images_update" ON product_images
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "product_images_delete" ON product_images
  FOR DELETE TO authenticated USING (true);

-- Services
CREATE POLICY "services_insert" ON services
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "services_update" ON services
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "services_delete" ON services
  FOR DELETE TO authenticated USING (true);

-- Service Images
CREATE POLICY "service_images_insert" ON service_images
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "service_images_update" ON service_images
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "service_images_delete" ON service_images
  FOR DELETE TO authenticated USING (true);

-- Testimonials
CREATE POLICY "testimonials_insert" ON testimonials
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "testimonials_update" ON testimonials
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "testimonials_delete" ON testimonials
  FOR DELETE TO authenticated USING (true);

-- Site Settings
CREATE POLICY "site_settings_insert" ON site_settings
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "site_settings_update" ON site_settings
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "site_settings_delete" ON site_settings
  FOR DELETE TO authenticated USING (true);
