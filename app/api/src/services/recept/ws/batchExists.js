const { ReceptBatch } = require("../../../../db/models");

const batchExists = async (batchId) => {
  const batch = await ReceptBatch.findOne({where: {uuid: batchId}, include: ['File']})
  
  return batch ? batch : false;
};

module.exports = batchExists;
