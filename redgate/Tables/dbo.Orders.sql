CREATE TABLE [dbo].[Orders]
(
[ID] [uniqueidentifier] NOT NULL,
[CustomerID] [uniqueidentifier] NOT NULL,
[OrderNumber] [nchar] (10) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL
)
GO
ALTER TABLE [dbo].[Orders] ADD CONSTRAINT [PK_Orders] PRIMARY KEY CLUSTERED  ([ID])
GO
