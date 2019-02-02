async function recuseHandler (state, payload, blockInfo, context) {
    try {
        console.log('Recuse updater PAYLOAD:   ', payload);
        console.log('Recuse updater BlockInfo: ', blockInfo);
    } catch (err) {
        console.error('Recuse updater error: ', err);
    }
}

export default recuseHandler;