const checkBatchNotComplete = ({ confirmed, total }) =>
  total !== confirmed ? true : false;

module.exports = checkBatchNotComplete;
