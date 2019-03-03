// import EOSIOClient from '../../../../utils/eosio-client';

import { Api, JsonRpc } from 'eosjs';
import fetch from 'node-fetch';
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

async function addArbsHandler (state, payload, blockInfo, context) {
    try {
        console.log('AddArbs updater PAYLOAD:   ', payload);
        console.log('AddArbs updater BlockInfo: ', blockInfo);

        const rpc = new JsonRpc(process.env.TELOS_ENDPOINT, { fetch });
        const signatureProvider = new JsSignatureProvider([process.env.ARB_PRIV]);
        const eos = new Api({ rpc, signatureProvider });

        let case_id      = parseInt(payload.data.case_id);
        let assigned_arb = payload.data.assigned_arb;
        let num_arbs_to_assign = parseInt(payload.data.num_arbs_to_assign);

        let result = await rpc.get_table_rows({
            code:  process.env.ARB_CONTRACT,
            scope: process.env.ARB_CONTRACT,
            table: `arbitrators`,
            limit: 21,
            json:  true
        });
        let arbitratorsT = result.rows;

        let arbitrators;
        let required_langs;
        let caseState = await state.case.findOne({ case_id: case_id }).exec();
        if (caseState) {
            ({ arbitrators }    = caseState);
            ({ required_langs } = caseState);
            let selected_arbitrators = [];
            for ( let i = required_langs.length; i >= 0; i-- ) {
                for ( let arbitrator of arbitratorsT ) {
                    if ( count_s(required_langs, arbitrator.languages) >= i ) {
                        if ( (arbitrator.arb_status == 0) && (arbitrator.arb != assigned_arb) && (arbitrators.indexOf(arbitrator.arb) == -1) && (selected_arbitrators.indexOf(arbitrator.arb) == -1) ) {
                            if (selected_arbitrators.length >= num_arbs_to_assign) break;
                            selected_arbitrators.push(arbitrator.arb);
                        }
                    }
                }
            }

        console.log('Selected Arbitrators: ', selected_arbitrators);

            let arbState;
            let arb_status = 0;
            let open_case_ids;
            let case_status;
            for ( let arbitrator of selected_arbitrators ) {
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
                                arb_to_assign: arbitrator
                            }
                        }
                    ]
                }, {
                    blocksBehind:  3,
                    expireSeconds: 30
                });

                //** AssignToCaseHandler **//
                arbState = await state.arbitrator.findOne({ arb: arbitrator }).exec();
                if (arbState) {
                    ({ open_case_ids } = arbState);
                    open_case_ids.push(case_id);
                } else {
                    open_case_ids = [case_id];
                }
                await state.arbitrator.findOneAndUpdate({ arb: arbitrator }, {
                    arb:           arbitrator,
                    arb_status:    arb_status,
                    open_case_ids: open_case_ids
                }, { upsert: true }).exec();

                caseState = await state.case.findOne({ case_id: case_id }).exec();
                if (caseState) {
                    ({ arbitrators } = caseState);
                    ({ case_status } = caseState);
                    arbitrators.push(arbitrator);
                    await state.case.findOneAndUpdate({ case_id: case_id }, {
                        arbitrators: arbitrators
                    }).exec();

                    if ( case_status == 1 ) {
                        case_status += 1;
                        await state.case.findOneAndUpdate({ case_id: case_id }, {
                            case_status: case_status
                        }).exec();
                    }
                }
                //** AssignToCaseHandler **//
            }
        }
    } catch (err) {
        console.error('AddArbs updater error: ', err);
    }
}

export default addArbsHandler;