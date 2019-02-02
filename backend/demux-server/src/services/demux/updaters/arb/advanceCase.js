async function advanceCaseHandler (state, payload, blockInfo, context) {
    try {
        console.log('AdvanceCase updater PAYLOAD:   ', payload);
        console.log('AdvanceCase updater BlockInfo: ', blockInfo);
    } catch (err) {
        console.error('AdvanceCase updater error: ', err);
    }
}

export default advanceCaseHandler;