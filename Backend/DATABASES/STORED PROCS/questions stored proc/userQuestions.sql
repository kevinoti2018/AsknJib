CREATE OR ALTER PROCEDURE GetQuestionsByUserWithTags (
  @User_Id VARCHAR(100)
)
AS
BEGIN
  SET NOCOUNT ON;

  SELECT Q.QuestionId, Q.Title, Q.Details, Q.Try, Q.Expect, T.TagName
  FROM QUESTIONS Q
  LEFT JOIN QUESTIONTAGS QT ON Q.QuestionId = QT.QuestionId
  LEFT JOIN TAGS T ON QT.TagId = T.TagId
  WHERE Q.User_Id = @User_Id;
END;

EXEC GetQuestionsByUserWithTags @User_Id = 'user1';