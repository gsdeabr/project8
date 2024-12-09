-- Enable necessary extensions
create extension if not exists "uuid-ossp";
create extension if not exists "postgis";

-- USERS & AUTHENTICATION
create type user_role as enum ('user', 'admin', 'guide', 'partner');
create type language_preference as enum ('en', 'zh');
create type currency_preference as enum ('EUR', 'CNY');

create table public.profiles (
    id uuid references auth.users on delete cascade primary key,
    email text unique not null,
    full_name text,
    avatar_url text,
    phone text,
    language language_preference default 'en',
    currency currency_preference default 'EUR',
    wechat_id text,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    role user_role default 'user'
);

-- LOCATIONS & ADDRESSES
create table public.addresses (
    id uuid primary key default uuid_generate_v4(),
    street_address text not null,
    city text not null,
    postal_code text not null,
    country text not null,
    latitude double precision,
    longitude double precision,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- ACCOMMODATIONS
create type room_type as enum ('single', 'double', 'suite', 'penthouse');
create type accommodation_type as enum ('hotel', 'resort', 'villa', 'apartment');

create table public.accommodations (
    id uuid primary key default uuid_generate_v4(),
    name jsonb not null, -- {en: string, zh: string}
    description jsonb not null, -- {en: string, zh: string}
    type accommodation_type not null,
    address_id uuid references public.addresses not null,
    rating numeric(2,1),
    amenities text[],
    images text[],
    contact_phone text,
    contact_email text,
    website_url text,
    price_range int4range,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

create table public.rooms (
    id uuid primary key default uuid_generate_v4(),
    accommodation_id uuid references public.accommodations not null,
    name jsonb not null, -- {en: string, zh: string}
    description jsonb not null, -- {en: string, zh: string}
    type room_type not null,
    price_per_night decimal not null,
    capacity int not null,
    amenities text[],
    images text[],
    quantity int not null,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- DINING & ENTERTAINMENT
create type cuisine_type as enum ('french', 'mediterranean', 'asian_fusion', 'seafood', 'international');
create type venue_type as enum ('restaurant', 'bar', 'nightclub', 'cafe');

create table public.dining_venues (
    id uuid primary key default uuid_generate_v4(),
    name jsonb not null, -- {en: string, zh: string}
    description jsonb not null, -- {en: string, zh: string}
    type venue_type not null,
    cuisine_type cuisine_type,
    address_id uuid references public.addresses not null,
    rating numeric(2,1),
    price_range int4range,
    opening_hours jsonb,
    images text[],
    features text[],
    contact_phone text,
    contact_email text,
    website_url text,
    dress_code text,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- ACTIVITIES & TOURS
create type activity_type as enum ('cultural', 'adventure', 'culinary', 'shopping', 'wellness');
create type tour_status as enum ('draft', 'published', 'archived');

create table public.activities (
    id uuid primary key default uuid_generate_v4(),
    name jsonb not null, -- {en: string, zh: string}
    description jsonb not null, -- {en: string, zh: string}
    type activity_type not null,
    duration interval not null,
    difficulty_level int check (difficulty_level between 1 and 5),
    price_per_person decimal not null,
    min_participants int default 1,
    max_participants int,
    images text[],
    included text[],
    excluded text[],
    requirements text[],
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

create table public.tours (
    id uuid primary key default uuid_generate_v4(),
    name jsonb not null, -- {en: string, zh: string}
    description jsonb not null, -- {en: string, zh: string}
    duration int not null, -- in days
    price_per_person decimal not null,
    status tour_status default 'draft',
    highlights jsonb,
    itinerary jsonb,
    images text[],
    included text[],
    excluded text[],
    meeting_point_id uuid references public.addresses,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

create table public.tour_activities (
    tour_id uuid references public.tours not null,
    activity_id uuid references public.activities not null,
    day_number int not null,
    start_time time not null,
    end_time time not null,
    primary key (tour_id, activity_id, day_number)
);

-- TRANSPORTATION
create type vehicle_type as enum ('car', 'van', 'yacht', 'boat');
create type rental_status as enum ('available', 'booked', 'maintenance');

create table public.vehicles (
    id uuid primary key default uuid_generate_v4(),
    name jsonb not null, -- {en: string, zh: string}
    description jsonb not null, -- {en: string, zh: string}
    type vehicle_type not null,
    model text not null,
    year int not null,
    capacity int not null,
    price_per_day decimal not null,
    features text[],
    images text[],
    status rental_status default 'available',
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- BOOKINGS & RESERVATIONS
create type booking_status as enum ('pending', 'confirmed', 'cancelled', 'completed');
create type payment_status as enum ('pending', 'paid', 'refunded', 'failed');
create type payment_method as enum ('credit_card', 'wechat', 'alipay', 'bank_transfer');

create table public.bookings (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references public.profiles not null,
    status booking_status default 'pending',
    total_amount decimal not null,
    payment_status payment_status default 'pending',
    payment_method payment_method,
    special_requests text,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

create table public.room_bookings (
    id uuid primary key default uuid_generate_v4(),
    booking_id uuid references public.bookings not null,
    room_id uuid references public.rooms not null,
    check_in_date date not null,
    check_out_date date not null,
    guests int not null,
    amount decimal not null,
    created_at timestamptz default now()
);

create table public.dining_reservations (
    id uuid primary key default uuid_generate_v4(),
    booking_id uuid references public.bookings not null,
    venue_id uuid references public.dining_venues not null,
    reservation_date date not null,
    reservation_time time not null,
    party_size int not null,
    special_requests text,
    created_at timestamptz default now()
);

create table public.tour_bookings (
    id uuid primary key default uuid_generate_v4(),
    booking_id uuid references public.bookings not null,
    tour_id uuid references public.tours not null,
    start_date date not null,
    participants int not null,
    amount decimal not null,
    created_at timestamptz default now()
);

create table public.vehicle_rentals (
    id uuid primary key default uuid_generate_v4(),
    booking_id uuid references public.bookings not null,
    vehicle_id uuid references public.vehicles not null,
    start_date date not null,
    end_date date not null,
    amount decimal not null,
    pickup_location_id uuid references public.addresses,
    dropoff_location_id uuid references public.addresses,
    created_at timestamptz default now()
);

-- REVIEWS & RATINGS
create table public.reviews (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references public.profiles not null,
    booking_id uuid references public.bookings not null,
    rating int check (rating between 1 and 5) not null,
    comment text,
    images text[],
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- PACKAGES & PROMOTIONS
create type package_type as enum ('standard', 'premium', 'luxury');

create table public.packages (
    id uuid primary key default uuid_generate_v4(),
    name jsonb not null, -- {en: string, zh: string}
    description jsonb not null, -- {en: string, zh: string}
    type package_type not null,
    duration int not null, -- in days
    price_per_person decimal not null,
    included_services jsonb,
    highlights jsonb,
    images text[],
    max_participants int,
    valid_from date,
    valid_until date,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

create table public.package_items (
    package_id uuid references public.packages not null,
    item_type text not null, -- 'accommodation', 'activity', 'tour', 'dining', 'transport'
    item_id uuid not null,
    quantity int default 1,
    primary key (package_id, item_type, item_id)
);

create table public.package_bookings (
    id uuid primary key default uuid_generate_v4(),
    booking_id uuid references public.bookings not null,
    package_id uuid references public.packages not null,
    start_date date not null,
    participants int not null,
    amount decimal not null,
    created_at timestamptz default now()
);

-- NOTIFICATIONS & MESSAGING
create type notification_type as enum ('booking', 'reminder', 'promotion', 'system');

create table public.notifications (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references public.profiles not null,
    type notification_type not null,
    title jsonb not null, -- {en: string, zh: string}
    content jsonb not null, -- {en: string, zh: string}
    read boolean default false,
    created_at timestamptz default now()
);

-- Row Level Security Policies
alter table public.profiles enable row level security;
alter table public.bookings enable row level security;
alter table public.reviews enable row level security;
alter table public.notifications enable row level security;

-- Users can only read and update their own profiles
create policy "Users can view own profile"
    on public.profiles for select
    using (auth.uid() = id);

create policy "Users can update own profile"
    on public.profiles for update
    using (auth.uid() = id);

-- Users can view their own bookings and admins can view all
create policy "Users can view own bookings"
    on public.bookings for select
    using (auth.uid() = user_id or exists (
        select 1 from public.profiles
        where profiles.id = auth.uid()
        and profiles.role = 'admin'
    ));

-- Users can only create reviews for their own bookings
create policy "Users can create reviews for own bookings"
    on public.reviews for insert
    with check (exists (
        select 1 from public.bookings
        where bookings.id = booking_id
        and bookings.user_id = auth.uid()
    ));

-- Users can only view their own notifications
create policy "Users can view own notifications"
    on public.notifications for select
    using (user_id = auth.uid());

-- Create indexes for better query performance
create index idx_accommodations_price_range on public.accommodations using gist (price_range);
create index idx_rooms_price on public.rooms (price_per_night);
create index idx_tours_price on public.tours (price_per_person);
create index idx_bookings_user on public.bookings (user_id);
create index idx_bookings_status on public.bookings (status);
create index idx_reviews_rating on public.reviews (rating);
create index idx_notifications_user_read on public.notifications (user_id, read);

-- Create functions for common operations
create or replace function public.search_accommodations(
    search_query text,
    min_price decimal,
    max_price decimal,
    check_in date,
    check_out date
) returns setof public.accommodations
language sql
as $$
    select distinct a.*
    from public.accommodations a
    join public.rooms r on r.accommodation_id = a.id
    where (
        a.price_range && int4range(min_price::integer, max_price::integer)
        and not exists (
            select 1
            from public.room_bookings rb
            where rb.room_id = r.id
            and (
                (rb.check_in_date, rb.check_out_date) overlaps (check_in, check_out)
            )
        )
        and (
            search_query is null
            or a.name->>'en' ilike '%' || search_query || '%'
            or a.name->>'zh' ilike '%' || search_query || '%'
            or a.description->>'en' ilike '%' || search_query || '%'
            or a.description->>'zh' ilike '%' || search_query || '%'
        )
    );
$$;

-- Trigger to update timestamps
create or replace function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

-- Apply updated_at trigger to relevant tables
create trigger update_profiles_updated_at
    before update on public.profiles
    for each row
    execute function update_updated_at_column();

create trigger update_accommodations_updated_at
    before update on public.accommodations
    for each row
    execute function update_updated_at_column();

-- Add more triggers as needed for other tables