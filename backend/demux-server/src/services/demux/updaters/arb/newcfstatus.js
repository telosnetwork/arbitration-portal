async function newCfStatusHandler (state, payload, blockInfo, context) {
    try {
        console.log('NewCfStatus updater PAYLOAD:   ', payload);
        console.log('NewCfStatus updater BlockInfo: ', blockInfo);

        // case_id, new_status && assigned_arb
    } catch (err) {
        console.error('NewCfStatus updater error: ', err);
    }
}

export default newCfStatusHandler;