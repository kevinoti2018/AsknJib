CREATE PROCEDURE GetQuestionWithMostAnswers
AS
BEGIN
    SELECT TOP 1 q.*, t.TagName
    FROM QUESTIONS q
    INNER JOIN QUESTIONTAGS qt ON q.QuestionId = qt.QuestionId
    INNER JOIN TAGS t ON qt.TagId = t.TagId
    WHERE q.isDeleted = 0
    ORDER BY q.AnswerCount DESC;
END;
