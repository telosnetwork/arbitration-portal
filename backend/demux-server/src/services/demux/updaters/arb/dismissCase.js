async function dismissCaseHandler (state, payload, blockInfo, context) {
    try {
        console.log('DismissCase updater PAYLOAD:   ', payload);
        console.log('DismissCase updater BlockInfo: ', blockInfo);
    } catch (err) {
        console.error('DismissCase updater error: ', err);
    }
}

export default dismissCaseHandler;