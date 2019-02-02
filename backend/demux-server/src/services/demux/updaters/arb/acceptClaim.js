async function acceptClaimHandler (state, payload, blockInfo, context) {
    try {
        console.log('AcceptClaim updater PAYLOAD:   ', payload);
        console.log('AcceptClaim updater BlockInfo: ', blockInfo);
    } catch (err) {
        console.error('AcceptClaim updater error: ', err);
    }
}

export default acceptClaimHandler;