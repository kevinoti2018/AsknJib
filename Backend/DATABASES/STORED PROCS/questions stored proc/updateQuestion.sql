CREATE PROCEDURE updateQuiz (
  @QuestionId VARCHAR(100),
  @Title VARCHAR(200),
  @Details TEXT,
  @Try TEXT,
  @Expect TEXT,
  @UpdateDate DATETIME,
  @User_Id VARCHAR(100),
  @Tags VARCHAR(MAX)
)
AS
BEGIN
  SET NOCOUNT ON;

  -- Update the question in the QUESTIONS table
  UPDATE QUESTIONS
  SET Title = @Title,
      Details = @Details,
      Try = @Try,
      Expect = @Expect,
      UpdateDate = @UpdateDate,
      User_Id = @User_Id
     
  WHERE QuestionId = @QuestionId;

  -- Delete existing question-tag associations for the updated question
  DELETE FROM QUESTIONTAGS
  WHERE QuestionId = @QuestionId;

  -- Split the tags string into individual tags
  DECLARE @TagList TABLE (Tag VARCHAR(100));
  INSERT INTO @TagList (Tag)
  SELECT value FROM STRING_SPLIT(@Tags, ',');

  -- Insert the tags into the TAGS table if they don't exist already
  INSERT INTO TAGS (TagName)
  SELECT DISTINCT Tag FROM @TagList
  WHERE Tag NOT IN (SELECT TagName FROM TAGS);

  -- Insert the updated question-tag associations into the QUESTIONTAGS table
  INSERT INTO QUESTIONTAGS (QuestionId, TagId)
  SELECT @QuestionId, T.TagId
  FROM @TagList TL
  JOIN TAGS T ON TL.Tag = T.TagName;

  -- Return the updated question with tags
  SELECT Q.*, T.TagName
  FROM QUESTIONS Q
  JOIN QUESTIONTAGS QT ON Q.QuestionId = QT.QuestionId
  JOIN TAGS T ON QT.TagId = T.TagId
  WHERE Q.QuestionId = @QuestionId;
END;
