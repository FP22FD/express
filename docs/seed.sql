---- 1. Check: If tables are empty before inserting new data

SELECT *
FROM [dbo].[Languages]

SELECT *
FROM [dbo].[Authors]

SELECT *
FROM [dbo].[Books]

SELECT *
FROM [dbo].[BooksAuthors]

---- 2. Insert languages ​​into table: Languages
INSERT INTO dbo.Languages (LanguageCode) VALUES ('EN');  -- English 1
INSERT INTO dbo.Languages (LanguageCode) VALUES ('PT');  -- Portuguese 2
INSERT INTO dbo.Languages (LanguageCode) VALUES ('ES');  -- Spanish 3
INSERT INTO dbo.Languages (LanguageCode) VALUES ('IT');  -- Italian 4
INSERT INTO dbo.Languages (LanguageCode) VALUES ('NO');  -- Norwegian 5
INSERT INTO dbo.Languages (LanguageCode) VALUES ('FR');  -- French 6
INSERT INTO dbo.Languages (LanguageCode) VALUES ('DE');  -- German 7


---- 3. Insert Author into table: Authors
INSERT INTO dbo.Authors (Name, Middlename, Surname, CreatedBy, CreatedAtUtc, ModifiedBy, ModifiedAtUtc) -- 1
VALUES ('Charles', NULL, 'Duhigg', 1, SYSUTCDATETIME(), 1, SYSUTCDATETIME());

INSERT INTO dbo.Authors (Name, Middlename, Surname, CreatedBy, CreatedAtUtc, ModifiedBy, ModifiedAtUtc) -- 2
VALUES ('Antony', NULL, 'Robbins', 1, SYSUTCDATETIME(), 1, SYSUTCDATETIME());

INSERT INTO dbo.Authors (Name, Middlename, Surname, CreatedBy, CreatedAtUtc, ModifiedBy, ModifiedAtUtc) -- 3
VALUES ('Erlend', NULL, 'Loe', 1, SYSUTCDATETIME(), 1, SYSUTCDATETIME());

INSERT INTO dbo.Authors (Name, Middlename, Surname, CreatedBy, CreatedAtUtc, ModifiedBy, ModifiedAtUtc) -- 4
VALUES ('Zeshan', NULL, 'Shakar', 1, SYSUTCDATETIME(), 1, SYSUTCDATETIME());

INSERT INTO dbo.Authors (Name, Middlename, Surname, CreatedBy, CreatedAtUtc, ModifiedBy, ModifiedAtUtc) -- 5
VALUES ('Gayle', NULL, 'Forman', 1, SYSUTCDATETIME(), 1, SYSUTCDATETIME());

INSERT INTO dbo.Authors (Name, Middlename, Surname, CreatedBy, CreatedAtUtc, ModifiedBy, ModifiedAtUtc) -- 6
VALUES ('kent', NULL, 'Boogaart', 1, SYSUTCDATETIME(), 1, SYSUTCDATETIME());

INSERT INTO dbo.Authors (Name, Middlename, Surname, CreatedBy, CreatedAtUtc, ModifiedBy, ModifiedAtUtc) -- 7
VALUES ('Knut', NULL, 'Næsheim', 1, SYSUTCDATETIME(), 1, SYSUTCDATETIME());

INSERT INTO dbo.Authors (Name, Middlename, Surname, CreatedBy, CreatedAtUtc, ModifiedBy, ModifiedAtUtc) -- 8
VALUES ('Janne', 'Olsen', 'Hals', 1, SYSUTCDATETIME(), 1, SYSUTCDATETIME());

---- 3. Insert Book in table: Books
INSERT INTO dbo.Books  -- 1
(Title, Year, LanguageId, ISBN, Description, DownloadUrl, ImageUrl, CreatedBy, CreatedAtUtc, ModifiedBy, ModifiedAtUtc)
VALUES 
('Il potere delle abitudini', 2015, 4, '9788850236909', 'Come si formano. Quanto ci condizionano. Come cambiarle.', NULL, NULL, 1, SYSUTCDATETIME(), 1, SYSUTCDATETIME());

