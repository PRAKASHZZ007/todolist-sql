import express from "express";
import db from "../db.js";

const router = express.Router();

// GET ALL TODOS
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM todos ORDER BY id DESC"
    );
    res.json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "DB error" });
  }
});

// ADD TODO
router.post("/", async (req, res) => {
  try {
    const { text } = req.body;

    const [result] = await db.query(
      "INSERT INTO todos (text) VALUES (?)",
      [text]
    );

    res.json({
      id: result.insertId,
      text,
      isChecked: 0,
    });
  } catch (err) {
    res.status(500).json({ error: "DB error" });
  }
});

// UPDATE TODO
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { text, isChecked } = req.body;

    await db.query(
      "UPDATE todos SET text=?, isChecked=? WHERE id=?",
      [text, isChecked, id]
    );

    res.json({ message: "Updated" });
  } catch (err) {
    res.status(500).json({ error: "DB error" });
  }
});

// DELETE TODO
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await db.query("DELETE FROM todos WHERE id=?", [id]);

    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: "DB error" });
  }
});

export default router;