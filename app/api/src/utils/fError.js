const fError = (status, enError, faError, type='error') => {
  const error = new Error(enError);
  error.text = faError;
  error.status = status;
  error.type = type;
  return error;
};

module.exports = fError;
