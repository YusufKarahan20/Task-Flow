const IStatusService = require("../interfaces/IStatusService");

class StatusService extends IStatusService {
  constructor(statusRepository) {
    super();
    this.statusRepository = statusRepository;
  }

  async getAllStatuses() {
    return await this.statusRepository.getAllStatuses();
  }
}

module.exports = StatusService;
