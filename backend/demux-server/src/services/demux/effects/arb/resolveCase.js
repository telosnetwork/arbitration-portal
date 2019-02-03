function resolveCaseEffect(payload, blockInfo, context) {
    try {
        console.log('ResolveCase effect PAYLOAD:   ', payload);
        console.log('ResolveCase effect BlockInfo: ', blockInfo);   
    } catch (err) {
        console.error('ResolveCase effect error: ', err);
    }
}

export default resolveCaseEffect;