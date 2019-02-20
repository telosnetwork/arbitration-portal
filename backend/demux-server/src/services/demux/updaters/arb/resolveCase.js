async function resolveCaseHandler (state, payload, blockInfo, context) {
    try {
        console.log('ResolveCase updater PAYLOAD:   ', payload);
        console.log('ResolveCase updater BlockInfo: ', blockInfo);
        
    } catch (err) {
        console.error('ResolveCase updater error: ', err);
    }
}

export default resolveCaseHandler;