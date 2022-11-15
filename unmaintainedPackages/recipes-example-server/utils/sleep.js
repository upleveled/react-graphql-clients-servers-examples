module.exports = (delay) => {
  return new Promise(response => {
    setTimeout(response, delay);
  });
};
