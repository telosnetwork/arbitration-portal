async function fileCaseHandler (state, payload, blockInfo, context) {
    try {
        console.log('FileCase updater PAYLOAD:   ', payload);
        console.log('FileCase updater BlockInfo: ', blockInfo);

        // claimant && claim_link
    } catch (err) {
        console.error('FileCase updater error: ', err);
    }
}

export default fileCaseHandler;