async function recuseHandler (state, payload, blockInfo, context) {
    try {
        console.log('Recuse updater PAYLOAD:   ', payload);
        console.log('Recuse updater BlockInfo: ', blockInfo);

        let case_id = parseInt(payload.data.case_id);

        let caseState = await state.case.findOne({ case_id: case_id }).exec();
        let arbitrators;
        if (caseState) {
            ({ arbitrators } = caseState)
            for ( let arbitrator of arbitrators ) {
                if (arbitrator === payload.data.assigned_arb) {
                    arbitrator = null;
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