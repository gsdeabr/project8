-- Seed some initial places
INSERT INTO places (name_en, name_zh, description_en, description_zh, category, image_url, location, address, city, region, country, opening_hours, average_duration) VALUES
(
    'Nice Old Town (Vieille Ville)',
    '尼斯老城',
    'The heart of Nice, featuring narrow streets, colorful buildings, and traditional markets.',
    '尼斯的心脏地带，以狭窄的街道、色彩缤纷的建筑和传统市场而闻名。',
    'historical',
    'https://images.unsplash.com/photo-1533929736458-ca588d08c8be',
    point(7.276154, 43.695763),
    'Vieille Ville, 06300',
    'Nice',
    'Provence-Alpes-Côte d''Azur',
    'France',
    '{"monday": {"open": "00:00", "close": "23:59"}, "tuesday": {"open": "00:00", "close": "23:59"}}',
    '3 hours'::interval
),
(
    'Promenade des Anglais',
    '英国人漫步道',
    'Iconic seaside promenade with stunning Mediterranean views.',
    '标志性的海滨长廊，可欣赏地中海美景。',
    'landmark',
    'https://images.unsplash.com/photo-1534258936925-c58bed479fcb',
    point(7.261683, 43.694461),
    'Promenade des Anglais',
    'Nice',
    'Provence-Alpes-Côte d''Azur',
    'France',
    '{"monday": {"open": "00:00", "close": "23:59"}, "tuesday": {"open": "00:00", "close": "23:59"}}',
    '2 hours'::interval
);

-- Seed some initial tours
INSERT INTO tours (name_en, name_zh, description_en, description_zh, tour_type, duration, max_participants, base_price, included_services, excluded_services, images) VALUES
(
    'Nice Cultural Heritage Tour',
    '尼斯文化遗产之旅',
    'Explore the rich cultural heritage of Nice, from its historic old town to modern art museums.',
    '探索尼斯丰富的文化遗产，从历史悠久的老城到现代艺术博物馆。',
    'small_group',
    '8 hours'::interval,
    8,
    120.00,
    ARRAY['Professional guide', 'Museum entries', 'Local food tasting'],
    ARRAY['Hotel pickup', 'Personal expenses'],
    ARRAY['https://example.com/tour1.jpg', 'https://example.com/tour2.jpg']
),
(
    'French Riviera Experience',
    '法国蔚蓝海岸体验',
    'A luxurious journey along the French Riviera, visiting Nice, Cannes, and Monaco.',
    '沿着法国蔚蓝海岸的豪华之旅，游览尼斯、戛纳和摩纳哥。',
    'individual',
    '10 hours'::interval,
    4,
    250.00,
    ARRAY['Private guide', 'Luxury transportation', 'Champagne tasting'],
    ARRAY['Lunch', 'Personal expenses'],
    ARRAY['https://example.com/tour3.jpg', 'https://example.com/tour4.jpg']
);

-- Seed tour places (itinerary)
INSERT INTO tour_places (tour_id, place_id, day_number, duration, notes_en, notes_zh)
SELECT 
    t.id,
    p.id,
    1,
    '2 hours'::interval,
    'Morning visit with local market exploration',
    '早晨参观，探索当地市场'
FROM tours t, places p
WHERE t.name_en = 'Nice Cultural Heritage Tour' AND p.name_en = 'Nice Old Town (Vieille Ville)';

-- Create a sample guide
INSERT INTO users (id, email, full_name, role) VALUES
('d7bed83c-882c-4764-a6b3-988156fc5a96', 'guide@example.com', 'Marie Dubois', 'guide');

INSERT INTO guides (user_id, bio_en, bio_zh, languages, specialties, certification_info) VALUES
(
    'd7bed83c-882c-4764-a6b3-988156fc5a96',
    'Professional guide with 10 years of experience in Nice and the French Riviera.',
    '在尼斯和法国蔚蓝海岸拥有10年经验的专业导游。',
    ARRAY['English', 'French', 'Mandarin'],
    ARRAY['Cultural Heritage', 'Food & Wine', 'Art History'],
    '{"certifications": ["Licensed Guide - France", "First Aid Certified"], "years_experience": 10}'
);

