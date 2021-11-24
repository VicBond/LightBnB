INSERT INTO 
    users (name, email, password)
VALUES
    ('name1','name1@gmail.com','4BAC27393BDD9777CE02453256C5577CD02275510B2227F473D03F533924F877'),
    ('name2','name2@gmail.com','F6A205124CB6C9A672EF24A37C9FBFC8A3CC9360212EE4835B85025E9013247B'),
    ('name3','name3@gmail.com','D3D80975421228F6F3CA27448A52FF38C447C91095DE9A52EFAF288B7D577F07dfv'),
    ('name4','name4@gmail.com','C76FB7AF3BA323EE7DE6516D96705FBE06CE50F529B484F60F170195A2F8CA87');

INSERT INTO 
    properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code)
VALUES
    (1,'title1','description1','thumbnail_photo_url1','cover_photo_url1',1,1,1,1,'Canada','Dundas Street','Toronto','ON','M2N 0A7'),
    (2,'title2','description2','thumbnail_photo_url2','cover_photo_url2',2,2,2,2,'Canada','Dundas Street','Toronto','ON','M2N 0A6'),
    (3,'title3','description3','thumbnail_photo_url3','cover_photo_url3',3,3,3,3,'Canada','Dundas Street','Toronto','ON','M2N 0A7'),
    (4,'title4','description4','thumbnail_photo_url4','cover_photo_url4',4,4,4,4,'Canada','Dundas Street','Toronto','ON','M2N 0A8');


INSERT INTO 
    reservations (start_date, end_date, property_id, guest_id)
VALUES
    ('2021-11-01', '2021-11-28', 1, 1),
    ('2021-11-01', '2021-11-28', 2, 2),
    ('2021-11-01', '2021-11-28', 3, 3),
    ('2021-11-01', '2021-11-28', 4, 4);

INSERT INTO 
    property_reviews (guest_id, property_id, reservation_id, message)
VALUES
    (1, 1, 1, 'awesome'),
    (2, 2, 2, 'awesome'),
    (3, 3, 3, 'awesome'),
    (4, 4, 4, 'awesome');