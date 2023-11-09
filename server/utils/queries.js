const getTricksQuery = `
WITH tricks AS (
  (
    SELECT user_trick.*, trick.*
    FROM "user_trick" 
    JOIN "trick" ON user_trick.trick_id = trick.id
    WHERE "user_id" = $1 AND "session_countdown" = 0 AND trick.level = FLOOR($2)
    ORDER BY RANDOM() 
  )
  UNION ALL
  (
    SELECT user_trick.*, trick.*
    FROM "user_trick" 
    JOIN "trick" ON user_trick.trick_id = trick.id
    WHERE "user_id" = $1 AND "session_countdown" = 0 AND trick.level = FLOOR($2) - 1
    ORDER BY RANDOM() 
  )
  UNION ALL
  (
    SELECT user_trick.*, trick.*
    FROM "user_trick" 
    JOIN "trick" ON user_trick.trick_id = trick.id
    WHERE "user_id" = $1 AND "session_countdown" = 0 AND trick.level = FLOOR($2) - 2
    ORDER BY RANDOM() 
  )
  UNION ALL
  (
    SELECT user_trick.*, trick.*
    FROM "user_trick" 
    JOIN "trick" ON user_trick.trick_id = trick.id
    WHERE "user_id" = $1 AND "session_countdown" = 0 AND trick.level <= FLOOR($2)
    ORDER BY RANDOM() 
  )
)
SELECT * FROM tricks LIMIT 10;
`;

const updateMasteryLevelAndNote = `
          UPDATE "user_trick"
          SET "session_countdown" = $1, "mastery_level" = $2, "note" = $3
          WHERE "user_id" = $4 AND "trick_id" = $5;
        `;

const insertNewTricksAfterSessionQuery = `
        WITH new_tricks AS (
          (
            SELECT trick.id
            FROM trick
            WHERE trick.level = $2 AND NOT EXISTS (
              SELECT 1
              FROM user_trick
              WHERE user_trick.user_id = $1 AND user_trick.trick_id = trick.id
            )
            ORDER BY RANDOM()
          )
          UNION ALL
          (
            SELECT trick.id
            FROM trick
            WHERE trick.level < $2 AND NOT EXISTS (
              SELECT 1
              FROM user_trick
              WHERE user_trick.user_id = $1 AND user_trick.trick_id = trick.id
            )
            ORDER BY RANDOM()
          )
          LIMIT $3
        )
        INSERT INTO user_trick (user_id, trick_id, session_countdown)
        SELECT $1, new_tricks.id, 0
        FROM new_tricks;
      `;

module.exports = {
  getTricksQuery,
  updateMasteryLevelAndNote,
  insertNewTricksAfterSessionQuery,
};
