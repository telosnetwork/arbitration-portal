async function readyCaseHandler (state, payload, blockInfo, context) {
    try {
        console.log('ReadyCase updater PAYLOAD:   ', payload);
        console.log('ReadyCase updater BlockInfo: ', blockInfo);

        // case_id && claimant
    } catch (err) {
        console.error('ReadyCase updater error: ', err);
    }
}

export default readyCaseHandler;