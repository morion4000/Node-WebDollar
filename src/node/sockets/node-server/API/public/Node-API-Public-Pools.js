import Utils from "common/utils/helpers/Utils";
import Blockchain from "main-blockchain/Blockchain"
const EventEmitter = require('events');
let PoolStats = {};

class NodeAPIPublicPools {


  init() {
    let emitter = new EventEmitter();
    emitter.setMaxListeners(100);

    emitter.on("miner-pool/statistics/update", function(data) {
      PoolStats = data;
    });
  }

  stats(req, res) {

    return PoolStats;

  }

}

export default new NodeAPIPublicPools();
