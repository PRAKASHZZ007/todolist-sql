import express from "express";
import db from "../db.js";

const router = express.Router();

// GET ALL TODOS
router.get("/", (req, res) => {
  db.query("SELECT * FROM todos ORDER BY id DESC", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// ADD TODO
router.post("/", (req, res) => {
  const { text } = req.body;
  db.query("INSERT INTO todos (text) VALUES (?)", [text], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ id: result.insertId, text, isChecked: false });
  });
});

// UPDATE TODO
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { text, isChecked } = req.body;

  db.query(
    "UPDATE todos SET text=?, isChecked=? WHERE id=?",
    [text, isChecked, id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Updated" });
    }
  );
});

// DELETE TODO
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM todos WHERE id=?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Deleted" });
  });
});

export default router;