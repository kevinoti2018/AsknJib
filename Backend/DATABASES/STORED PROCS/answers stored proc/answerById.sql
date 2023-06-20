CREATE OR ALTER PROCEDURE GetAnswerById
  @AnswerId VARCHAR(100)
AS
BEGIN
  SET NOCOUNT ON;

  -- Retrieve the answer by AnswerId
  SELECT AnswerId,Answer,VoteCount,User_Id,isDeleted,QuestionId
  FROM ANSWERS
  WHERE AnswerId = @AnswerId;
END;