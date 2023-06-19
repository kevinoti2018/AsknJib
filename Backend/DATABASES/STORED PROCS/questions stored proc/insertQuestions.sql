CREATE OR ALTER PROCEDURE InsertQuestionWithTags (
  @QuestionId VARCHAR(100),
  @Title VARCHAR(200),
  @Details TEXT,
  @Try TEXT,
  @Expect TEXT,
  @CreateDate DATETIME,
  @User_Id VARCHAR(100),
  @VoteCount INT,
  @Tags VARCHAR(MAX)
)
AS
BEGIN
  SET NOCOUNT ON;

  -- Insert the new question into the QUESTIONS table
  INSERT INTO QUESTIONS (QuestionId, Title, Details, Try, Expect, CreateDate, UpdateDate, User_Id, VoteCount)
  VALUES (@QuestionId, @Title, @Details, @Try, @Expect, @CreateDate, NULL, @User_Id, @VoteCount);

  -- Split the tags string into individual tags
  DECLARE @TagList TABLE (Tag VARCHAR(100));
  INSERT INTO @TagList (Tag)
  SELECT value FROM STRING_SPLIT(@Tags, ',');

  -- Insert the tags into the TAGS table if they don't exist already
  INSERT INTO TAGS (TagName)
  SELECT DISTINCT Tag FROM @TagList
  WHERE Tag NOT IN (SELECT TagName FROM TAGS);

  -- Insert the question-tag associations into the QUESTIONTAGS table
  INSERT INTO QUESTIONTAGS (QuestionId, TagId)
  SELECT @QuestionId, T.TagId
  FROM @TagList TL
  JOIN TAGS T ON TL.Tag = T.TagName;
END;
