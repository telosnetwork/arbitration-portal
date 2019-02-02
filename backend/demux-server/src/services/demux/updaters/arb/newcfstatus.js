async function newCfStatusHandler (state, payload, blockInfo, context) {
    try {
        console.log('NewCfStatus updater PAYLOAD:   ', payload);
        console.log('NewCfStatus updater BlockInfo: ', blockInfo);
    } catch (err) {
        console.error('NewCfStatus updater error: ', err);
    }
}

export default newCfStatusHandler;