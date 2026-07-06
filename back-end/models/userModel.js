import db from "../database/database.js";

const create = (name, email, password, creation_date, callback) => {
  db.run(
    `
      INSERT INTO users (
        name,
        email,
        password,
        creation_date
      )
      VALUES (?, ?, ?, ?)
    `,
    [name, email, password, creation_date],
    function (err) {
      if (err) {
        return callback(err, null);
      }

      callback(null, this.lastID);
    },
  );
};

const findByEmail = (email, callback) => {
  db.get(
    `
      SELECT *
      FROM users
      WHERE email = ?
    `,
    [email],
    (err, row) => {
      callback(err, row);
    },
  );
};

const findById = (id, callback) => {
  db.get(
    `
      SELECT *
      FROM users
      WHERE id = ?
    `,
    [id],
    (err, row) => {
      callback(err, row);
    },
  );
};

export default {
  create,
  findById,
  findByEmail,
};
