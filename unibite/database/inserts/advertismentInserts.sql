USE unibite;

INSERT INTO advertisments (
    creator_id,
    title,
    description,
    point_cost,
    date_of_delivery,
    location_lat,
    location_lng,
    building_name,
    room_number,
    portions,
    path_to_picture,
    state_of_ad
)
SELECT id,
       'Homemade Pepperoni Pizza',
       'Fresh homemade pizza with tomato sauce, mozzarella and pepperoni.',
       40,
    '2026-09-08 12:30:00',
       39.475000,
       21.920000,
       'Main University Building',
       'Room 101',
       4,
       'pepperoni_pizza.jpg',
       'ACTIVE'
FROM users
WHERE username = 'alex_papadopoulos';

INSERT INTO advertisments (
    creator_id,
    title,
    description,
    point_cost,
    date_of_delivery,
    location_lat,
    location_lng,
    building_name,
    room_number,
    portions,
    path_to_picture,
    state_of_ad
)
SELECT id,
       'Vegetarian Wrap',
       'Fresh tortilla wrap filled with lettuce, tomato, cucumber and corn.',
       25,
    '2026-09-08 13:00:00',
       39.475200,
       21.920200,
       'Student Center',
       'Room 12',
       3,
       'vegetarian_wrap.jpg',
       'ACTIVE'
FROM users
WHERE username = 'nikos_georgiou';

INSERT INTO advertisments (
    creator_id,
    title,
    description,
    point_cost,
    date_of_delivery,
    location_lat,
    location_lng,
    building_name,
    room_number,
    portions,
    path_to_picture,
    state_of_ad
)
SELECT id,
       'Homemade Lasagna',
       'Traditional homemade lasagna with minced beef, tomato sauce and cheese.',
       50,
    '2026-09-08 14:00:00',
       39.476000,
       21.921000,
       'Engineering Building',
       'Room 204',
       3,
       'lasagna.jpg',
       'ACTIVE'
FROM users
WHERE username = 'maria_kosta';

INSERT INTO advertisments (
    creator_id,
    title,
    description,
    point_cost,
    date_of_delivery,
    location_lat,
    location_lng,
    building_name,
    room_number,
    portions,
    path_to_picture,
    state_of_ad
)
SELECT id,
       'Chocolate Muffins',
       'Soft homemade chocolate muffins, perfect for a study break.',
       15,
    '2026-09-08 15:30:00',
       39.476100,
       21.921100,
       'Engineering Building',
       'Room 205',
       6,
       'chocolate_muffins.jpg',
       'ACTIVE'
FROM users
WHERE username = 'elena_papadaki';

INSERT INTO advertisments (
    creator_id,
    title,
    description,
    point_cost,
    date_of_delivery,
    location_lat,
    location_lng,
    building_name,
    room_number,
    portions,
    path_to_picture,
    state_of_ad
)
SELECT id,
       'Greek Salad',
       'Fresh Greek salad with tomatoes, cucumber, olives, feta and oregano.',
       25,
    '2026-09-08 16:00:00',
       39.474600,
       21.919600,
       'Science Building',
       'Room 104',
       3,
       'greek_salad.jpg',
       'ACTIVE'
FROM users
WHERE username = 'giorgos_manolis';
