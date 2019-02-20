async function respondHandler (state, payload, blockInfo, context) {
    try {
        console.log('Respond updater PAYLOAD:   ', payload);
        console.log('Respond updater BlockInfo: ', blockInfo);

        let case_id = parseInt(payload.data.case_id);

        let caseState = await state.case.findOne({ case_id: case_id }).exec();
        let unread_claims;
        if (caseState) {
            ({ unread_claims } = caseState)
            // Add Respondant Decision Link
            for ( let claim of unread_claims ) {
                if (claim.claim_summary === payload.data.claim_hash) {
                    claim.response_link = payload.data.response_link
                }
            }
            await state.case.findOneAndUpdate({ case_id: case_id }, {
                unread_claims: unread_claims
            }).exec();
        }

    } catch (err) {
        console.error('Respond updater error: ', err);
    }
}

export default respondHandler;