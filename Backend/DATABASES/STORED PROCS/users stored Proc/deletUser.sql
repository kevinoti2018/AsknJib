CREATE OR ALTER PROCEDURE DeleteUser
  @User_Id VARCHAR(100)
AS
BEGIN
  SET NOCOUNT ON;

  -- Update the isDeleted column to 1 for the specified user
  UPDATE USERS
  SET isDeleted = 1
  WHERE User_Id = @User_Id;

  -- Update isDeleted to 1 for user's comments
  UPDATE COMMENT
  SET isDeleted = 1
  WHERE User_Id = @User_Id;

  -- Update isDeleted to 1 for user's answers
  UPDATE ANSWERS
  SET isDeleted = 1
  WHERE User_Id = @User_Id;

  -- Update isDeleted to 1 for user's questions, retaining existing value if already 1
  UPDATE QUESTIONS
  SET isDeleted = CASE
                    WHEN isDeleted = 1 THEN 1
                    ELSE 1
                  END
  WHERE User_Id = @User_Id;
  
END;