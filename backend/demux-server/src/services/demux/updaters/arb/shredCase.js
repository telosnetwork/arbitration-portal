async function shredCaseHandler (state, payload, blockInfo, context) {
    try {
        console.log('ShredCase updater PAYLOAD:   ', payload);
        console.log('ShredCase updater BlockInfo: ', blockInfo);

        let case_id = parseInt(payload.data.claim_id);

        let stateCase = await state.case.findOne({ case_id: case_id }).exec();
        let unread_claims;
        if (stateCase) {
            ({ unread_claims } = caseState)
            // Delete All Claims
            for ( let claim of unread_claims ) {
                claim = null;
            }
            // Delete|Remove CaseFile
            await state.case.findOneAndDelete({ case_id: case_id }).exec();
        }

        // Add Removed Case_ID to Counter
        await state.counter.create({
            case_removed_counter: case_id
        }).exec();

    } catch (err) {
        console.error('ShredCase updater error: ', err);
    }
}

export default shredCaseHandler;