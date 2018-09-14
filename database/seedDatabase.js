const db = require('./index.js');

const getRandomIntInclusive = (min, max) => {
  const currMin = Math.ceil(min);
  const currMax = Math.floor(max);
  return Math.floor(Math.random() * (currMax - currMin + 1)) + currMin;
};

const getRandomBooleanWeighted = () => {
  const randomNum = Math.random() * 10;
  if (randomNum > 3) {
    return true;
  }
  return false;
};

const names = [
  'Sherman Oak\'\'s Mansion',
  'Charles Mansion',
  'All Inclusive Garage',
  'Apple Cellar',
  'Lofty Loft',
  'Boom Room',
  'Sky Room',
  'Grand Room',
  'Beautiful 6th Floor Suite In The Tenderloin',
  'Toby\'\'s Guest House',
  'All Inclusive Tipi',
  'Windowless Room in Hawaii',
  'Temple of Doom Room',
  'Zildjian Loft',
  'Giants Room',
  'Edit Room',
  'Good View Room',
  'Zoom Room',
  'Data Room',
  'Broom Closet Room',
  'Dark Room for 8 People',
  'Target Theme Room',
  'Your Local Doctor\'\'s Office',
  'Niner\'\'s Theme Loft',
  'Raider\'\'s Theme Suite',
  'Obama\'\'s House',
  'The Batcave',
  'A Shack on the Moon',
  'An Underwater Dome',
  'Park Place',
  'Airbnb Headquarters',
  'Elbow Room',
  'A Tent in the Middle of the Woods',
  'The Magic Treehouse',
  'Microbrewery',
  'Hogwarts',
  'San Junipero',
  'A Quaint Cabin in Colorado',
  'Kanye West\'\'s Yurt at Burning Man',
  'DisneyLand\'\'s Haunted Mansion Ride',
  'A Tent Halfway Up Mount Everest',
  'Napa Valley Winery',
  'A Room that Elvis Stayed in One Time',
  'Inside the Hotel from the Dream in Inception',
  'Small Boat',
  'Private Island',
  'Expensive Room',
  'Cheap Room',
  'The House from Blues Clues',
  'Hot Air Balloon',
  'Stormwind City House',
  'Elwynn Forest Lodge',
  'Playboy Mansion',
  'Orgrimmar Hut',
  'Homeless Man\'\'s Tent',
  'Azeroth Castle',
  'Alcatraz Prison Cell',
  'Lumbridge Home',
  'Steph Curry\'\'s House',
  'Oracle Arena Closet',
  'Jay Z\'\'s Mansion',
  'Plane That Never Stops Flying Ever',
  'Galvanize Guest Suite',
  'Dunder Mifflin Closet',
  'Schrute Farms Barnyard',
  'Tinh\'\'s House',
  'Icelandic Rare Glacial Igloo',
  'Apple iHouse',
  'Jeff Bezos Shack',
  'SpaceX Rocket Presidential Suite',
  'Martian Yurt',
  'Compton Warehouse',
  'Venice Beachhouse',
  'Teletubbies Headquarters',
  'Gucci Mane\'\'s Gucci House',
  'Hack Reactor',
  'House on the prairie',
  'Berkeley Bowl',
  'Rick and Morty\'\'s house',
  '10 Downing Street',
  'Igloo',
  'McDonalds',
  'Taco Bell',
  'Shalimar',
  'Westworld',
  'Dante\'\'s Inferno',
  'Garden of Eden',
  'Mount Olympus',
  'Purgatory',
  'House of Chicken and Waffles',
  'Arjun\'\'s House',
  'Bowser\'\'s Castle',
  'Hyrule Temple',
  'Final Destination',
  'Great Wall of China',
  'Taj Mahal',
  'Tempest',
  'Tent in the backyard',
  'Paul Bunyon\'\'s sock',
  'Santa\'\'s workshop',
];


// Seed the listing database
const seedListings = () => {
  for (let i = 0; i < names.length; i += 1) {
    const info = {
      name: names[i],
      nightlyFee: getRandomIntInclusive(20, 300),
      serviceFee: getRandomIntInclusive(0, 50),
      cleaningFee: getRandomIntInclusive(0, 30),
      numReviews: getRandomIntInclusive(0, 1000),
      reviewRating: getRandomIntInclusive(1, 5),
      numGuests: getRandomIntInclusive(1, 10),
      timesRecentlyViewed: getRandomIntInclusive(0, 500),
    };
  
    const newQuery = `INSERT INTO listing (listingName, nightlyFee, serviceFee, cleaningFee, numReviews, reviewRating, 
      numGuests, timesRecentlyViewed) VALUES ('${info.name}', ${info.nightlyFee}, ${info.serviceFee}, ${info.cleaningFee}, 
      ${info.numReviews}, ${info.reviewRating}, ${info.numGuests}, ${info.timesRecentlyViewed})`;

    db.query(newQuery, (err) => {
      if (err) throw err;
    });
  }
};

// Seed the dates database
const seedDates = () => {
  const today = new Date();
  for (let i = 1; i <= names.length; i += 1) {
    for (let j = 1; j <= 60; j += 1) {
      const dateToEnter = new Date(today.getFullYear(), today.getMonth(), today.getDate() + j);

      const newQuery = `INSERT INTO dates (listingID, year, month, day, available) VALUES
        (${i}, ${dateToEnter.getFullYear()}, ${dateToEnter.getMonth()}, ${dateToEnter.getDate()},
        ${getRandomBooleanWeighted()})`;

      db.query(newQuery, (err) => {
        if (err) throw err;
      });
    }
  }
};

seedListings();
seedDates();

// INSERT INTO listing (listingName, nightlyFee, serviceFee, cleaningFee,
// numReviews, reviewRating, numGuests, timesRecentlyViewed)
// VALUES ('Batcave', 1.01, 2.02, 3.04, 254, 4.5, 5, 250);
// INSERT INTO dates (listingID, year, month, day, available) VALUES (1, 1995, 10, 31, true);
