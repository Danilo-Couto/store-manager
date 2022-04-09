module.exports = (err, _req, res, _next) => {
  if (err.isJoi) {
    const newStatus = err.details[0].type.includes('.min')
    || err.details[0].type.includes('.max') ? 422 : 400;
    return res.status(newStatus)
      .json({ message: err.details[0].message });
  }

  const statusByErrorCode = {
    invalidData: 404,
    alreadyExists: 409,
  };

  if (err.code) return res.status(statusByErrorCode[err.code]).json({ message: err.message });

  console.log('err:', err);

  return res.status(500).json({ err });
};
