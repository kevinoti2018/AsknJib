CREATE PROCEDURE GetQuestionWithMostAnswers
AS
BEGIN
    SELECT TOP 1 *
    FROM QUESTIONS
    WHERE isDeleted = 0
    ORDER BY AnswerCount DESC;
END;
