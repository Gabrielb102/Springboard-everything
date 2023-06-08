
DROP DATABASE IF EXISTS air_traffic;

CREATE DATABASE air_traffic;

\c air_traffic

CREATE TABLE passengers (
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL
);

CREATE TABLE airlines (
    id SERIAL PRIMARY KEY,
    airline TEXT NOT NULL
);

CREATE TABLE cities (
  id SERIAL PRIMARY KEY,
  city TEXT NOT NULL,
  country TEXT NOT NULL
);

CREATE TABLE tickets(
  id SERIAL PRIMARY KEY,
  passenger_id INT NOT NULL REFERENCES passengers,
  seat TEXT NOT NULL,
  departure TIMESTAMP NOT NULL,
  arrival TIMESTAMP NOT NULL,
  airline_id INT NOT NULL REFERENCES airlines ON DELETE CASCADE,
  from_id INT NOT NULL REFERENCES cities,
  to_id INT NOT NULL REFERENCES cities
);

INSERT INTO passengers (first_name, last_name)
VALUES
  ('Jennifer', 'Finch'),
  ('Thadeus', 'Gathercoal'),
  ('Sonja', 'Pauley'),
  ('Jennifer', 'Finch'),
  ('Waneta', 'Skeleton'),
  ('Thadeus', 'Gathercoal'),
  ('Berkie', 'Wycliff'),
  ('Alvin', 'Leathes'),
  ('Berkie', 'Wycliff'),
  ('Cory', 'Squibbes');

INSERT INTO airlines (airline)
VALUES
  ('United'),
  ('British Airways'),
  ('Delta'),
  ('Air China'),
  ('American Airlines'),
  ('Avianca Brasil');

INSERT INTO cities
(city, country)
VALUES
  ('Washington DC', 'United States'),
  ('Seattle', 'United States'),
  ('Tokyo', 'Japan'), 
  ('London', 'United Kingdom'),
  ('Los Angeles', 'United States'), 
  ('Las Vegas', 'United States'),
  ('Mexico City', 'Mexico'),
  ('Paris', 'France'),
  ('Casablanca', 'Morocco'),
  ('Dubai', 'UAE'), 
  ('Beijing', 'China'),
  ('New York', 'United States'),
  ('Charlotte', 'United States'),
  ('Cedar Rapids', 'United States'), 
  ('Chicago', 'United States'),
  ('New Orleans', 'United States'),
  ('Sao Paolo', 'Brazil'), 
  ('Santiago', 'Chile');

INSERT INTO tickets
(passenger_id, seat, departure, arrival, airline_id, from_id, to_id)
VALUES
  (1, '33B', '2018-04-08 09:00:00', '2018-04-08 12:00:00', 1, 1, 2),
  (2, '8A', '2018-12-19 12:45:00', '2018-12-19 16:15:00', 2, 3, 4),
  (3, '12F', '2018-01-02 07:00:00', '2018-01-02 08:03:00', 3, 5, 6),
  (4, '20A', '2018-04-15 16:50:00', '2018-04-15 21:00:00', 3, 1, 7),
  (5, '23D', '2018-08-01 18:30:00', '2018-08-01 21:50:00', 4, 8, 8),
  (6, '18C', '2018-10-31 01:15:00', '2018-10-31 12:55:00', 5, 10, 11),
  (7, '9E', '2019-02-06 06:00:00', '2019-02-06 07:47:00', 6, 12, 13),
  (8, '1A', '2018-12-22 14:42:00', '2018-12-22 15:56:00', 4, 14, 15),
  (9, '32B', '2019-02-06 16:28:00', '2019-02-06 19:18:00', 5, 13, 16),
  (10, '10D', '2019-01-20 19:30:00', '2019-01-20 22:45:00', 6, 17, 18);

SELECT first_name, last_name, seat, departure, arrival, airline, f.city AS from_city, f.country AS from_country, a.city AS to_city, a.country AS to_country
FROM tickets t
JOIN passengers p ON t.passenger_id = p.id
JOIN cities f ON t.from_id = f.id
JOIN cities a ON t.to_id = a.id
JOIN airlines ON t.airline_id = airlines.id
