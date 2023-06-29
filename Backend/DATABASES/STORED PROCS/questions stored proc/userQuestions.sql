CREATE OR ALTER PROCEDURE GetQuestionsByUserWithTags2 (
  @User_Id VARCHAR(100)
)
AS
BEGIN
  SET NOCOUNT ON;

  SELECT Q.questionId, Q.Title, Q.Details, Q.Try, Q.Expect, Q.CreateDate, Q.UpdateDate, Q.User_Id, U.Username, Q.VoteCount, Q.isDeleted, Q.AnswerCount, T.TagName
  FROM QUESTIONS Q
  LEFT JOIN QUESTIONTAGS QT ON Q.QuestionId = QT.QuestionId
  LEFT JOIN TAGS T ON QT.TagId = T.TagId
  LEFT JOIN USERS U ON Q.User_Id = U.User_Id
  WHERE Q.User_Id = @User_Id AND Q.isDeleted = 0;
END;