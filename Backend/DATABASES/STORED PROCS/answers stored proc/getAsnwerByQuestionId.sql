CREATE PROCEDURE GetAnswersByQuestionId
    @QuestionId VARCHAR(100)
AS
BEGIN
    SELECT AnswerId, Answer, VoteCount, CreatedDate, User_Id, accepted
    FROM ANSWERS
    WHERE QuestionId = @QuestionId;
END;
