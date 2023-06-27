CREATE PROCEDURE DownvoteAnswers1
    @User_Id VARCHAR(100),
    @AnswerId VARCHAR(100)
AS
BEGIN
    -- Check if the user has already voted for the answer
    IF NOT EXISTS (
        SELECT 1
        FROM VOTES
        WHERE User_Id = @User_Id
        AND AnswerId = @AnswerId
    )
    BEGIN
        -- Check if the user is the same as the one who posted the answer
        IF NOT EXISTS (
            SELECT 1
            FROM ANSWERS
            WHERE AnswerId = @AnswerId
            AND User_Id = @User_Id
        )
        BEGIN
            -- Insert the vote record if the user is different from the answer owner
            INSERT INTO VOTES (User_Id, AnswerId, VoteType)
            VALUES (@User_Id, @AnswerId, 'downvote');

            -- Decrement the VoteCount in the ANSWERS table, retain as 0 if already 0 or negative
            UPDATE ANSWERS
            SET VoteCount = CASE
                WHEN VoteCount <= 0 THEN 0
                ELSE VoteCount - 1
                END
            WHERE AnswerId = @AnswerId;

            -- Return success status
            SELECT 'Downvote recorded successfully.' AS Result;
        END
        ELSE
        BEGIN
            -- Return error status if the user is the same as the one who posted the answer
            SELECT 'You cannot vote on your own answer.' AS Result;
        END
    END
    ELSE
    BEGIN
        -- Check if the user's previous vote was an upvote
        IF EXISTS (
            SELECT 1
            FROM VOTES
            WHERE User_Id = @User_Id
            AND AnswerId = @AnswerId
            AND VoteType = 'upvote'
        )
        BEGIN
            -- Update the existing upvote record to a downvote
            UPDATE VOTES
            SET VoteType = 'downvote'
            WHERE User_Id = @User_Id
            AND AnswerId = @AnswerId;

            -- Decrement the VoteCount in the ANSWERS table
            UPDATE ANSWERS
            SET VoteCount = CASE
                WHEN VoteCount <= 0 THEN 0
                ELSE VoteCount - 1
                END
            WHERE AnswerId = @AnswerId;

            -- Return success status
            SELECT 'Downvote recorded successfully.' AS Result;
        END
        ELSE
        BEGIN
            -- Return error status if the user has already downvoted for the answer
            SELECT 'User has already downvoted for this answer.' AS Result;
        END
    END
END;