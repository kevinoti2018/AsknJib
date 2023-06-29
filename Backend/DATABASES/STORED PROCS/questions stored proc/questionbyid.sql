CREATE PROCEDURE GetQuestionbyId4
(
    @QuestionId VARCHAR(100)
)
AS
BEGIN
    -- Retrieve the question
    SELECT *
    FROM QUESTIONS
    WHERE QuestionId = @QuestionId;

    -- Retrieve the answers for the question along with their bodies and usernames
    SELECT A.AnswerId, A.Answer, A.VoteCount, A.QuestionId, A.CreatedDate, A.User_Id, U.Username AS AnswerUsername, A.accepted,
           C.CommentId, C.Comment, C.CreationDate, C.User_Id AS CommentUser_Id, U.Username AS CommentUsername
    FROM ANSWERS A
    LEFT JOIN COMMENT C ON C.AnswerId = A.AnswerId
    LEFT JOIN USERS U ON U.User_Id = A.User_Id
    WHERE A.QuestionId = @QuestionId;

END;
