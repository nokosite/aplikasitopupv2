-- Supabase Database Setup untuk Aplikasi Top-Up Game
-- File: supabase_database_setup.sql
-- Jalankan di Supabase Dashboard > SQL Editor

-- ========================================
-- 1. TABEL PROFIL USER (extends auth.users)
-- ========================================
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    phone TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY (id)
);

-- Enable RLS (Row Level Security)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see and edit their own profile
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- ========================================
-- 2. TABEL GAMES
-- ========================================
CREATE TABLE public.games (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    image_url TEXT,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert data games
INSERT INTO public.games (name, slug, image_url, description) VALUES
('Mobile Legends', 'mobile-legends', '/assets/games/mlbb.jpg', 'MOBA game populer'),
('Free Fire', 'free-fire', '/assets/games/freefire.jpg', 'Battle Royale game'),
('PUBG Mobile', 'pubg-mobile', '/assets/games/pubg.jpg', 'Battle Royale game'),
('Valorant', 'valorant', '/assets/games/valo.jpg', 'FPS tactical shooter');

-- Enable RLS untuk games (public read)
ALTER TABLE public.games ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Games are publicly readable" ON public.games
    FOR SELECT USING (TRUE);

-- ========================================
-- 3. TABEL PACKAGES (Diamond/VP packages)
-- ========================================
CREATE TABLE public.packages (
    id SERIAL PRIMARY KEY,
    game_id INTEGER REFERENCES public.games(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    amount INTEGER NOT NULL, -- jumlah diamond/VP
    price DECIMAL(10,2) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample packages untuk Mobile Legends
INSERT INTO public.packages (game_id, name, amount, price) VALUES
(1, '86 Diamonds', 86, 15000),
(1, '172 Diamonds', 172, 30000),
(1, '257 Diamonds', 257, 45000),
(1, '344 Diamonds', 344, 60000),
(1, '429 Diamonds', 429, 75000),
(1, '514 Diamonds', 514, 90000);

-- Insert sample packages untuk Free Fire
INSERT INTO public.packages (game_id, name, amount, price) VALUES
(2, '70 Diamonds', 70, 10000),
(2, '140 Diamonds', 140, 20000),
(2, '210 Diamonds', 210, 30000),
(2, '355 Diamonds', 355, 50000),
(2, '720 Diamonds', 720, 100000);

-- Enable RLS untuk packages (public read)
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Packages are publicly readable" ON public.packages
    FOR SELECT USING (TRUE);

-- ========================================
-- 4. TABEL ORDERS/TRANSACTIONS
-- ========================================
CREATE TABLE public.orders (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    game_id INTEGER REFERENCES public.games(id),
    package_id INTEGER REFERENCES public.packages(id),
    player_id TEXT NOT NULL, -- ID/username player di game
    player_server TEXT, -- server game (jika ada)
    amount INTEGER NOT NULL, -- jumlah diamond yang dibeli
    price DECIMAL(10,2) NOT NULL,
    payment_method TEXT NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS untuk orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own orders
CREATE POLICY "Users can view own orders" ON public.orders
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own orders" ON public.orders
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ========================================
-- 5. FUNGSI AUTO-UPDATE PROFILE
-- ========================================
-- Trigger untuk membuat profile otomatis saat user register
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, name)
    VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'name', 'User'));
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger yang dijalankan setelah user register
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ========================================
-- 6. VIEWS UNTUK KEMUDAHAN QUERY
-- ========================================
-- View untuk melihat order dengan detail game dan package
CREATE VIEW public.order_details AS
SELECT 
    o.id,
    o.user_id,
    o.player_id,
    o.player_server,
    o.amount,
    o.price,
    o.payment_method,
    o.status,
    o.created_at,
    o.completed_at,
    g.name as game_name,
    g.slug as game_slug,
    pack.name as package_name,
    prof.name as user_name
FROM public.orders o
JOIN public.games g ON o.game_id = g.id
JOIN public.packages pack ON o.package_id = pack.id
JOIN public.profiles prof ON o.user_id = prof.id;

-- Enable RLS untuk view
ALTER VIEW public.order_details SET (security_invoker = on);

-- ========================================
-- 7. FUNGSI UNTUK STATISTIK (OPTIONAL)
-- ========================================
CREATE OR REPLACE FUNCTION get_user_order_stats(user_uuid UUID)
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_build_object(
        'total_orders', COUNT(*),
        'total_spent', COALESCE(SUM(price), 0),
        'pending_orders', COUNT(*) FILTER (WHERE status = 'pending'),
        'completed_orders', COUNT(*) FILTER (WHERE status = 'completed')
    )
    INTO result
    FROM public.orders
    WHERE user_id = user_uuid;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ========================================
-- 8. INDEXES UNTUK PERFORMANCE
-- ========================================
CREATE INDEX idx_orders_user_id ON public.orders(user_id);
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_orders_created_at ON public.orders(created_at);
CREATE INDEX idx_packages_game_id ON public.packages(game_id);

-- ========================================
-- SELESAI! 
-- ========================================
-- Database setup lengkap untuk aplikasi top-up game
-- Jalankan semua query di atas di Supabase SQL Editor 