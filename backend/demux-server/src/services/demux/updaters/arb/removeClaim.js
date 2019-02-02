async function removeClaimHandler (state, payload, blockInfo, context) {
    try {
        console.log('RemoveClaim updater PAYLOAD:   ', payload);
        console.log('RemoveClaim updater BlockInfo: ', blockInfo);
    } catch (err) {
        console.error('RemoveClaim updater error: ', err);
    }
}

export default removeClaimHandler;