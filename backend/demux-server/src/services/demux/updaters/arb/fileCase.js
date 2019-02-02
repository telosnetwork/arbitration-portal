async function fileCaseHandler (state, payload, blockInfo, context) {
    try {
        console.log('FileCase updater PAYLOAD:   ', payload);
        console.log('FileCase updater BlockInfo: ', blockInfo);
    } catch (err) {
        console.error('FileCase updater error: ', err);
    }
}

export default fileCaseHandler;