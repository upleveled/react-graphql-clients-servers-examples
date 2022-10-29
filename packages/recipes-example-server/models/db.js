/**
 * This is where we set up the database, in this case NeDB (with the promise wrapper)
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
const Datastore = require('nedb-promise');

const recipeDb = new Datastore({
  filename: './recipes.json',
  autoload: true,
});
const ingredientDb = new Datastore({
  filename: './ingredients.json',
  autoload: true,
});

module.exports = { ingredientDb, recipeDb };
