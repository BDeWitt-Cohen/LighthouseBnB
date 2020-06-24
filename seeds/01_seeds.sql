INSERT INTO users (name, email, password)
VALUES ('Rick Sanchez', 'rsanchez@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Trevor Thomas', 'tthomas@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Bruce Wayne', 'bwayne@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Dick Grayson', 'dgrayson@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Marty McFly', 'mmcfly@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Obi Wan', 'highground@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');


INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night,
 parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code)
 VALUES (1, 'Coruscant', 'description', 
  'https://www.elegantthemes.com/blog/wp-content/uploads/2015/02/custom-trackable-short-url-feature.png', 
  'https://www.elegantthemes.com/blog/wp-content/uploads/2015/02/custom-trackable-short-url-feature.png', 
150,
 6, 30, 1, 'canada', '123 any', 'kelowna', 'bc', 'v1v1v1'),
 (1, 'Hoth', 'description', 
  'https://www.elegantthemes.com/blog/wp-content/uploads/2015/02/custom-trackable-short-url-feature.png', 
  'https://www.elegantthemes.com/blog/wp-content/uploads/2015/02/custom-trackable-short-url-feature.png', 
150,
 2, 3, 10, 'canada', '123 any', 'calgary', 'ab', 't1t1t1'),
 (1, 'Dagoba', 'description', 
  'https://www.elegantthemes.com/blog/wp-content/uploads/2015/02/custom-trackable-short-url-feature.png', 
  'https://www.elegantthemes.com/blog/wp-content/uploads/2015/02/custom-trackable-short-url-feature.png', 
150,
 0, 1, 1, 'canada', '123 any', 'saskatoon', 'sk', 't1t1t1');




INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2020-07-20', '2020-07-27', 1, 7),
('2020-08-20', '2020-08-27', 2, 6),
('2020-07-20', '2020-07-27', 3, 4);


INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (7, 1, 7, 5, 'message'),
(6, 2, 7, 4, 'message'),
(4, 3, 8, 1, 'message');