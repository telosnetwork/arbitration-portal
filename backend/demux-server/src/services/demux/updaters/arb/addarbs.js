// import EOSIOClient from '../../../../utils/eosio-client';

import Eos from 'eosjs';

const config = {
    chainId:         `${process.env.CHAIN_ID}`,
    keyProvider:     [`${process.env.ARB_PRIV}`],
    httpEndpoint:    `${process.env.TELOS_ENDPOINT}`,
    expireInSeconds: 100,
    broadcast:       true,
    verbose:         false,
    sign:            true
};

const options = {
    authorization: `eosio.arb@assign`,
    broadcast:     true,
    sign:          true
};

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

        const eos = Eos(config);

        let case_id      = parseInt(payload.data.case_id);
        let assigned_arb = payload.data.assigned_arb;
        let num_arbs_to_assign = parseInt(payload.data.num_arbs_to_assign);

        let result = await eos.getTableRows({
            code:  `${process.env.ARB_CONTRACT}`,
            scope: `${process.env.ARB_CONTRACT}`,
            table: `arbitrators`,
            limit: 21,
            json:  true 
        });
        let arbitrators = result.rows;

        let required_langs;
        let caseState = await state.case.findOne({ case_id: case_id }).exec();
        if (caseState) {
            ({ required_langs } = caseState);
            let selected_arbitrators = [];

            for ( let i = required_langs.length; i >= 0; i-- ) {
                for ( let arbitrator of arbitrators ) {
                    while ( selected_arbitrators.length <= num_arbs_to_assign ) {
                        if ( arbitrator.arb_status == 0 && arbitrator.arb != assigned_arb ) {
                            if ( count_s(required_langs, arbitrator.languages) >= i ) {
                                selected_arbitrators.push(arbitrator.arb);
                            }
                        }
                    }
                }
            }

        console.log(selected_arbitrators);

            for ( let arbitrator of selected_arbitrators ) {
                eos.contract(`${process.env.ARB_CONTRACT}`)
                    .then(account => {
                        return account.assigntocase(`${case_id}`, `${arbitrator}`, options);
                    });
            }
        }
    } catch (err) {
        console.error('AddArbs updater error: ', err);
    }
}

export default addArbsHandler;