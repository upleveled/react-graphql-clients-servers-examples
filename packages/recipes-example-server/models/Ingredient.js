const { ingredientDb } = require('./db');
const { addId, addIds } = require('./utils');

/**
 * Get an ingredient by its _id
 *
 * @param  {String} _id
 *
 * @returns {Promise<Ingredient>}
 */
const getIngredient = async (id) => {
  const ingredient = await ingredientDb
    .find({ _id: id })
    .then((result) => result && result[0]);
  return addId(ingredient);
};

/**
 * Add an ingredient with a certain name
 *
 * @param {String} name
 * @returns {Promise<NewIngredient>}
 */
const addIngredient = async (name) => {
  const ingredient = await ingredientDb.insert({ name });
  return addId(ingredient);
};

/**
 * Get a list of all ingredients
 *
 * @returns {Promise<[Ingredient]>}
 */
const getIngredients = async () => {
  const ingredients = await ingredientDb.find({});
  return addIds(ingredients);
};

module.exports = { getIngredient, addIngredient, getIngredients };
