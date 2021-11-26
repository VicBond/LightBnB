
const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'light_bnb_db'
});
/// Users


const getUserWithEmail = function(email) {
  return pool.query(`
  SELECT *
  FROM users
  WHERE email = $1`,[email])
    .then(res => res.rows ? res.rows[0] : null)
    .catch(err => err);
};
exports.getUserWithEmail = getUserWithEmail;


const getUserWithId = function(id) {
  return pool.query(`
  SELECT *
  FROM users
  WHERE id = $1`,[id])
    .then(res => res.rows ? res.rows[0] : null)
    .catch(err => err);
};
exports.getUserWithId = getUserWithId;



const addUser =  function(user) {
  return pool.query(`
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *`,[user.name, user.email, user.password])
    .then(res => res.rows[0])
    .catch(err => err);
};
exports.addUser = addUser;

/// Reservations

const getAllReservations = function(guest_id, limit = 10) {
  return pool.query(`
  SELECT *
  FROM reservations
  JOIN users ON users.id = reservation.guest_id
  WHERE guest_id = $1
  AND end_date < now()::date
  LIMIT $2`,[guest_id, limit])
    .then(res => res.rows ? res.rows[0] : null)
    .catch(err => err);
};
exports.getAllReservations = getAllReservations;

/// Properties


const getAllProperties = function(options, limit = 10) {
  const queryParams = [];

  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `
    WHERE city LIKE $${queryParams.length} `;
  }

  if (options.owner_id) {
    queryParams.push(`%${options.owner_id}%`);
    if (queryParams.length === 1) {
      queryString += `
      WHERE owner_id = $${queryParams.length} `;
    } else {
      queryString += `
      AND owner_id = $${queryParams.length} `;
    }
  }
  
  if (options.minimum_price_per_night && options.maximum_price_per_night) {
    queryParams.push(`%${options.minimum_price_per_night * 100}%`);
    queryParams.push(`%${options.maximum_price_per_night * 100}%`);
    if (queryParams.length === 2) {
      queryString += `
      WHERE cost_per_night 
      BETWEEN $${queryParams.length - 1} 
      AND $${queryParams.length}`;
    } else {
      queryString += `
      AND cost_per_night
      BETWEEN $${queryParams.length - 1} 
      AND $${queryParams.length}`;
    }
  }

  if (options.minimum_rating) {
    queryParams.push(`%${options.minimum_rating}%`);
    queryString += `
    GROUP BY properties.id
    HAVING average_rating >= $${queryParams.length} `;
  }

  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;
 
  return pool.query(queryString, queryParams).then(res => res.rows);
};

exports.getAllProperties = getAllProperties;



const addProperty = function(property) {
  return pool.query(`
  INSERT INTO properties 
  (owner_id,
    title,
     description,
      thumbnail_photo_url,
       cover_photo_url,
        cost_per_night,
         parking_spaces,
          number_of_bathrooms,
           number_of_bedrooms,
            country,
             street,
              city,
               province,
                post_code) 
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
  RETURNING *`,[
    property.owner_id,
    property.title,
    property.description,
    property.thumbnail_photo_url,
    property.cover_photo_url,
    property.cost_per_night,
    property.parking_spaces,
    property.number_of_bathrooms,
    property.number_of_bedrooms,
    property.country,
    property.street,
    property.city,
    property.province,
    property.post_code])
    .then(res => res.rows[0])
    .catch(err => err);
};
exports.addProperty = addProperty;