const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

const properties = require('./json/properties.json');
const users = require('./json/users.json');





/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */

const getUserWithEmail = function(email) {
  return pool.query(`
  SELECT *
  FROM users
  WHERE users.email LIKE $1
  `, [email])
    .then(res => {
      return res.rows[0]
    });
};



exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  console.log(id);
  return pool.query(`
  SELECT *
  FROM users
  WHERE users.id = $1
  `, [id])
    .then(res => {
      return res.rows[0]
    });
};
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */


const addUser = function(user) {
  return pool.query(`
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *
  `, [user.name, user.email, user.password])
    .then(res => {
      // console.log("THis is res", res.rows[0], "this is user", user);
      return res.rows[0]
    });
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */



const getAllReservations = function(guest_id, limit = 10) {
  console.log('guest_id :>> ', guest_id);
  return pool.query(`
  SELECT properties.*, reservations.*, avg(rating) as average_rating
  FROM reservations
  JOIN properties ON reservations.property_id = properties.id
  JOIN property_reviews ON properties.id = property_reviews.property_id 
  WHERE reservations.guest_id = $1
  AND reservations.end_date > now()::date
  GROUP BY properties.id, reservations.id
  ORDER BY reservations.start_date
  LIMIT $2;
  `, [guest_id, limit])
    .then(res => {
      return res.rows
    });
}

exports.getAllReservations = getAllReservations;

/// Properties

//Newly implemented query function. This format is parametized to avoid SQL injections.




//Left original steps in for reference and the min option although breaking the min/max into two separate pieces would work too
const getAllProperties = function(options, limit = 10) {
  // 1
  const queryParams = [];
  // 2
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  WHERE 1 = 1 
  `;

  // 3
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `AND city LIKE $${queryParams.length} `;
  }


  if (options['minimum_price_per_night'] && options['maximum_price_per_night']) {

    queryParams.push(`${options['minimum_price_per_night']}`);

    queryString += ` AND properties.cost_per_night > $${queryParams.length}`

    queryParams.push(`${options['maximum_price_per_night']}`)

    queryString +=  ` AND properties.cost_per_night < $${queryParams.length} `;
  }

  if (options['minimum_rating']) {

    queryParams.push(`${options['minimum_rating']}`);

    queryString += ` AND property_reviews.rating >= $${queryParams.length}`
  }


// This option is here in case they only have a minimum value and no max could easily flip for maximum
//   if (options['minimum_price_per_night'] && !options['maximum_price_per_night']) {

//     queryParams.push(`${options['minimum_price_per_night']}`);

//     queryString += ` AND properties.cost_per_night > $${queryParams.length}`
//   }


  // 4
  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  // 5
  console.log("**********", queryString, queryParams, "***********");

  // 6
  return pool.query(queryString, queryParams)
    .then(res => res.rows);
}

exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */


const addProperty = function(property) {
  return pool.query(`
  INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night,
    parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code) 
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
  RETURNING *
  `, [property.owner_id, property.title, property.description, property.thumbnail_photo_url, property.cover_photo_url,
     property.cost_per_night, property.parking_spaces, property.number_of_bathrooms, property.number_of_bedrooms,
      property.country, property.street, property.city, property.province, property.post_code])
    .then(res => {
      console.log(res.rows[0]);
      // console.log("THis is res", res.rows[0], "this is user", user);
      return res.rows[0]
    });
};

// const addProperty = function(property) {
//   const propertyId = Object.keys(properties).length + 1;
//   property.id = propertyId;
//   properties[propertyId] = property;
//   return Promise.resolve(property);
// }
exports.addProperty = addProperty;
