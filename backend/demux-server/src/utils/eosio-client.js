import { Api, JsonRpc }    from 'eosjs';
import fetch from 'node-fetch';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';

export default class EOSIOClient {
    
    constructor (contractAccount) {
        const rpc = new JsonRpc(process.env.TELOS_ENDPOINT, { fetch });
        const signatureProvider = new JsSignatureProvider([process.env.ARB_PRIV]);
        this.contractAccount = contractAccount;
        this.eos = new Api({ rpc, signatureProvider });
    }


    table = (code, scope, table, limit) => {
        return rpc.get_table_rows({
            code:  code,
            scope: scope,
            table: table,
            limit: limit,
            json:  true
        })
    }
    
    transaction = (actor, perm, action, data) => {
        return this.eos.transact({
            actions: [
                {
                    account: this.contractAccount,
                    name: action,
                    authorization: [
                        {
                            actor,
                            permission: perm
                        }
                    ],
                    data: {
                        ...data
                    }
                }
            ]
        }, {
            blocksBehind: 3,
            expireSeconds: 30
        })
    }
}