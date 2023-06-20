CREATE OR ALTER PROCEDURE GetUsers
AS
BEGIN
  SET NOCOUNT ON;

  -- Retrieve all users from the USERS table, excluding the deleted users
  SELECT User_Id, Username, Email, IsAdmin, isDeleted
  FROM USERS
  WHERE isDeleted = 0;
END;
