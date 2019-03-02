import EOSIOClient from '../../../../utils/eosio-client';

function count_s (arrA, arrB) {
    let matches = 0;
    for ( i = 0; i < arrA.length; i++ ) {
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

        const eosio = new EOSIOClient(process.env.ARB_CONTRACT);

        let case_id      = parseInt(payload.data.case_id);
        let assigned_arb = payload.data.assigned_arb;
        let num_arbs_to_assign = parseInt(payload.data.num_arbs_to_assign);

        let result = await eosio.table(
            process.env.ARB_CONTRACT,
            process.env.ARB_CONTRACT,
            'arbitrators',
            21
        );
        let arbitrators = result.rows;

        let required_langs;
        let caseState = await state.case.findOne({ case_id: case_id }).exec();
        if (caseState) {
            ({ required_langs } = caseState)
            let selected_arbitrators = [];

            for ( i = required_langs.length - 1; i > 0;  i-- ) {
                for ( let arbitrator of arbitrators ) {
                    while ( selected_arbitrators <= num_arbs_to_assign ) {
                        if ( arbitrator.arb_status == 0 && arbitrator.arb != assigned_arb ) {
                            if ( count_s(required_langs, arbitrator.languages) >= i ) {
                                selected_arbitrators.push(arbitrator.arb);
                            }
                        }
                    }
                }
            }

            for ( let arbitrator of selected_arbitrators ) {
                await eosio.transaction(
                    process.env.ARB_CONTRACT,
                    'assign',
                    'assigntocase',
                    {
                        case_id: case_id ,
                        arb_to_assign: arbitrator
                    }
                )
            }
        }
    } catch (err) {
        console.error('AddArbs updater error: ', err);
    }
}

export default addArbsHandler;