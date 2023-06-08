SELECT * 
FROM owners 
JOIN vehicles ON owners.id = vehicles.owner_id;

SELECT first_name, last_name, count(*) AS count 
FROM vehicles 
JOIN owners ON vehicles.owner_id = owners.id 
GROUP BY first_name, last_name 
ORDER BY first_name;

SELECT first_name, last_name, ROUND(SUM(price)/count(*)) AS average_price, count(*) AS count 
FROM owners 
JOIN vehicles ON owners.id = vehicles.owner_id 
GROUP BY first_name, last_name 
HAVING count(*) >= 2 AND SUM(price)/count(*) >= 10000 
ORDER BY first_name DESC;


Owners: id | first_name | last_name 

Vehicles: id |  make  |  model  | year |  price   | owner_id