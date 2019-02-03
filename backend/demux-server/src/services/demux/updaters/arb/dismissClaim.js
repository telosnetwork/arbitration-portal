async function dismissClaimHandler (state, payload, blockInfo, context) {
    try {
        console.log('DismissClaim updater PAYLOAD:   ', payload);
        console.log('DismissClaim updater BlockInfo: ', blockInfo);

        // case_id, assigned_arb, claim_hash && memo
    } catch (err) {
        console.error('DismissClaim updater error: ', err);
    }
}

export default dismissClaimHandler;