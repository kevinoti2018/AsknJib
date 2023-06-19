CREATE OR ALTER PROCEDURE insertUser(
 @User_Id VARCHAR(100),
 @Username VARCHAR(100),
 @Email VARCHAR(100),
 @Password VARCHAR(100)
)
AS
BEGIN
  INSERT INTO USERS(
  User_Id,
  Username,
  Email,
  Password
  )
  VALUES(
   @User_Id,
   @Username,
   @Email,
   @Password
  )

END

EXEC insertUser 
  @User_Id = '123456789',
  @Username = 'john_doe',
  @Email = 'johndoe@example.com',
  @Password = 'password123';

