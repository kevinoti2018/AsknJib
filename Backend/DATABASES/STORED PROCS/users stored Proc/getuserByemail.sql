CREATE PROCEDURE GetUsersByEmail
    @userEmail VARCHAR(50)
AS
BEGIN
    SELECT *
    FROM USERS
    WHERE Email = @userEmail;
END;
  