import mysql from "mysql"

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password:"pass1234",
  database: "blog",
});