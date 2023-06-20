
CREATE PROCEDURE ResetsPassword
    @Email VARCHAR(50),
    @newPassword VARCHAR(200)
AS
BEGIN
    UPDATE USERS
    SET Password = @newPassword
    WHERE Email = @Email;
END;