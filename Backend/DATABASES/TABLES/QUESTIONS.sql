CREATE TABLE QUESTIONS (
    questionId VARCHAR(100) NOT NULL PRIMARY KEY,
    Title VARCHAR(200),
    Details TEXT,
    Try TEXT,
    Expect TEXT,
    CreateDate DATETIME,
    UpdateDate DATETIME,
    User_Id VARCHAR(100),
    VoteCount INT,
    isDeleted BBIT NOT NULL DEFAULT 0,
    AnswerCount INT DEFAULT 0,
   FOREIGN KEY (User_Id) REFERENCES USERS(User_Id)
);
