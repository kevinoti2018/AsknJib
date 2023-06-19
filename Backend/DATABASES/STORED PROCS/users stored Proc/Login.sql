  CREATE OR ALTER PROCEDURE loginUser
(
  @Email VARCHAR(100),
  @Password VARCHAR(100)
)
AS
BEGIN
  DECLARE @is_valid_login BIT;
  SET @is_valid_login = 0;
  IF EXISTS (SELECT * FROM USERS WHERE Email = @Email AND Password = @Password)
  BEGIN
    SET @is_valid_login = 1;
  END
  SELECT @is_valid_login;
END