INSERT INTO dbo.Books -- 2
(Title, Year, LanguageId, ISBN, Description, DownloadUrl, ImageUrl, CreatedBy, CreatedAtUtc, ModifiedBy, ModifiedAtUtc)
VALUES 
('Come ottenere il meglio da sé e dagli altri', 2018, 4, '9788845246111', 'Il manuale del successo nella vita e nel lavoro.', NULL, NULL, 1, SYSUTCDATETIME(), 1, SYSUTCDATETIME());

INSERT INTO dbo.Books -- 3
(Title, Year, LanguageId, ISBN, Description, DownloadUrl, ImageUrl, CreatedBy, CreatedAtUtc, ModifiedBy, ModifiedAtUtc)
VALUES 
('Tatt av kvinnen', 2017, 5, '9788202425968', 'En ung kvinne dukker opp fra ingensteds og begynner å forsyne seg av livet til jeg-personen.', NULL, NULL, 1, SYSUTCDATETIME(), 1, SYSUTCDATETIME());

INSERT INTO dbo.Books -- 4
(Title, Year, LanguageId, ISBN, Description, DownloadUrl, ImageUrl, CreatedBy, CreatedAtUtc, ModifiedBy, ModifiedAtUtc)
VALUES 
('Tante Ulrikkes vei', 2018, 5, '9788205512146', 'To gutter vokser opp i Tante Ulrikkes vei på Stovner i Oslo. Foreldrene hadde et håp.', NULL, NULL, 1, SYSUTCDATETIME(), 1, SYSUTCDATETIME());

INSERT INTO dbo.Books -- 5
(Title, Year, LanguageId, ISBN, Description, DownloadUrl, ImageUrl, CreatedBy, CreatedAtUtc, ModifiedBy, ModifiedAtUtc)
VALUES 
('Bare en Dag', 2014, 5, '9788202419080', 'Når Allyson, snill pike fra USA, første gang møter Willem, avslappet og kul skuespiller fra Nederland, er det utvilsom en gnist som tennes.', NULL, NULL, 1, SYSUTCDATETIME(), 1, SYSUTCDATETIME());


INSERT INTO dbo.Books -- 6
(Title, Year, LanguageId, ISBN, Description, DownloadUrl, ImageUrl, CreatedBy, CreatedAtUtc, ModifiedBy, ModifiedAtUtc)
VALUES 
('You, I, and ReactiveUI', 2014, 1, '9781388578381', 'A concise and practical guide to building reactive user interfaces using the ReactiveUI framework in .NET. It focuses on clear patterns for managing state, data flow, and user interaction in modern desktop and mobile apps.', NULL, NULL, 1, SYSUTCDATETIME(), 1, SYSUTCDATETIME());

INSERT INTO dbo.Books -- 7
(Title, Year, LanguageId, ISBN, Description, DownloadUrl, ImageUrl, CreatedBy, CreatedAtUtc, ModifiedBy, ModifiedAtUtc)
VALUES 
('Natta, Fantus!', 2021, 5, '9788241934933', 'Det tar tid før det blir god natt for siste gang.', NULL, NULL, 1, SYSUTCDATETIME(), 1, SYSUTCDATETIME());

---- 3. Relate Book to Author: BooksAuthors

INSERT INTO dbo.BooksAuthors (BookId, AuthorId)
VALUES (1, 1);

INSERT INTO dbo.BooksAuthors (BookId, AuthorId)
VALUES (2, 2);

INSERT INTO dbo.BooksAuthors (BookId, AuthorId)
VALUES (3, 3);

INSERT INTO dbo.BooksAuthors (BookId, AuthorId)
VALUES (4, 4);

INSERT INTO dbo.BooksAuthors (BookId, AuthorId)
VALUES (5, 5);

INSERT INTO dbo.BooksAuthors (BookId, AuthorId)
VALUES (6, 6);

INSERT INTO dbo.BooksAuthors (BookId, AuthorId)
VALUES (7, 7);

INSERT INTO dbo.BooksAuthors (BookId, AuthorId)
VALUES (7, 8);