// Create the todos table
exports.up = async (
  /** @type {import('postgres').Sql<Record<string, string>>} */ sql,
) => {
  await sql`
    CREATE TABLE todos(
      id SERIAL PRIMARY KEY,
      title VARCHAR NOT NULL,
      checked BOOLEAN NOT NULL
    )
  `;
};

// Delete the todos table
exports.down = async (
  /** @type {import('postgres').Sql<Record<string, string>>} */ sql,
) => {
  await sql`
    DROP TABLE todos
  `;
};
