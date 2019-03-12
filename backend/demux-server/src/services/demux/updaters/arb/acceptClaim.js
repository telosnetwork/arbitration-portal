async function acceptClaimHandler (state, payload, blockInfo, context) {
    try {
        console.log('AcceptClaim updater PAYLOAD:   ', payload);
        console.log('AcceptClaim updater BlockInfo: ', blockInfo);

        let case_id = parseInt(payload.data.case_id);

        let caseState = await state.case.findOne({ case_id: case_id }).exec();
        if (caseState) {
            // Claim_Id
            let claim_counter = 0;
            let counters = await state.counter.findOne({}).exec();
            if (counters) {
                ({ claim_counter } = counters);
                if (claim_counter != 0) { // Default Value
                    claim_counter += 1;
                }
                await state.counter.updateOne({}, {
                    $inc: { claim_counter: 1 }
                }, { upsert: true }).exec();
            }

            let accepted_claim;
            let unread_claims;
            let accepted_claims;
            let response_link;
            ({ unread_claims }   = caseState);
            ({ accepted_claims } = caseState);
            for ( let claim of unread_claims ) {
                if (claim.claim_summary === payload.data.claim_hash) {
                    response_link  = claim.response_link;
                    accepted_claim = claim;
                    accepted_claims.push(claim);
                    unread_claims.splice(unread_claims.indexOf(claim), 1);
                }
            }

            await state.case.findOneAndUpdate({ case_id: case_id }, {
                unread_claims:   unread_claims,
                accepted_claims: accepted_claims
            }).exec();

            await state.claim.create({
                claim_id:       claim_counter,
                claim_summary:  payload.data.claim_hash,
                decision_link:  payload.data.decision_link,
                decision_class: payload.data.decision_class,
                response_link:  response_link
            });
        }

    } catch (err) {
        console.error('AcceptClaim updater error: ', err);
    }
}

export default acceptClaimHandler;