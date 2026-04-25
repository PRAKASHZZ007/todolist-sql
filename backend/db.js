import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root777",
  database: "todo_app",
});

db.connect((err) => {
  if (err) {
    console.error("DB Error:", err);
  } else {
    console.log("MySQL Connected ✅");
  }
});

export default db;