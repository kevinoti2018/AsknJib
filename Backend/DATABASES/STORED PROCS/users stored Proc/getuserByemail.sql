CREATE PROCEDURE GetUsersByEmail1
    @Email VARCHAR(50)
AS
BEGIN
    SELECT *
    FROM USERS
    WHERE Email = @Email;
END;
  