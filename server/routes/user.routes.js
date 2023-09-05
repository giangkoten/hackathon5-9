const express = require("express");
const router = express.Router();
const db = require("../utils/database");

//Get all
router.get("/", async (req, res) => {
  try {
    let data = await db.execute("SELECT * FROM user");
    let row = data[0];
    res.json({
      msessage: "data-users",
      data: row,
    });
  } catch (error) {
    console.log(error);
  }
});
//delete
router.delete("/:id", async (req, res) => {
  let { id } = req.params;
  try {
    await db.execute(`DELETE FROM hackathon_nc.user WHERE (user_id = ${id});
    `);
    res.json({
      msessage: "delete success",
    });
  } catch (error) {
    console.log(error);
  }
});
//patch
router.patch("/:id", async (req, res) => {
  let { id } = req.params;
  let { name, description } = req.body;
  try {
    await db.execute(
      `UPDATE hackathon_nc.user SET name = ?, description = ? WHERE (user_id = ?);`,
      [name, description, id]
    );
    res.json({
      message: "Update success",
    });
  } catch (error) {
    console.log(error);
  }
});
//create
router.post("/", async (req, res) => {
  let { name, description } = req.body;
  try {
    await db.execute(
      `INSERT INTO hackathon_nc.user (name, description) VALUES (?, ?);`,
      [name, description]
    );
    res.json({
      message: `Post success`,
    });
  } catch (error) {
    console.log(error);
  }
});
//sort DESC
router.get("/sortDESC", async (req, res) => {
  try {
    let data = await db.execute(`SELECT * FROM hackathon_nc.user
    ORDER BY user_id DESC;`);
    let row = [data];
    res.json({
      message: "Sort DESC",
      userDESC: row,
    });
  } catch (error) {
    console.log(error);
  }
});
//sort ASC
router.get("/sortASC", async (req, res) => {
  try {
    let data = await db.execute(`SELECT * FROM hackathon_nc.user
    ORDER BY user_id ASC;`);
    let row = [data];
    res.json({
      message: "Sort ASC",
      userDESC: row,
    });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
