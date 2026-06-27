-- Shows
INSERT INTO shows (id, movie_name, show_time, theater_name)
VALUES
(1, 'Salaar', '10:00 AM', 'PVR Chennai'),
(2, 'RRR', '02:00 PM', 'INOX Bangalore'),
(3, 'Pushpa 2', '06:00 PM', 'Cinepolis Hyderabad'),
(4, 'Peddi', '09:00 PM', 'AGS Chennai');

-- PVR Chennai (100 seats)
INSERT INTO seats (seat_number, booked, show_id)
SELECT
    chr(64+r)||s,
    false,
    1
FROM generate_series(1,10) r,
     generate_series(1,10) s;

-- INOX Bangalore (120 seats)
INSERT INTO seats (seat_number, booked, show_id)
SELECT
    chr(64+r)||s,
    false,
    2
FROM generate_series(1,12) r,
     generate_series(1,10) s;

-- Cinepolis Hyderabad (110 seats)
INSERT INTO seats (seat_number, booked, show_id)
SELECT
    chr(64+r)||s,
    false,
    3
FROM generate_series(1,11) r,
     generate_series(1,10) s;

-- AGS Chennai (140 seats)
INSERT INTO seats (seat_number, booked, show_id)
SELECT
    chr(64+r)||s,
    false,
    4
FROM generate_series(1,14) r,
     generate_series(1,10) s;