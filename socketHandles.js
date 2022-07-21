const fError = require("./app/api/src/utils/fError");

const {
  receptWS: { batchExists, checkBatchNotComplete, counteBatch, addUserRecipts },
} = require("./app/api/src/services");

const socketHandles = (io) => {
  io.on("connection", (socket) => {
    console.log("new socket connection has been made");

    socket.emit("connectedToSocket");

    socket.on("addRecipts", async (batchId) => {
      const batch = await batchExists(batchId);
      if (!batch) {
        socket.emit(
          "batchImportError",
          fError(
            404,
            "Batch with specific id does not exist",
            "گروه فیش حقوقی مد نظر وجود ندارد"
          )
        );
        return;
      }

      if (!checkBatchNotComplete(batch)) {
        socket.emit(
          "batchImportError",
          fError(
            204,
            "Batch has already been compeleted",
            "آرشیو فیش حقوقی تاریخ مد نظر، قبلا آپلود شده است",
            "info"
          )
        );
        return;
      }

      const { dataList, updatedBatch } = await counteBatch(batch);
      addUserRecipts(dataList, updatedBatch)
    });
  });

  // return io
};
module.exports = socketHandles;
