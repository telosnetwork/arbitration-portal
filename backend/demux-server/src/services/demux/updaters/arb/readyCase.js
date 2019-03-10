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

async function readyCaseHandler (state, payload, blockInfo, context) {
    try {
        console.log('ReadyCase updater PAYLOAD:   ', payload);
        console.log('ReadyCase updater BlockInfo: ', blockInfo);

        const rpc = new JsonRpc(process.env.TELOS_ENDPOINT, { fetch });
        const signatureProvider = new JsSignatureProvider([process.env.ARB_PRIV]);
        const eos = new Api({ rpc, signatureProvider });

        let case_id  = parseInt(payload.data.case_id);
        let claimant = payload.data.claimant;

        // Case_Status
        let case_status = 1; // AWAITING_ARBS (1)

        let sub_value = parseFloat(100) * -1; // _config.fee_structure[0]
        await state.balance.findOneAndUpdate({ owner: claimant }, {
            id:    payload.transactionId,
            owner: claimant,
            $inc:  { escrow: sub_value }
        }, { upsert: true }).exec();

        await state.case.findOneAndUpdate({ case_id: case_id }, {
            case_status: case_status
        }).exec();

        let result = await rpc.get_table_rows({
            code:  process.env.ARB_CONTRACT,
            scope: process.env.ARB_CONTRACT,
            table: `arbitrators`,
            limit: 21,
            json:  true
        });
        let arbitratorsT = result.rows;

        let required_langs;
        let caseState = await state.case.findOne({ case_id: case_id }).exec();
        if (caseState) {
            ({ required_langs } = caseState);
            let selected_arbitrator = '';
            for ( let i = required_langs.length; i >= 0; i-- ) {
                for ( let arbitrator of arbitratorsT ) {
                    if ( count_s(required_langs, arbitrator.languages) >= i ) {
                        if ( (arbitrator.arb_status == 0) ) {
                            if (selected_arbitrator != '') break;
                            selected_arbitrator = arbitrator.arb;
                        }
                    }
                }
            }

        console.log('Selected Arbitrator: ', selected_arbitrator);

            let arbState;
            let arb_status = 0;
            let open_case_ids;
            let case_status;
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

            //** AssignToCaseHandler **//
            arbState = await state.arbitrator.findOne({ arb: selected_arbitrator }).exec();
            if (arbState) {
                ({ open_case_ids } = arbState);
                open_case_ids.push(case_id);
            } else {
                open_case_ids = [case_id];
            }
            await state.arbitrator.findOneAndUpdate({ arb: selected_arbitrator }, {
                arb:           selected_arbitrator,
                arb_status:    arb_status,
                open_case_ids: open_case_ids
            }, { upsert: true }).exec();

            let arbitrators;
            caseState = await state.case.findOne({ case_id: case_id }).exec();
            if (caseState) {
                ({ arbitrators } = caseState);
                ({ case_status } = caseState);
                arbitrators.push(selected_arbitrator);
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
    } catch (err) {
        console.error('ReadyCase updater error: ', err);
    }
}

export default readyCaseHandler;