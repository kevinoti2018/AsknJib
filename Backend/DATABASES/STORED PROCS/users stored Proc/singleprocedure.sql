CREATE PROCEDURE GetUserByID1
    @UserID VARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;
    
    SELECT *
    FROM USERS
    WHERE User_Id = @UserID AND isDeleted = 0;
END;
