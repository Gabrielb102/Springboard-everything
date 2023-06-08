DROP DATABASE IF EXISTS craigslist;

CREATE DATABASE craigslist;

\c craigslist;

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    category TEXT NOT NULL
);

CREATE TABLE regions (
    id SERIAL PRIMARY KEY,
    region TEXT NOT NULL
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    pref_region_id INT NOT NULL REFERENCES regions ON DELETE SET NULL
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    category_id INT NOT NULL REFERENCES categories ON DELETE CASCADE,
    title TEXT NOT NULL,
    desc_text TEXT NOT NULL,
    user_id INT NOT NULL REFERENCES users ON DELETE CASCADE,
    loc TEXT,
    region_id INT NOT NULL REFERENCES regions  ON DELETE SET NULL
);

INSERT INTO categories (category)                                                                        
VALUES ('tickets'),                                                                                                   
('vehicles'),                                                                                                         
('clothes'),                                                                                                          
('electronics'),                                                                                                      
('shoes'),                                                                                                            
('furniture');

INSERT INTO regions (region)                                                                             
VALUES                                                                                                                
('West US'),                
('East US'),                                                                                                          
('Central US'),                                                                                                       
('Canada'),                                                                                                           
('Caribbean'),                                                                                                        
('Europe'),                                                                                                           
('UK'),                                                                                                               
('Eastern Europe'),                                                                                                   
('Oceania'),                                                                                                          
('Asia'),                                                                                                             
('Middle East'),                                                                                                      
('India'),                                                                                                            
('South Asia'),                                                                                                       
('Northern Africa'),                                                                                                  
('Sub-Saharan Africa'),                                                                                               
('Southern Africa'),                                                                                                  
('South America');

INSERT INTO users (username, pref_region_id)
VALUES
('stink_feet', 1),
('barcelona_burgular', 6),
('Mapes', 4),
('Michael', 11),
('That_one_scumbag_which_scammed_me_out_of_LIB_tickets', 1),
('FKA_Swigs', 7);

INSERT INTO posts (category_id, title, desc_text, user_id, loc, region_id)
VALUES 
(2, '2008 Toyota Corolla', 'Used Corolla with 299,000 miles, red', 3, 'Toronto', 4),
(4, 'Computadora Usada', 'Mi laptop viejo de universidad, todavia funciona bien 
pero mi trabajo me dio una mejor', 2, 'Barcelona', 6),
(6, 'Bad feet pictures', 'Trash feet pics, actually very disgusting', 1, 'San Diego', 1);




