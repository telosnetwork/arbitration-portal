async function dismissClaimHandler (state, payload, blockInfo, context) {
    try {
        console.log('DismissClaim updater PAYLOAD:   ', payload);
        console.log('DismissClaim updater BlockInfo: ', blockInfo);
    } catch (err) {
        console.error('DismissClaim updater error: ', err);
    }
}

export default dismissClaimHandler;