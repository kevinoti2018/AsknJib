CREATE OR ALTER PROCEDURE GetQuestionUser
  @AnswerId VARCHAR(100)
AS
BEGIN
  SET NOCOUNT ON;

  -- Retrieve the user ID associated with the question
  SELECT Q.User_Id
  FROM QUESTIONS Q
  JOIN ANSWERS A ON Q.QuestionId = A.QuestionId
  WHERE A.AnswerId = @AnswerId;
END;
