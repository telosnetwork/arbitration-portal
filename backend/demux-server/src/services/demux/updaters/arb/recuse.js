async function recuseHandler (state, payload, blockInfo, context) {
    try {
        console.log('Recuse updater PAYLOAD:   ', payload);
        console.log('Recuse updater BlockInfo: ', blockInfo);

        let case_id = parseInt(payload.data.case_id);

        let caseState = await state.case.findOne({ case_id: case_id }).exec();
        let arbitrators;
        if (caseState) {
            ({ arbitrators } = caseState);
            for ( let arbitrator of arbitrators ) {
                if ( arbitrator === payload.data.assigned_arb ) {
                    arbitrators.splice(arbitrators.indexOf(arbitrator), 1);

                    //** Remove Case_id from Arbitrator's Open_case_ids **//
                    let arbState = await state.arbitrator.findOne({ arb: arbitrator }).exec();
                    let open_case_ids;
                    if (arbState) {
                        ({ open_case_ids } = arbState);
                        open_case_ids.splice(open_case_ids.indexOf(case_id), 1);
                    }
                    await state.arbitrator.findOneAndUpdate({ arb: arbitrator }, {
                        open_case_ids: open_case_ids
                    }, { upsert: true }).exec();
                }
            }
            await state.case.findOneAndUpdate({ case_id: case_id }, {
                arbitrators: arbitrators
            }).exec();
        }
    } catch (err) {
        console.error('Recuse updater error: ', err);
    }
}

export default recuseHandler;