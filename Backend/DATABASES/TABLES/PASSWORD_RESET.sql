CREATE TABLE PASSWORD_RESET (
    User_Id VARCHAR(100),
    ResetSuccess BIT NOT NULL DEFAULT 0,
    FOREIGN KEY (User_Id) REFERENCES USERS(User_Id)
);