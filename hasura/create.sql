CREATE SCHEMA IF NOT EXISTS handf
    AUTHORIZATION root;

CREATE TABLE handf.game (
  GameId SERIAL PRIMARY KEY,
  GameState text not null,
  GamePlay json NOT NULL,
  GameName varchar(256) NOT NULL,
  GameRules json NOT NULL
);

CREATE TABLE handf.game_player (
  game_id integer not null,
  player_id integer not null,
  position text not null,
  team text not null,
  hand text not null,
  foot text not null,
  player_state text not null,
  cards_to_draw integer not null,
  cards_to_replace integer not null,
  in_hand boolean not null,
  sort_order text,
  player_name text not null,
  CONSTRAINT game_player_pkey
     PRIMARY KEY (game_id, player_id)
);

CREATE TABLE handf.game_log (
  LogId varchar(60) NOT NULL PRIMARY KEY,
  GameId int DEFAULT NULL,
  GamePlay json DEFAULT NULL,
  Players json DEFAULT NULL
);

CREATE TABLE handf.player (
  Id SERIAL PRIMARY KEY,
  Email varchar(256) NOT NULL UNIQUE,
  Password varchar(256) NOT NULL,
  Name varchar(100) NOT NULL,
  Role varchar(45) NOT NULL DEFAULT 'general'
);

insert into handf.player (
  Email,
  Password,
  Name,
  role
)
values
  ('chris@mail.com', 'chris', 'Christopher', 'super'),
  ('ronna@mail.com', 'ronna', 'Ronna', 'general'),
  ('elayne@mail.com', 'elayne', 'Elayne', 'general'),
  ('peter@mail.com', 'peter', 'Peter', 'general'),
  ('admin', 'admin', 'admin', 'admin');
