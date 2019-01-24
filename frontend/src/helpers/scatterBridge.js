import ScatterJS from "scatterjs-core";
import ScatterEOS from "scatterjs-plugin-eosjs2";
import { Api, JsonRpc } from "eosjs";

export default class ScatterBridge {
  constructor(network, appName) {
    this.appName = appName;  
    ScatterJS.plugins(new ScatterEOS());
    this.scatter = ScatterJS.scatter;
    this.network = network;
    const rpc = new JsonRpc(`${network.protocol}://${network.host}:${network.port}`);
    this.rpc = rpc;
    this.currentAccount = null;
    this.reqFields = { accounts: [network] };
    this.api = this.scatter.eos(network, Api, {rpc, beta3: true});
    this.isConnected = false;
    
    window.ScatterJS = null;
    window.ScatterEOS = null;
  }

  async connect() {
    this.isConnected = await this.scatter.connect(this.appName);
  }

  async getIdentity() {    
    if(this.isConnected) {
        await this.scatter.getIdentity(this.reqFields);
        this.currentAccount = this.scatter.identity.accounts.find(x => x.blockchain === "eos");
    }
  }

  async sendTx(actions) {
    if(actions.length) {
        try{
            return await this.api.transact({
                actions: actions
            }, {blocksBehind: 3, expireSeconds: 30 });
        }catch (e) {
            console.log('error', e);
        }

    } else console.log('error')
  }

  makeAction(contract, actionName, data, perm = { actor: this.currentAccount.name,
      permission: this.currentAccount.authority}) {
    return { 
        account: contract, 
        name: actionName, 
        authorization: [perm],
        data: data 
    };
  }
}
