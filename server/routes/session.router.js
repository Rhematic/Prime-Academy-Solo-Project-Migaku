const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  getTricksQuery,
  updateMasteryLevelAndNote,
  insertNewTricksAfterSessionQuery,
} = require("../utils/queries.js");

const MASTERY_VALUES = {
  5: 1.0,
  4: 0.8,
  3: 0.6,
  2: 0.4,
  1: 0.2,
  0: -0.25,
};

const LEVEL_DIFFERENCE_MULTIPLIERS = {
  1: 0.75,
  2: 0.5,
};

// REMINDER later to incorporate the hidden flag into the query
// need to continue testing this query
// STRETCH: change the LIMIT so that it is a user input that is equal to or less than 10
// so they can have custom length sessions
router.get("/", async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      const result = await pool.query(getTricksQuery, [
        req.user.id,
        req.user.proficiency_level,
      ]);
      res.send(result.rows);
    } catch (error) {
      console.log("Error in GET /api/session", error);
      res.sendStatus(500);
    }
  } else {
    res.sendStatus(403);
  }
});
// [DONE] 2. update user_trick with mastery level and note
// [DONE] 3. add new tricks to user_trick (if there are less than 10 tricks with countdowns <= 0 and matching the player level)
// - have to check what the user has in their user_trick table
// [DONE] 4. update the user's proficiency level
// add a multiplier to the session_countdown based on the user's level
// [DONE] Step 5. If there are not enough tricks in the user_trick table where their session_countdown is 0 and their level is <= the user's level,
// then decrement the session_countdown of the tricks that are in the user_trick table
router.put("/", async (req, res) => {
  let totalProficiencyPoints = 0;

  if (req.isAuthenticated()) {
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      for (let trick of req.body) {
        // Calculate the proficiency points for each trick
        let proficiencyPoints = 0;
        const levelDifference =
          Math.floor(Number(req.user.proficiency_level)) - trick.level;

        if (levelDifference < 3) {
          proficiencyPoints = MASTERY_VALUES[trick.mastery_level] * 0.02;
          if (LEVEL_DIFFERENCE_MULTIPLIERS[levelDifference]) {
            proficiencyPoints *= LEVEL_DIFFERENCE_MULTIPLIERS[levelDifference];
          }
        }

        totalProficiencyPoints += proficiencyPoints;

        await client.query(updateMasteryLevelAndNote, [
          trick.session_countdown,
          trick.mastery_level,
          trick.note,
          req.user.id,
          trick.trick_id,
        ]);
      }

      const selectQuery = `
      SELECT *
      FROM user_trick
      WHERE user_id = $1 AND session_countdown = 0;
    `;

      let { rows } = await client.query(selectQuery, [req.user.id]);
      const count = rows.length;

      const newTricksCount = Math.max(0, 10 - count);

      const proficiencyLevel = Math.floor(req.user.proficiency_level);

      await client.query(insertNewTricksAfterSessionQuery, [
        req.user.id,
        proficiencyLevel,
        newTricksCount,
      ]);

      const updateProficiencyLevelQuery = `
      UPDATE "user"
      SET "proficiency_level" = GREATEST(1.00, "proficiency_level" + $1)
      WHERE "id" = $2;
    `;

      await client.query(updateProficiencyLevelQuery, [
        totalProficiencyPoints,
        req.user.id,
      ]);

      let zeroCountQuery = `
        SELECT COUNT(*)
        FROM user_trick
        WHERE user_id = $1 AND session_countdown = 0;
        `;

      ({ rows } = await client.query(zeroCountQuery, [req.user.id]));
      let zeroCount = parseInt(rows[0].count, 10);

      while (zeroCount < 10) {
        const decrementQuery = `
          UPDATE user_trick
          SET session_countdown = session_countdown - 1
          WHERE user_id = $1 AND session_countdown > 0;
        `;

        await client.query(decrementQuery, [req.user.id]);

        ({ rows } = await client.query(zeroCountQuery, [req.user.id]));
        zeroCount = parseInt(rows[0].count, 10);
      }

      await client.query("COMMIT");

      res.status(200).json({ totalProficiencyPoints: totalProficiencyPoints });
    } catch (error) {
      await client.query("ROLLBACK");
      console.log("Error in PUT /api/session", error);
      res.sendStatus(500);
    } finally {
      client.release();
    }
  }
});

module.exports = router;
