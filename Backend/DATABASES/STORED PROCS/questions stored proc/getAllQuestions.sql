CREATE OR ALTER PROCEDURE GetAllQuestions
    @PageNumber INT,
    @PageSize INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT Q.questionId, Q.Title, Q.Details, Q.Try, Q.Expect, Q.CreateDate, Q.UpdateDate, Q.User_Id, U.Username, Q.VoteCount, Q.isDeleted, Q.AnswerCount, T.TagName
    FROM (
        SELECT ROW_NUMBER() OVER (ORDER BY Q.CreateDate DESC) AS RowNum, Q.questionId, Q.Title, Q.Details, Q.Try, Q.Expect, Q.CreateDate, Q.UpdateDate, Q.User_Id, Q.VoteCount, Q.isDeleted, Q.AnswerCount
        FROM QUESTIONS Q
        WHERE Q.isDeleted = 0
    ) AS Q
    LEFT JOIN QUESTIONTAGS QT ON Q.questionId = QT.QuestionId
    LEFT JOIN TAGS T ON QT.TagId = T.TagId
    LEFT JOIN USERS U ON Q.User_Id = U.User_Id
    WHERE Q.RowNum > (@PageNumber - 1) * @PageSize AND Q.RowNum <= (@PageNumber * @PageSize)
    ORDER BY Q.RowNum;
END;
