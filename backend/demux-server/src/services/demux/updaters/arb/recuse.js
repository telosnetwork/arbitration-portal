import { Api, JsonRpc } from 'eosjs';
import fetch from 'node-fetch';
import { TextEncoder, TextDecoder } from 'util';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';

function count_s (arrA, arrB) {
    let matches = 0;
    for ( let i = 0; i < arrA.length; i++ ) {
        if ( arrB.indexOf(arrA[i]) != -1 ) {
            matches++;
        }
    }
    return matches;
}

async function recuseHandler (state, payload, blockInfo, context) {
    try {
        const rpc = new JsonRpc(`${process.env.TELOS_ENDPOINT}`, { fetch });
        const signatureProvider = new JsSignatureProvider([`${process.env.ARB_PRIV}`]);
        const eos = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });
        
        let case_id      = parseInt(payload.data.case_id);
        let assigned_arb = payload.data.assigned_arb;
    
        let result = await rpc.get_table_rows({
            code:  process.env.ARB_CONTRACT,
            scope: process.env.ARB_CONTRACT,
            table: `arbitrators`,
            limit: 21,
            json:  true
        });
        let arbitratorsT = result.rows;
    
        let caseresult = await rpc.get_table_rows({
            code:        process.env.ARB_CONTRACT,
            scope:       process.env.ARB_CONTRACT,
            table:       `casefiles`,
            lower_bound: case_id,
            limit:       1,
            json:        true
        });
        let casesT              = caseresult.rows[0];
    
        let selected_arbitrator = '';
        let required_langs      = casesT.required_langs;
    
        for ( let i = required_langs.length; i >= 0; i-- ) {
            for ( let arbitrator of arbitratorsT ) {
                if ( count_s(required_langs, arbitrator.languages) >= i ) {
                    if ( (arbitrator.arb_status == 0) && (arbitrator.arb != assigned_arb) ) {
                        if (selected_arbitrator != '') break;
                        selected_arbitrator = arbitrator.arb;
                    }
                }
            }
        }
    
        console.log('Selected Arbitrator: ', selected_arbitrator);
    
        await eos.transact({
            actions: [
                {
                    account: process.env.ARB_CONTRACT,
                    name: `assigntocase`,
                    authorization: [
                        {
                            actor:      `eosio.arb`,
                            permission: `assign`,
                        }
                    ],
                    data: {
                        case_id: case_id,
                        arb_to_assign: selected_arbitrator
                    }
                }
            ]
        }, {
            blocksBehind:  3,
            expireSeconds: 30
        });
    } catch (err) {
        console.error('Recuse updater error: ', err);
    }
}

export default recuseHandler;