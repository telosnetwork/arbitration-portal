async function acceptClaimHandler (state, payload, blockInfo, context) {
    try {
        console.log('AcceptClaim updater PAYLOAD:   ', payload);
        console.log('AcceptClaim updater BlockInfo: ', blockInfo);

        // case_id, assigned_arb, claim_hash, decision_link, decision_class
    } catch (err) {
        console.error('AcceptClaim updater error: ', err);
    }
}

export default acceptClaimHandler;