const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * GET trick detail
 */

router.get("/:id", (req, res) => {
  if (req.isAuthenticated()) {
    const queryText = `SELECT * FROM "trick" WHERE "id" = $1;`;
    pool
      .query(queryText, [req.params.id])
      .then((result) => {
        res.send(result.rows[0]);
      })
      .catch((error) => {
        console.log("Error in GET /api/trick", error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;