-- Associate guide with tours
INSERT INTO tour_guides (tour_id, guide_id)
SELECT t.id, g.id
FROM tours t, guides g
WHERE t.name_en = 'Nice Cultural Heritage Tour';

-- Create events
INSERT INTO events (name_en, name_zh, description_en, description_zh, place_id, start_date, end_date, price_range) 
SELECT 
    'Nice Carnival',
    '尼斯狂欢节',
    'One of the largest carnivals in the world, featuring parades, music, and spectacular shows.',
    '世界上最大的狂欢节之一，包括游行、音乐和精彩的表演。',
    p.id,
    '2024-02-10',
    '2024-02-24',
    '{"min": 20, "max": 80, "currency": "EUR"}'
FROM places p
WHERE p.name_en = 'Nice Old Town (Vieille Ville)';

-- Seed theaters
INSERT INTO theaters (name_en, name_zh, description_en, description_zh, type, capacity, image_url, location, address, phone, website, facilities_en, facilities_zh) VALUES
(
    'Opéra de Nice',
    '尼斯歌剧院',
    'Historic opera house in Nice, known for its stunning Italian-style architecture and world-class performances.',
    '尼斯历史悠久的歌剧院，以其令人惊叹的意大利风格建筑和世界级表演而闻名。',
    'opera_house',
    1000,
    'https://example.com/opera-nice.jpg',
    point(7.272750, 43.695833),
    '4-6 Rue Saint-François de Paule, 06300 Nice',
    '+33 4 92 17 40 00',
    'https://www.opera-nice.org',
    ARRAY['Air conditioning', 'Bar', 'Wheelchair access', 'Cloakroom'],
    ARRAY['空调', '酒吧', '轮椅通道', '衣帽间']
),
(
    'Théâtre National de Nice',
    '尼斯国家剧院',
    'Modern theater complex hosting contemporary plays, dance performances, and cultural events.',
    '现代剧院综合体，举办当代戏剧、舞蹈表演和文化活动。',
    'theater',
    900,
    'https://example.com/theatre-nice.jpg',
    point(7.275833, 43.696944),
    'Promenade des Arts, 06300 Nice',
    '+33 4 93 13 90 90',
    'https://www.tnn.fr',
    ARRAY['Modern sound system', 'Digital projections', 'Restaurant', 'Parking'],
    ARRAY['现代音响系统', '数字投影', '餐厅', '停车场']
);

-- Seed shows
INSERT INTO shows (theater_id, name_en, name_zh, description_en, description_zh, type, duration, language, subtitles, image_url, start_date, end_date, price_range) 
SELECT 
    t.id,
    'Carmen by Bizet',
    '比才的卡门',
    'Famous opera telling the story of the downfall of Don José, a naïve soldier seduced by the wiles of the fiery gypsy Carmen.',
    '著名歌剧，讲述了天真的士兵唐·何塞被火热的吉普赛女郎卡门的诡计所诱惑而沦陷的故事。',
    'opera',
    '3 hours'::interval,
    'French',
    ARRAY['English', 'Chinese'],
    'https://example.com/carmen.jpg',
    '2024-03-15',
    '2024-03-30',
    '{"min": 35, "max": 150, "currency": "EUR"}'
FROM theaters t
WHERE t.name_en = 'Opéra de Nice';

-- Seed show schedules
INSERT INTO show_schedules (show_id, performance_date, start_time, available_seats, price_categories)
SELECT 
    s.id,
    '2024-03-15',
    '20:00',
    500,
    '{"orchestra": 150, "mezzanine": 100, "balcony": 35}'
FROM shows s
WHERE s.name_en = 'Carmen by Bizet';

