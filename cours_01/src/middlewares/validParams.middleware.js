export const validParamsMiddleware = (req, res, next) => {
  const { title, text, banner } = req.body;
  if (!title || !text || !banner) {
    res.status(401).send({ message: "Params not valid or not found" });
  }
  req.newParams = { title, text, banner };
  next();
};
