const _addUserRecipt = require("./_addUserRecipt");

const addUserRecipts = (dataList, batch) => {
  const chunk = 2;
  let confirmed = batch.confirmed;
  console.log(batch.toJSON());
  console.log(confirmed);
  // console.log(dataList);
  // console.log(JSON.stringify(dataList[0]));

  while (confirmed < batch.total) {
    console.log("doing each chunk");
    const startIndex = confirmed;
    for (
      i = startIndex;
      i < startIndex + chunk && i < batch.total && i < 1;
      i++
    ) {
      _addUserRecipt(dataList[i]);
    }

    confirmed += chunk;
    confirmed = confirmed <= batch.total ? confirmed : batch.total;
  }
  console.log(confirmed);
};

module.exports = addUserRecipts;
