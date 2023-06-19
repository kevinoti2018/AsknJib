
CREATE OR ALTER PROCEDURE InsertAnswer (
  @AnswerId INT,
  @Answer TEXT,
  @QuestionId VARCHAR(100),
  @CreatedDate DATETIME,
  @User_Id VARCHAR(100)
)
AS
BEGIN
  SET NOCOUNT ON;

  -- Insert the new answer into the ANSWERS table
  INSERT INTO ANSWERS (AnswerId, Answer, QuestionId, CreatedDate, User_Id)
  VALUES (@AnswerId, @Answer, @QuestionId, @CreatedDate, @User_Id);

  -- Update the AnswerCount in the QUESTIONS table by incrementing by 1
  UPDATE QUESTIONS
  SET AnswerCount = AnswerCount + 1
  WHERE QuestionId = @QuestionId;
END;