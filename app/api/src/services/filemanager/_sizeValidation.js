const sizeValidation = (filesize, maxAllowedSize = "1.5Mb") => {
  const sizeCollections = { Kb: 1, Mb: 2, Gb: 3 };
  const sizeLevel = maxAllowedSize.slice(-2);
  maxAllowedSize = [...maxAllowedSize];
  maxAllowedSize.pop();
  maxAllowedSize.pop();
  maxAllowedSize =
    +maxAllowedSize.join("") * 1024 ** sizeCollections[sizeLevel];

  return filesize <= maxAllowedSize ? true : false;
};

module.exports = sizeValidation;
