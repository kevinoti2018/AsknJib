CREATE OR ALTER PROCEDURE GetQuestionsByTag
  @TagName VARCHAR(100)
AS
BEGIN
  SET NOCOUNT ON;

  SELECT Q.QuestionId, Q.Title, Q.Details, Q.Try, Q.Expect, T.TagName
  FROM QUESTIONS Q
  JOIN QUESTIONTAGS QT ON Q.QuestionId = QT.QuestionId
  JOIN TAGS T ON QT.TagId = T.TagId
  WHERE T.TagName LIKE '%' + @TagName + '%';
END;
