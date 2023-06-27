
CREATE PROCEDURE upvoteAnswers
    @User_Id VARCHAR(100),
    @AnswerId VARCHAR(100)
AS
BEGIN
    -- Check if the user has not already upvoted the answer
    IF NOT EXISTS (
        SELECT 1
        FROM VOTES
        WHERE User_Id = @User_Id
        AND AnswerId = @AnswerId
        AND VoteType = 'upvote'
    )
    BEGIN
        -- Check if the user is not the same as the one who posted the answer
        IF NOT EXISTS (
            SELECT 1
            FROM ANSWERS
            WHERE AnswerId = @AnswerId
            AND User_Id = @User_Id
        )
        BEGIN
            -- Check if the user has previously downvoted the answer
            IF EXISTS (
                SELECT 1
                FROM VOTES
                WHERE User_Id = @User_Id
                AND AnswerId = @AnswerId
                AND VoteType = 'downvote'
            )
            BEGIN
                -- Update the existing downvote record to an upvote
                UPDATE VOTES
                SET VoteType = 'upvote'
                WHERE User_Id = @User_Id
                AND AnswerId = @AnswerId;

                -- Increment the VoteCount in the ANSWERS table
                UPDATE ANSWERS
                SET VoteCount = VoteCount + 1 -- Increase by 2 to convert downvote to upvote
                WHERE AnswerId = @AnswerId;

                -- Return success message
                SELECT 'Upvote recorded successfully.' AS Result;
            END
            ELSE
            BEGIN
                -- Insert a new upvote record
                INSERT INTO VOTES (User_Id, AnswerId, VoteType)
                VALUES (@User_Id, @AnswerId, 'upvote');

                -- Increment the VoteCount in the ANSWERS table
                UPDATE ANSWERS
                SET VoteCount = VoteCount + 1
                WHERE AnswerId = @AnswerId;

                -- Return success message
                SELECT 'Upvote recorded successfully.' AS Result;
            END
        END
        ELSE
        BEGIN
            -- Return error message if the user is the same as the one who posted the answer
            SELECT 'You cannot vote on your own answer.' AS Result;
        END
    END
    ELSE
    BEGIN
        -- Return error message if the user has already upvoted the answer
        SELECT 'User has already upvoted this answer.' AS Result;
    END
END;