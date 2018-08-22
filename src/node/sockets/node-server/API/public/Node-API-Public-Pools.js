import NodesList from 'node/lists/Nodes-List';
import NODE_TYPE from "node/lists/types/Node-Type";
import NODE_CONSENSUS_TYPE from "node/lists/types/Node-Consensus-Type"
import Blockchain from "main-blockchain/Blockchain";
import BufferExtended from "common/utils/BufferExtended";
import InterfaceBlockchainAddressHelper from "common/blockchain/interface-blockchain/addresses/Interface-Blockchain-Address-Helper";


class NodeAPIPublicPools {


  stats(req, res) {

    let stats = {
      hashes: 0,
      hashes_now: 0
    };

    if (Blockchain.PoolManagement !== undefined && Blockchain.PoolManagement.poolStarted) {
      stats.hashes = Blockchain.PoolManagement.poolStatistics.poolHashes;
      stats.hashes_now = Blockchain.PoolManagement.poolStatistics.poolHashesNow;
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

    if (Blockchain.PoolManagement !== undefined && Blockchain.PoolManagement.poolStarted) {
      let minersOnline = Blockchain.PoolManagement.poolData.connectedMinerInstances.list;

      for (let i = 0; i < minersOnline.length; i++) {
        var miner = minersOnline[i];

        miners.push({
          hashes: miner.hashesPerSecond,
          address: miner.address.toString('hex'),
          reward_total: miner.miner._rewardTotal,
          reward_confirmed: miner.miner._rewardConfirmed,
          reward_sent: miner.miner._rewardSent,
          date_activity: miner.miner.rewardSent,
        });
      }
    }

    return miners;
  }

}

export default new NodeAPIPublicPools();
