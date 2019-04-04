import ScatterJS        from "scatterjs-core";
import ScatterEOS       from "scatterjs-plugin-eosjs2";
import { Api, JsonRpc } from "eosjs";

export default class ScatterBridge {

  constructor(network, appName) {

    this.appName = appName;

    // Instantiate ScatterJS and the selected Plugins
    ScatterJS.plugins(new ScatterEOS());

    this.scatter = ScatterJS.scatter;

    // Network Configuration to Connect (Reference) to Blockchain Endpoint Node
    /**
     * const network = ScatterJS.Network.fromJson({
         *      blockchain: process.env.BLOCKCHAIN,
         *      chainId:    process.env.CHAIN_ID,
         *      host:       process.env.HOST,
         *      port:       process.env.PORT,
         *      protocol:   process.env.PROTOCOL
         * });
     */
    this.network = network;

    // Blockchain Wrapper to Wrap the actual Blockchain Libraries (eosjs)
    /**
     * const rpc = new JsonRpc(network.fullhost());
     */
    const rpc = new JsonRpc(network.node_uri);

    this.rpc = rpc;
    this.currentAccount = null;
    this.reqFields = { accounts: [network] };

    // Signature (PROXY) Provider
    /**
     * const eos = ScatterJS.eos(network, Api, {rpc, beta3:true});
     */
    this.api = this.scatter.eos(network, Api, {rpc, beta3: true});

    this.isConnected = false;

    window.ScatterJS = null;
    window.ScatterEOS = null;

  }

  connect = async () => {
    this.isConnected = await this.scatter.connect(this.appName);
  }

  login = async () => {
    if (this.isConnected) {
      await this.scatter.login(this.reqFields);
      this.currentAccount = this.scatter.identity.accounts.find(x => x.blockchain === `eos`);
    } else {
      alert('Login Fail - Please Login to Scatter');
    }
  }

  logout = async () => {
    this.isConnected = !(await this.scatter.logout());
    this.currentAccount = null;
  }

  makeAction = async (contract, actionName, data, perm = { actor: this.currentAccount.name, permission: this.currentAccount.authority }) => {
    return {
      account: contract,
      name: actionName,
      authorization: [perm],
      data: data
    };
  }

  async sendTx (actions) {
    if (!actions) {
      throw new Error('Invalid actions');
    }
    if(!Array.isArray(actions)) {
      actions = [actions];
    }
    const response = await this.api.transact({
      actions,
    }, {blocksBehind: 3, expireSeconds: 30});
    return response;
  }


  async createAndSendAction(contract, actionName, actionData) {

    let actionObject = await this.makeAction(
      contract,
      actionName,
      actionData,
    );
    console.log(actionObject);

    let result = await this.sendTx(actionObject);
    console.log('Send tx result: ', result);

    if (result) {
      return result;
    } else {
      throw new Error('Error in sending action')
    }

  }

  async getTable(code, table, scope, limit = 10) {

    let result = await this.rpc.get_table_rows({
      code,
      table,
      scope,
      limit,
      json:  true
    });

    return result.rows;
  }

  async transfer({ from, to, quantity, memo = '' }) {

    const actionData =  {
      from,
      to,
      quantity,
      memo,
    };

    await this.createAndSendAction(
      'eosio.token',
      'transfer',
      actionData
    );

  }

  static parseBalance(balanceString) {
    const [value, token] = balanceString.split(' ');

    return {
      token,
      value,
    };

  }
}
