const _addUserRecipt = (data) => {
  const useFullData = data.Column0[0].SalaryReceiptItem[0].Report[0];

  const personelCode = useFullData.Rectangle1[0].$.Code;
  console.log(useFullData.Rectangle1[0].$.Code);
  console.log(useFullData);
};

module.exports = _addUserRecipt;