-- Seed restaurants
INSERT INTO restaurants (name_en, name_zh, description_en, description_zh, cuisine_type, price_range, image_url, location, address, phone, website, opening_hours, reservation_required, average_rating, michelin_stars, specialties_en, specialties_zh) VALUES
(
    'La Rossettisserie',
    '罗塞特烤肉店',
    'Charming restaurant in Old Nice specializing in succulent roasted meats and local specialties.',
    '位于老尼斯的迷人餐厅，专门制作多汁的烤肉和当地特色菜。',
    'French',
    2,
    'https://example.com/rossettisserie.jpg',
    point(7.276389, 43.695833),
    '8 Rue Mascoinat, 06300 Nice',
    '+33 4 93 76 18 80',
    'http://www.larossettisserie.com',
    '{"monday": {"open": "12:00", "close": "22:00"}, "tuesday": {"open": "12:00", "close": "22:00"}}',
    true,
    4.5,
    0,
    ARRAY['Roasted chicken', 'Lamb shoulder', 'Homemade desserts'],
    ARRAY['烤鸡', '羊肩', '自制甜点']
),
(
    'La Petite Maison',
    '小房子餐厅',
    'Prestigious Michelin-starred restaurant serving refined Niçoise cuisine in an elegant setting.',
    '享有盛誉的米其林星级餐厅，在优雅的环境中供应精致的尼斯美食。',
    'French',
    4,
    'https://example.com/petite-maison.jpg',
    point(7.272500, 43.696389),
    '11 Rue Saint-François de Paule, 06300 Nice',
    '+33 4 93 85 29 57',
    'http://www.lapetitemaison-nice.com',
    '{"monday": {"open": "12:00", "close": "14:30"}, "monday": {"open": "19:00", "close": "22:30"}}',
    true,
    4.8,
    1,
    ARRAY['Zucchini flower fritters', 'Mediterranean sea bass', 'Tarte Tropézienne'],
    ARRAY['炸南瓜花', '地中海鲈鱼', '特罗佩济安馅饼']
);

-- Seed cultural venues
INSERT INTO cultural_venues (name_en, name_zh, description_en, description_zh, type, image_url, location, address, phone, website, opening_hours, admission_fee, facilities_en, facilities_zh) VALUES
(
    'MAMAC Nice',
    '尼斯现代与当代艺术博物馆',
    'Museum of Modern and Contemporary Art, featuring works from the European and American avant-garde.',
    '现代与当代艺术博物馆，展示欧美前卫艺术作品。',
    'museum',
    'https://example.com/mamac.jpg',
    point(7.276944, 43.697500),
    'Place Yves Klein, 06364 Nice',
    '+33 4 97 13 42 01',
    'http://www.mamac-nice.org',
    '{"tuesday": {"open": "10:00", "close": "18:00"}, "wednesday": {"open": "10:00", "close": "18:00"}}',
    '{"adult": 10, "student": 5, "child": 0, "currency": "EUR"}',
    ARRAY['Guided tours', 'Gift shop', 'Café', 'Wheelchair access'],
    ARRAY['导览服务', '礼品店', '咖啡厅', '轮椅通道']
),
(
    'Musée Matisse',
    '马蒂斯博物馆',
    'Museum dedicated to the works of Henri Matisse, housed in a beautiful 17th-century villa.',
    '位于17世纪别墅中的博物馆，致力于展示亨利·马蒂斯的作品。',
    'museum',
    'https://example.com/matisse.jpg',
    point(7.270833, 43.720833),
    '164 Avenue des Arènes de Cimiez, 06000 Nice',
    '+33 4 93 81 08 08',
    'http://www.musee-matisse-nice.org',
    '{"wednesday": {"open": "10:00", "close": "18:00"}, "thursday": {"open": "10:00", "close": "18:00"}}',
    '{"adult": 10, "student": 5, "child": 0, "currency": "EUR"}',
    ARRAY['Audio guides', 'Garden', 'Library', 'Educational workshops'],
    ARRAY['语音导览', '花园', '图书馆', '教育工作坊']
);
