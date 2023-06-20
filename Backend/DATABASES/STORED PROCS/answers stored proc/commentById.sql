CREATE OR ALTER PROCEDURE GetCommentsById
  @CommentId VARCHAR(100)
AS
BEGIN
  SET NOCOUNT ON;

  -- Retrieve comments by AnswerId
  SELECT *
  FROM COMMENT
  WHERE CommentId = @CommentId;
END;