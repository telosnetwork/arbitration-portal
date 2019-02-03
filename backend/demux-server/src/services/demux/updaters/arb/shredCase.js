async function shredCaseHandler (state, payload, blockInfo, context) {
    try {
        console.log('ShredCase updater PAYLOAD:   ', payload);
        console.log('ShredCase updater BlockInfo: ', blockInfo);

        // case_id, claimant
    } catch (err) {
        console.error('ShredCase updater error: ', err);
    }
}

export default shredCaseHandler;