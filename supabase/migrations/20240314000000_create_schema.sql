-- Enable necessary extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- Create custom types
CREATE TYPE user_role AS ENUM ('user', 'admin', 'guide');
CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded');
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'cancelled', 'completed');
CREATE TYPE tour_type AS ENUM ('individual', 'small_group', 'family', 'school', 'corporate', 'custom');

-- Create users table (extends Supabase auth.users)
CREATE TABLE users (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT UNIQUE,
    full_name TEXT,
    avatar_url TEXT,
    phone TEXT,
    preferred_language TEXT DEFAULT 'en',
    wechat_id TEXT,
    role user_role DEFAULT 'user',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create places table
CREATE TABLE places (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name_en TEXT NOT NULL,
    name_zh TEXT NOT NULL,
    description_en TEXT NOT NULL,
    description_zh TEXT NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT,
    location POINT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    region TEXT NOT NULL,
    country TEXT NOT NULL,
    opening_hours JSONB,
    average_duration INTERVAL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create events table
CREATE TABLE events (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name_en TEXT NOT NULL,
    name_zh TEXT NOT NULL,
    description_en TEXT NOT NULL,
    description_zh TEXT NOT NULL,
    place_id UUID REFERENCES places(id),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    image_url TEXT,
    price_range JSONB,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create tours table
CREATE TABLE tours (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name_en TEXT NOT NULL,
    name_zh TEXT NOT NULL,
    description_en TEXT NOT NULL,
    description_zh TEXT NOT NULL,
    tour_type tour_type NOT NULL,
    duration INTERVAL NOT NULL,
    max_participants INT,
    base_price DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'EUR',
    included_services TEXT[],
    excluded_services TEXT[],
    images TEXT[],
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create tour_places table (for tour itineraries)
CREATE TABLE tour_places (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    tour_id UUID REFERENCES tours(id),
    place_id UUID REFERENCES places(id),
    day_number INT NOT NULL,
    duration INTERVAL,
    notes_en TEXT,
    notes_zh TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create bookings table
CREATE TABLE bookings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    tour_id UUID REFERENCES tours(id),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    number_of_people INT NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'EUR',
    status booking_status DEFAULT 'pending',
    special_requests TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create payments table
CREATE TABLE payments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    booking_id UUID REFERENCES bookings(id),
    amount DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'EUR',
    payment_method TEXT NOT NULL,
    status payment_status DEFAULT 'pending',
    transaction_id TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create reviews table
CREATE TABLE reviews (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    tour_id UUID REFERENCES tours(id),
    booking_id UUID REFERENCES bookings(id),
    rating INT CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    images TEXT[],
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create ai_chat_history table
CREATE TABLE ai_chat_history (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    session_id UUID NOT NULL,
    message TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Create ai_travel_preferences table
CREATE TABLE ai_travel_preferences (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id) UNIQUE,
    preferences JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create guides table
CREATE TABLE guides (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id) UNIQUE,
    bio_en TEXT NOT NULL,
    bio_zh TEXT NOT NULL,
    languages TEXT[],
    specialties TEXT[],
    certification_info JSONB,
    availability JSONB,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create tour_guides table
CREATE TABLE tour_guides (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    tour_id UUID REFERENCES tours(id),
    guide_id UUID REFERENCES guides(id),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Create notifications table
CREATE TABLE notifications (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT NOT NULL,
    read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Create restaurants table
CREATE TABLE restaurants (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name_en TEXT NOT NULL,
    name_zh TEXT NOT NULL,
    description_en TEXT NOT NULL,
    description_zh TEXT NOT NULL,
    cuisine_type TEXT NOT NULL,
    price_range INT CHECK (price_range BETWEEN 1 AND 4),
    image_url TEXT,
    location POINT NOT NULL,
    address TEXT NOT NULL,
    phone TEXT,
    website TEXT,
    opening_hours JSONB,
    reservation_required BOOLEAN DEFAULT false,
    average_rating DECIMAL(2,1),
    michelin_stars INT DEFAULT 0,
    specialties_en TEXT[],
    specialties_zh TEXT[],
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create theaters table
CREATE TABLE theaters (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name_en TEXT NOT NULL,
    name_zh TEXT NOT NULL,
    description_en TEXT NOT NULL,
    description_zh TEXT NOT NULL,
    type TEXT NOT NULL,
    capacity INT,
    image_url TEXT,
    location POINT NOT NULL,
    address TEXT NOT NULL,
    phone TEXT,
    website TEXT,
    facilities_en TEXT[],
    facilities_zh TEXT[],
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create shows table (for theater plays, operas, concerts)
CREATE TABLE shows (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    theater_id UUID REFERENCES theaters(id),
    name_en TEXT NOT NULL,
    name_zh TEXT NOT NULL,
    description_en TEXT NOT NULL,
    description_zh TEXT NOT NULL,
    type TEXT NOT NULL,
    duration INTERVAL,
    language TEXT,
    subtitles TEXT[],
    image_url TEXT,
    start_date DATE NOT NULL,
    end_date DATE,
    price_range JSONB,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create show_schedules table
CREATE TABLE show_schedules (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    show_id UUID REFERENCES shows(id),
    performance_date DATE NOT NULL,
    start_time TIME NOT NULL,
    available_seats INT,
    price_categories JSONB,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create cultural_venues table
CREATE TABLE cultural_venues (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name_en TEXT NOT NULL,
    name_zh TEXT NOT NULL,
    description_en TEXT NOT NULL,
    description_zh TEXT NOT NULL,
    type TEXT NOT NULL,
    image_url TEXT,
    location POINT NOT NULL,
    address TEXT NOT NULL,
    phone TEXT,
    website TEXT,
    opening_hours JSONB,
    admission_fee JSONB,
    facilities_en TEXT[],
    facilities_zh TEXT[],
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create restaurant_bookings table
CREATE TABLE restaurant_bookings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    restaurant_id UUID REFERENCES restaurants(id),
    booking_date DATE NOT NULL,
    booking_time TIME NOT NULL,
    number_of_people INT NOT NULL,
    special_requests TEXT,
    status booking_status DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create show_bookings table
CREATE TABLE show_bookings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    show_schedule_id UUID REFERENCES show_schedules(id),
    number_of_tickets INT NOT NULL,
    seat_numbers TEXT[],
    total_price DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'EUR',
    status booking_status DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create functions and triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers to all relevant tables
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_places_updated_at
    BEFORE UPDATE ON places
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_events_updated_at
    BEFORE UPDATE ON events
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_tours_updated_at
    BEFORE UPDATE ON tours
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at
    BEFORE UPDATE ON bookings
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_guides_updated_at
    BEFORE UPDATE ON guides
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_restaurants_updated_at
    BEFORE UPDATE ON restaurants
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_theaters_updated_at
    BEFORE UPDATE ON theaters
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_shows_updated_at
    BEFORE UPDATE ON shows
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_show_schedules_updated_at
    BEFORE UPDATE ON show_schedules
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_cultural_venues_updated_at
    BEFORE UPDATE ON cultural_venues
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_restaurant_bookings_updated_at
    BEFORE UPDATE ON restaurant_bookings
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_show_bookings_updated_at
    BEFORE UPDATE ON show_bookings
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_places_location ON places USING gist (location);
CREATE INDEX idx_tours_type ON tours (tour_type);
CREATE INDEX idx_bookings_status ON bookings (status);
CREATE INDEX idx_bookings_dates ON bookings (start_date, end_date);
CREATE INDEX idx_payments_status ON payments (status);
CREATE INDEX idx_reviews_rating ON reviews (rating);
CREATE INDEX idx_tour_places_day ON tour_places (day_number);
CREATE INDEX idx_restaurants_location ON restaurants USING gist (location);
CREATE INDEX idx_restaurants_cuisine ON restaurants (cuisine_type);
CREATE INDEX idx_restaurants_price ON restaurants (price_range);
CREATE INDEX idx_theaters_location ON theaters USING gist (location);
CREATE INDEX idx_shows_dates ON shows (start_date, end_date);
CREATE INDEX idx_show_schedules_date ON show_schedules (performance_date);
CREATE INDEX idx_cultural_venues_location ON cultural_venues USING gist (location);
CREATE INDEX idx_cultural_venues_type ON cultural_venues (type);

-- Set up Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_chat_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_travel_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE restaurant_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE show_bookings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own data"
    ON users FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update their own data"
    ON users FOR UPDATE
    USING (auth.uid() = id);

CREATE POLICY "Users can view their own bookings"
    ON bookings FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bookings"
    ON bookings FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own payments"
    ON payments FOR SELECT
    USING (auth.uid() = (SELECT user_id FROM bookings WHERE id = booking_id));

CREATE POLICY "Users can view their own reviews"
    ON reviews FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own reviews"
    ON reviews FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own chat history"
    ON ai_chat_history FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own chat history"
    ON ai_chat_history FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own travel preferences"
    ON ai_travel_preferences FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own travel preferences"
    ON ai_travel_preferences FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own notifications"
    ON notifications FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own restaurant bookings"
    ON restaurant_bookings FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own restaurant bookings"
    ON restaurant_bookings FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own show bookings"
    ON show_bookings FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own show bookings"
    ON show_bookings FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
