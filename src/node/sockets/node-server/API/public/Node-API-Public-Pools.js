import NodesList from 'node/lists/Nodes-List';
import NODE_TYPE from "node/lists/types/Node-Type";
import NODE_CONSENSUS_TYPE from "node/lists/types/Node-Consensus-Type"
import Blockchain from "main-blockchain/Blockchain";


class NodeAPIPublicPools {


  stats(req, res) {

    let stats = {
      hashes: 0,
      hashesNow: 0
    };

    if (Blockchain.MinerPoolManagement !== undefined && Blockchain.MinerPoolManagement.minerPoolStarted) {
      stats.hashes = Blockchain.MinerPoolManagement.minerPoolStatistics.poolHashes;
      stats.hashesNow = Blockchain.MinerPoolManagement.minerPoolStatistics.poolHashesNow;
    }

    return stats;

  }

  miners(req, res) {
    let miners = [];
    /*
        for (let i = 0; i < NodesList.nodes.length; i++) {
          var socket = NodesList.nodes[i];

          if (socket.node.protocol.nodeConsensusType != NODE_CONSENSUS_TYPE.NODE_CONSENSUS_MINER_POOL) continue;

          miners.push(socket.node);
        }
    */

    if (Blockchain.MinerPoolManagement !== undefined && Blockchain.MinerPoolManagement.minerPoolStarted) {
      let minersOnline = Blockchain.MinerPoolManagement.poolData.connectedMinerInstances;

      for (let i = 0; i < minersOnline.length; i++) {
        var miner = minersOnline[i];

        miners.push(miner);
      }
    }

    return miners;
  }

}

export default new NodeAPIPublicPools();
