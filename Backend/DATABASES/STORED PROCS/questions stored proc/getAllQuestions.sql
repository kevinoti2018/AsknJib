
CREATE OR ALTER PROCEDURE GetAllQuestionsWithTags
    @PageNumber INT,
    @PageSize INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT Q.QuestionId, Q.Title, Q.Details, Q.Try, Q.Expect, T.TagName
    FROM QUESTIONS Q
    JOIN QUESTIONTAGS QT ON Q.QuestionId = QT.QuestionId
    JOIN TAGS T ON QT.TagId = T.TagId
    WHERE Q.isDeleted = 0
    ORDER BY Q.QuestionId
    OFFSET (@PageNumber - 1) * @PageSize ROWS
    FETCH NEXT @PageSize ROWS ONLY;
END;