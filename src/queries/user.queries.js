export const CREATE_USERS_TABLE = `CREATE TABLE IF NOT EXISTS users(
  user_id int NOT NULL AUTO_INCREMENT,
  username varchar(255) NOT NULL UNIQUE,
  email varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  PRIMARY KEY (user_id)
)`;

export const GET_ME_BY_USER_ID = `SELECT user_id, username, email FROM users WHERE user_id = ?`;

export const GET_ME_BY_USERNAME = `SELECT user_id, username, email FROM users WHERE username = ?`;

export const GET_ME_BY_USER_ID_WITH_PASSWORD = `SELECT * FROM users WHERE user_id = ?`;

export const GET_ME_BY_USERNAME_WITH_PASSWORD = `SELECT * FROM users WHERE username = ?`;

export const INSERT_NEW_USER = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;

export const UPDATE_USER = `UPDATE users SET username = ?, email = ?, password = ? WHERE user_id = ?`;