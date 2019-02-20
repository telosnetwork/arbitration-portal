async function addClaimHandler (state, payload, blockInfo, context) {
    try {
        console.log('AddClaim updater PAYLOAD:   ', payload);
        console.log('AddClaim updater BlockInfo: ', blockInfo);
    
        let case_id = parseInt(payload.data.case_id);

        let new_claim = {
            claim_id:      0,
            claim_summary: payload.data.claim_link,
            decision_link: ''
        }

        let caseState = await state.case.findOne({ case_id: case_id }).exec();
        let unread_claims;
        if (caseState) {
            ({ unread_claims } = caseState)
            unread_claims.push(new_claim);

            await state.case.findOneAndUpdate({ case_id: case_id }, {
                unread_claims: unread_claims
            }).exec();
        }
    } catch (err) {
        console.error('AddClaim updater error: ', err);
    }
}

export default addClaimHandler;