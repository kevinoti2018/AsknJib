
CREATE PROCEDURE DownvoteQuestion2
    @User_Id VARCHAR(100),
    @QuestionId VARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;

    -- Check if the user who asked the question is attempting to vote
    IF EXISTS (SELECT * FROM QUESTIONS WHERE QuestionId = @QuestionId AND User_Id = @User_Id)
    BEGIN
        THROW 50001, 'The user who asked the question cannot vote', 1;
    END

    -- Check if the user has already voted for the question
    IF EXISTS (SELECT * FROM QuestionVote WHERE User_Id = @User_Id AND QuestionId = @QuestionId)
    BEGIN
        -- Check if the user's previous vote was an upvote
        IF EXISTS (SELECT * FROM QuestionVote WHERE User_Id = @User_Id AND QuestionId = @QuestionId AND VoteType = 'upvote')
        BEGIN
            -- Update the existing vote record to a downvote
            UPDATE QuestionVote
            SET VoteType = 'downvote'
            WHERE User_Id = @User_Id AND QuestionId = @QuestionId;

            -- Update the vote count in the QUESTIONS table
            UPDATE QUESTIONS
            SET VoteCount = VoteCount - 1  -- Decrease by 1 to account for changing the vote
            WHERE questionId = @QuestionId;

            SELECT 'Downvote successful' AS Message;
        END
        ELSE
        BEGIN
            THROW 50002, 'User has already downvoted for the question', 1;
        END
    END
    ELSE
    BEGIN
        -- Insert a new downvote record into the QuestionVote table
        INSERT INTO QuestionVote (User_Id, QuestionId, VoteType)
        VALUES (@User_Id, @QuestionId, 'downvote');

        -- Update the vote count in the QUESTIONS table
        UPDATE QUESTIONS
        SET VoteCount = CASE WHEN VoteCount > 0 THEN VoteCount - 1 ELSE 0 END
        WHERE questionId = @QuestionId;

        SELECT 'Downvote successful' AS Message;
    END
END
