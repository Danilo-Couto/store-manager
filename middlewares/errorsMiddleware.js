module.exports = (err, _req, res, _next) => {
  console.log('err:', err);

  if (err.isJoi) {
    const newStatus = err.details[0].type.includes('.min') ? 422 : 400;
    return res.status(newStatus)
      .json({ message: err.details[0].message });
  }

  const statusByErrorCode = {
    invalidData: 404,
    alreadyExists: 409,
  };

  const status = statusByErrorCode[err.code] || 500;

  res.status(status).json({ message: err.message });
};
