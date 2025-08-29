---- 1. Create Table: Languages
USE [express];
GO

CREATE TABLE [dbo].[Languages](
	[LanguageId] [int] IDENTITY(1,1) NOT NULL,
	[LanguageCode] [varchar](2) NOT NULL
 CONSTRAINT [PK_Languages] PRIMARY KEY CLUSTERED ([LanguageId] ASC)
) ON [PRIMARY];
GO

---- 2. Create table: Authors
IF OBJECT_ID('dbo.Authors', 'U') IS NULL
BEGIN
    CREATE TABLE [dbo].[Authors](
       [AuthorId][int] IDENTITY(1,1) NOT NULL,
	   [Name] [nvarchar](100) NOT NULL,
	   [Middlename] [nvarchar](100) NULL,
	   [Surname] [nvarchar](100) NULL,
	   [CreatedBy] [int] NULL,
	   [CreatedAtUtc] [datetimeoffset](7) NOT NULL,
	   [ModifiedBy] [int] NULL,
	   [ModifiedAtUtc] [datetimeoffset](7) NOT NULL,
        CONSTRAINT [PK_Authors] PRIMARY KEY CLUSTERED 
        (
            [AuthorId] ASC
        ) WITH (
            PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, 
            IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, 
            ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF
        ) ON [PRIMARY]
    ) ON [PRIMARY]
END

---- 3. Create table: Books
USE [express];
GO

CREATE TABLE [dbo].[Books](
	[BookId] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](100) NOT NULL,
	[Year] [int] NULL,
	[LanguageId] [int] NULL,
	[ISBN] [varchar](13) NULL,
	[Description] [nvarchar](1000) NULL,
	[DownloadUrl] [nvarchar](100) NULL,
	[ImageUrl] [nvarchar](100) NULL,
	[CreatedBy] [int] NULL,
	[CreatedAtUtc] [datetimeoffset](7) NOT NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedAtUtc] [datetimeoffset](7) NOT NULL,
 CONSTRAINT [PK_Libri] PRIMARY KEY CLUSTERED ([BookId] ASC)
) ON [PRIMARY];
GO

ALTER TABLE [dbo].[Books] ADD CONSTRAINT [Books_CreatedAtUtc] DEFAULT (sysutcdatetime()) FOR [CreatedAtUtc];
GO

ALTER TABLE [dbo].[Books] ADD CONSTRAINT [Books_ModifiedAtUtc] DEFAULT (sysutcdatetime()) FOR [ModifiedAtUtc];
GO

---- 4. Create table: BooksAuthors

USE [express];
GO

CREATE TABLE [dbo].[BooksAuthors](
	[BookAuthorId] [int] IDENTITY(1,1) NOT NULL,
	[BookId] [int] NOT NULL,
	[AuthorId] [int] NOT NULL,
 CONSTRAINT [PK_BooksAuthors] PRIMARY KEY CLUSTERED ([BookAuthorId] ASC),
 CONSTRAINT [AK_BooksAuthors_BookId_AuthorId] UNIQUE NONCLUSTERED ([BookId], [AuthorId])
) ON [PRIMARY];
GO


---- Add the relationships (foreign keys): BooksAuthors → Authors and Books

ALTER TABLE [dbo].[BooksAuthors]  WITH CHECK ADD CONSTRAINT [FK_BooksAuthors_Authors] FOREIGN KEY([AuthorId])
REFERENCES [dbo].[Authors] ([AuthorId]);
GO

ALTER TABLE [dbo].[BooksAuthors] CHECK CONSTRAINT [FK_BooksAuthors_Authors];
GO

ALTER TABLE [dbo].[BooksAuthors]  WITH CHECK ADD CONSTRAINT [FK_BooksAuthors_Libri] FOREIGN KEY([BookId])
REFERENCES [dbo].[Books] ([BookId]);
GO

ALTER TABLE [dbo].[BooksAuthors] CHECK CONSTRAINT [FK_BooksAuthors_Libri];
GO

---- 5. Create table: Users

CREATE TABLE dbo.Users (
    UserId INT IDENTITY(1,1) PRIMARY KEY,
    UserName NVARCHAR(50) 
);

-- Insert example user
INSERT INTO dbo.Users (UserId, UserName) VALUES (1, 'Fernanda');
-- INSERT INTO dbo.Users (UserId, Email) VALUES (1, 'fernanda@example.com');