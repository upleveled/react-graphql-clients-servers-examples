// Create the todos table
exports.up = async (sql) => {
  await sql`
    CREATE TABLE todos(
      id SERIAL PRIMARY KEY,
      title VARCHAR NOT NULL,
      checked BOOLEAN NOT NULL
    )
  `;
};

// Delete the todos table
exports.down = async (sql) => {
  await sql`
    DROP TABLE todos
  `;
};
