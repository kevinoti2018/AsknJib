

CREATE OR ALTER PROCEDURE AddComment (
  @CommentId VARCHAR(100),
  @Comment TEXT,
  @CreationDate DATETIME,
  @User_Id VARCHAR(100),
  @AnswerId VARCHAR(100)
)
AS
BEGIN
  SET NOCOUNT ON;

  -- Insert the new comment into the COMMENT table
  INSERT INTO COMMENT (CommentId, Comment, CreationDate, User_Id, AnswerId)
  VALUES (@CommentId, @Comment, @CreationDate, @User_Id, @AnswerId);
END;
