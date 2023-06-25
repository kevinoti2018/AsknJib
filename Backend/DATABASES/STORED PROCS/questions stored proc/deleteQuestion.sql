  CREATE OR ALTER PROCEDURE DeleteQuestion (
  @QuestionId VARCHAR(100)
)
AS
BEGIN
  SET NOCOUNT ON;

  -- Update the isDeleted flag in the QUESTIONS table
  UPDATE QUESTIONS
  SET isDeleted = 1
  WHERE QuestionId = @QuestionId;

  -- Delete the associated tags from the QUESTIONTAGS table
  DELETE FROM QUESTIONTAGS
  WHERE QuestionId = @QuestionId;
END;
