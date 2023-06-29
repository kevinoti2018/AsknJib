
 CREATE PROCEDURE GetUserDetailsByAcceptedAnswer2
AS
BEGIN
    SELECT u.Username, u.Email
    FROM USERS u
    WHERE u.User_Id IN (
        SELECT a.User_Id
        FROM ANSWERS a
        WHERE a.accepted = 1
    )
END