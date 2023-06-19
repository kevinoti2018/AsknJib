CREATE OR ALTER PROCEDURE GetUsers
AS
BEGIN
  SET NOCOUNT ON;

  -- Retrieve all users from the USERS table
  SELECT User_Id, Username, Email, IsAdmin, isDeleted
  FROM USERS;
END;