CREATE TABLE ANSWERS (
    AnswerId VARCHAR(100) PRIMARY KEY,
    Answer TEXT,
    VoteCount INT DEFAULT 0,
    QuestionId VARCHAR(100),
    CreatedDate DATETIME,
    User_Id VARCHAR(100),
    accepted BIT NOT NULL DEFAULT 0,
    FOREIGN KEY (QuestionId) REFERENCES QUESTIONS(QuestionId),
    FOREIGN KEY (User_Id) REFERENCES USERS(User_Id)
);
