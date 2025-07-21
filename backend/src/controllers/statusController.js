const PostgresStatusRepository = require("../repositories/implementations/PostgresStatusRepository");
const StatusService = require("../services/implementations/StatusService");

const statusRepo = new PostgresStatusRepository();
const statusService = new StatusService(statusRepo);

exports.getAllStatuses = async (req, res) => {
  try {
    const statuses = await statusService.getAllStatuses();
    res.status(200).json(statuses);
  } catch (err) {
    console.error("Durumlar alınamadı:", err);
    res.status(500).json({ error: "Durumlar alınamadı" });
  }
};
