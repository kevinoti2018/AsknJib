
CREATE PROCEDURE UpvoteAnswer1
    @User_Id VARCHAR(100),
    @AnswerId VARCHAR(100)
AS
BEGIN
    -- Check if the user has not already voted for the answer
    IF NOT EXISTS (
        SELECT 1
        FROM VOTES
        WHERE User_Id = @User_Id
        AND AnswerId = @AnswerId
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
            -- Insert the vote record
            INSERT INTO VOTES (User_Id, AnswerId)
            VALUES (@User_Id, @AnswerId);
            
            -- Increment the VoteCount in the ANSWERS table
            UPDATE ANSWERS
            SET VoteCount = VoteCount + 1
            WHERE AnswerId = @AnswerId;
            
            -- Return success message
            SELECT 'Vote recorded successfully.' AS Result;
        END
        ELSE
        BEGIN
            -- Return error message if the user is the same as the one who posted the answer
            SELECT 'You cannot vote on your own answer.' AS Result;
        END
    END
    ELSE
    BEGIN
        -- Return error message if the user has already voted for the answer
        SELECT 'User has already voted for this answer.' AS Result;
    END
END;