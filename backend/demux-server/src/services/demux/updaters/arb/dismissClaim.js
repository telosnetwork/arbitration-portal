async function dismissClaimHandler (state, payload, blockInfo, context) {
    try {
        console.log('DismissClaim updater PAYLOAD:   ', payload);
        console.log('DismissClaim updater BlockInfo: ', blockInfo);

        let case_id = payload.data.case_id;

        let caseState = await state.case.findOne({ case_id: case_id }).exec();
        let unread_claims;
        if (caseState) {
            ({ unread_claims } = caseState)
            for ( let claim of unread_claims ) {
                if (claim.claim_summary === payload.data.claim_hash) {
                    claim = null;
                }
            }
            await state.case.findOneAndUpdate({ case_id: case_id }, {
                unread_claims: unread_claims
            }).exec();  
        }
    } catch (err) {
        console.error('DismissClaim updater error: ', err);
    }
}

export default dismissClaimHandler;