DROP DATABASE IF EXISTS soccer_league;

CREATE DATABASE soccer_league;

\c soccer_league;

CREATE TABLE teams (
    id SERIAL PRIMARY KEY,
    team_name TEXT NOT NULL,
    current_ranking INT UNIQUE
);  

CREATE TABLE players (
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    player_number INT NOT NULL,
    current_team INT NOT NULL REFERENCES teams ON DELETE SET NULL
);

CREATE TABLE seasons (
    season INT PRIMARY KEY,
    begin_date DATE NOT NULL,
    end_date DATE NOT NULL
);

CREATE TABLE referees (
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL
);

CREATE TABLE matches (
    id SERIAL PRIMARY KEY,
    match_date DATE NOT NULL,
    team_home_id INT NOT NULL REFERENCES teams,
    team_away_id INT NOT NULL REFERENCES teams,
    winner_id INT NOT NULL CHECK (winner_id = team_away_id OR winner_id = team_home_id) REFERENCES teams,
    ref_id INT NOT NULL REFERENCES referees
);

INSERT INTO teams (team_name, current_ranking)
VALUES 
('Cibao FC', 2),
('Moca FC', 1),
('CA Pantoja', 3),
('CA San Francisco', 5),
('Bauger FC', 4);

INSERT INTO players (first_name, last_name, player_number, current_team)
VALUES
('Sergio', 'Paredes', 23, 2),
('Mateo', 'Cruz', 1, 1),
('Santiago', 'De La Torre', 32, 3),
('Nicolás', 'Burgos', 12, 4),
('Alejandro', 'Jimenez', 33, 5),
('Sebastián', 'Ingrosso', 55, 1),
('José', 'Uriel', 99, 2),
('Jesús', 'Cristo', 7, 3),
('Manuel', 'Paredes', 89, 4),
('Luis', 'Lopez', 11, 5),
('Juan', 'Paredes', 77, 1),
('Gabriel', 'Burgos', 2, 2),
('Stefan', 'Paredes', 4, 3),
('Ricardo', 'Cabrera', 8, 4),
('Thiago', 'Burgos', 97, 5);

INSERT INTO referees (first_name, last_name) 
VALUES 
('Harold','Walker'),
('Richard','Parker'),
('Jeremiah','Burton'),
('Theodore','Washington');

INSERT INTO matches (match_date, team_home_id, team_away_id, ref_id, winner_id)
VALUES 
('2012-07-01', 2, 1, 3, 1),
('2013-08-05', 1, 3, 1, 1),
('2014-02-22', 4, 3, 2, 4)
