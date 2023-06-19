CREATE OR ALTER PROCEDURE GetUserById
  @User_Id VARCHAR(100)
AS
BEGIN
  SET NOCOUNT ON;

  -- Retrieve the user by ID
  SELECT User_Id, Username, Email, IsAdmin, isDeleted
  FROM USERS
  WHERE User_Id = @User_Id;
END;
