const validatePostEntries = (req, res, next) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res
      .status(400)
      .json({ message: `"${!title ? 'title' : 'content'}" is required` });
  }

  next();
};

module.exports = { validatePostEntries };
