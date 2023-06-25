
CREATE OR ALTER PROCEDURE GetQuestionById (
  @QuestionId VARCHAR(100)
)
AS
BEGIN
  SET NOCOUNT ON;

  SELECT Q.QuestionId, Q.Title, Q.Details, Q.Try, Q.Expect, T.TagName
  FROM QUESTIONS Q
  LEFT JOIN QUESTIONTAGS QT ON Q.QuestionId = QT.QuestionId
  LEFT JOIN TAGS T ON QT.TagId = T.TagId
  WHERE Q.QuestionId = @QuestionId;
END;