// Insert todos into database
exports.up = async (
  /** @type {import('postgres').Sql<Record<string, string>>} */ sql,
) => {
  await sql`
    INSERT INTO todos (title, checked) VALUES
      ('Make Coffee', false),
      ('Call Mum', false)
  `;
};

// Remove todos from database
exports.down = async (
  /** @type {import('postgres').Sql<Record<string, string>>} */ sql,
) => {
  await sql`
    DELETE FROM todos
      WHERE name IN ('Make Coffee', 'Call Mum')
  `;
};
