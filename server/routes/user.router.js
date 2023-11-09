const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const encryptLib = require("../modules/encryption");
const pool = require("../modules/pool");
const userStrategy = require("../strategies/user.strategy");

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get("/", rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted

router.post("/register", async (req, res, next) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const username = req.body.username;
    const password = encryptLib.encryptPassword(req.body.password);

    const createUserQuery = `INSERT INTO "user" (username, password)
      VALUES ($1, $2) RETURNING id`;
    const addUserStarterTricksQuery = `INSERT INTO "user_trick" (user_id, trick_id) VALUES ($1, $2)`;

    // Starter trick IDs
    const trickIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    // First create the user
    const userResult = await client.query(createUserQuery, [
      username,
      password,
    ]);
    const userId = userResult.rows[0].id;

    // Add starter tricks to user_trick table
    for (let trickId of trickIds) {
      await client.query(addUserStarterTricksQuery, [userId, trickId]);
    }

    await client.query("COMMIT");

    res.sendStatus(201);
  } catch (err) {
    await client.query("ROLLBACK");
    console.log("User registration failed: ", err);
    res.sendStatus(500);
  } finally {
    client.release();
  }
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post("/login", userStrategy.authenticate("local"), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post("/logout", (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

router.delete("/:id", async (req, res) => {
  if (req.isAuthenticated()) {
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      const userId = req.params.id;

      // Delete all tricks associated with the user
      await client.query("DELETE FROM user_trick WHERE user_id = $1", [userId]);

      // Delete the user
      await client.query(`DELETE FROM "user" WHERE id = $1`, [userId]);

      // Commit transaction
      await client.query("COMMIT");

      res.status(200).send("User and associated tricks deleted successfully");
    } catch (e) {
      await client.query("ROLLBACK");
      throw e;
    } finally {
      client.release();
    }
  }
});

router.put("/:id", async (req, res) => {
  if (req.isAuthenticated()) {
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      const userId = req.params.id;

      await client.query(
        `UPDATE "user" SET 
        favorite_trick = $1,
        favorite_kendama = $2
        WHERE id = $3`,
        [req.body.favoriteTrick, req.body.favoriteKendama, userId]
      );

      // Commit transaction
      await client.query("COMMIT");

      res.status(200).send("User trick and or kendama successfully");
    } catch (e) {
      await client.query("ROLLBACK");
      throw e;
    } finally {
      client.release();
    }
  }
});

module.exports = router;
