CREATE PROCEDURE UpdateForgotStatus
    @Email VARCHAR(50)
AS
BEGIN
    UPDATE USERS
    SET forgot = 1
    WHERE Email = @Email;
END;
