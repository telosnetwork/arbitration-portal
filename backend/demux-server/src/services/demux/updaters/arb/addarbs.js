async function addArbsHandler (state, payload, blockInfo, context) {
    try {
        console.log('AddArbs updater PAYLOAD:   ', payload);
        console.log('AddArbs updater BlockInfo: ', blockInfo);
        //TODO: Run algorithm to compare the required_langs of the case to each arbitrators languages - FRONTEND listen in on `effects` addArbsAction event
    } catch (err) {
        console.error('AddArbs updater error: ', err);
    }
}

export default addArbsHandler;