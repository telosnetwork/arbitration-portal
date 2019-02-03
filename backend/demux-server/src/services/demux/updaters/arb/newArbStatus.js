async function newArbStatusHandler (state, payload, blockInfo, context) {
    try {
        console.log('NewArbStatus updater PAYLOAD:   ', payload);
        console.log('NewArbStatus updater BlockInfo: ', blockInfo);

        // new_status && arbitrator
    } catch (err) {
        console.error('NewArbStatus updater error: ', err);
    }
}

export default newArbStatusHandler;