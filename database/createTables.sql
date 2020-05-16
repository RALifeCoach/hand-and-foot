CREATE TABLE `game` (
  `GameId` int NOT NULL AUTO_INCREMENT,
  `GamePlay` json NOT NULL,
  `GameName` varchar(256) NOT NULL,
  `GameRules` json NOT NULL,
  PRIMARY KEY (`GameId`)
) ENGINE=InnoDB;

CREATE TABLE `game_log` (
  `LogId` varchar(60) NOT NULL,
  `GameId` int DEFAULT NULL,
  `GamePlay` json DEFAULT NULL,
  PRIMARY KEY (`LogId`)
) ENGINE=InnoDB;

CREATE TABLE `user` (
  `UserId` int NOT NULL AUTO_INCREMENT,
  `UserEmail` varchar(256) NOT NULL,
  `Password` varchar(256) NOT NULL,
  `UserName` varchar(100) NOT NULL,
  `role` varchar(45) NOT NULL DEFAULT 'general',
  PRIMARY KEY (`UserId`),
  UNIQUE KEY `UserName_UNIQUE` (`UserEmail`)
) ENGINE=InnoDB;

insert into user (
  `UserEmail`,
  `Password`,
  `UserName`,
  `role`
)
values (
  'admin', 'admin', 'admin', 'admin'
)
