async function removeClaimHandler (state, payload, blockInfo, context) {
    try {
        console.log('RemoveClaim updater PAYLOAD:   ', payload);
        console.log('RemoveClaim updater BlockInfo: ', blockInfo);

        let case_id = parseInt(payload.data.case_id);

        let caseState = await state.case.findOne({ case_id: case_id }).exec();
        let unread_claims;
        if (caseState) {
            ({ unread_claims } = caseState);
            // Delete Claim
            for ( let claim of unread_claims ) {
                if (claim.claim_summary === payload.data.claim_hash) {
                    unread_claims.splice(unread_claims.indexOf(claim), 1);
                }
            }
            await state.case.findOneAndUpdate({ case_id: case_id }, {
                unread_claims: unread_claims
            }).exec();
        }
    } catch (err) {
        console.error('RemoveClaim updater error: ', err);
    }
}

export default removeClaimHandler;