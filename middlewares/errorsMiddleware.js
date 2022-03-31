module.exports = (err, _req, res, _next) => {
  console.log(err);

  if (err.isJoi) {
    return res.status(400)
      .json({ error: { message: err.details[0].message } });
  }

  const statusByErrorCode = {
    invalidData: 404,
    alreadyExists: 409,
  };

  const status = statusByErrorCode[err.code] || 500;

  res.status(status).json({ message: err.message });
};
