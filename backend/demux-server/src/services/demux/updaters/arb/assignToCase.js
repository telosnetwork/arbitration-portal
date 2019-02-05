async function assignToCaseHandler (state, payload, blockInfo, context) {
    try {
        console.log('AssignToCase updater PAYLOAD:   ', payload);
        console.log('AssignToCase updater BlockInfo: ', blockInfo);

        let case_id    = payload.data.case_id;

        let arbitrator = payload.data.arb_to_assign;

        let caseState = await state.case.findOne({ case_id: case_id }).exec();
        if (caseState) {
            await state.case.findOneAndUpdate({ case_id: case_id }, {
                arbitrators: [arbitrator]
            }).exec();
        }
    } catch (err) {
        console.error('AssignToCase updater error: ', err);
    }
}

export default assignToCaseHandler;