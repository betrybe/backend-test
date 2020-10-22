const getDataValues = (instance, toFilter = []) => {
  if (!instance) return null;
  return toFilter.reduce((intermediate, filter) => {
    const { [filter]: a, ...cleaned } = intermediate;
    return cleaned;
  }, instance.dataValues);
};

module.exports = {
  getDataValues,
};
