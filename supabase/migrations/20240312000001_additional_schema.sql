-- EVENTS & FESTIVALS
create type event_category as enum ('cultural', 'music', 'food', 'art', 'fashion', 'sports');
create type event_status as enum ('upcoming', 'ongoing', 'completed', 'cancelled');

create table public.events (
    id uuid primary key default uuid_generate_v4(),
    name jsonb not null,
    description jsonb not null,
    category event_category not null,
    status event_status default 'upcoming',
    start_date timestamptz not null,
    end_date timestamptz not null,
    address_id uuid references public.addresses,
    price_range int4range,
    capacity int,
    images text[],
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- WELLNESS & SPA
create type treatment_category as enum ('massage', 'facial', 'body', 'meditation', 'yoga');

create table public.spa_centers (
    id uuid primary key default uuid_generate_v4(),
    name jsonb not null,
    description jsonb not null,
    address_id uuid references public.addresses,
    rating numeric(2,1),
    images text[],
    facilities text[],
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

create table public.spa_treatments (
    id uuid primary key default uuid_generate_v4(),
    spa_id uuid references public.spa_centers not null,
    name jsonb not null,
    description jsonb not null,
    category treatment_category not null,
    duration interval not null,
    price decimal not null,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- SHOPPING
create type store_category as enum ('luxury', 'fashion', 'jewelry', 'art', 'antiques');

create table public.shopping_venues (
    id uuid primary key default uuid_generate_v4(),
    name jsonb not null,
    description jsonb not null,
    category store_category not null,
    address_id uuid references public.addresses,
    brands text[],
    price_range int4range,
    images text[],
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- PRIVATE SERVICES
create type service_category as enum ('butler', 'chef', 'guide', 'interpreter', 'photographer');

create table public.private_services (
    id uuid primary key default uuid_generate_v4(),
    name jsonb not null,
    description jsonb not null,
    category service_category not null,
    price_per_hour decimal not null,
    languages text[],
    availability jsonb,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- YACHT & BOAT SERVICES
create type vessel_type as enum ('yacht', 'sailboat', 'speedboat', 'catamaran');
create type route_type as enum ('coastal', 'island_hopping', 'sunset_cruise', 'private_tour');

create table public.vessels (
    id uuid primary key default uuid_generate_v4(),
    name jsonb not null,
    description jsonb not null,
    type vessel_type not null,
    length numeric(5,2),
    capacity int not null,
    crew_size int,
    price_per_day decimal not null,
    features text[],
    images text[],
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

create table public.sailing_routes (
    id uuid primary key default uuid_generate_v4(),
    name jsonb not null,
    description jsonb not null,
    type route_type not null,
    duration interval not null,
    stops jsonb,
    highlights jsonb,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- CONCIERGE SERVICES
create type request_priority as enum ('normal', 'urgent', 'vip');
create type request_status as enum ('pending', 'in_progress', 'completed', 'cancelled');

create table public.concierge_requests (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references public.profiles not null,
    title jsonb not null,
    description jsonb not null,
    priority request_priority default 'normal',
    status request_status default 'pending',
    deadline timestamptz,
    assigned_to uuid references public.profiles,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- TRANSPORTATION SERVICES
create type transfer_type as enum ('airport', 'hotel', 'tour', 'custom');

create table public.transfers (
    id uuid primary key default uuid_generate_v4(),
    type transfer_type not null,
    vehicle_id uuid references public.vehicles,
    pickup_location_id uuid references public.addresses,
    dropoff_location_id uuid references public.addresses,
    pickup_time timestamptz not null,
    price decimal not null,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- LOYALTY PROGRAM
create type membership_tier as enum ('silver', 'gold', 'platinum', 'diamond');
create type point_type as enum ('earn', 'redeem', 'expire');

create table public.loyalty_memberships (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references public.profiles not null,
    tier membership_tier default 'silver',
    points int default 0,
    tier_qualified_until date,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

create table public.loyalty_transactions (
    id uuid primary key default uuid_generate_v4(),
    membership_id uuid references public.loyalty_memberships not null,
    type point_type not null,
    points int not null,
    booking_id uuid references public.bookings,
    description jsonb,
    created_at timestamptz default now()
);

-- GIFT CARDS & VOUCHERS
create type voucher_type as enum ('gift_card', 'discount', 'experience');
create type voucher_status as enum ('active', 'used', 'expired');

create table public.vouchers (
    id uuid primary key default uuid_generate_v4(),
    code text unique not null,
    type voucher_type not null,
    value decimal not null,
    status voucher_status default 'active',
    valid_from timestamptz not null,
    valid_until timestamptz not null,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- SPECIAL OCCASIONS
create type occasion_type as enum ('birthday', 'anniversary', 'wedding', 'corporate');

create table public.special_occasions (
    id uuid primary key default uuid_generate_v4(),
    booking_id uuid references public.bookings not null,
    type occasion_type not null,
    date date not null,
    notes text,
    special_requests text[],
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- Create indexes for new tables
create index idx_events_dates on public.events (start_date, end_date);
create index idx_spa_treatments_price on public.spa_treatments (price);
create index idx_vessels_price on public.vessels (price_per_day);
create index idx_loyalty_members_tier on public.loyalty_memberships (tier);
create index idx_vouchers_code on public.vouchers (code);

-- Add RLS policies for new tables
alter table public.concierge_requests enable row level security;
alter table public.loyalty_memberships enable row level security;
alter table public.loyalty_transactions enable row level security;

create policy "Users can view own concierge requests"
    on public.concierge_requests for select
    using (user_id = auth.uid() or assigned_to = auth.uid());

create policy "Users can view own loyalty membership"
    on public.loyalty_memberships for select
    using (user_id = auth.uid());

create policy "Users can view own loyalty transactions"
    on public.loyalty_transactions for select
    using (exists (
        select 1 from public.loyalty_memberships
        where loyalty_memberships.id = membership_id
        and loyalty_memberships.user_id = auth.uid()
    ));

-- Create functions for new features
create or replace function public.calculate_loyalty_points(
    booking_amount decimal,
    member_tier membership_tier
) returns int
language plpgsql
as $$
declare
    points int;
begin
    points := floor(booking_amount)::int;
    
    case member_tier
        when 'silver' then points := points * 1;
        when 'gold' then points := points * 2;
        when 'platinum' then points := points * 3;
        when 'diamond' then points := points * 4;
    end case;
    
    return points;
end;
$$;

create or replace function public.search_available_vessels(
    search_date date,
    duration interval,
    min_capacity int
) returns setof public.vessels
language sql
as $$
    select v.*
    from public.vessels v
    where not exists (
        select 1
        from public.vehicle_rentals vr
        where vr.vehicle_id = v.id
        and (vr.start_date, vr.end_date) overlaps (search_date, search_date + duration)
    )
    and v.capacity >= min_capacity;
$$;

-- Add triggers for new tables
create trigger update_events_updated_at
    before update on public.events
    for each row
    execute function update_updated_at_column();

create trigger update_spa_centers_updated_at
    before update on public.spa_centers
    for each row
    execute function update_updated_at_column();

create trigger update_vessels_updated_at
    before update on public.vessels
    for each row
    execute function update_updated_at_column();

create trigger update_loyalty_memberships_updated_at
    before update on public.loyalty_memberships
    for each row
    execute function update_updated_at_column();