async function addClaimHandler (state, payload, blockInfo, context) {
    try {
        console.log('AddClaim updater PAYLOAD:   ', payload);
        console.log('AddClaim updater BlockInfo: ', blockInfo);

        // case_id, claim_link && claimant
    } catch (err) {
        console.error('AddClaim updater error: ', err);
    }
}

export default addClaimHandler;