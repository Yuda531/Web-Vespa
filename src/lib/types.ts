// TypeScript interfaces for the Vespa application

export interface Category {
	id: string;
	name: string;
	slug: string;
	description: string | null;
	created_at: string;
}

export interface Product {
	id: string;
	title: string;
	slug: string;
	description: string | null;
	price: number | null;
	year: number | null;
	condition: 'Restored' | 'Original' | 'Project' | string;
	status: 'available' | 'sold' | 'reserved';
	category_id: string | null;
	whatsapp_message: string | null;
	seo_title: string | null;
	seo_description: string | null;
	featured: boolean;
	created_at: string;
	updated_at: string;
	// Joined
	category?: Category;
	images?: ProductImage[];
}

export interface ProductImage {
	id: string;
	product_id: string;
	cloudinary_public_id: string;
	url: string;
	alt_text: string | null;
	sort_order: number;
	is_primary: boolean;
}

export interface Service {
	id: string;
	title: string;
	slug: string;
	description: string | null;
	short_description: string | null;
	icon: string | null;
	price_range: string | null;
	whatsapp_message: string | null;
	seo_title: string | null;
	seo_description: string | null;
	featured: boolean;
	sort_order: number;
	created_at: string;
	// Joined
	images?: ServiceImage[];
}

export interface ServiceImage {
	id: string;
	service_id: string;
	cloudinary_public_id: string;
	url: string;
	alt_text: string | null;
	sort_order: number;
	is_primary: boolean;
}

export interface Testimonial {
	id: string;
	customer_name: string;
	content: string;
	rating: number;
	avatar_url: string | null;
	is_visible: boolean;
	created_at: string;
}

export interface SiteSetting {
	key: string;
	value: string;
	updated_at: string;
}

// Database type for Supabase client
export interface Database {
	public: {
		Tables: {
			categories: {
				Row: Category;
				Insert: Omit<Category, 'id' | 'created_at'> & { id?: string; created_at?: string };
				Update: Partial<Omit<Category, 'id'>>;
			};
			products: {
				Row: Product;
				Insert: Omit<Product, 'id' | 'created_at' | 'updated_at' | 'category' | 'images'> & {
					id?: string;
					created_at?: string;
					updated_at?: string;
				};
				Update: Partial<Omit<Product, 'id' | 'category' | 'images'>>;
			};
			product_images: {
				Row: ProductImage;
				Insert: Omit<ProductImage, 'id'> & { id?: string };
				Update: Partial<Omit<ProductImage, 'id'>>;
			};
			services: {
				Row: Service;
				Insert: Omit<Service, 'id' | 'created_at' | 'images'> & {
					id?: string;
					created_at?: string;
				};
				Update: Partial<Omit<Service, 'id' | 'images'>>;
			};
			service_images: {
				Row: ServiceImage;
				Insert: Omit<ServiceImage, 'id'> & { id?: string };
				Update: Partial<Omit<ServiceImage, 'id'>>;
			};
			testimonials: {
				Row: Testimonial;
				Insert: Omit<Testimonial, 'id' | 'created_at'> & { id?: string; created_at?: string };
				Update: Partial<Omit<Testimonial, 'id'>>;
			};
			site_settings: {
				Row: SiteSetting;
				Insert: Omit<SiteSetting, 'updated_at'> & { updated_at?: string };
				Update: Partial<SiteSetting>;
			};
		};
		Views: Record<string, never>;
		Functions: Record<string, never>;
		Enums: Record<string, never>;
	};
}
