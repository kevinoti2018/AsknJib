CREATE PROCEDURE UpvoteQuestion3
    @User_Id VARCHAR(100),
    @QuestionId VARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;

    -- Check if the user who asked the question is attempting to vote
    IF EXISTS (SELECT * FROM QUESTIONS WHERE QuestionId = @QuestionId AND User_Id = @User_Id)
    BEGIN
        SELECT 'The user who asked the question cannot vote' AS ErrorMessage;
        RETURN;
    END

    -- Check if the user has already voted for the question
    IF EXISTS (SELECT * FROM QuestionVote WHERE User_Id = @User_Id AND QuestionId = @QuestionId)
    BEGIN
        -- Check if the user's previous vote was a downvote
        IF EXISTS (SELECT * FROM QuestionVote WHERE User_Id = @User_Id AND QuestionId = @QuestionId AND VoteType = 'downvote')
        BEGIN
            -- Update the existing vote record to an upvote
            UPDATE QuestionVote
            SET VoteType = 'upvote'
            WHERE User_Id = @User_Id AND QuestionId = @QuestionId;

            -- Update the vote count in the QUESTIONS table
            UPDATE QUESTIONS
            SET VoteCount = VoteCount + 1  -- Increase by 1 to account for changing the vote
            WHERE questionId = @QuestionId;

            SELECT 'Upvote successful' AS Message;
        END
        ELSE
        BEGIN
            SELECT 'User has already upvoted for the question' AS ErrorMessage;
            RETURN;
        END
    END
    ELSE
    BEGIN
        -- Insert a new upvote record into the QuestionVote table
        INSERT INTO QuestionVote (User_Id, QuestionId, VoteType)
        VALUES (@User_Id, @QuestionId, 'upvote');

        -- Update the vote count in the QUESTIONS table
        UPDATE QUESTIONS
        SET VoteCount = VoteCount + 1
        WHERE questionId = @QuestionId;

        SELECT 'Upvote successful' AS Message;
    END
END
