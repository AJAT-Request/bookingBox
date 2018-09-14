DROP DATABASE IF EXISTS bookingbox;

CREATE DATABASE bookingbox;

USE bookingbox;

CREATE TABLE listing (
  listingID int NOT NULL AUTO_INCREMENT,
  listingName varchar(255) NOT NULL,
  nightlyFee smallint NOT NULL,
  serviceFee smallint NOT NULL,
  cleaningFee smallint NOT NULL,
  numReviews int NOT NULL,
  reviewRating decimal(5, 1) NOT NULL,
  numGuests tinyint NOT NULL,
  timesRecentlyViewed int NOT NULL,
  PRIMARY KEY (listingID)
);



CREATE TABLE dates (
  /* Describe your table here.*/
  ID int NOT NULL AUTO_INCREMENT,
  listingID int NOT NULL,
  year smallint NOT NULL,
  month smallint NOT NULL,
  day smallint NOT NULL,
  available boolean NOT NULL,
  PRIMARY KEY (ID),
  FOREIGN KEY (listingID) REFERENCES listing(listingID)
);

/*  Execute this file from the command line by typing:
 *    sudo mysql < schema.sql -p
 *    Password: Pass_word2%
 *  to create the database and the tables.*/

-- INSERT INTO listing (listingName, nightlyFee, serviceFee, cleaningFee, numReviews, reviewRating, numGuests, timesRecentlyViewed) 
-- VALUES ('Batcave', 1, 2, 3, 254, 4.5, 5, 250);
-- INSERT INTO dates (listingID, year, month, day, available) VALUES (1, 1995, 10, 31, true);
