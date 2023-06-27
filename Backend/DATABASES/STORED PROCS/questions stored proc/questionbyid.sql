CREATE PROCEDURE GetQuestionbyId2
(
    @QuestionId VARCHAR(100)
)
AS
BEGIN
    -- Retrieve the question
    SELECT *
    FROM QUESTIONS
    WHERE questionId = @QuestionId;

    -- Retrieve the comments for the answers of the question
    SELECT C.*
    FROM COMMENT C
    INNER JOIN ANSWERS A ON C.AnswerId = A.AnswerId
    WHERE A.QuestionId = @QuestionId;

    -- Retrieve the answers for the question
    SELECT *
    FROM ANSWERS
    WHERE QuestionId = @QuestionId;
END;
