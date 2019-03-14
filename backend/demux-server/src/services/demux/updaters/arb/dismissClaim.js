async function dismissClaimHandler (state, payload, blockInfo, context) {
    try {
        console.log('DismissClaim updater PAYLOAD:   ', payload);
        console.log('DismissClaim updater BlockInfo: ', blockInfo);

        let case_id = parseInt(payload.data.case_id);

        let caseState = await state.case.findOne({ case_id: case_id }).exec();
        let unread_claims; let dismiss_claims;
        if (caseState) {
            ({ unread_claims }  = caseState);
            ({ dismiss_claims } = caseState);
            for ( let claim of unread_claims ) {
                if (claim.claim_summary === payload.data.claim_hash) {
                    dismiss_claims.push(claim);
                    unread_claims.splice(unread_claims.indexOf(claim), 1);
                }
            }
            await state.case.findOneAndUpdate({ case_id: case_id }, {
                unread_claims:  unread_claims,
                dismiss_claims: dismiss_claims
            }).exec();  
        }
    } catch (err) {
        console.error('DismissClaim updater error: ', err);
    }
}

export default dismissClaimHandler;