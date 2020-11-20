const validatePostData = (title, content) => {
  switch (true) {
    case (!title):
      return { error: true, status: 400, message: '"title" is required' };
    case (!content):
      return { error: true, status: 400, message: '"content" is required' };
    default:
      return { error: false };
  }
};

module.exports = {
  validatePostData,
};
